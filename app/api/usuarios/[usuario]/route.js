import { connectDB } from '@/lib/db';

export async function GET(req, { params }) {
  const db = await connectDB();
  const usuario = params.usuario;

  // 1. Datos del usuario
  const userSql = `\n    SELECT ID_Usuario, NombreUsuario, NombreCompleto, Email, Pais, Biografia, FechaNacimiento, FechaRegistro, Privacidad\n    FROM Usuarios WHERE NombreUsuario = ?\n  `;
  const [[user]] = await db.execute(userSql, [usuario]);
  if (!user) return Response.json({ error: 'Usuario no encontrado' }, { status: 404 });

  // 2. Reseñas del usuario
  const [resenas] = await db.execute(`
    SELECT R.ID_Resena, C.ID_Contenido, C.Titulo AS Contenido, R.Puntuacion, R.Comentario, R.FechaPublicacion
    FROM Resenas R
    JOIN Contenidos C ON R.ID_Contenido = C.ID_Contenido
    WHERE R.ID_Usuario = ?
    ORDER BY R.FechaPublicacion DESC
  `, [user.ID_Usuario]);

  // 3. Listas públicas del usuario
  const [listas] = await db.execute(`
    SELECT ID_Lista, Titulo, Tipo, Visibilidad, NumElementos, Seguidores
    FROM Listas WHERE ID_Usuario = ? AND Visibilidad = 'publico'
    ORDER BY FechaCreacion DESC
  `, [user.ID_Usuario]);

  // 4. Grupos a los que pertenece
  const [grupos] = await db.execute(`
    SELECT G.ID_Grupo, G.Nombre, G.Descripcion, G.Privacidad, G.Miembros, G.FechaCreacion
    FROM Grupos G
    JOIN grupo_usuario GU ON G.ID_Grupo = GU.ID_Grupo
    WHERE GU.ID_Usuario = ?
    ORDER BY G.Nombre
  `, [user.ID_Usuario]);

  // 5. Seguimientos de contenido
  const [seguimientos] = await db.execute(`
    SELECT S.ID_Seguimiento, C.ID_Contenido, C.Titulo, S.Estado, S.Progreso, S.FechaInicio, S.FechaFin, S.Puntuacion, S.Notas
    FROM Seguimiento_Contenido S
    JOIN Contenidos C ON S.ID_Contenido = C.ID_Contenido
    WHERE S.ID_Usuario = ?
    ORDER BY S.FechaInicio DESC
  `, [user.ID_Usuario]);

  return Response.json({ user, resenas, listas, grupos, seguimientos, sql: { user: userSql } });
} 