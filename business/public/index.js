let getSales = document.querySelector('#getSales');
let fromDateInput = document.querySelector('#from');
let toDateInput = document.querySelector('#to');
let salesContainer = document.querySelector('#sales');

function getMinTimeofDate(date){
  date.setHours(0, 0, 0, 0);
  return date;
}

function getMaxTimeofDate(date){
  date.setHours(23, 59, 50, 999);
  return date;
}

getSales.addEventListener('click', async event => {
  let fromValue = fromDateInput.value;
  let toValue = toDateInput.value;
  let res = await fetch('http://localhost:8200/business/sales', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: fromValue !== '' ? getMinTimeofDate(new Date(fromValue)) : null,
      to: toValue !== '' ? getMaxTimeofDate(new Date(toValue)) : null
    })
  });
  let sales = await res.json();
  let content = '<p><b>Sales</b></p>';
  for(let sale of sales){
    content += `<p>Sale on ${new Date(sale.date).toDateString()} at table ${sale.table} earned $${sale.cost}</p>`;
  }
  salesContainer.innerHTML = content;
});
