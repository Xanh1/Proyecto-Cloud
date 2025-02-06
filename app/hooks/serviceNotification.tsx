import { POST_NT } from "./Connection";



export async function notify(data:any) {
    
    let datos = null;
    
    try {

        datos = await POST_NT("notificaciones/crear", data);
        
    } catch (error) {
        return error;
    }

    return datos.data;
}