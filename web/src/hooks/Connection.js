const URL_ACCOUNT = process.env.API_ACCOUNT_SERVICE;
const URL_SENSOR = process.env.API_SENSOR_SERVICE;

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