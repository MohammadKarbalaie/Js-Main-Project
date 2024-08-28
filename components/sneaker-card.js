import { getProducts } from "../apis/services/user.service";
import { toast } from "../libs/toast";



async function fetchProducts() {
    try {
        const response = await getProducts();
        const products = response.data;
        displayProducts(products);
    } catch (error) {
        toast('An error occurred while fetching the products.');
    }
}

function displayProducts(products) {
    const productDiv = document.getElementById('p-Elemnet');
    productDiv.innerHTML='';
    products.forEach(product => {
        productDiv.innerHTML += `
          <div class="flex flex-col mt-4" id="p-Elemnet"> 
          <img src="${product.imageURL}" alt="${product.name}" class="w-48 h-48 mb-3"> 
          <p class="text-lg font-bold">${product.name}.</p>  
          <p class="text-lg justify-start items-start font-semibold">$${product.price}</p>
          </div> 
        `;
       
    });
    const productCount = products.length;

}

fetchProducts();


