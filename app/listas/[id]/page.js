'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function ListaDetallePage() {
  const params = useParams();
  const id = params.id;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/listas/${id}`)
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Error al cargar la lista');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="text-center mt-20">Cargando lista...</div>;
  if (error || !data || data.error) return <div className="text-center mt-20 text-red-500">{error || data?.error || 'No encontrado'}</div>;

  const { lista, elementos, seguidores, creador, comentarios, sql } = data;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white dark:bg-zinc-800 rounded-xl shadow space-y-10">
      <div>
        <h1 className="text-3xl font-bold mb-2 text-blue-700 dark:text-blue-400">{lista.Titulo}</h1>
        <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">
          <strong>Fecha de creación:</strong> {lista.FechaCreacion ? new Date(lista.FechaCreacion).toLocaleDateString() : 'N/A'}
        </div>
        <div className="flex flex-wrap gap-2 text-xs mt-2">
          <span className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 px-2 py-1 rounded">{lista.Tipo}</span>
          <span className="bg-gray-100 dark:bg-zinc-700 text-gray-700 dark:text-gray-200 px-2 py-1 rounded">{lista.Visibilidad}</span>
          <span className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 px-2 py-1 rounded">Elementos: {lista.NumElementos}</span>
        </div>
        <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
          <strong>Seguidores:</strong> {lista.Seguidores}
        </div>
        <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
          <strong>Creador:</strong> {creador?.NombreUsuario || 'N/A'}
        </div>
      </div>
      {/* SQL generado */}
      {sql?.lista && (
        <div className="mb-6 bg-gray-100 dark:bg-zinc-900 p-4 rounded text-xs font-mono text-gray-700 dark:text-gray-200">
          <span className="font-bold text-blue-700 dark:text-blue-400">SQL USADO:</span>
          <pre className="whitespace-pre-wrap mt-2">{sql.lista}</pre>
        </div>
      )}
      {/* Elementos de la lista */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-blue-600">Contenidos en la lista</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {elementos.length === 0 ? (
            <div className="text-gray-500 col-span-full">No hay contenidos en esta lista.</div>
          ) : (
            elementos.map(c => (
              <div key={c.ID_Contenido} className="border border-blue-200 dark:border-zinc-700 p-6 rounded-xl shadow bg-white dark:bg-zinc-800 flex flex-col gap-2 hover:shadow-lg transition">
                <h3 className="font-semibold text-blue-700 dark:text-blue-300 mb-1">
                  <a href={`/contenidos/${c.ID_Contenido}`}>{c.Titulo}</a>
                </h3>
                <div className="flex flex-wrap gap-2 text-xs mb-1">
                  <span className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 px-2 py-1 rounded">{c.Tipo}</span>
                  <span className="bg-gray-100 dark:bg-zinc-700 text-gray-700 dark:text-gray-200 px-2 py-1 rounded">{c.Ano}</span>
                  <span className="bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-200 px-2 py-1 rounded">{c.Clasificacion}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
} 