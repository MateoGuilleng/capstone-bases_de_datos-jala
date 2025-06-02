import { connectDB } from '@/lib/db';

export async function GET(req) {
  const db = await connectDB();
  const { searchParams } = new URL(req.url);
  const pais = searchParams.get('pais');
  const privacidad = searchParams.get('privacidad');
  const minResenas = searchParams.get('minResenas');
  const orden = searchParams.get('orden');

  let query = `
    SELECT U.ID_Usuario, U.NombreUsuario, U.NombreCompleto, U.Pais, U.Privacidad,
      COUNT(DISTINCT R.ID_Resena) AS TotalResenas,
      AVG(R.Puntuacion) AS PromedioPuntuacion
    FROM Usuarios U
    LEFT JOIN Resenas R ON U.ID_Usuario = R.ID_Usuario
    WHERE 1=1
  `;
  const params = [];
  if (pais) {
    query += ' AND U.Pais = ?';
    params.push(pais);
  }
  if (privacidad) {
    query += ' AND U.Privacidad = ?';
    params.push(privacidad);
  }
  query += ' GROUP BY U.ID_Usuario';
  if (minResenas) {
    query += ' HAVING TotalResenas >= ?';
    params.push(minResenas);
  }
  if (orden) {
    const validOrders = [
      'TotalResenas DESC', 'TotalResenas ASC',
      'PromedioPuntuacion DESC', 'PromedioPuntuacion ASC',
      'NombreUsuario ASC', 'NombreUsuario DESC',
    ];
    if (validOrders.includes(orden)) {
      query += ` ORDER BY ${orden}`;
    } else {
      query += ' ORDER BY TotalResenas DESC, U.NombreUsuario ASC';
    }
  } else {
    query += ' ORDER BY TotalResenas DESC, U.NombreUsuario ASC';
  }
  const [rows] = await db.execute(query, params);
  const fullQuery = db.format(query, params);
  return Response.json({ users: rows, sql: fullQuery });
} 