import axios from "axios";

async function testAPI() {
  try {
    // First, login to get a token
    console.log("1. Logging in...");
    const loginResponse = await axios.post(
      "http://localhost:4003/api/user/login",
      {
        username: "copems0025@gmail.com",
        user_password: "123123", // Change this to your actual password
      }
    );

    if (!loginResponse.data.success) {
      console.error("❌ Login failed:", loginResponse.data.message);
      return;
    }

    const accessToken = loginResponse.data.accessToken;
    const userId = loginResponse.data.user.User_ID;
    console.log("✓ Login successful! User ID:", userId);
    console.log("✓ Access token:", accessToken.substring(0, 20) + "...");

    // Test saving project details
    console.log("\n2. Testing save project details...");
    const projectData = {
      occupancy_classified: "GROUP B: RESIDENTIAL - TOWNHOUSE",
      total_estimated_cost: 1000000.0,
      number_of_units: 2,
      number_of_storey: 3,
      total_floor_area_sqm: 158.0,
      lot_area_sqm: 120.0,
      building_cost: 800000.0,
      electrical_cost: 60000.0,
      mechanical_cost: 25000.0,
      electronics_cost: 15000.0,
      plumbing_cost: 50000.0,
      others_cost: 50000.0,
      proposed_date_of_construction: "2025-12-27",
      expected_date_of_completion: "2026-01-28",
      application_id: null,
    };

    const saveResponse = await axios.post(
      "http://localhost:4003/api/project_details",
      projectData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (saveResponse.data.success) {
      console.log("✓ Project details saved successfully!");
      console.log(
        "Project Details ID:",
        saveResponse.data.data.project_details_id
      );
    } else {
      console.error("❌ Failed to save:", saveResponse.data.message);
    }

    // Test retrieving project details
    console.log("\n3. Testing retrieve project details...");
    const getResponse = await axios.get(
      "http://localhost:4003/api/project_details",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (getResponse.data.success) {
      console.log("✓ Retrieved project details:");
      console.log(JSON.stringify(getResponse.data.data, null, 2));
    } else {
      console.error("❌ Failed to retrieve:", getResponse.data.message);
    }
  } catch (error) {
    console.error("\n❌ Error occurred:");
    console.error("Message:", error.message);
    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
    }
  }
}

testAPI();
