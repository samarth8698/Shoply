-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: localhost    Database: Shoply
-- ------------------------------------------------------
-- Server version	8.0.44

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
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `address` varchar(500) DEFAULT NULL,
  `amount` double DEFAULT NULL,
  `customer_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `order_date` datetime DEFAULT NULL,
  `payment_method` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `products` varchar(1000) DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `tracking_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payments`
--

DROP TABLE IF EXISTS `payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payments` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `amount` double DEFAULT NULL,
  `currency` varchar(255) DEFAULT NULL,
  `razorpay_order_id` varchar(255) DEFAULT NULL,
  `razorpay_payment_id` varchar(255) DEFAULT NULL,
  `razorpay_signature` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `payment_date` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payments`
--

LOCK TABLES `payments` WRITE;
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
INSERT INTO `payments` VALUES (1,699,'INR','order_TEDzMradXTughU','pay_TEDzchuaVmIaH8','480e9924155dea16d6a453c8bc58e2339a3ae22787e2f135f6bf4940a3f7b701','SUCCESS',NULL),(2,699,'INR','order_TEHyxZsoevdGJE','pay_TEHzVjuFlu9Zj5','e3d1dc862f8d321ba6af0767cf79555b8644bd4ec1d2c0c4464319a38e453673','SUCCESS',NULL),(3,699,'INR','order_TEIBx1VyvvzILr','pay_TEIC3wUn29O8Yq','f4c02edf451db2b65b3cce4408b0d863ebe6d2efc28041f2c4a0e913a9cf1a63','SUCCESS',NULL),(4,699,'INR','order_TEIFK0BiRFoXEz','pay_TEIFYH38fqOtqA','7ad126b4eaa7a57200f585586c932c00ef04809d61bb7b8190a05e764195b798','SUCCESS',NULL),(5,999,'INR','order_TEISsUlS3uiHtI','pay_TEISygp2XLyP6R','3224d4f18c5e86ece0e0d95a5631554358874b4e8f083cd1fd3acac2c8e31442','SUCCESS',NULL),(6,999,'INR','order_TESRNlbF9hFyck','pay_TESRbgo7PWmXMo','6697e7b1c1f6ac69b732092d23bd9b6ef4dd5558f09dabc8c34d1c412b589d9c','SUCCESS',NULL),(7,699,'INR','order_TESgoK2rcV6y3u','pay_TESgtwB1kfW5uk','2035a24afc348662d02e040c6b95b3c358fee947188f902ffb90e2d846952757','SUCCESS',NULL),(8,899,'INR','order_TESjISNJIKt4qy','pay_TESjPoGwsJCeDP','21928aaa9fcc1fea0577ae8849634b571f42b3d55766f6ba00dc720107c877c9','SUCCESS',NULL),(9,50999,'INR','order_TET2Qi27CF7pe9','pay_TET2W9FzXWoGbg','630fc079553df098c32c6e07649a667874d2fafdcbe25228652a7f4164cfad05','SUCCESS',NULL),(10,999,'INR','order_TETPIoEqSUA8iN','pay_TETPTvbv3n8Y17','d9970b4af265fd1cfbee8cedc08637898d1241470293203a9e4c6954f67597a8','SUCCESS',NULL),(11,50000,'INR','order_TEYKDKwXvBw8ID','pay_TEYKIkfQinj4Gb','586396d797c189397316097be1439226b3260c739ce74f860c46363b7b5fcc21','SUCCESS',NULL),(12,85000,'INR','order_TEYhJrAdnr4cON','pay_TEYhRqfmHqgt2w','4690f5d5b0ecdb2ce8a588fb912f33b7cb8ea59fc255e40323014f97d871989f','SUCCESS',NULL);
/*!40000 ALTER TABLE `payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `description` varchar(255) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `price` double DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `brand` varchar(255) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,'Gaming Laptop','/images/laptop.jpg','Laptop',50000,10,NULL,NULL),(2,'Name: Dell Inspiron Laptop\nDescription: Intel Core i5 13th Gen, 16GB RAM, 512GB SSD','/images/monitor.jpg','PC',55000,4,NULL,NULL),(3,'Bag-Pack','/images/backpack.jpg','Bag',999,10,NULL,NULL),(4,'Wireless Keyboard','/images/keyboard.jpg','Keyboard',699,5,NULL,NULL),(5,'Wireless Headphones','/images/headphones.jpg','Headphones',899,3,NULL,NULL),(6,'Apple Mobile','https://m.media-amazon.com/images/I/61bK6PMOC3L._SX679_.jpg','iPhone 16',85000,10,'Apple','Electronics');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `comment` varchar(255) DEFAULT NULL,
  `product_id` bigint DEFAULT NULL,
  `rating` int NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
INSERT INTO `reviews` VALUES (1,'Excellent Product',1,5,'Samarth'),(2,'Excellent Product',1,5,'Samarth'),(3,'Excellent Bag',3,5,'Samarth'),(4,'This Bag are Not Good..',3,3,'Amit'),(5,'Very Good',3,5,'Pratik');
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `role` enum('ADMIN','USER') DEFAULT NULL,
  `joined_date` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK6dotkott2kjsp8vw4d0m25fb7` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'samarthadhao2019@gmail.com','Samarth Subhash Adhao','$2a$10$A0DDMB/9K8cREqdV/hZ3fOZWAh44QU9YhO02MjEbl358gj3AS0LSO','9876543210','USER','2026-07-17 18:02:12.774108');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wishlist`
--

DROP TABLE IF EXISTS `wishlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wishlist` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `description` varchar(255) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `price` double DEFAULT NULL,
  `product_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wishlist`
--

LOCK TABLES `wishlist` WRITE;
/*!40000 ALTER TABLE `wishlist` DISABLE KEYS */;
INSERT INTO `wishlist` VALUES (5,'Name: Dell Inspiron Laptop\nDescription: Intel Core i5 13th Gen, 16GB RAM, 512GB SSD','/images/monitor.jpg','PC',55000,2);
/*!40000 ALTER TABLE `wishlist` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-07-18 16:55:12
