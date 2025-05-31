import { connectDB } from '@/lib/db';

export async function GET() {
  const db = await connectDB();
  const [rows] = await db.execute(`
    SELECT 
      R.ID_Resena,
      U.NombreUsuario,
      C.Titulo AS Contenido,
      R.Puntuacion,
      R.Comentario,
      R.FechaPublicacion
    FROM Resenas R
    JOIN Usuarios U ON R.ID_Usuario = U.ID_Usuario
    JOIN Contenidos C ON R.ID_Contenido = C.ID_Contenido
    ORDER BY R.FechaPublicacion DESC
  `);
  return Response.json(rows);
}
