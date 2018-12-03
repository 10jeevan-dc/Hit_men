CREATE DATABASE Hit_men;

CREATE USER 'newuser'@'localhost' IDENTIFIED BY 'password';

GRANT ALL PRIVILEGES ON * . * TO 'username'@'localhost';

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `team` varchar(4) COLLATE utf8_unicode_ci NOT NULL,
  `score` int(11) DEFAULT 0,
  `done` boolean not NULL DEFAULT 0,
  `start_time` timestamp DEFAULT CURRENT_TIMESTAMP,
  `session_id` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `creator` boolean not null DEFAULT 0,
  `created_ts` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_ts` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`username`),
  KEY (`id`),
  FOREIGN KEY fk_session_id(`session_id`) REFERENCES sessions(`session_id`) ON UPDATE CASCADE ON DELETE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `sessions` (
  `session_id` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `created_ts` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `active` boolean not null default 1,
  `team_A` int(11) DEFAULT 0,
  `team_B` int(11) DEFAULT 0,
  `session_time` int(11) DEFAULT 30,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
