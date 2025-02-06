"use client";

import { useState, useEffect } from "react";
import swal from "sweetalert";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { create_report, listar_reportes_ciudadano, delete_report } from "@/hooks/service_report";
import { notificar_all_municipales } from "@/hooks/service_notifications"; 
import HeaderAccount from "@/components/HeaderAccount";
import { FaEye} from "react-icons/fa";

const statusMap = {
  0: "Pendiente",
  1: "En Progreso",
  2: "Finalizado",
  3: "Cancelado",
};

export default function Report() {

  const token = Cookies.get("token");
  const uid = Cookies.get("uid");
  const email = Cookies.get("email");
  
  const router = useRouter();
  const [reports, setReports] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newReport, setNewReport] = useState({
    subject: "",
    description: "",
    direccion: "",
    email: email,
    telefono: "",
    user: "",
    imagen: null,
  });

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleDeleteReport = (reporte_uid) => {
    swal({
      title: "Eliminar Reporte",
      text: "¿Estás seguro de eliminar este reporte?",
      icon: "warning",
      buttons: ["Cancelar", "Eliminar"],
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          var data = {
            uid: reporte_uid,
          }
          const response = await delete_report(data, token);
        
          if (response.code === 200) {
            swal({
              title: "Reporte eliminado",
              text: "El reporte ha sido eliminado exitosamente.",
              icon: "success",
              button: "Aceptar",
              timer: 8000,
              closeOnEsc: true,
            }).then(() => {
              listar_reportes_ciudadano(token, uid).then((info) => {
                if (info.code === 200) {
                  setReports(info.context);
                }
              }
              );
            });
          } else {
            swal({
              title: "Error",
              text: response.mensaje || "No se pudo eliminar el reporte",
              icon: "error",
              button: "Aceptar",
              timer: 8000,
              closeOnEsc: true,
            });
          }
        } catch (error) {
          swal({
            title: "Error",
            text: error.message || "Ocurrió un problema al eliminar el reporte",
            icon: "error",
            button: "Aceptar",
            timer: 8000,
            closeOnEsc: true,
          });
        }
      }
    }
    );
  };
  const sendNoti = async (reporte_id) => {
    const data = {
      reporte_id: reporte_id,
      user_uid: uid
    };

    try {
      const response = await notificar_all_municipales(data);
      if (response.code === 200) {
        console.log("Notificaciones a todos los municipales enviada");
      } else{
        console.log("Notificaciones no enviadas");
      }
      
    } catch (error) {
      console.log("Error al enviar notificación");
    }
  };

  const handleCreateReport = async () => {
    const formData = new FormData();
    formData.append("subject", newReport.subject);
    formData.append("description", newReport.description);
    formData.append("direccion", newReport.direccion);
    formData.append("email", newReport.email);
    formData.append("telefono", newReport.telefono);
    formData.append("user", uid);
    if (newReport.imagen) {
      formData.append("imagen", newReport.imagen);
    }

    try {
      const response = await create_report(formData, token);
      if (response.code === 200) {
        var status = response.context.reporte_status;
        var estado = statusMap[status];
        handleCloseModal();
        sendNoti(response.context.reporte_uid);
        swal({
          title: "Reporte creado",
          text: "El reporte ha sido creado exitosamente.",
          icon: "success",
          button: "Aceptar",
          timer: 8000,
          closeOnEsc: true,
        }).then(() => {
          setNewReport({ subject: "", description: "", direccion: "", email: "", telefono: "", imagen: null });
          listar_reportes_ciudadano(token, uid).then((info) => {
            console.log(info);
            if (info.code === 200) {
              setReports(info.context);
            }
          });
        });
      } else {
        swal({
          title: "Error",
          text: response.mensaje || "No se pudo crear el reporte",
          icon: "error",
          button: "Aceptar",
          timer: 8000,
          closeOnEsc: true,
        });
      }
    } catch (error) {
      
      swal({
        title: "Error",
        text: error.message || "Ocurrió un problema al crear el reporte",
        icon: "error",
        button: "Aceptar",
        timer: 8000,
        closeOnEsc: true,
      });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewReport({
        ...newReport,
        imagen: file,
      });
    }
  };

  useEffect(() => {
    listar_reportes_ciudadano(token, uid).then((info) => {
      if (info.code === 200) {
        setReports(info.context);
      }
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center bg-white text-black">
      <HeaderAccount />
      <main className="flex-1 w-full px-6 py-10">
        <div className="flex justify-between">
          <h1 className="font-semibold text-2xl">Mis Reportes</h1>
          <button
            onClick={handleOpenModal}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Crear Nuevo Reporte
          </button>
        </div>

        

        {showModal && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg w-1/3">
              <h2 className="text-xl font-semibold mb-4">Nuevo Reporte</h2>
              <div>
                <input
                  type="text"
                  className="w-full p-2 border mb-4"
                  placeholder="Motivo"
                  value={newReport.subject}
                  onChange={(e) => setNewReport({ ...newReport, subject: e.target.value })}
                />
                <textarea
                  className="w-full p-2 border mb-4 h-40"
                  placeholder="Descripción"
                  value={newReport.description}
                  onChange={(e) => setNewReport({ ...newReport, description: e.target.value })}
                />
                <input
                  type="text"
                  className="w-full p-2 border mb-4"
                  placeholder="Dirección"
                  value={newReport.direccion}
                  onChange={(e) => setNewReport({ ...newReport, direccion: e.target.value })}
                />
                <input
                  type="email"
                  className="w-full p-2 border mb-4"
                  placeholder="Correo Electrónico"
                  value={newReport.email}
                  onChange={(e) => setNewReport({ ...newReport, email: e.target.value })}
                />
                <input
                  type="tel"
                  className="w-full p-2 border mb-4"
                  placeholder="Teléfono"
                  value={newReport.telefono}
                  onChange={(e) => setNewReport({ ...newReport, telefono: e.target.value })}
                />
                <input
                  type="file"
                  accept="image/*"
                  className="w-full p-2 border mb-4"
                  onChange={handleImageChange}
                />
                <div className="flex justify-between">
                  <button
                    onClick={handleCloseModal}
                    className="px-4 py-2 bg-gray-400 text-white rounded"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleCreateReport}
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                  >
                    Crear Reporte
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

<div className="my-8">
          {reports && reports.length > 0 ? (
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                 
                  <th className="p-3 text-sm text-gray-500 font-semibold tracking-wide text-center">
                    Asunto
                  </th>
                  <th className="p-3 text-sm text-gray-500 font-semibold tracking-wide text-center">
                    Descripción
                  </th>
                  <th className="p-3 text-sm text-gray-500 font-semibold tracking-wide text-center">
                    Estado
                  </th>
                  <th className="p-3 text-sm text-gray-500 font-semibold tracking-wide text-center">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {reports.map((report, index) => (
                  <tr key={index}>
                  
                    <td className="p-3 text-sm text-gray-700">{report.subject}</td>
                    <td className="p-3 text-sm text-gray-700">{report.description}</td>
                    <td className="p-3 text-sm text-gray-700">
                      <span className="px-2 py-1 bg-blue-500 text-white rounded">
                        {statusMap[report.status]}
                      </span>
                    </td>
                    <td className="p-3 text-sm text-gray-700 flex space-x-2">
                      <button
                        className="px-2 py-1 bg-green-500 text-white rounded flex items-center"
                        onClick={() => router.push(`/report/view/${report.uid}`)}
                      >
                        <FaEye className="mr-1" /> Ver
                      </button>
                      {report.status === 0 && (
                        <button
                          className="px-2 py-1 bg-red-500 text-white rounded"
                          onClick={() => handleDeleteReport(report.uid)}
                        >
                          Eliminar
                        </button>
                      )}
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-500 text-center">No hay reportes disponibles.</p>
          )}
        </div>
      </main>
    </div>
  );
}
