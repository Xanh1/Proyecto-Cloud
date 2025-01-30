import { POST_AC } from "./Connection";
import { GET_AC } from "./Connection";

export async function authPerson(data) {

  let datos = null;

  try {

    datos = await POST_AC("users/login", data);

  } catch (error) {
    return error;
    
  }

  return datos.data;

}

export async function validarToken(token) {

  let datos = null;

  try {

    datos = await GET_AC("users/validar", token);

  } catch (error) {
    return error.response.data;
  }

  return datos.data;
}