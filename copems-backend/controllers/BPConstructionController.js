import { pool } from "../config/database.js";

// Error handler helper
const handleDbError = (error, response) => {
  console.error("Database error:", error);
  return response.status(500).json({
    success: false,
    message: "Database error occurred",
    error: process.env.NODE_ENV === "development" ? error.message : undefined,
  });
};

// fetch all construction records
async function getAllBpConstructions(request, response) {
  try {
    // Assuming a stored procedure named GetAllBpConstructions exists
    const [data] = await pool.query("CALL GetAllBpConstructions()");
    response.json({
      success: true,
      data: data[0],
    });
  } catch (error) {
    handleDbError(error, response);
  }
}

// fetch construction record by ID
async function getBpConstructionById(request, response) {
  const { id } = request.params;
  try {
    // Assuming a stored procedure named GetBpConstructionById exists
    const [data] = await pool.query("CALL GetBpConstructionById(?)", [id]);

    if (data[0].length === 0) {
      return response.status(404).json({
        success: false,
        message: "Construction record not found",
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

// insert a new construction record
async function insertBpConstruction(request, response) {
  try {
    const {
      barangay,
      blk_no,
      street,
      tct_no,
      current_tax_dec_no,
      scope_of_work,
    } = request.body;

    // Call procedure with scope_of_work
    const [data] = await pool.query(
      "CALL InsertBpConstruction(?, ?, ?, ?, ?, ?)",
      [barangay, blk_no, street, tct_no, current_tax_dec_no, scope_of_work]
    );

    response.status(201).json({
      success: true,
      message: "Construction record inserted successfully",
      data: data[0][0],
    });
  } catch (error) {
    return handleDbError(error, response);
  }
}

// update construction record data by ID
async function updateBpConstruction(request, response) {
  const { id } = request.params;
  try {
    const {
      barangay,
      blk_no,
      street,
      tct_no,
      current_tax_dec_no,
      scope_of_work,
    } = request.body;

    // Call procedure with scope_of_work
    const [data] = await pool.query(
      "CALL UpdateBpConstruction(?, ?, ?, ?, ?, ?, ?)",
      [
        id,
        barangay ?? null,
        blk_no ?? null,
        street ?? null,
        tct_no ?? null,
        current_tax_dec_no ?? null,
        scope_of_work ?? null,
      ]
    );

    if (data[0].length === 0) {
      return response.status(404).json({
        success: false,
        message: "Construction record not found or no changes made",
      });
    }

    response.json({
      success: true,
      message: "Construction record updated successfully",
      data: data[0][0],
    });
  } catch (error) {
    return handleDbError(error, response);
  }
}

// delete construction record by ID
async function deleteBpConstruction(request, response) {
  const { id } = request.params;
  try {
    // Assuming a stored procedure named DeleteBpConstruction exists
    await pool.query("CALL DeleteBpConstruction(?)", [id]);
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
