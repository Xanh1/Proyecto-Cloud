const URL_ACCOUNT = "https://autenticacion.blackgrass-9559a3b0.westus2.azurecontainerapps.io/";
const URL_REPORT = "https://reportes.blackgrass-9559a3b0.westus2.azurecontainerapps.io/";

const URL_NOTIFICATION = "https://notificaciones.blackgrass-9559a3b0.westus2.azurecontainerapps.io/";

import axios from 'axios';

export const POST_AC = async (resource: any, data: any, token:string = "NONE") => {
    let headers: any = {
        "Accept": "application/json",
        "Content-Type": "application/json"
    };
    
    if (token !== "NONE") {
        headers["X-Access-Token"] = token;
    }

    return await axios.post(URL_ACCOUNT + resource, data, { headers });
};

export const GET_RP = async (resource: any, token = "NONE") => {

    let headers: any = {
        headers: {
            "Accept": "application/json",
        }
    }

    if (token !== "NONE") {
        headers["X-Access-Token"] = token;
    }

    return await axios.get(URL_REPORT + resource, headers);
}


export const POST_RP = async (resource: any, data: FormData, token:string = "NONE") => {

    let headers: any = {};

    if (token !== "NONE") {
        headers["X-Access-Token"] = token;
    }
    if (data instanceof FormData) {
        headers["Accept"] = "application/json";
        headers["Content-Type"] ='multipart/form-data';
    } else {
        headers["Accept"] = "application/json";
        headers["Content-Type"] = "application/json";
    }

    console.log(headers);
       
    return await axios.post(URL_REPORT + resource, data, { headers });
};

export const POST_NT = async (resource: any, data: any, token:string = "NONE") => {
    let headers: any = {
        "Accept": "application/json",
        "Content-Type": "application/json"
    };
    
    if (token !== "NONE") {
        headers["X-Access-Token"] = token;
    }

    return await axios.post(URL_NOTIFICATION + resource, data, { headers });
};