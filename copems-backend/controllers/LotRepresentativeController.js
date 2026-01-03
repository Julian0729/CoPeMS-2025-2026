import { pool } from "../config/database.js";

const handleDbError = (error, response) => {
  console.error("Database error:", error);
  return response.status(500).json({
    success: false,
    message: "Database error occurred",
    error: process.env.NODE_ENV === "development" ? error.message : undefined,
  });
};

// GET all lot representatives for the authenticated user
async function getAllLotRepresentatives(request, response) {
  try {
    // SECURITY: Get user_id from JWT token (set by verifyToken middleware)
    const user_id = request.user.user_id;

    const [data] = await pool.execute(
      "SELECT * FROM lot_representative WHERE user_id = ?",
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

// GET lot representative by ID (with ownership verification)
async function getLotRepresentativeById(request, response) {
  const { id } = request.params;
  const user_id = request.user.user_id; // SECURITY: From JWT token

  try {
    // SECURITY: Verify ownership with WHERE user_id = ?
    const [data] = await pool.execute(
      "SELECT * FROM lot_representative WHERE lot_representative_id = ? AND user_id = ?",
      [id, user_id]
    );

    if (data.length === 0) {
      return response.status(404).json({
        success: false,
        message: "Lot Representative not found",
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

// POST create new lot representative
async function insertLotRepresentative(request, response) {
  try {
    // SECURITY: Get user_id from JWT token, NOT from request body
    const user_id = request.user.user_id;

    const {
      last_name,
      first_name,
      middle_initial,
      house_no,
      street,
      govt_issued_id_no,
      date_issued,
      place_issued,
      province_id,
      barangay_id,
    } = request.body;

    const [result] = await pool.execute(
      `INSERT INTO lot_representative (
        user_id, last_name, first_name, middle_initial, house_no, street,
        govt_issued_id_no, date_issued, place_issued, province_id, barangay_id
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        user_id, // SECURITY: From JWT, not from request body
        last_name,
        first_name,
        middle_initial,
        house_no,
        street,
        govt_issued_id_no,
        date_issued,
        place_issued,
        province_id,
        barangay_id,
      ]
    );

    response.status(201).json({
      success: true,
      message: "Lot Representative inserted successfully",
      data: {
        lot_representative_id: result.insertId,
        user_id,
      },
    });
  } catch (error) {
    return handleDbError(error, response);
  }
}

// PUT update lot representative by ID (with ownership verification)
async function updateLotRepresentative(request, response) {
  const { id } = request.params;
  const user_id = request.user.user_id; // SECURITY: From JWT token

  try {
    const {
      last_name,
      first_name,
      middle_initial,
      house_no,
      street,
      govt_issued_id_no,
      date_issued,
      place_issued,
      province_id,
      barangay_id,
    } = request.body;

    // SECURITY: Ownership check in WHERE clause
    const [result] = await pool.execute(
      `UPDATE lot_representative SET
        last_name = COALESCE(?, last_name),
        first_name = COALESCE(?, first_name),
        middle_initial = COALESCE(?, middle_initial),
        house_no = COALESCE(?, house_no),
        street = COALESCE(?, street),
        govt_issued_id_no = COALESCE(?, govt_issued_id_no),
        date_issued = COALESCE(?, date_issued),
        place_issued = COALESCE(?, place_issued),
        province_id = COALESCE(?, province_id),
        barangay_id = COALESCE(?, barangay_id)
      WHERE lot_representative_id = ? AND user_id = ?`,
      [
        last_name,
        first_name,
        middle_initial,
        house_no,
        street,
        govt_issued_id_no,
        date_issued,
        place_issued,
        province_id,
        barangay_id,
        id,
        user_id, // SECURITY: Ownership verification
      ]
    );

    if (result.affectedRows === 0) {
      return response.status(404).json({
        success: false,
        message: "Lot Representative not found",
      });
    }

    response.json({
      success: true,
      message: "Lot Representative updated successfully",
      data: { lot_representative_id: id },
    });
  } catch (error) {
    return handleDbError(error, response);
  }
}

// DELETE lot representative by ID (with ownership verification)
async function deleteLotRepresentative(request, response) {
  const { id } = request.params;
  const user_id = request.user.user_id; // SECURITY: From JWT token

  try {
    // SECURITY: Ownership check in WHERE clause
    const [result] = await pool.execute(
      "DELETE FROM lot_representative WHERE lot_representative_id = ? AND user_id = ?",
      [id, user_id]
    );

    if (result.affectedRows === 0) {
      return response.status(404).json({
        success: false,
        message: "Lot Representative not found",
      });
    }

    response.json({
      success: true,
      message: "Lot Representative deleted successfully",
    });
  } catch (error) {
    return handleDbError(error, response);
  }
}

// Helper function to get all provinces (no authentication required - reference data)
async function getAllProvinces(request, response) {
  try {
    const [data] = await pool.execute(
      "SELECT * FROM provinces ORDER BY province_name"
    );
    response.json({
      success: true,
      data: data,
    });
  } catch (error) {
    handleDbError(error, response);
  }
}

// Helper function to get all barangays (no authentication required - reference data)
async function getAllBarangays(request, response) {
  try {
    const [data] = await pool.execute(
      "SELECT * FROM barangay_list ORDER BY barangay_name"
    );
    response.json({
      success: true,
      data: data,
    });
  } catch (error) {
    handleDbError(error, response);
  }
}

export default {
  getAllLotRepresentatives,
  getLotRepresentativeById,
  insertLotRepresentative,
  updateLotRepresentative,
  deleteLotRepresentative,
  getAllProvinces,
  getAllBarangays,
};
