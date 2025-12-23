import { pool } from "../config/database.js";

const handleDbError = (error, response) => {
  console.error("Database error:", error);
  return response.status(500).json({
    success: false,
    message: "Database error occurred",
    error: process.env.NODE_ENV === "development" ? error.message : undefined,
  });
};

// Get all BP Construction records for logged-in user
async function getAllBpConstructions(request, response) {
  try {
    // SECURITY: Get user_id from JWT token
    const user_id = request.user.user_id;

    const [data] = await pool.execute(
      "SELECT * FROM bp_construction WHERE user_id = ? ORDER BY created_at DESC",
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

// Get BP Construction by ID (with ownership verification)
async function getBpConstructionById(request, response) {
  try {
    // SECURITY: Verify ownership
    const user_id = request.user.user_id;
    const { id } = request.params;

    const [data] = await pool.execute(
      "SELECT * FROM bp_construction WHERE bp_construction_id = ? AND user_id = ?",
      [id, user_id]
    );

    if (data.length === 0) {
      return response.status(404).json({
        success: false,
        message: "Construction record not found",
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

// Insert new BP Construction record
async function insertBpConstruction(request, response) {
  try {
    // SECURITY: Get user_id from JWT token, NOT from request body
    const user_id = request.user.user_id;

    const {
      barangay,
      blk_no,
      street,
      tct_no,
      current_tax_dec_no,
      scope_of_work,
    } = request.body;

    // Validate required fields
    if (!barangay) {
      return response.status(400).json({
        success: false,
        message: "Barangay is required",
      });
    }

    const [result] = await pool.execute(
      `INSERT INTO bp_construction (
        user_id, barangay, blk_no, street, tct_no, 
        current_tax_dec_no, scope_of_work
      ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        user_id,
        barangay,
        blk_no,
        street,
        tct_no,
        current_tax_dec_no,
        scope_of_work,
      ]
    );

    response.status(201).json({
      success: true,
      message: "Construction record created successfully",
      data: {
        bp_construction_id: result.insertId,
        user_id: user_id,
      },
    });
  } catch (error) {
    return handleDbError(error, response);
  }
}

// Update BP Construction record (with ownership verification)
async function updateBpConstruction(request, response) {
  try {
    // SECURITY: Verify ownership
    const user_id = request.user.user_id;
    const { id } = request.params;

    const {
      barangay,
      blk_no,
      street,
      tct_no,
      current_tax_dec_no,
      scope_of_work,
    } = request.body;

    const [result] = await pool.execute(
      `UPDATE bp_construction 
       SET barangay = ?, blk_no = ?, street = ?, 
           tct_no = ?, current_tax_dec_no = ?, scope_of_work = ?,
           updated_at = NOW()
       WHERE bp_construction_id = ? AND user_id = ?`,
      [
        barangay,
        blk_no,
        street,
        tct_no,
        current_tax_dec_no,
        scope_of_work,
        id,
        user_id,
      ]
    );

    if (result.affectedRows === 0) {
      return response.status(404).json({
        success: false,
        message: "Construction record not found or you don't have permission",
      });
    }

    response.json({
      success: true,
      message: "Construction record updated successfully",
    });
  } catch (error) {
    return handleDbError(error, response);
  }
}

// Delete BP Construction record (with ownership verification)
async function deleteBpConstruction(request, response) {
  try {
    // SECURITY: Verify ownership before delete
    const user_id = request.user.user_id;
    const { id } = request.params;

    const [result] = await pool.execute(
      "DELETE FROM bp_construction WHERE bp_construction_id = ? AND user_id = ?",
      [id, user_id]
    );

    if (result.affectedRows === 0) {
      return response.status(404).json({
        success: false,
        message: "Construction record not found or you don't have permission",
      });
    }

    response.json({
      success: true,
      message: "Construction record deleted successfully",
    });
  } catch (error) {
    return handleDbError(error, response);
  }
}

export {
  getAllBpConstructions,
  getBpConstructionById,
  insertBpConstruction,
  updateBpConstruction,
  deleteBpConstruction,
};
