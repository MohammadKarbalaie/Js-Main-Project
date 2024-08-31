import { getSearch } from "../apis/services/search.service";  
import { errorHandler } from "../libs/error-handler";  
import { renderResults } from "../components/search-failed"  
  
const input = document.getElementById('text-search');  
const container = document.getElementById('p-Elemnet');  
const paginationContainer = document.getElementById('pagination'); 
let currentPage = 1;  
const itemsPerPage = 10;  
  
async function Search() {  
   input.addEventListener("change", async function (event) {  
      currentPage = 1;  
      await fetchResults();  
   });  
}  

async function fetchResults() {  
   try {  
      let find = String(input.value).toUpperCase();  
      const response = await getSearch(1, find);
      const result = response.data;   
      if (result.length!= 0) {  
        displayResults(result);  
        setupPagination(result.length);  
      } else {  
        renderResults(input.value)
      }  
   } catch (error) {  
      errorHandler(error);  
   }  
}  
  
async function displayResults(result) {  
   try {  
      const div = document.getElementById('noResult');
      const render = document.getElementById('div-render-container');
      if(div){
        div.remove();
      } 
      render.style.display = "block"   
      container.innerHTML = '';  
      const start = (currentPage - 1) * itemsPerPage;  
      const end = start + itemsPerPage;  
      const paginatedItems = result.slice(start, end);  
       
      if (paginatedItems.length === 0) {  
        container.innerHTML = 'No more products to display';  
      } else {  
        paginatedItems.forEach((product) => {  
           const productHTML = `  
           <div class="flex flex-col mt-4" data-id="${product.id}">  
              <img src="${product.imageURL}" alt="${product.name}" class="w-48 h-48 mb-3">  
              <p class="text-lg font-bold">${product.name}</p>  
              <p class="text-lg justify-start items-start font-semibold">$${product.price}</p>  
           </div>  
           `;  
           container.innerHTML += productHTML;  
        });  
        const productElements = container.children;  
        Array.from(productElements).forEach(element => {  
          element.addEventListener('click', () => {  
             const productId = element.getAttribute('data-id');  
             redirectToDetails(productId);  
         });
      }); 
      }  
   } catch (error) {  
      errorHandler(error);
   }  
}  

function redirectToDetails(id) {
   window.location.href = `/product-details.html?id=${id}`;
 }
 
 // Make it globally accessible
 window.redirectToDetails = redirectToDetails;
  

function setupPagination(totalItems) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    paginationContainer.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.innerText = i;
        pageButton.classList.add('pagination-button');
        // pageButton.className = "w-10 ml-4 border-2 px-4 py-2 cursor-pointer";
        pageButton.style.paddingTop = '8px'
        pageButton.style.paddingBottom = '8px'
        pageButton.style.paddingLeft = '16px'
        pageButton.style.paddingRight = '16px'
        pageButton.style.backgroundColor = (i === 1) ? 'black' : 'white';
        pageButton.style.color = (i === 1) ? 'white' : 'black';

        pageButton.addEventListener('click', async () => {
            currentPage = i;
            await fetchResults(); 
            updateButtonStyles(i);
        });
        paginationContainer.appendChild(pageButton);
    }
}

function updateButtonStyles(selectedPage) {
    const buttons = paginationContainer.getElementsByClassName('pagination-button');
    for (let button of buttons) {
        if (parseInt(button.innerText) === selectedPage) {
            button.style.backgroundColor = 'black';
            button.style.color = 'white';
        } else {
            button.style.backgroundColor = 'white';
            button.style.color = 'black';
        }
    }
}
 
  
Search()