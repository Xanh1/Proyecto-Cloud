"use client";
import Link from "next/link";
import { list_persons, modify_status } from "../../hooks/service_person";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import swal from "sweetalert";
import { useRouter } from "next/navigation";
import HeaderAccount from "@/components/HeaderAccount";

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
    router.push("/login");
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
      }
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 text-black">
      <HeaderAccount />
      <main className="flex-1 w-full max-w-6xl px-4 py-10">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <h1 className="font-semibold text-3xl text-gray-800">Cuentas</h1>
          <Link
            href="/municipal/new"
            className="py-2 px-4 mt-3 sm:mt-0 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm shadow-md transition"
          >
            Agregar Cuenta
          </Link>
        </div>

        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="w-full text-sm text-left text-gray-600">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="p-4">Nro</th>
                <th className="p-4">Dni</th>
                <th className="p-4">Nombre</th>
                <th className="p-4">Apellido</th>
                <th className="p-4">Correo</th>
                <th className="p-4">Creado en</th>
                <th className="p-4">Estado</th>
              </tr>
            </thead>
            <tbody>
              {persons &&
                persons.map((person, index) => (
                  <tr
                    key={index}
                    className="border-b hover:bg-gray-100 transition"
                  >
                    <td className="p-4">{index + 1}</td>
                    <td className="p-4">{person.dni}</td>
                    <td className="p-4">{person.name}</td>
                    <td className="p-4">{person.last_name}</td>
                    <td className="p-4">{person.email}</td>
                    <td className="p-4">{format_fecha(person.created_at)}</td>
                    <td className="p-4 text-center">
                      <input
                        type="checkbox"
                        className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring focus:ring-blue-200"
                        checked={person.status}
                        onChange={() => handleStatusChange(person.uid)}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
