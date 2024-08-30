import { getProducts, getBrands } from "../apis/services/products.service";
import { getBrandByName } from "../apis/services/brand.service";
import { toast } from "../libs/toast";

let currentBrandButton = null;
let currentpage = 1;
let totalproducts = 0;
let currentBrand = null;

async function getBrandHome() {
    try {
        const response = await getBrands();
        const brands = response;
        displayBrands(brands);   
    } catch (error) {
        toast("Error fetching brands:", error);
    }
}

(async function() {
    await getBrandHome();
})();

function displayBrands(brandArray) {
    const brandList = document.getElementById('brn');
  
    brandList.innerHTML = ''; 
    const allButton = document.createElement('button');
    allButton.textContent = 'All';
    allButton.setAttribute("id", "allbtn");
    allButton.classList = "bg-white rounded-full py-1 px-9 border-2 font-semibold";
    allButton.addEventListener("click",  () => {
        currentBrand = null;
        fetchProducts(1);
    });
    brandList.appendChild(allButton);

    brandArray.forEach(brand => {
        const brandbtn = document.createElement('button');
        brandbtn.dataset.bname = brand;
        brandbtn.setAttribute("id", "brandbtn");
        brandbtn.classList = "bg-white rounded-full py-1 px-9 border-2 font-semibold";
        brandbtn.textContent = brand;
        brandList.appendChild(brandbtn); 
    });
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

async function fetchProducts(page) {
    currentpage = page;
    try {
        const response = await getProducts(page, currentBrand);
        totalproducts = response.total;
        displayProducts(response.data);
        setupPagination();
    } catch (error) {
        toast('An error occurred while fetching the products.', error);
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
}

async function clickBrand(event){
    let brandName = event.target.textContent;
    if (brandName != "All"){
        currentBrand = brandName;
        await fetchProducts(1);
    }   
}

const btncont = document.getElementById('brn');
btncont.addEventListener("click", clickBrand);

function setupPagination() {
    const totalItems = totalproducts;
    const totalPages = Math.ceil(totalItems / 10);
    let paginationDiv = document.getElementById("pagination");
    paginationDiv.innerHTML = "";
    
    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement("button");
        button.className ="w-10 ml-4 border-2 px-2 py-2 rounded-[10px] cursor-pointer";
        button.textContent = i;
   
        if (i === currentpage) {
            button.classList.add("bg-[#343a40]", "text-white");
        }
        button.addEventListener("click", () => {
            fetchProducts(i);
        });
    
        paginationDiv.appendChild(button);
    }
}

fetchProducts(1);
fetchAllProductsByBrand();



// (async function() {
//     await getBrandHome();
// })();

