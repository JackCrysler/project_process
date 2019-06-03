-- 这是老师
drop table if exists `teachers`;
CREATE TABLE IF NOT EXISTS `teachers`(
   `tid` varchar(50) NOT NULL UNIQUE,
   `teacher_name` VARCHAR(30) NOT NULL UNIQUE,
   `teacher_pwd` VARCHAR(100) NOT NULL,
   `create_time` DATETIME default LOCALTIMESTAMP(),
   PRIMARY KEY ( `tid` )
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 这是班级
drop table if exists `classes`;
CREATE TABLE IF NOT EXISTS `classes`(
   `cid` varchar(50) NOT NULL UNIQUE,
   `class_name` VARCHAR(10) NOT NULL UNIQUE,
   `class_info` VARCHAR(255) default "",
   `create_time` DATETIME default LOCALTIMESTAMP(),
   `tid` varchar(50) NOT NULL,
   `teacher_name` varchar(50) default '',
   PRIMARY KEY ( `cid` )
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 学生表
drop table if exists `students`;
CREATE TABLE IF NOT EXISTS `students`(
   `sid` varchar(50) NOT NULL UNIQUE,
   `user_name` VARCHAR(30) NOT NULL UNIQUE,
   `user_pwd` VARCHAR(100) NOT NULL,
   `phone` VARCHAR(100) NOT NULL,
   `nickname` VARCHAR(100) DEFAULT "",
   `status` tinyint(1) DEFAULT 1,
   `age` int DEFAULT 1,
   `cid` varchar(50) default null,
   `role` tinyint(1) DEFAULT 2 comment '组长:1 组员:2',
   `gender` tinyint(1) DEFAULT 0 comment '1-男 2-女',
   `create_time` DATETIME default LOCALTIMESTAMP(),
   PRIMARY KEY ( `sid` )
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- drop table if exists `users`;
-- CREATE TABLE IF NOT EXISTS `users`(
--    `id` INT UNSIGNED AUTO_INCREMENT,
--    `user_id` varchar(30) NOT NULL UNIQUE,
--    `identity` tinyint NOT NULL ,
--    `user_name` VARCHAR(30) NOT NULL '',
--    `user_pwd` VARCHAR(20) NOT NULL,
--    `user_class` VARCHAR(6) DEFAULT '',
--    `create_time` timestamp DEFAULT CURRENT_TIMESTAMP(),
--    PRIMARY KEY ( `id` )
-- )ENGINE=InnoDB DEFAULT CHARSET=utf8;
