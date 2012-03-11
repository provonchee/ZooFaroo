# ************************************************************
# Sequel Pro SQL dump
# Version 3408
#
# http://www.sequelpro.com/
# http://code.google.com/p/sequel-pro/
#
# Host: localhost (MySQL 5.5.9)
# Database: barter
# Generation Time: 2012-01-21 12:49:07 -0800
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table barter_admin
# ------------------------------------------------------------

DROP TABLE IF EXISTS `barter_admin`;

CREATE TABLE `barter_admin` (
  `id` int(1) unsigned NOT NULL AUTO_INCREMENT,
  `version` varchar(4) DEFAULT NULL,
  `state_version` varchar(4) DEFAULT NULL,
  `city_version` varchar(4) DEFAULT NULL,
  `cat_version` varchar(4) DEFAULT NULL,
  `date` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `barter_admin` WRITE;
/*!40000 ALTER TABLE `barter_admin` DISABLE KEYS */;

INSERT INTO `barter_admin` (`id`, `version`, `state_version`, `city_version`, `cat_version`, `date`)
VALUES
	(1,'1','1','1','1',NULL);

/*!40000 ALTER TABLE `barter_admin` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table barter_categories
# ------------------------------------------------------------

DROP TABLE IF EXISTS `barter_categories`;

CREATE TABLE `barter_categories` (
  `category_id` int(3) NOT NULL AUTO_INCREMENT,
  `category` varchar(60) DEFAULT NULL,
  `parent_category` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `barter_categories` WRITE;
/*!40000 ALTER TABLE `barter_categories` DISABLE KEYS */;

INSERT INTO `barter_categories` (`category_id`, `category`, `parent_category`)
VALUES
	(1,'Accounting','s'),
	(2,'Art','s'),
	(3,'Aviation','s'),
	(4,'Bicycle_Repair','s'),
	(5,'Carpentry','s'),
	(6,'Child_Care','s'),
	(7,'Computer-Technical','s'),
	(8,'Cooking-Catering','s'),
	(9,'Elder_Care','s'),
	(10,'Electrician','s'),
	(11,'Energy_Audit','s'),
	(12,'Hair-Nails-Beauty','s'),
	(13,'Housekeeping-Cleaning','s'),
	(14,'Landscape_-_Lawn_-_Garden','s'),
	(15,'Legal_Services','s'),
	(16,'Lessons_-_Music_-_Arts','s'),
	(17,'Lessons_-_Sports','s'),
	(18,'Masonry_-_Stone_-_Brick_-_Tile','s'),
	(19,'Mechanic_-_Auto_-_Motorcycle','s'),
	(20,'Mechanic_-_Large_Engine','s'),
	(21,'Mechanic_-_Small_Engine','s'),
	(22,'Miscellaneous','s'),
	(23,'Musician_-_Performer','s'),
	(24,'Painting_Indoor_-_Outdoor','s'),
	(25,'Personal_Training_-_Fitness','s'),
	(26,'Pet_Services','s'),
	(27,'Photography','s'),
	(28,'Physical_Therapy_-_Massage','s'),
	(29,'Plumbing','s'),
	(30,'Pool_Services','s'),
	(31,'Snow_Removal','s'),
	(32,'Taxi_-_Car_Pool','s'),
	(33,'Tree_Service','s'),
	(34,'Web_Design','s'),
	(35,'Writing','s'),
	(36,'Antiques','g'),
	(37,'Auto_Parts','g'),
	(38,'Automobiles_-_Trucks','g'),
	(39,'Bicycles','g'),
	(40,'Boats','g'),
	(41,'Books','g'),
	(42,'Building_Supplies','g'),
	(43,'Cd_-_Dvd','g'),
	(44,'Cell_Phones','g'),
	(45,'Clothing','g'),
	(46,'Collectables','g'),
	(47,'Computers','g'),
	(48,'Electronics','g'),
	(49,'Farm_And_Garden','g'),
	(50,'Firewood','g'),
	(51,'Furniture','g'),
	(52,'Heavy_Equipment','g'),
	(53,'Household_Appliances','g'),
	(54,'Jewelry','g'),
	(55,'Kitchen_-_Cooking','g'),
	(56,'Lawn_-_Garden','g'),
	(57,'Miscellaneous','g'),
	(58,'Motorcycles','g'),
	(59,'Musical_Instruments','g'),
	(60,'Photography_+_Video','g'),
	(61,'Rvs','g'),
	(62,'Tickets','g'),
	(63,'Tools_For_Loan_-_Swap','g'),
	(64,'Toys_-_Games','g'),
	(65,'Video_Games','g'),
	(66,'NULL','n');

/*!40000 ALTER TABLE `barter_categories` ENABLE KEYS */;
UNLOCK TABLES;


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

LOCK TABLES `barter_cities` WRITE;
/*!40000 ALTER TABLE `barter_cities` DISABLE KEYS */;

INSERT INTO `barter_cities` (`city_id`, `state_id`, `city`, `coords`)
VALUES
	(1,1,'Aburn',''),
	(2,1,'Anniston__Gadsden',''),
	(3,1,'Birmingham',''),
	(4,1,'Decatur__Hunstville',''),
	(5,1,'Dothan',''),
	(6,1,'Florence__Muscle_Shoals',''),
	(7,1,'Mobile',''),
	(8,1,'Montgomery',''),
	(9,1,'Tuscaloosa',''),
	(10,2,'Anchorage',''),
	(11,2,'Barrow',''),
	(12,2,'Fairbanks',''),
	(13,2,'Kenai_Peninsula',''),
	(14,2,'South_Eastern_AK',''),
	(15,2,'Western_Alaska',''),
	(16,3,'Flagstaff__Sedona',''),
	(17,3,'Mohave_County',''),
	(18,3,'Phoenix',''),
	(19,3,'Prescott',''),
	(20,3,'Sierra_Vista',''),
	(21,3,'Show_Low',''),
	(22,3,'Tucson',''),
	(23,3,'Yuma',''),
	(24,4,'Fayetteville',''),
	(25,4,'Fort_Smith',''),
	(26,4,'Jonesboro',''),
	(27,4,'Little_Rock',''),
	(28,4,'Pine_Bluff',''),
	(29,4,'Texarkana',''),
	(30,5,'Bakersfield',''),
	(31,5,'Chico',''),
	(32,5,'Corcoran__Hanford',''),
	(33,5,'Fresno',''),
	(34,5,'Gold_Country',''),
	(35,5,'Humboldt_County',''),
	(36,5,'Imperial_County',''),
	(37,5,'Inland_Empire',''),
	(38,5,'Los_Angeles',''),
	(39,5,'Mendocino_County',''),
	(40,5,'Merced',''),
	(41,5,'Modesto',''),
	(42,5,'Monteray_Bay',''),
	(43,5,'Orange_County',''),
	(44,5,'Palm_Springs',''),
	(45,5,'Redding',''),
	(46,5,'Sacramento',''),
	(47,5,'San_Diego',''),
	(48,5,'San_Francisco__Bay_Area',''),
	(49,5,'San_Jose',''),
	(50,5,'San_Luis_Obispo',''),
	(51,5,'Santa_Barbara',''),
	(52,5,'Santa_Maria',''),
	(53,5,'Siskiyou_County',''),
	(54,5,'Stockton',''),
	(55,5,'Susanville',''),
	(56,5,'Sutter_Creek__Yuba',''),
	(57,5,'Ventura_County',''),
	(58,5,'Visalia__Tulare',''),
	(59,6,'Boulder',''),
	(60,6,'Colorado_Springs',''),
	(61,6,'Denver',''),
	(62,6,'Eastern_CO',''),
	(63,6,'High_Rockies',''),
	(64,6,'Northern_CO__Fort_Collins',''),
	(65,6,'Pueblo',''),
	(66,6,'Western_Slope',''),
	(67,7,'Bridgeport',''),
	(68,7,'Danbury',''),
	(69,7,'Eastern_CT',''),
	(70,7,'Hartford',''),
	(71,7,'New_Haven',''),
	(72,7,'North_Western_CT',''),
	(73,7,'Stamford',''),
	(74,7,'Waterbury',''),
	(75,8,'Dover',''),
	(76,8,'Middletown',''),
	(77,8,'Newark',''),
	(78,8,'Southern_DE',''),
	(79,8,'Wilmington',''),
	(80,9,'District_of_Columbia',''),
	(81,10,'Daytona_Beach',''),
	(82,10,'Fort_Lauderdale',''),
	(83,10,'Fort_Myers__South_Western_FL',''),
	(84,10,'Fort_Walton_Beach__Okaloosa',''),
	(85,10,'Gainesville',''),
	(86,10,'Heartland_FL',''),
	(87,10,'Jacksonville',''),
	(88,10,'Lakeland',''),
	(89,10,'Miami',''),
	(90,10,'Ocala',''),
	(91,10,'Orlando',''),
	(92,10,'Panama_City',''),
	(93,10,'Pensacola',''),
	(94,10,'Saint_Augustine',''),
	(95,10,'Sarasota__Bradenton',''),
	(96,10,'Space_Coast',''),
	(97,10,'Tallahassee',''),
	(98,10,'Tampa_Bay_Area',''),
	(99,10,'The_Keys',''),
	(100,10,'Treasure_Coast',''),
	(101,10,'West_Palm_Beach',''),
	(102,11,'Albany',''),
	(103,11,'Athens',''),
	(104,11,'Atlanta',''),
	(105,11,'Augusta',''),
	(106,11,'Brunswick',''),
	(107,11,'Columbus',''),
	(108,11,'Macon__Warner_Robins',''),
	(109,11,'North_Western_GA',''),
	(110,11,'Statesboro',''),
	(111,11,'Savannah__Hinesville',''),
	(112,11,'Valdosta',''),
	(113,12,'Hilo',''),
	(114,12,'Honolulu',''),
	(115,12,'Kahului',''),
	(116,13,'Boise',''),
	(117,13,'Clarkston__Lewiston',''),
	(118,13,'Eastern_ID',''),
	(119,13,'Twin_Falls',''),
	(120,14,'Chicago',''),
	(121,14,'Decatur',''),
	(122,14,'LaSalle_County',''),
	(123,14,'Mattoon__Charleston',''),
	(124,14,'Normal__Bloomington',''),
	(125,14,'Peoria',''),
	(126,14,'Rockford',''),
	(127,14,'Springfield',''),
	(128,14,'Southern_IL',''),
	(129,14,'Western_IL',''),
	(130,14,'Urbana__Champaign',''),
	(131,15,'Anderson__Muncie',''),
	(132,15,'Bloomington',''),
	(133,15,'Evansville',''),
	(134,15,'Fort_Wayne',''),
	(135,15,'Gary',''),
	(136,15,'Indianapolis',''),
	(137,15,'Kokomo',''),
	(138,15,'Lafayette__West_Lafayette',''),
	(139,15,'Richmond',''),
	(140,15,'South_Bend',''),
	(141,15,'Terre_Haute',''),
	(142,16,'Ames',''),
	(143,16,'Cedar_Rapids',''),
	(144,16,'Council_Bluffs',''),
	(145,16,'Des_Moines',''),
	(146,16,'Dubuque',''),
	(147,16,'Fort_Dodge',''),
	(148,16,'Iowa_City',''),
	(149,16,'Mason_City',''),
	(150,16,'Quad_Cities',''),
	(151,16,'Sioux_City',''),
	(152,16,'South_East_IA',''),
	(153,16,'Waterloo__Cedar_Falls',''),
	(154,17,'Kansas_City',''),
	(155,17,'Lawrence',''),
	(156,17,'Manhattan',''),
	(157,17,'North_Western_KS',''),
	(158,17,'Salina',''),
	(159,17,'South_Eastern_KS',''),
	(160,17,'South_Western_KS',''),
	(161,17,'Topeka',''),
	(162,17,'Wichita',''),
	(163,18,'Bowling_Green',''),
	(164,18,'Eastern_KY',''),
	(165,18,'Frankfort',''),
	(166,18,'Lexington-Fayette',''),
	(167,18,'Louisville',''),
	(168,18,'Owensboro',''),
	(169,18,'Western_KY',''),
	(170,19,'Alexandria__Central_LA',''),
	(171,19,'Baton_Rouge',''),
	(172,19,'Houma',''),
	(173,19,'Lafayette',''),
	(174,19,'Lake_Charles',''),
	(175,19,'Monroe',''),
	(176,19,'New_Orleans',''),
	(177,19,'Shreveport',''),
	(178,20,'Augusta',''),
	(179,20,'Bangor',''),
	(180,20,'DownEast_ME',''),
	(181,20,'Mid-Coast_ME',''),
	(182,20,'Portland',''),
	(183,20,'Presque_Isle__Northern_ME',''),
	(184,21,'Annapolis',''),
	(185,21,'Baltimore',''),
	(186,21,'Bethesda',''),
	(187,21,'Eastern_Shore',''),
	(188,21,'Frederick',''),
	(189,21,'Southern_MD',''),
	(190,21,'Western_MD',''),
	(191,22,'Boston',''),
	(192,22,'Cape_Cod__Islands',''),
	(193,22,'Lowell',''),
	(194,22,'South_Coast',''),
	(195,22,'Springfield',''),
	(196,22,'Worcester__Central_MA',''),
	(197,22,'Western_MA',''),
	(198,23,'Ann_Arbor',''),
	(199,23,'Battle_Creek__Kalamazoo',''),
	(200,23,'Bay_City__Midland__Saginaw',''),
	(201,23,'Central_MI',''),
	(202,23,'Detroit',''),
	(203,23,'Flint',''),
	(204,23,'Grand_Rapids',''),
	(205,23,'Holland',''),
	(206,23,'Jackson',''),
	(207,23,'Lansing',''),
	(208,23,'Monroe',''),
	(209,23,'Muskegon',''),
	(210,23,'Northern_MI',''),
	(211,23,'The_Thumb',''),
	(212,23,'Upper_Peninsula',''),
	(213,24,'Bemidji',''),
	(214,24,'Brainerd',''),
	(215,24,'Duluth__Superior',''),
	(216,24,'Mankato',''),
	(217,24,'Minneapolis__Saint_Paul',''),
	(218,24,'North_Western_MN',''),
	(219,24,'Rochester',''),
	(220,24,'Saint_Cloud',''),
	(221,24,'South_Western_MN',''),
	(222,25,'Gulfport__Biloxi',''),
	(223,25,'Hattiesburg',''),
	(224,25,'Jackson',''),
	(225,25,'Meridian',''),
	(226,25,'Northern_MS',''),
	(227,25,'South_Western_MS',''),
	(228,26,'Jefferson_City__Columbia',''),
	(229,26,'Joplin',''),
	(230,26,'Kansas_City',''),
	(231,26,'Kirksville',''),
	(232,26,'Lake_of_the_Ozarks',''),
	(233,26,'Saint_Joseph',''),
	(234,26,'Saint_Louis',''),
	(235,26,'South_Eastern_MO',''),
	(236,26,'Springfield',''),
	(237,27,'Billings',''),
	(238,27,'Bozeman',''),
	(239,27,'Butte',''),
	(240,27,'East_MT',''),
	(241,27,'Great_Falls',''),
	(242,27,'Helena',''),
	(243,27,'Kalispell',''),
	(244,27,'Missoula',''),
	(245,28,'Grand_Island',''),
	(246,28,'Lincoln',''),
	(247,28,'North_Eastern_NE',''),
	(248,28,'North_Platte',''),
	(249,28,'Omaha__Council_Bluffs',''),
	(250,28,'Scottsbluff__Panhandle',''),
	(251,29,'Carson_City',''),
	(252,29,'Elko',''),
	(253,29,'Las_Vegas',''),
	(254,29,'Reno__Tahoe',''),
	(255,30,'Northern_NH',''),
	(256,30,'Southern_NH',''),
	(257,31,'Jersey_Shore',''),
	(258,31,'Newark',''),
	(259,31,'North_NJ',''),
	(260,31,'Paterson',''),
	(261,31,'South_NJ',''),
	(262,31,'Trenton__Central_NJ',''),
	(263,32,'Albuquerque',''),
	(264,32,'Carlsbad__Roswell',''),
	(265,32,'Clovis__Portales',''),
	(266,32,'Farmington',''),
	(267,32,'Las_Cruces',''),
	(268,32,'Santa_Fe__Taos',''),
	(269,33,'Albany',''),
	(270,33,'Binghamton',''),
	(271,33,'Buffalo',''),
	(272,33,'Corning__Elmira',''),
	(273,33,'Finger_Lakes',''),
	(274,33,'Glens_Falls',''),
	(275,33,'Hudson_Valley',''),
	(276,33,'Ithaca',''),
	(277,33,'Long_Island',''),
	(278,33,'New_York',''),
	(279,33,'Oneonta',''),
	(280,33,'Plattsburgh__Adirondacks',''),
	(281,33,'Potsdam__Canton__Massena',''),
	(282,33,'Rochester',''),
	(283,33,'Saratoga_Springs',''),
	(284,33,'Syracuse',''),
	(285,33,'Utica__Oneida__Rome',''),
	(286,33,'Watertown',''),
	(287,34,'Asheville',''),
	(288,34,'Boone',''),
	(289,34,'Charlotte',''),
	(290,34,'Eastern_NC',''),
	(291,34,'Fayetteville',''),
	(292,34,'Greensboro',''),
	(293,34,'Jacksonville',''),
	(294,34,'Outer_Banks',''),
	(295,34,'Raleigh__Durham',''),
	(296,34,'Wilmington',''),
	(297,34,'Winston_-_Salem',''),
	(298,35,'Bismarck',''),
	(299,35,'Fargo',''),
	(300,35,'Grand_Forks',''),
	(301,35,'Minot',''),
	(302,35,'Western_ND',''),
	(303,36,'Akron__Canton',''),
	(304,36,'Ashtabula',''),
	(305,36,'Athens',''),
	(306,36,'Cambridge__Zanesville',''),
	(307,36,'Chillicothe',''),
	(308,36,'Cincinnati',''),
	(309,36,'Cleveland',''),
	(310,36,'Columbus',''),
	(311,36,'Dayton__Springfield',''),
	(312,36,'Findlay__Lima',''),
	(313,36,'Mansfield',''),
	(314,36,'Sandusky',''),
	(315,36,'Toledo',''),
	(316,36,'Tuscarawas_County',''),
	(317,36,'Youngstown',''),
	(318,37,'Lawton',''),
	(319,37,'North_Western_OK',''),
	(320,37,'Oklahoma_City',''),
	(321,37,'South_Eastern_OK',''),
	(322,37,'Stillwater',''),
	(323,37,'Tulsa',''),
	(324,38,'Albany__Corvallis',''),
	(325,38,'Ashland__Medford',''),
	(326,38,'Bend',''),
	(327,38,'Eastern_Oregon',''),
	(328,38,'Eugene',''),
	(329,38,'Klamath_Falls',''),
	(330,38,'Oregon_Coast',''),
	(331,38,'Portland',''),
	(332,38,'Roseburg',''),
	(333,38,'Salem',''),
	(334,39,'Altoona__Johnstown',''),
	(335,39,'Cumberland_Valley',''),
	(336,39,'Erie',''),
	(337,39,'Harrisburg',''),
	(338,39,'Lancaster',''),
	(339,39,'Lehigh_Valley',''),
	(340,39,'Meadville',''),
	(341,39,'Philadelphia',''),
	(342,39,'Pittsburgh',''),
	(343,39,'Poconos',''),
	(344,39,'Reading',''),
	(345,39,'Scranton__Wilkes-Barre',''),
	(346,39,'State_College',''),
	(347,39,'Williamsport',''),
	(348,39,'York',''),
	(349,40,'Bristol',''),
	(350,40,'Newport',''),
	(351,40,'Pawtucket',''),
	(352,40,'Providence',''),
	(353,40,'Warwick',''),
	(354,40,'Westerly',''),
	(355,41,'Charleston',''),
	(356,41,'Columbia',''),
	(357,41,'Florence',''),
	(358,41,'Greenville__Upstate',''),
	(359,41,'Hilton_Head_Island',''),
	(360,41,'Myrtle_Beach',''),
	(361,42,'North_East_SD',''),
	(362,42,'Pierre__Central_SD',''),
	(363,42,'Rapid_City__Western_SD',''),
	(364,42,'Sioux_Falls__South_East_SD',''),
	(365,43,'Chattanooga',''),
	(366,43,'Clarksville',''),
	(367,43,'Cookesville',''),
	(368,43,'Jackson',''),
	(369,43,'Knoxville',''),
	(370,43,'Memphis',''),
	(371,43,'Nashville',''),
	(372,43,'Tri-Cities',''),
	(373,44,'Abilene',''),
	(374,44,'Amarillo',''),
	(375,44,'Austin',''),
	(376,44,'Brownsville',''),
	(377,44,'College_Station',''),
	(378,44,'Corpus_Christi',''),
	(379,44,'Dallas__Fort_Worth',''),
	(380,44,'Del_Rio__Eagle_Pass',''),
	(381,44,'East_TX',''),
	(382,44,'El_Paso',''),
	(383,44,'Galveston',''),
	(384,44,'Houston',''),
	(385,44,'Laredo',''),
	(386,44,'Lubbock',''),
	(387,44,'Odessa__Midland',''),
	(388,44,'San_Angelo',''),
	(389,44,'San_Antonio',''),
	(390,44,'San_Marcos',''),
	(391,44,'South_West_TX',''),
	(392,44,'Victoria',''),
	(393,44,'Waco',''),
	(394,44,'Wichita_Falls',''),
	(395,45,'Logan',''),
	(396,45,'Ogden',''),
	(397,45,'Provo__Orem',''),
	(398,45,'Saint_George',''),
	(399,45,'Salt_Lake_City',''),
	(400,45,'South_East_Utah',''),
	(401,46,'Burlington',''),
	(402,46,'Montpelier',''),
	(403,46,'Northern_VT',''),
	(404,46,'Rutland',''),
	(405,46,'Southern_VT',''),
	(406,47,'Alexandria__Arlington',''),
	(407,47,'Charlottesville',''),
	(408,47,'Danville',''),
	(409,47,'Fredericksburg',''),
	(410,47,'Harrisonburg',''),
	(411,47,'Lynchburg',''),
	(412,47,'New_River_Valley',''),
	(413,47,'Norfolk__Hampton_Roads',''),
	(414,47,'Richmond',''),
	(415,47,'Roanoke',''),
	(416,47,'South_Western_VA',''),
	(417,47,'Winchester',''),
	(418,48,'Bellingham',''),
	(419,48,'Kennewick__Pasco__Richland',''),
	(420,48,'Mosses_Lake',''),
	(421,48,'Olympic_Peninsula',''),
	(422,48,'Pullman',''),
	(423,48,'San_Juan_Island__Skagit_County',''),
	(424,48,'Seattle__Tacoma',''),
	(425,48,'Spokane',''),
	(426,48,'Wenatchee',''),
	(427,48,'Yakima',''),
	(428,49,'Charleston',''),
	(429,49,'Eastern_Panhandle',''),
	(430,49,'Huntington__Ashland',''),
	(431,49,'Morgantown',''),
	(432,49,'Northern_Panhandle',''),
	(433,49,'Parkersburg__Marietta__Vienna',''),
	(434,49,'Southern_WV',''),
	(435,50,'Eau_Claire',''),
	(436,50,'Green_Bay',''),
	(437,50,'La_Crosse',''),
	(438,50,'Madison',''),
	(439,50,'Milwaukee',''),
	(440,50,'Northern_WI',''),
	(441,51,'Eastern_WY',''),
	(442,51,'Western_WY','');

/*!40000 ALTER TABLE `barter_cities` ENABLE KEYS */;
UNLOCK TABLES;


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

LOCK TABLES `barter_connections` WRITE;
/*!40000 ALTER TABLE `barter_connections` DISABLE KEYS */;

INSERT INTO `barter_connections` (`connection_id`, `posting_id`, `user_id`, `connected_to`, `date_connected`, `times_connected`)
VALUES
	(1,84,1,1,'2012-01-02',2);

/*!40000 ALTER TABLE `barter_connections` ENABLE KEYS */;
UNLOCK TABLES;


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
  `photoLocale` varchar(30) DEFAULT NULL,
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

LOCK TABLES `barter_postings` WRITE;
/*!40000 ALTER TABLE `barter_postings` DISABLE KEYS */;

INSERT INTO `barter_postings` (`posting_id`, `user_id`, `state_id`, `city_id`, `specificLocale`, `offerCategory_id`, `offerTitle`, `offerPosting`, `needCategory_id`, `needTitle`, `needPosting`, `posting_date`, `photoLocale`, `oGSW`, `oEmailNotes`, `nEmailNotes`, `nMoney`, `nGSW`, `secCode`)
VALUES
	(84,1,38,331,'fds',40,'fd','d',66,'void','void','2012-01-02','1','g',2,1,2,'w','clear'),
	(90,1,38,331,'Portlond',34,'This is a title of a offer post #1','ZooFarooZooFarooZooFarooZooFarooZooFarooZooFarooZooFarooZooFarooZooFarooZooFarooZooFarooZooFarooZooFarooZooFarooZooFaroo',24,'ZooFarooZooFarooZooFarooZooFarooZooFarooZooFarooZooFaroo','ZooFarooZooFarooZooFarooZooFarooZooFarooZooFarooZooFarooZooFarooZooFarooZooFaroo','2012-01-02','38_1_011712_7sgrb4.jpg','s',2,2,1,'s','clear'),
	(92,1,34,295,'Yo Mama\'s House',46,'sdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfsfuck','sdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfs',9,'sdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsd','sdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfs','2012-01-02','5_1_011712_3d8dqv.jpg','g',2,2,2,'s','clear'),
	(93,1,38,331,'test',42,'tetet','etetee',66,'null','null','2012-01-02','38_1_011612_ph5zqs.jpg','g',2,0,2,'w','clear'),
	(94,1,38,331,'Po',36,'dads','asdsad',66,'null','null','2012-01-02','38_1_011712_5hhgbd.jpg','g',2,0,2,'w','clear'),
	(95,1,38,331,'Po',37,'asdasd','asdsa',66,'null','null','2012-01-02','38_1_011712_82b2tg.jpg','g',2,0,2,'w','clear'),
	(96,1,38,331,'Po',41,'asdasdas','asdasdasdasd',66,'null','null','2012-01-02','38_1_011712_wmk6jx.jpg','g',2,0,2,'w','clear'),
	(97,1,38,331,'Portlond',34,'This is a title of a offer post #1','ZooFarooZooFarooZooFarooZooFarooZooFarooZooFarooZooFarooZooFarooZooFarooZooFarooZooFarooZooFarooZooFarooZooFarooZooFaroo',24,'ZooFarooZooFarooZooFarooZooFarooZooFarooZooFarooZooFaroo','ZooFarooZooFarooZooFarooZooFarooZooFarooZooFarooZooFarooZooFarooZooFarooZooFaroo','2012-01-02','1','s',2,2,1,'s','clear'),
	(98,1,5,33,'test',46,'sdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfsfuck','sdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfs',9,'sdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsd','sdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfs','2012-01-02','5_1_011712_3d8dqv.jpg','g',2,2,2,'s','clear'),
	(99,1,38,331,'test',42,'tetet','etetee',66,'null','null','2012-01-02','38_1_011612_ph5zqs.jpg','g',2,0,2,'w','clear'),
	(100,1,38,331,'Po',36,'dads','asdsad',66,'null','null','2012-01-02','38_1_011712_5hhgbd.jpg','g',2,0,2,'w','clear'),
	(101,1,5,33,'test',46,'sdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfsfuck','sdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfs',9,'sdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsd','sdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfs','2012-01-02','5_1_011712_3d8dqv.jpg','g',2,2,2,'s','clear'),
	(102,1,38,331,'test',42,'tetet','etetee',66,'null','null','2012-01-02','38_1_011612_ph5zqs.jpg','g',2,0,2,'w','clear'),
	(103,1,5,33,'test',46,'sdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfsfuck','sdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfs',9,'sdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsd','sdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfs','2012-01-02','5_1_011712_3d8dqv.jpg','g',2,2,2,'s','clear'),
	(104,1,38,331,'test',42,'tetet','etetee',66,'null','null','2012-01-02','38_1_011612_ph5zqs.jpg','g',2,0,2,'w','clear'),
	(105,1,5,33,'test',46,'sdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfsfuck','sdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfs',9,'sdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsd','sdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfs','2012-01-02','5_1_011712_3d8dqv.jpg','g',2,2,2,'s','clear'),
	(106,1,5,33,'test',46,'sdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfsfuck','sdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfs',9,'sdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsd','sdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfs','2012-01-02','5_1_011712_3d8dqv.jpg','g',2,2,2,'s','clear'),
	(107,1,38,331,'test',42,'tetet','etetee',66,'null','null','2012-01-02','38_1_011612_ph5zqs.jpg','g',2,0,2,'w','clear'),
	(108,1,5,33,'test',46,'sdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfsfuck','sdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfs',9,'sdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsd','sdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfs','2012-01-02','5_1_011712_3d8dqv.jpg','g',2,2,2,'s','clear'),
	(109,1,38,331,'test',42,'tetet','etetee',66,'null','null','2012-01-02','38_1_011612_ph5zqs.jpg','g',2,0,2,'w','clear'),
	(110,1,5,33,'test',46,'sdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfsfuck','sdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfs',9,'sdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsd','sdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfs','2012-01-02','5_1_011712_3d8dqv.jpg','g',2,2,2,'s','clear'),
	(111,1,5,33,'test',46,'sdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfsfuck','sdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfs',9,'sdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsd','sdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfs','2012-01-02','5_1_011712_3d8dqv.jpg','g',2,2,2,'s','clear'),
	(112,1,38,331,'test',42,'tetet','etetee',66,'null','null','2012-01-02','38_1_011612_ph5zqs.jpg','g',2,0,2,'w','clear'),
	(113,1,5,33,'test',46,'sdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfsfuck','sdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfs',9,'sdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsd','sdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfs','2012-01-02','5_1_011712_3d8dqv.jpg','g',2,2,2,'s','clear'),
	(114,1,5,33,'test',46,'sdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfsfuck','sdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfs',9,'sdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsd','sdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfs','2012-01-02','5_1_011712_3d8dqv.jpg','g',2,2,2,'s','clear'),
	(115,1,38,331,'test',42,'tetet','etetee',66,'null','null','2012-01-02','38_1_011612_ph5zqs.jpg','g',2,0,2,'w','clear'),
	(116,1,5,33,'test',46,'sdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfsfuck','sdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfs',9,'sdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsd','sdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfs','2012-01-02','5_1_011712_3d8dqv.jpg','g',2,2,2,'s','clear'),
	(117,1,38,331,'test',42,'tetet','etetee',66,'null','null','2012-01-02','38_1_011612_ph5zqs.jpg','g',2,0,2,'w','clear'),
	(118,1,5,33,'test',46,'sdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfsfuck','sdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfs',9,'sdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsd','sdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfssdfsdfsdfs','2012-01-02','5_1_011712_3d8dqv.jpg','g',2,2,2,'s','clear'),
	(119,1,38,331,'test',42,'tetet','etetee',66,'null','null','2012-01-02','38_1_011612_ph5zqs.jpg','g',2,0,2,'w','clear'),
	(120,1,38,331,'test',42,'tetet','etetee',66,'null','null','2012-01-02','38_1_011612_ph5zqs.jpg','g',2,0,2,'w','clear'),
	(121,1,38,331,'test',42,'tetet','etetee',66,'null','null','2012-01-02','38_1_011612_ph5zqs.jpg','g',2,0,2,'w','clear'),
	(122,1,38,331,'test',42,'tetet','etetee',66,'null','null','2012-01-02','38_1_011612_ph5zqs.jpg','g',2,0,2,'w','clear'),
	(123,1,38,331,'test',42,'tetet','etetee',66,'null','null','2012-01-02','38_1_011612_ph5zqs.jpg','g',2,0,2,'w','clear'),
	(124,1,38,331,'test',42,'tetet','etetee',66,'null','null','2012-01-02','38_1_011612_ph5zqs.jpg','g',2,0,2,'w','clear'),
	(125,1,38,331,'test',42,'tetet','etetee',66,'null','null','2012-01-02','38_1_011612_ph5zqs.jpg','g',2,0,2,'w','clear'),
	(126,1,38,331,'test',42,'tetet','etetee',66,'null','null','2012-01-02','38_1_011612_ph5zqs.jpg','g',2,0,2,'w','clear'),
	(127,1,38,331,'test',42,'tetet','etetee',66,'null','null','2012-01-02','38_1_011612_ph5zqs.jpg','g',2,0,2,'w','clear'),
	(128,1,38,331,'test',42,'tetet','etetee',66,'null','null','2012-01-02','38_1_011612_ph5zqs.jpg','g',2,0,2,'w','clear'),
	(129,1,38,331,'test',42,'tetet','etetee',66,'null','null','2012-01-02','38_1_011612_ph5zqs.jpg','g',2,0,2,'w','clear'),
	(130,1,38,331,'test',42,'tetet','etetee',66,'null','null','2012-01-02','38_1_011612_ph5zqs.jpg','g',2,0,2,'w','clear');

/*!40000 ALTER TABLE `barter_postings` ENABLE KEYS */;
UNLOCK TABLES;


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

LOCK TABLES `barter_reviews` WRITE;
/*!40000 ALTER TABLE `barter_reviews` DISABLE KEYS */;

INSERT INTO `barter_reviews` (`review_id`, `user_id`, `reviewedBy_id`, `reviewTitle`, `reviewPost`, `recommend`, `date_reviewed`)
VALUES
	(1,1,2,'This guy is so awesome!','Man, oh man, this guy is totally cool and I want to be his best friend.  If you have the chance to become his best friend I suggest you take it, for I believe there is a waiting list.  Get in line man, this dude is super cool.',2,'2011-11-06'),
	(2,1,2,'This guy is so shitty!','boy, oh man, this guy is totally cool and I want to be his best friend.  If you have the chance to become his best friend I suggest you take it, for I believe there is a waiting list.  Get in line man, this dude is super cool.',1,'2011-11-06');

/*!40000 ALTER TABLE `barter_reviews` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table barter_states
# ------------------------------------------------------------

DROP TABLE IF EXISTS `barter_states`;

CREATE TABLE `barter_states` (
  `state_id` int(2) NOT NULL AUTO_INCREMENT,
  `state` varchar(30) DEFAULT '',
  PRIMARY KEY (`state_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `barter_states` WRITE;
/*!40000 ALTER TABLE `barter_states` DISABLE KEYS */;

INSERT INTO `barter_states` (`state_id`, `state`)
VALUES
	(1,'Alabama'),
	(2,'Alaska'),
	(3,'Arizona'),
	(4,'Arkansas'),
	(5,'California'),
	(6,'Colorado'),
	(7,'Connecticut'),
	(8,'Delaware'),
	(9,'District_of_Columbia'),
	(10,'Florida'),
	(11,'Georgia'),
	(12,'Hawaii'),
	(13,'Idaho'),
	(14,'Illinois'),
	(15,'Indiana'),
	(16,'Iowa'),
	(17,'Kansas'),
	(18,'Kentucky'),
	(19,'Louisiana'),
	(20,'Maine'),
	(21,'Maryland'),
	(22,'Massachusetts'),
	(23,'Michigan'),
	(24,'Minnesota'),
	(25,'Mississippi'),
	(26,'Missouri'),
	(27,'Montana'),
	(28,'Nebraska'),
	(29,'Nevada'),
	(30,'New_Hampshire'),
	(31,'New_Jersey'),
	(32,'New_Mexico'),
	(33,'New_York'),
	(34,'North_Carolina'),
	(35,'North_Dakota'),
	(36,'Ohio'),
	(37,'Oklahoma'),
	(38,'Oregon'),
	(39,'Pennsylvania'),
	(40,'Rhode_Island'),
	(41,'South_Carolina'),
	(42,'South_Dakota'),
	(43,'Tennessee'),
	(44,'Texas'),
	(45,'Utah'),
	(46,'Vermont'),
	(47,'Virginia'),
	(48,'Washington'),
	(49,'West_Virginia'),
	(50,'Wisconsin'),
	(51,'Wyoming');

/*!40000 ALTER TABLE `barter_states` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table barter_users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `barter_users`;

CREATE TABLE `barter_users` (
  `user_id` int(6) NOT NULL AUTO_INCREMENT,
  `email` varchar(50) DEFAULT NULL,
  `username` varchar(12) NOT NULL DEFAULT '',
  `password` varchar(60) DEFAULT NULL,
  `randKey` varchar(10) DEFAULT NULL,
  `secCode` varchar(16) DEFAULT NULL,
  `city` varchar(60) DEFAULT NULL,
  `state` int(2) DEFAULT NULL,
  `business` int(1) DEFAULT NULL,
  `facebook` varchar(50) DEFAULT NULL,
  `twitter` varchar(50) DEFAULT NULL,
  `google` varchar(50) DEFAULT NULL,
  `linkedin` varchar(50) DEFAULT NULL,
  `url` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  KEY `barter_users_state` (`state`),
  CONSTRAINT `barter_users_state` FOREIGN KEY (`state`) REFERENCES `barter_states` (`state_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `barter_users` WRITE;
/*!40000 ALTER TABLE `barter_users` DISABLE KEYS */;

INSERT INTO `barter_users` (`user_id`, `email`, `username`, `password`, `randKey`, `secCode`, `city`, `state`, `business`, `facebook`, `twitter`, `google`, `linkedin`, `url`)
VALUES
	(1,'joshua@provonchee.com','ZooFaroo','834106421053604455371528300881499765203209639889','CxtSySyYwO','jw4kvq','Portland',38,1,'http://www.facebook.com/ZooFaroo',NULL,'https://plus.google.com/103958829492703792482/post','http://www.linkedin.com/pub/joshua-provonchee/23/b','http://www.zoofaroo.com/'),
	(2,'joshua@yogoguide.com','FartKnocker','838286485885603459795238329146495265920288636603','CxtSySyYwO','fvr6y7','Portland',38,1,'http://www.facebook.com/ZooFaroo',NULL,'https://plus.google.com/103958829492703792482/post','http://www.linkedin.com/pub/joshua-provonchee/23/b','http://www.zoofaroo.com/');

/*!40000 ALTER TABLE `barter_users` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
