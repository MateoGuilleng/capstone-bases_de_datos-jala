import { connectDB } from '@/lib/db';

export async function GET(req) {
  const db = await connectDB();
  const { searchParams } = new URL(req.url);
  const pais = searchParams.get('pais');
  const privacidad = searchParams.get('privacidad');
  const minResenas = searchParams.get('minResenas');

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
  query += ' ORDER BY TotalResenas DESC, U.NombreUsuario ASC';
  const [rows] = await db.execute(query, params);
  return Response.json(rows);
} 