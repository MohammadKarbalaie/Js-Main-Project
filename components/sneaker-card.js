import { getProducts } from "../apis/services/products.service";
import { toast } from "../libs/toast";

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
