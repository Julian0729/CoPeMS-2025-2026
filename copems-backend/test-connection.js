import mysql from "mysql2/promise";

async function test() {
  let connection;

  try {
    console.log("Attempting connection...");
    connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "copems",
      connectTimeout: 10000,
    });

    console.log("✅ Connected!");

    const [rows] = await connection.query("SELECT 1 as test");
    console.log("✅ Query works:", rows);

    await connection.end();
    console.log("✅ Connection closed");
  } catch (error) {
    console.error("❌ Error:", error);
  }
}

test();
