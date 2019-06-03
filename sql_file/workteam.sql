drop table if EXISTS `tasks`;
drop table if EXISTS `members`;
drop table if EXISTS `teams`;
drop table if EXISTS `projects`;

CREATE TABLE IF NOT EXISTS `projects`(
   `project_id` varchar(50) NOT NULL UNIQUE,
   `cid` varchar(50) NOT NULL,
   `project_name` VARCHAR(100) NOT NULL UNIQUE,
   `project_description` VARCHAR(100) DEFAULT '',
   `create_time` DATETIME default LOCALTIMESTAMP(),
   PRIMARY KEY ( `project_id` ),
   FOREIGN KEY (`cid`) REFERENCES classes(`cid`),
   UNIQUE KEY `cpd`(`cid`,`project_id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `teams`(
   `id` INT UNSIGNED AUTO_INCREMENT,
   `team_id` VARCHAR(100) NOT NULL UNIQUE,
   `project_id` varchar(50) NOT NULL,
   `team_name` VARCHAR(100) NOT NULL,
   `team_gitadress` VARCHAR(100) DEFAULT '' UNIQUE,
   `create_time` DATETIME default LOCALTIMESTAMP(),
   PRIMARY KEY ( `id` ),
   FOREIGN KEY (`project_id`) REFERENCES projects(`project_id`),
   UNIQUE KEY `pid_tname`(`project_id`,`team_name`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 0: teacher  1: 组长  2:组员

CREATE TABLE IF NOT EXISTS `members`(
   `id` INT(7) UNSIGNED zerofill AUTO_INCREMENT,
   `member_id` varchar(50) NOT NULL UNIQUE,
   `member_name` VARCHAR(100) NOT NULL,
   `identity` tinyint NOT NULL,
   `potriat` VARCHAR(100) default '',
   `team_id` VARCHAR(100) NOT NULL,
   PRIMARY KEY ( `id` ),
   FOREIGN KEY (`team_id`) REFERENCES teams(`team_id`),
   UNIQUE KEY `team_id_member_name`(`team_id`,`member_name`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 0:todo 1:doing  2: done

CREATE TABLE IF NOT EXISTS `tasks`(
   `tid` INT(8) UNSIGNED zerofill AUTO_INCREMENT,
   `task_name` VARCHAR(100) NOT NULL,
   `sid` varchar(50) NOT NULL UNIQUE,
   `task_status` tinyint default 0,
   `task_checked` tinyint default 0,
   `check_person` VARCHAR(100) default '',
   `member_id` varchar(50) NOT NULL,
   `team_id` varchar(50) NOT NULL,
   `project_id` varchar(50) NOT NULL,
   PRIMARY KEY ( `tid` ),
   FOREIGN KEY (`member_id`) REFERENCES members(`member_id`),
   UNIQUE KEY `mid_task_name`(`member_id`,`task_name`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

