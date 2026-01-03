import { pool } from "../config/database.js";

const handleDbError = (error, response) => {
  console.error("Database error:", error);
  return response.status(500).json({
    success: false,
    message: "Database error occurred",
    error: process.env.NODE_ENV === "development" ? error.message : undefined,
  });
};

// GET all building plans for the authenticated user
async function getAllBuildingPlans(request, response) {
  try {
    // SECURITY: Get user_id from JWT token (set by verifyToken middleware)
    const user_id = request.user.user_id;

    const [data] = await pool.execute(
      "SELECT * FROM building_plans WHERE user_id = ?",
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

// GET building plan by ID (with ownership verification)
async function getBuildingPlanById(request, response) {
  const { id } = request.params;
  const user_id = request.user.user_id; // SECURITY: From JWT token

  try {
    // SECURITY: Verify ownership with WHERE user_id = ?
    const [data] = await pool.execute(
      "SELECT * FROM building_plans WHERE building_plans_id = ? AND user_id = ?",
      [id, user_id]
    );

    if (data.length === 0) {
      return response.status(404).json({
        success: false,
        message: "Building Plan not found",
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

// GET building plans by application ID (with ownership verification)
async function getBuildingPlansByApplicationId(request, response) {
  const { application_id } = request.params;
  const user_id = request.user.user_id; // SECURITY: From JWT token

  try {
    // SECURITY: Filter by user_id to ensure ownership
    const [data] = await pool.execute(
      "SELECT * FROM building_plans WHERE application_id = ? AND user_id = ?",
      [application_id, user_id]
    );

    response.json({
      success: true,
      data: data,
    });
  } catch (error) {
    return handleDbError(error, response);
  }
}

// POST create new building plan
async function insertBuildingPlan(request, response) {
  try {
    // SECURITY: Get user_id from JWT token, NOT from request body
    const user_id = request.user.user_id;

    const {
      application_id,
      architectural_plans_uri,
      civil_structural_plans_uri,
      mechanical_plan_uri,
      electrical_plans_uri,
      plumbing_plans_uri,
    } = request.body;

    const [result] = await pool.execute(
      `INSERT INTO building_plans (
        user_id, application_id, architectural_plans_uri, civil_structural_plans_uri,
        mechanical_plan_uri, electrical_plans_uri, plumbing_plans_uri
      ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        user_id, // SECURITY: From JWT, not from request body
        application_id,
        architectural_plans_uri,
        civil_structural_plans_uri,
        mechanical_plan_uri,
        electrical_plans_uri,
        plumbing_plans_uri,
      ]
    );

    response.status(201).json({
      success: true,
      message: "Building Plan inserted successfully",
      data: {
        building_plans_id: result.insertId,
        user_id,
        application_id,
      },
    });
  } catch (error) {
    return handleDbError(error, response);
  }
}

// PUT update building plan by ID (with ownership verification)
async function updateBuildingPlan(request, response) {
  const { id } = request.params;
  const user_id = request.user.user_id; // SECURITY: From JWT token

  try {
    const {
      architectural_plans_uri,
      civil_structural_plans_uri,
      mechanical_plan_uri,
      electrical_plans_uri,
      plumbing_plans_uri,
    } = request.body;

    // SECURITY: Ownership check in WHERE clause
    const [result] = await pool.execute(
      `UPDATE building_plans SET
        architectural_plans_uri = COALESCE(?, architectural_plans_uri),
        civil_structural_plans_uri = COALESCE(?, civil_structural_plans_uri),
        mechanical_plan_uri = COALESCE(?, mechanical_plan_uri),
        electrical_plans_uri = COALESCE(?, electrical_plans_uri),
        plumbing_plans_uri = COALESCE(?, plumbing_plans_uri)
      WHERE building_plans_id = ? AND user_id = ?`,
      [
        architectural_plans_uri,
        civil_structural_plans_uri,
        mechanical_plan_uri,
        electrical_plans_uri,
        plumbing_plans_uri,
        id,
        user_id, // SECURITY: Ownership verification
      ]
    );

    if (result.affectedRows === 0) {
      return response.status(404).json({
        success: false,
        message: "Building Plan not found",
      });
    }

    response.json({
      success: true,
      message: "Building Plan updated successfully",
      data: { building_plans_id: id },
    });
  } catch (error) {
    return handleDbError(error, response);
  }
}

// DELETE building plan by ID (with ownership verification)
async function deleteBuildingPlan(request, response) {
  const { id } = request.params;
  const user_id = request.user.user_id; // SECURITY: From JWT token

  try {
    // SECURITY: Ownership check in WHERE clause
    const [result] = await pool.execute(
      "DELETE FROM building_plans WHERE building_plans_id = ? AND user_id = ?",
      [id, user_id]
    );

    if (result.affectedRows === 0) {
      return response.status(404).json({
        success: false,
        message: "Building Plan not found",
      });
    }

    response.json({
      success: true,
      message: "Building Plan deleted successfully",
    });
  } catch (error) {
    return handleDbError(error, response);
  }
}

export default {
  getAllBuildingPlans,
  getBuildingPlanById,
  getBuildingPlansByApplicationId,
  insertBuildingPlan,
  updateBuildingPlan,
  deleteBuildingPlan,
};
