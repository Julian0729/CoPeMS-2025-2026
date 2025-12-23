import jwt from "jsonwebtoken";
import { pool } from "../config/database.js";

// Middleware to verify JWT access token
const verifyToken = (req, res, next) => {
  const token =
    req.header("Authorization")?.replace("Bearer ", "") ||
    req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "No token provided, authorization denied",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Verify it's an access token
    if (decoded.type !== "access") {
      return res.status(401).json({
        success: false,
        message: "Invalid token type. Access token required.",
      });
    }

    // Attach user data to request object
    // CRITICAL: user_id comes from JWT, never from request body
    req.user = {
      user_id: decoded.user_id,
      email: decoded.email,
      email_verified: decoded.email_verified,
    };

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Access token expired",
        code: "TOKEN_EXPIRED",
      });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
        code: "INVALID_TOKEN",
      });
    }

    res.status(401).json({
      success: false,
      message: "Token verification failed",
    });
  }
};

// Middleware to verify refresh token
const verifyRefreshToken = async (req, res, next) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({
      success: false,
      message: "No refresh token provided",
    });
  }

  try {
    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_TOKEN_SECRET || process.env.JWT_SECRET
    );

    // Verify it's a refresh token
    if (decoded.type !== "refresh") {
      return res.status(401).json({
        success: false,
        message: "Invalid token type. Refresh token required.",
      });
    }

    // Check if token is revoked in database
    const [tokens] = await pool.execute(
      `SELECT * FROM refresh_tokens 
       WHERE token = ? AND revoked = FALSE AND expires_at > NOW()`,
      [refreshToken]
    );

    if (tokens.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Refresh token is invalid or has been revoked",
      });
    }

    // Attach user data and token info to request
    req.user = {
      user_id: decoded.user_id,
    };
    req.tokenData = tokens[0];
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Refresh token expired",
        code: "REFRESH_TOKEN_EXPIRED",
      });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid refresh token",
        code: "INVALID_REFRESH_TOKEN",
      });
    }

    res.status(401).json({
      success: false,
      message: "Refresh token verification failed",
    });
  }
};

// Middleware to check if email is verified
const requireEmailVerification = (req, res, next) => {
  if (!req.user || !req.user.email_verified) {
    return res.status(403).json({
      success: false,
      message: "Email verification required",
      code: "EMAIL_NOT_VERIFIED",
    });
  }
  next();
};

// Middleware to check if user exists in database (optional extra security)
const verifyUserExists = async (req, res, next) => {
  try {
    const userId = req.user.user_id;

    const [users] = await pool.execute(
      "SELECT User_ID, Status FROM user_account WHERE User_ID = ?",
      [userId]
    );

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const user = users[0];

    // Check if user account is active
    if (user.Status !== "active") {
      return res.status(403).json({
        success: false,
        message: "Account is not active",
      });
    }

    next();
  } catch (error) {
    console.error("Error verifying user:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export {
  verifyToken,
  verifyRefreshToken,
  requireEmailVerification,
  verifyUserExists,
};
