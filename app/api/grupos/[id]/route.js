import { connectDB } from '@/lib/db';

export async function GET(req, { params }) {
  const db = await connectDB();
  const id = params.id;

  // 1. Datos principales del grupo
  const grupoSql = `SELECT ID_Grupo, Nombre, Descripcion, Privacidad, Miembros, FechaCreacion FROM Grupos WHERE ID_Grupo = ?`;
  const [[grupo]] = await db.execute(grupoSql, [id]);
  if (!grupo) return Response.json({ error: 'Grupo no encontrado' }, { status: 404 });

  // 2. Miembros del grupo
  const miembrosSql = `SELECT U.ID_Usuario, U.NombreUsuario, GU.Rol, GU.FechaUnion FROM grupo_usuario GU JOIN Usuarios U ON GU.ID_Usuario = U.ID_Usuario WHERE GU.ID_Grupo = ? ORDER BY GU.FechaUnion`;
  const [miembros] = await db.execute(miembrosSql, [id]);

  // 3. Actividad reciente (puedes personalizar esto según tu modelo, aquí solo ejemplo de unión de miembros)
  const actividadSql = `SELECT U.NombreUsuario, GU.FechaUnion, GU.Rol FROM grupo_usuario GU JOIN Usuarios U ON GU.ID_Usuario = U.ID_Usuario WHERE GU.ID_Grupo = ? ORDER BY GU.FechaUnion DESC LIMIT 10`;
  const [actividad] = await db.execute(actividadSql, [id]);

  return Response.json({
    grupo,
    miembros,
    actividad,
    sql: {
      grupo: grupoSql,
      miembros: miembrosSql,
      actividad: actividadSql
    }
  });
} 