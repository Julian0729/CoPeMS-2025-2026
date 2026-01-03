-- ================================================
-- ADD MISSING FOREIGN KEYS TO COPEMS DATABASE
-- Run this in phpMyAdmin SQL tab
-- ================================================

-- This script adds the missing foreign key constraints for:
-- 1. building_plans
-- 2. lot_representative

USE copems;

-- ================================================
-- 1. ADD FOREIGN KEY TO building_plans
-- ================================================

-- Check if foreign key already exists
SET @fk_exists = (
    SELECT COUNT(*)
    FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
    WHERE TABLE_SCHEMA = 'copems'
      AND TABLE_NAME = 'building_plans'
      AND COLUMN_NAME = 'user_id'
      AND REFERENCED_TABLE_NAME = 'user_account'
);

-- Add foreign key if it doesn't exist
SET @sql_building_plans = IF(
    @fk_exists = 0,
    'ALTER TABLE building_plans ADD CONSTRAINT fk_building_plans_user FOREIGN KEY (user_id) REFERENCES user_account(User_ID) ON DELETE CASCADE ON UPDATE CASCADE',
    'SELECT "Foreign key for building_plans already exists" AS info'
);

PREPARE stmt FROM @sql_building_plans;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- ================================================
-- 2. ADD FOREIGN KEY TO lot_representative
-- ================================================

-- Check if foreign key already exists
SET @fk_exists = (
    SELECT COUNT(*)
    FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
    WHERE TABLE_SCHEMA = 'copems'
      AND TABLE_NAME = 'lot_representative'
      AND COLUMN_NAME = 'user_id'
      AND REFERENCED_TABLE_NAME = 'user_account'
);

-- Add foreign key if it doesn't exist
SET @sql_lot_rep = IF(
    @fk_exists = 0,
    'ALTER TABLE lot_representative ADD CONSTRAINT fk_lot_representative_user FOREIGN KEY (user_id) REFERENCES user_account(User_ID) ON DELETE CASCADE ON UPDATE CASCADE',
    'SELECT "Foreign key for lot_representative already exists" AS info'
);

PREPARE stmt FROM @sql_lot_rep;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- ================================================
-- 3. ADD INDEXES FOR BETTER PERFORMANCE
-- ================================================

-- Index for building_plans.user_id (if not exists)
SET @index_exists = (
    SELECT COUNT(*)
    FROM INFORMATION_SCHEMA.STATISTICS
    WHERE TABLE_SCHEMA = 'copems'
      AND TABLE_NAME = 'building_plans'
      AND INDEX_NAME = 'idx_building_plans_user_id'
);

SET @sql_index_bp = IF(
    @index_exists = 0,
    'ALTER TABLE building_plans ADD INDEX idx_building_plans_user_id (user_id)',
    'SELECT "Index on building_plans.user_id already exists" AS info'
);

PREPARE stmt FROM @sql_index_bp;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Index for lot_representative.user_id (if not exists)
SET @index_exists = (
    SELECT COUNT(*)
    FROM INFORMATION_SCHEMA.STATISTICS
    WHERE TABLE_SCHEMA = 'copems'
      AND TABLE_NAME = 'lot_representative'
      AND INDEX_NAME = 'idx_lot_representative_user_id'
);

SET @sql_index_lr = IF(
    @index_exists = 0,
    'ALTER TABLE lot_representative ADD INDEX idx_lot_representative_user_id (user_id)',
    'SELECT "Index on lot_representative.user_id already exists" AS info'
);

PREPARE stmt FROM @sql_index_lr;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- ================================================
-- VERIFICATION QUERY
-- ================================================

SELECT 
    '✅ MIGRATION COMPLETE' AS status,
    'All foreign keys and indexes have been added' AS message;

-- Verify foreign keys
SELECT 
    TABLE_NAME,
    COLUMN_NAME,
    CONSTRAINT_NAME,
    REFERENCED_TABLE_NAME,
    REFERENCED_COLUMN_NAME
FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
WHERE TABLE_SCHEMA = 'copems'
  AND REFERENCED_TABLE_NAME IS NOT NULL
  AND COLUMN_NAME = 'user_id'
ORDER BY TABLE_NAME;
