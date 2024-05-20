-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: trs
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MariaDB

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
-- Table structure for table `ground_booking`
--

DROP TABLE IF EXISTS `ground_booking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ground_booking` (
  `booking_id` int(11) NOT NULL AUTO_INCREMENT,
  `ground_name` varchar(100) DEFAULT NULL,
  `booking_date` date DEFAULT NULL,
  `booking_slot` varchar(500) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `CNIC` varchar(15) DEFAULT NULL,
  `phone_number` varchar(15) DEFAULT NULL,
  `total_price` int(19) DEFAULT NULL,
  PRIMARY KEY (`booking_id`),
  KEY `CNIC` (`CNIC`),
  CONSTRAINT `ground_booking_ibfk_2` FOREIGN KEY (`CNIC`) REFERENCES `signup` (`CNIC`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ground_booking`
--

LOCK TABLES `ground_booking` WRITE;
/*!40000 ALTER TABLE `ground_booking` DISABLE KEYS */;
INSERT INTO `ground_booking` VALUES (1,'KARSAZ FIELD','0000-00-00','07:00 - 08:00','sam','4250100000000','03130028744',6000);
/*!40000 ALTER TABLE `ground_booking` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ground_detail`
--

DROP TABLE IF EXISTS `ground_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ground_detail` (
  `ground_id` int(11) NOT NULL AUTO_INCREMENT,
  `ground_name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `ground_description` varchar(500) DEFAULT NULL,
  `price_per_hour` int(19) NOT NULL,
  `location` varchar(255) NOT NULL,
  `image_data` varchar(225) NOT NULL,
  `ground_status` varchar(225) NOT NULL DEFAULT '1',
  `CNIC` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`ground_id`),
  KEY `CNIC` (`CNIC`),
  CONSTRAINT `ground_detail_ibfk_1` FOREIGN KEY (`CNIC`) REFERENCES `signup` (`CNIC`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ground_detail`
--

LOCK TABLES `ground_detail` WRITE;
/*!40000 ALTER TABLE `ground_detail` DISABLE KEYS */;
INSERT INTO `ground_detail` VALUES (1,'KARSAZ FIELD','neat clean ',6000,'karsaz ground','http://192.168.0.102:3000/uploads/1714323595110.png','Open','4250105176039');
/*!40000 ALTER TABLE `ground_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `player`
--

DROP TABLE IF EXISTS `player`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `player` (
  `player_name` varchar(100) DEFAULT NULL,
  `team_name` varchar(100) DEFAULT NULL,
  `CNIC` varchar(15) DEFAULT NULL,
  `phone_number` varchar(15) DEFAULT NULL,
  `goals` int(11) DEFAULT NULL,
  `assists` int(11) DEFAULT NULL,
  `description` varchar(500) DEFAULT NULL,
  `picture_url` varchar(255) DEFAULT NULL,
  KEY `CNIC` (`CNIC`),
  CONSTRAINT `player_ibfk_1` FOREIGN KEY (`CNIC`) REFERENCES `signup` (`CNIC`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `player`
--

LOCK TABLES `player` WRITE;
/*!40000 ALTER TABLE `player` DISABLE KEYS */;
INSERT INTO `player` VALUES ('faizan','karsaz tigers','4250100000001','03130028744',100,0,'high','http://192.168.0.102:3000/uploads/1714323450035.png');
/*!40000 ALTER TABLE `player` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `signup`
--

DROP TABLE IF EXISTS `signup`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `signup` (
  `name` varchar(100) NOT NULL,
  `phone_number` varchar(15) NOT NULL,
  `CNIC` varchar(15) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(225) NOT NULL,
  PRIMARY KEY (`CNIC`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `signup`
--

LOCK TABLES `signup` WRITE;
/*!40000 ALTER TABLE `signup` DISABLE KEYS */;
INSERT INTO `signup` VALUES ('samad','1234567890','1234567890122','samad@example.com','ASKsam123','player'),('Faiq','1234567890','1234567890123','faiq@example.com','password123','ground owner'),('user','03130028744','4250100000000','user1@gmail.com','ASKsam1387','User'),('player','03130028744','4250100000001','player1@gmail.com','ASKsam1387','Player'),('faizan','03130028744','4250105176031','faizan@gmail.com','ASKsam1387','User'),('sara','03130028744','4250105176032','sara@gmail.com','ASKsam1387','User'),('Usama','03130028744','4250105176038','usama@gamil.com','ASKsam1387','Player'),('samad','03130028744','4250105176039','samad3316khan@gmail.com','ASKsam1387','Ground Owner'),('player','03130028744','4250136755303','player@gmail.com','ASKsam1387','Player'),('AQIB','03130028744','4250136755404','aqib@gmail.com','AQib123456','User');
/*!40000 ALTER TABLE `signup` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-28 22:47:27
