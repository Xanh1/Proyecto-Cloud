"use client";

import React from "react";
import Link from "next/link";
import Header from "@/components/Header";

export default function LandingPage() {
  const aux = "¡Regístrate ahora!";
  const novedades = "Ver Novedades";

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 text-black">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 md:px-8 py-6">
        <div className="max-w-4xl w-full">
          <h2 className="text-4xl font-extrabold text-black mb-4">
            Reporta incidentes en Loja
          </h2>
          <p className="text-lg text-gray-600 mb-4">
            Informa incidentes de manera rápida y accede a tus reportes para contribuir a una ciudad más segura y organizada.
          </p>
          
          {/* Botón de Ver Novedades */}
          <Link
            href="/novedades"
            className="inline-block px-6 py-3 rounded-lg border-2 border-black text-black bg-white text-base font-semibold transition-all duration-200 hover:bg-black hover:text-white mb-4"
          >
            {novedades}
          </Link>

          {/* Botón de Registrarse */}
          <Link
            href="/ciudadano/new"
            className="inline-block px-6 py-3 rounded-lg border-2 border-black text-black bg-white text-base font-semibold transition-all duration-200 hover:bg-black hover:text-white"
          >
            {aux}
          </Link>
        </div>
      </main>
    </div>
  );
}
