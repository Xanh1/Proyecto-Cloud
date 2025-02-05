"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { FaArrowLeft, FaMapMarkerAlt } from "react-icons/fa";
import {create_notificacion} from "@/hooks/service_notifications";
import swal from "sweetalert";
import Cookies from "js-cookie";
import { get_report_by_id, update_report } from "@/hooks/service_report";
import HeaderAccount from "@/components/HeaderAccount";

const API_URL_REPORTES = "https://reportes.blackgrass-9559a3b0.westus2.azurecontainerapps.io";

const statusMap = {
  0: { label: "Pendiente", className: "bg-yellow-500" },
  1: { label: "En Proceso", className: "bg-blue-500" },
  2: { label: "Resuelto", className: "bg-green-500" },
  3: { label: "Rechazado", className: "bg-red-500" },
};
  const token = Cookies.get("token");
  const rol = Cookies.get("rol");
  const user_uid = Cookies.get("uid");
  

export default function ReportView() {
  const router = useRouter();
  const { uid } = useParams();
  const [report, setReport] = useState(null);
  const [status, setStatus] = useState(null);
  const [originalStatus, setOriginalStatus] = useState(null);
  const [userRole, setUserRole] = useState(null); 
  const [ciudadano_uid, setCiudadano_uid] = useState(null);

  useEffect(() => {
    const role = Cookies.get("rol"); // Obtener el rol del usuario desde las cookies
    setUserRole(role);

    if (uid) {
      get_report_by_id(uid).then((response) => {
        
        if (response.code === 200) {
          setReport(response.context);
          setStatus(response.context.status);
          setOriginalStatus(response.context.status);
          setCiudadano_uid(response.context.user_uid);
        } else {
          swal({
            title: "Error",
            text: response.mensaje || "No se pudo obtener el reporte.",
            icon: "error",
            button: "Aceptar",
            timer: 8000,
            closeOnEsc: true,
          });
        }
      });
    }
  }, [uid]);

  const handleStatusChange = (e) => {
    setStatus(Number(e.target.value));
  };

  const sendNoti = async (reporte_id, reporte_status) => {
    var data = {
      ciudadano_uid: ciudadano_uid,
      reporte_id: reporte_id,
      reporte_status: reporte_status,
      rol: rol ,
      municipal_uid: user_uid
    };
    try {
      const response = await create_notificacion(data, token);
      if (response.code === 200) {      
        console.log("Notificación enviada a ciudadano y municipal");
      } else{
        console.log("Notificación no enviada");
      }
    } catch (error) {
      console.log("Error al enviar notificación");
    }
  };

  const saveStatusChange = () => {
    const data = { report: uid, status: status };

    update_report(data, token).then((response) => {
      sendNoti(uid, statusMap[status].label);   
      if (response.code === 200) {
        swal({
          title: "Éxito",
          text: "Estado actualizado correctamente",
          icon: "success",
          button: "Aceptar",
          timer: 5000,
        });
        setOriginalStatus(status);
      } else {
        swal({
          title: "Error",
          text: "No se pudo actualizar el estado",
          icon: "error",
          button: "Aceptar",
          timer: 5000,
        });
      }
    });
  };

  if (!report) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-white text-black">
      <HeaderAccount />
      <main className="flex-1 w-full px-6 py-10">
        <div className="flex justify-between">
          <h1 className="font-semibold text-2xl"> {report.subject}</h1>

          <button
            onClick={() =>
              userRole === "municipal"
                ? router.push("/report/list")
                : router.push("/ciudadano")
            }
            className="px-4 py-2 bg-gray-500 text-white rounded flex items-center"
          >
            <FaArrowLeft className="mr-2" /> Regresar
          </button>
        </div>

        <div className="my-8 p-6 border rounded-lg shadow-lg bg-white">
          <h2 className="text-xl font-semibold mb-4">Detalles</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Columna Izquierda: Detalles */}
            <div className="flex flex-col justify-between">
              <div>
                <p className="text mt-3 items-center"> {report.description}</p>
                <p className="text mt-3 mb-3 flex items-center">
                  <FaMapMarkerAlt className="mr-2" /> {report.direccion}
                </p>
                <span
                  className={`px-2 py-1 mt-3 text-white rounded ${
                    statusMap[report.status]?.className || "bg-gray-500"
                  }`}
                >
                  {statusMap[report.status]?.label || "Desconocido"}
                </span>
              </div>

              {/* Si el usuario es municipal, muestra el selector de estado */}
              {userRole === "municipal" && (
                <div className="mt-4">
                  <label className="block text-sm font-medium mb-2">Estado:</label>
                  <select
                    value={status}
                    onChange={handleStatusChange}
                    className="py-2 px-2 border border-gray-300 rounded-lg text-sm w-full"
                  >
                    {Object.keys(statusMap).map((key) => (
                      <option key={key} value={key}>
                        {statusMap[key].label}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={saveStatusChange}
                    disabled={status === originalStatus}
                    className={`mt-4 px-4 py-2 rounded text-white ${
                      status !== originalStatus
                        ? "bg-blue-500 hover:bg-blue-600"
                        : "bg-gray-300 cursor-not-allowed"
                    }`}
                  >
                    Guardar Cambios
                  </button>
                </div>
              )}
            </div>

            {report.imagen_path && (
              <div className="flex justify-center">
                <div className="rounded-lg overflow-hidden border border-gray-300 shadow-md">
                  <img
                    src={API_URL_REPORTES + report.imagen_path}
                    alt="Imagen del reporte"
                    className="w-full h-auto"
                    width={600}
                    height={600}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}