import { pool } from "../config/database.js";

const handleDbError = (error, response) => {
  console.error("Database error:", error);
  return response.status(500).json({
    success: false,
    message: "Database error occurred",
    error: process.env.NODE_ENV === "development" ? error.message : undefined,
  });
};

async function getAllProjectDetails(request, response) {
  try {
    const [data] = await pool.query("CALL GetAllProjectDetails()");
    response.json({
      success: true,
      data: data[0],
    });
  } catch (error) {
    handleDbError(error, response);
  }
}

async function getProjectDetailsById(request, response) {
  const { id } = request.params;
  try {
    const [data] = await pool.query("CALL GetProjectDetailsById(?)", [id]);

    if (data[0].length === 0) {
      return response.status(404).json({
        success: false,
        message: "Project Details not found",
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

async function insertProjectDetails(request, response) {
  try {
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

    const [data] = await pool.query(
      "CALL InsertProjectDetails(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
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
      data: data[0][0],
    });
  } catch (error) {
    return handleDbError(error, response);
  }
}

async function updateProjectDetails(request, response) {
  const { id } = request.params;
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

    const [data] = await pool.query(
      "CALL UpdateProjectDetails(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        id,
        occupancy_classified ?? null,
        total_estimated_cost ?? null,
        number_of_units ?? null,
        number_of_storey ?? null,
        total_floor_area_sqm ?? null,
        lot_area_sqm ?? null,
        building_cost ?? null,
        electrical_cost ?? null,
        mechanical_cost ?? null,
        electronics_cost ?? null,
        plumbing_cost ?? null,
        others_cost ?? null,
        proposed_date_of_construction ?? null,
        expected_date_of_completion ?? null,
      ]
    );

    if (data && data[0] && data[0].length === 0) {
      return response.status(404).json({
        success: false,
        message: "Project Details not found or no changes made",
      });
    }

    response.json({
      success: true,
      message: "Project Details updated successfully",
      data:
        data && data[0] && data[0][0] ? data[0][0] : { project_details_id: id },
    });
  } catch (error) {
    return handleDbError(error, response);
  }
}

async function deleteProjectDetails(request, response) {
  const { id } = request.params;
  try {
    await pool.query("CALL DeleteProjectDetails(?)", [id]);
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
