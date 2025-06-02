import { connectDB } from '@/lib/db';

export async function GET(req) {
  const db = await connectDB();
  const { searchParams } = new URL(req.url);
  const usuario = searchParams.get('usuario');
  const contenido = searchParams.get('contenido');
  const minPuntuacion = searchParams.get('minPuntuacion');
  const orden = searchParams.get('orden') || 'FechaPublicacion DESC';

  let query = `
    SELECT 
      R.ID_Resena,
      U.NombreUsuario,
      C.ID_Contenido,
      C.Titulo AS Contenido,
      R.Puntuacion,
      R.Comentario,
      R.FechaPublicacion
    FROM Resenas R
    JOIN Usuarios U ON R.ID_Usuario = U.ID_Usuario
    JOIN Contenidos C ON R.ID_Contenido = C.ID_Contenido
    WHERE 1=1
  `;
  const params = [];
  if (usuario) {
    query += ' AND U.NombreUsuario = ?';
    params.push(usuario);
  }
  if (contenido) {
    query += ' AND C.Titulo = ?';
    params.push(contenido);
  }
  if (minPuntuacion) {
    query += ' AND R.Puntuacion >= ?';
    params.push(minPuntuacion);
  }

  // Interpolate parameters into the query string for display purposes
  let displayQuery = query;
  params.forEach(param => {
    if (typeof param === 'string') {
      displayQuery = displayQuery.replace('?', `'${param}'`);
    } else {
      displayQuery = displayQuery.replace('?', param);
    }
  });

  displayQuery += ` ORDER BY ${orden}`;
  query += ` ORDER BY ${orden}`;
  const [rows] = await db.execute(query, params);
  return Response.json({ reviews: rows, sql: displayQuery });
}
