import { GET_RP, POST_RP } from "./Connection";

export async function list_reports(token) {
    let datos = null;
    
    try{
        datos = await GET_RP('report/all', token);
    }
    
    catch(error){
        return error;
    }
    
    return datos.data
}

export async function changeStatusInProgress(data, token){
    let datos = null;
    try{
        datos = await POST_RP('report/start', data, token);
    }
    catch(error){
        return error;
    }
    return datos.data
}
export async function changeStatusCancel(data, token){
    let datos = null;
    try{
        datos = await POST_RP('report/cancel', data, token);
    }
    catch(error){
        return error;
    }
    return datos.data
}
export async function changeStatusFinish(data, token){
    let datos = null;
    try{
        datos = await POST_RP('report/finish', data, token);
    }
    catch(error){
        return error;
    }
    return datos.data
}