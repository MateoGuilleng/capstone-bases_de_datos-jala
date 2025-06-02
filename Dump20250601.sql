-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: plataforma_resenas
-- ------------------------------------------------------
-- Server version	8.0.42

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comentarios_resenas`
--

DROP TABLE IF EXISTS `comentarios_resenas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comentarios_resenas` (
  `ID_Comentario` int NOT NULL AUTO_INCREMENT,
  `ID_Resena` int NOT NULL,
  `ID_Usuario` int NOT NULL,
  `Comentario` text NOT NULL,
  `Fecha` datetime DEFAULT CURRENT_TIMESTAMP,
  `RespuestaA` int DEFAULT NULL,
  PRIMARY KEY (`ID_Comentario`),
  KEY `ID_Resena` (`ID_Resena`),
  KEY `ID_Usuario` (`ID_Usuario`),
  KEY `RespuestaA` (`RespuestaA`),
  CONSTRAINT `comentarios_resenas_ibfk_1` FOREIGN KEY (`ID_Resena`) REFERENCES `resenas` (`ID_Resena`),
  CONSTRAINT `comentarios_resenas_ibfk_2` FOREIGN KEY (`ID_Usuario`) REFERENCES `usuarios` (`ID_Usuario`),
  CONSTRAINT `comentarios_resenas_ibfk_3` FOREIGN KEY (`RespuestaA`) REFERENCES `comentarios_resenas` (`ID_Comentario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comentarios_resenas`
--

LOCK TABLES `comentarios_resenas` WRITE;
/*!40000 ALTER TABLE `comentarios_resenas` DISABLE KEYS */;
/*!40000 ALTER TABLE `comentarios_resenas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contenido_genero`
--

DROP TABLE IF EXISTS `contenido_genero`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contenido_genero` (
  `ID_Contenido_Genero` int NOT NULL AUTO_INCREMENT,
  `ID_Contenido` int NOT NULL,
  `ID_Genero` int NOT NULL,
  PRIMARY KEY (`ID_Contenido_Genero`),
  UNIQUE KEY `ID_Contenido` (`ID_Contenido`,`ID_Genero`),
  KEY `ID_Genero` (`ID_Genero`),
  CONSTRAINT `contenido_genero_ibfk_1` FOREIGN KEY (`ID_Contenido`) REFERENCES `contenidos` (`ID_Contenido`),
  CONSTRAINT `contenido_genero_ibfk_2` FOREIGN KEY (`ID_Genero`) REFERENCES `generos` (`ID_Genero`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contenido_genero`
--

LOCK TABLES `contenido_genero` WRITE;
/*!40000 ALTER TABLE `contenido_genero` DISABLE KEYS */;
INSERT INTO `contenido_genero` VALUES (1,1,1),(2,2,1),(3,3,2),(4,3,4),(5,4,4),(6,5,1);
/*!40000 ALTER TABLE `contenido_genero` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contenido_persona`
--

DROP TABLE IF EXISTS `contenido_persona`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contenido_persona` (
  `ID_Contenido_Persona` int NOT NULL AUTO_INCREMENT,
  `ID_Contenido` int NOT NULL,
  `ID_Persona` int NOT NULL,
  `Rol` enum('actor','director','productor','guionista','diseñador','escritor') NOT NULL,
  `Personaje` varchar(100) DEFAULT NULL,
  `OrdenImportancia` int DEFAULT NULL,
  PRIMARY KEY (`ID_Contenido_Persona`),
  KEY `ID_Contenido` (`ID_Contenido`),
  KEY `ID_Persona` (`ID_Persona`),
  CONSTRAINT `contenido_persona_ibfk_1` FOREIGN KEY (`ID_Contenido`) REFERENCES `contenidos` (`ID_Contenido`),
  CONSTRAINT `contenido_persona_ibfk_2` FOREIGN KEY (`ID_Persona`) REFERENCES `personas` (`ID_Persona`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contenido_persona`
--

LOCK TABLES `contenido_persona` WRITE;
/*!40000 ALTER TABLE `contenido_persona` DISABLE KEYS */;
INSERT INTO `contenido_persona` VALUES (1,1,1,'director',NULL,1),(2,2,2,'diseñador',NULL,1),(3,3,3,'actor','Nancy Wheeler',2),(4,4,4,'escritor',NULL,1),(5,5,5,'guionista',NULL,1);
/*!40000 ALTER TABLE `contenido_persona` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contenido_plataforma`
--

DROP TABLE IF EXISTS `contenido_plataforma`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contenido_plataforma` (
  `ID_Contenido_Plataforma` int NOT NULL AUTO_INCREMENT,
  `ID_Contenido` int NOT NULL,
  `ID_Plataforma` int NOT NULL,
  `Tipo` enum('streaming','alquiler','compra','suscripcion') NOT NULL,
  `EnlaceDirecto` varchar(255) DEFAULT NULL,
  `Precio` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`ID_Contenido_Plataforma`),
  KEY `ID_Contenido` (`ID_Contenido`),
  KEY `ID_Plataforma` (`ID_Plataforma`),
  CONSTRAINT `contenido_plataforma_ibfk_1` FOREIGN KEY (`ID_Contenido`) REFERENCES `contenidos` (`ID_Contenido`),
  CONSTRAINT `contenido_plataforma_ibfk_2` FOREIGN KEY (`ID_Plataforma`) REFERENCES `plataformas` (`ID_Plataforma`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contenido_plataforma`
--

LOCK TABLES `contenido_plataforma` WRITE;
/*!40000 ALTER TABLE `contenido_plataforma` DISABLE KEYS */;
INSERT INTO `contenido_plataforma` VALUES (1,1,1,'suscripcion','https://netflix.com/interstellar',NULL),(2,2,3,'compra','https://store.steampowered.com/app/deathstranding',39.99),(3,3,1,'suscripcion','https://netflix.com/strangerthings',NULL),(4,4,2,'alquiler','https://hbomax.com/it',3.99),(5,5,4,'suscripcion','https://spotify.com/futuristcast',NULL);
/*!40000 ALTER TABLE `contenido_plataforma` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contenidos`
--

DROP TABLE IF EXISTS `contenidos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contenidos` (
  `ID_Contenido` int NOT NULL AUTO_INCREMENT,
  `Titulo` varchar(100) NOT NULL,
  `TituloOriginal` varchar(100) DEFAULT NULL,
  `Sinopsis` text,
  `Ano` int DEFAULT NULL,
  `Tipo` enum('pelicula','serie','anime','juego','libro','podcast') NOT NULL,
  `Duracion` int DEFAULT NULL,
  `Episodios` int DEFAULT NULL,
  `Temporadas` int DEFAULT NULL,
  `Plataforma` varchar(100) DEFAULT NULL,
  `Estudio` varchar(100) DEFAULT NULL,
  `Clasificacion` varchar(20) DEFAULT NULL,
  `PortadaURL` varchar(255) DEFAULT NULL,
  `TrailerURL` varchar(255) DEFAULT NULL,
  `Estado` enum('anunciado','en_emision','finalizado','cancelado') DEFAULT NULL,
  `FechaAgregado` datetime DEFAULT CURRENT_TIMESTAMP,
  `Popularidad` int DEFAULT '0',
  PRIMARY KEY (`ID_Contenido`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contenidos`
--

LOCK TABLES `contenidos` WRITE;
/*!40000 ALTER TABLE `contenidos` DISABLE KEYS */;
INSERT INTO `contenidos` VALUES (1,'Interstellar','Interstellar','Un grupo de astronautas busca un nuevo hogar para la humanidad.',2014,'pelicula',169,NULL,NULL,NULL,'Paramount','PG-13','https://portadas.com/interstellar.jpg','https://youtube.com/trailer1','finalizado','2025-05-31 14:44:50',95),(2,'Death Stranding','Death Stranding','Un repartidor debe conectar ciudades aisladas en un mundo postapocalíptico.',2019,'juego',50,NULL,NULL,'Steam','Kojima Productions','M','https://portadas.com/deathstranding.jpg','https://youtube.com/trailer2','finalizado','2025-05-31 14:44:50',80),(3,'Stranger Things','Stranger Things','Un grupo de niños enfrenta criaturas sobrenaturales en los 80s.',2016,'serie',50,34,4,NULL,'Netflix','TV-14','https://portadas.com/strangerthings.jpg','https://youtube.com/trailer3','en_emision','2025-05-31 14:44:50',98),(4,'It','It','Un grupo de niños lucha contra una entidad maligna disfrazada de payaso.',2017,'pelicula',135,NULL,NULL,NULL,'Warner Bros','R','https://portadas.com/it.jpg','https://youtube.com/trailer4','finalizado','2025-05-31 14:44:50',90),(5,'Podcast Futurista','Futurist Cast','Debates semanales sobre avances tecnológicos del futuro.',2023,'podcast',60,NULL,NULL,NULL,'AudioVision','NR','https://portadas.com/futurocast.jpg','https://youtube.com/trailer5','en_emision','2025-05-31 14:44:50',40);
/*!40000 ALTER TABLE `contenidos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `generos`
--

DROP TABLE IF EXISTS `generos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `generos` (
  `ID_Genero` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(50) NOT NULL,
  `Descripcion` text,
  `IconoURL` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID_Genero`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `generos`
--

LOCK TABLES `generos` WRITE;
/*!40000 ALTER TABLE `generos` DISABLE KEYS */;
INSERT INTO `generos` VALUES (1,'Ciencia Ficción','Historias sobre futuros, tecnología o mundos alternativos.','https://icons.com/sci-fi.png'),(2,'Drama','Relatos intensos y emocionales sobre la vida.','https://icons.com/drama.png'),(3,'Aventura','Viajes, exploraciones y desafíos épicos.','https://icons.com/aventura.png'),(4,'Terror','Obras diseñadas para asustar y estremecer.','https://icons.com/terror.png'),(5,'Comedia','Historias humorísticas y entretenidas.','https://icons.com/comedia.png');
/*!40000 ALTER TABLE `generos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `grupo_usuario`
--

DROP TABLE IF EXISTS `grupo_usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `grupo_usuario` (
  `ID_Grupo_Usuario` int NOT NULL AUTO_INCREMENT,
  `ID_Grupo` int NOT NULL,
  `ID_Usuario` int NOT NULL,
  `FechaUnion` datetime DEFAULT CURRENT_TIMESTAMP,
  `Rol` enum('admin','moderador','miembro') DEFAULT 'miembro',
  `Notificaciones` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`ID_Grupo_Usuario`),
  UNIQUE KEY `ID_Grupo` (`ID_Grupo`,`ID_Usuario`),
  KEY `ID_Usuario` (`ID_Usuario`),
  CONSTRAINT `grupo_usuario_ibfk_1` FOREIGN KEY (`ID_Grupo`) REFERENCES `grupos` (`ID_Grupo`),
  CONSTRAINT `grupo_usuario_ibfk_2` FOREIGN KEY (`ID_Usuario`) REFERENCES `usuarios` (`ID_Usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `grupo_usuario`
--

LOCK TABLES `grupo_usuario` WRITE;
/*!40000 ALTER TABLE `grupo_usuario` DISABLE KEYS */;
/*!40000 ALTER TABLE `grupo_usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `grupos`
--

DROP TABLE IF EXISTS `grupos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `grupos` (
  `ID_Grupo` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(100) NOT NULL,
  `Descripcion` text,
  `ID_Creador` int NOT NULL,
  `FechaCreacion` datetime DEFAULT CURRENT_TIMESTAMP,
  `IconoURL` varchar(255) DEFAULT NULL,
  `Reglas` text,
  `Privacidad` enum('publico','privado','oculto') DEFAULT 'publico',
  `Miembros` int DEFAULT '1',
  PRIMARY KEY (`ID_Grupo`),
  KEY `ID_Creador` (`ID_Creador`),
  CONSTRAINT `grupos_ibfk_1` FOREIGN KEY (`ID_Creador`) REFERENCES `usuarios` (`ID_Usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `grupos`
--

LOCK TABLES `grupos` WRITE;
/*!40000 ALTER TABLE `grupos` DISABLE KEYS */;
/*!40000 ALTER TABLE `grupos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lista_contenido`
--

DROP TABLE IF EXISTS `lista_contenido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lista_contenido` (
  `ID_Lista_Contenido` int NOT NULL AUTO_INCREMENT,
  `ID_Lista` int NOT NULL,
  `ID_Contenido` int NOT NULL,
  `Orden` int DEFAULT NULL,
  `FechaAgregado` datetime DEFAULT CURRENT_TIMESTAMP,
  `Comentario` text,
  PRIMARY KEY (`ID_Lista_Contenido`),
  KEY `ID_Lista` (`ID_Lista`),
  KEY `ID_Contenido` (`ID_Contenido`),
  CONSTRAINT `lista_contenido_ibfk_1` FOREIGN KEY (`ID_Lista`) REFERENCES `listas` (`ID_Lista`),
  CONSTRAINT `lista_contenido_ibfk_2` FOREIGN KEY (`ID_Contenido`) REFERENCES `contenidos` (`ID_Contenido`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lista_contenido`
--

LOCK TABLES `lista_contenido` WRITE;
/*!40000 ALTER TABLE `lista_contenido` DISABLE KEYS */;
/*!40000 ALTER TABLE `lista_contenido` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `listas`
--

DROP TABLE IF EXISTS `listas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `listas` (
  `ID_Lista` int NOT NULL AUTO_INCREMENT,
  `ID_Usuario` int NOT NULL,
  `Titulo` varchar(100) NOT NULL,
  `Descripcion` text,
  `FechaCreacion` datetime DEFAULT CURRENT_TIMESTAMP,
  `FechaModificacion` datetime DEFAULT NULL,
  `Visibilidad` enum('publico','privado','solo_seguidores') DEFAULT 'publico',
  `Tipo` enum('favoritos','por_ver','recomendacion','personalizada') NOT NULL,
  `PortadaURL` varchar(255) DEFAULT NULL,
  `NumElementos` int DEFAULT '0',
  `Seguidores` int DEFAULT '0',
  PRIMARY KEY (`ID_Lista`),
  KEY `ID_Usuario` (`ID_Usuario`),
  CONSTRAINT `listas_ibfk_1` FOREIGN KEY (`ID_Usuario`) REFERENCES `usuarios` (`ID_Usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `listas`
--

LOCK TABLES `listas` WRITE;
/*!40000 ALTER TABLE `listas` DISABLE KEYS */;
/*!40000 ALTER TABLE `listas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notificaciones`
--

DROP TABLE IF EXISTS `notificaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notificaciones` (
  `ID_Notificacion` int NOT NULL AUTO_INCREMENT,
  `ID_Usuario_Destino` int NOT NULL,
  `ID_Usuario_Origen` int DEFAULT NULL,
  `Tipo` varchar(50) NOT NULL,
  `ID_Contenido_Relacionado` int DEFAULT NULL,
  `ID_Resena_Relacionada` int DEFAULT NULL,
  `Mensaje` text NOT NULL,
  `Fecha` datetime DEFAULT CURRENT_TIMESTAMP,
  `Leida` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`ID_Notificacion`),
  KEY `ID_Usuario_Destino` (`ID_Usuario_Destino`),
  KEY `ID_Usuario_Origen` (`ID_Usuario_Origen`),
  KEY `ID_Contenido_Relacionado` (`ID_Contenido_Relacionado`),
  KEY `ID_Resena_Relacionada` (`ID_Resena_Relacionada`),
  CONSTRAINT `notificaciones_ibfk_1` FOREIGN KEY (`ID_Usuario_Destino`) REFERENCES `usuarios` (`ID_Usuario`),
  CONSTRAINT `notificaciones_ibfk_2` FOREIGN KEY (`ID_Usuario_Origen`) REFERENCES `usuarios` (`ID_Usuario`),
  CONSTRAINT `notificaciones_ibfk_3` FOREIGN KEY (`ID_Contenido_Relacionado`) REFERENCES `contenidos` (`ID_Contenido`),
  CONSTRAINT `notificaciones_ibfk_4` FOREIGN KEY (`ID_Resena_Relacionada`) REFERENCES `resenas` (`ID_Resena`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notificaciones`
--

LOCK TABLES `notificaciones` WRITE;
/*!40000 ALTER TABLE `notificaciones` DISABLE KEYS */;
/*!40000 ALTER TABLE `notificaciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personas`
--

DROP TABLE IF EXISTS `personas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personas` (
  `ID_Persona` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(100) NOT NULL,
  `FechaNacimiento` date DEFAULT NULL,
  `Nacionalidad` varchar(50) DEFAULT NULL,
  `Biografia` text,
  `FotoURL` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID_Persona`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personas`
--

LOCK TABLES `personas` WRITE;
/*!40000 ALTER TABLE `personas` DISABLE KEYS */;
INSERT INTO `personas` VALUES (1,'Christopher Nolan','1970-07-30','Británica','Director de cine conocido por películas como Inception y Interstellar.','https://personas.com/nolan.jpg'),(2,'Hideo Kojima','1963-08-24','Japonesa','Diseñador de videojuegos famoso por Metal Gear y Death Stranding.','https://personas.com/kojima.jpg'),(3,'Emma Stone','1988-11-06','Estadounidense','Actriz ganadora del Oscar, conocida por La La Land.','https://personas.com/emma.jpg'),(4,'Stephen King','1947-09-21','Estadounidense','Autor de novelas de terror y suspenso.','https://personas.com/king.jpg'),(5,'Greta Gerwig','1983-08-04','Estadounidense','Directora de cine y actriz.','https://personas.com/greta.jpg');
/*!40000 ALTER TABLE `personas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plataformas`
--

DROP TABLE IF EXISTS `plataformas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `plataformas` (
  `ID_Plataforma` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(50) NOT NULL,
  `LogoURL` varchar(255) DEFAULT NULL,
  `Enlace` varchar(255) DEFAULT NULL,
  `Paises` text,
  PRIMARY KEY (`ID_Plataforma`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plataformas`
--

LOCK TABLES `plataformas` WRITE;
/*!40000 ALTER TABLE `plataformas` DISABLE KEYS */;
INSERT INTO `plataformas` VALUES (1,'Netflix','https://logos.com/netflix.png','https://www.netflix.com','Global'),(2,'HBO Max','https://logos.com/hbo.png','https://www.hbomax.com','EEUU, LATAM, Europa'),(3,'Steam','https://logos.com/steam.png','https://store.steampowered.com','Global'),(4,'Spotify','https://logos.com/spotify.png','https://www.spotify.com','Global'),(5,'Amazon Prime','https://logos.com/prime.png','https://www.primevideo.com','Global');
/*!40000 ALTER TABLE `plataformas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reacciones_resenas`
--

DROP TABLE IF EXISTS `reacciones_resenas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reacciones_resenas` (
  `ID_Reaccion` int NOT NULL AUTO_INCREMENT,
  `ID_Usuario` int NOT NULL,
  `ID_Resena` int NOT NULL,
  `Tipo` enum('like','util','divertida','creativa') DEFAULT 'like',
  `Fecha` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID_Reaccion`),
  UNIQUE KEY `ID_Usuario` (`ID_Usuario`,`ID_Resena`),
  KEY `ID_Resena` (`ID_Resena`),
  CONSTRAINT `reacciones_resenas_ibfk_1` FOREIGN KEY (`ID_Usuario`) REFERENCES `usuarios` (`ID_Usuario`),
  CONSTRAINT `reacciones_resenas_ibfk_2` FOREIGN KEY (`ID_Resena`) REFERENCES `resenas` (`ID_Resena`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reacciones_resenas`
--

LOCK TABLES `reacciones_resenas` WRITE;
/*!40000 ALTER TABLE `reacciones_resenas` DISABLE KEYS */;
/*!40000 ALTER TABLE `reacciones_resenas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recomendaciones`
--

DROP TABLE IF EXISTS `recomendaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recomendaciones` (
  `ID_Recomendacion` int NOT NULL AUTO_INCREMENT,
  `ID_Usuario` int NOT NULL,
  `ID_Contenido` int NOT NULL,
  `Origen` varchar(100) NOT NULL,
  `Fecha` datetime DEFAULT CURRENT_TIMESTAMP,
  `Visto` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`ID_Recomendacion`),
  KEY `ID_Usuario` (`ID_Usuario`),
  KEY `ID_Contenido` (`ID_Contenido`),
  CONSTRAINT `recomendaciones_ibfk_1` FOREIGN KEY (`ID_Usuario`) REFERENCES `usuarios` (`ID_Usuario`),
  CONSTRAINT `recomendaciones_ibfk_2` FOREIGN KEY (`ID_Contenido`) REFERENCES `contenidos` (`ID_Contenido`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recomendaciones`
--

LOCK TABLES `recomendaciones` WRITE;
/*!40000 ALTER TABLE `recomendaciones` DISABLE KEYS */;
/*!40000 ALTER TABLE `recomendaciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `resenas`
--

DROP TABLE IF EXISTS `resenas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `resenas` (
  `ID_Resena` int NOT NULL AUTO_INCREMENT,
  `ID_Contenido` int NOT NULL,
  `ID_Usuario` int NOT NULL,
  `Comentario` text NOT NULL,
  `Puntuacion` int NOT NULL,
  `FechaPublicacion` datetime DEFAULT CURRENT_TIMESTAMP,
  `FechaEdicion` datetime DEFAULT NULL,
  `Likes` int DEFAULT '0',
  `Estado` enum('visible','oculta','eliminada') DEFAULT 'visible',
  `Spoiler` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`ID_Resena`),
  KEY `ID_Contenido` (`ID_Contenido`),
  KEY `ID_Usuario` (`ID_Usuario`),
  CONSTRAINT `resenas_ibfk_1` FOREIGN KEY (`ID_Contenido`) REFERENCES `contenidos` (`ID_Contenido`),
  CONSTRAINT `resenas_ibfk_2` FOREIGN KEY (`ID_Usuario`) REFERENCES `usuarios` (`ID_Usuario`),
  CONSTRAINT `resenas_chk_1` CHECK ((`Puntuacion` between 1 and 10))
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `resenas`
--

LOCK TABLES `resenas` WRITE;
/*!40000 ALTER TABLE `resenas` DISABLE KEYS */;
INSERT INTO `resenas` VALUES (1,1,1,'Una obra maestra sobre el amor y la física.',10,'2025-05-31 14:44:50',NULL,0,'visible',0),(2,2,2,'Una experiencia única, aunque algo confusa.',8,'2025-05-31 14:44:50',NULL,0,'visible',0),(3,3,4,'¡Una serie increíble con muchos giros!',9,'2025-05-31 14:44:50',NULL,0,'visible',0),(4,4,3,'Aterradora y bien adaptada del libro.',8,'2025-05-31 14:44:50',NULL,0,'visible',0),(5,5,5,'Buen análisis tecnológico y entretenimiento garantizado.',7,'2025-05-31 14:44:50',NULL,0,'visible',0);
/*!40000 ALTER TABLE `resenas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `seguimiento_contenido`
--

DROP TABLE IF EXISTS `seguimiento_contenido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `seguimiento_contenido` (
  `ID_Seguimiento` int NOT NULL AUTO_INCREMENT,
  `ID_Usuario` int NOT NULL,
  `ID_Contenido` int NOT NULL,
  `Estado` enum('por_ver','en_progreso','completado','abandonado') NOT NULL,
  `Progreso` varchar(50) DEFAULT NULL,
  `FechaInicio` date DEFAULT NULL,
  `FechaFin` date DEFAULT NULL,
  `Puntuacion` int DEFAULT NULL,
  `Notas` text,
  PRIMARY KEY (`ID_Seguimiento`),
  UNIQUE KEY `ID_Usuario` (`ID_Usuario`,`ID_Contenido`),
  KEY `ID_Contenido` (`ID_Contenido`),
  CONSTRAINT `seguimiento_contenido_ibfk_1` FOREIGN KEY (`ID_Usuario`) REFERENCES `usuarios` (`ID_Usuario`),
  CONSTRAINT `seguimiento_contenido_ibfk_2` FOREIGN KEY (`ID_Contenido`) REFERENCES `contenidos` (`ID_Contenido`),
  CONSTRAINT `seguimiento_contenido_chk_1` CHECK ((`Puntuacion` between 1 and 10))
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seguimiento_contenido`
--

LOCK TABLES `seguimiento_contenido` WRITE;
/*!40000 ALTER TABLE `seguimiento_contenido` DISABLE KEYS */;
INSERT INTO `seguimiento_contenido` VALUES (1,1,2,'en_progreso','3/10','2025-05-20',NULL,NULL,'Serie interesante, buen desarrollo de personajes'),(2,2,1,'completado','120min','2025-05-18','2025-05-18',8,'Muy buena actuación de los protagonistas'),(3,3,4,'abandonado','5h','2025-05-10','2025-05-15',6,'Demasiado repetitivo, esperaba más variedad'),(4,4,3,'en_progreso','7/12','2025-05-01',NULL,NULL,'Gran animación y excelente banda sonora'),(5,5,5,'por_ver','0%',NULL,NULL,NULL,'Recomendado por un amigo, lo empezaré pronto');
/*!40000 ALTER TABLE `seguimiento_contenido` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `ID_Usuario` int NOT NULL AUTO_INCREMENT,
  `NombreUsuario` varchar(50) NOT NULL,
  `NombreCompleto` varchar(100) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `FechaNacimiento` date DEFAULT NULL,
  `Biografia` text,
  `Pais` varchar(50) DEFAULT NULL,
  `FechaRegistro` datetime DEFAULT CURRENT_TIMESTAMP,
  `Estado` enum('activo','inactivo','suspendido') DEFAULT 'activo',
  `Privacidad` enum('publico','privado','solo_amigos') DEFAULT 'publico',
  PRIMARY KEY (`ID_Usuario`),
  UNIQUE KEY `NombreUsuario` (`NombreUsuario`),
  UNIQUE KEY `Email` (`Email`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'cinemaniaco88','Luis Pérez','luisp88@example.com','1988-05-12','Amante del cine independiente.','México','2025-05-31 14:44:50','activo','publico'),(2,'gamerchick','Ana Torres','ana.torres@example.com','1995-08-25','Fan de los RPGs japoneses.','España','2025-05-31 14:44:50','activo','privado'),(3,'libromaniac','Carlos Jiménez','carlosj@example.com','1980-02-19','Leo más de lo que duermo.','Argentina','2025-05-31 14:44:50','activo','solo_amigos'),(4,'serieadicto','Martina Gómez','martina.gomez@example.com','2000-11-03','No puedo dejar de ver series.','Colombia','2025-05-31 14:44:50','activo','publico'),(5,'narrativa_nerd','Hugo Fernández','hugofernandez@example.com','1993-07-14','Me encantan los podcasts de ciencia ficción.','Chile','2025-05-31 14:44:50','activo','publico');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `vista_contenido_completo`
--

DROP TABLE IF EXISTS `vista_contenido_completo`;
/*!50001 DROP VIEW IF EXISTS `vista_contenido_completo`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `vista_contenido_completo` AS SELECT 
 1 AS `ID_Contenido`,
 1 AS `Titulo`,
 1 AS `Tipo`,
 1 AS `Ano`,
 1 AS `Generos`,
 1 AS `Plataformas`,
 1 AS `Clasificacion`,
 1 AS `Popularidad`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `vista_perfil_usuario`
--

DROP TABLE IF EXISTS `vista_perfil_usuario`;
/*!50001 DROP VIEW IF EXISTS `vista_perfil_usuario`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `vista_perfil_usuario` AS SELECT 
 1 AS `ID_Usuario`,
 1 AS `NombreUsuario`,
 1 AS `NombreCompleto`,
 1 AS `Email`,
 1 AS `Pais`,
 1 AS `Privacidad`,
 1 AS `TotalResenas`,
 1 AS `PromedioPuntuacion`,
 1 AS `ContenidosSeguidos`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `vista_personas_contenido`
--

DROP TABLE IF EXISTS `vista_personas_contenido`;
/*!50001 DROP VIEW IF EXISTS `vista_personas_contenido`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `vista_personas_contenido` AS SELECT 
 1 AS `Persona`,
 1 AS `Contenido`,
 1 AS `Rol`,
 1 AS `Personaje`,
 1 AS `OrdenImportancia`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `vista_resenas_detalladas`
--

DROP TABLE IF EXISTS `vista_resenas_detalladas`;
/*!50001 DROP VIEW IF EXISTS `vista_resenas_detalladas`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `vista_resenas_detalladas` AS SELECT 
 1 AS `ID_Resena`,
 1 AS `NombreUsuario`,
 1 AS `Contenido`,
 1 AS `Puntuacion`,
 1 AS `Comentario`,
 1 AS `Spoiler`,
 1 AS `FechaPublicacion`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `vista_seguimiento_usuarios`
--

DROP TABLE IF EXISTS `vista_seguimiento_usuarios`;
/*!50001 DROP VIEW IF EXISTS `vista_seguimiento_usuarios`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `vista_seguimiento_usuarios` AS SELECT 
 1 AS `NombreUsuario`,
 1 AS `Contenido`,
 1 AS `Estado`,
 1 AS `FechaInicio`,
 1 AS `FechaFin`,
 1 AS `Progreso`*/;
SET character_set_client = @saved_cs_client;

--
-- Final view structure for view `vista_contenido_completo`
--

/*!50001 DROP VIEW IF EXISTS `vista_contenido_completo`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vista_contenido_completo` AS select `c`.`ID_Contenido` AS `ID_Contenido`,`c`.`Titulo` AS `Titulo`,`c`.`Tipo` AS `Tipo`,`c`.`Ano` AS `Ano`,group_concat(distinct `g`.`Nombre` order by `g`.`Nombre` ASC separator ', ') AS `Generos`,group_concat(distinct `p`.`Nombre` order by `p`.`Nombre` ASC separator ', ') AS `Plataformas`,`c`.`Clasificacion` AS `Clasificacion`,`c`.`Popularidad` AS `Popularidad` from ((((`contenidos` `c` left join `contenido_genero` `cg` on((`c`.`ID_Contenido` = `cg`.`ID_Contenido`))) left join `generos` `g` on((`cg`.`ID_Genero` = `g`.`ID_Genero`))) left join `contenido_plataforma` `cp` on((`c`.`ID_Contenido` = `cp`.`ID_Contenido`))) left join `plataformas` `p` on((`cp`.`ID_Plataforma` = `p`.`ID_Plataforma`))) group by `c`.`ID_Contenido` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `vista_perfil_usuario`
--

/*!50001 DROP VIEW IF EXISTS `vista_perfil_usuario`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vista_perfil_usuario` AS select `u`.`ID_Usuario` AS `ID_Usuario`,`u`.`NombreUsuario` AS `NombreUsuario`,`u`.`NombreCompleto` AS `NombreCompleto`,`u`.`Email` AS `Email`,`u`.`Pais` AS `Pais`,`u`.`Privacidad` AS `Privacidad`,count(distinct `r`.`ID_Resena`) AS `TotalResenas`,avg(`r`.`Puntuacion`) AS `PromedioPuntuacion`,count(distinct `s`.`ID_Contenido`) AS `ContenidosSeguidos` from ((`usuarios` `u` left join `resenas` `r` on((`u`.`ID_Usuario` = `r`.`ID_Usuario`))) left join `seguimiento_contenido` `s` on((`u`.`ID_Usuario` = `s`.`ID_Usuario`))) group by `u`.`ID_Usuario` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `vista_personas_contenido`
--

/*!50001 DROP VIEW IF EXISTS `vista_personas_contenido`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vista_personas_contenido` AS select `p`.`Nombre` AS `Persona`,`c`.`Titulo` AS `Contenido`,`cp`.`Rol` AS `Rol`,`cp`.`Personaje` AS `Personaje`,`cp`.`OrdenImportancia` AS `OrdenImportancia` from ((`contenido_persona` `cp` join `personas` `p` on((`cp`.`ID_Persona` = `p`.`ID_Persona`))) join `contenidos` `c` on((`cp`.`ID_Contenido` = `c`.`ID_Contenido`))) order by `p`.`Nombre`,`c`.`Titulo`,`cp`.`OrdenImportancia` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `vista_resenas_detalladas`
--

/*!50001 DROP VIEW IF EXISTS `vista_resenas_detalladas`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vista_resenas_detalladas` AS select `r`.`ID_Resena` AS `ID_Resena`,`u`.`NombreUsuario` AS `NombreUsuario`,`c`.`Titulo` AS `Contenido`,`r`.`Puntuacion` AS `Puntuacion`,`r`.`Comentario` AS `Comentario`,`r`.`Spoiler` AS `Spoiler`,`r`.`FechaPublicacion` AS `FechaPublicacion` from ((`resenas` `r` join `usuarios` `u` on((`r`.`ID_Usuario` = `u`.`ID_Usuario`))) join `contenidos` `c` on((`r`.`ID_Contenido` = `c`.`ID_Contenido`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `vista_seguimiento_usuarios`
--

/*!50001 DROP VIEW IF EXISTS `vista_seguimiento_usuarios`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vista_seguimiento_usuarios` AS select `u`.`NombreUsuario` AS `NombreUsuario`,`c`.`Titulo` AS `Contenido`,`s`.`Estado` AS `Estado`,`s`.`FechaInicio` AS `FechaInicio`,`s`.`FechaFin` AS `FechaFin`,`s`.`Progreso` AS `Progreso` from ((`seguimiento_contenido` `s` join `usuarios` `u` on((`s`.`ID_Usuario` = `u`.`ID_Usuario`))) join `contenidos` `c` on((`s`.`ID_Contenido` = `c`.`ID_Contenido`))) order by `u`.`NombreUsuario`,`c`.`Titulo` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-01 18:01:41
