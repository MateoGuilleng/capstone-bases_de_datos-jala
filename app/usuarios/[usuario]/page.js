'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function UsuarioDetallePage() {
  const params = useParams();
  const usuario = params.usuario;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/usuarios/${usuario}`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Error al cargar el perfil');
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
  }, [usuario]);

  if (loading) return <div className="text-center mt-20">Cargando perfil...</div>;
  if (error || !data || data.error) return <div className="text-center mt-20 text-red-500">{error || data?.error || 'No encontrado'}</div>;

  const { user, resenas, listas, grupos, seguimientos, sql } = data;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white dark:bg-zinc-800 rounded-xl shadow space-y-10">
      {/* Datos del usuario */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2 text-blue-700 dark:text-blue-400">{user.NombreUsuario}</h1>
          <p className="text-lg text-gray-700 dark:text-gray-200 font-semibold">{user.NombreCompleto}</p>
          <div className="flex flex-wrap gap-2 text-xs mt-2">
            <span className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 px-2 py-1 rounded">{user.Pais}</span>
            <span className="bg-gray-100 dark:bg-zinc-700 text-gray-700 dark:text-gray-200 px-2 py-1 rounded">{user.Privacidad}</span>
            <span className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 px-2 py-1 rounded">Registrado: {user.FechaRegistro?.split('T')[0]}</span>
          </div>
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-300 max-w-xs">
          <span className="font-semibold">Biografía:</span> {user.Biografia || <span className="italic text-gray-400">Sin biografía</span>}
        </div>
      </div>

      {/* SQL utilizado */}
      {sql && (
        <section className="mb-6 bg-gray-100 dark:bg-zinc-900 p-4 rounded-xl shadow">
          <h2 className="text-xl font-bold mb-3 text-blue-600 dark:text-blue-400">Consultas SQL utilizadas:</h2>
          <div className="space-y-4 text-sm font-mono text-gray-700 dark:text-gray-200 overflow-x-auto">
            {sql.user && (
              <div>
                <h3 className="font-semibold text-blue-700 dark:text-blue-300 mb-1">Datos del Usuario:</h3>
                <pre className="whitespace-pre-wrap p-3 bg-gray-200 dark:bg-zinc-800 rounded">{sql.user}</pre>
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
                <h3 className="font-semibold text-blue-700 dark:text-blue-300 mb-1">Listas Públicas:</h3>
                <pre className="whitespace-pre-wrap p-3 bg-gray-200 dark:bg-zinc-800 rounded">{sql.listas}</pre>
              </div>
            )}
            {sql.grupos && (
              <div>
                <h3 className="font-semibold text-blue-700 dark:text-blue-300 mb-1">Grupos:</h3>
                <pre className="whitespace-pre-wrap p-3 bg-gray-200 dark:bg-zinc-800 rounded">{sql.grupos}</pre>
              </div>
            )}
            {sql.seguimientos && (
              <div>
                <h3 className="font-semibold text-blue-700 dark:text-blue-300 mb-1">Seguimiento de Contenido:</h3>
                <pre className="whitespace-pre-wrap p-3 bg-gray-200 dark:bg-zinc-800 rounded">{sql.seguimientos}</pre>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Reseñas */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Reseñas</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {resenas.length === 0 ? (
            <div className="text-gray-500 col-span-full">No hay reseñas.</div>
          ) : resenas.map(resena => (
            <div key={resena.ID_Resena} className="border border-blue-200 dark:border-zinc-700 p-6 rounded-xl shadow bg-white dark:bg-zinc-800 flex flex-col gap-2 hover:shadow-lg transition">
              <h3 className="font-semibold text-blue-700 dark:text-blue-300 mb-1">
                <Link href={`/contenidos/${resena.ID_Contenido}`}>{resena.Contenido}</Link>
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{resena.FechaPublicacion?.split('T')[0]}</p>
              <p className="mt-2 text-yellow-500 text-lg">{'★'.repeat(resena.Puntuacion)}<span className="text-gray-400 dark:text-gray-500">{'★'.repeat(10 - resena.Puntuacion)}</span> <span className="ml-2 text-gray-700 dark:text-gray-200 font-bold">{resena.Puntuacion}/10</span></p>
              <p className="mt-2 text-gray-800 dark:text-gray-100 italic">{resena.Comentario}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Listas públicas */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Listas públicas</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {listas.length === 0 ? (
            <div className="text-gray-500 col-span-full">No hay listas públicas.</div>
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

      {/* Grupos */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Grupos</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {grupos.length === 0 ? (
            <div className="text-gray-500 col-span-full">No pertenece a ningún grupo.</div>
          ) : grupos.map(g => (
            <div key={g.ID_Grupo} className="border border-blue-200 dark:border-zinc-700 p-6 rounded-xl shadow bg-white dark:bg-zinc-800 flex flex-col gap-2 hover:shadow-lg transition">
              <h3 className="font-semibold text-blue-700 dark:text-blue-300 mb-1">
                <Link href={`/grupos/${g.ID_Grupo}`}>{g.Nombre}</Link>
              </h3>
              <div className="flex flex-wrap gap-2 text-xs mb-1">
                <span className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 px-2 py-1 rounded">{g.Privacidad}</span>
                <span className="bg-gray-100 dark:bg-zinc-700 text-gray-700 dark:text-gray-200 px-2 py-1 rounded">Miembros: {g.Miembros}</span>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                <strong>Fecha creación:</strong> {g.FechaCreacion?.split('T')[0]}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Seguimientos de contenido */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Seguimiento de contenidos</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {seguimientos.length === 0 ? (
            <div className="text-gray-500 col-span-full">No hay seguimientos.</div>
          ) : seguimientos.map(s => (
            <div key={s.ID_Seguimiento} className="border border-blue-200 dark:border-zinc-700 p-6 rounded-xl shadow bg-white dark:bg-zinc-800 flex flex-col gap-2 hover:shadow-lg transition">
              <h3 className="font-semibold text-blue-700 dark:text-blue-300 mb-1">
                <Link href={`/contenidos/${s.ID_Contenido}`}>{s.Titulo}</Link>
              </h3>
              <div className="flex flex-wrap gap-2 text-xs mb-1">
                <span className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 px-2 py-1 rounded">{s.Estado}</span>
                {s.Progreso && <span className="bg-gray-100 dark:bg-zinc-700 text-gray-700 dark:text-gray-200 px-2 py-1 rounded">Progreso: {s.Progreso}</span>}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                {s.FechaInicio && <span><strong>Inicio:</strong> {s.FechaInicio}</span>}
                {s.FechaFin && <span> | <strong>Fin:</strong> {s.FechaFin}</span>}
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