-- Add draft_status and application_number to all form tables
-- Run this in phpMyAdmin or MySQL Workbench

USE copems;

-- Add columns to bldg_owner table
ALTER TABLE `bldg_owner` 
ADD COLUMN IF NOT EXISTS `user_id` INT(11) NULL AFTER `bldg_owner_id`,
ADD COLUMN IF NOT EXISTS `draft_status` ENUM('draft', 'submitted') DEFAULT 'draft' AFTER `user_id`,
ADD COLUMN IF NOT EXISTS `application_number` VARCHAR(50) NULL AFTER `draft_status`,
ADD INDEX `idx_user_id` (`user_id`),
ADD INDEX `idx_draft_status` (`draft_status`),
ADD INDEX `idx_application_number` (`application_number`);

-- Add foreign key constraint
ALTER TABLE `bldg_owner` 
ADD CONSTRAINT `fk_bldg_owner_user` 
FOREIGN KEY (`user_id`) REFERENCES `user_account` (`User_ID`) ON DELETE CASCADE;

-- Add columns to bp_construction table
ALTER TABLE `bp_construction` 
ADD COLUMN IF NOT EXISTS `user_id` INT(11) NULL AFTER `bp_construction_id`,
ADD COLUMN IF NOT EXISTS `draft_status` ENUM('draft', 'submitted') DEFAULT 'draft' AFTER `user_id`,
ADD COLUMN IF NOT EXISTS `application_number` VARCHAR(50) NULL AFTER `draft_status`,
ADD INDEX `idx_user_id` (`user_id`),
ADD INDEX `idx_draft_status` (`draft_status`),
ADD INDEX `idx_application_number` (`application_number`);

ALTER TABLE `bp_construction` 
ADD CONSTRAINT `fk_bp_construction_user` 
FOREIGN KEY (`user_id`) REFERENCES `user_account` (`User_ID`) ON DELETE CASCADE;

-- Add columns to project_details table (if not already exists)
ALTER TABLE `project_details` 
ADD COLUMN IF NOT EXISTS `user_id` INT(11) NULL AFTER `Project_ID`,
ADD COLUMN IF NOT EXISTS `draft_status` ENUM('draft', 'submitted') DEFAULT 'draft' AFTER `user_id`,
ADD COLUMN IF NOT EXISTS `application_number` VARCHAR(50) NULL AFTER `draft_status`,
ADD INDEX `idx_user_id` (`user_id`),
ADD INDEX `idx_draft_status` (`draft_status`),
ADD INDEX `idx_application_number` (`application_number`);

ALTER TABLE `project_details` 
ADD CONSTRAINT `fk_project_details_user` 
FOREIGN KEY (`user_id`) REFERENCES `user_account` (`User_ID`) ON DELETE CASCADE;

-- Add columns to engineer_information table
ALTER TABLE `engineer_information` 
ADD COLUMN IF NOT EXISTS `user_id` INT(11) NULL AFTER `engineer_information_id`,
ADD COLUMN IF NOT EXISTS `draft_status` ENUM('draft', 'submitted') DEFAULT 'draft' AFTER `user_id`,
ADD COLUMN IF NOT EXISTS `application_number` VARCHAR(50) NULL AFTER `draft_status`,
ADD INDEX `idx_user_id` (`user_id`),
ADD INDEX `idx_draft_status` (`draft_status`),
ADD INDEX `idx_application_number` (`application_number`);

ALTER TABLE `engineer_information` 
ADD CONSTRAINT `fk_engineer_information_user` 
FOREIGN KEY (`user_id`) REFERENCES `user_account` (`User_ID`) ON DELETE CASCADE;

-- Create stored procedure to get draft data for a user
DROP PROCEDURE IF EXISTS GetUserDraftData;

DELIMITER $$
CREATE PROCEDURE GetUserDraftData(IN p_user_id INT)
BEGIN
  SELECT 
    'building_owner' as data_type,
    bo.*
  FROM bldg_owner bo
  WHERE bo.user_id = p_user_id 
  AND bo.draft_status = 'draft'
  ORDER BY bo.updated_at DESC
  LIMIT 1;
  
  SELECT 
    'construction' as data_type,
    bc.*
  FROM bp_construction bc
  WHERE bc.user_id = p_user_id 
  AND bc.draft_status = 'draft'
  ORDER BY bc.updated_at DESC
  LIMIT 1;
  
  SELECT 
    'project_details' as data_type,
    pd.*
  FROM project_details pd
  WHERE pd.user_id = p_user_id 
  AND pd.draft_status = 'draft'
  ORDER BY pd.updated_at DESC
  LIMIT 1;
  
  SELECT 
    'engineer_information' as data_type,
    ei.*
  FROM engineer_information ei
  WHERE ei.user_id = p_user_id 
  AND ei.draft_status = 'draft'
  ORDER BY ei.updated_at DESC
  LIMIT 1;
END$$

DELIMITER ;

-- Create stored procedure to finalize application (generate application number)
DROP PROCEDURE IF EXISTS FinalizeApplication;

DELIMITER $$
CREATE PROCEDURE FinalizeApplication(
  IN p_user_id INT,
  IN p_application_number VARCHAR(50)
)
BEGIN
  DECLARE EXIT HANDLER FOR SQLEXCEPTION
  BEGIN
    ROLLBACK;
    SELECT 'Error finalizing application' as error;
  END;
  
  START TRANSACTION;
  
  -- Update all tables to submitted status with application number
  UPDATE bldg_owner 
  SET draft_status = 'submitted', 
      application_number = p_application_number
  WHERE user_id = p_user_id 
  AND draft_status = 'draft';
  
  UPDATE bp_construction 
  SET draft_status = 'submitted', 
      application_number = p_application_number
  WHERE user_id = p_user_id 
  AND draft_status = 'draft';
  
  UPDATE project_details 
  SET draft_status = 'submitted', 
      application_number = p_application_number
  WHERE user_id = p_user_id 
  AND draft_status = 'draft';
  
  UPDATE engineer_information 
  SET draft_status = 'submitted', 
      application_number = p_application_number
  WHERE user_id = p_user_id 
  AND draft_status = 'draft';
  
  COMMIT;
  
  SELECT 'Application finalized successfully' as success, p_application_number as application_number;
END$$

DELIMITER ;

SELECT 'Draft system setup complete!' as Status;
