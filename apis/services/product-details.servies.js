import {urls} from "../url";
import { httpClient } from "../client";

export async function GetProductsInfo(id) {  
    const response = await httpClient().get(urls.sneakeritm(id))
    return response.data; 
 }

