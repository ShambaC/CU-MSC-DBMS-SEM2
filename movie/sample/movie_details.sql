SET FOREIGN_KEY_CHECKS=0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

CREATE DATABASE IF NOT EXISTS `movie_details` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `movie_details`;

CREATE TABLE `acted_by` (
  `title` varchar(30) NOT NULL,
  `year` int(4) NOT NULL,
  `aName` varchar(20) NOT NULL,
  `aDOB` date NOT NULL,
  `role` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `actor` (
  `aName` varchar(20) NOT NULL,
  `aDOB` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `directed_by` (
  `title` varchar(30) NOT NULL,
  `year` int(4) NOT NULL,
  `dName` varchar(20) NOT NULL,
  `dDOB` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `director` (
  `dName` varchar(20) NOT NULL,
  `dDOB` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `genre` (
  `genreName` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `genre` (`genreName`) VALUES
('Action'),
('Family Drama'),
('Romance'),
('Science Fiction'),
('Social Drama'),
('Thriller');

CREATE TABLE `movies` (
  `title` varchar(50) NOT NULL,
  `year` int(4) NOT NULL,
  `duration` int(3) NOT NULL,
  `plot_outline` text NOT NULL,
  `pName` varchar(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `movie_genre` (
  `title` varchar(30) NOT NULL,
  `year` int(4) NOT NULL,
  `genreName` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `production` (
  `pName` varchar(80) NOT NULL,
  `address` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `production` (`pName`, `address`) VALUES
('Dharma Productions', 'Mumbai, India'),
('Legendary Pictures', 'Burbank, USA'),
('Marvel Studios', 'Burbank, USA'),
('Red Chillies Entertainment', 'Mumbai, India'),
('Universal Pictures', 'Universal City, USA'),
('Warner Bros. Pictures', 'Los Angeles, USA'),
('Yash Raj Films', 'Mumbai, India');

CREATE TABLE `quote` (
  `qText` varchar(150) NOT NULL,
  `aName` varchar(20) NOT NULL,
  `aDOB` date NOT NULL,
  `title` varchar(30) NOT NULL,
  `year` int(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


ALTER TABLE `actor`
  ADD PRIMARY KEY (`aName`,`aDOB`);

ALTER TABLE `directed_by`
  ADD PRIMARY KEY (`title`,`year`) USING BTREE;

ALTER TABLE `director`
  ADD PRIMARY KEY (`dName`,`dDOB`);

ALTER TABLE `genre`
  ADD PRIMARY KEY (`genreName`);

ALTER TABLE `movies`
  ADD PRIMARY KEY (`title`,`year`);

ALTER TABLE `movie_genre`
  ADD KEY `genreName` (`genreName`);

ALTER TABLE `production`
  ADD PRIMARY KEY (`pName`);

ALTER TABLE `quote`
  ADD PRIMARY KEY (`aName`,`aDOB`,`title`,`year`) USING BTREE;
SET FOREIGN_KEY_CHECKS=1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
