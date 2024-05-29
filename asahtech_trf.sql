-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 29, 2024 at 07:04 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `asahtech_trf`
--

-- --------------------------------------------------------

--
-- Table structure for table `ground_booking`
--

CREATE TABLE `ground_booking` (
  `booking_id` int(11) NOT NULL,
  `ground_name` varchar(100) DEFAULT NULL,
  `booking_date` date DEFAULT NULL,
  `booking_slot` varchar(500) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `CNIC` varchar(15) DEFAULT NULL,
  `phone_number` varchar(15) DEFAULT NULL,
  `total_price` int(19) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ground_booking`
--

INSERT INTO `ground_booking` (`booking_id`, `ground_name`, `booking_date`, `booking_slot`, `name`, `CNIC`, `phone_number`, `total_price`) VALUES
(2, 'Test2', '2024-05-30', '08:00 - 09:00', 'dfsdfsd', '4250100000000', '34534534533', 1500),
(3, 'Test2', '2024-05-30', '06:00 - 07:00', 'dfsdfsd', '4250100000000', '34534534533', 1500),
(4, 'Test2', '2024-05-30', '07:00 - 08:00', 'dfsdfsd', '4250100000000', '34534534533', 1500);

-- --------------------------------------------------------

--
-- Table structure for table `ground_detail`
--

CREATE TABLE `ground_detail` (
  `ground_id` int(11) NOT NULL,
  `ground_name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `ground_description` varchar(500) DEFAULT NULL,
  `price_per_hour` int(19) NOT NULL,
  `location` varchar(255) NOT NULL,
  `image_data` varchar(225) NOT NULL,
  `ground_status` varchar(225) NOT NULL DEFAULT '1',
  `CNIC` varchar(15) DEFAULT NULL,
  `lng` double DEFAULT NULL,
  `lat` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ground_detail`
--

INSERT INTO `ground_detail` (`ground_id`, `ground_name`, `ground_description`, `price_per_hour`, `location`, `image_data`, `ground_status`, `CNIC`, `lng`, `lat`) VALUES
(2, 'fgdfg', 'dfgdfg', 500, '', 'http://192.168.4.105:3000/uploads/1716932778521.jpg', 'Open', '1234567890123', 67.10165876895189, 67.10165876895189),
(3, 'Test', 'test', 400, '', 'http://192.168.4.105:3000/uploads/1716933213282.jpg', 'Open', '1234567890123', 67.09788590669632, 67.09788590669632),
(4, 'Tsdf', 'TEst', 45, 'Pakistan,,,Pakistan,', 'http://192.168.4.105:3000/uploads/1716933425345.jpg', 'Open', '1234567890123', 67.10757505148649, 67.10757505148649),
(5, 'Test2', 'sdfgsdgdfgd', 500, 'Plot A 288,KAECHS,,Plot A 288,Karachi', 'http://192.168.4.105:3000/uploads/1716934447876.jpg', 'Open', '1234567890123', 67.0811190828681, 67.0811190828681);

-- --------------------------------------------------------

--
-- Table structure for table `player`
--

CREATE TABLE `player` (
  `player_name` varchar(100) DEFAULT NULL,
  `team_name` varchar(100) DEFAULT NULL,
  `CNIC` varchar(15) DEFAULT NULL,
  `phone_number` varchar(15) DEFAULT NULL,
  `goals` int(11) DEFAULT NULL,
  `assists` int(11) DEFAULT NULL,
  `description` varchar(500) DEFAULT NULL,
  `picture_url` varchar(255) DEFAULT NULL,
  `position` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `player`
--

INSERT INTO `player` (`player_name`, `team_name`, `CNIC`, `phone_number`, `goals`, `assists`, `description`, `picture_url`, `position`) VALUES
('faizan', 'karsaz tigers', '4250100000001', '03130028744', 100, 0, 'high', 'http://192.168.0.102:3000/uploads/1714323450035.png', NULL),
('Sajkjasd', 'sdfdsf', '1234567890122', '3434534sdfsdf', 4, 4, 'dfds', 'http://192.168.4.105:3000/uploads/1716934784930.jpg', NULL),
('sdfgsd', 'dfgdfhgdfg', '4250105176038', '4564564565', 4, 4, 'dgfsdfgsgfsd', 'http://192.168.4.105:3000/uploads/1716958728748.jpg', 'Forward');

-- --------------------------------------------------------

--
-- Table structure for table `signup`
--

CREATE TABLE `signup` (
  `name` varchar(100) NOT NULL,
  `phone_number` varchar(15) NOT NULL,
  `CNIC` varchar(15) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(225) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `signup`
--

INSERT INTO `signup` (`name`, `phone_number`, `CNIC`, `email`, `password`, `role`) VALUES
('samad', '1234567890', '1234567890122', 'player@app.com', 'Abc123123', 'player'),
('Faiq', '1234567890', '1234567890123', 'owner@app.com', 'Abc123123', 'ground owner'),
('user', '03130028744', '4250100000000', 'user@app.com', 'Abc123123', 'User'),
('player', '03130028744', '4250100000001', 'player1@gmail.com', 'ASKsam1387', 'Player'),
('faizan', '03130028744', '4250105176031', 'faizan@gmail.com', 'ASKsam1387', 'User'),
('sara', '03130028744', '4250105176032', 'sara@gmail.com', 'ASKsam1387', 'User'),
('Usama', '03130028744', '4250105176038', 'player2@app.com', 'Abc123123', 'Player'),
('samad', '03130028744', '4250105176039', 'samad3316khan@gmail.com', 'ASKsam1387', 'Ground Owner'),
('player', '03130028744', '4250136755303', 'player@gmail.com', 'ASKsam1387', 'Player'),
('AQIB', '03130028744', '4250136755404', 'aqib@gmail.com', 'AQib123456', 'User');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ground_booking`
--
ALTER TABLE `ground_booking`
  ADD PRIMARY KEY (`booking_id`),
  ADD KEY `CNIC` (`CNIC`);

--
-- Indexes for table `ground_detail`
--
ALTER TABLE `ground_detail`
  ADD PRIMARY KEY (`ground_id`),
  ADD KEY `CNIC` (`CNIC`);

--
-- Indexes for table `player`
--
ALTER TABLE `player`
  ADD KEY `CNIC` (`CNIC`);

--
-- Indexes for table `signup`
--
ALTER TABLE `signup`
  ADD PRIMARY KEY (`CNIC`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `ground_booking`
--
ALTER TABLE `ground_booking`
  MODIFY `booking_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `ground_detail`
--
ALTER TABLE `ground_detail`
  MODIFY `ground_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `ground_booking`
--
ALTER TABLE `ground_booking`
  ADD CONSTRAINT `ground_booking_ibfk_2` FOREIGN KEY (`CNIC`) REFERENCES `signup` (`CNIC`);

--
-- Constraints for table `ground_detail`
--
ALTER TABLE `ground_detail`
  ADD CONSTRAINT `ground_detail_ibfk_1` FOREIGN KEY (`CNIC`) REFERENCES `signup` (`CNIC`);

--
-- Constraints for table `player`
--
ALTER TABLE `player`
  ADD CONSTRAINT `player_ibfk_1` FOREIGN KEY (`CNIC`) REFERENCES `signup` (`CNIC`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
