const menuContainer = document.querySelector('#menu');
const menuItemTemplate = document.querySelector('#template-item').content;
const categoryTemplate = document.querySelector('#template-category').content;

/**
 * Generate the HTML to display a menu item
 * @param {object} item Item to display
 */
function generateMenuItem(item){
  let itemDiv = document.importNode(menuItemTemplate, true);
  let name = itemDiv.querySelector('.name');
  let cost = itemDiv.querySelector('.cost');
  let description = itemDiv.querySelector('.description');
  name.innerHTML = item.name;
  cost.innerHTML = item.cost;
  description.innerHTML = item.description;
  return itemDiv;
}

/**
 * Generate the HTML to display a category and its menu items
 * @param {object} category Category to display
 */
function generateCategory(category){
  let categoryDiv = document.importNode(categoryTemplate, true);
  let name = categoryDiv.querySelector('.name');
  let items = categoryDiv.querySelector('.items');
  let newItemNameInput = categoryDiv.querySelector('.addItem input.name');
  let newItemCostInput = categoryDiv.querySelector('.addItem input.cost');
  let newItemDescInput = categoryDiv.querySelector('.addItem input.desc');
  let newItemImageInput = categoryDiv.querySelector('.addItem input.image'); 
  let addItemButton = categoryDiv.querySelector('.addItem button.add');

  name.innerHTML = category.name;
  for(let item of category.items) items.appendChild(generateMenuItem(item));
  addItemButton.addEventListener('click', event => {
    let nameValue = newItemNameInput.value;
    let costValue = newItemCostInput.value;
    let descValue = newItemDescInput.value;
    let imageFile = newItemImageInput.files[0];
    
    if((nameValue === '' || costValue === '')) return;

    let reader = new FileReader();
    reader.onloadend = () => {
      // console.log(reader.result);
      fetch('http://localhost:8080/menu/item/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: nameValue,
          cost: Number.parseFloat(costValue),
          description: descValue,
          category: category.id,
          image: reader.result
        })
      });
    };
    reader.readAsDataURL(imageFile);
  });

  return categoryDiv;
}

/**
 * Get the all the categories and the menu items
 */
async function getMenu(){
  try{
    let res = await fetch('http://localhost:8080/full_menu');
    let menu = await res.json();
    menuContainer.innerHTML = '';
    for(let category of menu) menuContainer.appendChild(generateCategory(category));
  }catch(e){
    console.log(e);
  }
}
getMenu();