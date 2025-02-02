const URL_ACCOUNT = "http://192.168.3.28:5000/";
const URL_REPORT = "http://192.168.3.28:5001/";

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


export const POST_RP = async (resource: any, data: any, token:string = "NONE") => {
    let headers: any = {
        "Accept": "application/json",
        "Content-Type": "application/json"
    };
    
    if (token !== "NONE") {
        headers["X-Access-Token"] = token;
    }

    return await axios.post(URL_REPORT + resource, data, { headers });
};
