import { GET_RP, POST_RP } from "./Connection";

export async function getReports(user:any) {

    let datos = null;

    try {
        datos = await GET_RP('report/all/'+ user);
    } catch (error) {
        return error;
    } 

    return datos.data
}

export async function  createReport(data:any) {
    
    let datos = null;

    try {

        datos = await POST_RP("create", data);
        
    } catch (error) {
        return error;
    }

    return datos.data;
}