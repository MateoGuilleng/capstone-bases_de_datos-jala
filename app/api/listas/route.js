import { connectDB } from '@/lib/db';

export async function GET(req) {
  const db = await connectDB();
  const { searchParams } = new URL(req.url);
  const tipo = searchParams.get('tipo');
  const visibilidad = searchParams.get('visibilidad');
  const usuario = searchParams.get('usuario');

  let query = `
    SELECT L.ID_Lista, L.Titulo, L.Descripcion, L.Tipo, L.Visibilidad, L.NumElementos, L.Seguidores,
      U.NombreUsuario
    FROM Listas L
    JOIN Usuarios U ON L.ID_Usuario = U.ID_Usuario
    WHERE 1=1
  `;
  const params = [];
  if (tipo) {
    query += ' AND L.Tipo = ?';
    params.push(tipo);
  }
  if (visibilidad) {
    query += ' AND L.Visibilidad = ?';
    params.push(visibilidad);
  }
  if (usuario) {
    query += ' AND U.NombreUsuario = ?';
    params.push(usuario);
  }
  query += ' ORDER BY L.FechaCreacion DESC, L.Titulo ASC';
  const [rows] = await db.execute(query, params);
  return Response.json(rows);
} 