-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 24, 2019 at 12:56 PM
-- Server version: 5.7.26-log
-- PHP Version: 7.2.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `wa`
--

-- --------------------------------------------------------

--
-- Table structure for table `alternative_name`
--

CREATE TABLE `alternative_name` (
  `anid` int(11) NOT NULL,
  `eid` int(11) NOT NULL,
  `aname` varchar(255) NOT NULL,
  `atype` int(11) NOT NULL DEFAULT '1',
  `astatus` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `archival_resources`
--

CREATE TABLE `archival_resources` (
  `arid` int(11) NOT NULL,
  `eid` int(11) NOT NULL,
  `ar_repository` varchar(255) DEFAULT NULL,
  `ar_title` varchar(255) NOT NULL,
  `ar_date` varchar(255) DEFAULT NULL,
  `ar_abstract` text,
  `ar_url` varchar(255) DEFAULT NULL,
  `ar_note` text,
  `ar_status` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `digital_resources`
--

CREATE TABLE `digital_resources` (
  `drid` int(11) NOT NULL,
  `eid` int(11) NOT NULL,
  `dr_title` varchar(255) NOT NULL,
  `dr_date` varchar(255) DEFAULT NULL,
  `dr_repository` varchar(255) DEFAULT NULL,
  `dr_url` varchar(255) DEFAULT NULL,
  `dr_note` text,
  `dr_status` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `entity`
--

CREATE TABLE `entity` (
  `eid` int(11) NOT NULL,
  `exist_eid` varchar(255) DEFAULT NULL,
  `type` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `subname` varchar(255) DEFAULT NULL,
  `start_date` varchar(255) DEFAULT NULL,
  `end_date` varchar(255) DEFAULT NULL,
  `birth_place` varchar(255) DEFAULT NULL,
  `birth_state` varchar(255) DEFAULT NULL,
  `birth_country` varchar(255) DEFAULT NULL,
  `death_place` varchar(255) DEFAULT NULL,
  `death_state` varchar(255) DEFAULT NULL,
  `death_country` varchar(255) DEFAULT NULL,
  `summary` text,
  `detail` text,
  `notes` text,
  `is_draft` tinyint(1) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  `photo` varchar(255) DEFAULT '/files/default.png',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_edit_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `entity_occupation`
--

CREATE TABLE `entity_occupation` (
  `eoid` int(11) NOT NULL,
  `eid` int(11) NOT NULL,
  `oid` int(11) NOT NULL,
  `eo_status` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `message`
--

CREATE TABLE `message` (
  `mid` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `type` int(11) NOT NULL,
  `content` varchar(1024) NOT NULL,
  `link` varchar(1024) NOT NULL,
  `time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `unread` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `occupation`
--

CREATE TABLE `occupation` (
  `oid` int(11) NOT NULL,
  `oname` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `published_resources`
--

CREATE TABLE `published_resources` (
  `prid` int(11) NOT NULL,
  `eid` int(11) NOT NULL,
  `pr_title` varchar(255) NOT NULL,
  `pr_publisher` varchar(255) DEFAULT NULL,
  `pr_url` varchar(255) DEFAULT NULL,
  `pr_date` varchar(255) DEFAULT NULL,
  `pr_note` text,
  `pr_status` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `related_entity`
--

CREATE TABLE `related_entity` (
  `roid` int(11) NOT NULL,
  `eid` int(11) NOT NULL,
  `related_eid` int(11) NOT NULL,
  `related_ename` varchar(255) NOT NULL,
  `related_etype` int(11) NOT NULL,
  `relationship` int(11) NOT NULL,
  `status_re` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `rid` int(11) NOT NULL,
  `role_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `uid` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `motivation` text,
  `experience` text,
  `enabled` int(1) NOT NULL DEFAULT '0',
  `invited` varchar(100) DEFAULT NULL,
  `msg` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `user_contribute`
--

CREATE TABLE `user_contribute` (
  `ucid` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `eid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `user_review`
--

CREATE TABLE `user_review` (
  `urid` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `eid` int(11) NOT NULL,
  `review_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `feedback` text,
  `status_name` int(11) NOT NULL DEFAULT '0',
  `status_start` int(11) NOT NULL DEFAULT '0',
  `status_end` int(11) NOT NULL DEFAULT '0',
  `status_summary` int(11) NOT NULL DEFAULT '0',
  `status_detail` int(11) NOT NULL DEFAULT '0',
  `status_notes` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `user_role`
--

CREATE TABLE `user_role` (
  `uid` int(11) NOT NULL,
  `rid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `alternative_name`
--
ALTER TABLE `alternative_name`
  ADD PRIMARY KEY (`anid`),
  ADD KEY `an_en` (`eid`);

--
-- Indexes for table `archival_resources`
--
ALTER TABLE `archival_resources`
  ADD PRIMARY KEY (`arid`),
  ADD KEY `ar_eid` (`eid`);

--
-- Indexes for table `digital_resources`
--
ALTER TABLE `digital_resources`
  ADD PRIMARY KEY (`drid`),
  ADD KEY `digital_resources` (`eid`);

--
-- Indexes for table `entity`
--
ALTER TABLE `entity`
  ADD PRIMARY KEY (`eid`);

--
-- Indexes for table `entity_occupation`
--
ALTER TABLE `entity_occupation`
  ADD PRIMARY KEY (`eoid`),
  ADD KEY `eoeid` (`eid`),
  ADD KEY `eooid` (`oid`);

--
-- Indexes for table `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`mid`),
  ADD KEY `message_uid` (`uid`);

--
-- Indexes for table `occupation`
--
ALTER TABLE `occupation`
  ADD PRIMARY KEY (`oid`);

--
-- Indexes for table `published_resources`
--
ALTER TABLE `published_resources`
  ADD PRIMARY KEY (`prid`),
  ADD KEY `publised_resource_eid` (`eid`);

--
-- Indexes for table `related_entity`
--
ALTER TABLE `related_entity`
  ADD PRIMARY KEY (`roid`),
  ADD KEY `re_b` (`related_eid`),
  ADD KEY `eid` (`eid`) USING BTREE;

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`rid`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`uid`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `email_2` (`email`);

--
-- Indexes for table `user_contribute`
--
ALTER TABLE `user_contribute`
  ADD PRIMARY KEY (`ucid`),
  ADD KEY `user_con_uid` (`uid`),
  ADD KEY `user_con_eid` (`eid`);

--
-- Indexes for table `user_review`
--
ALTER TABLE `user_review`
  ADD PRIMARY KEY (`urid`),
  ADD KEY `user_review_uid` (`uid`),
  ADD KEY `user_review_eid` (`eid`);

--
-- Indexes for table `user_role`
--
ALTER TABLE `user_role`
  ADD PRIMARY KEY (`uid`,`rid`),
  ADD KEY `user_role_rid` (`rid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `alternative_name`
--
ALTER TABLE `alternative_name`
  MODIFY `anid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `archival_resources`
--
ALTER TABLE `archival_resources`
  MODIFY `arid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `digital_resources`
--
ALTER TABLE `digital_resources`
  MODIFY `drid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `entity`
--
ALTER TABLE `entity`
  MODIFY `eid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `entity_occupation`
--
ALTER TABLE `entity_occupation`
  MODIFY `eoid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `message`
--
ALTER TABLE `message`
  MODIFY `mid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `occupation`
--
ALTER TABLE `occupation`
  MODIFY `oid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `published_resources`
--
ALTER TABLE `published_resources`
  MODIFY `prid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `related_entity`
--
ALTER TABLE `related_entity`
  MODIFY `roid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `rid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `uid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_contribute`
--
ALTER TABLE `user_contribute`
  MODIFY `ucid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_review`
--
ALTER TABLE `user_review`
  MODIFY `urid` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `alternative_name`
--
ALTER TABLE `alternative_name`
  ADD CONSTRAINT `an_en` FOREIGN KEY (`eid`) REFERENCES `entity` (`eid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `archival_resources`
--
ALTER TABLE `archival_resources`
  ADD CONSTRAINT `ar_eid` FOREIGN KEY (`eid`) REFERENCES `entity` (`eid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `digital_resources`
--
ALTER TABLE `digital_resources`
  ADD CONSTRAINT `digital_resources` FOREIGN KEY (`eid`) REFERENCES `entity` (`eid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `entity_occupation`
--
ALTER TABLE `entity_occupation`
  ADD CONSTRAINT `eoeid` FOREIGN KEY (`eid`) REFERENCES `entity` (`eid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `eooid` FOREIGN KEY (`oid`) REFERENCES `occupation` (`oid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `message`
--
ALTER TABLE `message`
  ADD CONSTRAINT `message_uid` FOREIGN KEY (`uid`) REFERENCES `user` (`uid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `published_resources`
--
ALTER TABLE `published_resources`
  ADD CONSTRAINT `publised_resource_eid` FOREIGN KEY (`eid`) REFERENCES `entity` (`eid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `related_entity`
--
ALTER TABLE `related_entity`
  ADD CONSTRAINT `re_a` FOREIGN KEY (`eid`) REFERENCES `entity` (`eid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `re_b` FOREIGN KEY (`related_eid`) REFERENCES `entity` (`eid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user_contribute`
--
ALTER TABLE `user_contribute`
  ADD CONSTRAINT `user_con_eid` FOREIGN KEY (`eid`) REFERENCES `entity` (`eid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_con_uid` FOREIGN KEY (`uid`) REFERENCES `user` (`uid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user_review`
--
ALTER TABLE `user_review`
  ADD CONSTRAINT `user_review_eid` FOREIGN KEY (`eid`) REFERENCES `entity` (`eid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_review_uid` FOREIGN KEY (`uid`) REFERENCES `user` (`uid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user_role`
--
ALTER TABLE `user_role`
  ADD CONSTRAINT `user_role_rid` FOREIGN KEY (`rid`) REFERENCES `role` (`rid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_role_uid` FOREIGN KEY (`uid`) REFERENCES `user` (`uid`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
