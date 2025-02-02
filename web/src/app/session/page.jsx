"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import Cookies from "js-cookie";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { authPerson } from "../../hooks/service_auth";
import Header from "@/components/Header";


export default function login() {

  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .matches(
        /^[a-zA-Z0-9._%+-]+@(unl\.edu\.ec|gmail\.com)$/,
        "Ingrese un correo válido (@unl.edu.ec o gmail.com)"
      )
      .required("Ingresa tu correo").trim()
      ,
    password: Yup.string().trim().required("Ingresa tu contraseña"),
  });



  const router = useRouter();

  const formOptions = { resolver: yupResolver(loginSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  let { errors } = formState;

  const req = (data) => {
    authPerson(data).then((info) => {
      if (info.code == 200) {
        Cookies.set("token", info.token);
        Cookies.set("usuario", info.person);
        Cookies.set("necesary", info.necesary);
        swal({
          title: "Acción Satisfactoria",
          text: "Bienvenido " + info.person.replace(".", " "),
          icon: "success",
          button: "Accept",
          timer: 4000,
          closeOnEsc: true,
        });
        router.push("/person");
        router.refresh();
      } else {
        
        swal({
          title: "Error iniciando sesión",
          text: info.response.data.datos.error,
          icon: "error",
          button: "Accept",
          timer: 4000,
          closeOnEsc: true,
        });
      }
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center bg-white text-black">
      <Header />
      <main className="flex-1 flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center items-center">
          <svg
            width="64px"
            height="64px"
            viewBox="-1.6 -1.6 19.21 19.21"
            xmlns="http://www.w3.org/2000/svg"
            fill="#000000"
            transform="rotate(0)"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                color="#000000"
                d="M13.41 4.002a2.491 2.491 0 0 0-1.816.89c-.46.514.34 1.186.766.643a1.495 1.495 0 0 1 1.822-.375c.623.313.946 1.007.785 1.686A1.495 1.495 0 0 1 13.508 8H1.5C.678 8 0 8.678 0 9.5a1.508 1.508 0 0 0 1.51 1.502h9.01c.235 0 .432.155.487.383a.495.495 0 0 1-.262.562.495.495 0 0 1-.608-.125c-.425-.542-1.226.13-.765.643a1.499 1.499 0 0 0 1.822.377c.619-.31.945-1.014.785-1.688a1.489 1.489 0 0 0-1.293-1.123.5.5 0 0 0-.174-.029h-9.01V10a.493.493 0 0 1-.5-.5c0-.282.218-.5.5-.5H13.51a.506.506 0 0 0 .1-.008 2.502 2.502 0 0 0 2.334-1.916 2.504 2.504 0 0 0-1.31-2.81 2.496 2.496 0 0 0-1.221-.264zm-4.705.01a1.497 1.497 0 0 0-1.338.523c-.46.513.34 1.186.766.643.15-.18.398-.23.607-.125.21.105.316.334.262.562A.495.495 0 0 1 8.516 6h-5.01c-.676-.01-.676 1.01 0 1h5.01c.055 0 .11-.009.162-.027a1.492 1.492 0 0 0 1.295-1.127 1.503 1.503 0 0 0-1.27-1.834z"
                fill="black"
                style={{
                  fontFamily: "sans-serif",
                  fontWeight: 400,
                  lineHeight: "normal",
                  fontVariantLigatures: "normal",
                  fontVariantPosition: "normal",
                  fontVariantCaps: "normal",
                  fontVariantNumeric: "normal",
                  fontVariantAlternates: "normal",
                  fontFeatureSettings: "normal",
                  textIndent: 0,
                  textAlign: "start",
                  textDecorationLine: "none",
                  textDecorationStyle: "solid",
                  textDecorationColor: "#000000",
                  textTransform: "none",
                  textOrientation: "mixed",
                  shapePadding: 0,
                  isolation: "auto",
                  mixBlendMode: "normal",
                  whiteSpace: "normal",
                }}
              />
            </g>
          </svg>

          <h1 className="font-semibold text-2xl">Inicio de Sesión</h1>
        </div>
        <form className="my-8" onSubmit={handleSubmit(req)}>
          <div className="max-w-md my-3">
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Correo Electrónico
            </label>
            <input
              type="email"
              name="email"
              id="email"
              {...register("email")}
              className="py-2 px-2 block w-full border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
            />
            <span className="block text-red-500 text-xs pl-1 min-h-5">
              {errors.email?.message}
            </span>
          </div>
          <div className="max-w-sm my-3">
            <label htmlFor="password" className="block text-sm font-medium mb-2">
              Contraseña
            </label>
            <input  
              type="password"
              name="password"
              id="password"
              {...register("password")}
              className="py-2 px-2 block w-full border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
            />
            <span className="block text-red-500 text-xs pl-1 min-h-5">
              {errors.password?.message}
            </span>
          </div>
          <div className="my-4">
            <button className="w-full py-1 px-2 rounded bg-black border border-black text-white">
              Iniciar Sesión
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}