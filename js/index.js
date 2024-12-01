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
  navData();
 let petsData = [];
 let loadAllData = async () => {
   let res = await fetch("https://openapi.programming-hero.com/api/peddy/pets");
   let data = await res.json();
   
   petsData = data.pets; 
   displayAllData(petsData); 
 };
 loadAllData();
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
 let sortByPrice = () => {   
    let sortedPets = [...petsData].sort((a, b) => b.price - a.price);
    displayAllData(sortedPets); 
  };
  document.getElementById("sort-price").addEventListener("click", sortByPrice);
  let displayAllData = (items) => {
    let item_container = document.getElementById("card");
    item_container.innerHTML = '';  
    if (Array.isArray(items) && items.length > 0) {
      for (let item of items) {
        let breed = item.breed ? item.breed : "Breed not available";
        let birthDate = item.date_of_birth ? item.date_of_birth : "Date of birth not available";
        let gender = item.gender ? item.gender : "Gender not specified";
        let price = item.price ? `$${item.price}` : "Price not available";
        let cardDiv = document.createElement("div");
        cardDiv.innerHTML = `
          <img src="${item.image}" alt="Pet Image" class="w-full h-40 object-cover rounded-t-lg">
          <h3 class="text-xl font-semibold mt-4">${item.pet_name}</h3>
          <p class="text-sm text-gray-600">Breed: ${breed}</p>
          <p class="text-sm text-gray-600">Birth: ${birthDate}</p>
          <p class="text-sm text-gray-600">Gender: ${gender}</p>
          <p class="text-sm font-semibold text-green-500">Price: ${price}</p>
          <div class="mt-4 flex justify-between items-center">
            <button onclick="ImageData('${item.petId}')" class="btn text-xl border border-5 p-1 hover:bg-sky-700"> 
              <i class="fa-regular fa-thumbs-up"></i>
            </button>
            <button onclick="startAdoptionCountdown('${item.pet_name}')" class="bg-gray-200 text-gray-700 py-1 px-3 rounded-md hover:bg-sky-700">Adopt</button>
            <button onclick="modalData('${item.petId}')" class="hover:bg-sky-700 bg-gray-200 text-gray-700 py-1 px-3 rounded-md">Details</button>
          </div>
        `;
  
        item_container.appendChild(cardDiv);
      }
    } else {
      
      item_container.innerHTML = `
        <div class="mx-auto">
          <img src="image/error.webp">
          <h1 class="text-xl text-gray-600 font-bold">No Information available in this Category.</h1>
        </div>
      `;
    }
  };
  let handleSpinner = (categoryName) => {
    document.getElementById("spinner").style.display = "block";
    document.getElementById("card").style.display = "none";
  
    setTimeout(function () {
      categoryAllData(categoryName);
    }, 2000);
  };
  let removeActiveButton=()=>{
    let buttons= document.getElementsByClassName("btn-category")
    for (let btn1 of buttons){
        btn1.classList.remove("active")
    }
 } 
 let ShowImage=(pics)=>{
    let ImageContainer =document.getElementById("pic")
       let ImageDiv=document.createElement("div")
       ImageDiv.innerHTML=`
       <img src="${pics.image}" alt="Dog Image 3" class="rounded-lg shadow-lg h-34 object-cover w-full">  
       `
       ImageContainer.appendChild(ImageDiv)
 }
 let showModal =(modal)=>{
 
     let modalDiv= document.getElementById("modalContent") 
     let breed = modal.breed ? modal.breed : "Breed not available";
        let birthDate = modal.date_of_birth ? modal.date_of_birth : "Date of birth not available";
        let gender = modal.gender ? modal.gender : "Gender not specified";
        let price = modal.price ? `$${modal.price}` : "Price not available";
     modalDiv.innerHTML=`
       <img class="rounded" src="${modal.image}">
       <h1 class="text-2xl font-extrabold mt-3"> ${modal.pet_name}</h1>
       <div class="flex justify-between">
       <div>
       <h3 class="font-bold mt-3">Breed:${breed} </h3>
       <h3 class="font-bold mt-3">Gender:${gender} </h3>
       <h3 class="font-bold mt-3">vaccinated_status:${modal.vaccinated_status} </h3>
       </div>
       <div>
       <h3 class="font-bold mt-3">Birth:${birthDate}</h3>
       <h3 class="font-bold mt-3">Price:${price} </h3>
       </div>
       </div>
       <h2 class="font-extrabold mt-3 text-2xl">Details Description </h2>
       <p class="mt-3 text-red-800 font-bold"> ${modal.pet_details}</p>   
     `
     document.getElementById("my_modal_1").showModal() 
 } 
 let startAdoptionCountdown = (petName) => {
    let countdownDiv = document.getElementById("modalContent"); 
    let countdown = 3;
    countdownDiv.innerHTML = `
     <img class="mx-auto" src="image/logo.png">
      <h1 class="text-5xl font-extrabold mb-4 text-center">Congrates</h1>
      <p class="text-2xl font-semibold">Adoption Process is Start for your Pet </p>
      <h1 id="countdown" class="text-5xl font-extrabold mb-4 text-center">${countdown}</h1>
    `;
    document.getElementById("my_modal_1").showModal(); 
    let countdownInterval = setInterval(() => {
      countdown--;
      document.getElementById("countdown").innerText = countdown;
  
      if (countdown === 0) {
        clearInterval(countdownInterval);
        setTimeout(() => {
          document.getElementById("my_modal_1").close();
        }, 1000); 
      }
    }, 1000); 
  };
 
 
 
 
 
 
 
 
 
 
  