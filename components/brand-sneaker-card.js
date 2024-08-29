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
    brandList.innerHTML = ''; 
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
 }  
   
 async function fetchAllProductsByBrand() {    
    try {    
     const response = await getProducts(1);    
     const products = response.data;    
     displayAllProductsByBrand(products);   
    } catch (error) {    
     toast('An error occurred while fetching the products.');    
    }    
  }  
   

 fetchAllProductsByBrand();