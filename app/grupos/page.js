'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const PRIVACIDADES = [
  '', 'publico', 'privado', 'oculto'
];
const ORDENES = [
  { value: 'Miembros DESC', label: 'Miembros (mayor a menor)' },
  { value: 'Miembros ASC', label: 'Miembros (menor a mayor)' },
  { value: 'Nombre ASC', label: 'Nombre (A-Z)' },
  { value: 'Nombre DESC', label: 'Nombre (Z-A)' },
  { value: 'FechaCreacion DESC', label: 'Fecha creación (más reciente)' },
  { value: 'FechaCreacion ASC', label: 'Fecha creación (más antigua)' },
];

export default function GruposPage() {
  const [grupos, setGrupos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sql, setSql] = useState('');

  // Filtros
  const [privacidad, setPrivacidad] = useState('');
  const [minMiembros, setMinMiembros] = useState('');
  const [orden, setOrden] = useState(ORDENES[0].value);

  const handleQuery = () => {
    setLoading(true);
    setError(null);
    // Construir query params
    const params = new URLSearchParams();
    if (privacidad) params.append('privacidad', privacidad);
    if (minMiembros) params.append('minMiembros', minMiembros);
    if (orden) params.append('orden', orden);
    // Fetch con filtros
    fetch(`/api/grupos?${params.toString()}`)
      .then(res => res.json())
      .then(data => {
        setGrupos(data.groups);
        setSql(data.sql);
        setLoading(false);
      })
      .catch(err => {
        setError('Error al cargar los grupos');
        setLoading(false);
      });
  };

  const limpiarFiltros = () => {
    setPrivacidad('');
    setMinMiembros('');
    setOrden(ORDENES[0].value);
    setSql(''); // Clear SQL on filter clear
    setLoading(true);
    fetch('/api/grupos')
      .then(res => res.json())
      .then(data => {
        setGrupos(data.groups);
        setSql(data.sql);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  // Cargar todos al inicio
  useEffect(() => {
    setLoading(true);
    fetch('/api/grupos')
      .then(res => res.json())
      .then(data => {
        setGrupos(data.groups);
        setSql(data.sql);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Grupos</h1>
      {/* Filtros */}
      <form className="mb-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 items-end bg-white dark:bg-zinc-800 p-4 rounded shadow">
        <div>
          <label className="block text-sm font-medium mb-1">Privacidad</label>
          <select className="w-full rounded p-2" value={privacidad} onChange={e => setPrivacidad(e.target.value)}>
            {PRIVACIDADES.map(p => <option className='text-black' key={p} value={p}>{p ? p.charAt(0).toUpperCase() + p.slice(1) : 'Todas'}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Mínimo de miembros</label>
          <input type="number" className="w-full rounded p-2" value={minMiembros} onChange={e => setMinMiembros(e.target.value)} placeholder="0" min="0" />
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
      {/* Tarjetas de grupos */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <div className="text-center mt-20 col-span-full">Cargando grupos...</div>
        ) : error ? (
          <div className="text-center mt-20 text-red-500 col-span-full">{error}</div>
        ) : grupos.length === 0 ? (
          <div className="text-center mt-20 text-gray-500 col-span-full">No hay grupos para mostrar.</div>
        ) : (
          grupos.map(g => (
            <div
              key={g.ID_Grupo}
              className="border border-blue-200 dark:border-zinc-700 p-6 rounded-xl shadow bg-white dark:bg-zinc-800 flex flex-col gap-2 hover:shadow-lg transition"
            >
              <h2 className="font-semibold text-lg text-blue-700 dark:text-blue-300 mb-1">
                <Link href={`/grupos/${g.ID_Grupo}`}>{g.Nombre}</Link>
              </h2>
              <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                <strong>Creador:</strong> <Link href={`/usuarios/${g.Creador}`} className="text-blue-600 dark:text-blue-300 hover:underline">{g.Creador}</Link>
              </div>
              <div className="flex flex-wrap gap-2 text-xs mb-1">
                <span className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 px-2 py-1 rounded">{g.Privacidad}</span>
                <span className="bg-gray-100 dark:bg-zinc-700 text-gray-700 dark:text-gray-200 px-2 py-1 rounded">Miembros: {g.Miembros}</span>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                <strong>Fecha creación:</strong> {g.FechaCreacion?.split('T')[0]}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
} 