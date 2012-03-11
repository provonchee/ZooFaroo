# ************************************************************
# Sequel Pro SQL dump
# Version 3408
#
# http://www.sequelpro.com/
# http://code.google.com/p/sequel-pro/
#
# Host: localhost (MySQL 5.5.9)
# Database: barter
# Generation Time: 2011-12-27 13:37:10 -0800
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table barter_categories
# ------------------------------------------------------------

DROP TABLE IF EXISTS `barter_categories`;

CREATE TABLE `barter_categories` (
  `category_id` int(3) NOT NULL AUTO_INCREMENT,
  `category` varchar(60) DEFAULT NULL,
  `parent_category` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table barter_cities
# ------------------------------------------------------------

DROP TABLE IF EXISTS `barter_cities`;

CREATE TABLE `barter_cities` (
  `city_id` int(5) NOT NULL AUTO_INCREMENT,
  `state_id` int(2) DEFAULT NULL,
  `city` varchar(50) DEFAULT '',
  `coords` varchar(16) DEFAULT '',
  PRIMARY KEY (`city_id`),
  KEY `state_id` (`state_id`),
  CONSTRAINT `barter_cities_ibfk_1` FOREIGN KEY (`state_id`) REFERENCES `barter_states` (`state_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table barter_connections
# ------------------------------------------------------------

DROP TABLE IF EXISTS `barter_connections`;

CREATE TABLE `barter_connections` (
  `connection_id` int(7) NOT NULL AUTO_INCREMENT,
  `posting_id` int(7) DEFAULT NULL,
  `user_id` int(6) DEFAULT NULL,
  `connected_to` int(6) DEFAULT NULL,
  `date_connected` date DEFAULT NULL,
  `times_connected` int(1) DEFAULT NULL,
  PRIMARY KEY (`connection_id`),
  KEY `user_id` (`user_id`),
  KEY `posting_id` (`posting_id`),
  KEY `connected_to` (`connected_to`),
  CONSTRAINT `barter_connections_ibfk_1` FOREIGN KEY (`posting_id`) REFERENCES `barter_postings` (`posting_id`),
  CONSTRAINT `barter_connections_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `barter_users` (`user_id`),
  CONSTRAINT `barter_connections_ibfk_3` FOREIGN KEY (`connected_to`) REFERENCES `barter_users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table barter_emailNotes
# ------------------------------------------------------------

DROP TABLE IF EXISTS `barter_emailNotes`;

CREATE TABLE `barter_emailNotes` (
  `emailNote_id` int(6) NOT NULL AUTO_INCREMENT,
  `user_id` int(6) DEFAULT NULL,
  `category_id` int(3) DEFAULT NULL,
  PRIMARY KEY (`emailNote_id`),
  KEY `user_id` (`user_id`),
  KEY `category_id` (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table barter_postings
# ------------------------------------------------------------

DROP TABLE IF EXISTS `barter_postings`;

CREATE TABLE `barter_postings` (
  `posting_id` int(7) NOT NULL AUTO_INCREMENT,
  `user_id` int(6) DEFAULT NULL,
  `state_id` int(2) DEFAULT NULL,
  `city_id` int(5) DEFAULT NULL,
  `specificLocale` varchar(30) DEFAULT NULL,
  `offerCategory_id` int(3) DEFAULT NULL,
  `offerTitle` varchar(75) DEFAULT '',
  `offerPosting` text,
  `needCategory_id` int(3) DEFAULT NULL,
  `needTitle` varchar(75) DEFAULT '',
  `needPosting` text,
  `posting_date` date DEFAULT NULL,
  `oMoney` int(1) DEFAULT NULL,
  `oGSW` varchar(1) DEFAULT '',
  `oEmailNotes` int(1) DEFAULT NULL,
  `nEmailNotes` int(1) DEFAULT NULL,
  `nMoney` int(1) DEFAULT NULL,
  `nGSW` varchar(1) DEFAULT '',
  `secCode` varchar(6) DEFAULT NULL,
  PRIMARY KEY (`posting_id`),
  KEY `user_id` (`user_id`),
  KEY `state_id` (`state_id`),
  KEY `city_id` (`city_id`),
  KEY `offerCategory_id` (`offerCategory_id`),
  KEY `needCategory_id` (`needCategory_id`),
  CONSTRAINT `barter_postings_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `barter_users` (`user_id`),
  CONSTRAINT `barter_postings_ibfk_2` FOREIGN KEY (`city_id`) REFERENCES `barter_cities` (`city_id`),
  CONSTRAINT `barter_postings_ibfk_3` FOREIGN KEY (`state_id`) REFERENCES `barter_states` (`state_id`),
  CONSTRAINT `barter_postings_ibfk_4` FOREIGN KEY (`offerCategory_id`) REFERENCES `barter_categories` (`category_id`),
  CONSTRAINT `barter_postings_ibfk_5` FOREIGN KEY (`needCategory_id`) REFERENCES `barter_categories` (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table barter_reviews
# ------------------------------------------------------------

DROP TABLE IF EXISTS `barter_reviews`;

CREATE TABLE `barter_reviews` (
  `review_id` int(6) NOT NULL AUTO_INCREMENT,
  `user_id` int(6) DEFAULT NULL,
  `reviewedBy_id` int(6) DEFAULT NULL,
  `reviewTitle` varchar(75) DEFAULT '',
  `reviewPost` text,
  `recommend` int(1) DEFAULT NULL,
  `date_reviewed` date DEFAULT NULL,
  PRIMARY KEY (`review_id`),
  KEY `user_id` (`user_id`),
  KEY `reviewedBy_id` (`reviewedBy_id`),
  KEY `posting_id` (`recommend`),
  CONSTRAINT `barter_reviews_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `barter_users` (`user_id`),
  CONSTRAINT `barter_reviews_ibfk_2` FOREIGN KEY (`reviewedBy_id`) REFERENCES `barter_users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table barter_states
# ------------------------------------------------------------

DROP TABLE IF EXISTS `barter_states`;

CREATE TABLE `barter_states` (
  `state_id` int(2) NOT NULL AUTO_INCREMENT,
  `state` varchar(30) DEFAULT '',
  PRIMARY KEY (`state_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table barter_users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `barter_users`;

CREATE TABLE `barter_users` (
  `user_id` int(6) NOT NULL AUTO_INCREMENT,
  `email` varchar(50) DEFAULT NULL,
  `username` varchar(12) NOT NULL DEFAULT '',
  `password` int(60) DEFAULT NULL,
  `randKey` varchar(10) DEFAULT NULL,
  `secCode` varchar(6) DEFAULT NULL,
  `city` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
