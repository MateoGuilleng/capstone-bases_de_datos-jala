'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
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
      .then(res => {
        if (!res.ok) {
          throw new Error('Error al cargar el contenido');
        }
        return res.json();
      })
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="text-center mt-20">Cargando contenido...</div>;
  if (error || !data || data.error) return <div className="text-center mt-20 text-red-500">{error || data?.error || 'No encontrado'}</div>;

  const { contenido, generos, plataformas, resenas, listas, seguimientos, sql } = data;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white dark:bg-zinc-800 rounded-xl shadow space-y-10">
      {/* Datos del contenido */}
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

      {/* SQL utilizado */}
      {sql && (
        <section className="mb-6 bg-gray-100 dark:bg-zinc-900 p-4 rounded-xl shadow">
          <h2 className="text-xl font-bold mb-3 text-blue-600 dark:text-blue-400">Consultas SQL utilizadas:</h2>
          <div className="space-y-4 text-sm font-mono text-gray-700 dark:text-gray-200 overflow-x-auto">
            {sql.contenido && (
              <div>
                <h3 className="font-semibold text-blue-700 dark:text-blue-300 mb-1">Datos del Contenido:</h3>
                <pre className="whitespace-pre-wrap p-3 bg-gray-200 dark:bg-zinc-800 rounded">{sql.contenido}</pre>
              </div>
            )}
            {sql.generos && (
              <div>
                <h3 className="font-semibold text-blue-700 dark:text-blue-300 mb-1">Géneros:</h3>
                <pre className="whitespace-pre-wrap p-3 bg-gray-200 dark:bg-zinc-800 rounded">{sql.generos}</pre>
              </div>
            )}
            {sql.plataformas && (
              <div>
                <h3 className="font-semibold text-blue-700 dark:text-blue-300 mb-1">Plataformas:</h3>
                <pre className="whitespace-pre-wrap p-3 bg-gray-200 dark:bg-zinc-800 rounded">{sql.plataformas}</pre>
              </div>
            )}
            {sql.resenas && (
              <div>
                <h3 className="font-semibold text-blue-700 dark:text-blue-300 mb-1">Reseñas:</h3>
                <pre className="whitespace-pre-wrap p-3 bg-gray-200 dark:bg-zinc-800 rounded">{sql.resenas}</pre>
              </div>
            )}
            {sql.listas && (
              <div>
                <h3 className="font-semibold text-blue-700 dark:text-blue-300 mb-1">Listas donde aparece:</h3>
                <pre className="whitespace-pre-wrap p-3 bg-gray-200 dark:bg-zinc-800 rounded">{sql.listas}</pre>
              </div>
            )}
            {sql.seguimientos && (
              <div>
                <h3 className="font-semibold text-blue-700 dark:text-blue-300 mb-1">Seguimientos de Usuarios:</h3>
                <pre className="whitespace-pre-wrap p-3 bg-gray-200 dark:bg-zinc-800 rounded">{sql.seguimientos}</pre>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Sección de Reseñas */}
      <div>
        <h2 className="text-2xl font-semibold mt-8 mb-4 text-blue-600 dark:text-blue-300">Reseñas</h2>
        {resenas && resenas.length > 0 ? (
          <ul className="space-y-4">
            {resenas.map(resena => (
              <li key={resena.ID_Resena} className="bg-gray-50 dark:bg-zinc-900 p-4 rounded shadow">
                <div className="flex items-center justify-between mb-1">
                  <Link href={`/usuarios/${resena.NombreUsuario}`} className="font-bold text-blue-700 dark:text-blue-400">{resena.NombreUsuario}</Link>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{new Date(resena.FechaPublicacion).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center mb-2">
                  <span className="text-yellow-500 font-bold mr-2">{resena.Puntuacion}★</span>
                </div>
                <p className="text-gray-700 dark:text-gray-200 whitespace-pre-line">{resena.Comentario}</p>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-gray-500 dark:text-gray-400">No hay reseñas para este contenido.</div>
        )}
      </div>

      {/* Sección de Listas donde aparece */}
      <section>
        <h2 className="text-2xl font-semibold mt-8 mb-4 text-blue-600 dark:text-blue-300">Listas donde aparece</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {listas.length === 0 ? (
            <div className="text-gray-500 col-span-full">Este contenido no aparece en ninguna lista pública.</div>
          ) : listas.map(l => (
            <div key={l.ID_Lista} className="border border-blue-200 dark:border-zinc-700 p-6 rounded-xl shadow bg-white dark:bg-zinc-800 flex flex-col gap-2 hover:shadow-lg transition">
              <h3 className="font-semibold text-blue-700 dark:text-blue-300 mb-1">
                <Link href={`/listas/${l.ID_Lista}`}>{l.Titulo}</Link>
              </h3>
              <div className="flex flex-wrap gap-2 text-xs mb-1">
                <span className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 px-2 py-1 rounded">{l.Tipo}</span>
                <span className="bg-gray-100 dark:bg-zinc-700 text-gray-700 dark:text-gray-200 px-2 py-1 rounded">{l.Visibilidad}</span>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                <strong>Elementos:</strong> {l.NumElementos} | <strong>Seguidores:</strong> {l.Seguidores}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sección de Seguimientos de usuarios */}
      <section>
        <h2 className="text-2xl font-semibold mt-8 mb-4 text-blue-600 dark:text-blue-300">Seguimientos de usuarios</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {seguimientos.length === 0 ? (
            <div className="text-gray-500 col-span-full">Ningún usuario está siguiendo este contenido.</div>
          ) : seguimientos.map(s => (
            <div key={s.ID_Seguimiento} className="border border-blue-200 dark:border-zinc-700 p-6 rounded-xl shadow bg-white dark:bg-zinc-800 flex flex-col gap-2 hover:shadow-lg transition">
              <h3 className="font-semibold text-blue-700 dark:text-blue-300 mb-1">
                <Link href={`/usuarios/${s.NombreUsuario}`}>{s.NombreUsuario}</Link>
              </h3>
              <div className="flex flex-wrap gap-2 text-xs mb-1">
                <span className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 px-2 py-1 rounded">{s.Estado}</span>
                {s.Progreso && <span className="bg-gray-100 dark:bg-zinc-700 text-gray-700 dark:text-gray-200 px-2 py-1 rounded">Progreso: {s.Progreso}</span>}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                {s.FechaInicio && <span><strong>Inicio:</strong> {new Date(s.FechaInicio).toLocaleDateString()}</span>}
                {s.FechaFin && <span> | <strong>Fin:</strong> {new Date(s.FechaFin).toLocaleDateString()}</span>}
              </div>
              {s.Puntuacion && <div className="text-yellow-500 text-lg">{'★'.repeat(s.Puntuacion)}<span className="text-gray-400 dark:text-gray-500">{'★'.repeat(10 - s.Puntuacion)}</span> <span className="ml-2 text-gray-700 dark:text-gray-200 font-bold">{s.Puntuacion}/10</span></div>}
              {s.Notas && <div className="text-gray-800 dark:text-gray-100 italic mt-2">{s.Notas}</div>}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
} 