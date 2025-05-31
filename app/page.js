'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [resenas, setResenas] = useState([]);

  useEffect(() => {
    fetch('/api/resenas')
      .then(res => res.json())
      .then(data => setResenas(data));
  }, []);

  return (
    <main className="p-10 space-y-8">
      <h1 className="text-2xl font-bold">Reseñas recientes</h1>
      <div className="grid gap-6">
        {resenas.map(resena => (
          <div
            key={resena.ID_Resena}
            className="border p-4 rounded-lg shadow bg-white dark:bg-zinc-800"
          >
            <h2 className="font-semibold">{resena.Contenido}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              por <strong>{resena.NombreUsuario}</strong> | {resena.FechaPublicacion}
            </p>
            <p className="mt-2 text-yellow-500">⭐ {resena.Puntuacion}/10</p>
            <p className="mt-2">{resena.Comentario}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
