-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 10, 2024 at 08:25 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `movie`
--

-- --------------------------------------------------------

--
-- Table structure for table `acted_by`
--

CREATE TABLE `acted_by` (
  `title` varchar(30) NOT NULL,
  `year` int(4) NOT NULL,
  `aName` varchar(20) NOT NULL,
  `aDOB` date NOT NULL,
  `role` varchar(10) NOT NULL
);
CREATE TABLE `actor` (
  `aName` varchar(20) NOT NULL,
  `aDOB` date NOT NULL
);
CREATE TABLE `directed_by` (
  `title` varchar(30) NOT NULL,
  `year` int(4) NOT NULL,
  `dName` varchar(20) NOT NULL,
  `dDOB` date NOT NULL
);
CREATE TABLE `director` (
  `dName` varchar(20) NOT NULL,
  `dDOB` date NOT NULL
);
CREATE TABLE `genre` (
  `genreName` varchar(15) NOT NULL
);
CREATE TABLE `movies` (
  `title` varchar(50) NOT NULL,
  `year` int(4) NOT NULL,
  `duration` int(3) NOT NULL,
  `plot_outline` text NOT NULL,
  `pName` varchar(80) NOT NULL
);
CREATE TABLE `movie_genre` (
  `title` varchar(30) NOT NULL,
  `year` int(4) NOT NULL,
  `genreName` varchar(15) NOT NULL
);
CREATE TABLE `production` (
  `pName` varchar(80) NOT NULL,
  `address` varchar(20) NOT NULL
);
CREATE TABLE `quote` (
  `qText` varchar(150) NOT NULL,
  `aName` varchar(20) NOT NULL,
  `aDOB` date NOT NULL,
  `title` varchar(30) NOT NULL,
  `year` int(4) NOT NULL
);
ALTER TABLE `acted_by`
  ADD PRIMARY KEY (`aName`,`aDOB`);
ALTER TABLE `actor`
  ADD PRIMARY KEY (`aName`,`aDOB`);
ALTER TABLE `directed_by`
  ADD PRIMARY KEY (`dName`,`dDOB`);
ALTER TABLE `director`
  ADD PRIMARY KEY (`dName`,`dDOB`);
ALTER TABLE `genre`
  ADD PRIMARY KEY (`genreName`);
ALTER TABLE `movies`
  ADD PRIMARY KEY (`title`,`year`);
ALTER TABLE `movie_genre`
  ADD PRIMARY KEY (`title`,`year`),
  ADD KEY `genreName` (`genreName`);
ALTER TABLE `production`
  ADD PRIMARY KEY (`pName`);
ALTER TABLE `quote`
  ADD PRIMARY KEY (`qText`,`aName`,`aDOB`);
