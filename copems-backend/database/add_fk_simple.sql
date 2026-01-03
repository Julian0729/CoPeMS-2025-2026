-- Add missing foreign keys for building_plans and lot_representative
-- Run this script in phpMyAdmin

USE copems;

-- Add foreign key to building_plans (if it doesn't exist)
ALTER TABLE building_plans 
ADD CONSTRAINT fk_building_plans_user 
FOREIGN KEY (user_id) 
REFERENCES user_account(User_ID) 
ON DELETE CASCADE 
ON UPDATE CASCADE;

-- Add index for building_plans.user_id
ALTER TABLE building_plans 
ADD INDEX idx_building_plans_user_id (user_id);

-- Add foreign key to lot_representative (if it doesn't exist)
ALTER TABLE lot_representative 
ADD CONSTRAINT fk_lot_representative_user 
FOREIGN KEY (user_id) 
REFERENCES user_account(User_ID) 
ON DELETE CASCADE 
ON UPDATE CASCADE;

-- Add index for lot_representative.user_id
ALTER TABLE lot_representative 
ADD INDEX idx_lot_representative_user_id (user_id);

-- Verify the foreign keys were added
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
