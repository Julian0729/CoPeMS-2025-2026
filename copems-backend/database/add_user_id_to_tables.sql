-- =============================================
-- COPEMS Security Update - Add user_id to all tables
-- Run this script in phpMyAdmin SQL tab
-- =============================================

USE copems;

-- =============================================
-- Add user_id to bldg_owner
-- =============================================
SET @table_name = 'bldg_owner';
SET @column_check = (
    SELECT COUNT(*) 
    FROM INFORMATION_SCHEMA.COLUMNS 
    WHERE TABLE_SCHEMA = 'copems' 
    AND TABLE_NAME = 'bldg_owner' 
    AND COLUMN_NAME = 'user_id'
);

SET @sql_add_column = IF(
    @column_check = 0,
    'ALTER TABLE bldg_owner ADD COLUMN user_id INT UNSIGNED NOT NULL AFTER bldg_owner_id',
    'SELECT "user_id already exists in bldg_owner" AS message'
);
PREPARE stmt FROM @sql_add_column;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Add foreign key if column was just added or FK doesn't exist
SET @fk_check = (
    SELECT COUNT(*) 
    FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE 
    WHERE TABLE_SCHEMA = 'copems' 
    AND TABLE_NAME = 'bldg_owner' 
    AND COLUMN_NAME = 'user_id'
    AND REFERENCED_TABLE_NAME IS NOT NULL
);

SET @sql_add_fk = IF(
    @fk_check = 0 AND @column_check >= 0,
    'ALTER TABLE bldg_owner ADD FOREIGN KEY (user_id) REFERENCES user_account(User_ID) ON DELETE CASCADE',
    'SELECT "FK already exists or column missing" AS message'
);
PREPARE stmt FROM @sql_add_fk;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Add timestamps if they don't exist
ALTER TABLE bldg_owner 
ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

SELECT '✅ bldg_owner updated' AS Status;

-- =============================================
-- Add user_id to bp_construction
-- =============================================
SET @column_check = (
    SELECT COUNT(*) 
    FROM INFORMATION_SCHEMA.COLUMNS 
    WHERE TABLE_SCHEMA = 'copems' 
    AND TABLE_NAME = 'bp_construction' 
    AND COLUMN_NAME = 'user_id'
);

SET @sql_add_column = IF(
    @column_check = 0,
    'ALTER TABLE bp_construction ADD COLUMN user_id INT UNSIGNED NOT NULL AFTER bp_construction_id',
    'SELECT "user_id already exists in bp_construction" AS message'
);
PREPARE stmt FROM @sql_add_column;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @fk_check = (
    SELECT COUNT(*) 
    FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE 
    WHERE TABLE_SCHEMA = 'copems' 
    AND TABLE_NAME = 'bp_construction' 
    AND COLUMN_NAME = 'user_id'
    AND REFERENCED_TABLE_NAME IS NOT NULL
);

SET @sql_add_fk = IF(
    @fk_check = 0 AND @column_check >= 0,
    'ALTER TABLE bp_construction ADD FOREIGN KEY (user_id) REFERENCES user_account(User_ID) ON DELETE CASCADE',
    'SELECT "FK already exists" AS message'
);
PREPARE stmt FROM @sql_add_fk;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

ALTER TABLE bp_construction 
ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

SELECT '✅ bp_construction updated' AS Status;

-- =============================================
-- Add user_id to project_details
-- =============================================
SET @column_check = (
    SELECT COUNT(*) 
    FROM INFORMATION_SCHEMA.COLUMNS 
    WHERE TABLE_SCHEMA = 'copems' 
    AND TABLE_NAME = 'project_details' 
    AND COLUMN_NAME = 'user_id'
);

SET @sql_add_column = IF(
    @column_check = 0,
    'ALTER TABLE project_details ADD COLUMN user_id INT UNSIGNED NOT NULL AFTER project_details_id',
    'SELECT "user_id already exists in project_details" AS message'
);
PREPARE stmt FROM @sql_add_column;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @fk_check = (
    SELECT COUNT(*) 
    FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE 
    WHERE TABLE_SCHEMA = 'copems' 
    AND TABLE_NAME = 'project_details' 
    AND COLUMN_NAME = 'user_id'
    AND REFERENCED_TABLE_NAME IS NOT NULL
);

SET @sql_add_fk = IF(
    @fk_check = 0 AND @column_check >= 0,
    'ALTER TABLE project_details ADD FOREIGN KEY (user_id) REFERENCES user_account(User_ID) ON DELETE CASCADE',
    'SELECT "FK already exists" AS message'
);
PREPARE stmt FROM @sql_add_fk;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SELECT '✅ project_details updated' AS Status;

-- =============================================
-- Add user_id to building_plans
-- =============================================
SET @column_check = (
    SELECT COUNT(*) 
    FROM INFORMATION_SCHEMA.COLUMNS 
    WHERE TABLE_SCHEMA = 'copems' 
    AND TABLE_NAME = 'building_plans' 
    AND COLUMN_NAME = 'user_id'
);

SET @sql_add_column = IF(
    @column_check = 0,
    'ALTER TABLE building_plans ADD COLUMN user_id INT UNSIGNED NOT NULL AFTER plan_id',
    'SELECT "user_id already exists in building_plans" AS message'
);
PREPARE stmt FROM @sql_add_column;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @fk_check = (
    SELECT COUNT(*) 
    FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE 
    WHERE TABLE_SCHEMA = 'copems' 
    AND TABLE_NAME = 'building_plans' 
    AND COLUMN_NAME = 'user_id'
    AND REFERENCED_TABLE_NAME IS NOT NULL
);

SET @sql_add_fk = IF(
    @fk_check = 0 AND @column_check >= 0,
    'ALTER TABLE building_plans ADD FOREIGN KEY (user_id) REFERENCES user_account(User_ID) ON DELETE CASCADE',
    'SELECT "FK already exists" AS message'
);
PREPARE stmt FROM @sql_add_fk;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SELECT '✅ building_plans updated' AS Status;

-- =============================================
-- Add user_id to engineer_information
-- =============================================
SET @column_check = (
    SELECT COUNT(*) 
    FROM INFORMATION_SCHEMA.COLUMNS 
    WHERE TABLE_SCHEMA = 'copems' 
    AND TABLE_NAME = 'engineer_information' 
    AND COLUMN_NAME = 'user_id'
);

SET @sql_add_column = IF(
    @column_check = 0,
    'ALTER TABLE engineer_information ADD COLUMN user_id INT UNSIGNED NOT NULL AFTER engineer_id',
    'SELECT "user_id already exists in engineer_information" AS message'
);
PREPARE stmt FROM @sql_add_column;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @fk_check = (
    SELECT COUNT(*) 
    FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE 
    WHERE TABLE_SCHEMA = 'copems' 
    AND TABLE_NAME = 'engineer_information' 
    AND COLUMN_NAME = 'user_id'
    AND REFERENCED_TABLE_NAME IS NOT NULL
);

SET @sql_add_fk = IF(
    @fk_check = 0 AND @column_check >= 0,
    'ALTER TABLE engineer_information ADD FOREIGN KEY (user_id) REFERENCES user_account(User_ID) ON DELETE CASCADE',
    'SELECT "FK already exists" AS message'
);
PREPARE stmt FROM @sql_add_fk;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

ALTER TABLE engineer_information 
ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

SELECT '✅ engineer_information updated' AS Status;

-- =============================================
-- Add user_id to lot_representative
-- =============================================
SET @column_check = (
    SELECT COUNT(*) 
    FROM INFORMATION_SCHEMA.COLUMNS 
    WHERE TABLE_SCHEMA = 'copems' 
    AND TABLE_NAME = 'lot_representative' 
    AND COLUMN_NAME = 'user_id'
);

SET @sql_add_column = IF(
    @column_check = 0,
    'ALTER TABLE lot_representative ADD COLUMN user_id INT UNSIGNED NOT NULL AFTER lot_rep_id',
    'SELECT "user_id already exists in lot_representative" AS message'
);
PREPARE stmt FROM @sql_add_column;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @fk_check = (
    SELECT COUNT(*) 
    FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE 
    WHERE TABLE_SCHEMA = 'copems' 
    AND TABLE_NAME = 'lot_representative' 
    AND COLUMN_NAME = 'user_id'
    AND REFERENCED_TABLE_NAME IS NOT NULL
);

SET @sql_add_fk = IF(
    @fk_check = 0 AND @column_check >= 0,
    'ALTER TABLE lot_representative ADD FOREIGN KEY (user_id) REFERENCES user_account(User_ID) ON DELETE CASCADE',
    'SELECT "FK already exists" AS message'
);
PREPARE stmt FROM @sql_add_fk;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SELECT '✅ lot_representative updated' AS Status;

-- =============================================
-- Add indexes for better performance
-- =============================================
ALTER TABLE bldg_owner ADD INDEX IF NOT EXISTS idx_user_id (user_id);
ALTER TABLE bp_construction ADD INDEX IF NOT EXISTS idx_user_id (user_id);
ALTER TABLE project_details ADD INDEX IF NOT EXISTS idx_user_id (user_id);
ALTER TABLE building_plans ADD INDEX IF NOT EXISTS idx_user_id (user_id);
ALTER TABLE engineer_information ADD INDEX IF NOT EXISTS idx_user_id (user_id);
ALTER TABLE lot_representative ADD INDEX IF NOT EXISTS idx_user_id (user_id);

SELECT '=====================================' AS '';
SELECT '✅ ALL TABLES UPDATED SUCCESSFULLY!' AS 'MIGRATION STATUS';
SELECT '=====================================' AS '';
SELECT 'Next Steps:' AS '';
SELECT '1. Update controllers to use req.user.user_id' AS 'Step 1';
SELECT '2. Protect all routes with verifyToken middleware' AS 'Step 2';
SELECT '3. Test authentication flow' AS 'Step 3';
