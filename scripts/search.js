
import { getSearch } from "../apis/services/search.service";
import { toast } from "../libs/toast"

async function getSearchByProducts(event) {
    event.preventDefault();
    const querytext = document.getElementById('text-search');
    const query = querytext.value;
    const response = await getSearch(1, query);
    try {
        const products = response.data;
        if (products && products.length > 0) {
            displayResults(products);
        } else {
            window.location.href = '/search-faild.html';
        }
    } catch (error) {
        toast('An Error Occurred while Searching. Please Try Again');
    }
}

async function displayResults(products) {
    const searchResult = document.getElementById('p-Element');
    if (searchResult) {
        searchResult.innerHTML = ''; 
        console.log(products);
        products.forEach(product => {
            searchResult.innerHTML += `  
            <div class="flex flex-col mt-4">  
            <img src="${product.imageURL}" alt="${product.name}" class="w-48 h-48 mb-3">  
            <p class="text-lg font-bold">${product.name}.</p>   
            <p class="text-lg justify-start items-start font-semibold">$${product.price}</p>  
            </div>  
           `; 
        });
    } else {
        toast('Search results element not found.');
    }
}

document.getElementById('search-form').onsubmit = getSearchByProducts;