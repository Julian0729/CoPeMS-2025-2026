/**
 * Migration: Create refresh_tokens table
 * Purpose: Store refresh tokens for JWT authentication with automatic token refresh
 */

export const up = async (knex) => {
  await knex.schema.createTable("refresh_tokens", (table) => {
    table.increments("id").primary();
    table.integer("user_id").unsigned().notNullable();
    table.string("token", 500).notNullable().unique();
    table.timestamp("expires_at").notNullable();
    table.boolean("revoked").defaultTo(false);
    table.string("revoked_reason", 100).nullable();
    table.timestamp("revoked_at").nullable();
    table.string("ip_address", 45).nullable();
    table.string("user_agent", 500).nullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());

    // Foreign key constraint
    table
      .foreign("user_id")
      .references("User_ID")
      .inTable("user_account")
      .onDelete("CASCADE");

    // Indexes for performance
    table.index("user_id");
    table.index("token");
    table.index("expires_at");
    table.index(["user_id", "revoked"]);
  });

  // Add last_login field to user_account table
  await knex.schema.table("user_account", (table) => {
    table.timestamp("last_login").nullable();
  });
};

export const down = async (knex) => {
  await knex.schema.table("user_account", (table) => {
    table.dropColumn("last_login");
  });

  await knex.schema.dropTableIfExists("refresh_tokens");
};
