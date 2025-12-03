import { pool } from "../config/database.js";

const handleDbError = (error, response) => {
  console.error("Database error:", error);
  return response.status(500).json({
    success: false,
    message: "Database error occurred",
    error: process.env.NODE_ENV === "development" ? error.message : undefined,
  });
};

async function getAllBuildingPlans(request, response) {
  try {
    const [data] = await pool.query("CALL GetAllBuildingPlans()");
    response.json({
      success: true,
      data: data[0],
    });
  } catch (error) {
    handleDbError(error, response);
  }
}

async function getBuildingPlanById(request, response) {
  const { id } = request.params;
  try {
    const [data] = await pool.query("CALL GetBuildingPlanById(?)", [id]);

    if (data[0].length === 0) {
      return response.status(404).json({
        success: false,
        message: "Building Plan not found",
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

async function getBuildingPlansByApplicationId(request, response) {
  const { application_id } = request.params;
  try {
    const [data] = await pool.query("CALL GetBuildingPlansByApplicationId(?)", [
      application_id,
    ]);
    response.json({
      success: true,
      data: data[0],
    });
  } catch (error) {
    return handleDbError(error, response);
  }
}

async function insertBuildingPlan(request, response) {
  try {
    const {
      application_id,
      architectural_plans_uri,
      civil_structural_plans_uri,
      mechanical_plan_uri,
      electrical_plans_uri,
      plumbing_plans_uri,
    } = request.body;

    const [data] = await pool.query(
      "CALL InsertBuildingPlan(?, ?, ?, ?, ?, ?)",
      [
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
      data: data[0][0],
    });
  } catch (error) {
    return handleDbError(error, response);
  }
}

async function updateBuildingPlan(request, response) {
  const { id } = request.params;
  try {
    const {
      application_id,
      architectural_plans_uri,
      civil_structural_plans_uri,
      mechanical_plan_uri,
      electrical_plans_uri,
      plumbing_plans_uri,
    } = request.body;

    const [data] = await pool.query(
      "CALL UpdateBuildingPlan(?, ?, ?, ?, ?, ?, ?)",
      [
        id,
        application_id ?? null,
        architectural_plans_uri ?? null,
        civil_structural_plans_uri ?? null,
        mechanical_plan_uri ?? null,
        electrical_plans_uri ?? null,
        plumbing_plans_uri ?? null,
      ]
    );

    if (data[0].length === 0) {
      return response.status(404).json({
        success: false,
        message: "Building Plan not found or no changes made",
      });
    }

    response.json({
      success: true,
      message: "Building Plan updated successfully",
      data: data[0][0],
    });
  } catch (error) {
    return handleDbError(error, response);
  }
}

async function deleteBuildingPlan(request, response) {
  const { id } = request.params;
  try {
    await pool.query("CALL DeleteBuildingPlan(?)", [id]);
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
