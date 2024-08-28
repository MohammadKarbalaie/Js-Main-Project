import { urls } from "../url";
import { httpClient } from "../client";


export async function getUserInfo() {
  const response = await httpClient().get(urls.user);
  return response.data;
}

export async function getProducts(page){
  const response = await httpClient().get(urls.sneaker, { params: { page: page, limit: 10 } });
  return response.data;
}