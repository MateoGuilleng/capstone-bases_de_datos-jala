'use client';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-10 bg-gradient-to-br from-blue-100 via-white to-zinc-100 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900">
      <div className="max-w-2xl w-full bg-white dark:bg-zinc-800 rounded-xl shadow-lg p-10 text-center space-y-6 border border-blue-200 dark:border-zinc-700">
        <h1 className="text-4xl font-extrabold text-blue-700 dark:text-blue-400 mb-2">¡Bienvenido a la Plataforma de Reseñas!</h1>
        <p className="text-lg text-gray-700 dark:text-gray-200">
          Este proyecto es una plataforma de exploración y gestión de reseñas para películas, series, juegos, libros, podcasts y más. Puedes navegar por las diferentes secciones usando el menú lateral para consultar, filtrar y analizar toda la base de datos.
        </p>
        <ul className="text-left text-base text-gray-600 dark:text-gray-300 list-disc list-inside mx-auto max-w-lg">
          <li>Explora <span className="font-semibold text-blue-600">reseñas</span> de usuarios sobre distintos contenidos.</li>
          <li>Filtra y ordena <span className="font-semibold text-blue-600">contenidos</span> por tipo, género, plataforma y popularidad.</li>
          <li>Descubre <span className="font-semibold text-blue-600">usuarios</span>, sus listas y grupos.</li>
          <li>Visualiza <span className="font-semibold text-blue-600">listas</span> personalizadas y <span className="font-semibold text-blue-600">grupos</span> de discusión.</li>
          <li>¡Pon a prueba la base de datos con filtros avanzados y consulta el SQL generado!</li>
        </ul>
        <div className="mt-6">
          <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 px-4 py-2 rounded-full font-semibold text-sm shadow">
            Usa el menú lateral para comenzar 🚀
          </span>
        </div>
      </div>
    </main>
  );
}
