import { getProducts,getBrands } from "../apis/services/products.service";
import { toast } from "../libs/toast";

async function getBrandHome() {
    try {
        const response = await getBrands();
        const brands = response;
        displayBrands(brands);   
    } catch (error) {
        toast("Error fetching brands:", error);
    }
}

function displayBrands(brandArray) {
    const brandList = document.getElementById('brn');
    brandList.innerHTML = ''; // Clear previous brand
    brandArray.forEach(brand => {
        const brandbtn = document.createElement('button');
        brandbtn.dataset.bname = brand;
        brandbtn.setAttribute("id", "brandbtn");
        brandbtn.classList = "bg-white rounded-full py-1 px-9 border-2 font-semibold";
        brandbtn.textContent = brand;
        brandList.appendChild(brandbtn); 
    });

    attachBrandClickEvents();
}

function attachBrandClickEvents() {   
    const allBrands = document.getElementById("brn").children;   
    for (const brand of allBrands) {   
      brand.addEventListener("click", async function (event) {    
       const brandName = event.target.dataset.bname;   
       await fetchProductsByBrand(brandName);   
      });   
   }   
} 

(async function() {
    await getBrandHome();
})();

async function fetchProducts(page = 1, brand = null) {
    try {
        const response = await getProducts(page, brand);
        const products = response.data;
        displayProducts(products);
    } catch (error) {
        toast('An error occurred while fetching the products.');
    }
}

function displayProducts(products) {
    const productDiv = document.getElementById('p-Elemnet');
    productDiv.innerHTML = '';
    products.forEach(product => {
        productDiv.innerHTML += `
          <div class="flex flex-col mt-4"> 
          <img src="${product.imageURL}" alt="${product.name}" class="w-48 h-48 mb-3"> 
          <p class="text-lg font-bold">${product.name}.</p>  
          <p class="text-lg justify-start items-start font-semibold">$${product.price}</p>
          </div> 
        `;
    });
    setupPagination();
}

function setupPagination() {
    const totalPages = Math.ceil(42 / 10);
    const paginationDiv = document.getElementById('pagination');
    paginationDiv.innerHTML = '';
    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.className = "w-10 ml-4 border-2 px-4 py-2 cursor-pointer";
        button.textContent = i;
        button.addEventListener('click', () => fetchProducts(i));
        paginationDiv.appendChild(button);
    }
}

function displayProductsByBrand(products, brand) {  
    const productDiv = document.getElementById('p-Elemnet');  
    productDiv.innerHTML = '';  
    const brandProducts = products.filter(product => product.brand === brand);  
    brandProducts.forEach(product => {  
       productDiv.innerHTML += `  
        <div class="flex flex-col mt-4">  
        <img src="${product.imageURL}" alt="${product.name}" class="w-48 h-48 mb-3">  
        <p class="text-lg font-bold">${product.name}.</p>   
        <p class="text-lg justify-start items-start font-semibold">$${product.price}</p>  
        </div>  
       `;  
    });  
    setupPagination();  
 }  
   
 async function fetchProductsByBrand(brand) {      
    try {    
     const response = await getProducts(1,brand); // Fetch all products    
     const products = response.data;    
     displayProductsByBrand(products, brand); 
    } catch (error) {    
     toast('An error occurred while fetching the products for the brand.');    
    }    
  } 
 
  
  function displayAllProductsByBrand(products) {  
    const productDiv = document.getElementById('p-Elemnet');  
    productDiv.innerHTML = '';  
    const brands = [...new Set(products.map(product => product.brand))];  
    brands.forEach(brand => {  
       const brandProducts = products.filter(product => product.brand === brand);  
       productDiv.innerHTML += `  
        <h2 class="text-lg font-bold">${brand}</h2>  
        <div class="flex flex-col mt-4">  
         ${brandProducts.map(product => `  
           <div class="flex flex-col mt-4">  
           <img src="${product.imageURL}" alt="${product.name}" class="w-48 h-48 mb-3">  
           <p class="text-lg font-bold">${product.name}.</p>   
           <p class="text-lg justify-start items-start font-semibold">$${product.price}</p>  
           <p>${product.name}</p>
           </div>  
         `).join('')}  
        </div>  
       `;  
    });  
    setupPagination();  
 }  
   
 async function fetchAllProductsByBrand() {    
    console.log("Fetching all products by brand");   
    try {    
     const response = await getProducts(1); // Fetch all products    
     const products = response.data;    
     displayAllProductsByBrand(products); // Display all products by brand    
    } catch (error) {    
     toast('An error occurred while fetching the products.');    
    }    
  }  
   
 // Call fetchAllProductsByBrand to display all products by brand  
 fetchAllProductsByBrand();

fetchProducts();
