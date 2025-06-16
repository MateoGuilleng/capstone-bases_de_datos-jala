'use client';

import Image from 'next/image';

export default function RelationsPage() {
  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white dark:bg-zinc-800 rounded-xl shadow space-y-16">
      <h1 className="text-3xl font-bold mb-6 text-blue-700 dark:text-blue-400">Documentación de la Base de Datos</h1>

      {/* Sección 1: Relaciones de la Base de Datos */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-blue-600 dark:text-blue-300">1. Relaciones de la Base de Datos</h2>


        <div className="space-y-8">
          <h3 className="text-xl font-semibold mb-2 text-blue-500 dark:text-blue-400">Relaciones Principales</h3>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-200">
            <li><strong>Usuarios (1) → Grupos (N):</strong> Un usuario puede crear múltiples grupos (ID_Creador).</li>
            <li><strong>Usuarios (N) ↔ Grupos (M):</strong> Relación muchos a muchos a través de la tabla `grupo_usuario`.</li>
            <li><strong>Usuarios (1) → Reseñas (N):</strong> Un usuario puede escribir múltiples reseñas.</li>
            <li><strong>Contenidos (1) → Reseñas (N):</strong> Un contenido puede tener múltiples reseñas.</li>
            <li><strong>Usuarios (N) ↔ Contenidos (M):</strong> Relación muchos a muchos a través de la tabla `seguimiento_contenido`.</li>
            <li><strong>Contenidos (N) ↔ Plataformas (M):</strong> Relación muchos a muchos a través de la tabla `contenido_plataforma`.</li>
            <li><strong>Listas (N) ↔ Contenidos (M):</strong> Relación muchos a muchos a través de la tabla `lista_contenido`.</li>
            <li><strong>Contenidos (N) ↔ Géneros (M):</strong> Relación muchos a muchos a través de la tabla `contenido_genero`.</li>
            <li><strong>Usuarios (N) ↔ Listas (M):</strong> Relación muchos a muchos a través de la tabla `seguidores_listas`.</li>
          </ul>

          <h3 className="text-xl font-semibold mb-2 text-blue-500 dark:text-blue-400">Tablas Intermedias (Junction Tables)</h3>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-200">
            <li><strong>`grupo_usuario`:</strong> Gestiona la membresía de usuarios en grupos, incluyendo roles y fechas de unión.</li>
            <li><strong>`seguimiento_contenido`:</strong> Registra el progreso y estado de los contenidos que los usuarios están siguiendo.</li>
            <li><strong>`contenido_plataforma`:</strong> Asocia contenidos con las plataformas donde están disponibles.</li>
            <li><strong>`lista_contenido`:</strong> Vincula contenidos a listas con un orden específico.</li>
            <li><strong>`contenido_genero`:</strong> Clasifica los contenidos por géneros.</li>
            <li><strong>`seguidores_listas`:</strong> Registra qué usuarios siguen qué listas.</li>
          </ul>
        </div>
      </section>


      <section>
        <h2 className="text-2xl font-semibold mb-4 text-blue-600 dark:text-blue-300">2. Normalización de la Base de Datos</h2>


        <div className="space-y-8">
          <h3 className="text-xl font-semibold mb-2 text-blue-500 dark:text-blue-400">Primera Forma Normal (1FN)</h3>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-200">
            <li>Todas las tablas tienen una clave primaria única (ID_Usuario, ID_Grupo, ID_Contenido, etc.).</li>
            <li>No hay grupos repetitivos en ninguna columna.</li>
            <li>Los valores en cada columna son atómicos (no divisibles). Por ejemplo:
              <ul className="list-disc list-inside ml-6 mt-2">
                <li>En `usuarios`, el nombre y apellido están separados en `NombreUsuario` y `NombreCompleto`.</li>
                <li>En `contenidos`, la fecha de lanzamiento está en una columna separada (`Ano`).</li>
                <li>Las relaciones muchos a muchos están correctamente separadas en tablas intermedias.</li>
              </ul>
            </li>
          </ul>

          <h3 className="text-xl font-semibold mb-2 text-blue-500 dark:text-blue-400">Segunda Forma Normal (2FN)</h3>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-200">
            <li>La base de datos cumple con 1FN.</li>
            <li>Todos los atributos no clave dependen completamente de la clave primaria. Por ejemplo:
              <ul className="list-disc list-inside ml-6 mt-2">
                <li>En `resenas`, todos los campos (Puntuacion, Comentario, FechaPublicacion) dependen completamente de ID_Resena.</li>
                <li>En `grupo_usuario`, los campos FechaUnion y Rol dependen completamente de la combinación de ID_Grupo y ID_Usuario.</li>
                <li>Las tablas intermedias como `contenido_plataforma` y `contenido_genero` solo contienen claves foráneas que dependen completamente de sus claves primarias compuestas.</li>
              </ul>
            </li>
          </ul>

          <h3 className="text-xl font-semibold mb-2 text-blue-500 dark:text-blue-400">Tercera Forma Normal (3FN)</h3>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-200">
            <li>La base de datos cumple con 2FN.</li>
            <li>No hay dependencias transitivas entre atributos no clave. Por ejemplo:
              <ul className="list-disc list-inside ml-6 mt-2">
                <li>En `usuarios`, los campos como NombreUsuario, Email, y FechaNacimiento dependen directamente de ID_Usuario, no de otros atributos no clave.</li>
                <li>En `contenidos`, los campos como Titulo, Tipo, y Ano dependen directamente de ID_Contenido.</li>
                <li>Las relaciones muchos a muchos están correctamente normalizadas en tablas separadas, evitando dependencias transitivas.</li>
              </ul>
            </li>
            <li>Las tablas intermedias (como `grupo_usuario`, `seguimiento_contenido`) solo contienen:
              <ul className="list-disc list-inside ml-6 mt-2">
                <li>Claves primarias</li>
                <li>Claves foráneas</li>
                <li>Atributos que dependen directamente de la clave primaria compuesta</li>
              </ul>
            </li>
          </ul>

          <h3 className="text-xl font-semibold mb-2 text-blue-500 dark:text-blue-400">Beneficios de la Normalización</h3>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-200">
            <li><strong>Integridad de Datos:</strong> La estructura normalizada garantiza que los datos sean consistentes y no haya anomalías en las operaciones de inserción, actualización o eliminación.</li>
            <li><strong>Eliminación de Redundancia:</strong> Los datos no se repiten innecesariamente, lo que reduce el espacio de almacenamiento y previene inconsistencias.</li>
            <li><strong>Flexibilidad en Consultas:</strong> La estructura normalizada permite realizar consultas complejas de manera eficiente.</li>
            <li><strong>Mantenibilidad:</strong> La separación clara de responsabilidades facilita el mantenimiento y la evolución de la base de datos.</li>
          </ul>
        </div>
      </section>


      <section>
        <h2 className="text-2xl font-semibold mb-4 text-blue-600 dark:text-blue-300">2. Estructura de Tablas</h2>


        <div className="space-y-8">
          <h3 className="text-xl font-semibold mb-2 text-blue-500 dark:text-blue-400">Tabla: `grupos`</h3>
          <ul className="list-disc list-inside mb-4 text-gray-700 dark:text-gray-200">
            <li>`ID_Grupo` (INT): Clave primaria, identificador único del grupo.</li>
            <li>`Nombre` (VARCHAR): Nombre del grupo.</li>
            <li>`Descripcion` (TEXT): Descripción del grupo.</li>
            <li>`ID_Creador` (INT): Clave foránea a `usuarios.ID_Usuario`, indica quién creó el grupo.</li>
            <li>`FechaCreacion` (DATETIME): Fecha y hora de creación del grupo.</li>
            <li>`IconoURL` (VARCHAR): URL del ícono del grupo.</li>
            <li>`Reglas` (TEXT): Reglas del grupo.</li>
            <li>`Privacidad` (ENUM): Visibilidad del grupo (público/privado).</li>
            <li>`Miembros` (INT): Cantidad de miembros en el grupo.</li>
          </ul>

          <h3 className="text-xl font-semibold mb-2 text-blue-500 dark:text-blue-400">Tabla: `usuarios`</h3>
          <ul className="list-disc list-inside mb-4 text-gray-700 dark:text-gray-200">
            <li>`ID_Usuario` (INT): Clave primaria, identificador único del usuario.</li>
            <li>`NombreUsuario` (VARCHAR): Nombre de usuario único.</li>
            <li>`NombreCompleto` (VARCHAR): Nombre completo del usuario.</li>
            <li>`Email` (VARCHAR): Correo electrónico del usuario.</li>
            <li>`FechaNacimiento` (DATE): Fecha de nacimiento del usuario.</li>
            <li>`Biografia` (TEXT): Biografía del usuario.</li>
            <li>`Pais` (VARCHAR): País del usuario.</li>
            <li>`FechaRegistro` (DATETIME): Fecha de registro del usuario.</li>
            <li>`Estado` (ENUM): Estado de la cuenta del usuario.</li>
            <li>`Privacidad` (ENUM): Configuración de privacidad del usuario.</li>
          </ul>

          <h3 className="text-xl font-semibold mb-2 text-blue-500 dark:text-blue-400">Tabla: `grupo_usuario` (Tabla Intermedia)</h3>
          <ul className="list-disc list-inside mb-4 text-gray-700 dark:text-gray-200">
            <li>`ID_Grupo_Usuario` (INT): Clave primaria, identificador único de la relación.</li>
            <li>`ID_Grupo` (INT): Clave foránea a `grupos.ID_Grupo`, indica a qué grupo pertenece la membresía.</li>
            <li>`ID_Usuario` (INT): Clave foránea a `usuarios.ID_Usuario`, indica a qué usuario pertenece la membresía.</li>
            <li>`FechaUnion` (DATETIME): Fecha en que el usuario se unió al grupo.</li>
            <li>`Rol` (ENUM): Rol del usuario dentro del grupo (ej. 'miembro', 'administrador').</li>
            <li>`Notificaciones` (TINYINT): Indicador de si el usuario recibe notificaciones del grupo (0 o 1).</li>
          </ul>

          <h3 className="text-xl font-semibold mb-2 text-blue-500 dark:text-blue-400">Tabla: `resenas`</h3>
          <ul className="list-disc list-inside mb-4 text-gray-700 dark:text-gray-200">
            <li>`ID_Resena` (INT): Clave primaria, identificador único de la reseña.</li>
            <li>`ID_Contenido` (INT): Clave foránea a `contenidos.ID_Contenido`, el contenido al que se refiere la reseña.</li>
            <li>`ID_Usuario` (INT): Clave foránea a `usuarios.ID_Usuario`, el usuario que escribió la reseña.</li>
            <li>`Puntuacion` (INT): Puntuación dada al contenido (ej. 1-10).</li>
            <li>`Comentario` (TEXT): Comentario de la reseña.</li>
            <li>`FechaPublicacion` (DATETIME): Fecha y hora de publicación de la reseña.</li>
          </ul>

          <h3 className="text-xl font-semibold mb-2 text-blue-500 dark:text-blue-400">Tabla: `contenidos`</h3>
          <ul className="list-disc list-inside mb-4 text-gray-700 dark:text-gray-200">
            <li>`ID_Contenido` (INT): Clave primaria, identificador único del contenido.</li>
            <li>`Titulo` (VARCHAR): Título del contenido.</li>
            <li>`Tipo` (ENUM): Tipo de contenido (ej. 'pelicula', 'serie', 'juego').</li>
            <li>`Ano` (INT): Año de lanzamiento/publicación.</li>
            <li>`Clasificacion` (VARCHAR): Clasificación por edad/género.</li>
            <li>`Popularidad` (INT): Nivel de popularidad del contenido.</li>
          </ul>

          <h3 className="text-xl font-semibold mb-2 text-blue-500 dark:text-blue-400">Tabla: `seguimiento_contenido` (Tabla Intermedia)</h3>
          <ul className="list-disc list-inside mb-4 text-gray-700 dark:text-gray-200">
            <li>`ID_Seguimiento` (INT): Clave primaria.</li>
            <li>`ID_Usuario` (INT): Clave foránea a `usuarios.ID_Usuario`.</li>
            <li>`ID_Contenido` (INT): Clave foránea a `contenidos.ID_Contenido`.</li>
            <li>`Estado` (ENUM): Estado del seguimiento (ej. 'viendo', 'completado').</li>
            <li>`Progreso` (VARCHAR): Progreso específico (ej. número de episodios, páginas).</li>
            <li>`FechaInicio` (DATETIME): Fecha de inicio del seguimiento.</li>
            <li>`FechaFin` (DATETIME): Fecha de finalización del seguimiento.</li>
            <li>`Puntuacion` (INT): Puntuación personal del usuario para este seguimiento.</li>
            <li>`Notas` (TEXT): Notas adicionales del usuario sobre el seguimiento.</li>
          </ul>

          <h3 className="text-xl font-semibold mb-2 text-blue-500 dark:text-blue-400">Tabla: `contenido_plataforma` (Tabla Intermedia)</h3>
          <ul className="list-disc list-inside mb-4 text-gray-700 dark:text-gray-200">
            <li>`ID_Contenido_Plataforma` (INT): Clave primaria.</li>
            <li>`ID_Contenido` (INT): Clave foránea a `contenidos.ID_Contenido`.</li>
            <li>`ID_Plataforma` (INT): Clave foránea a `plataformas.ID_Plataforma`.</li>
          </ul>

          <h3 className="text-xl font-semibold mb-2 text-blue-500 dark:text-blue-400">Tabla: `lista_contenido` (Tabla Intermedia)</h3>
          <ul className="list-disc list-inside mb-4 text-gray-700 dark:text-gray-200">
            <li>`ID_Lista_Contenido` (INT): Clave primaria.</li>
            <li>`ID_Lista` (INT): Clave foránea a `listas.ID_Lista`.</li>
            <li>`ID_Contenido` (INT): Clave foránea a `contenidos.ID_Contenido`.</li>
            <li>`Orden` (INT): El orden del contenido dentro de la lista.</li>
          </ul>

          <h3 className="text-xl font-semibold mb-2 text-blue-500 dark:text-blue-400">Tabla: `contenido_genero` (Tabla Intermedia)</h3>
          <ul className="list-disc list-inside mb-4 text-gray-700 dark:text-gray-200">
            <li>`ID_Contenido_Genero` (INT): Clave primaria.</li>
            <li>`ID_Contenido` (INT): Clave foránea a `contenidos.ID_Contenido`.</li>
            <li>`ID_Genero` (INT): Clave foránea a `generos.ID_Genero`.</li>
          </ul>

          <h3 className="text-xl font-semibold mb-2 text-blue-500 dark:text-blue-400">Tabla: `seguidores_listas` (Tabla Intermedia)</h3>
          <ul className="list-disc list-inside mb-4 text-gray-700 dark:text-gray-200">
            <li>`ID_Seguidor_Lista` (INT): Clave primaria.</li>
            <li>`ID_Lista` (INT): Clave foránea a `listas.ID_Lista`.</li>
            <li>`ID_Usuario` (INT): Clave foránea a `usuarios.ID_Usuario`.</li>
          </ul>
        </div>
      </section>

      {/* Sección 3: Modelos y Diagramas */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-blue-600 dark:text-blue-300">3. Modelos y Diagramas</h2>
        <p className="mb-4 text-gray-700 dark:text-gray-200">
          Aquí encontrarás diagramas visuales que representan la estructura de las tablas y sus relaciones.
        </p>

        <div className="space-y-12">
          <div>
            <h3 className="text-xl font-semibold mb-2 text-blue-500 dark:text-blue-400">Modelo de Grupos y Usuarios</h3>
            <p className="mb-4 text-gray-700 dark:text-gray-200">
              Este modelo describe la relación entre los grupos de usuarios y los usuarios individuales, utilizando una tabla intermedia para gestionar la membresía y roles dentro de cada grupo.
            </p>
            <div className="mb-6">
              <Image src="/grupo_usuario.jpeg" alt="Diagrama de relación Grupos-Usuario" width={800} height={400} layout="responsive" className="rounded-lg shadow-md" />
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2 text-blue-500 dark:text-blue-400">Modelo de Usuarios</h3>
            <p className="mb-4 text-gray-700 dark:text-gray-200">
              Esta sección detalla la estructura y campos de la tabla de usuarios.
            </p>
            <div className="mb-6">
              <Image src="/En donde esta usuarios.jpeg" alt="Diagrama de la tabla Usuarios" width={800} height={400} layout="responsive" className="rounded-lg shadow-md" />
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2 text-blue-500 dark:text-blue-400">Modelo de Reseñas</h3>
            <p className="mb-4 text-gray-700 dark:text-gray-200">
              Este diagrama muestra cómo se relacionan las reseñas con los contenidos y los usuarios.
            </p>
            <div className="mb-6">
              <Image src="/En donde esta reseñas.jpeg" alt="Diagrama de relación Reseñas-Contenidos-Usuario" width={800} height={400} layout="responsive" className="rounded-lg shadow-md" />
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2 text-blue-500 dark:text-blue-400">Modelo de Contenidos</h3>
            <p className="mb-4 text-gray-700 dark:text-gray-200">
              Este diagrama presenta la estructura de los contenidos en la plataforma.
            </p>
            <div className="mb-6">
              <Image src="/En donde esta contenidos.jpeg" alt="Diagrama de la tabla Contenidos" width={800} height={400} layout="responsive" className="rounded-lg shadow-md" />
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2 text-blue-500 dark:text-blue-400">Modelo de Seguimiento de Contenido</h3>
            <p className="mb-4 text-gray-700 dark:text-gray-200">
              Esta tabla intermedia registra el progreso y estado de los contenidos que los usuarios están siguiendo.
            </p>
            <div className="mb-6">
              <Image src="/Seguimiendo_contenido.jpeg" alt="Diagrama de relación Seguimiento de Contenido" width={800} height={400} layout="responsive" className="rounded-lg shadow-md" />
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2 text-blue-500 dark:text-blue-400">Modelo Contenido-Plataforma</h3>
            <p className="mb-4 text-gray-700 dark:text-gray-200">
              Esta tabla intermedia asocia contenidos con las plataformas donde están disponibles.
            </p>
            <div className="mb-6">
              <Image src="/Contenido_plataforma.jpeg" alt="Diagrama de relación Contenido-Plataforma" width={800} height={400} layout="responsive" className="rounded-lg shadow-md" />
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2 text-blue-500 dark:text-blue-400">Modelo Lista-Contenido</h3>
            <p className="mb-4 text-gray-700 dark:text-gray-200">
              Esta tabla intermedia vincula contenidos específicos a diferentes listas creadas por los usuarios.
            </p>
            <div className="mb-6">
              <Image src="/lista_contenido.jpeg" alt="Diagrama de relación Lista-Contenido" width={800} height={400} layout="responsive" className="rounded-lg shadow-md" />
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2 text-blue-500 dark:text-blue-400">Modelo Contenido-Género</h3>
            <p className="mb-4 text-gray-700 dark:text-gray-200">
              Esta tabla intermedia clasifica los contenidos por uno o varios géneros.
            </p>
            <div className="mb-6">
              <Image src="/Contenido_genero.jpeg" alt="Diagrama de relación Contenido-Género" width={800} height={400} layout="responsive" className="rounded-lg shadow-md" />
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2 text-blue-500 dark:text-blue-400">Modelo Seguidores de Lista</h3>
            <p className="mb-4 text-gray-700 dark:text-gray-200">
              Esta tabla intermedia registra qué usuarios están siguiendo qué listas.
            </p>
            <div className="mb-6">
              <Image src="/Seguidores_lista.jpeg" alt="Diagrama de relación Seguidores de Lista" width={800} height={400} layout="responsive" className="rounded-lg shadow-md" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
