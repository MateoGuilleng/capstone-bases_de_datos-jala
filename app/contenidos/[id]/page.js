'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function ContenidoDetallePage() {
  const params = useParams();
  const id = params.id;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/contenidos/${id}`)
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Error al cargar el contenido');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="text-center mt-20">Cargando contenido...</div>;
  if (error || !data || data.error) return <div className="text-center mt-20 text-red-500">{error || data?.error || 'No encontrado'}</div>;

  const { contenido, generos, plataformas, resenas, listas, seguimientos, sql } = data;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white dark:bg-zinc-800 rounded-xl shadow space-y-10">
      <div>
        <h1 className="text-3xl font-bold mb-2 text-blue-700 dark:text-blue-400">{contenido.Titulo}</h1>
        <div className="flex flex-wrap gap-2 text-xs mt-2">
          <span className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 px-2 py-1 rounded">{contenido.Tipo}</span>
          <span className="bg-gray-100 dark:bg-zinc-700 text-gray-700 dark:text-gray-200 px-2 py-1 rounded">{contenido.Ano}</span>
          <span className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 px-2 py-1 rounded">Popularidad: {contenido.Popularidad}</span>
        </div>
        <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
          <strong>Clasificación:</strong> {contenido.Clasificacion}
        </div>
        <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
          <strong>Géneros:</strong> {generos?.join(', ') || 'N/A'}
        </div>
        <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
          <strong>Plataformas:</strong> {plataformas?.join(', ') || 'N/A'}
        </div>
      </div>
      {/* SQL generado */}
      {sql?.contenido && (
        <div className="mb-6 bg-gray-100 dark:bg-zinc-900 p-4 rounded text-xs font-mono text-gray-700 dark:text-gray-200">
          <span className="font-bold text-blue-700 dark:text-blue-400">SQL USADO:</span>
          <pre className="whitespace-pre-wrap mt-2">{sql.contenido}</pre>
        </div>
      )}
      {/* Aquí irán las secciones de reseñas, listas, seguimientos, etc. */}
    </div>
  );
} 