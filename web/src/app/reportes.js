import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ReportesApp() {
  const [reportes, setReportes] = useState([]);
  const [formData, setFormData] = useState({
    usuario: '',
    estado: 'pendiente',
    descripcion: ''
  });
  
  // Fetch reportes al cargar
  useEffect(() => {
    obtenerReportes();
  }, []);

  const obtenerReportes = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/reportes');
      setReportes(response.data);
    } catch (error) {
      console.error('Error al obtener los reportes:', error);
    }
  };

  const crearReporte = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:5000/reportes', formData);
      setReportes([...reportes, response.data]);
      setFormData({ usuario: '', estado: 'pendiente', descripcion: '' });
    } catch (error) {
      console.error('Error al crear el reporte:', error);
    }
  };

  const eliminarReporte = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/reportes/${id}`);
      setReportes(reportes.filter(reporte => reporte.id !== id));
    } catch (error) {
      console.error('Error al eliminar el reporte:', error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Sistema de Reportes</h1>

      {/* Formulario para crear reportes */}
      <form onSubmit={crearReporte} className="mb-6">
        <div className="mb-4">
          <label className="block font-semibold mb-2">Usuario</label>
          <input
            type="text"
            value={formData.usuario}
            onChange={(e) => setFormData({ ...formData, usuario: e.target.value })}
            className="border rounded p-2 w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-2">Estado</label>
          <select
            value={formData.estado}
            onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
            className="border rounded p-2 w-full"
          >
            <option value="pendiente">Pendiente</option>
            <option value="en progreso">En Progreso</option>
            <option value="completado">Completado</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-2">Descripción</label>
          <textarea
            value={formData.descripcion}
            onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
            className="border rounded p-2 w-full"
            required
          ></textarea>
        </div>

        <Button type="submit">Crear Reporte</Button>
      </form>

      {/* Lista de reportes */}
      <div>
        {reportes.map((reporte) => (
          <Card key={reporte.id} className="mb-4">
            <CardContent>
              <h2 className="font-bold">Usuario: {reporte.usuario}</h2>
              <p>Estado: {reporte.estado}</p>
              <p>Descripción: {reporte.descripcion}</p>
              <Button variant="destructive" onClick={() => eliminarReporte(reporte.id)}>
                Eliminar
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
