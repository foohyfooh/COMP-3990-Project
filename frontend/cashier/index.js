// Get access to the camera to read the QR code
if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  let video = document.getElementById('qrCodeWindow');
  let scanButton = document.getElementById('scan');
  let outputContainer = document.getElementById('output');
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
    fetch('http://localhost:8080/session/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        session: sessionUUID
      })
    })
    .then(res => res.json())
    .then(res => {
      console.log(res);
      output.innerHTML = res.message;
    });
  }
  
  /**
   * Do the processing to checkout a customer
   */
  function handleCheckout(){
    let canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    decodeQRCode(canvas.toDataURL(), checkoutSession);
  }

  //Add click listener to initial the QR code scanning process
  scan.addEventListener('click', event => {
    interval = setInterval(handleCheckout, 2000);
  });

  //Get the camera of the device and start the scanning process
  navigator.mediaDevices
  .getUserMedia({ video: true })
  .then(stream => {
    video.src = window.URL.createObjectURL(stream);
    video.play();
    scanButton.click();
  });

}

