DROP DATABASE IF EXISTS sleepmate;
CREATE DATABASE IF NOT EXISTS sleepmate;
USE sleepmate;

CREATE TABLE `member` (
	`member_seq` BIGINT NOT NULL AUTO_INCREMENT,
	`email` VARCHAR(255) NOT NULL,
	`nickname` VARCHAR(20) NOT NULL,
	`gender` VARCHAR(6) NULL,
	`age_range` VARCHAR(5) NULL,
	`has_watch` BOOLEAN NOT NULL DEFAULT FALSE,
	`no_survey` BOOLEAN NOT NULL DEFAULT FALSE,
	`alarm` TIME NOT NULL DEFAULT '07:30:00',
    `height` INT NOT NULL,
    `weight` DOUBLE NOT NULL,
    `kakao_id` BIGINT NOT NULL,
    `visit` BOOLEAN NOT NULL,
    PRIMARY KEY (`member_seq`)
);

CREATE TABLE `video_order` (
	`video_order_seq` BIGINT NOT NULL AUTO_INCREMENT,
	`member_seq` BIGINT NOT NULL,
	`posture` INT NOT NULL,
	`start_time` DATETIME NOT NULL,
	`end_time` DATETIME NOT NULL,
	`capture` VARCHAR(255) NOT NULL,
    `sleep_date` DATE NOT NULL,
    PRIMARY KEY (`video_order_seq`),
    KEY `fk_member_seq_vo_idx` (`member_seq`),
    CONSTRAINT `member_seq_vo` FOREIGN KEY (`member_seq`) REFERENCES `member` (`member_seq`)
);

CREATE TABLE `video_record` (
	`video_seq` BIGINT NOT NULL AUTO_INCREMENT,
	`member_seq` BIGINT NOT NULL,
	`time` DATETIME	NOT NULL DEFAULT NOW(),
	`posture` INT NOT NULL,
	`capture` VARCHAR(255) NOT NULL,
    `sleep_date` DATE NOT NULL,
    PRIMARY KEY (`video_seq`),
    KEY `fk_member_seq_vr_idx` (`member_seq`),
    CONSTRAINT `member_seq_vr` FOREIGN KEY (`member_seq`) REFERENCES `member` (`member_seq`)
);

CREATE TABLE `heart_rate_record` (
	`heart_rate_seq` BIGINT NOT NULL AUTO_INCREMENT,
	`member_seq` BIGINT NOT NULL,
	`heart_rate` DOUBLE NOT NULL,
	`time` DATETIME NOT NULL DEFAULT NOW(),
    `sleep_date` DATE NOT NULL,
    PRIMARY KEY (`heart_rate_seq`),
    KEY `fk_member_seq_hrr_idx` (`member_seq`),
    CONSTRAINT `member_seq_hrr` FOREIGN KEY (`member_seq`) REFERENCES `member` (`member_seq`)
);

CREATE TABLE `lux_record` (
	`lux_seq` BIGINT NOT NULL AUTO_INCREMENT,
	`member_seq` BIGINT NOT NULL,
	`lux` INT NOT NULL,
	`time` DATETIME NOT NULL DEFAULT NOW(),
    `sleep_date` DATE NOT NULL,
    PRIMARY KEY (`lux_seq`),
    KEY `fk_member_seq_lr_idx` (`member_seq`),
    CONSTRAINT `member_seq_lr` FOREIGN KEY (`member_seq`) REFERENCES `member` (`member_seq`)
);

CREATE TABLE `accelerometer_record` (
	`accelerometer_seq` BIGINT NOT NULL AUTO_INCREMENT,
	`member_seq` BIGINT NOT NULL,
	`m_value` DOUBLE NOT NULL,
	`time` DATETIME NOT NULL DEFAULT NOW(),
    `sleep_date` DATE NOT NULL,
    PRIMARY KEY (`accelerometer_seq`),
    KEY `fk_member_seq_ar_idx` (`member_seq`),
    CONSTRAINT `member_seq_ar` FOREIGN KEY (`member_seq`) REFERENCES `member` (`member_seq`)
);
