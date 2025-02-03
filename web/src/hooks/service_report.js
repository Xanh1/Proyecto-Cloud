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
        datos = await POST_RP('notificaciones/estadoenprogreso', data, token);
    }
    catch(error){
        return error;
    }
    return datos.data
}
export async function changeStatusCancel(data, token){
    let datos = null;
    try{
        datos = await POST_RP('notificaciones/estadocancelado', data, token);
    }
    catch(error){
        return error;
    }
    return datos.data
}
export async function changeStatusFinish(data, token){
    let datos = null;
    try{
        datos = await POST_RP('notificaciones/estadofinalizar', data, token);
    }
    catch(error){
        return error;
    }
    return datos.data
}