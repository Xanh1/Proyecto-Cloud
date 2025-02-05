import {POST_NOTI} from "./Connection";

export async function create_notificacion(data, token) {
    let datos = null;
    try{
        datos = await POST_NOTI("notificaciones/create", data);
    }
    catch(error){
        return error;
    }
    return datos.data
}

export async function notificar_all_municipales(data) {
    let datos = null;
    try{
        datos = await POST_NOTI("notificaciones/notificar/municipales", data);
    }
    catch(error){
        return error;
    }
    return datos.data
}

