import { errorHandler } from "../libs/error-handler";
import { GetProductsInfo } from "../apis/services/product-details.servies";
import { toast } from "../libs/toast";

// Get HTML elements for displaying product information
const pimage = document.getElementById('Productimg');
const pname = document.getElementById('Productname');
const pcolor = document.getElementById('Productsize');
const psize = document.getElementById('Productcolor');
const pprice = document.getElementById('Productprice');
const minusButton = document.getElementById('minus');
const plusButton = document.getElementById('plus');
const resultDisplay = document.getElementById('resultq');
let count = 0;

minusButton.addEventListener('click', () => {
    if (count > 0) {
        count--;
        resultDisplay.textContent = count;
    }
});

plusButton.addEventListener('click', () => {
    count++;
    resultDisplay.textContent = count;
});

const toggleButton = document.getElementById('viewMoreBtn');
const paragraph = document.getElementById('textContent');


toggleButton.textContent = 'View More';
toggleButton.className = 'view-more-button';

const fullText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, mollitia.';
const truncatedText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';

paragraph.textContent = truncatedText;

toggleButton.addEventListener('click', () => {
    if (paragraph.textContent === truncatedText) {
        paragraph.textContent = fullText;
        toggleButton.textContent = 'View Less';
    } else {
        paragraph.textContent = truncatedText;
        toggleButton.textContent = 'View More';
    }
});



// Function to fetch product info based on ID
async function fetchProductInfo(id) {
    try {
        const response = await GetProductsInfo(id);
        displayProductInfo(response);
    } catch (error) {
        errorHandler(error);
    }
}
let selectedSize = null;
// Function to display product information in the UI
function displayProductInfo(product) {
    pimage.src = product.imageURL;
    pname.textContent = product.name;
    pprice.textContent = `$${product.price}`+ "."+"00"

        // Display sizes
        psize.innerHTML = '';
        const sizesArray = product.sizes.split('|'); // Split sizes string into an array
        sizesArray.forEach(size => {
            const sizeButton = document.createElement('button');
            sizeButton.textContent = size;
            sizeButton.style.border = "1px solid black";
            sizeButton.style.borderRadius = "50%";
            sizeButton.style.padding = '10px 15px'; // Add some margin for better spacing
    
            // Set initial styles
            if (selectedSize === size) {
                sizeButton.style.backgroundColor = "black";
                sizeButton.style.color = "white";
            } else {
                sizeButton.style.backgroundColor = "white";
                sizeButton.style.color = "black";
            }
    
            // Add click event listener
            sizeButton.onclick = () => {
                // Reset previous selected size button
                if (selectedSize) {
                    const previousButton = psize.querySelector(`button[data-size='${selectedSize}']`);
                    if (previousButton) {
                        previousButton.style.backgroundColor = "white";
                        previousButton.style.color = "black";
                    }
                }
    
                // Update selected size
                selectedSize = size;
                sizeButton.style.backgroundColor = "black"; // Set selected button background
                sizeButton.style.color = "white"; // Set selected button text color
    
                // Call selectSize function if needed
                 // Ensure selectSize function is defined
            };
    
            // Set a data attribute to easily identify the button later
            sizeButton.setAttribute('data-size', size);
            psize.appendChild(sizeButton);
        });




        pcolor.innerHTML = '';  
        const colorsArray = product.colors.split('|');  
        let selectedColorButton = null;   
        colorsArray.forEach(color => {  
          const colorButton = document.createElement('button');  
          colorButton.style.backgroundColor = color; 
          colorButton.style.padding = '10px 18px';  
          colorButton.style.border = "1px solid black";  
          colorButton.style.borderRadius = "50%";  
          colorButton.onclick = () => {  
           if (selectedColorButton) {  
            selectedColorButton.innerHTML = '';  
           }  
           const img1 = '<img src="/public/checkm.ico"/>'
           colorButton.innerHTML= img1  
           selectedColorButton = colorButton;  
          };  
          pcolor.appendChild(colorButton);  
        });
}

// Function to get URL parameters
function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        id: params.get('id')
    };
}

// Extract the product ID from the URL
const { id } = getQueryParams();

// Fetch product information when the page loads
loadProductDetails(id);

// Fetch product information using the ID
async function loadProductDetails(id) {
    if (id) {
        await fetchProductInfo(id);
    } else {
        toast("Product ID is missing.");
    }
}

