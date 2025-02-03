import {GET_AC, GET_NOTIFIMUNI, POST_AC} from "./Connection";

export async function list_notificacionmuni(token) {
    let datos = null;
    try{
        datos = await GET_NOTIFIMUNI('notificaciones/all', token);
    }
    catch(error){
        return error;
    }
    return datos.data
}

export async function list_notificacioncuidano(token) {
    let datos = null;
    try{
        datos = await GET_NOTIFIMUNI('notificaciones/all', token);
    }
    catch(error){
        return error;
    }
    return datos.data
}
