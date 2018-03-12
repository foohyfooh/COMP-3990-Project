const ordersContainer = document.querySelector('#ordersContainer');
const orderItemTemplate = document.querySelector('#template-orderItem').content;

function sendUpdate(sessionId, orderItemId, status){
  fetch(`http://localhost:8080/order/${orderItemId}/status`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({sessionId, status})
  });
}

function addItemToContainer(orderItem){
  let orderDiv = document.importNode(orderItemTemplate, true);
  let name = orderDiv.querySelector('.name');
  let table = orderDiv.querySelector('.table');
  let status = orderDiv.querySelector('.status');
  let sendUpdate = orderDiv.querySelector('.update');

  orderDiv.id += orderItem.id;
  name.innerHTML = orderItem.name;
  table.innerHTML = orderItem.table;
  status.value = orderItem.status;
  sendUpdate.addEventListener('click', event => sendUpdate(orderItem.sessionId, orderItem.id, status.value));

  ordersContainer.appendChild(orderDiv);
}

//Get existing orders
async function getExistingOrders(){
  let res = await fetch('http://localhost:8080/orders');
  let items = await res.json();
  items.forEach(addItemToContainer)
}

//Handle New Orders and Updates
let socket = io.connect('http://localhost:8080');
socket.on('kitchen-add-item', data => addItemToContainer(data));

getExistingOrders();
socket.emit('kitchen-register', {id: 1234});