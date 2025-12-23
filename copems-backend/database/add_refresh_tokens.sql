-- Add refresh_tokens table for JWT authentication
-- Run this SQL in your MySQL database

-- Create refresh_tokens table
CREATE TABLE IF NOT EXISTS `refresh_tokens` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `token` varchar(500) NOT NULL,
  `expires_at` timestamp NOT NULL,
  `revoked` tinyint(1) NOT NULL DEFAULT 0,
  `revoked_reason` varchar(100) DEFAULT NULL,
  `revoked_at` timestamp NULL DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` varchar(500) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `token` (`token`),
  KEY `user_id` (`user_id`),
  KEY `expires_at` (`expires_at`),
  KEY `user_id_revoked` (`user_id`, `revoked`),
  CONSTRAINT `refresh_tokens_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `user_account` (`User_ID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Add last_login column to user_account table if it doesn't exist
ALTER TABLE `user_account` 
ADD COLUMN IF NOT EXISTS `last_login` timestamp NULL DEFAULT NULL;

-- Create index on last_login for performance
CREATE INDEX IF NOT EXISTS `idx_last_login` ON `user_account` (`last_login`);
