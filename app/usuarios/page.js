'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const PAISES = [
  '', 'México', 'España', 'Argentina', 'Colombia', 'Chile'
];
const PRIVACIDADES = [
  '', 'publico', 'privado', 'solo_amigos'
];
const ORDENES = [
  { value: 'TotalResenas DESC', label: 'Total reseñas (mayor a menor)' },
  { value: 'TotalResenas ASC', label: 'Total reseñas (menor a mayor)' },
  { value: 'PromedioPuntuacion DESC', label: 'Promedio puntuación (mayor a menor)' },
  { value: 'PromedioPuntuacion ASC', label: 'Promedio puntuación (menor a mayor)' },
  { value: 'NombreUsuario ASC', label: 'Nombre (A-Z)' },
  { value: 'NombreUsuario DESC', label: 'Nombre (Z-A)' },
];

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sql, setSql] = useState('');

  // Filtros
  const [pais, setPais] = useState('');
  const [privacidad, setPrivacidad] = useState('');
  const [minResenas, setMinResenas] = useState('');
  const [orden, setOrden] = useState(ORDENES[0].value);

  const handleQuery = () => {
    setLoading(true);
    setError(null);
    // Construir query params
    const params = new URLSearchParams();
    if (pais) params.append('pais', pais);
    if (privacidad) params.append('privacidad', privacidad);
    if (minResenas) params.append('minResenas', minResenas);
    // Fetch con filtros
    fetch(`/api/usuarios?${params.toString()}`)
      .then(res => res.json())
      .then(data => {
        setUsuarios(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Error al cargar los usuarios');
        setLoading(false);
      });
    // Construir SQL
    let sql = `SELECT U.ID_Usuario, U.NombreUsuario, U.NombreCompleto, U.Pais, U.Privacidad,\n  COUNT(DISTINCT R.ID_Resena) AS TotalResenas,\n  AVG(R.Puntuacion) AS PromedioPuntuacion\nFROM Usuarios U\nLEFT JOIN Resenas R ON U.ID_Usuario = R.ID_Usuario\nWHERE 1=1`;
    if (pais) sql += `\n  AND U.Pais = '${pais}'`;
    if (privacidad) sql += `\n  AND U.Privacidad = '${privacidad}'`;
    sql += `\nGROUP BY U.ID_Usuario`;
    if (minResenas) sql += `\nHAVING TotalResenas >= ${minResenas}`;
    sql += `\nORDER BY ${orden.replace(' ', ' ')};`;
    setSql(sql);
  };

  const limpiarFiltros = () => {
    setPais('');
    setPrivacidad('');
    setMinResenas('');
    setOrden(ORDENES[0].value);
    setSql('');
    setLoading(true);
    fetch('/api/usuarios')
      .then(res => res.json())
      .then(data => {
        setUsuarios(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  // Cargar todos al inicio
  useEffect(() => {
    setLoading(true);
    fetch('/api/usuarios')
      .then(res => res.json())
      .then(data => {
        setUsuarios(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Usuarios</h1>
      {/* Filtros */}
      <form className="mb-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 items-end bg-white dark:bg-zinc-800 p-4 rounded shadow">
        <div>
          <label className="block text-sm font-medium mb-1">País</label>
          <select className="w-full rounded p-2" value={pais} onChange={e => setPais(e.target.value)}>
            {PAISES.map(p => <option key={p} value={p}>{p || 'Todos'}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Privacidad</label>
          <select className="w-full rounded p-2" value={privacidad} onChange={e => setPrivacidad(e.target.value)}>
            {PRIVACIDADES.map(p => <option key={p} value={p}>{p ? p.charAt(0).toUpperCase() + p.slice(1) : 'Todas'}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Mínimo de reseñas</label>
          <input type="number" className="w-full rounded p-2" value={minResenas} onChange={e => setMinResenas(e.target.value)} placeholder="0" min="0" />
        </div>
        <div className="md:col-span-2 lg:col-span-1">
          <label className="block text-sm font-medium mb-1">Ordenar por</label>
          <select className="w-full rounded p-2" value={orden} onChange={e => setOrden(e.target.value)}>
            {ORDENES.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
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
      {/* Tarjetas de usuarios */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <div className="text-center mt-20 col-span-full">Cargando usuarios...</div>
        ) : error ? (
          <div className="text-center mt-20 text-red-500 col-span-full">{error}</div>
        ) : usuarios.length === 0 ? (
          <div className="text-center mt-20 text-gray-500 col-span-full">No hay usuarios para mostrar.</div>
        ) : (
          usuarios.map(u => (
            <div
              key={u.ID_Usuario}
              className="border border-blue-200 dark:border-zinc-700 p-6 rounded-xl shadow bg-white dark:bg-zinc-800 flex flex-col gap-2 hover:shadow-lg transition"
            >
              <h2 className="font-semibold text-lg text-blue-700 dark:text-blue-300 mb-1">
                <Link href={`/usuarios/${u.NombreUsuario}`}>{u.NombreUsuario}</Link>
              </h2>
              <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                <strong>Nombre:</strong> {u.NombreCompleto}
              </div>
              <div className="flex flex-wrap gap-2 text-xs mb-1">
                <span className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 px-2 py-1 rounded">{u.Pais}</span>
                <span className="bg-gray-100 dark:bg-zinc-700 text-gray-700 dark:text-gray-200 px-2 py-1 rounded">{u.Privacidad}</span>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                <strong>Reseñas:</strong> {u.TotalResenas} | <strong>Promedio:</strong> {u.PromedioPuntuacion ? Number(u.PromedioPuntuacion).toFixed(2) : '-'}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
} 