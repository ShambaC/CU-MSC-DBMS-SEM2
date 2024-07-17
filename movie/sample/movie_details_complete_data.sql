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

INSERT INTO `acted_by` (`title`, `year`, `aName`, `aDOB`, `role`) VALUES
('Dilwale Dulhania Le Jayenge', 1995, 'Shah Rukh Khan', '1965-11-02', 'Main'),
('Inception', 2010, 'Leonardo DiCaprio', '1974-11-11', 'Main'),
('Kabhi Khushi Kabhi Gham', 2001, 'Amitabh Bachchan', '1942-10-11', 'Supporting');

CREATE TABLE `actor` (
  `aName` varchar(20) NOT NULL,
  `aDOB` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `actor` (`aName`, `aDOB`) VALUES
('Amitabh Bachchan', '1942-10-11'),
('Leonardo DiCaprio', '1974-11-11'),
('Shah Rukh Khan', '1965-11-02');

CREATE TABLE `directed_by` (
  `title` varchar(30) NOT NULL,
  `year` int(4) NOT NULL,
  `dName` varchar(20) NOT NULL,
  `dDOB` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `directed_by` (`title`, `year`, `dName`, `dDOB`) VALUES
('Baishe Srabon', 2011, 'Srijit Mukherji', '1977-09-23'),
('Dilwale Dulhania Le Jayenge', 1995, 'Aditya Chopra', '1971-05-21'),
('Dunki', 2023, 'Rajkumar Hirani', '1962-11-20'),
('Inception', 2010, 'Christopher Nolan', '1970-07-30'),
('Jurassic Park', 1993, 'Steven Spielberg', '1946-12-18'),
('Kabhi Khushi Kabhi Gham', 2001, 'Karan Johar', '1972-05-25');

CREATE TABLE `director` (
  `dName` varchar(20) NOT NULL,
  `dDOB` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `director` (`dName`, `dDOB`) VALUES
('Aditya Chopra', '1971-05-21'),
('Christopher Nolan', '1970-07-30'),
('Karan Johar', '1972-05-25'),
('Rajkumar Hirani', '1962-11-20'),
('Srijit Mukherji', '1977-09-23'),
('Steven Spielberg', '1946-12-18');

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

INSERT INTO `movies` (`title`, `year`, `duration`, `plot_outline`, `pName`) VALUES
('Baishe Srabon', 2011, 134, 'The film revolves around a serial killer who murders women in Kolkata and the detective who\\\'s on his trail.', 'Red Chillies Entertainment'),
('Dilwale Dulhania Le Jayenge', 1995, 189, 'A young man and woman - both of Indian descent but born and raised in Britain - fall in love during a trip to Europe.', 'Yash Raj Films'),
('Dunki', 2023, 161, 'The narrative follows the journey of individuals who, driven by dreams of a better future, resort to this perilous and illicit route. The emotional and physical struggles faced by these immigrants.', 'Red Chillies Entertainment'),
('Inception', 2010, 148, 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.', 'Warner Bros. Pictures'),
('Jurassic Park', 1993, 127, 'During a preview tour, a theme park suffers a major power breakdown that allows its cloned dinosaur exhibits to run amok.', 'Universal Pictures'),
('Kabhi Khushi Kabhi Gham', 2001, 210, 'Yashvardhan Raichand lives a very wealthy lifestyle along with his wife, Nandini, and two sons, Rahul and Rohan.', 'Dharma Productions');

CREATE TABLE `movie_genre` (
  `title` varchar(30) NOT NULL,
  `year` int(4) NOT NULL,
  `genreName` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `movie_genre` (`title`, `year`, `genreName`) VALUES
('Dilwale Dulhania Le Jayenge', 1995, 'Family Drama'),
('Dilwale Dulhania Le Jayenge', 1995, 'Romance'),
('Inception', 2010, 'Action'),
('Inception', 2010, 'Science Fiction'),
('Kabhi Khushi Kabhi Gham', 2001, 'Family Drama'),
('Jurassic Park', 1993, 'Action'),
('Jurassic Park', 1993, 'Science Fiction'),
('Jurassic Park', 1993, 'Thriller'),
('Dunki', 2023, 'Social Drama'),
('Baishe Srabon', 2011, 'Action'),
('Baishe Srabon', 2011, 'Thriller');

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

INSERT INTO `quote` (`qText`, `aName`, `aDOB`, `title`, `year`) VALUES
('She locked away a secret, deep inside herself, something she once knew to be true... but chose to forget.', 'Leonardo DiCaprio', '1974-11-11', 'Inception', 2010),
('Bade bade deshon mein aisi chhoti chhoti baatein hoti rehti hai, Senorita.', 'Shah Rukh Khan', '1965-11-02', 'Dilwale Dulhania Le Jayenge', 1995);


ALTER TABLE `acted_by`
  ADD PRIMARY KEY (`title`,`year`,`aName`,`aDOB`),
  ADD KEY `aName` (`aName`,`aDOB`);

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


ALTER TABLE `acted_by`
  ADD CONSTRAINT `acted_by_ibfk_1` FOREIGN KEY (`title`,`year`) REFERENCES `movies` (`title`, `year`),
  ADD CONSTRAINT `acted_by_ibfk_2` FOREIGN KEY (`aName`,`aDOB`) REFERENCES `actor` (`aName`, `aDOB`);
SET FOREIGN_KEY_CHECKS=1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
