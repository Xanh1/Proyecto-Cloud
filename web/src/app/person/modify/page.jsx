"use client";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import swal from "sweetalert";
import { modify_person, search_person } from "../../../hooks/service_person";
import Cookies from "js-cookie";

import UserSidebar from "../../../components/UserSidebar";
import HeaderMenu from "../../../components/HeaderMenu";

import { useState } from "react";

export default function modifyPerson() {

  const token = Cookies.get("token");
  const uid = Cookies.get("necesary");

  const router = useRouter();
  let [estado, setEstado] = useState(false);
  let [person, setPerson] = useState(null);

  if (!estado) {
    search_person(uid, token).then((info) => {
      if (info.code == 200) {
        setPerson(info.datos);
      } else {
        swal({
          title: "Error",
          text: info.response.data.info.error,
          icon: "error",
          button: "Aceptar",
          timer: 8000,
          closeOnEsc: true,
        });
      }
    });
    setEstado(true);
  }

  const validationSchema = yup.object().shape({
    name: yup.string().required("Campos obligatorios"),
    last_name: yup.string().required("Campos obligatorios"),
    email: yup.string().required("Campos obligatorios (@unl.edu.ec)"),
    old_password: yup.string().required("Campos obligatorios"),
    password: yup
      .string()
      .required("Campos obligatorios")
      .oneOf([yup.ref("confirm_password")], "Contraseña no coincide"),
    confirm_password: yup.string().required("Contraseña no coincide"),
  });

  //validar formulario
  const formOption = { resolver: yupResolver(validationSchema) };
  //envío de formulario
  const { register, handleSubmit, formState } = useForm(formOption);

  let { errors } = formState;

  const enviar_data = (data) => {
    let datos = {
      name: data.name,
      last_name: data.last_name,
      email: data.email,
      password: data.password,
      external: uid,
      old_password: data.old_password,
    };
    modify_person(datos, token).then((info) => {
      if (info.code == "200") {
        swal({
          title: "Acción Satisfactoria",
          text: "Cuenta Actualizada",
          icon: "success",
          button: "Aceptar",
          timer: 8000,
          closeOnEsc: true,
        });
        router.push("/person");
        router.refresh();
      } else {
        swal({
          title: "Error",
          text: info.response.data.datos.error,
          icon: "error",
          button: "Aceptar",
          timer: 8000,
          closeOnEsc: true,
        });
        console.log("No se pudo registrar");
      }
    });
  };

  const cancelar = () => {
    router.push("/person");
  };

  return (
    <div className="flex flex-col h-screen">
      <HeaderMenu />
      <main className="flex flex-1">
        <UserSidebar />
        <div className="flex-1 py-6 sm:ml-64">
          <div className="py-4 rounded-lg mt-14">
            <h1 className="px-12 font-semilbold text-2xl text-left">
              Actualizar Cuenta
            </h1>
            <form
              className="my-8 flex flex-col justify-center items-center"
              onSubmit={handleSubmit(enviar_data)}
            >
              <div className="flex flex-col">
                <h1 className="font-semibold text-sm my-4">Personal info</h1>
                <div className="flex gap-4">
                  <div className="max-w-sm my-3">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium mb-2"
                    >
                      Nombre
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      defaultValue={person && person.name}
                      {...register("name")}
                      className="py-2 px-2 block w-full border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                    />
                    <span className="block text-red-500 text-xs pl-1 min-h-5">
                      {errors.name?.message}
                    </span>
                  </div>

                  <div className="max-w-sm my-3">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium mb-2"
                    >
                      Apellido
                    </label>
                    <input
                      type="text"
                      name="email"
                      id="email"
                      defaultValue={person && person.last_name}
                      {...register("last_name")}
                      className="py-2 px-2 block w-full border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                    />
                    <span className="block text-red-500 text-xs pl-1 min-h-5">
                      {errors.last_name?.message}
                    </span>
                  </div>
                </div>

                <div className="w-full my-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium mb-2"
                  >
                    Dni
                  </label>
                  <input
                    type="text"
                    name="dni"
                    id="dni"
                    defaultValue={person && person.dni}
                    {...register("dni")}
                    className="py-2 px-2 block w-full border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none bg-gray-100"
                    readOnly
                  />
                  <span className="block text-red-500 text-xs pl-1 min-h-5">
                    {errors.dni?.message}
                  </span>
                </div>

                <div className="flex flex-col">
                  <h1 className="font-semibold text-sm my-4">Información de la Cuenta</h1>

                  <div className="w-full my-2">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium mb-2"
                    >
                      Correo
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      defaultValue={person && person.email}
                      {...register("email")}
                      className="py-2 px-2 block w-full border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                    />
                    <span className="block text-red-500 text-xs pl-1 min-h-5">
                      {errors.email?.message}
                    </span>
                  </div>

                  <div className="w-full my-2">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium mb-2"
                    >
                      Contraseña Anterior
                    </label>
                    <input
                      type="password"
                      name="old_password"
                      id="password"
                      {...register("old_password")}
                      className="py-2 px-2 block w-full border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                    />
                    <span className="block text-red-500 text-xs pl-1 min-h-5">
                      {errors.old_password?.message}
                    </span>
                  </div>

                  <div className="w-full my-2">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium mb-2"
                    >
                      Nueva Contraseña
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

                  <div className="w-full my-2">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium mb-2"
                    >
                      Confirmar Contraseña
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      {...register("confirm_password")}
                      className="py-2 px-2 block w-full border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                    />
                    <span className="block text-red-500 text-xs pl-1 min-h-5">
                      {errors.confirm_password?.message}
                    </span>
                  </div>
                </div>
              </div>

              <div className="my-4 flex justify-between">
                {" "}
                {/* Changed to flex justify-between for left and right alignment */}
                <button
                  type="button"
                  onClick={cancelar}
                  className="btn relative border block w-full font-medium border-gray-200 inline-flex items-center justify-start overflow-hidden transition-all rounded-lg text-sm hover:bg-white group py-2 px-2"
                >
                  <span className="w-56 h-48 rounded bg-red-500 absolute bottom-0 left-0 translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                  <span className="relative w-full text-center transition-colors duration-300 ease-in-out group-hover:text-white">
                    Cancelar
                  </span>
                </button>
                <button className="btn relative border block w-full font-medium border-gray-200 inline-flex items-center justify-start overflow-hidden transition-all rounded-lg text-sm hover:bg-white group py-2 px-2 ml-4">
                  <span className="w-56 h-48 rounded bg-blue-500 absolute bottom-0 left-0 translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                  <span className="relative w-full text-center transition-colors duration-300 ease-in-out group-hover:text-white">
                    Actualizar
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}