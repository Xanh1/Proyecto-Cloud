"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import swal from "sweetalert";
import { get_report_by_id } from "@/hooks/service_report";
import HeaderAccount from "@/components/HeaderAccount";

export default function ReportView() {
  const router = useRouter();
  const { id } = useParams(); // Obtiene el ID del reporte desde la URL
  const [report, setReport] = useState(null);

  useEffect(() => {
    if (id) {
      get_report_by_id(id).then((response) => {
        if (response.code === 200) {
          setReport(response.context);
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
  }, [id]);

  if (!report) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-white text-black">
      <HeaderAccount />
      <main className="flex-1 w-full px-6 py-10">
        <div className="flex justify-between">
          <h1 className="font-semibold text-2xl">Reporte: {report.subject}</h1>
          <button
            onClick={() => router.push("/report")}
            className="px-4 py-2 bg-gray-500 text-white rounded"
          >
            <FaArrowLeft className="mr-2" /> Regresar
          </button>
        </div>

        <div className="my-8 p-6 border rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Detalles del Reporte</h2>
          <p><strong>Motivo:</strong> {report.subject}</p>
          <p><strong>Descripción:</strong> {report.description}</p>
          <p><strong>Dirección:</strong> {report.direccion}</p>
          <p><strong>Estado:</strong> {statusMap[report.status]}</p>
          {report.imagen_path && (
            <div className="mt-4">
              <strong>Imagen:</strong>
              <img src={report.imagen_path} alt="Imagen del reporte" className="w-full h-auto mt-2" />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
