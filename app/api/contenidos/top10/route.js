import { connectDB } from '@/lib/db';

export async function GET() {
  const db = await connectDB();

  try {
    const top10Sql = `
      SELECT 
        C.ID_Contenido,
        C.Titulo,
        C.Tipo,
        C.Ano,
        C.Clasificacion,
        AVG(R.Puntuacion) as PuntuacionPromedio
      FROM Contenidos C
      JOIN Resenas R ON C.ID_Contenido = R.ID_Contenido
      GROUP BY C.ID_Contenido, C.Titulo, C.Tipo, C.Ano, C.Clasificacion
      ORDER BY PuntuacionPromedio DESC
      LIMIT 10
    `;
    const [top10] = await db.execute(top10Sql);

    return Response.json({
      top10,
      sql: {
        top10: top10Sql
      }
    });
  } catch (error) {
    console.error('Error al obtener los 10 mejores contenidos:', error);
    return Response.json({ error: 'Error al obtener los 10 mejores contenidos' }, { status: 500 });
  }
} 