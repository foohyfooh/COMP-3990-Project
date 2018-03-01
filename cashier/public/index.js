// Get access to the camera to read the QR code
if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  let video = document.getElementById('qrCodeWindow');
  let scanButton = document.getElementById('scan');
  let outputContainer = document.getElementById('output');
  let interval = undefined;

  function decodeQRCode(img, qrResultCallback){
    let qr = new QrCode();
    qr.callback = (err, value) => {
        if (err) {
            console.error(err);
            return;
        }
        qrResultCallback(value.result);
        if(interval) clearInterval(interval);
    };
    qr.decode(img);
  }
  
  function checkoutSession(sessionUUID){
    fetch('http://localhost:8080/session/checkout/', {
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
  
  function handleCheckout(){
    let canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    decodeQRCode(canvas.toDataURL(), checkoutSession);
  }

  scan.addEventListener('click', event => {
    interval = setInterval(handleCheckout, 2000);
  });

  navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
    video.src = window.URL.createObjectURL(stream);
    video.play();
    scanButton.click();
  });

}

