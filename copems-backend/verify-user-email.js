import { pool } from "./config/database.js";

async function verifyUserEmail() {
  try {
    console.log("Checking user accounts...\n");

    // Get all users
    const [users] = await pool.execute(
      "SELECT User_ID, Email_Account, email_verified, Status FROM user_account"
    );

    console.log("Current users:");
    users.forEach((user) => {
      console.log(
        `- ID: ${user.User_ID}, Email: ${user.Email_Account}, Verified: ${user.email_verified}, Status: ${user.Status}`
      );
    });

    // Verify all unverified users
    const [result] = await pool.execute(
      "UPDATE user_account SET email_verified = 1 WHERE email_verified = 0 OR email_verified IS NULL"
    );

    console.log(`\n✓ Verified ${result.affectedRows} user(s)`);

    // Show updated users
    const [updatedUsers] = await pool.execute(
      "SELECT User_ID, Email_Account, email_verified, Status FROM user_account"
    );

    console.log("\nUpdated users:");
    updatedUsers.forEach((user) => {
      console.log(
        `- ID: ${user.User_ID}, Email: ${user.Email_Account}, Verified: ${user.email_verified}, Status: ${user.Status}`
      );
    });

    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

verifyUserEmail();
