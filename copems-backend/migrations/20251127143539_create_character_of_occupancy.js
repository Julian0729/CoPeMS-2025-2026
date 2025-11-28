export async function up(knex) {
  // --- Table for Groups (e.g., A, B, C) ---
  const groupsTableName = "character_of_occupancy";
  const hasGroupsTable = await knex.schema.hasTable(groupsTableName);
  if (!hasGroupsTable) {
    await knex.schema.createTable(groupsTableName, function (table) {
      table.string("group_id", 5).primary(); // e.g., 'A', 'H', 'J-1'
      table.string("group_name", 100).notNullable().unique(); // e.g., 'RESIDENTIAL (DWELLINGS)'
    });
  }

  // --- Table for Detailed Categories (e.g., SINGLE, HOTEL, FACTORY) ---
  const categoriesTableName = "character_of_occupancy_categories";
  const hasCategoriesTable = await knex.schema.hasTable(categoriesTableName);
  if (!hasCategoriesTable) {
    await knex.schema.createTable(categoriesTableName, function (table) {
      table.increments("category_id").primary();
      table.string("group_id", 5).notNullable();
      table.string("category_name", 255).notNullable();

      // Foreign key linking to the groups table
      table
        .foreign("group_id")
        .references("group_id")
        .inTable(groupsTableName)
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    });
  }

  // --- Populate character_of_occupancy Groups ---
  const groups = [
    { group_id: "A", group_name: "RESIDENTIAL (DWELLINGS)" },
    { group_id: "B", group_name: "RESIDENTIAL" },
    { group_id: "C", group_name: "EDUCATIONAL & RECREATIONAL" },
    { group_id: "D", group_name: "INSTITUTIONAL" },
    { group_id: "E", group_name: "COMMERCIAL" },
    { group_id: "F", group_name: "LIGHT INDUSTRIAL" },
    { group_id: "G", group_name: "MEDIUM INDUSTRIAL" },
    { group_id: "H", group_name: "ASSEMBLY (OCCUPANT LOAD LESS THAN 1,000)" },
    { group_id: "I", group_name: "ASSEMBLY (OCCUPANT LOAD 1,000 OR MORE)" },
    { group_id: "J-1", group_name: "AGRICULTURAL" },
    { group_id: "J-2", group_name: "ACCESSORIES" },
  ];

  await knex(groupsTableName).insert(groups).onConflict("group_id").ignore();

  // --- Populate character_of_occupancy_categories ---
  const categories = [
    // Group A
    { group_id: "A", category_name: "SINGLE" },
    { group_id: "A", category_name: "DUPLEX" },
    { group_id: "A", category_name: "RESIDENTIAL R-1, R-2" },

    // Group B
    { group_id: "B", category_name: "HOTEL" },
    { group_id: "B", category_name: "MOTEL" },
    { group_id: "B", category_name: "DORMITORY" },
    { group_id: "B", category_name: "TOWNHOUSE" },
    { group_id: "B", category_name: "BOARDINGHOUSE" },
    { group_id: "B", category_name: "RESIDENTIAL R-3, R-4, R-5" },
    { group_id: "B", category_name: "LODGING HOUSE" },

    // Group C
    { group_id: "C", category_name: "SCHOOL BUILDING" },
    { group_id: "C", category_name: "CIVIC CENTER" },
    { group_id: "C", category_name: "CLUBHOUSE" },
    { group_id: "C", category_name: "SCHOOL AUDITORIUM" },
    { group_id: "C", category_name: "GYMNASIUM" },
    { group_id: "C", category_name: "CHURCH, MOSQUE, TEMPLE, CHAPEL" },

    // Group D
    { group_id: "D", category_name: "HOSPITAL OR SIMILAR STRUCTURE" },
    { group_id: "D", category_name: "HOME FOR THE AGED" },
    { group_id: "D", category_name: "GOVERNMENT OFFICE" },

    // Group E
    { group_id: "E", category_name: "BANK" },
    { group_id: "E", category_name: "STORE" },
    { group_id: "E", category_name: "DRINKING / DINING ESTABLISHMENT" },
    { group_id: "E", category_name: "SHOPPING CENTER / MALL" },
    {
      group_id: "E",
      category_name: "SHOP (i.e DRESS SHOP, TAILORING, BARBERSHOP, etc.)",
    },

    // Group F
    {
      group_id: "F",
      category_name:
        "FACTORY / PLANT (USING INCOMBUSTIBLE / NON-EXPLOSIVE MATERIALS)",
    },

    // Group G
    {
      group_id: "G",
      category_name:
        "STORAGE / WAREHOUSE (FOR HAZARDOUS / HIGHLY FLAMMABLE MATERIALS)",
    },
    {
      group_id: "G",
      category_name: "FACTORY (FOR HAZARDOUS / HIGHLY FLAMMABLE MATERIALS)",
    },

    // Group H
    {
      group_id: "H",
      category_name:
        "THEATER, AUDITORIUM, CONVENTION HALL, GRANDSTAND / BLEACHER",
    },

    // Group I
    {
      group_id: "I",
      category_name:
        "COLISEUM, SPORTS COMPLEX, CONVENTION CENTER AND SIMILAR STRUCTURE",
    },

    // Group J-1
    {
      group_id: "J-1",
      category_name:
        "BARN, GRANARY, POULTRY HOUSE, PIGGERY, GRAIN MILL, GRAIN SILO",
    },

    // Group J-2
    {
      group_id: "J-2",
      category_name:
        "PRIVATE CARPORT / GARAGE, TOWER, SWIMMING POOL, FENCE OVER 1.80m, STEEL / CONCRETE TANK",
    },
  ];

  await knex.batchInsert(categoriesTableName, categories, 100);
}

// --- Down function to reverse the migration ---
export async function down(knex) {
  await knex.schema.dropTableIfExists("character_of_occupancy_categories");
  await knex.schema.dropTableIfExists("character_of_occupancy");
}
