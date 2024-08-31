import { errorHandler } from "../libs/error-handler";
import { GetProductsInfo } from "../apis/services/product-details.servies";
import { toast } from "../libs/toast";

// Get HTML elements for displaying product information
const pimage = document.getElementById('Productimg');
const pname = document.getElementById('Productname');
const pcolor = document.getElementById('Productsize');
const psize = document.getElementById('Productcolor');
const pprice = document.getElementById('Productprice');

// Function to fetch product info based on ID
async function fetchProductInfo(id) {
    try {
        const response = await GetProductsInfo(id);
        displayProductInfo(response);
    } catch (error) {
        errorHandler(error);
    }
}

// Function to display product information in the UI
function displayProductInfo(product) {
    pimage.src = product.imageURL;
    pname.textContent = product.name;
    pprice.textContent = `$${product.price}`;

    // Display sizes
    psize.innerHTML = '';
    product.sizes.forEach(size => {
        const sizeButton = document.createElement('button');
        sizeButton.textContent = size;
        sizeButton.style.border = "1px solid black"; // Updated to apply border correctly
        sizeButton.style.padding = '20px';
        sizeButton.onclick = () => selectSize(size);
        psize.appendChild(sizeButton);
    });

    // Display colors
    pcolor.innerHTML = '';
    product.colors.forEach(color => {
        const colorButton = document.createElement('button');
        colorButton.style.backgroundColor = color;
        colorButton.style.padding = '20px';
        colorButton.onclick = () => selectColor(color);
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