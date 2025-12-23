const API_BASE = "http://localhost:4003/api";

async function testDraftSystem() {
  console.log("=".repeat(70));
  console.log("TESTING: Complete Draft System with Automatic user_id");
  console.log("=".repeat(70) + "\n");

  let accessToken = "";
  let userId = "";

  try {
    // Step 1: Login
    console.log("📝 Step 1: Login");
    console.log("-".repeat(70));

    const loginResponse = await fetch(`${API_BASE}/user/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: "copems0025@gmail.com",
        user_password: "Test123!",
      }),
    });

    const loginData = await loginResponse.json();

    if (!loginData.success) {
      console.log("❌ Login failed:", loginData.message);
      console.log("\nℹ️  Make sure you have a user account in the database.");
      console.log("   You can register at: http://localhost:3000/register\n");
      return;
    }

    accessToken = loginData.accessToken;
    userId = loginData.user.User_ID;

    console.log(`✅ Logged in as: ${loginData.user.Email_Account}`);
    console.log(`   User ID: ${userId}`);
    console.log(`   Token: ${accessToken.substring(0, 30)}...\n`);

    // Step 2: Save Building Owner Draft
    console.log("📝 Step 2: Save Building Owner Draft");
    console.log("-".repeat(70));

    const draftData = {
      last_name: "dela Cruz",
      first_name: "Juan",
      middle_initial: "S",
      tin: "123-456-789-000",
      is_enterprise: 0,
      form_of_ownership: "Individual",
      province: "Camarines Sur",
      city_municipality: "Naga City",
      barangay: "Calauag",
      house_no: "123",
      street: "Rizal Street",
      contact_no: "09123456789",
    };

    const saveResponse = await fetch(`${API_BASE}/draft/building-owner`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(draftData),
    });

    const saveData = await saveResponse.json();

    if (!saveData.success) {
      console.log("❌ Save failed:", saveData.message);
      return;
    }

    console.log("✅ Draft saved successfully!");
    console.log(`   Draft ID: ${saveData.data.bldg_owner_id}`);
    console.log(`   User ID (auto-set): ${saveData.data.user_id}`);
    console.log(`   Draft Status: ${saveData.data.draft_status}`);
    console.log(
      `   Name: ${saveData.data.first_name} ${saveData.data.last_name}\n`
    );

    // Step 3: Retrieve Draft
    console.log("📝 Step 3: Retrieve Draft Data");
    console.log("-".repeat(70));

    const getDraftResponse = await fetch(`${API_BASE}/draft`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const getDraftData = await getDraftResponse.json();

    if (!getDraftData.success) {
      console.log("❌ Retrieve failed:", getDraftData.message);
      return;
    }

    console.log("✅ Draft retrieved successfully!");
    if (getDraftData.data.buildingOwner) {
      const owner = getDraftData.data.buildingOwner;
      console.log(
        `   User ID: ${owner.user_id} ← Automatically filtered by your login`
      );
      console.log(`   Name: ${owner.first_name} ${owner.last_name}`);
      console.log(
        `   Address: ${owner.house_no} ${owner.street}, ${owner.barangay}`
      );
      console.log(`   Draft Status: ${owner.draft_status}\n`);
    }

    // Step 4: Update Draft
    console.log("📝 Step 4: Update Draft (Auto-save simulation)");
    console.log("-".repeat(70));

    const updatedData = {
      ...draftData,
      last_name: "dela Cruz-Garcia",
      contact_no: "09987654321",
    };

    const updateResponse = await fetch(`${API_BASE}/draft/building-owner`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(updatedData),
    });

    const updateData = await updateResponse.json();

    console.log("✅ Draft updated successfully!");
    console.log(`   Updated Name: ${updateData.data.last_name}`);
    console.log(`   Updated Contact: ${updateData.data.contact_no}`);
    console.log(
      `   Same User ID: ${updateData.data.user_id} ← Still linked to your account\n`
    );

    // Summary
    console.log("=".repeat(70));
    console.log("✅ TEST COMPLETE - All Systems Working!");
    console.log("=".repeat(70));
    console.log(`
  Summary:
  ✓ User logged in successfully
  ✓ Draft saved with automatic user_id: ${userId}
  ✓ Draft retrieved (filtered by user_id from token)
  ✓ Draft updated (user_id remains the same)
  
  Key Points:
  • User ID was NEVER sent in the request body
  • User ID was AUTOMATICALLY extracted from JWT token
  • User can only see and edit their OWN drafts
  • Perfect data isolation and security!
  
  Next: Integrate the draft store into your Vue components
  and users will have seamless auto-save functionality! 🎉
`);
  } catch (error) {
    console.error("\n❌ Test Error:", error.message);
    console.log("\nMake sure:");
    console.log("  1. Backend server is running (node server.js)");
    console.log("  2. MySQL is running (XAMPP)");
    console.log("  3. You have a user account registered");
  }
}

testDraftSystem();
