-- MySQL dump 10.13  Distrib 9.2.0, for Linux (x86_64)
--
-- Host: localhost    Database: incidentes
-- ------------------------------------------------------
-- Server version	9.2.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `incident`
--

DROP TABLE IF EXISTS `incident`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `incident` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `incident_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `person` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `incident`
--

LOCK TABLES `incident` WRITE;
/*!40000 ALTER TABLE `incident` DISABLE KEYS */;
INSERT INTO `incident` VALUES (1,'Problemas en la recoleccin de basura en la ciudad de Loja',1),(2,'Deficiencias en la iluminacin pblica en los barrios perifricos de Loja',2),(3,'Estado crtico de las vas urbanas debido a falta de mantenimiento',3),(4,'Fallas constantes en el servicio de agua potable en sectores residenciales',4);
/*!40000 ALTER TABLE `incident` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notificaciones`
--

DROP TABLE IF EXISTS `notificaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notificaciones` (
  `id` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(255) NOT NULL,
  `mensaje` text NOT NULL,
  `estado` text NOT NULL,
  `reporte_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `reporte_id` (`reporte_id`),
  CONSTRAINT `notificaciones_ibfk_1` FOREIGN KEY (`reporte_id`) REFERENCES `incident` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notificaciones`
--

LOCK TABLES `notificaciones` WRITE;
/*!40000 ALTER TABLE `notificaciones` DISABLE KEYS */;
INSERT INTO `notificaciones` VALUES (1,'Recoleccin de basura pendiente','El problema de la acumulacin de basura en la ciudad de Loja ha sido reportado y est pendiente de resolucin.','Pendiente',1),(2,'Deficiencias de iluminacin pblica','Se ha reportado la falta de iluminacin pblica en los barrios perifricos de Loja. Por favor, espere actualizacin.','Pendiente',2),(3,'Estado crtico de las vas urbanas','El mal estado de las vas en Loja est bajo revisin. Las autoridades correspondientes han sido notificadas.','Pendiente',3),(4,'Fallas en el suministro de agua potable','Los cortes frecuentes en el suministro de agua en sectores residenciales han sido reportados y estn pendientes de revisin.','Pendiente',4),(5,'Se ha generado un nuevo reporte','Revisa los detalles para más información 4','Pendiente',4),(6,'Se ha actualizado el reporte 4 a Finalizado','Revisa los detalles para más información 4','Finalizado',4),(7,'Se ha actualizado el reporte 3 a Finalizado','Revisa los detalles para más información 3','Finalizado',3),(8,'Se ha generado un nuevo reporte','Revisa los detalles para más información 1','Pendiente',1),(9,'Se ha actualizado el reporte 1 a Finalizado','Revisa los detalles para más información 1','Finalizado',1);
/*!40000 ALTER TABLE `notificaciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `person`
--

DROP TABLE IF EXISTS `person`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `person` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uid` varchar(60) NOT NULL DEFAULT (uuid()),
  `name` varchar(50) NOT NULL,
  `dni` varchar(10) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(250) NOT NULL,
  `password` varchar(162) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `dni` (`dni`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `person`
--

LOCK TABLES `person` WRITE;
/*!40000 ALTER TABLE `person` DISABLE KEYS */;
INSERT INTO `person` VALUES (1,'efae95e7-d9df-11ef-aee0-0242ac110002','Juan','1234567890','Prez','juan.perez@email.com','password123',1,'2025-01-23 23:15:29','2025-01-23 23:15:29'),(2,'efaeccb3-d9df-11ef-aee0-0242ac110002','Ana','0987654321','Gmez','ana.gomez@email.com','password456',1,'2025-01-23 23:15:29','2025-01-23 23:15:29'),(3,'efaed51b-d9df-11ef-aee0-0242ac110002','Luis','1122334455','Martnez','luis.martinez@email.com','password789',0,'2025-01-23 23:15:29','2025-01-23 23:15:29'),(4,'efaed8e6-d9df-11ef-aee0-0242ac110002','Marta','2233445566','Rodrguez','marta.rodriguez@email.com','password101',1,'2025-01-23 23:15:29','2025-01-23 23:15:29'),(5,'efaeda83-d9df-11ef-aee0-0242ac110002','Carlos','3344556677','Lpez','carlos.lopez@email.com','password202',1,'2025-01-23 23:15:29','2025-01-23 23:15:29'),(6,'efaedb76-d9df-11ef-aee0-0242ac110002','Laura','4455667788','Fernndez','laura.fernandez@email.com','password303',0,'2025-01-23 23:15:29','2025-01-23 23:15:29');
/*!40000 ALTER TABLE `person` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-01-28 15:36:50
