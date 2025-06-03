'use client'

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function PlataformaDetallePage() {
  const params = useParams();
  const nombre = params.nombre;
  const [contenidos, setContenidos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sql, setSql] = useState('');

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`/api/contenidos?plataforma=${encodeURIComponent(nombre)}`)
      .then(res => res.json())
      .then(data => {
        setContenidos(data.contents);
        setSql(data.sql);
        setLoading(false);
      })
      .catch(() => {
        setError('Error al cargar los contenidos');
        setLoading(false);
      });
  }, [nombre]);

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white dark:bg-zinc-800 rounded-xl shadow">
      <h1 className="text-3xl font-bold mb-4">Plataforma: <span className="text-blue-600">{nombre}</span></h1>
      <p className="text-gray-600 dark:text-gray-300 mb-6">Aquí se mostrarán todos los contenidos disponibles en esta plataforma.</p>
      {sql && (
        <div className="mb-6 bg-gray-100 dark:bg-zinc-900 p-4 rounded text-xs font-mono text-gray-700 dark:text-gray-200">
          <span className="font-bold text-blue-700 dark:text-blue-400">SQL QUEST RESULT:</span>
          <pre className="whitespace-pre-wrap mt-2">{sql}</pre>
        </div>
      )}
      <div className="grid gap-6">
        {loading ? (
          <div className="text-center mt-20">Cargando contenidos...</div>
        ) : error ? (
          <div className="text-center mt-20 text-red-500">{error}</div>
        ) : contenidos.length === 0 ? (
          <div className="text-center mt-20 text-gray-500">No hay contenidos para mostrar.</div>
        ) : (
          contenidos.map(c => (
            <div
              key={c.ID_Contenido}
              className="border border-blue-200 dark:border-zinc-700 p-6 rounded-xl shadow bg-white dark:bg-zinc-800 flex flex-col gap-2 hover:shadow-lg transition"
            >
              <h2 className="font-semibold text-lg text-blue-700 dark:text-blue-300 mb-1">
                <Link href={`/contenidos/${c.ID_Contenido}`}>{c.Titulo}</Link>
              </h2>
              <div className="flex flex-wrap gap-2 text-xs mb-1">
                <span className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 px-2 py-1 rounded">{c.Tipo}</span>
                <span className="bg-gray-100 dark:bg-zinc-700 text-gray-700 dark:text-gray-200 px-2 py-1 rounded">{c.Ano}</span>
                <span className="bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-200 px-2 py-1 rounded">{c.Clasificacion}</span>
                <span className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 px-2 py-1 rounded">Popularidad: {c.Popularidad}</span>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                <strong>Géneros:</strong> {c.Generos ? c.Generos.split(', ').map(g => (
                  <Link key={g} href={`/generos/${encodeURIComponent(g)}`} className="text-blue-600 dark:text-blue-300 hover:underline mr-2">{g}</Link>
                )) : '-'}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                <strong>Plataformas:</strong> {c.Plataformas ? c.Plataformas.split(', ').map(p => (
                  <Link key={p} href={`/plataformas/${encodeURIComponent(p)}`} className="text-blue-600 dark:text-blue-300 hover:underline mr-2">{p}</Link>
                )) : '-'}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
} 