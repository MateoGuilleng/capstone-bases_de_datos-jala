import { useParams } from 'next/navigation';

export default function PlataformaDetallePage() {
  const params = useParams();
  const nombre = params.nombre;
  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white dark:bg-zinc-800 rounded-xl shadow">
      <h1 className="text-3xl font-bold mb-4">Plataforma: <span className="text-blue-600">{nombre}</span></h1>
      <p className="text-gray-600 dark:text-gray-300">Aquí se mostrarán todos los contenidos disponibles en esta plataforma.</p>
    </div>
  );
} 