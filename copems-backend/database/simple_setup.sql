-- Simple Database Setup for COPEMS
-- Run this in phpMyAdmin or MySQL Workbench

-- Create database
CREATE DATABASE IF NOT EXISTS `copems` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `copems`;

-- Drop existing table if it exists
DROP TABLE IF EXISTS `user_account`;

-- Create user_account table with email verification
CREATE TABLE `user_account` (
  `User_ID` int(11) NOT NULL AUTO_INCREMENT,
  `Email_Account` varchar(100) NOT NULL,
  `Password_Account` varchar(255) NOT NULL,
  `Status` varchar(50) NOT NULL DEFAULT 'pending',
  `email_verified` tinyint(1) DEFAULT 0,
  `verification_token` varchar(255) DEFAULT NULL,
  `token_expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`User_ID`),
  UNIQUE KEY `unique_email` (`Email_Account`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Test data (optional - for testing)
-- INSERT INTO user_account (Email_Account, Password_Account, Status, email_verified) 
-- VALUES ('test@example.com', '$2a$10$hash...', 'active', 1);