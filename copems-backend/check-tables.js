import mysql from "mysql2/promise";

async function checkUserTable() {
  let connection;

  try {
    connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "copems",
    });

    console.log("✅ Connected to database\n");

    // Check user_account table structure
    const [userTableDesc] = await connection.query("DESCRIBE user_account");
    console.log("📋 user_account table structure:");
    console.table(userTableDesc);

    // Check existing tables for structure
    const [bldgOwnerDesc] = await connection.query("DESCRIBE bldg_owner");
    console.log("\n📋 bldg_owner table structure:");
    console.table(bldgOwnerDesc);
  } catch (error) {
    console.error("❌ Error:", error.message);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

checkUserTable();
