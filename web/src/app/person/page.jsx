"use client";
import Link from "next/link";
import { list_persons, modify_status } from "../../hooks/service_person";

import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import swal from "sweetalert";

import { useRouter } from "next/navigation";
import UserSidebar from "../../components/UserSidebar";

export default function Person() {
  const router = useRouter();
  const [persons, setPersons] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const token = Cookies.get("token");

  useEffect(() => {
    if (!token) {
      setIsLoggedIn(false);
      return;
    }

    list_persons(token)
      .then((info) => {
        if (info.code === 200) {
          setPersons(info.datos);
        } else {
          setIsLoggedIn(false);
        }
      })
      .catch(() => {
        setIsLoggedIn(false);
      });
  }, []);

  const format_fecha = (fecha) => {
    const date = new Date(fecha);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  if (!isLoggedIn) {
    swal({
      title: "Error",
      text: "Vuelva a Iniciar Sesion",
      icon: "error",
      button: "Accept",
      timer: 8000,
      closeOnEsc: true,
    });
    Cookies.remove("token");
    Cookies.remove("user");
    router.push("/session");
    return null;
  }

  const handleStatusChange = async (person_uid) => {
    const data = { external: person_uid };
    modify_status(data, token).then((info) => {
      if (info.code === 200) {
        swal({
          title: "Acción Satisfactoria",
          text: "Estado actualizado",
          icon: "success",
          button: "Accept",
          timer: 8000,
          closeOnEsc: true,
        }).then(() => {
          window.location.reload();
        });
      } else {
        swal({
          title: "Error",
          text: info.response.request.statusText,
          icon: "error",
          button: "Aceptar",
          timer: 8000,
          closeOnEsc: true,
        }).then(() => {
          window.location.reload();
        });
        console.log("No se pudo actualizar");
      }
    });
  };

  return (
    <div className="h-screen flex">

      <main className="flex-1 flex">
        <UserSidebar />
        <div className="flex-1 py-6 sm:ml-64">
          <div className="py-4 px-10 rounded-lg mt-14">

            <div className="flex justify-between">
              <h1 className="font-semibold text-2xl">Cuentas</h1>
              <Link
                href="/person/new"
                className="py-1 px-3 rounded-lg bg-blue-500 text-white text-sm content-center"
              >
                Agregar Cuenta
              </Link>
            </div>

            <div className="my-8">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-3 text-sm text-gray-500 font-semibold tracking-wide text-left">
                      Nro
                    </th>
                    <th className="p-3 text-sm text-gray-500 font-semibold tracking-wide text-left">
                      Dni
                    </th>
                    <th className="p-3 text-sm text-gray-500 font-semibold tracking-wide text-left">
                      Nombre
                    </th>
                    <th className="p-3 text-sm text-gray-500 font-semibold tracking-wide text-left">
                      Apellido
                    </th>
                    <th className="p-3 text-sm text-gray-500 font-semibold tracking-wide text-left">
                      Correo
                    </th>
                    <th className="p-3 text-sm text-gray-500 font-semibold tracking-wide text-left">
                      Creado en
                    </th>
                    <th className="p-3 text-sm text-gray-500 font-semibold tracking-wide text-left">
                      Estado
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {persons &&
                    persons.map((person, index) => (
                      <tr key={index}>
                        <td className="p-3 text-sm text-gray-700 ">
                          {index + 1}
                        </td>

                        <td className="p-3 text-sm text-gray-700 ">
                          {person.dni}
                        </td>
                        <td className="p-3 text-sm text-gray-700 ">
                          {person.name}
                        </td>
                        <td className="p-3 text-sm text-gray-700 ">
                          {person.last_name}
                        </td>
                        <td className="p-3 text-sm text-gray-700 ">
                          {person.email}
                        </td>
                        <td className="p-3 text-sm text-gray-700 ">
                          {format_fecha(person.created_at)}
                        </td>
                        <td className="p-3 text-sm text-gray-700 pl-8">
                          <input
                            type="checkbox"
                            checked={person.status}
                            onChange={(e) =>
                              handleStatusChange(person.uid, e.target.checked)
                            }
                          />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}