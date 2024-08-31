import { getProducts } from "../apis/services/products.service";
import { toast } from "../libs/toast";

// Fetch products from the API
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
      const productItem = document.createElement('div');
      productItem.className = "flex flex-col mt-4";
      productItem.style.cursor = "pointer";

      productItem.innerHTML = `
          <img src="${product.imageURL}" alt="${product.name}" class="w-48 h-48 mb-3"> 
          <p class="text-lg font-bold">${product.name}</p>  
          <p class="text-lg justify-start items-start font-semibold">$${product.price}</p>
      `;

      // Add click event listener to the product item
      productItem.addEventListener('click', () => redirectToDetails(product.id));

      // Append the product item to the product div
      productDiv.appendChild(productItem);
  });

  setupPagination();
}
// Redirect to product details page with ID
function redirectToDetails(id) {
  window.location.href = `/product-details.html?id=${id}`;
}

// Make it globally accessible
window.redirectToDetails = redirectToDetails;

// Setup pagination
function setupPagination() {
    const totalPages = Math.ceil(42 / 10); // Assuming 42 is the total number of products
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

// Initial fetch call
fetchProducts();