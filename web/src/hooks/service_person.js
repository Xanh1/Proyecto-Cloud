import {GET_AC, POST_AC} from "./Connection";

export async function list_persons(token) {
    let datos = null;
    try{
        datos = await GET_AC('users/person', token);
    }
    catch(error){
        return error;
    }
    return datos.data
}

export async function save_person(data, token) {
    let datos = null;
    try {
        datos = await POST_AC("users/person/save", data, token);
        
    } catch (error) {
        return error;

    }
    return datos.data;
}

export async function search_person(external, token){
    let datos = null;
    try{
        datos = await GET_AC('users/person/search/uid/'+external, token);
    }
    catch(error){
        return error;
    }
    return datos.data
}



export async function modify_person(data, token){
    let datos = null;
    try{
        datos = await POST_AC('users/person/modify', data, token);
    }
    catch(error){
        return error;
    }
    return datos.data
}

export async function modify_person_email(data, token){
    let datos = null;
    try{
        datos = await POST_AC('users/person/modify/email', data, token);
    }
    catch(error){
        return error;
    }
    return datos.data
}

export async function modify_status(data, token){
    let datos = null;
    try{
        datos = await POST_AC('users/person/change_state', data, token);
    }
    catch(error){
        return error;
    }
    return datos.data
}