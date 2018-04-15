// Get access to the camera to read the QR code
if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  let video = document.getElementById('qrCodeWindow');
  let outputContainer = document.getElementById('output');
  let checkoutButton = document.getElementById('checkout');
  let interval = undefined;

  /**
   * Decode a QR code to get the session UUID
   * @param {string} img The image to decode
   * @param {function} qrResultCallback The function to call when the QR code is successfully scanned
   */
  function decodeQRCode(img, qrResultCallback){
    let qr = new QrCode();
    qr.callback = (err, value) => {
        if (err) {
          console.error(err);
          return;
        }
        if(interval) clearInterval(interval);
        qrResultCallback(value.result);
    };
    qr.decode(img);
  }

  /**
   * Checkout a session
   * @param {string} sessionUUID The session to checkout
   */
  function checkoutSession(sessionUUID){
    return fetch('http://localhost:8080/session/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({session: sessionUUID})
    })
    .then(res => res.json())
    .then(res => {
      checkoutButton.setAttribute('disabled', '');
      outputContainer.innerHTML = res.message;
      interval = setInterval(handleGetSessionInfo, 2000);
    });
  }

  /**
   * 
   * @param {string} sessionUUID 
   */
  function displaySessionInfo(sessionUUID){
    fetch(`http://localhost:8080/session/${sessionUUID}/details`)
    .then(res => res.json())
    .then(info => {
      let content = `Cost = $${info.cost}<br><div>`;
      for(let item of info.items)
        content += `<p>${item.name}, Cost = $${item.cost}</p>`
      content += '</div>'
      outputContainer.innerHTML = content;
      checkoutButton.removeAttribute('disabled');
      checkoutButton.addEventListener('click', function handleCheckoutClick(event) {
        checkoutSession(sessionUUID)
        .then(() => {
          checkoutButton.removeEventListener('click', handleCheckoutClick);
        })
      });
    })
    .catch(e => alert('Error getting order details'));
  }
  
  /**
   * Do the processing to checkout a customer
   */
  function handleGetSessionInfo(){
    let canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    decodeQRCode(canvas.toDataURL(), displaySessionInfo);
  }

  //Get the camera of the device and start the scanning process
  navigator.mediaDevices
  .getUserMedia({ video: true })
  .then(stream => {
    video.src = window.URL.createObjectURL(stream);
    video.play();
    interval = setInterval(handleGetSessionInfo, 2000);
  });

}

