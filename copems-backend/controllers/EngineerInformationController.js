import { pool } from "../config/database.js";

const handleDbError = (error, response) => {
  console.error("Database error:", error);
  return response.status(500).json({
    success: false,
    message: "Database error occurred",
    error: process.env.NODE_ENV === "development" ? error.message : undefined,
  });
};

// GET all engineer information for the authenticated user
async function getAllEngineerInformation(request, response) {
  try {
    // SECURITY: Get user_id from JWT token (set by verifyToken middleware)
    const user_id = request.user.user_id;

    const [data] = await pool.execute(
      "SELECT * FROM engineer_information WHERE user_id = ?",
      [user_id]
    );

    response.json({
      success: true,
      data: data,
    });
  } catch (error) {
    handleDbError(error, response);
  }
}

// GET engineer information by ID (with ownership verification)
async function getEngineerInformationById(request, response) {
  const { id } = request.params;
  const user_id = request.user.user_id; // SECURITY: From JWT token

  try {
    // SECURITY: Verify ownership with WHERE user_id = ?
    const [data] = await pool.execute(
      "SELECT * FROM engineer_information WHERE engineer_information_id = ? AND user_id = ?",
      [id, user_id]
    );

    if (data.length === 0) {
      return response.status(404).json({
        success: false,
        message: "Engineer Information not found",
      });
    }

    response.json({
      success: true,
      data: data[0],
    });
  } catch (error) {
    return handleDbError(error, response);
  }
}

// POST create new engineer information
async function insertEngineerInformation(request, response) {
  try {
    // SECURITY: Get user_id from JWT token, NOT from request body
    const user_id = request.user.user_id;

    const {
      last_name,
      first_name,
      middle_initial,
      prc_no,
      prc_validity,
      ptr_no,
      ptr_date_issued,
      ptr_issued_at,
      tin,
    } = request.body;

    const [result] = await pool.execute(
      `INSERT INTO engineer_information (
        user_id, last_name, first_name, middle_initial, prc_no,
        prc_validity, ptr_no, ptr_date_issued, ptr_issued_at, tin
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        user_id, // SECURITY: From JWT, not from request body
        last_name,
        first_name,
        middle_initial,
        prc_no,
        prc_validity,
        ptr_no,
        ptr_date_issued,
        ptr_issued_at,
        tin,
      ]
    );

    response.status(201).json({
      success: true,
      message: "Engineer Information inserted successfully",
      data: {
        engineer_information_id: result.insertId,
        user_id,
      },
    });
  } catch (error) {
    return handleDbError(error, response);
  }
}

// PUT update engineer information by ID (with ownership verification)
async function updateEngineerInformation(request, response) {
  const { id } = request.params;
  const user_id = request.user.user_id; // SECURITY: From JWT token

  try {
    const {
      last_name,
      first_name,
      middle_initial,
      prc_no,
      prc_validity,
      ptr_no,
      ptr_date_issued,
      ptr_issued_at,
      tin,
    } = request.body;

    // SECURITY: Ownership check in WHERE clause
    const [result] = await pool.execute(
      `UPDATE engineer_information SET
        last_name = COALESCE(?, last_name),
        first_name = COALESCE(?, first_name),
        middle_initial = COALESCE(?, middle_initial),
        prc_no = COALESCE(?, prc_no),
        prc_validity = COALESCE(?, prc_validity),
        ptr_no = COALESCE(?, ptr_no),
        ptr_date_issued = COALESCE(?, ptr_date_issued),
        ptr_issued_at = COALESCE(?, ptr_issued_at),
        tin = COALESCE(?, tin)
      WHERE engineer_information_id = ? AND user_id = ?`,
      [
        last_name,
        first_name,
        middle_initial,
        prc_no,
        prc_validity,
        ptr_no,
        ptr_date_issued,
        ptr_issued_at,
        tin,
        id,
        user_id, // SECURITY: Ownership verification
      ]
    );

    if (result.affectedRows === 0) {
      return response.status(404).json({
        success: false,
        message: "Engineer Information not found",
      });
    }

    response.json({
      success: true,
      message: "Engineer Information updated successfully",
      data: { engineer_information_id: id },
    });
  } catch (error) {
    return handleDbError(error, response);
  }
}

// DELETE engineer information by ID (with ownership verification)
async function deleteEngineerInformation(request, response) {
  const { id } = request.params;
  const user_id = request.user.user_id; // SECURITY: From JWT token

  try {
    // SECURITY: Ownership check in WHERE clause
    const [result] = await pool.execute(
      "DELETE FROM engineer_information WHERE engineer_information_id = ? AND user_id = ?",
      [id, user_id]
    );

    if (result.affectedRows === 0) {
      return response.status(404).json({
        success: false,
        message: "Engineer Information not found",
      });
    }

    response.json({
      success: true,
      message: "Engineer Information deleted successfully",
    });
  } catch (error) {
    return handleDbError(error, response);
  }
}

export default {
  getAllEngineerInformation,
  getEngineerInformationById,
  insertEngineerInformation,
  updateEngineerInformation,
  deleteEngineerInformation,
};
