const URL_ACCOUNT = process.env.API_ACCOUNT_SERVICE;
const URL_REPORT = process.env.API_REPORT_SERVICE;
const URL_NOTIFICATION = process.env.API_NOTIFICATION;

import axios from 'axios';

// Metodo POST
export const POST_SE = async (resource, data, token = "NONE") => {
    let headers = {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    }
    if (token != "NONE") {
        headers = {
            headers: {
                "Accept": "application/json",
                "X-Access-Token": token
            }
        }
    }
    return await axios.post(URL_SENSOR + resource, data, headers)
}

export const POST_AC = async (resource, data, token = "NONE") => {
    let headers = {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    }
    if (token != "NONE") {
        headers = {
            headers: {
                "Accept": "application/json",
                "X-Access-Token": token
            }
        }
    }
    return await axios.post(URL_ACCOUNT + resource, data, headers)
}

export const POST_RP = async (resource, data, token = "NONE") => {
    let headers = {};

    if (token !== "NONE") {
        headers["X-Access-Token"] = token;
    }

    if (data instanceof FormData) {
        headers["Accept"] = "application/json";
    } else {
        headers["Accept"] = "application/json";
        headers["Content-Type"] = "application/json";
    }

    try {
       
        const response = await axios.post(URL_REPORT + resource, data, { headers });
        return response;
    } catch (error) {
        console.error("Error en la solicitud:", error);
        throw error;
    }
}

// Metodo GET
export const GET_SE = async (resource, token = "NONE") => {
    let headers = {
        headers: {
            "Accept": "application/json",
        }
    }
    if (token != "NONE") {
        headers = {
            headers: {
                "Accept": "application/json",
                "X-Access-Token": token,
            }
        }
    }
    return await axios.get(URL_SENSOR + resource, headers);
}

export const GET_AC = async (resource, token = "NONE") => {
    let headers = {
        headers: {
            "Accept": "application/json",
        }
    }
    if (token != "NONE") {
        headers = {
            headers: {
                "Accept": "application/json",
                "X-Access-Token": token,
            }
        }
    }
    return await axios.get(URL_ACCOUNT + resource, headers);
}

export const GET_RP = async (resource, token = "NONE") => {
    let headers = {
        headers: {
            "Accept": "application/json",
        }
    }
    if (token != "NONE") {
        headers = {
            headers: {
                "Accept": "application/json",
                "X-Access-Token": token,
            }
        }
    }
    return await axios.get(URL_REPORT + resource, headers);
}



export const GET_NOTIFIMUNI = async (resource, token = "NONE") => {
    let headers = {
        headers: {
            "Accept": "application/json",
        }
    }
    if (token != "NONE") {
        headers = {
            headers: {
                "Accept": "application/json",
                "X-Access-Token": token,
            }
        }
    }
    return await axios.get(URL_NOTIFICATION + resource, headers);
}

export const POST_NOTI = async(resource, data, token = "NONE") => {
    let headers = {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    }
    if (token != "NONE") {
        headers = {
            headers: {
                "Accept": "application/json",
                "X-Access-Token": token
            }
        }
    }
    return await axios.post(URL_NOTIFICATION + resource, data, headers)
}