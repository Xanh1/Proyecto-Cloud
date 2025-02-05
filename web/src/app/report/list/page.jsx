"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { list_reports } from "@/hooks/service_report";
import HeaderAccount from "@/components/HeaderAccount";
import { FaEye } from "react-icons/fa";

const statusMap = {
  0: { label: "Pendiente", className: "bg-yellow-500" },
  1: { label: "En Proceso", className: "bg-blue-500" },
  2: { label: "Resuelto", className: "bg-green-500" },
  3: { label: "Rechazado", className: "bg-red-500" },
};
export default function Report() {
  const router = useRouter();
  const [reports, setReports] = useState(null);
  const token = Cookies.get("token");

  useEffect(() => {
    list_reports(token).then((info) => {
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
          <h1 className="font-semibold text-2xl">Reportes</h1>
          
        </div>

        <div className="my-8">
          {reports && reports.length > 0 ? (
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                 
                  <th className="p-3 text-sm text-gray-500 font-semibold tracking-wide text-left">
                    Motivo
                  </th>
                  <th className="p-3 text-sm text-gray-500 font-semibold tracking-wide text-left">
                    Descripción
                  </th>
                  <th className="p-3 text-sm text-gray-500 font-semibold tracking-wide text-left whitespace-nowrap" style={{ width: '150px' }}>
                    Estado
                  </th>
                  <th className="p-3 text-sm text-gray-500 font-semibold tracking-wide text-left">
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
                    <span className={`px-2 py-1 text-white rounded ${statusMap[report.status]?.className || "bg-gray-500"}`}>
                      {statusMap[report.status]?.label || "Desconocido"}
                    </span>
                  </td>
                    <td className="p-3 text-sm text-gray-700 flex space-x-2">
                      <button
                        className="px-2 py-1 bg-green-500 text-white rounded flex items-center"
                        onClick={() => router.push(`/report/view/${report.uid}`)}
                      >
                        <FaEye className="mr-1" /> Ver
                      </button>
                     
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