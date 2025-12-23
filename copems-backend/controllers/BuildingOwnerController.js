import { pool } from "../config/database.js";

const handleDbError = (error, response) => {
  console.error("Database error:", error);
  return response.status(500).json({
    success: false,
    message: "Database error occurred",
    error: process.env.NODE_ENV === "development" ? error.message : undefined,
  });
};

// Get all building owners for logged-in user
async function getAllBldgOwners(request, response) {
  try {
    // SECURITY: Get user_id from JWT token
    const user_id = request.user.user_id;

    const [data] = await pool.execute(
      "SELECT * FROM bldg_owner WHERE user_id = ? ORDER BY created_at DESC",
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

// Get building owner by ID (with ownership verification)
async function getBldgOwnerById(request, response) {
  try {
    // SECURITY: Verify ownership
    const user_id = request.user.user_id;
    const { id } = request.params;

    const [data] = await pool.execute(
      "SELECT * FROM bldg_owner WHERE bldg_owner_id = ? AND user_id = ?",
      [id, user_id]
    );

    if (data.length === 0) {
      return response.status(404).json({
        success: false,
        message: "Building Owner not found",
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

// Insert new building owner
async function insertBldgOwner(request, response) {
  try {
    // SECURITY: Get user_id from JWT token, NOT from request body
    const user_id = request.user.user_id;

    const {
      last_name,
      first_name,
      middle_initial,
      tin,
      is_enterprise,
      form_of_ownership,
      province,
      city_municipality,
      barangay,
      house_no,
      street,
      contact_no,
    } = request.body;

    // Validate required fields
    if (!last_name || !first_name) {
      return response.status(400).json({
        success: false,
        message: "Last name and first name are required",
      });
    }

    const [result] = await pool.execute(
      `INSERT INTO bldg_owner (
        user_id, last_name, first_name, middle_initial, tin, is_enterprise,
        form_of_ownership, province, city_municipality, barangay, 
        house_no, street, contact_no
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        user_id,
        last_name,
        first_name,
        middle_initial,
        tin,
        is_enterprise || false,
        form_of_ownership,
        province,
        city_municipality,
        barangay,
        house_no,
        street,
        contact_no,
      ]
    );

    response.status(201).json({
      success: true,
      message: "Building Owner created successfully",
      data: {
        bldg_owner_id: result.insertId,
        user_id: user_id,
      },
    });
  } catch (error) {
    return handleDbError(error, response);
  }
}

// Update building owner (with ownership verification)
async function updateBldgOwner(request, response) {
  try {
    // SECURITY: Verify ownership
    const user_id = request.user.user_id;
    const { id } = request.params;

    const {
      last_name,
      first_name,
      middle_initial,
      tin,
      is_enterprise,
      form_of_ownership,
      province,
      city_municipality,
      barangay,
      house_no,
      street,
      contact_no,
    } = request.body;

    const [result] = await pool.execute(
      `UPDATE bldg_owner 
       SET last_name = ?, first_name = ?, middle_initial = ?, 
           tin = ?, is_enterprise = ?, form_of_ownership = ?, 
           province = ?, city_municipality = ?, barangay = ?, 
           house_no = ?, street = ?, contact_no = ?,
           updated_at = NOW()
       WHERE bldg_owner_id = ? AND user_id = ?`,
      [
        last_name,
        first_name,
        middle_initial,
        tin,
        is_enterprise,
        form_of_ownership,
        province,
        city_municipality,
        barangay,
        house_no,
        street,
        contact_no,
        id,
        user_id,
      ]
    );

    if (result.affectedRows === 0) {
      return response.status(404).json({
        success: false,
        message: "Building Owner not found or you don't have permission",
      });
    }

    response.json({
      success: true,
      message: "Building Owner updated successfully",
    });
  } catch (error) {
    return handleDbError(error, response);
  }
}

// Delete building owner (with ownership verification)
async function deleteBldgOwner(request, response) {
  try {
    // SECURITY: Verify ownership before delete
    const user_id = request.user.user_id;
    const { id } = request.params;

    const [result] = await pool.execute(
      "DELETE FROM bldg_owner WHERE bldg_owner_id = ? AND user_id = ?",
      [id, user_id]
    );

    if (result.affectedRows === 0) {
      return response.status(404).json({
        success: false,
        message: "Building Owner not found or you don't have permission",
      });
    }

    response.json({
      success: true,
      message: "Building Owner deleted successfully",
    });
  } catch (error) {
    return handleDbError(error, response);
  }
}

export default {
  getAllBldgOwners,
  getBldgOwnerById,
  insertBldgOwner,
  updateBldgOwner,
  deleteBldgOwner,
};
