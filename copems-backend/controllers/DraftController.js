import { pool } from "../config/database.js";

const handleDbError = (error, response) => {
  console.error("Database error:", error);
  return response.status(500).json({
    success: false,
    message: "Database error occurred",
    error: process.env.NODE_ENV === "development" ? error.message : undefined,
  });
};

/**
 * Get all draft data for a user
 */
async function getUserDraftData(request, response) {
  try {
    const userId = request.user.user_id; // From JWT token

    const [results] = await pool.query("CALL GetUserDraftData(?)", [userId]);

    // results[0] = building_owner data
    // results[1] = construction data
    // results[2] = project_details data
    // results[3] = engineer_information data

    response.json({
      success: true,
      data: {
        buildingOwner: results[0][0] || null,
        construction: results[1][0] || null,
        projectDetails: results[2][0] || null,
        engineerInformation: results[3][0] || null,
      },
    });
  } catch (error) {
    return handleDbError(error, response);
  }
}

/**
 * Save or update building owner data as draft
 */
async function saveBuildingOwnerDraft(request, response) {
  try {
    const userId = request.user.user_id;
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

    // Check if draft already exists
    const [existing] = await pool.query(
      `SELECT bldg_owner_id FROM bldg_owner 
       WHERE user_id = ? AND draft_status = 'draft' 
       LIMIT 1`,
      [userId]
    );

    if (existing.length > 0) {
      // Update existing draft
      await pool.query(
        `UPDATE bldg_owner SET
          last_name = ?,
          first_name = ?,
          middle_initial = ?,
          tin = ?,
          is_enterprise = ?,
          form_of_ownership = ?,
          province = ?,
          city_municipality = ?,
          barangay = ?,
          house_no = ?,
          street = ?,
          contact_no = ?,
          updated_at = CURRENT_TIMESTAMP
         WHERE bldg_owner_id = ?`,
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
          existing[0].bldg_owner_id,
        ]
      );

      const [updated] = await pool.query(
        "SELECT * FROM bldg_owner WHERE bldg_owner_id = ?",
        [existing[0].bldg_owner_id]
      );

      return response.json({
        success: true,
        message: "Draft updated successfully",
        data: updated[0],
      });
    } else {
      // Insert new draft
      const [result] = await pool.query(
        `INSERT INTO bldg_owner (
          user_id, last_name, first_name, middle_initial, tin,
          is_enterprise, form_of_ownership, province, city_municipality,
          barangay, house_no, street, contact_no, draft_status
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'draft')`,
        [
          userId,
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

      const [inserted] = await pool.query(
        "SELECT * FROM bldg_owner WHERE bldg_owner_id = ?",
        [result.insertId]
      );

      return response.status(201).json({
        success: true,
        message: "Draft saved successfully",
        data: inserted[0],
      });
    }
  } catch (error) {
    return handleDbError(error, response);
  }
}

/**
 * Save or update construction data as draft
 */
async function saveConstructionDraft(request, response) {
  try {
    const userId = request.user.user_id;
    const {
      building_use,
      scope_of_work,
      total_floor_area,
      number_of_units,
      estimated_cost,
    } = request.body;

    const [existing] = await pool.query(
      `SELECT bp_construction_id FROM bp_construction 
       WHERE user_id = ? AND draft_status = 'draft' 
       LIMIT 1`,
      [userId]
    );

    if (existing.length > 0) {
      await pool.query(
        `UPDATE bp_construction SET
          building_use = ?,
          scope_of_work = ?,
          total_floor_area = ?,
          number_of_units = ?,
          estimated_cost = ?,
          updated_at = CURRENT_TIMESTAMP
         WHERE bp_construction_id = ?`,
        [
          building_use,
          scope_of_work,
          total_floor_area,
          number_of_units,
          estimated_cost,
          existing[0].bp_construction_id,
        ]
      );

      const [updated] = await pool.query(
        "SELECT * FROM bp_construction WHERE bp_construction_id = ?",
        [existing[0].bp_construction_id]
      );

      return response.json({
        success: true,
        message: "Draft updated successfully",
        data: updated[0],
      });
    } else {
      const [result] = await pool.query(
        `INSERT INTO bp_construction (
          user_id, building_use, scope_of_work, total_floor_area,
          number_of_units, estimated_cost, draft_status
        ) VALUES (?, ?, ?, ?, ?, ?, 'draft')`,
        [
          userId,
          building_use,
          scope_of_work,
          total_floor_area,
          number_of_units,
          estimated_cost,
        ]
      );

      const [inserted] = await pool.query(
        "SELECT * FROM bp_construction WHERE bp_construction_id = ?",
        [result.insertId]
      );

      return response.status(201).json({
        success: true,
        message: "Draft saved successfully",
        data: inserted[0],
      });
    }
  } catch (error) {
    return handleDbError(error, response);
  }
}

/**
 * Save or update project details as draft
 */
async function saveProjectDetailsDraft(request, response) {
  try {
    const userId = request.user.user_id;
    const {
      project_title,
      project_location,
      project_description,
      total_project_cost,
    } = request.body;

    const [existing] = await pool.query(
      `SELECT Project_ID FROM project_details 
       WHERE user_id = ? AND draft_status = 'draft' 
       LIMIT 1`,
      [userId]
    );

    if (existing.length > 0) {
      await pool.query(
        `UPDATE project_details SET
          Project_Title = ?,
          Project_Location = ?,
          Project_Description = ?,
          Total_Project_Cost = ?,
          updated_at = CURRENT_TIMESTAMP
         WHERE Project_ID = ?`,
        [
          project_title,
          project_location,
          project_description,
          total_project_cost,
          existing[0].Project_ID,
        ]
      );

      const [updated] = await pool.query(
        "SELECT * FROM project_details WHERE Project_ID = ?",
        [existing[0].Project_ID]
      );

      return response.json({
        success: true,
        message: "Draft updated successfully",
        data: updated[0],
      });
    } else {
      const [result] = await pool.query(
        `INSERT INTO project_details (
          user_id, Project_Title, Project_Location, 
          Project_Description, Total_Project_Cost, draft_status
        ) VALUES (?, ?, ?, ?, ?, 'draft')`,
        [
          userId,
          project_title,
          project_location,
          project_description,
          total_project_cost,
        ]
      );

      const [inserted] = await pool.query(
        "SELECT * FROM project_details WHERE Project_ID = ?",
        [result.insertId]
      );

      return response.status(201).json({
        success: true,
        message: "Draft saved successfully",
        data: inserted[0],
      });
    }
  } catch (error) {
    return handleDbError(error, response);
  }
}

/**
 * Save or update engineer information as draft
 */
async function saveEngineerInformationDraft(request, response) {
  try {
    const userId = request.user.user_id;
    const {
      engineer_name,
      engineer_license_number,
      engineer_contact,
      engineer_email,
    } = request.body;

    const [existing] = await pool.query(
      `SELECT engineer_information_id FROM engineer_information 
       WHERE user_id = ? AND draft_status = 'draft' 
       LIMIT 1`,
      [userId]
    );

    if (existing.length > 0) {
      await pool.query(
        `UPDATE engineer_information SET
          engineer_name = ?,
          engineer_license_number = ?,
          engineer_contact = ?,
          engineer_email = ?,
          updated_at = CURRENT_TIMESTAMP
         WHERE engineer_information_id = ?`,
        [
          engineer_name,
          engineer_license_number,
          engineer_contact,
          engineer_email,
          existing[0].engineer_information_id,
        ]
      );

      const [updated] = await pool.query(
        "SELECT * FROM engineer_information WHERE engineer_information_id = ?",
        [existing[0].engineer_information_id]
      );

      return response.json({
        success: true,
        message: "Draft updated successfully",
        data: updated[0],
      });
    } else {
      const [result] = await pool.query(
        `INSERT INTO engineer_information (
          user_id, engineer_name, engineer_license_number,
          engineer_contact, engineer_email, draft_status
        ) VALUES (?, ?, ?, ?, ?, 'draft')`,
        [
          userId,
          engineer_name,
          engineer_license_number,
          engineer_contact,
          engineer_email,
        ]
      );

      const [inserted] = await pool.query(
        "SELECT * FROM engineer_information WHERE engineer_information_id = ?",
        [result.insertId]
      );

      return response.status(201).json({
        success: true,
        message: "Draft saved successfully",
        data: inserted[0],
      });
    }
  } catch (error) {
    return handleDbError(error, response);
  }
}

/**
 * Generate application number and finalize all drafts
 */
async function finalizeApplication(request, response) {
  try {
    const userId = request.user.user_id;

    // Generate application number (format: BP-YYYY-XXXX)
    const year = new Date().getFullYear();
    const [countResult] = await pool.query(
      `SELECT COUNT(*) as count FROM bldg_owner 
       WHERE application_number IS NOT NULL 
       AND application_number LIKE ?`,
      [`BP-${year}-%`]
    );

    const nextNumber = (countResult[0].count + 1).toString().padStart(4, "0");
    const applicationNumber = `BP-${year}-${nextNumber}`;

    // Call stored procedure to finalize
    const [result] = await pool.query("CALL FinalizeApplication(?, ?)", [
      userId,
      applicationNumber,
    ]);

    response.json({
      success: true,
      message: "Application finalized successfully",
      application_number: applicationNumber,
      data: result[0][0],
    });
  } catch (error) {
    return handleDbError(error, response);
  }
}

export default {
  getUserDraftData,
  saveBuildingOwnerDraft,
  saveConstructionDraft,
  saveProjectDetailsDraft,
  saveEngineerInformationDraft,
  finalizeApplication,
};
