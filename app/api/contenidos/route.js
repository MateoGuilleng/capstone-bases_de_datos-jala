import { connectDB } from '@/lib/db';

export async function GET(req) {
  const db = await connectDB();
  const { searchParams } = new URL(req.url);
  const tipo = searchParams.get('tipo');
  const ano = searchParams.get('ano');
  const genero = searchParams.get('genero');
  const plataforma = searchParams.get('plataforma');
  const popularidad = searchParams.get('popularidad');
  const orden = searchParams.get('orden');

  let query = `
    SELECT C.ID_Contenido, C.Titulo, C.Tipo, C.Ano, C.Clasificacion, C.Popularidad,
      GROUP_CONCAT(DISTINCT G.Nombre ORDER BY G.Nombre ASC SEPARATOR ', ') AS Generos,
      GROUP_CONCAT(DISTINCT P.Nombre ORDER BY P.Nombre ASC SEPARATOR ', ') AS Plataformas
    FROM Contenidos C
    LEFT JOIN contenido_genero CG ON C.ID_Contenido = CG.ID_Contenido
    LEFT JOIN generos G ON CG.ID_Genero = G.ID_Genero
    LEFT JOIN contenido_plataforma CP ON C.ID_Contenido = CP.ID_Contenido
    LEFT JOIN plataformas P ON CP.ID_Plataforma = P.ID_Plataforma
    WHERE 1=1
  `;
  const params = [];
  if (tipo) {
    query += ' AND C.Tipo = ?';
    params.push(tipo);
  }
  if (ano) {
    query += ' AND C.Ano = ?';
    params.push(ano);
  }
  if (genero) {
    query += ' AND G.Nombre = ?';
    params.push(genero);
  }
  if (plataforma) {
    query += ' AND P.Nombre = ?';
    params.push(plataforma);
  }
  if (popularidad) {
    query += ' AND C.Popularidad >= ?';
    params.push(popularidad);
  }
  query += ' GROUP BY C.ID_Contenido';
  if (orden) {
    // Ensure the order parameter is safe to use in SQL
    const validOrders = [
      'Popularidad DESC', 'Popularidad ASC',
      'Ano DESC', 'Ano ASC',
      'Titulo ASC', 'Titulo DESC',
    ];
    if (validOrders.includes(orden)) {
      query += ` ORDER BY ${orden}`;
    } else {
      // Default order if an invalid one is provided
      query += ' ORDER BY C.Popularidad DESC, C.Titulo ASC';
    }
  } else {
    // Default order if no order parameter is provided
    query += ' ORDER BY C.Popularidad DESC, C.Titulo ASC';
  }
  const [rows] = await db.execute(query, params);
  const fullQuery = db.format(query, params);
  return Response.json({ contents: rows, sql: fullQuery });
} 