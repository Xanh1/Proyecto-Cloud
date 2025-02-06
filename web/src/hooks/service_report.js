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

export async function list_reports_desc(token) {
    let datos = null;
    
    try{
        datos = await GET_RP('reports/all/desc');
    }
    
    catch(error){
        return error;
    }
    
    return datos.data
}



export async function listar_reportes_ciudadano(token, uid) {
    let datos = null;
    try{
        datos = await GET_RP('report/user/'+uid, token);
    }
    catch(error){
        return error;
    }
    return datos.data
}

export async function get_report_by_id(uid) {
    let datos = null;
    try{
        datos = await GET_RP('/report/view/'+uid);
    }
    catch(error){
        return error;
    }
    return datos.data
}

export async function update_report(data, token){
    let datos = null;
    try{
        datos = await POST_RP('report/update', data, token);
    }
    catch(error){
        return error;
    }
    return datos.data
}

export async function delete_report(data, token){
    let datos = null;
    try{
        datos = await POST_RP('report/delete', data, token);
    }
    catch(error){
        return error;
    }
    return datos.data
}

export async function create_report(params) {
    let datos = null;
    try{
        datos = await POST_RP('report/create', params);
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