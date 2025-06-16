import { connectDB } from '@/lib/db';

export async function GET(req, { params }) {
  const db = await connectDB();
  const id = params.id;

  try {
    // 1. Datos principales de la lista
    const listaSql = `
      SELECT L.*, U.NombreUsuario as Creador
      FROM Listas L
      JOIN Usuarios U ON L.ID_Usuario = U.ID_Usuario
      WHERE L.ID_Lista = ?
    `;
    const [[lista]] = await db.execute(listaSql, [id]);
    if (!lista) return Response.json({ error: 'Lista no encontrada' }, { status: 404 });

    // 2. Elementos de la lista (contenidos)
    const elementosSql = `
      SELECT 
        C.ID_Contenido, 
        C.Titulo, 
        C.Tipo, 
        C.Ano, 
        C.Clasificacion,
        LC.Comentario as NotaPersonal,
        COALESCE(LC.Orden, 999) as Orden
      FROM Contenidos C 
      JOIN lista_contenido LC ON C.ID_Contenido = LC.ID_Contenido 
      WHERE LC.ID_Lista = ? 
      ORDER BY COALESCE(LC.Orden, 999), C.Titulo
    `;
    const [elementos] = await db.execute(elementosSql, [id]);

    // 3. Seguidores de la lista (usuarios)
    const seguidoresSql = `
      SELECT 
        U.ID_Usuario,
        U.NombreUsuario,
        SL.FechaSeguimiento
      FROM Usuarios U 
      JOIN seguidores_listas SL ON U.ID_Usuario = SL.ID_Usuario 
      WHERE SL.ID_Lista = ?
      ORDER BY SL.FechaSeguimiento DESC
    `;
    const [seguidores] = await db.execute(seguidoresSql, [id]);

    return Response.json({
      lista,
      elementos,
      seguidores,
      sql: {
        lista: listaSql,
        elementos: elementosSql,
        seguidores: seguidoresSql
      }
    });
  } catch (error) {
    console.error('Error al obtener detalles de la lista:', error);
    return Response.json({ error: 'Error al obtener los detalles de la lista' }, { status: 500 });
  }
} 