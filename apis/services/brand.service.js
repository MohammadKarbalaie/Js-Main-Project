import { urls } from "../url";
import { httpClient } from "../client";

export async function getBrandByName(page, brands = null) {  
    const params = { page, limit: 42 };  
    if (brands) {  
       params.brands = brands;  
    }  
    const response = await httpClient().get(urls.sneaker, { params });  
    return response.data;  
 }  
   
 export async function getBrands() {  
    const response = await httpClient().get(urls.brands);  
    return response.data;  
 }