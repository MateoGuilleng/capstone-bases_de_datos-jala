'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function ListaDetallePage() {
  const params = useParams();
  const id = params.id;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/listas/${id}`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Error al cargar la lista');
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

  if (loading) return <div className="text-center mt-20">Cargando lista...</div>;
  if (error || !data || data.error) return <div className="text-center mt-20 text-red-500">{error || data?.error || 'No encontrado'}</div>;

  const { lista, elementos, seguidores, sql } = data;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white dark:bg-zinc-800 rounded-xl shadow space-y-10">
      {/* Encabezado de la lista */}
      <div>
        <h1 className="text-3xl font-bold mb-2 text-blue-700 dark:text-blue-400">{lista.Titulo}</h1>
        <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">
          <strong>Creador:</strong>{' '}
          <Link href={`/usuarios/${lista.Creador}`} className="text-blue-600 dark:text-blue-300 hover:underline">
            {lista.Creador}
          </Link>
          {' • '}
          <strong>Fecha de creación:</strong>{' '}
          {new Date(lista.FechaCreacion).toLocaleDateString()}
        </div>
        <div className="flex flex-wrap gap-2 text-xs mt-2">
          <span className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 px-2 py-1 rounded">
            {lista.Tipo}
          </span>
          <span className="bg-gray-100 dark:bg-zinc-700 text-gray-700 dark:text-gray-200 px-2 py-1 rounded">
            {lista.Visibilidad}
          </span>
          <span className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 px-2 py-1 rounded">
            Elementos: {lista.NumElementos}
          </span>
          <span className="bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-200 px-2 py-1 rounded">
            Seguidores: {lista.Seguidores}
          </span>
        </div>
        {lista.Descripcion && (
          <p className="mt-4 text-gray-700 dark:text-gray-300">{lista.Descripcion}</p>
        )}
      </div>

      {/* SQL utilizado */}
      {sql && (
        <section className="bg-gray-100 dark:bg-zinc-900 p-4 rounded-xl shadow">
          <h2 className="text-xl font-bold mb-3 text-blue-600 dark:text-blue-400">Consultas SQL utilizadas:</h2>
          <div className="space-y-4 text-sm font-mono text-gray-700 dark:text-gray-200 overflow-x-auto">
            {sql.lista && (
              <div>
                <h3 className="font-semibold text-blue-700 dark:text-blue-300 mb-1">Datos de la Lista:</h3>
                <pre className="whitespace-pre-wrap p-3 bg-gray-200 dark:bg-zinc-800 rounded">{sql.lista}</pre>
              </div>
            )}
            {sql.elementos && (
              <div>
                <h3 className="font-semibold text-blue-700 dark:text-blue-300 mb-1">Elementos de la Lista:</h3>
                <pre className="whitespace-pre-wrap p-3 bg-gray-200 dark:bg-zinc-800 rounded">{sql.elementos}</pre>
              </div>
            )}
            {sql.seguidores && (
              <div>
                <h3 className="font-semibold text-blue-700 dark:text-blue-300 mb-1">Seguidores de la Lista:</h3>
                <pre className="whitespace-pre-wrap p-3 bg-gray-200 dark:bg-zinc-800 rounded">{sql.seguidores}</pre>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Elementos de la lista */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Contenidos en la lista</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {elementos.length === 0 ? (
            <div className="text-gray-500 col-span-full">No hay contenidos en esta lista.</div>
          ) : (
            elementos.map(c => (
              <div key={c.ID_Contenido} className="border border-blue-200 dark:border-zinc-700 p-6 rounded-xl shadow bg-white dark:bg-zinc-800 flex flex-col gap-2 hover:shadow-lg transition">
                <h3 className="font-semibold text-blue-700 dark:text-blue-300 mb-1">
                  <Link href={`/contenidos/${c.ID_Contenido}`}>{c.Titulo}</Link>
                </h3>
                <div className="flex flex-wrap gap-2 text-xs mb-1">
                  <span className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 px-2 py-1 rounded">
                    {c.Tipo}
                  </span>
                  <span className="bg-gray-100 dark:bg-zinc-700 text-gray-700 dark:text-gray-200 px-2 py-1 rounded">
                    {c.Ano}
                  </span>
                  {c.Clasificacion && (
                    <span className="bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-200 px-2 py-1 rounded">
                      {c.Clasificacion}
                    </span>
                  )}
                </div>
                {c.NotaPersonal && (
                  <p className="text-sm text-gray-600 dark:text-gray-300 italic">
                    "{c.NotaPersonal}"
                  </p>
                )}
              </div>
            ))
          )}
        </div>
      </section>

      {/* Seguidores de la lista */}
      {seguidores.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Seguidores</h2>
          <div className="flex flex-wrap gap-2">
            {seguidores.map(s => (
              <Link
                key={s.ID_Usuario}
                href={`/usuarios/${s.NombreUsuario}`}
                className="bg-gray-100 dark:bg-zinc-700 text-gray-700 dark:text-gray-200 px-3 py-1 rounded-full text-sm hover:bg-gray-200 dark:hover:bg-zinc-600 transition"
              >
                {s.NombreUsuario}
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
} 