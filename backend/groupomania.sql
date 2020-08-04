/*
MySQL Data Transfer
Source Host: localhost
Source Database: groupomania
Target Host: localhost
Target Database: groupomania
Date: 04.08.2020 16:07:44
*/

SET FOREIGN_KEY_CHECKS=0;
-- ----------------------------
-- Table structure for comments
-- ----------------------------
DROP TABLE IF EXISTS `comments`;
CREATE TABLE `comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `PostId` int(11) DEFAULT NULL,
  `UserId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `PostId` (`PostId`),
  KEY `UserId` (`UserId`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`PostId`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=199 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for posts
-- ----------------------------
DROP TABLE IF EXISTS `posts`;
CREATE TABLE `posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` text,
  `content` text,
  `url_image` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `UserId` (`UserId`),
  CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstname` text,
  `lastname` text,
  `mail` text,
  `mdp` text,
  `admin` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `pseudo` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records 
-- ----------------------------
INSERT INTO `comments` VALUES ('97', 'Superbe initiative, merci !', '2020-07-31 15:12:54', '2020-07-31 15:12:54', '45', '37');
INSERT INTO `comments` VALUES ('99', 'Merci pour le partage !', '2020-07-31 15:15:55', '2020-07-31 15:15:55', '47', '32');
INSERT INTO `comments` VALUES ('100', 'Très belle entreprise effectivement !', '2020-07-31 15:19:16', '2020-07-31 15:19:16', '48', '31');
INSERT INTO `comments` VALUES ('101', 'Avec plaisir ! Faisons la évoluer ensemble !', '2020-07-31 15:20:22', '2020-07-31 15:20:22', '45', '31');
INSERT INTO `comments` VALUES ('104', 'Très bon framework ', '2020-07-31 16:14:06', '2020-07-31 16:14:06', '47', '33');
INSERT INTO `comments` VALUES ('107', 'Top !', '2020-07-31 16:36:21', '2020-07-31 16:36:21', '48', '32');
INSERT INTO `comments` VALUES ('108', 'Merci beaucoup pour ce nouveau moyen de communication !', '2020-08-01 11:44:52', '2020-08-01 11:44:52', '45', '38');
INSERT INTO `comments` VALUES ('111', 'Un superbe engin.. même pour un 3 roues ! ', '2020-08-01 12:05:30', '2020-08-01 12:05:30', '61', '39');
INSERT INTO `comments` VALUES ('112', 'Bien vu ! ;)', '2020-08-01 12:06:21', '2020-08-01 12:06:21', '61', '40');
INSERT INTO `comments` VALUES ('194', 'Absolument magnifique, j\'ai hâte !', '2020-08-03 14:09:29', '2020-08-03 14:09:29', '64', '32');
INSERT INTO `comments` VALUES ('195', 'Effectivement, vraiment magnifique !', '2020-08-03 14:13:10', '2020-08-03 14:13:10', '64', '33');
INSERT INTO `comments` VALUES ('196', 'Génial !', '2020-08-03 14:15:11', '2020-08-03 14:15:11', '45', '32');
INSERT INTO `posts` VALUES ('45', 'Bienvenu sur notre tout nouveau réseau interne !', 'Bienvenu à toutes et tous sur notre nouveau Réseau social d\'entreprise ! Partagez vos articles avec ou sans image et commentez les publications de vos collègues ! ', 'http://localhost:3000/images/icon-above-font.png1596182005769.png', '2020-07-31 07:53:25', '2020-07-31 07:53:25', '31');
INSERT INTO `posts` VALUES ('47', 'Cette application tourne sous Angular !', 'Angular est un cadriciel côté client, open source, basé sur TypeScript, et co-dirigé par l\'équipe du projet « Angular » à Google et par une communauté de particuliers et de sociétés. Angular est une réécriture complète de AngularJS, cadriciel construit par la même équipe.', 'http://localhost:3000/images/angularjs.png1596208495288.png', '2020-07-31 15:14:55', '2020-07-31 15:14:55', '37');
INSERT INTO `posts` VALUES ('48', 'Découvrez JobCloud, le leader de l\'emploi en Suisse !', 'JobCLoud est l’entreprise digitale leader du marché de l’emploi en Suisse, également connue pour les plateformes d’emploi jobs.ch et jobup.ch, qui rapprochent chaque jour des millions de candidats de leur futur job.', 'http://localhost:3000/images/E3A9E30C-3A27-4564-ACBD-E8E4691AEF32.png1596208698521.png', '2020-07-31 15:18:18', '2020-07-31 15:18:18', '32');
INSERT INTO `posts` VALUES ('61', 'Mon nouveau moyen de transport !', 'Vous aussi vous en avez marre de rester coincé dans les bouchons? Et bien faites comme moi ! Craquez pour un Piaggio Mp3 (300 ou 500 cc). Il se conduit simplement avec le permis B et la formation de 7h pour les 125cc ! A vous le 2 roues..enfin le 3 roues !', 'http://localhost:3000/images/essai-action-Piaggio-MP3-2019-5.jpg1596283276000.jpg', '2020-08-01 12:01:16', '2020-08-01 12:01:16', '38');
INSERT INTO `posts` VALUES ('64', 'Nos futurs locaux !', 'Bonjour à tous, après de nombreuses consultations, voici un aperçu de nos futurs locaux !\nUn design futuriste et un maximum de confort pour nos salariés !\nLe début des travaux est prévu pour le premier semestre 2021 !\nNous vous tiendrons informé de la suite !', 'http://localhost:3000/images/Rolex-Learning-Center-nuit-exterieur-1024x576.jpg1596463743029.jpg', '2020-08-03 14:09:03', '2020-08-03 14:09:03', '31');
INSERT INTO `users` VALUES ('31', 'Ressources', 'Humaines', 'admin@groupomania.com', '$2b$10$iTsEg6nQV9Ym43x0rdvNcuamQayy59Nps/gHzuJ7xszrPMDA1dHUy', '1', '2020-07-31 07:46:33', '2020-07-31 07:46:33', null);
INSERT INTO `users` VALUES ('32', 'Morgan', 'Boudens', 'morgan.boudens@gmail.com', '$2b$10$IltZtzOUatF62mK25Tr7peZv7AZRGaQKZhsL9DJuOlyhY76yS.0GW', '0', '2020-07-31 07:49:49', '2020-07-31 07:49:49', null);
INSERT INTO `users` VALUES ('33', 'Tanguy', 'Collin', 'tanguy.collin@groupomania.com', '$2b$10$t48eHordbpBSCLLsH8nvu.9zOTNLVJ6Te5XDbtvzEyVwnsykXhYPa', '0', '2020-07-31 07:55:37', '2020-07-31 07:55:37', null);
INSERT INTO `users` VALUES ('34', 'Bernard', 'Dupond', 'bernard.dupond@groupomania.com', '$2b$10$DE7QS8rDM9KCg2V7jHNy/OuuqHiwzOVKdNzIG3cWCXcKvANw1U.6i', '0', '2020-07-31 07:56:04', '2020-07-31 07:56:04', null);
INSERT INTO `users` VALUES ('35', 'Patrick', 'Balani', 'patrick.balani@groupomania.com', '$2b$10$1gWpQGnJvtTs4BbwJLiem./31At9V1VX22cZkkmy0GoZ6qxcYfKrG', '0', '2020-07-31 07:56:32', '2020-07-31 07:56:32', null);
INSERT INTO `users` VALUES ('36', 'Michel', 'Jonas', 'michel.jonas@groupomania.com', '$2b$10$dzBUIvghWTRv1aJULjyjQO9Y/CW41GoQZa.qlwUmxkTK2OBLyKsEO', '0', '2020-07-31 10:21:25', '2020-07-31 10:21:25', null);
INSERT INTO `users` VALUES ('37', 'John', 'Doe', 'john.doe@groupomania.com', '$2b$10$aFZXwDlVrf5VVi1EDxFbWuZ7FtFRb5DdQdFZcz1nCyiuIRWC26fUW', '0', '2020-07-31 15:12:35', '2020-07-31 15:12:35', null);
INSERT INTO `users` VALUES ('38', 'Pascal', 'Latour', 'pascal.latour@groupomania.com', '$2b$10$BYytBr/J2NxH7RCTf0v9hOqzfrqk0yOF666G8bWH1.2q1NCZJDQLK', '0', '2020-08-01 11:41:53', '2020-08-01 11:41:53', null);
INSERT INTO `users` VALUES ('39', 'Didier', 'Latour', 'didier.latour@groupomania.com', '$2b$10$JezdlAtYMsup1lmuntShoubHl1TgvRYgDVsjVZmk4SgOwmfdMP.vO', '0', '2020-08-01 12:05:09', '2020-08-01 12:05:09', null);
INSERT INTO `users` VALUES ('40', 'Bernard', 'Latour', 'bernard.latour@groupomania.com', '$2b$10$CkRYlEJUD5gGefFfiTeN8ejXnzzCCuvaqzzbM5TLCLJ6E66Fd44z2', '0', '2020-08-01 12:05:57', '2020-08-01 12:05:57', null);
INSERT INTO `users` VALUES ('41', 'Quentin', 'Tarantino', 'quentin.tarantino@groupomania.com', '$2b$10$qEiLjqd.Y2VuDwMgqfDaUuZdcjCVyo/dA3ezyA2kTSTBMO0eY4trG', '0', '2020-08-03 14:10:24', '2020-08-03 14:10:24', null);
