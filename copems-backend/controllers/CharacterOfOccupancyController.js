import { pool } from "../config/database.js";

// --- Database Table Names ---
const groupsTableName = "character_of_occupancy";
const categoriesTableName = "character_of_occupancy_categories";

// Error handler helper
const handleDbError = (error, response) => {
  console.error("Database error:", error);
  return response.status(500).json({
    success: false,
    message: "Database error occurred",
    error: process.env.NODE_ENV === "development" ? error.message : undefined,
  });
};

// --- Controller Functions ---

/**
 * Fetch all Character of Occupancy Groups (e.g., A, B, C, J-1)
 */
async function getAllOccupancyGroups(request, response) {
  try {
    // Use stored procedure
    const [rows] = await pool.query("CALL GetAllOccupancyGroups()");
    // MySQL returns [result, ...] for CALL
    response.json({
      success: true,
      data: rows[0],
    });
  } catch (error) {
    handleDbError(error, response);
  }
}

/**
 * Fetch a specific Character of Occupancy Group by its ID (e.g., 'A')
 */
async function getOccupancyGroupById(request, response) {
  const { groupId } = request.params;
  try {
    // Use stored procedure
    const [rows] = await pool.query("CALL GetOccupancyGroupById(?)", [groupId]);
    const data = rows[0];
    if (!data || data.length === 0) {
      return response.status(404).json({
        success: false,
        message: "Occupancy group not found",
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

/**
 * Fetch all Categories for a specific Character of Occupancy Group (e.g., all categories under 'A')
 */
async function getCategoriesByGroupId(request, response) {
  const { groupId } = request.params;
  try {
    // Use stored procedure
    const [rows] = await pool.query("CALL GetCategoriesByGroupId(?)", [
      groupId,
    ]);
    response.json({
      success: true,
      data: rows[0],
    });
  } catch (error) {
    return handleDbError(error, response);
  }
}

/**
 * Fetch all Groups along with their associated Categories in a hierarchical structure
 */
async function getFullOccupancyStructure(request, response) {
  try {
    // Use stored procedure for joined data
    const [rows] = await pool.query("CALL GetFullOccupancyStructure()");
    // Transform flat result into hierarchical structure
    const flat = rows[0];
    const groupMap = {};
    flat.forEach((row) => {
      if (!groupMap[row.group_id]) {
        groupMap[row.group_id] = {
          group_id: row.group_id,
          group_name: row.group_name,
          categories: [],
        };
      }
      if (row.category_id && row.category_name) {
        groupMap[row.group_id].categories.push({
          category_id: row.category_id,
          category_name: row.category_name,
        });
      }
    });
    const structuredData = Object.values(groupMap);
    response.json({
      success: true,
      data: structuredData,
    });
  } catch (error) {
    handleDbError(error, response);
  }
}

// Export the controller functions
/**
 * Save user's selection of group and category
 * Expects: { group_id, category_id, user_id (optional), ... }
 */
async function saveUserSelection(request, response) {
  const { group_id, category_id, user_id } = request.body;
  if (!group_id || !category_id) {
    return response.status(400).json({
      success: false,
      message: "group_id and category_id are required",
    });
  }
  try {
    response.json({
      success: true,
      message: "Selection received",
      data: { group_id, category_id, user_id },
    });
  } catch (error) {
    handleDbError(error, response);
  }
}

export default {
  getAllOccupancyGroups,
  getOccupancyGroupById,
  getCategoriesByGroupId,
  getFullOccupancyStructure,
  saveUserSelection,
};
