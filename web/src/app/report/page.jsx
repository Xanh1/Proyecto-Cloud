"use client";

import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import swal from "sweetalert";

import { useRouter } from "next/navigation";
import {
  changeStatusCancel,
  changeStatusFinish,
  changeStatusInProgress,
  list_reports,
} from "@/hooks/service_report";
import HeaderAccount from "@/components/HeaderAccount";

export default function Report() {
  const router = useRouter();
  const [reports, setReports] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const token = Cookies.get("token");

  const statusMap = {
    pending: "Pendiente",
    in_progress: "En progreso",
    resolved: "Resuelto",
    closed: "Cerrado",
  };

  // necsito cambiar aca
  useEffect(() => {
    if (!token) {
      setIsLoggedIn(false);
      return;
    }

    list_reports(token)
      .then((info) => {
        console.log(info);
        if (info.code === 200) {
          setReports(info.context);
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

  const handleStatusChangeToProgress = async (report_uid) => {
    const data = { report: report_uid };

    changeStatusInProgress(data, token).then((info) => {
      if (info.code === 200) {
        swal({
          title: "Acción Satisfactoria",
          text: "El reporte esta en progreso",
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

  const handleStatusChangeToCancel = async (report_uid) => {
    const data = { report: report_uid };

    changeStatusCancel(data, token).then((info) => {
      if (info.code === 200) {
        swal({
          title: "Acción Satisfactoria",
          text: "El reporte ha sido cancelado",
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

  const handleStatusChangeToFinish = async (report_uid) => {
    const data = { report: report_uid };

    changeStatusFinish(data, token).then((info) => {
      if (info.code === 200) {
        swal({
          title: "Acción Satisfactoria",
          text: "El reporte ha finalizado",
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
    <div className="min-h-screen flex flex-col items-center bg-white text-black">
      <HeaderAccount />
      <main className="flex-1 w-full px-6 py-10">
        <div className="flex justify-between">
          <h1 className="font-semibold text-2xl">Reportes</h1>
        </div>
        <div className="my-8">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 text-sm text-gray-500 font-semibold tracking-wide text-left">
                  Nro
                </th>
                <th className="p-3 text-sm text-gray-500 font-semibold tracking-wide text-left">
                  Motivo
                </th>
                <th className="p-3 text-sm text-gray-500 font-semibold tracking-wide text-left">
                  Descripción
                </th>
                <th className="p-3 text-sm text-gray-500 font-semibold tracking-wide text-left">
                  Estado
                </th>
                <th className="p-3 text-sm text-gray-500 font-semibold tracking-wide text-left">
                  Gestion
                </th>
              </tr>
            </thead>
            <tbody>
              {reports &&
                reports.map((report, index) => (
                  <tr key={index}>
                    <td className="p-3 text-sm text-gray-700">{index + 1}</td>
                    <td className="p-3 text-sm text-gray-700">
                      {report.subject}
                    </td>
                    <td className="p-3 text-sm text-gray-700">
                      {report.description}
                    </td>
                    <td className="p-3 text-sm text-gray-700">
                      {statusMap[report.status] || "Desconocido"}
                    </td>
                    <td className="p-3 text-sm text-gray-700">
                      {report.status === "pending" ? (
                        <button
                          className="px-3 py-1 bg-blue-500 text-white rounded"
                          title="Click para iniciar el reporte"
                          onClick={() =>
                            handleStatusChangeToProgress(report.uid)
                          }
                        >
                          Iniciar
                        </button>
                      ) : report.status === "in_progress" ? (
                        <>
                          <button
                            className="px-3 py-1 bg-green-500 text-white rounded mr-2"
                            onClick={() =>
                              handleStatusChangeToFinish(report.uid)
                            }
                          >
                            Finalizar
                          </button>
                          <button
                            className="px-3 py-1 bg-red-500 text-white rounded"
                            onClick={() =>
                              handleStatusChangeToCancel(report.uid)
                            }
                          >
                            Rechazar
                          </button>
                        </>
                      ) : null}
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
