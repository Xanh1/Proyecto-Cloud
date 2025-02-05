'use client';

import { useEffect, useState } from 'react';
import Cookies from 'js-cookie'; // Esto puede eliminarse si ya no se usa
import { list_reports_desc } from "@/hooks/service_report";
import { Clock } from "lucide-react";
import HeaderAccout from '@/components/HeaderAccount';
import { format, formatDistanceToNow } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { es } from 'date-fns/locale';

var API_URL_REPORTES = process.env.NEXT_PUBLIC_API_URL_REPORTES || "https://reportes.blackgrass-9559a3b0.westus2.azurecontainerapps.io";
const ECUADOR_TIMEZONE = 'America/Guayaquil';

export default function Novedades() {
  const [reportes, setReportes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null); // Estado para la imagen seleccionada

  useEffect(() => {
    // Llamada sin el token
    list_reports_desc()
      .then((info) => {
        console.log(info);
        if (info.code === 200) {
          setReportes(info.context);
        } else {
          setError('No se pudieron cargar los reportes');
        }
      })
      .catch((err) => {
        setError('Hubo un error al cargar los reportes');
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, []); // Eliminar dependencia del token

  function formatDate(dateString) {
    if (!dateString) {
      console.error('La fecha es indefinida o nula');
      return 'Fecha no disponible';
    }

    // Usa Date.parse para convertir el string en un objeto Date válido
    const date = new Date(Date.parse(dateString));

    // Verifica si la fecha es válida
    if (isNaN(date)) {
      console.error('Fecha inválida:', dateString);
      return 'Fecha inválida';
    }

    // Convertir la fecha a la zona horaria de Ecuador (UTC-5)
    const zonedDate = toZonedTime(date, ECUADOR_TIMEZONE);

    const now = new Date();

    // Si la fecha es de hoy en la zona horaria de Ecuador
    if (zonedDate.toDateString() === now.toDateString()) {
      return `Hoy a las ${format(zonedDate, "HH:mm", { locale: es })}`;
    }

    return formatDistanceToNow(zonedDate, { locale: es, addSuffix: true });
  }

  const handleImageClick = (imagePath) => {
    setSelectedImage(imagePath); // Establecer la imagen seleccionada
  };

  const closeModal = () => {
    setSelectedImage(null); // Cerrar el modal
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="bg-white-900 text-black min-h-screen">
      <HeaderAccout />
      <main className="p-8">
        <h2 className="text-4xl font-bold">Novedades</h2>
        <p className="text-gray-400 mt-2">Conoce los acontecimientos más recientes</p>
        <div className="flex flex-col gap-6 mt-6">
          {reportes && reportes.length > 0 ? (
            reportes.map((reporte, index) => (
              <div key={index} className="border border-gray-700 p-6 rounded-lg bg-white-800 shadow-lg flex items-center gap-6">
                <div className="flex-1">
                  <p className="text-xs text-gray-400 flex items-center gap-1">
                    <Clock size={14} /> {formatDate(reporte.created_at)}
                  </p>
                  <h3 className="text-2xl font-semibold mt-2">{reporte.subject}</h3>
                  <p className="text-pink-400 mt-1">{reporte.direccion}</p>
                  <p className="text-gray-400 mt-2">{reporte.description}</p>
                </div>
                <img
                  src={API_URL_REPORTES + reporte.imagen_path}
                  alt="Reporte"
                  className="w-24 h-24 object-cover rounded-lg cursor-pointer"
                  onClick={() => handleImageClick(API_URL_REPORTES + reporte.imagen_path)} // Mostrar la imagen al hacer clic
                />
              </div>
            ))
          ) : (
            <div>No hay reportes disponibles.</div>
          )}
        </div>
      </main>

      {/* Modal para mostrar la imagen agrandada */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="relative">
            <img
              src={selectedImage}
              alt="Imagen agrandada"
              className="max-w-full max-h-screen object-contain"
            />
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-white bg-gray-800 p-2 rounded-full"
            >
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
