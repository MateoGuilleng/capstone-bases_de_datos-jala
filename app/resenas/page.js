'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const USUARIOS = [
    '', 'cinemaniaco88', 'gamerchick', 'libromaniac', 'serieadicto', 'narrativa_nerd'
];
const CONTENIDOS = [
    '', 'Interstellar', 'Death Stranding', 'Stranger Things', 'It', 'Podcast Futurista'
];
const ORDENES = [
    { value: 'FechaPublicacion DESC', label: 'Fecha publicación (más reciente)' },
    { value: 'FechaPublicacion ASC', label: 'Fecha publicación (más antigua)' },
    { value: 'Puntuacion DESC', label: 'Puntuación (mayor a menor)' },
    { value: 'Puntuacion ASC', label: 'Puntuación (menor a mayor)' },
    { value: 'NombreUsuario ASC', label: 'Usuario (A-Z)' },
    { value: 'NombreUsuario DESC', label: 'Usuario (Z-A)' },
];

export default function ResenasPage() {
    const [resenas, setResenas] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [sql, setSql] = useState('');

    // Filtros
    const [usuario, setUsuario] = useState('');
    const [contenido, setContenido] = useState('');
    const [minPuntuacion, setMinPuntuacion] = useState('');
    const [orden, setOrden] = useState(ORDENES[0].value);

    const handleQuery = () => {
        setLoading(true);
        setError(null);
        // Construir query params
        const params = new URLSearchParams();
        if (usuario) params.append('usuario', usuario);
        if (contenido) params.append('contenido', contenido);
        if (minPuntuacion) params.append('minPuntuacion', minPuntuacion);
        if (orden) params.append('orden', orden);
        // Fetch con filtros
        fetch(`/api/resenas?${params.toString()}`)
            .then(res => res.json())
            .then(data => {
                setResenas(data);
                setLoading(false);
            })
            .catch(err => {
                setError('Error al cargar las reseñas');
                setLoading(false);
            });
        // Construir SQL
        let sql = `SELECT R.ID_Resena, U.NombreUsuario, C.Titulo AS Contenido, R.Puntuacion, R.Comentario, R.FechaPublicacion\nFROM Resenas R\nJOIN Usuarios U ON R.ID_Usuario = U.ID_Usuario\nJOIN Contenidos C ON R.ID_Contenido = C.ID_Contenido\nWHERE 1=1`;
        if (usuario) sql += `\n  AND U.NombreUsuario = '${usuario}'`;
        if (contenido) sql += `\n  AND C.Titulo = '${contenido}'`;
        if (minPuntuacion) sql += `\n  AND R.Puntuacion >= ${minPuntuacion}`;
        sql += `\nORDER BY ${orden.replace(' ', ' ')};`;
        setSql(sql);
    };

    const limpiarFiltros = () => {
        setUsuario('');
        setContenido('');
        setMinPuntuacion('');
        setOrden(ORDENES[0].value);
        setSql('');
        setLoading(true);
        fetch('/api/resenas')
            .then(res => res.json())
            .then(data => {
                setResenas(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    };

    // Cargar todos al inicio
    useEffect(() => {
        setLoading(true);
        fetch('/api/resenas')
            .then(res => res.json())
            .then(data => {
                setResenas(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    return (
        <main>
            <h1 className="text-3xl font-bold mb-6">Reseñas</h1>
            {/* Filtros */}
            <form className="mb-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 items-end bg-white dark:bg-zinc-800 p-4 rounded shadow">
                <div>
                    <label className="block text-sm font-medium mb-1">Usuario</label>
                    <select className="w-full rounded p-2" value={usuario} onChange={e => setUsuario(e.target.value)}>
                        {USUARIOS.map(u => <option key={u} value={u}>{u || 'Todos'}</option>)}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Contenido</label>
                    <select className="w-full rounded p-2" value={contenido} onChange={e => setContenido(e.target.value)}>
                        {CONTENIDOS.map(c => <option key={c} value={c}>{c || 'Todos'}</option>)}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Puntuación mínima</label>
                    <input type="number" className="w-full rounded p-2" value={minPuntuacion} onChange={e => setMinPuntuacion(e.target.value)} placeholder="0" min="0" max="10" />
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
            {/* Tarjetas de reseñas */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {loading ? (
                    <div className="text-center mt-20 col-span-full">Cargando reseñas...</div>
                ) : error ? (
                    <div className="text-center mt-20 text-red-500 col-span-full">{error}</div>
                ) : resenas.length === 0 ? (
                    <div className="text-center mt-20 text-gray-500 col-span-full">No hay reseñas para mostrar.</div>
                ) : (
                    resenas.map(resena => (
                        <div
                            key={resena.ID_Resena}
                            className="border border-blue-200 dark:border-zinc-700 p-6 rounded-xl shadow bg-white dark:bg-zinc-800 flex flex-col gap-2 hover:shadow-lg transition"
                        >
                            <h2 className="font-semibold text-lg text-blue-700 dark:text-blue-300 mb-1">
                                <Link href={`/contenidos/${resena.Contenido}`}>{resena.Contenido}</Link>
                            </h2>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                por <Link href={`/usuarios/${resena.NombreUsuario}`} className="font-bold text-blue-600 dark:text-blue-300 hover:underline">{resena.NombreUsuario}</Link> | <span className="text-xs">{resena.FechaPublicacion}</span>
                            </p>
                            <p className="mt-2 text-yellow-500 text-lg">{'★'.repeat(resena.Puntuacion)}<span className="text-gray-400 dark:text-gray-500">{'★'.repeat(10 - resena.Puntuacion)}</span> <span className="ml-2 text-gray-700 dark:text-gray-200 font-bold">{resena.Puntuacion}/10</span></p>
                            <p className="mt-2 text-gray-800 dark:text-gray-100 italic">{resena.Comentario}</p>
                        </div>
                    ))
                )}
            </div>
        </main>
    );
} 