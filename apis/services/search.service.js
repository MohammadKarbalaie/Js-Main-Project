import { urls } from "../url";
import { httpClient } from "../client";

export async function getSearch(page,search) {  
    const params = { page, limit: 42 };  
    if (search) {  
       params.search = search;  
    } 
    
    const response = await httpClient().get(urls.sneaker, { params }); 
    return response.data;  
 } 
