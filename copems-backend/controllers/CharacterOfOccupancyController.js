import { pool } from "../config/database.js";

const groupsTableName = "character_of_occupancy";
const categoriesTableName = "character_of_occupancy_categories";

const handleDbError = (error, response) => {
  console.error("Database error:", error);
  return response.status(500).json({
    success: false,
    message: "Database error occurred",
    error: process.env.NODE_ENV === "development" ? error.message : undefined,
  });
};

async function getAllOccupancyGroups(request, response) {
  try {
    const [rows] = await pool.query("CALL GetAllOccupancyGroups()");
    response.json({
      success: true,
      data: rows[0],
    });
  } catch (error) {
    handleDbError(error, response);
  }
}

async function getOccupancyGroupById(request, response) {
  const { groupId } = request.params;
  try {
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

async function getCategoriesByGroupId(request, response) {
  const { groupId } = request.params;
  try {
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

async function getFullOccupancyStructure(request, response) {
  try {
    const [rows] = await pool.query("CALL GetFullOccupancyStructure()");
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
