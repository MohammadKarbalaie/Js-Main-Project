import { getProducts } from "../apis/services/products.service";
import { toast } from "../libs/toast";

async function fetchProducts(page = 1, brand = null) {  
    try {  
        const response = await getProducts(page, brand);  
        const products = response.data;  
        displayProducts(products);  
        updatePagination(page);  
    } catch (error) {  
        toast('An error occurred while fetching the products.');  
    }  
}


function displayProducts(products) {
    const productDiv = document.getElementById('p-Elemnet');
    productDiv.innerHTML = '';
    
    products.forEach(product => {
        const productItem = document.createElement('div');
        productItem.className = "flex flex-col mt-4";
        productItem.style.cursor = "pointer";
        productItem.innerHTML = `
            <img src="${product.imageURL}" alt="${product.name}" class="w-48 h-48 mb-3"> 
            <p class="text-lg font-bold">${product.name}</p>  
            <p class="text-lg justify-start items-start font-semibold">$${product.price}</p>
        `;
  
        productItem.addEventListener('click', () => redirectToDetails(product.id));
  
        productDiv.appendChild(productItem);
    });
  }

function redirectToDetails(id) {
  window.location.href = `/product-details.html?id=${id}`;
}

window.redirectToDetails = redirectToDetails;

function updatePagination(currentPage) {
    const paginationDiv = document.getElementById('pagination');
    paginationDiv.innerHTML = '';

    const totalPages = 5; 
    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.innerText = i;
        pageButton.className = "pagination-button";
        pageButton.style.padding= '10px 15px'
        pageButton.style.border = "1px solid gray"
        pageButton.style.backgroundColor = (i === currentPage) ? 'black' : 'white';
        pageButton.style.color = (i === currentPage) ? 'white' : 'black';

        pageButton.addEventListener('click', () => {
            fetchProducts(i);
        });

        paginationDiv.appendChild(pageButton);
    }
}

fetchProducts();