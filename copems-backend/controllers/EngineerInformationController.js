import { pool } from "../config/database.js";

const handleDbError = (error, response) => {
  console.error("Database error:", error);
  return response.status(500).json({
    success: false,
    message: "Database error occurred",
    error: process.env.NODE_ENV === "development" ? error.message : undefined,
  });
};

async function getAllEngineerInformation(request, response) {
  try {
    const [data] = await pool.query("CALL GetAllEngineerInformation()");
    response.json({
      success: true,
      data: data[0],
    });
  } catch (error) {
    handleDbError(error, response);
  }
}

async function getEngineerInformationById(request, response) {
  const { id } = request.params;
  try {
    const [data] = await pool.query("CALL GetEngineerInformationById(?)", [id]);

    if (data[0].length === 0) {
      return response.status(404).json({
        success: false,
        message: "Engineer Information not found",
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

async function insertEngineerInformation(request, response) {
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

    const [data] = await pool.query(
      "CALL InsertEngineerInformation(?, ?, ?, ?, ?, ?, ?, ?, ?)",
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
      ]
    );

    response.status(201).json({
      success: true,
      message: "Engineer Information inserted successfully",
      data: data[0][0],
    });
  } catch (error) {
    return handleDbError(error, response);
  }
}

async function updateEngineerInformation(request, response) {
  const { id } = request.params;
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

    const [data] = await pool.query(
      "CALL UpdateEngineerInformation(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        id,
        last_name ?? null,
        first_name ?? null,
        middle_initial ?? null,
        prc_no ?? null,
        prc_validity ?? null,
        ptr_no ?? null,
        ptr_date_issued ?? null,
        ptr_issued_at ?? null,
        tin ?? null,
      ]
    );

    if (data[0].length === 0) {
      return response.status(404).json({
        success: false,
        message: "Engineer Information not found or no changes made",
      });
    }

    response.json({
      success: true,
      message: "Engineer Information updated successfully",
      data: data[0][0],
    });
  } catch (error) {
    return handleDbError(error, response);
  }
}

async function deleteEngineerInformation(request, response) {
  const { id } = request.params;
  try {
    await pool.query("CALL DeleteEngineerInformation(?)", [id]);
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
