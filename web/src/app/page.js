"use client";

import React from "react";
import Link from "next/link";
import Header from "@/components/Header";

export default function LandingPage() {
  const aux = "Registrate ->";
  return (
    <div className="min-h-screen flex flex-col items-center bg-white text-black">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center text-center">
        <div>
          <h2 className="text-5xl font-bold my-4">
            Reporta incidentes en Loja
          </h2>
          <p className="text-gray-600">
            Informa incidentes de manera rápida y accede a tus reportes
          </p>
          <p className="text-gray-600 mb-10">
            para contribuir a una ciudad más segura y organizada.
          </p>
          <Link
            href="/person/new"
            className="px-4 py-2 rounded border border-black text-white bg-black rounded-lg text-sm"
          >
            {aux}
          </Link>
        </div>
      </main>
    </div>
  );
}
