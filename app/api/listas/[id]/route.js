import { connectDB } from '@/lib/db';

export async function GET(req, { params }) {
  const db = await connectDB();
  const id = params.id;

  // 1. Datos principales de la lista
  const listaSql = `SELECT ID_Lista, Titulo, Tipo, Visibilidad, NumElementos, Seguidores, ID_Usuario, FechaCreacion FROM Listas WHERE ID_Lista = ?`;
  const [[lista]] = await db.execute(listaSql, [id]);
  if (!lista) return Response.json({ error: 'Lista no encontrada' }, { status: 404 });

  // 2. Creador de la lista
  const creadorSql = `SELECT NombreUsuario, NombreCompleto FROM Usuarios WHERE ID_Usuario = ?`;
  const [[creador]] = await db.execute(creadorSql, [lista.ID_Usuario]);

  // 3. Elementos de la lista (contenidos)
  const elementosSql = `SELECT C.ID_Contenido, C.Titulo, C.Tipo, C.Ano, C.Clasificacion FROM Contenidos C JOIN lista_contenido LC ON C.ID_Contenido = LC.ID_Contenido WHERE LC.ID_Lista = ? ORDER BY LC.Orden`;
  const [elementos] = await db.execute(elementosSql, [id]);

  // 4. Seguidores de la lista (usuarios)
  const seguidoresSql = `SELECT U.NombreUsuario FROM Usuarios U JOIN Seguidores_Listas SL ON U.ID_Usuario = SL.ID_Usuario WHERE SL.ID_Lista = ?`;
  const [seguidores] = await db.execute(seguidoresSql, [id]);

  // 5. Comentarios en la lista
  const comentariosSql = `SELECT CR.ID_Comentario, U.NombreUsuario, CR.Comentario, CR.Fecha FROM comentarios_resenas CR JOIN Usuarios U ON CR.ID_Usuario = U.ID_Usuario WHERE CR.ID_Lista = ? ORDER BY CR.Fecha DESC`;
  const [comentarios] = await db.execute(comentariosSql, [id]);

  return Response.json({
    lista,
    elementos,
    seguidores,
    creador,
    comentarios,
    sql: {
      lista: listaSql,
      creador: creadorSql,
      elementos: elementosSql,
      seguidores: seguidoresSql,
      comentarios: comentariosSql
    }
  });
} 