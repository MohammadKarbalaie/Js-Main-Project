import axios from "axios";
import {getSessionToken} from "../libs/session-manager";

export const httpClient = () =>{
    const token = getSessionToken();
    return axios.create({
        baseURL : "localhost:3000",
        timeout: 3000,
        headers :{ Authorization : `Bearer ${token}` },
    });
};  