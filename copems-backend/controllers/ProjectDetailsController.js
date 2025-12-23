import { pool } from "../config/database.js";

const handleDbError = (error, response) => {
  console.error("Database error:", error);
  return response.status(500).json({
    success: false,
    message: "Database error occurred",
    error: process.env.NODE_ENV === "development" ? error.message : undefined,
  });
};

// GET all project details for the authenticated user
async function getAllProjectDetails(request, response) {
  try {
    // SECURITY: Get user_id from JWT token (set by verifyToken middleware)
    const user_id = request.user.user_id;

    const [data] = await pool.execute(
      "SELECT * FROM project_details WHERE user_id = ?",
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

// GET project details by ID (with ownership verification)
async function getProjectDetailsById(request, response) {
  const { id } = request.params;
  const user_id = request.user.user_id; // SECURITY: From JWT token

  try {
    // SECURITY: Verify ownership with WHERE user_id = ?
    const [data] = await pool.execute(
      "SELECT * FROM project_details WHERE project_details_id = ? AND user_id = ?",
      [id, user_id]
    );

    if (data.length === 0) {
      return response.status(404).json({
        success: false,
        message: "Project Details not found",
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

// POST create new project details
async function insertProjectDetails(request, response) {
  try {
    // SECURITY: Get user_id from JWT token, NOT from request body
    const user_id = request.user.user_id;

    const {
      application_id,
      occupancy_classified,
      total_estimated_cost,
      number_of_units,
      number_of_storey,
      total_floor_area_sqm,
      lot_area_sqm,
      building_cost,
      electrical_cost,
      mechanical_cost,
      electronics_cost,
      plumbing_cost,
      others_cost,
      proposed_date_of_construction,
      expected_date_of_completion,
    } = request.body;

    const [result] = await pool.execute(
      `INSERT INTO project_details (
        user_id, application_id, occupancy_classified, total_estimated_cost,
        number_of_units, number_of_storey, total_floor_area_sqm, lot_area_sqm,
        building_cost, electrical_cost, mechanical_cost, electronics_cost,
        plumbing_cost, others_cost, proposed_date_of_construction, expected_date_of_completion
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        user_id, // SECURITY: From JWT, not from request body
        application_id,
        occupancy_classified,
        total_estimated_cost,
        number_of_units,
        number_of_storey,
        total_floor_area_sqm,
        lot_area_sqm,
        building_cost,
        electrical_cost,
        mechanical_cost,
        electronics_cost,
        plumbing_cost,
        others_cost,
        proposed_date_of_construction,
        expected_date_of_completion,
      ]
    );

    response.status(201).json({
      success: true,
      message: "Project Details inserted successfully",
      data: {
        project_details_id: result.insertId,
        user_id,
        application_id,
      },
    });
  } catch (error) {
    return handleDbError(error, response);
  }
}

// PUT update project details by ID (with ownership verification)
async function updateProjectDetails(request, response) {
  const { id } = request.params;
  const user_id = request.user.user_id; // SECURITY: From JWT token

  try {
    const {
      occupancy_classified,
      total_estimated_cost,
      number_of_units,
      number_of_storey,
      total_floor_area_sqm,
      lot_area_sqm,
      building_cost,
      electrical_cost,
      mechanical_cost,
      electronics_cost,
      plumbing_cost,
      others_cost,
      proposed_date_of_construction,
      expected_date_of_completion,
    } = request.body;

    // SECURITY: Ownership check in WHERE clause
    const [result] = await pool.execute(
      `UPDATE project_details SET
        occupancy_classified = COALESCE(?, occupancy_classified),
        total_estimated_cost = COALESCE(?, total_estimated_cost),
        number_of_units = COALESCE(?, number_of_units),
        number_of_storey = COALESCE(?, number_of_storey),
        total_floor_area_sqm = COALESCE(?, total_floor_area_sqm),
        lot_area_sqm = COALESCE(?, lot_area_sqm),
        building_cost = COALESCE(?, building_cost),
        electrical_cost = COALESCE(?, electrical_cost),
        mechanical_cost = COALESCE(?, mechanical_cost),
        electronics_cost = COALESCE(?, electronics_cost),
        plumbing_cost = COALESCE(?, plumbing_cost),
        others_cost = COALESCE(?, others_cost),
        proposed_date_of_construction = COALESCE(?, proposed_date_of_construction),
        expected_date_of_completion = COALESCE(?, expected_date_of_completion)
      WHERE project_details_id = ? AND user_id = ?`,
      [
        occupancy_classified,
        total_estimated_cost,
        number_of_units,
        number_of_storey,
        total_floor_area_sqm,
        lot_area_sqm,
        building_cost,
        electrical_cost,
        mechanical_cost,
        electronics_cost,
        plumbing_cost,
        others_cost,
        proposed_date_of_construction,
        expected_date_of_completion,
        id,
        user_id, // SECURITY: Ownership verification
      ]
    );

    if (result.affectedRows === 0) {
      return response.status(404).json({
        success: false,
        message: "Project Details not found",
      });
    }

    response.json({
      success: true,
      message: "Project Details updated successfully",
      data: { project_details_id: id },
    });
  } catch (error) {
    return handleDbError(error, response);
  }
}

// DELETE project details by ID (with ownership verification)
async function deleteProjectDetails(request, response) {
  const { id } = request.params;
  const user_id = request.user.user_id; // SECURITY: From JWT token

  try {
    // SECURITY: Ownership check in WHERE clause
    const [result] = await pool.execute(
      "DELETE FROM project_details WHERE project_details_id = ? AND user_id = ?",
      [id, user_id]
    );

    if (result.affectedRows === 0) {
      return response.status(404).json({
        success: false,
        message: "Project Details not found",
      });
    }

    response.json({
      success: true,
      message: "Project Details deleted successfully",
    });
  } catch (error) {
    return handleDbError(error, response);
  }
}

export default {
  getAllProjectDetails,
  getProjectDetailsById,
  insertProjectDetails,
  updateProjectDetails,
  deleteProjectDetails,
};
