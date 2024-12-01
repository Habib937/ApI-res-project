let navData = async () => {
    let res = await fetch("https://openapi.programming-hero.com/api/peddy/categories");
    let data = await res.json();
    navDisplayData(data.categories);
  };
  let navDisplayData = (items) => {
    let nav_container = document.getElementById("categories");
    nav_container.classList = "md:flex justify-evenly mx-auto shadow-xl";
  
    for (let item of items) {
      console.log(item.category);
  
      let btn_div = document.createElement("div");
  
      btn_div.innerHTML = `
        <button id="btn-${item.category}" onclick="handleSpinner('${item.category}')" class="btn m-3 btn-category text-xl font-bold hover:bg-sky-700">
          <img class="w-7 h-7" src="${item.category_icon}">
          ${item.category}
        </button>
      `;
  
      nav_container.appendChild(btn_div);
    }
  };
  let petsData = [];
let loadAllData = async () => {
  let res = await fetch("https://openapi.programming-hero.com/api/peddy/pets");
  let data = await res.json();
  
  petsData = data.pets; 
  displayAllData(petsData); 
};

loadAllData();
navData();

let ImageData = async (id) => {
    let res = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`);
    let data = await res.json();
    ShowImage(data.petData);
  };
  let modalData = async (id2) => {
    let res = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id2}`);
    let data = await res.json();
    showModal(data.petData);
  };
  let categoryAllData = async (categoryName) => {
    document.getElementById("spinner").style.display = "none";
    document.getElementById("card").style.display = "grid";
  
    let res = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${categoryName}`);
    let data = await res.json();
 
    removeActiveButton()
 
    document.getElementById(`btn-${categoryName}`).classList.add("active")
 
 
    displayAllData(data.data);
 };
  