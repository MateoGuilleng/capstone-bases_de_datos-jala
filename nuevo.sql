CREATE DATABASE  IF NOT EXISTS `plataforma_resenas` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `plataforma_resenas`;
-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: plataforma_resenas
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
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contenido_genero`
--

LOCK TABLES `contenido_genero` WRITE;
/*!40000 ALTER TABLE `contenido_genero` DISABLE KEYS */;
INSERT INTO `contenido_genero` VALUES (1,1,1),(2,2,1),(3,3,2),(4,3,4),(5,4,4),(6,5,1),(7,6,2),(8,6,4),(9,7,1),(10,7,2),(11,7,4),(12,8,1),(13,8,3),(14,9,1),(15,9,2),(16,9,4),(17,10,1),(18,10,2),(19,11,2),(20,12,2),(21,12,5),(22,13,1),(23,13,3),(24,14,2),(25,14,3),(26,15,1),(27,15,2),(28,15,3),(29,16,2),(30,16,3),(31,17,2),(32,18,1),(33,18,3),(34,19,1),(35,19,2),(36,19,3),(37,20,1),(38,20,3);
/*!40000 ALTER TABLE `contenido_genero` ENABLE KEYS */;
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
  `Precio` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`ID_Contenido_Plataforma`),
  KEY `ID_Contenido` (`ID_Contenido`),
  KEY `ID_Plataforma` (`ID_Plataforma`),
  CONSTRAINT `contenido_plataforma_ibfk_1` FOREIGN KEY (`ID_Contenido`) REFERENCES `contenidos` (`ID_Contenido`),
  CONSTRAINT `contenido_plataforma_ibfk_2` FOREIGN KEY (`ID_Plataforma`) REFERENCES `plataformas` (`ID_Plataforma`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contenido_plataforma`
--

LOCK TABLES `contenido_plataforma` WRITE;
/*!40000 ALTER TABLE `contenido_plataforma` DISABLE KEYS */;
INSERT INTO `contenido_plataforma` VALUES (1,1,1,'suscripcion',NULL),(2,2,3,'compra',39.99),(3,3,1,'suscripcion',NULL),(4,4,2,'alquiler',3.99),(5,5,4,'suscripcion',NULL),(6,6,2,'suscripcion',20.00),(7,7,1,'suscripcion',10.00),(8,8,3,'compra',29.99),(9,9,1,'suscripcion',30.00),(10,12,2,'suscripcion',60.00),(11,13,5,'suscripcion',20.00),(12,14,3,'compra',59.99),(13,15,1,'suscripcion',10.00),(14,18,2,'suscripcion',50.00),(15,19,2,'suscripcion',90.00);
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
  `Estado` enum('anunciado','en_emision','finalizado','cancelado') DEFAULT NULL,
  `FechaAgregado` datetime DEFAULT CURRENT_TIMESTAMP,
  `Popularidad` int DEFAULT '0',
  PRIMARY KEY (`ID_Contenido`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contenidos`
--

LOCK TABLES `contenidos` WRITE;
/*!40000 ALTER TABLE `contenidos` DISABLE KEYS */;
INSERT INTO `contenidos` VALUES (1,'Interstellar','Interstellar','Un grupo de astronautas busca un nuevo hogar para la humanidad.',2014,'pelicula',169,NULL,NULL,NULL,'Paramount','PG-13','finalizado','2025-05-31 14:44:50',95),(2,'Death Stranding','Death Stranding','Un repartidor debe conectar ciudades aisladas en un mundo postapocalíptico.',2019,'juego',50,NULL,NULL,'Steam','Kojima Productions','M','finalizado','2025-05-31 14:44:50',80),(3,'Stranger Things','Stranger Things','Un grupo de niños enfrenta criaturas sobrenaturales en los 80s.',2016,'serie',50,34,4,NULL,'Netflix','TV-14','en_emision','2025-05-31 14:44:50',98),(4,'It','It','Un grupo de niños lucha contra una entidad maligna disfrazada de payaso.',2017,'pelicula',135,NULL,NULL,NULL,'Warner Bros','R','finalizado','2025-05-31 14:44:50',90),(5,'Podcast Futurista','Futurist Cast','Debates semanales sobre avances tecnológicos del futuro.',2023,'podcast',60,NULL,NULL,NULL,'AudioVision','NR','en_emision','2025-05-31 14:44:50',40),(6,'The Shawshank Redemption','The Shawshank Redemption','Dos hombres encarcelados encuentran redención a través de la amistad.',1994,'pelicula',142,0,0,'HBO Max','Castle Rock Entertainment','R','finalizado','2025-06-16 08:19:14',98),(7,'Breaking Bad','Breaking Bad','Un profesor de química se convierte en narcotraficante.',2008,'serie',49,62,5,'Netflix','AMC','TV-MA','finalizado','2025-06-16 08:19:14',97),(8,'The Witcher 3: Wild Hunt','The Witcher 3: Wild Hunt','Aventura épica de un cazador de monstruos.',2015,'juego',100,0,0,'Steam','CD Projekt Red','M','finalizado','2025-06-16 08:19:14',96),(9,'Attack on Titan','Shingeki no Kyojin','Humanidad lucha contra gigantes devoradores.',2013,'anime',24,75,4,'Crunchyroll','Wit Studio','TV-MA','finalizado','2025-06-16 08:19:14',95),(10,'1984','Nineteen Eighty-Four','Distopía sobre un gobierno totalitario.',1949,'libro',0,0,0,'Amazon Books','Secker & Warburg','NR','finalizado','2025-06-16 08:19:14',94),(11,'The Daily','The Daily','Noticias diarias del New York Times.',2017,'podcast',30,0,0,'Spotify','The New York Times','NR','en_emision','2025-06-16 08:19:14',85),(12,'Parasite','Gisaengchung','Familia pobre se infiltra en hogar adinerado.',2019,'pelicula',132,0,0,'HBO Max','CJ Entertainment','R','finalizado','2025-06-16 08:19:14',97),(13,'The Mandalorian','The Mandalorian','Pistolero solitario en la galaxia Star Wars.',2019,'serie',38,16,2,'Disney+','Lucasfilm','TV-14','en_emision','2025-06-16 08:19:14',92),(14,'Red Dead Redemption 2','Red Dead Redemption 2','Aventura del forajido Arthur Morgan.',2018,'juego',60,0,0,'Rockstar Launcher','Rockstar Games','M','finalizado','2025-06-16 08:19:14',95),(15,'Demon Slayer','Kimetsu no Yaiba','Joven cazador de demonios busca salvar a su hermana.',2019,'anime',24,26,1,'Crunchyroll','ufotable','TV-14','en_emision','2025-06-16 08:19:14',96),(16,'El Principito','Le Petit Prince','Historia filosófica sobre un niño del espacio.',1943,'libro',0,0,0,'Amazon Books','Reynal & Hitchcock','NR','finalizado','2025-06-16 08:19:14',93),(17,'Serial','Serial','Investigación periodística de casos reales.',2014,'podcast',60,0,0,'Spotify','This American Life','NR','finalizado','2025-06-16 08:19:14',88),(18,'Inception','Inception','Ladrón de sueños implanta ideas en la mente.',2010,'pelicula',148,0,0,'HBO Max','Warner Bros.','PG-13','finalizado','2025-06-16 08:19:14',96),(19,'Game of Thrones','Game of Thrones','Luchas por el poder en los Siete Reinos.',2011,'serie',57,73,8,'HBO Max','HBO','TV-MA','finalizado','2025-06-16 08:19:14',94),(20,'The Legend of Zelda: Breath of the Wild','Zelda no Densetsu: Breath of the Wild','Aventura épica en el reino de Hyrule.',2017,'juego',50,0,0,'Nintendo eShop','Nintendo','E10+','finalizado','2025-06-16 08:19:14',97);
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
  `Rol` enum('miembro','moderador','admin','administrador') DEFAULT NULL,
  `Notificaciones` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`ID_Grupo_Usuario`),
  UNIQUE KEY `ID_Grupo` (`ID_Grupo`,`ID_Usuario`),
  KEY `ID_Usuario` (`ID_Usuario`),
  CONSTRAINT `grupo_usuario_ibfk_1` FOREIGN KEY (`ID_Grupo`) REFERENCES `grupos` (`ID_Grupo`),
  CONSTRAINT `grupo_usuario_ibfk_2` FOREIGN KEY (`ID_Usuario`) REFERENCES `usuarios` (`ID_Usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `grupo_usuario`
--

LOCK TABLES `grupo_usuario` WRITE;
/*!40000 ALTER TABLE `grupo_usuario` DISABLE KEYS */;
INSERT INTO `grupo_usuario` VALUES (1,1,1,'2025-06-02 08:01:55','administrador',1),(2,1,2,'2025-06-02 08:01:55','miembro',1),(3,2,3,'2025-06-02 08:01:55','moderador',0),(4,3,4,'2025-06-02 08:01:55','miembro',1),(5,2,5,'2025-06-02 08:01:55','miembro',1);
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `grupos`
--

LOCK TABLES `grupos` WRITE;
/*!40000 ALTER TABLE `grupos` DISABLE KEYS */;
INSERT INTO `grupos` VALUES (1,'Cinéfilos Anónimos','Grupo para discutir cine clásico y moderno.',1,'2025-06-01 18:45:17','https://example.com/icono1.png','No spoilers sin avisar.','publico',12),(2,'Lectores Empedernidos','Para amantes de la lectura de todos los géneros.',2,'2025-06-01 18:45:17','https://example.com/icono2.png','Respeta las opiniones de todos.','privado',8),(3,'Otaku World','Anime, manga y cultura japonesa.',3,'2025-06-01 18:45:17','https://example.com/icono3.png','Contenido apto para todos.','publico',15),(4,'Gamers Unidos','Videojuegos, noticias y recomendaciones.',4,'2025-06-01 18:45:17','https://example.com/icono4.png','Sin hate entre plataformas.','oculto',6),(5,'Fans de Studio Ghibli','Amamos a Totoro y compañía.',5,'2025-06-01 18:45:17','https://example.com/icono5.png','Compartir arte, noticias y más.','publico',9);
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lista_contenido`
--

LOCK TABLES `lista_contenido` WRITE;
/*!40000 ALTER TABLE `lista_contenido` DISABLE KEYS */;
INSERT INTO `lista_contenido` VALUES (1,1,2,NULL,'2025-06-01 21:43:57','Una joya del cine independiente.'),(2,1,5,NULL,'2025-06-01 21:43:57','Pendiente por ver, recomendada por un amigo.'),(3,2,1,NULL,'2025-06-01 21:43:57','Mi favorito de todos los tiempos.'),(4,3,4,NULL,'2025-06-01 21:43:57','Ideal para ver en familia.'),(5,4,3,NULL,'2025-06-01 21:43:57','No es tan bueno como esperaba, pero vale la pena.');
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `listas`
--

LOCK TABLES `listas` WRITE;
/*!40000 ALTER TABLE `listas` DISABLE KEYS */;
INSERT INTO `listas` VALUES (1,1,'Mis películas favoritas','Una colección de películas que amo ver','2025-06-01 18:43:13','2025-06-01 18:43:13','publico','favoritos','https://example.com/poster1.jpg',10,5),(2,2,'Libros por leer','Lista de lectura pendiente','2025-06-01 18:43:13','2025-06-01 18:43:13','privado','por_ver','https://example.com/poster2.jpg',7,1),(3,3,'Series recomendadas','Recomendaciones de mis amigos','2025-06-01 18:43:13','2025-06-01 18:43:13','solo_seguidores','recomendacion','https://example.com/poster3.jpg',12,3),(4,4,'Favoritos de terror','Mi selección de terror','2025-06-01 18:43:13','2025-06-01 18:43:13','publico','favoritos','https://example.com/poster4.jpg',5,4),(5,5,'Todo Studio Ghibli','Películas animadas de Ghibli','2025-06-01 18:43:13','2025-06-01 18:43:13','publico','personalizada','https://example.com/poster5.jpg',9,2);
/*!40000 ALTER TABLE `listas` ENABLE KEYS */;
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
-- Table structure for table `seguidores_listas`
--

DROP TABLE IF EXISTS `seguidores_listas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `seguidores_listas` (
  `ID_Usuario` int NOT NULL,
  `ID_Lista` int NOT NULL,
  `FechaSeguimiento` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID_Usuario`,`ID_Lista`),
  KEY `ID_Lista` (`ID_Lista`),
  CONSTRAINT `seguidores_listas_ibfk_1` FOREIGN KEY (`ID_Usuario`) REFERENCES `usuarios` (`ID_Usuario`),
  CONSTRAINT `seguidores_listas_ibfk_2` FOREIGN KEY (`ID_Lista`) REFERENCES `listas` (`ID_Lista`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seguidores_listas`
--

LOCK TABLES `seguidores_listas` WRITE;
/*!40000 ALTER TABLE `seguidores_listas` DISABLE KEYS */;
/*!40000 ALTER TABLE `seguidores_listas` ENABLE KEYS */;
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
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-16  8:22:20
