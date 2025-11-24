-- Updated Database Schema for COPEMS with Email Verification Support
-- Run this SQL to update your existing database

-- First, let's modify the existing user_account table to support email verification
ALTER TABLE `user_account` 
ADD COLUMN `email_verified` BOOLEAN DEFAULT FALSE AFTER `Status`,
ADD COLUMN `verification_token` VARCHAR(255) NULL AFTER `email_verified`,
ADD COLUMN `token_expires_at` TIMESTAMP NULL AFTER `verification_token`,
MODIFY COLUMN `Password_Account` VARCHAR(255) NOT NULL; -- Increased length for hashed passwords

-- Or if you want to recreate the table with the new structure:
/*
DROP TABLE IF EXISTS `user_account`;

CREATE TABLE `user_account` (
  `User_ID` int(11) NOT NULL AUTO_INCREMENT,
  `Email_Account` varchar(100) NOT NULL UNIQUE,
  `Password_Account` varchar(255) NOT NULL,
  `Status` text NOT NULL DEFAULT 'active',
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
*/

-- Create stored procedures for user management

-- Procedure to register a new user
DELIMITER //
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
END //
DELIMITER ;

-- Procedure to verify email
DELIMITER //
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
END //
DELIMITER ;

-- Procedure for user login
DELIMITER //
CREATE PROCEDURE LoginUser(
    IN p_email VARCHAR(100),
    IN p_password VARCHAR(255),
    OUT p_user_id INT,
    OUT p_success BOOLEAN,
    OUT p_message VARCHAR(255),
    OUT p_email_verified BOOLEAN
)
BEGIN
    DECLARE user_count INT DEFAULT 0;
    
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
END //
DELIMITER ;

-- Procedure to clean up expired tokens (run this periodically)
DELIMITER //
CREATE PROCEDURE CleanupExpiredTokens()
BEGIN
    DELETE FROM user_account 
    WHERE email_verified = FALSE 
    AND token_expires_at < NOW()
    AND created_at < DATE_SUB(NOW(), INTERVAL 7 DAY); -- Keep for 7 days before cleanup
END //
DELIMITER ;

-- Create an event to automatically clean up expired tokens daily
-- (Optional - requires event scheduler to be enabled)
/*
CREATE EVENT IF NOT EXISTS cleanup_expired_tokens
ON SCHEDULE EVERY 1 DAY
STARTS CURRENT_TIMESTAMP
DO CALL CleanupExpiredTokens();
*/