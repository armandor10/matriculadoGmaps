CREATE DATABASE  IF NOT EXISTS `registrospublicos` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `registrospublicos`;
-- MySQL dump 10.13  Distrib 5.7.9, for Win64 (x86_64)
--
-- Host: localhost    Database: registrospublicos
-- ------------------------------------------------------
-- Server version	5.7.12-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `matriculado`
--

DROP TABLE IF EXISTS `matriculado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `matriculado` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `noMatricula` varchar(30) DEFAULT NULL,
  `razonSocial_nombre` varchar(45) DEFAULT NULL,
  `propietario` varchar(45) DEFAULT NULL,
  `direccion` varchar(45) DEFAULT NULL,
  `telefono` varchar(16) DEFAULT NULL,
  `estado` varchar(2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `matriculado`
--

LOCK TABLES `matriculado` WRITE;
/*!40000 ALTER TABLE `matriculado` DISABLE KEYS */;
INSERT INTO `matriculado` VALUES (1,'1234','Servipan','Juan Perez','Calle 39 No 20 62','5555555',NULL),(2,'5678','Movil TAB','Jhonny Lingo','Cr 33 No 33 21','1111111','A'),(3,'432123','mia','Diego','Calle 39','3467876543',NULL),(4,'3456','Mio','Jhon','cll 44','7656565',NULL),(5,'432123','El otro','Diego','Calle 39','3467876543',NULL),(7,'434566','bodegita','Juan perez','564','7667576',NULL),(8,'3456789556','Yo jose gamez','Katherine','cll 44','345678',NULL);
/*!40000 ALTER TABLE `matriculado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ubicacion`
--

DROP TABLE IF EXISTS `ubicacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ubicacion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `matriculado_id` int(11) DEFAULT NULL,
  `latitud` varchar(20) DEFAULT NULL,
  `longitud` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `matricula_ubicacion_idx` (`matriculado_id`),
  CONSTRAINT `matriculadoid` FOREIGN KEY (`matriculado_id`) REFERENCES `matriculado` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ubicacion`
--

LOCK TABLES `ubicacion` WRITE;
/*!40000 ALTER TABLE `ubicacion` DISABLE KEYS */;
INSERT INTO `ubicacion` VALUES (1,1,'10.469635','-73.253994'),(2,2,'10.459235','-73.253802'),(3,3,'10.4815242587617','-73.2617712020874'),(4,4,'10.4622808067007','-73.2738518714905'),(5,5,'10.469033031173','-73.2568573951721'),(6,NULL,'10.4467501329143','-73.262951374054'),(7,7,'10.446243684825','-73.2426953315735'),(8,8,'10.4652349229935','-73.2328462600708');
/*!40000 ALTER TABLE `ubicacion` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-02-12  1:25:37
