import { pool } from "../config/database.js";

const handleDbError = (error, response) => {
  console.error("Database error:", error);
  return response.status(500).json({
    success: false,
    message: "Database error occurred",
    error: process.env.NODE_ENV === "development" ? error.message : undefined,
  });
};

async function getAllOccupancyTypes(request, response) {
  try {
    const [data] = await pool.query("CALL GetAllOccupancyTypes()");
    response.json({
      success: true,
      data: data[0],
    });
  } catch (error) {
    handleDbError(error, response);
  }
}

async function getOccupancyTypeById(request, response) {
  const { id } = request.params;
  try {
    const [data] = await pool.query("CALL GetOccupancyTypeById(?)", [id]);

    if (data[0].length === 0) {
      return response.status(404).json({
        success: false,
        message: "Occupancy Type not found",
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

async function insertOccupancyType(request, response) {
  try {
    const { type_name, description } = request.body;

    const [data] = await pool.query("CALL InsertOccupancyType(?, ?)", [
      type_name,
      description,
    ]);

    response.status(201).json({
      success: true,
      message: "Occupancy Type inserted successfully",
      data: data[0][0],
    });
  } catch (error) {
    return handleDbError(error, response);
  }
}

async function updateOccupancyType(request, response) {
  const { id } = request.params;
  try {
    const { type_name, description } = request.body;

    const [data] = await pool.query("CALL UpdateOccupancyType(?, ?, ?)", [
      id,
      type_name ?? null,
      description ?? null,
    ]);

    if (data && data[0] && data[0].length === 0) {
      return response.status(404).json({
        success: false,
        message: "Occupancy Type not found or no changes made",
      });
    }

    response.json({
      success: true,
      message: "Occupancy Type updated successfully",
      data:
        data && data[0] && data[0][0] ? data[0][0] : { occupancy_type_id: id },
    });
  } catch (error) {
    return handleDbError(error, response);
  }
}

async function deleteOccupancyType(request, response) {
  const { id } = request.params;
  try {
    await pool.query("CALL DeleteOccupancyType(?)", [id]);
    response.json({
      success: true,
      message: "Occupancy Type deleted successfully",
    });
  } catch (error) {
    return handleDbError(error, response);
  }
}

export default {
  getAllOccupancyTypes,
  getOccupancyTypeById,
  insertOccupancyType,
  updateOccupancyType,
  deleteOccupancyType,
};
