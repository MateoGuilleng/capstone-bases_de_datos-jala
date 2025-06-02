import { connectDB } from '@/lib/db';

export async function GET(req) {
  const db = await connectDB();
  const { searchParams } = new URL(req.url);
  const privacidad = searchParams.get('privacidad');
  const minMiembros = searchParams.get('minMiembros');

  let query = `
    SELECT G.ID_Grupo, G.Nombre, G.Descripcion, G.Privacidad, G.Miembros, G.FechaCreacion, U.NombreUsuario AS Creador
    FROM Grupos G
    JOIN Usuarios U ON G.ID_Creador = U.ID_Usuario
    WHERE 1=1
  `;
  const params = [];
  if (privacidad) {
    query += ' AND G.Privacidad = ?';
    params.push(privacidad);
  }
  if (minMiembros) {
    query += ' AND G.Miembros >= ?';
    params.push(minMiembros);
  }
  query += ' ORDER BY G.Miembros DESC, G.Nombre ASC';
  const [rows] = await db.execute(query, params);
  return Response.json(rows);
} 