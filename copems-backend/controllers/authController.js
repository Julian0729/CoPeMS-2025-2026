import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { pool } from "../config/database.js";
import emailService from "../services/emailService.js";

class AuthController {
  // Helper method to generate access token
  static generateAccessToken(userId, email, email_verified) {
    return jwt.sign(
      {
        user_id: userId,
        email: email,
        email_verified: email_verified,
        type: "access",
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN || "5m" }
    );
  }

  // Helper method to generate refresh token
  static generateRefreshToken(userId) {
    return jwt.sign(
      {
        user_id: userId,
        type: "refresh",
      },
      process.env.JWT_REFRESH_TOKEN_SECRET || process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN || "30d" }
    );
  }

  // Helper method to store refresh token in database
  static async storeRefreshToken(userId, token, ipAddress, userAgent) {
    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_REFRESH_TOKEN_SECRET || process.env.JWT_SECRET
      );
      const expiresAt = new Date(decoded.exp * 1000);

      await pool.execute(
        `INSERT INTO refresh_tokens (user_id, token, expires_at, ip_address, user_agent)
         VALUES (?, ?, ?, ?, ?)`,
        [userId, token, expiresAt, ipAddress, userAgent]
      );
    } catch (error) {
      console.error("Error storing refresh token:", error);
      throw error;
    }
  }

  // Helper method to revoke refresh token
  static async revokeRefreshToken(token, reason = "logout") {
    try {
      await pool.execute(
        `UPDATE refresh_tokens 
         SET revoked = TRUE, revoked_reason = ?, revoked_at = NOW()
         WHERE token = ?`,
        [reason, token]
      );
    } catch (error) {
      console.error("Error revoking refresh token:", error);
      throw error;
    }
  }

  // Helper method to revoke all user refresh tokens
  static async revokeAllUserTokens(userId, reason = "security") {
    try {
      await pool.execute(
        `UPDATE refresh_tokens 
         SET revoked = TRUE, revoked_reason = ?, revoked_at = NOW()
         WHERE user_id = ? AND revoked = FALSE`,
        [reason, userId]
      );
    } catch (error) {
      console.error("Error revoking all user tokens:", error);
      throw error;
    }
  }

  // Helper method to clean up expired tokens
  static async cleanupExpiredTokens() {
    try {
      await pool.execute(`DELETE FROM refresh_tokens WHERE expires_at < NOW()`);
    } catch (error) {
      console.error("Error cleaning up expired tokens:", error);
    }
  }
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

      // Get updated user data
      const [updatedUsers] = await pool.execute(
        "SELECT User_ID, Email_Account, email_verified, Status FROM user_account WHERE User_ID = ?",
        [user.User_ID]
      );
      const updatedUser = updatedUsers[0];

      // Generate access and refresh tokens
      const accessToken = AuthController.generateAccessToken(
        updatedUser.User_ID,
        updatedUser.Email_Account,
        updatedUser.email_verified
      );
      const refreshToken = AuthController.generateRefreshToken(
        updatedUser.User_ID
      );

      // Store refresh token
      const ipAddress = req.ip || req.connection.remoteAddress;
      const userAgent = req.headers["user-agent"];
      await AuthController.storeRefreshToken(
        updatedUser.User_ID,
        refreshToken,
        ipAddress,
        userAgent
      );

      res.status(200).json({
        success: true,
        message: "Email verified successfully",
        data: {
          user_id: updatedUser.User_ID,
          accessToken: accessToken,
          refreshToken: refreshToken,
          tokenType: "Bearer",
          expiresIn: 300,
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
      const { username, user_password } = req.body;

      // Validate input
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

      // Check if account is active
      if (user.Status !== "active" && user.Status !== "pending") {
        return res.status(403).json({
          success: false,
          message: "Your account has been suspended. Please contact support.",
        });
      }

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
        return res.status(403).json({
          success: false,
          message: "Please verify your email before logging in",
          code: "EMAIL_NOT_VERIFIED",
        });
      }

      // Generate access token (5 minutes)
      const accessToken = AuthController.generateAccessToken(
        user.User_ID,
        user.Email_Account,
        user.email_verified
      );

      // Generate refresh token (30 days)
      const refreshToken = AuthController.generateRefreshToken(user.User_ID);

      // Store refresh token in database
      const ipAddress = req.ip || req.connection.remoteAddress;
      const userAgent = req.headers["user-agent"] || "Unknown";
      await AuthController.storeRefreshToken(
        user.User_ID,
        refreshToken,
        ipAddress,
        userAgent
      );

      // Update last login timestamp
      await pool.execute(
        "UPDATE user_account SET last_login = NOW() WHERE User_ID = ?",
        [user.User_ID]
      );

      // Clean up expired tokens periodically
      AuthController.cleanupExpiredTokens();

      res.status(200).json({
        success: true,
        message: "Login successful",
        user: {
          user_id: user.User_ID,
          email: user.Email_Account,
          email_verified: user.email_verified,
          status: user.Status,
        },
        accessToken: accessToken,
        refreshToken: refreshToken,
        tokenType: "Bearer",
        expiresIn: 300, // 5 minutes in seconds
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error during login",
      });
    }
  }

  // Refresh access token using refresh token
  static async refreshToken(req, res) {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        return res.status(400).json({
          success: false,
          message: "Refresh token is required",
        });
      }

      // Verify refresh token
      let decoded;
      try {
        decoded = jwt.verify(
          refreshToken,
          process.env.JWT_REFRESH_TOKEN_SECRET || process.env.JWT_SECRET
        );
      } catch (error) {
        return res.status(401).json({
          success: false,
          message: "Invalid or expired refresh token",
        });
      }

      // Check if token type is refresh
      if (decoded.type !== "refresh") {
        return res.status(401).json({
          success: false,
          message: "Invalid token type",
        });
      }

      // Check if refresh token exists in database and is not revoked
      const [tokens] = await pool.execute(
        `SELECT rt.*, ua.Email_Account, ua.email_verified, ua.Status, ua.last_login
         FROM refresh_tokens rt
         JOIN user_account ua ON rt.user_id = ua.User_ID
         WHERE rt.token = ? AND rt.revoked = FALSE AND rt.expires_at > NOW()`,
        [refreshToken]
      );

      if (tokens.length === 0) {
        return res.status(401).json({
          success: false,
          message: "Refresh token is invalid or has been revoked",
        });
      }

      const tokenData = tokens[0];

      // Check for suspicious activity (e.g., IP address change)
      const currentIp = req.ip || req.connection.remoteAddress;
      const currentUserAgent = req.headers["user-agent"];

      // If IP or user agent changed, this might be suspicious
      if (tokenData.ip_address && tokenData.ip_address !== currentIp) {
        console.warn(
          `Suspicious activity detected for user ${decoded.user_id}: IP changed from ${tokenData.ip_address} to ${currentIp}`
        );
        // You could revoke the token here or require re-authentication
        // For now, we'll allow it but log it
      }

      // Generate new access token
      const newAccessToken = AuthController.generateAccessToken(
        decoded.user_id,
        tokenData.Email_Account,
        tokenData.email_verified
      );

      res.status(200).json({
        success: true,
        message: "Access token refreshed successfully",
        accessToken: newAccessToken,
        tokenType: "Bearer",
        expiresIn: 300, // 5 minutes in seconds
      });
    } catch (error) {
      console.error("Token refresh error:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error during token refresh",
      });
    }
  }

  // Logout user and revoke refresh token
  static async logout(req, res) {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        return res.status(400).json({
          success: false,
          message: "Refresh token is required",
        });
      }

      // Revoke the refresh token
      await AuthController.revokeRefreshToken(refreshToken, "logout");

      res.status(200).json({
        success: true,
        message: "Logged out successfully",
      });
    } catch (error) {
      console.error("Logout error:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error during logout",
      });
    }
  }

  // Revoke all tokens for a user (in case of suspicious activity)
  static async revokeAllTokens(req, res) {
    try {
      const userId = req.user.user_id;

      await AuthController.revokeAllUserTokens(userId, "suspicious_activity");

      res.status(200).json({
        success: true,
        message: "All tokens have been revoked. Please log in again.",
      });
    } catch (error) {
      console.error("Revoke all tokens error:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }

  // Get user profile (protected route)
  static async getProfile(req, res) {
    try {
      // user_id comes from JWT token in middleware, NOT from request body
      const userId = req.user.user_id;

      const [users] = await pool.execute(
        "SELECT User_ID, Email_Account, email_verified, Status, created_at, last_login FROM user_account WHERE User_ID = ?",
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
          user_id: user.User_ID,
          email: user.Email_Account,
          email_verified: user.email_verified,
          status: user.Status,
          created_at: user.created_at,
          last_login: user.last_login,
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

  // Resend verification email
  static async resendVerificationEmail(req, res) {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({
          success: false,
          message: "Email is required",
        });
      }

      // Get user from database
      const [users] = await pool.execute(
        "SELECT User_ID, Email_Account, email_verified FROM user_account WHERE Email_Account = ?",
        [email]
      );

      if (users.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Email not found",
        });
      }

      const user = users[0];

      // Check if already verified
      if (user.email_verified) {
        return res.status(400).json({
          success: false,
          message: "Email is already verified",
        });
      }

      // Generate new verification token
      const verificationToken = crypto.randomBytes(32).toString("hex");

      // Update user with new token
      await pool.execute(
        `UPDATE user_account 
         SET verification_token = ?, 
             token_expires_at = DATE_ADD(NOW(), INTERVAL 24 HOUR),
             updated_at = NOW()
         WHERE User_ID = ?`,
        [verificationToken, user.User_ID]
      );

      // Send verification email
      const emailResult = await emailService.sendConfirmationEmail(
        email,
        email,
        verificationToken
      );

      res.status(200).json({
        success: true,
        message: emailResult.success
          ? "Verification email has been resent. Please check your inbox."
          : "User updated but email could not be sent. Please try again later.",
        data: {
          email_sent: emailResult.success,
        },
      });
    } catch (error) {
      console.error("Resend verification email error:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }

  // Request password reset
  static async requestPasswordReset(req, res) {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({
          success: false,
          message: "Email is required",
        });
      }

      // Get user from database
      const [users] = await pool.execute(
        "SELECT User_ID, Email_Account FROM user_account WHERE Email_Account = ?",
        [email]
      );

      // Always return success to prevent email enumeration
      if (users.length === 0) {
        return res.status(200).json({
          success: true,
          message: "If the email exists, a password reset link has been sent.",
        });
      }

      const user = users[0];

      // Generate reset token
      const resetToken = crypto.randomBytes(32).toString("hex");

      // Store reset token in database (expires in 1 hour)
      await pool.execute(
        `UPDATE user_account 
         SET verification_token = ?, 
             token_expires_at = DATE_ADD(NOW(), INTERVAL 1 HOUR),
             updated_at = NOW()
         WHERE User_ID = ?`,
        [resetToken, user.User_ID]
      );

      // Send password reset email
      const emailResult = await emailService.sendPasswordResetEmail(
        email,
        email,
        resetToken
      );

      res.status(200).json({
        success: true,
        message: "If the email exists, a password reset link has been sent.",
        data: {
          email_sent: emailResult?.success || false,
        },
      });
    } catch (error) {
      console.error("Request password reset error:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }

  // Reset password with token
  static async resetPassword(req, res) {
    try {
      const { token, newPassword } = req.body;

      if (!token || !newPassword) {
        return res.status(400).json({
          success: false,
          message: "Token and new password are required",
        });
      }

      // Validate password strength
      if (newPassword.length < 6) {
        return res.status(400).json({
          success: false,
          message: "Password must be at least 6 characters long",
        });
      }

      // Check if token exists and is not expired
      const [users] = await pool.execute(
        `SELECT User_ID, token_expires_at < NOW() as is_expired 
         FROM user_account 
         WHERE verification_token = ?`,
        [token]
      );

      if (users.length === 0) {
        return res.status(400).json({
          success: false,
          message: "Invalid reset token",
        });
      }

      const user = users[0];

      if (user.is_expired) {
        return res.status(400).json({
          success: false,
          message: "Reset token has expired",
        });
      }

      // Hash new password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

      // Update password and clear reset token
      await pool.execute(
        `UPDATE user_account 
         SET Password_Account = ?, 
             verification_token = NULL, 
             token_expires_at = NULL,
             updated_at = NOW()
         WHERE User_ID = ?`,
        [hashedPassword, user.User_ID]
      );

      // Revoke all existing refresh tokens for security
      await AuthController.revokeAllUserTokens(user.User_ID, "password_reset");

      res.status(200).json({
        success: true,
        message:
          "Password has been reset successfully. Please login with your new password.",
      });
    } catch (error) {
      console.error("Reset password error:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }

  // Change password (for logged-in users)
  static async changePassword(req, res) {
    try {
      // user_id comes from JWT token in middleware
      const userId = req.user.user_id;
      const { currentPassword, newPassword } = req.body;

      if (!currentPassword || !newPassword) {
        return res.status(400).json({
          success: false,
          message: "Current password and new password are required",
        });
      }

      // Validate new password strength
      if (newPassword.length < 6) {
        return res.status(400).json({
          success: false,
          message: "New password must be at least 6 characters long",
        });
      }

      // Get user from database
      const [users] = await pool.execute(
        "SELECT User_ID, Password_Account FROM user_account WHERE User_ID = ?",
        [userId]
      );

      if (users.length === 0) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      const user = users[0];

      // Verify current password
      const passwordMatch = await bcrypt.compare(
        currentPassword,
        user.Password_Account
      );
      if (!passwordMatch) {
        return res.status(401).json({
          success: false,
          message: "Current password is incorrect",
        });
      }

      // Check if new password is same as current
      const samePassword = await bcrypt.compare(
        newPassword,
        user.Password_Account
      );
      if (samePassword) {
        return res.status(400).json({
          success: false,
          message: "New password must be different from current password",
        });
      }

      // Hash new password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

      // Update password
      await pool.execute(
        `UPDATE user_account 
         SET Password_Account = ?, 
             updated_at = NOW()
         WHERE User_ID = ?`,
        [hashedPassword, userId]
      );

      // Revoke all existing refresh tokens except current one
      const { refreshToken } = req.body;
      await pool.execute(
        `UPDATE refresh_tokens 
         SET revoked = TRUE, revoked_reason = 'password_change', revoked_at = NOW()
         WHERE user_id = ? AND token != ? AND revoked = FALSE`,
        [userId, refreshToken || ""]
      );

      res.status(200).json({
        success: true,
        message: "Password changed successfully",
      });
    } catch (error) {
      console.error("Change password error:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
}

export default AuthController;
