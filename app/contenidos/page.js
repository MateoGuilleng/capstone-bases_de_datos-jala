'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const TIPOS = [
  '', 'pelicula', 'serie', 'anime', 'juego', 'libro', 'podcast'
];
const GENEROS = [
  '', 'Ciencia Ficción', 'Drama', 'Aventura', 'Terror', 'Comedia'
];
const PLATAFORMAS = [
  '', 'Netflix', 'HBO Max', 'Steam', 'Spotify', 'Amazon Prime'
];
const ORDENES = [
  { value: 'Popularidad DESC', label: 'Popularidad (mayor a menor)' },
  { value: 'Popularidad ASC', label: 'Popularidad (menor a mayor)' },
  { value: 'Ano DESC', label: 'Año (más reciente)' },
  { value: 'Ano ASC', label: 'Año (más antiguo)' },
  { value: 'Titulo ASC', label: 'Título (A-Z)' },
  { value: 'Titulo DESC', label: 'Título (Z-A)' },
  { value: 'PuntuacionPromedio DESC', label: 'Calificación (mayor a menor)' },
  { value: 'PuntuacionPromedio ASC', label: 'Calificación (menor a mayor)' },
];

export default function ContenidosPage() {
  const [contenidos, setContenidos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sql, setSql] = useState('');

  // Nuevo estado para el Top 10
  const [top10Contenidos, setTop10Contenidos] = useState([]);
  const [loadingTop10, setLoadingTop10] = useState(true);
  const [errorTop10, setErrorTop10] = useState(null);
  const [sqlTop10, setSqlTop10] = useState('');

  // Filtros
  const [tipo, setTipo] = useState('');
  const [ano, setAno] = useState('');
  const [genero, setGenero] = useState('');
  const [plataforma, setPlataforma] = useState('');
  const [popularidad, setPopularidad] = useState('');
  const [orden, setOrden] = useState(ORDENES[0].value);

  const handleQuery = () => {
    setLoading(true);
    setError(null);
    // Construir query params
    const params = new URLSearchParams();
    if (tipo) params.append('tipo', tipo);
    if (ano) params.append('ano', ano);
    if (genero) params.append('genero', genero);
    if (plataforma) params.append('plataforma', plataforma);
    if (popularidad) params.append('popularidad', popularidad);
    if (orden) params.append('orden', orden);
    // Fetch con filtros
    fetch(`/api/contenidos?${params.toString()}`)
      .then(res => res.json())
      .then(data => {
        setContenidos(data.contents);
        setSql(data.sql);
        setLoading(false);
      })
      .catch(err => {
        setError('Error al cargar los contenidos');
        setLoading(false);
      });
  };

  const limpiarFiltros = () => {
    setTipo('');
    setAno('');
    setGenero('');
    setPlataforma('');
    setPopularidad('');
    setOrden(ORDENES[0].value);
    setSql(''); // Clear SQL on filter clear
    setLoading(true);
    fetch('/api/contenidos')
      .then(res => res.json())
      .then(data => {
        setContenidos(data.contents);
        setSql(data.sql);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  // Cargar todos al inicio
  useEffect(() => {
    setLoading(true);
    fetch('/api/contenidos')
      .then(res => res.json())
      .then(data => {
        setContenidos(data.contents);
        setSql(data.sql);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Cargar Top 10 al inicio
  useEffect(() => {
    setLoadingTop10(true);
    fetch('/api/contenidos/top10')
      .then(res => res.json())
      .then(data => {
        setTop10Contenidos(data.top10);
        setSqlTop10(data.sql.top10);
        setLoadingTop10(false);
      })
      .catch(err => {
        setErrorTop10('Error al cargar el Top 10 de contenidos');
        setLoadingTop10(false);
      });
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Contenidos</h1>
      {/* Sección Top 10 Contenidos */}
      <section className="mb-10 p-6 bg-white dark:bg-zinc-800 rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Top 10 Contenidos Mejor Valorados</h2>
        {loadingTop10 ? (
          <div className="text-center">Cargando Top 10...</div>
        ) : errorTop10 ? (
          <div className="text-center text-red-500">{errorTop10}</div>
        ) : top10Contenidos.length === 0 ? (
          <div className="text-center text-gray-500">No hay contenidos en el Top 10 para mostrar.</div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {top10Contenidos.map((c, index) => (
              <div
                key={c.ID_Contenido}
                className="border border-green-200 dark:border-green-700 p-4 rounded-xl shadow bg-white dark:bg-zinc-800 flex flex-col gap-1 hover:shadow-lg transition"
              >
                <h3 className="font-semibold text-lg text-green-700 dark:text-green-300">
                  {index + 1}. <Link href={`/contenidos/${c.ID_Contenido}`}>{c.Titulo}</Link>
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Tipo: {c.Tipo} | Año: {c.Ano}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Clasificación: {c.Clasificacion || 'N/A'}</p>
                <p className="text-md font-bold text-blue-700 dark:text-blue-400">Puntuación Promedio: {parseFloat(c.PuntuacionPromedio).toFixed(2)}</p>
              </div>
            ))}
          </div>
        )}

        {/* SQL del Top 10 */}
        {sqlTop10 && (
          <div className="mt-6 bg-gray-100 dark:bg-zinc-900 p-4 rounded text-xs font-mono text-gray-700 dark:text-gray-200 overflow-x-auto">
            <span className="font-bold text-blue-700 dark:text-blue-400">SQL para Top 10:</span>
            <pre className="whitespace-pre-wrap mt-2">{sqlTop10}</pre>
          </div>
        )}
      </section>

      {/* Filtros */}
      <form className="mb-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 items-end bg-white dark:bg-zinc-800 p-4 rounded shadow">
        <div>
          <label className="block text-sm font-medium mb-1">Tipo</label>
          <select className="w-full rounded p-2" value={tipo} onChange={e => setTipo(e.target.value)}>
            {TIPOS.map(t => <option className='text-black' key={t} value={t}>{t ? t.charAt(0).toUpperCase() + t.slice(1) : 'Todos'}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Año</label>
          <input type="number" className="w-full rounded p-2" value={ano} onChange={e => setAno(e.target.value)} placeholder="Todos" min="1900" max="2100" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Género</label>
          <select className="w-full rounded p-2" value={genero} onChange={e => setGenero(e.target.value)}>
            {GENEROS.map(g => <option className='text-black' key={g} value={g}>{g || 'Todos'}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Plataforma</label>
          <select className="w-full rounded p-2" value={plataforma} onChange={e => setPlataforma(e.target.value)}>
            {PLATAFORMAS.map(p => <option className='text-black' key={p} value={p}>{p || 'Todas'}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Popularidad mínima</label>
          <input type="number" className="w-full rounded p-2" value={popularidad} onChange={e => setPopularidad(e.target.value)} placeholder="0" min="0" max="100" />
        </div>
        <div className="md:col-span-2 lg:col-span-1">
          <label className="block text-sm font-medium mb-1">Ordenar por</label>
          <select className="w-full rounded p-2" value={orden} onChange={e => setOrden(e.target.value)}>
            {ORDENES.map(o => <option className='text-black' key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
        <div className="col-span-full flex justify-end gap-2">
          <button type="button" className="bg-blue-600 text-white px-6 py-2 rounded font-semibold hover:bg-blue-700 transition" onClick={handleQuery}>
            Crear consulta
          </button>
          <button type="button" className="bg-gray-300 dark:bg-zinc-700 text-gray-800 dark:text-gray-200 px-6 py-2 rounded font-semibold hover:bg-gray-400 dark:hover:bg-zinc-600 transition" onClick={limpiarFiltros}>
            Limpiar filtros
          </button>
        </div>
      </form>
      {/* SQL generado */}
      {sql && (
        <div className="mb-6 bg-gray-100 dark:bg-zinc-900 p-4 rounded text-xs font-mono text-gray-700 dark:text-gray-200">
          <span className="font-bold text-blue-700 dark:text-blue-400">SQL QUEST RESULT:</span>
          <pre className="whitespace-pre-wrap mt-2">{sql}</pre>
        </div>
      )}
      {/* Tarjetas de contenidos */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <div className="text-center mt-20 col-span-full">Cargando contenidos...</div>
        ) : error ? (
          <div className="text-center mt-20 text-red-500 col-span-full">{error}</div>
        ) : contenidos.length === 0 ? (
          <div className="text-center mt-20 text-gray-500 col-span-full">No hay contenidos para mostrar.</div>
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
                {c.PuntuacionPromedio !== null && c.PuntuacionPromedio !== undefined && (
                  <span className="bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-200 px-2 py-1 rounded">Calificación: {parseFloat(c.PuntuacionPromedio).toFixed(2)}</span>
                )}
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