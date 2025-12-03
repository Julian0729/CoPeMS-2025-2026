import { pool } from "../config/database.js";

const handleDbError = (error, response) => {
  console.error("Database error:", error);
  return response.status(500).json({
    success: false,
    message: "Database error occurred",
    error: process.env.NODE_ENV === "development" ? error.message : undefined,
  });
};

async function getAllLotRepresentatives(request, response) {
  try {
    const [data] = await pool.query("CALL GetAllLotRepresentatives()");
    response.json({
      success: true,
      data: data[0],
    });
  } catch (error) {
    handleDbError(error, response);
  }
}

async function getLotRepresentativeById(request, response) {
  const { id } = request.params;
  try {
    const [data] = await pool.query("CALL GetLotRepresentativeById(?)", [id]);

    if (data[0].length === 0) {
      return response.status(404).json({
        success: false,
        message: "Lot Representative not found",
      });
    }
    response.json({
      success: true,
      data: data[0][0],
    });
  } catch (error) {
    return handleDbError(error, response);
  }
}

async function insertLotRepresentative(request, response) {
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

    const [data] = await pool.query(
      "CALL InsertLotRepresentative(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
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
      ]
    );

    response.status(201).json({
      success: true,
      message: "Lot Representative inserted successfully",
      data: data[0][0],
    });
  } catch (error) {
    return handleDbError(error, response);
  }
}

async function updateLotRepresentative(request, response) {
  const { id } = request.params;
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

    const [data] = await pool.query(
      "CALL UpdateLotRepresentative(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        id,
        last_name ?? null,
        first_name ?? null,
        middle_initial ?? null,
        house_no ?? null,
        street ?? null,
        govt_issued_id_no ?? null,
        date_issued ?? null,
        place_issued ?? null,
        province_id ?? null,
        barangay_id ?? null,
      ]
    );

    if (data[0].length === 0) {
      return response.status(404).json({
        success: false,
        message: "Lot Representative not found or no changes made",
      });
    }

    response.json({
      success: true,
      message: "Lot Representative updated successfully",
      data: data[0][0],
    });
  } catch (error) {
    return handleDbError(error, response);
  }
}

async function deleteLotRepresentative(request, response) {
  const { id } = request.params;
  try {
    await pool.query("CALL DeleteLotRepresentative(?)", [id]);
    response.json({
      success: true,
      message: "Lot Representative deleted successfully",
    });
  } catch (error) {
    return handleDbError(error, response);
  }
}

// Helper function to get all provinces
async function getAllProvinces(request, response) {
  try {
    const [data] = await pool.query(
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

// Helper function to get all barangays
async function getAllBarangays(request, response) {
  try {
    const [data] = await pool.query(
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
