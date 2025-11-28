// Stored procedures for character_of_occupancy and character_of_occupancy_categories tables

export async function createProcedures(knex) {
  // --- character_of_occupancy procedures (Groups) ---

  await knex.raw(`DROP PROCEDURE IF EXISTS GetAllOccupancyGroups`);
  await knex.raw(`
    CREATE PROCEDURE GetAllOccupancyGroups()
    BEGIN
      -- Fetches all occupancy groups (e.g., A, B, C, J-1)
      SELECT group_id, group_name 
      FROM character_of_occupancy
      ORDER BY group_id;
    END
  `);

  await knex.raw(`DROP PROCEDURE IF EXISTS GetOccupancyGroupById`);
  await knex.raw(`
    CREATE PROCEDURE GetOccupancyGroupById(IN p_group_id VARCHAR(5))
    BEGIN
      -- Fetches a single occupancy group by its ID
      SELECT group_id, group_name
      FROM character_of_occupancy
      WHERE group_id = p_group_id;
    END
  `);

  // --- character_of_occupancy_categories procedures (Categories) ---

  await knex.raw(`DROP PROCEDURE IF EXISTS GetAllOccupancyCategories`);
  await knex.raw(`
    CREATE PROCEDURE GetAllOccupancyCategories()
    BEGIN
      -- Fetches all occupancy categories
      SELECT category_id, group_id, category_name 
      FROM character_of_occupancy_categories
      ORDER BY group_id, category_name;
    END
  `);

  await knex.raw(`DROP PROCEDURE IF EXISTS GetCategoriesByGroupId`);
  await knex.raw(`
    CREATE PROCEDURE GetCategoriesByGroupId(IN p_group_id VARCHAR(5))
    BEGIN
      -- Fetches all categories belonging to a specific group ID
      SELECT category_id, group_id, category_name
      FROM character_of_occupancy_categories
      WHERE group_id = p_group_id
      ORDER BY category_name;
    END
  `);

  // --- Combined/Joined Procedure (Optional but useful) ---

  await knex.raw(`DROP PROCEDURE IF EXISTS GetFullOccupancyStructure`);
  await knex.raw(`
    CREATE PROCEDURE GetFullOccupancyStructure()
    BEGIN
      -- Fetches all groups and their related categories in a joined result set.
      -- The controller can then process this result into a hierarchical structure.
      SELECT 
        g.group_id, 
        g.group_name, 
        c.category_id, 
        c.category_name
      FROM character_of_occupancy AS g
      LEFT JOIN character_of_occupancy_categories AS c ON g.group_id = c.group_id
      ORDER BY g.group_id, c.category_name;
    END
  `);
}

export async function dropProcedures(knex) {
  // --- Groups ---
  await knex.raw(`DROP PROCEDURE IF EXISTS GetAllOccupancyGroups`);
  await knex.raw(`DROP PROCEDURE IF EXISTS GetOccupancyGroupById`);

  // --- Categories ---
  await knex.raw(`DROP PROCEDURE IF EXISTS GetAllOccupancyCategories`);
  await knex.raw(`DROP PROCEDURE IF EXISTS GetCategoriesByGroupId`);

  // --- Combined ---
  await knex.raw(`DROP PROCEDURE IF EXISTS GetFullOccupancyStructure`);
}
