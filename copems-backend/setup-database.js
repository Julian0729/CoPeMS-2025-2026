const mysql = require("mysql2");
require("dotenv").config();

async function setupDatabase() {
  const connection = mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "copems",
  });

  try {
    console.log("🔧 Setting up database...");

    // Drop and recreate table
    await connection.promise().execute("DROP TABLE IF EXISTS `user_account`");

    const createTableSQL = `
      CREATE TABLE \`user_account\` (
        \`User_ID\` int(11) NOT NULL AUTO_INCREMENT,
        \`Email_Account\` varchar(100) NOT NULL,
        \`Password_Account\` varchar(255) NOT NULL,
        \`Status\` varchar(50) NOT NULL DEFAULT 'pending',
        \`email_verified\` BOOLEAN DEFAULT FALSE,
        \`verification_token\` VARCHAR(255) NULL,
        \`token_expires_at\` TIMESTAMP NULL,
        \`created_at\` timestamp NOT NULL DEFAULT current_timestamp(),
        \`updated_at\` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
        PRIMARY KEY (\`User_ID\`),
        UNIQUE KEY \`unique_email\` (\`Email_Account\`),
        INDEX \`idx_verification_token\` (\`verification_token\`),
        INDEX \`idx_email_verified\` (\`email_verified\`)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci
    `;

    await connection.promise().execute(createTableSQL);
    console.log("✅ Database table created successfully!");

    // Test insert
    const testData = await connection
      .promise()
      .execute(
        "INSERT INTO user_account (Email_Account, Password_Account, Status) VALUES (?, ?, ?)",
        ["test@example.com", "hashedpassword123", "pending"]
      );

    console.log("✅ Test insert successful, ID:", testData[0].insertId);

    // Clean up test data
    await connection
      .promise()
      .execute("DELETE FROM user_account WHERE Email_Account = ?", [
        "test@example.com",
      ]);
    console.log("✅ Database setup completed successfully!");
  } catch (error) {
    console.error("❌ Database setup failed:", error.message);
  } finally {
    connection.end();
  }
}

setupDatabase();
