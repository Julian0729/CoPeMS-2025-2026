const { pool } = require("../config/database");

// Error handler helper
const handleDbError = (error, response) => {
  console.error("Database error:", error);
  return response.status(500).json({
    success: false,
    message: "Database error occurred",
    error: process.env.NODE_ENV === "development" ? error.message : undefined,
  });
};

// fetch all building owners
async function getAllBldgOwners(request, response) {
  try {
    const [data] = await pool.query("CALL GetAllBldgOwners()");
    response.json({
      success: true,
      data: data[0],
    });
  } catch (error) {
    handleDbError(error, response);
  }
}

// fetch building owner by ID
async function getBldgOwnerById(request, response) {
  const { id } = request.params;
  try {
    const [data] = await pool.query("CALL GetBldgOwnerById(?)", [id]);

    if (data[0].length === 0) {
      return response.status(404).json({
        success: false,
        message: "Building Owner not found",
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

// insert a new building owner
async function insertBldgOwner(request, response) {
  try {
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

    const [data] = await pool.query(
      "CALL InsertBldgOwner(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
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
      ]
    );

    response.status(201).json({
      success: true,
      message: "Building Owner inserted successfully",
      data: data[0][0],
    });
  } catch (error) {
    return handleDbError(error, response);
  }
}

// update building owner data by ID
async function updateBldgOwner(request, response) {
  const { id } = request.params;
  try {
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

    const [data] = await pool.query(
      "CALL UpdateBldgOwner(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        id,
        last_name ?? null,
        first_name ?? null,
        middle_initial ?? null,
        tin ?? null,
        is_enterprise ?? null,
        form_of_ownership ?? null,
        province ?? null,
        city_municipality ?? null,
        barangay ?? null,
        house_no ?? null,
        street ?? null,
        contact_no ?? null,
      ]
    );

    if (data[0].length === 0) {
      return response.status(404).json({
        success: false,
        message: "Building Owner not found or no changes made",
      });
    }

    response.json({
      success: true,
      message: "Building Owner updated successfully",
      data: data[0][0],
    });
  } catch (error) {
    return handleDbError(error, response);
  }
}

// delete building owner by ID
async function deleteBldgOwner(request, response) {
  const { id } = request.params;
  try {
    await pool.query("CALL DeleteBldgOwner(?)", [id]);
    response.json({
      success: true,
      message: "Building Owner deleted successfully",
    });
  } catch (error) {
    return handleDbError(error, response);
  }
}

module.exports = {
  getAllBldgOwners,
  getBldgOwnerById,
  insertBldgOwner,
  updateBldgOwner,
  deleteBldgOwner,
};
