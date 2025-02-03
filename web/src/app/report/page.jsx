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
    const data = { report_uuid: report_uid };
  
    try {
      const response = await changeStatusInProgress(data, token);
  
      // Verifica si el tipo de respuesta es "Success"
      if (response.tipo === "Success") {
        swal({
          title: "Acción Satisfactoria",
          text: "El reporte está en progreso",
          icon: "success",
          button: "Aceptar",
          timer: 8000,
          closeOnEsc: true,
        }).then(() => {
          window.location.reload();
        });
      } else {
        // Manejo de error según la estructura de respuesta
        swal({
          title: "Error",
          text: response.mensaje || "No se pudo actualizar el estado",
          icon: "error",
          button: "Aceptar",
          timer: 8000,
          closeOnEsc: true,
        });
        console.log("No se pudo actualizar");
      }
    } catch (error) {
      // Manejo de errores de red o internos
      swal({
        title: "Error",
        text: error.message || "Ocurrió un problema al actualizar el estado",
        icon: "error",
        button: "Aceptar",
        timer: 8000,
        closeOnEsc: true,
      });
      console.error("Error:", error);
    }
  };
  

  const handleStatusChangeToCancel = async (report_uid, token) => {
    if (!report_uid) {
      showErrorAlert("ID de reporte inválido");
      return;
    }
  
    const data = { report_uuid: report_uid }; // Verifica que este sea el nombre correcto
  
    try {
      console.log("Enviando petición para cancelar:", data);
      const response = await changeStatusCancel(data, token);
      
      console.log("Respuesta de la API:", response); // Verifica la estructura de la respuesta
  
      if (response.tipo === "Success") {
        showSuccessAlert("El reporte ha sido cancelado", true);
      } else {
        showErrorAlert(response.mensaje || "No se pudo cancelar el reporte");
      }
    } catch (error) {
      showErrorAlert(error.message || "Ocurrió un problema al cancelar el reporte");
      console.error("Error en la cancelación:", error);
    }
  };
  
  const handleStatusChangeToFinish = async (report_uid, token) => {
    if (!report_uid) {
      showErrorAlert("ID de reporte inválido");
      return;
    }
  
    const data = { report_uuid: report_uid }; // Verifica que este sea el nombre correcto
  
    try {
      console.log("Enviando petición para finalizar:", data);
      const response = await changeStatusFinish(data, token);
  
      console.log("Respuesta de la API:", response); // Verifica la estructura de la respuesta
  
      if (response.tipo === "Success") {
        showSuccessAlert("El reporte ha sido finalizado", true);
      } else {
        showErrorAlert(response.mensaje || "No se pudo finalizar el reporte");
      }
    } catch (error) {
      showErrorAlert(error.message || "Ocurrió un problema al finalizar el reporte");
      console.error("Error al finalizar:", error);
    }
  };
  
  // Función para mostrar alertas de éxito
  const showSuccessAlert = (message, reload = false) => {
    swal({
      title: "Acción Satisfactoria",
      text: message,
      icon: "success",
      button: "Aceptar",
      timer: 8000,
      closeOnEsc: true,
    }).then(() => {
      if (reload) {
        window.location.reload();
      }
    });
  };
  
  // Función para mostrar alertas de error
  const showErrorAlert = (message) => {
    swal({
      title: "Error",
      text: message,
      icon: "error",
      button: "Aceptar",
      timer: 8000,
      closeOnEsc: true,
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
