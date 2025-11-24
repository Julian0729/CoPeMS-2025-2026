const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { pool } = require("../config/database");
const emailService = require("../services/emailService");

class AuthController {
  // Register new user without sending email (frontend will handle email)
  static async registerNoEmail(req, res) {
    try {
      const { email, password } = req.body;

      // Validate input
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: "Email and password are required",
        });
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          message: "Please provide a valid email address",
        });
      }

      // Validate password strength
      if (password.length < 6) {
        return res.status(400).json({
          success: false,
          message: "Password must be at least 6 characters long",
        });
      }

      // Check if email already exists
      const [existingUsers] = await pool.execute(
        "SELECT User_ID FROM user_account WHERE Email_Account = ?",
        [email]
      );

      if (existingUsers.length > 0) {
        return res.status(400).json({
          success: false,
          message: "Email already registered",
        });
      }

      // Hash password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Generate verification token
      const verificationToken = crypto.randomBytes(32).toString("hex");

      // Insert new user
      const [result] = await pool.execute(
        `INSERT INTO user_account (
          Email_Account, 
          Password_Account, 
          Status, 
          email_verified, 
          verification_token, 
          token_expires_at
        ) VALUES (?, ?, 'pending', FALSE, ?, DATE_ADD(NOW(), INTERVAL 24 HOUR))`,
        [email, hashedPassword, verificationToken]
      );

      res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: {
          user_id: result.insertId,
          email: email,
          verification_token: verificationToken,
        },
      });
    } catch (error) {
      console.error("Registration error:", error);

      // Handle duplicate entry error
      if (error.code === "ER_DUP_ENTRY") {
        return res.status(400).json({
          success: false,
          message: "Email already registered",
        });
      }

      res.status(500).json({
        success: false,
        message: "Internal server error during registration",
      });
    }
  }

  // Register new user
  static async register(req, res) {
    try {
      const { email, password } = req.body;

      // Validate input
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: "Email and password are required",
        });
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          message: "Please provide a valid email address",
        });
      }

      // Validate password strength
      if (password.length < 6) {
        return res.status(400).json({
          success: false,
          message: "Password must be at least 6 characters long",
        });
      }

      // Check if email already exists
      const [existingUsers] = await pool.execute(
        "SELECT User_ID FROM user_account WHERE Email_Account = ?",
        [email]
      );

      if (existingUsers.length > 0) {
        return res.status(400).json({
          success: false,
          message: "Email already registered",
        });
      }

      // Hash password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Generate verification token
      const verificationToken = crypto.randomBytes(32).toString("hex");

      // Insert new user
      const [result] = await pool.execute(
        `INSERT INTO user_account (
          Email_Account, 
          Password_Account, 
          Status, 
          email_verified, 
          verification_token, 
          token_expires_at
        ) VALUES (?, ?, 'pending', FALSE, ?, DATE_ADD(NOW(), INTERVAL 24 HOUR))`,
        [email, hashedPassword, verificationToken]
      );

      // Send confirmation email
      console.log("🔍 === REGISTRATION EMAIL DEBUG START ===");
      console.log("📧 About to send confirmation email for:", email);
      console.log("🎫 Using verification token:", verificationToken);

      const emailResult = await emailService.sendConfirmationEmail(
        email,
        email, // Using email as name since we don't have a name field
        verificationToken
      );

      console.log(
        "📧 Email service result:",
        JSON.stringify(emailResult, null, 2)
      );
      console.log("🔍 === REGISTRATION EMAIL DEBUG END ===");

      if (!emailResult.success) {
        console.error("❌ Email sending failed:", emailResult.error);
        console.error("📊 Email error status:", emailResult.status);
        console.error("🏷️ Email error type:", emailResult.errorType);
        console.error("🔢 Email error code:", emailResult.errorCode);
        // Don't fail registration if email fails, just log it
      } else {
        console.log("✅ Email sent successfully to:", email);
      }

      res.status(201).json({
        success: true,
        message: emailResult.success
          ? "User registered successfully. Please check your email to verify your account."
          : "User registered successfully, but email could not be sent. Please contact support.",
        data: {
          user_id: result.insertId,
          email: email,
          email_sent: emailResult.success,
        },
      });
    } catch (error) {
      console.error("Registration error:", error);

      // Handle duplicate entry error
      if (error.code === "ER_DUP_ENTRY") {
        return res.status(400).json({
          success: false,
          message: "Email already registered",
        });
      }

      res.status(500).json({
        success: false,
        message: "Internal server error during registration",
      });
    }
  }

  // Verify email
  static async verifyEmail(req, res) {
    try {
      const { token } = req.body;

      if (!token) {
        return res.status(400).json({
          success: false,
          message: "Verification token is required",
        });
      }

      // Check if token exists and is not expired
      const [users] = await pool.execute(
        `SELECT User_ID, token_expires_at < NOW() as is_expired 
         FROM user_account 
         WHERE verification_token = ? AND email_verified = FALSE`,
        [token]
      );

      if (users.length === 0) {
        return res.status(400).json({
          success: false,
          message: "Invalid verification token",
        });
      }

      const user = users[0];

      if (user.is_expired) {
        return res.status(400).json({
          success: false,
          message: "Verification token has expired",
        });
      }

      // Update user as verified
      await pool.execute(
        `UPDATE user_account 
         SET email_verified = TRUE, 
             verification_token = NULL, 
             token_expires_at = NULL,
             Status = 'active',
             updated_at = NOW()
         WHERE User_ID = ?`,
        [user.User_ID]
      );

      // Generate JWT token for verified user
      const jwtToken = jwt.sign(
        {
          user_id: user.User_ID,
          email_verified: true,
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );

      res.status(200).json({
        success: true,
        message: "Email verified successfully",
        data: {
          user_id: user.User_ID,
          token: jwtToken,
        },
      });
    } catch (error) {
      console.error("Email verification error:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error during email verification",
      });
    }
  }

  // Login user
  static async login(req, res) {
    try {
      const { username, user_password } = req.body; // Using your existing field names

      if (!username || !user_password) {
        return res.status(400).json({
          success: false,
          message: "Email and password are required",
        });
      }

      // Get user from database
      const [users] = await pool.execute(
        "SELECT User_ID, Email_Account, Password_Account, email_verified, Status FROM user_account WHERE Email_Account = ?",
        [username]
      );

      if (users.length === 0) {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password",
        });
      }

      const user = users[0];

      // Check password
      const passwordMatch = await bcrypt.compare(
        user_password,
        user.Password_Account
      );
      if (!passwordMatch) {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password",
        });
      }

      // Check if email is verified
      if (!user.email_verified) {
        return res.status(401).json({
          success: false,
          message: "Please verify your email before logging in",
        });
      }

      // Generate JWT token
      const token = jwt.sign(
        {
          user_id: user.User_ID,
          email: user.Email_Account,
          email_verified: user.email_verified,
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );

      res.status(200).json({
        success: true,
        message: "Login successful",
        user: {
          User_ID: user.User_ID,
          Email_Account: user.Email_Account,
          email_verified: user.email_verified,
          Status: user.Status,
        },
        token: token,
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error during login",
      });
    }
  }

  // Get user profile (protected route)
  static async getProfile(req, res) {
    try {
      const userId = req.user.user_id;

      const [users] = await pool.execute(
        "SELECT User_ID, Email_Account, email_verified, Status, created_at FROM user_account WHERE User_ID = ?",
        [userId]
      );

      if (users.length === 0) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      const user = users[0];

      res.status(200).json({
        success: true,
        data: {
          User_ID: user.User_ID,
          Email_Account: user.Email_Account,
          email_verified: user.email_verified,
          Status: user.Status,
          created_at: user.created_at,
        },
      });
    } catch (error) {
      console.error("Get profile error:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
}

module.exports = AuthController;
