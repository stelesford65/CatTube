CREATE SCHEMA IF NOT EXISTS `CatTube` DEFAULT CHARACTER SET utf8 ;
USE `CatTube` ;

CREATE TABLE IF NOT EXISTS Videos (
  videoId VARCHAR(20) primary key NOT NULL,
  videoTitle VARCHAR(20) not null);

CREATE TABLE IF NOT EXISTS User (
  userId INT primary key auto_increment NOT NULL,
  name VARCHAR(45) NULL);

CREATE TABLE IF NOT EXISTS Comments (
  commentId INT NOT NULL primary key AUTO_INCREMENT,
  content VARCHAR(100) NOT NULL,
  author INT NULL,
  FOREIGN KEY fk_Comments_User (author) REFERENCES User(UserId),
  time DATETIME NOT NULL,
  videoId VARCHAR(20) NOT NULL,
  FOREIGN KEY fk_Comments_Videos (videoId) REFERENCES Videos(videoId));