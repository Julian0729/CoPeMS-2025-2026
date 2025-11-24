-- =============================================
-- COPEMS Database Setup - Run in phpMyAdmin
-- =============================================

-- Create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS `copems` 
DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

USE `copems`;

-- Drop existing table to recreate with proper structure
DROP TABLE IF EXISTS `user_account`;

-- Create user_account table with email verification support
CREATE TABLE `user_account` (
  `User_ID` int(11) NOT NULL AUTO_INCREMENT,
  `Email_Account` varchar(100) NOT NULL,
  `Password_Account` varchar(255) NOT NULL,
  `Status` varchar(50) NOT NULL DEFAULT 'pending',
  `email_verified` BOOLEAN DEFAULT FALSE,
  `verification_token` VARCHAR(255) NULL,
  `token_expires_at` TIMESTAMP NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`User_ID`),
  UNIQUE KEY `unique_email` (`Email_Account`),
  INDEX `idx_verification_token` (`verification_token`),
  INDEX `idx_email_verified` (`email_verified`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- =============================================
-- Stored Procedure: RegisterUser
-- =============================================
DROP PROCEDURE IF EXISTS RegisterUser;

DELIMITER $$
CREATE PROCEDURE RegisterUser(
    IN p_email VARCHAR(100),
    IN p_password VARCHAR(255),
    IN p_verification_token VARCHAR(255),
    OUT p_user_id INT,
    OUT p_success BOOLEAN,
    OUT p_message VARCHAR(255)
)
BEGIN
    DECLARE user_exists INT DEFAULT 0;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SET p_success = FALSE;
        SET p_message = 'Database error occurred during registration';
    END;

    START TRANSACTION;

    -- Check if email already exists
    SELECT COUNT(*) INTO user_exists 
    FROM user_account 
    WHERE Email_Account = p_email;

    IF user_exists > 0 THEN
        SET p_success = FALSE;
        SET p_message = 'Email already registered';
        SET p_user_id = NULL;
    ELSE
        -- Insert new user
        INSERT INTO user_account (
            Email_Account, 
            Password_Account, 
            Status, 
            email_verified, 
            verification_token, 
            token_expires_at
        ) VALUES (
            p_email, 
            p_password, 
            'pending', 
            FALSE, 
            p_verification_token, 
            DATE_ADD(NOW(), INTERVAL 24 HOUR)
        );
        
        SET p_user_id = LAST_INSERT_ID();
        SET p_success = TRUE;
        SET p_message = 'User registered successfully. Please verify your email.';
    END IF;

    COMMIT;
END$$
DELIMITER ;

-- =============================================
-- Stored Procedure: VerifyEmail
-- =============================================
DROP PROCEDURE IF EXISTS VerifyEmail;

DELIMITER $$
CREATE PROCEDURE VerifyEmail(
    IN p_token VARCHAR(255),
    OUT p_user_id INT,
    OUT p_success BOOLEAN,
    OUT p_message VARCHAR(255)
)
BEGIN
    DECLARE user_count INT DEFAULT 0;
    DECLARE token_expired BOOLEAN DEFAULT FALSE;
    
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SET p_success = FALSE;
        SET p_message = 'Database error occurred during verification';
    END;

    START TRANSACTION;

    -- Check if token exists and is not expired
    SELECT 
        User_ID,
        CASE WHEN token_expires_at < NOW() THEN TRUE ELSE FALSE END
    INTO p_user_id, token_expired
    FROM user_account 
    WHERE verification_token = p_token 
    AND email_verified = FALSE
    LIMIT 1;

    IF p_user_id IS NULL THEN
        SET p_success = FALSE;
        SET p_message = 'Invalid verification token';
    ELSEIF token_expired THEN
        SET p_success = FALSE;
        SET p_message = 'Verification token has expired';
    ELSE
        -- Update user as verified
        UPDATE user_account 
        SET email_verified = TRUE, 
            verification_token = NULL, 
            token_expires_at = NULL,
            Status = 'active',
            updated_at = NOW()
        WHERE User_ID = p_user_id;
        
        SET p_success = TRUE;
        SET p_message = 'Email verified successfully';
    END IF;

    COMMIT;
END$$
DELIMITER ;

-- =============================================
-- Stored Procedure: LoginUser
-- =============================================
DROP PROCEDURE IF EXISTS LoginUser;

DELIMITER $$
CREATE PROCEDURE LoginUser(
    IN p_email VARCHAR(100),
    IN p_password VARCHAR(255),
    OUT p_user_id INT,
    OUT p_success BOOLEAN,
    OUT p_message VARCHAR(255),
    OUT p_email_verified BOOLEAN
)
BEGIN
    -- Get user information
    SELECT 
        User_ID, 
        email_verified
    INTO p_user_id, p_email_verified
    FROM user_account 
    WHERE Email_Account = p_email 
    AND Password_Account = p_password
    AND Status = 'active'
    LIMIT 1;

    IF p_user_id IS NULL THEN
        SET p_success = FALSE;
        SET p_message = 'Invalid email or password';
        SET p_email_verified = FALSE;
    ELSEIF p_email_verified = FALSE THEN
        SET p_success = FALSE;
        SET p_message = 'Please verify your email before logging in';
    ELSE
        SET p_success = TRUE;
        SET p_message = 'Login successful';
    END IF;
END$$
DELIMITER ;

-- =============================================
-- Test the setup
-- =============================================
-- You can test with this query:
-- CALL RegisterUser('test@example.com', 'hashedpassword', 'testtoken123', @uid, @success, @msg);
-- SELECT @uid, @success, @msg;