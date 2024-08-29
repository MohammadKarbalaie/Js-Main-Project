import { getProducts, getBrands } from "../apis/services/products.service";
import { getBrandByName } from "../apis/services/brand.service";
import { toast } from "../libs/toast";

let currentBrandButton = null;

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
    brandList.innerHTML = '<button class="bg-black text-white rounded-full py-1 px-9 border-2" id="All-b">All</button>';
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
            const previousButton = document.querySelector('.bg-black');
            if (previousButton) {
                previousButton.classList.remove('bg-black');
                previousButton.classList.add('bg-white');
                previousButton.style.color = "black";
            }
            event.target.classList.remove('bg-white');
            event.target.classList.add('bg-black');
            event.target.style.color = "white";
            console.log(brandName);
            if (brandName) {
                await fetchProductsByBrand(brandName);
            } else {
               await fetchProducts(1, null); // Fixed the page reference here
            }
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
     const response = await getBrandByName(1, brand);     
     const products = response.data;    
     displayProductsByBrand(products, brand); 
     document.getElementById('pagination').innerHTML = '';
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
     const response = await getBrandByName(1);    
     const products = response.data;    
     displayAllProductsByBrand(products);   
    } catch (error) {    
     toast('An error occurred while fetching the products.');    
    }    
}

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
 
fetchProducts();

fetchAllProductsByBrand();