import { connectDB } from '@/lib/db';

export async function GET(req, { params }) {
  const db = await connectDB();
  const id = params.id;

  // 1. Datos principales del contenido
  const contenidoSql = `SELECT ID_Contenido, Titulo, Tipo, Ano, Clasificacion, Popularidad FROM Contenidos WHERE ID_Contenido = ?`;
  const [[contenido]] = await db.execute(contenidoSql, [id]);
  if (!contenido) return Response.json({ error: 'Contenido no encontrado' }, { status: 404 });

  // 2. Géneros
  const generosSql = `SELECT G.Nombre FROM generos G JOIN contenido_genero CG ON G.ID_Genero = CG.ID_Genero WHERE CG.ID_Contenido = ? ORDER BY G.Nombre`;
  const [generosRows] = await db.execute(generosSql, [id]);
  const generos = generosRows.map(g => g.Nombre);

  // 3. Plataformas
  const plataformasSql = `SELECT P.Nombre FROM plataformas P JOIN contenido_plataforma CP ON P.ID_Plataforma = CP.ID_Plataforma WHERE CP.ID_Contenido = ? ORDER BY P.Nombre`;
  const [plataformasRows] = await db.execute(plataformasSql, [id]);
  const plataformas = plataformasRows.map(p => p.Nombre);

  // 4. Reseñas
  const resenasSql = `SELECT R.ID_Resena, U.NombreUsuario, R.Puntuacion, R.Comentario, R.FechaPublicacion FROM Resenas R JOIN Usuarios U ON R.ID_Usuario = U.ID_Usuario WHERE R.ID_Contenido = ? ORDER BY R.FechaPublicacion DESC`;
  const [resenas] = await db.execute(resenasSql, [id]);

  // 5. Listas donde aparece
  const listasSql = `SELECT L.ID_Lista, L.Titulo, L.Tipo, L.Visibilidad, L.NumElementos, L.Seguidores FROM Listas L JOIN lista_contenido LC ON L.ID_Lista = LC.ID_Lista WHERE LC.ID_Contenido = ? AND L.Visibilidad = 'publico' ORDER BY L.FechaCreacion DESC`;
  const [listas] = await db.execute(listasSql, [id]);

  // 6. Seguimientos de usuarios
  const seguimientosSql = `SELECT S.ID_Seguimiento, U.NombreUsuario, S.Estado, S.Progreso, S.FechaInicio, S.FechaFin, S.Puntuacion, S.Notas FROM seguimiento_contenido S JOIN Usuarios U ON S.ID_Usuario = U.ID_Usuario WHERE S.ID_Contenido = ? ORDER BY S.FechaInicio DESC`;
  const [seguimientos] = await db.execute(seguimientosSql, [id]);

  return Response.json({
    contenido,
    generos,
    plataformas,
    resenas,
    listas,
    seguimientos,
    sql: {
      contenido: contenidoSql,
      generos: generosSql,
      plataformas: plataformasSql,
      resenas: resenasSql,
      listas: listasSql,
      seguimientos: seguimientosSql
    }
  });
} 