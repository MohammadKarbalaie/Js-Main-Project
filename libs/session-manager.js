import { tokenName } from "./constant";

export const setSession = () =>{
    localStorage.setItem(tokenName,token);
};

export const getSessionToken = () =>{
    return localStorage.getItem(tokenName);
};

export const removeSessionToken = () =>{
    localStorage.removeItem(tokenName);
};