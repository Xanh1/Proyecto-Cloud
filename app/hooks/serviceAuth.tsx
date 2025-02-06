import * as SecureStore from "expo-secure-store";
import { POST_AC } from "./Connection";

export async function  authPerson(data:any) {
    
    let datos = null;

    try {

        datos = await POST_AC("users/login/app", data);
        
    } catch (error) {
        return error;
    }

    return datos.data;
}

export async function saveToken(token: string) {
    await SecureStore.setItemAsync("token", token);
};
  
export async function getToken() {
    return await SecureStore.getItemAsync("token");
};

export async function removeToken(){
    await SecureStore.deleteItemAsync("token");
}