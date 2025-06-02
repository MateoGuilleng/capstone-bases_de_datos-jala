'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const TIPOS = [
  '', 'favoritos', 'por_ver', 'recomendacion', 'personalizada'
];
const VISIBILIDADES = [
  '', 'publico', 'privado', 'solo_seguidores'
];
const ORDENES = [
  { value: 'FechaCreacion DESC', label: 'Fecha creación (más reciente)' },
  { value: 'FechaCreacion ASC', label: 'Fecha creación (más antigua)' },
  { value: 'Titulo ASC', label: 'Título (A-Z)' },
  { value: 'Titulo DESC', label: 'Título (Z-A)' },
  { value: 'Seguidores DESC', label: 'Seguidores (mayor a menor)' },
  { value: 'Seguidores ASC', label: 'Seguidores (menor a mayor)' },
];

export default function ListasPage() {
  const [listas, setListas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sql, setSql] = useState('');

  // Filtros
  const [tipo, setTipo] = useState('');
  const [visibilidad, setVisibilidad] = useState('');
  const [usuario, setUsuario] = useState('');
  const [orden, setOrden] = useState(ORDENES[0].value);

  const handleQuery = () => {
    setLoading(true);
    setError(null);
    // Construir query params
    const params = new URLSearchParams();
    if (tipo) params.append('tipo', tipo);
    if (visibilidad) params.append('visibilidad', visibilidad);
    if (usuario) params.append('usuario', usuario);
    // Fetch con filtros
    fetch(`/api/listas?${params.toString()}`)
      .then(res => res.json())
      .then(data => {
        setListas(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Error al cargar las listas');
        setLoading(false);
      });
    // Construir SQL
    let sql = `SELECT L.ID_Lista, L.Titulo, L.Descripcion, L.Tipo, L.Visibilidad, L.NumElementos, L.Seguidores,\n  U.NombreUsuario\nFROM Listas L\nJOIN Usuarios U ON L.ID_Usuario = U.ID_Usuario\nWHERE 1=1`;
    if (tipo) sql += `\n  AND L.Tipo = '${tipo}'`;
    if (visibilidad) sql += `\n  AND L.Visibilidad = '${visibilidad}'`;
    if (usuario) sql += `\n  AND U.NombreUsuario = '${usuario}'`;
    sql += `\nORDER BY ${orden.replace(' ', ' ')};`;
    setSql(sql);
  };

  const limpiarFiltros = () => {
    setTipo('');
    setVisibilidad('');
    setUsuario('');
    setOrden(ORDENES[0].value);
    setSql('');
    setLoading(true);
    fetch('/api/listas')
      .then(res => res.json())
      .then(data => {
        setListas(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  // Cargar todos al inicio
  useEffect(() => {
    setLoading(true);
    fetch('/api/listas')
      .then(res => res.json())
      .then(data => {
        setListas(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Listas</h1>
      {/* Filtros */}
      <form className="mb-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 items-end bg-white dark:bg-zinc-800 p-4 rounded shadow">
        <div>
          <label className="block text-sm font-medium mb-1">Tipo</label>
          <select className="w-full rounded p-2" value={tipo} onChange={e => setTipo(e.target.value)}>
            {TIPOS.map(t => <option key={t} value={t}>{t ? t.charAt(0).toUpperCase() + t.slice(1) : 'Todos'}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Visibilidad</label>
          <select className="w-full rounded p-2" value={visibilidad} onChange={e => setVisibilidad(e.target.value)}>
            {VISIBILIDADES.map(v => <option key={v} value={v}>{v ? v.charAt(0).toUpperCase() + v.slice(1) : 'Todas'}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Usuario</label>
          <input type="text" className="w-full rounded p-2" value={usuario} onChange={e => setUsuario(e.target.value)} placeholder="Todos" />
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
      {/* Tarjetas de listas */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <div className="text-center mt-20 col-span-full">Cargando listas...</div>
        ) : error ? (
          <div className="text-center mt-20 text-red-500 col-span-full">{error}</div>
        ) : listas.length === 0 ? (
          <div className="text-center mt-20 text-gray-500 col-span-full">No hay listas para mostrar.</div>
        ) : (
          listas.map(l => (
            <div
              key={l.ID_Lista}
              className="border border-blue-200 dark:border-zinc-700 p-6 rounded-xl shadow bg-white dark:bg-zinc-800 flex flex-col gap-2 hover:shadow-lg transition"
            >
              <h2 className="font-semibold text-lg text-blue-700 dark:text-blue-300 mb-1">
                <Link href={`/listas/${l.ID_Lista}`}>{l.Titulo}</Link>
              </h2>
              <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                <strong>Usuario:</strong> <Link href={`/usuarios/${l.NombreUsuario}`} className="text-blue-600 dark:text-blue-300 hover:underline">{l.NombreUsuario}</Link>
              </div>
              <div className="flex flex-wrap gap-2 text-xs mb-1">
                <span className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 px-2 py-1 rounded">{l.Tipo}</span>
                <span className="bg-gray-100 dark:bg-zinc-700 text-gray-700 dark:text-gray-200 px-2 py-1 rounded">{l.Visibilidad}</span>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                <strong>Elementos:</strong> {l.NumElementos} | <strong>Seguidores:</strong> {l.Seguidores}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
} 