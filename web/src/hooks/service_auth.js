import { POST_AC } from "./Connection";
import { GET_AC } from "./Connection";

export async function authPerson(data) {

  let datos = null;

  try {

    datos = await POST_AC("login", data);

  } catch (error) {
    console.log(error)
    return error;
    
  }

  return datos.data;

}

export async function validarToken(token) {

  let datos = null;

  try {

    datos = await GET_AC("validar", token);

  } catch (error) {
    return error.response.data;
  }

  return datos.data;
}