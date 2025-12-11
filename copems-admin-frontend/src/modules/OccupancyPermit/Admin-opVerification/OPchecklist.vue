<template>
  <v-app>
    <v-app-bar flat color="#ffffff" dark height="88" app class="elevation-4">
      <v-container
        fluid
        class="d-flex align-center py-0 justify-space-between"
        style="max-width: 100%"
      >
        <div class="d-flex align-center">
          <v-img
            src="https://www2.naga.gov.ph/wp-content/uploads/2022/05/Naga_City_Official_Seal-1.png"
            alt="LGU Seal"
            width="85"
            height="75"
            contain
            class="me-4"
          />
          <div>
            <div class="header-subtitle">REPUBLIC OF THE PHILIPPINES</div>
            <div class="header-title">CITY GOVERNMENT OF NAGA</div>
          </div>
        </div>
        <div class="d-flex align-center">
          <v-menu :close-on-content-click="true" location="bottom end">
            <template #activator="{ props }">
              <v-btn variant="text" class="profile-btn" v-bind="props">
                <v-avatar size="36" class="mx-2 text-white" color="#5B21B6">JA</v-avatar>
                <div class="d-flex flex-column text-left">
                  <span class="text-caption font-weight-bold profile-name"
                    >Jacqueline Azada</span
                  >
                  <span class="text-caption font-weight-medium profile-role"
                    >Engineer</span
                  >
                </div>
                <v-icon class="ml-1" size="small">mdi-chevron-down</v-icon>
              </v-btn>
            </template>
            <v-card min-width="250" class="mt-1">
              <v-list density="compact" nav>
                <v-list-item>
                  <v-list-item-title class="font-weight-bold">
                    Jacqueline Azada
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    jacqueline.azada@nagacity.gov.ph
                  </v-list-item-subtitle>
                </v-list-item>
                <v-divider class="my-1"></v-divider>
                <v-list-item link @click="logOut" class="text-red-darken-1">
                  <template #prepend>
                    <v-icon>mdi-logout</v-icon>
                  </template>
                  <v-list-item-title>Log Out</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-card>
          </v-menu>
        </div>
      </v-container>
    </v-app-bar>
    <v-navigation-drawer app permanent width="280" class="navigation-drawer">
      <div class="nav-content">
        <v-list nav class="nav-list">
          <v-list-item
            v-for="item in navItems"
            :key="item.title"
            :to="item.to"
            :class="['nav-item', { 'nav-item--active': $route.path === item.to }]"
          >
            <template #prepend>
              <v-icon :color="'#111827'" size="20">
                {{ item.icon }}
              </v-icon>
            </template>
            <v-list-item-title class="nav-item-text">
              {{ item.title }}
            </v-list-item-title>
            <template #append v-if="item.hasSubmenu">
              <v-icon :color="'#111827'" size="16"> mdi-chevron-right </v-icon>
            </template>
          </v-list-item>
        </v-list>

        <div class="nav-bottom">
          <v-list nav class="nav-list">
            <v-list-item @click="logOut" class="logout-item">
              <template #prepend>
                <v-icon color="#111827" size="20">mdi-logout-variant</v-icon>
              </template>
              <v-list-item-title class="logout-text"> Logout </v-list-item-title>
            </v-list-item>
          </v-list>
        </div>
      </div>
    </v-navigation-drawer>

    <v-main class="main-content">
      <div class="page-container">
        <!-- Application Header -->
        <div class="application-header mb-4">
          <div class="d-flex align-center mb-2">
            <v-btn icon variant="text" size="small" class="mr-2" @click="goBack">
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
            <div>
              <div class="header-main-title">Application Details</div>
              <div class="header-app-number">{{ applicant.applicationNumber }}</div>
            </div>
          </div>
        </div>

        <v-card class="elevation-1 tabs-card">
          <v-tabs v-model="activeTab" color="#3b82f6" class="custom-tabs">
            <v-tab value="applicant">
              <v-icon size="18" class="mr-2">mdi-account-details-outline</v-icon>
              Applicant Information
            </v-tab>
            <v-tab value="checklist">
              <v-icon size="18" class="mr-2">mdi-clipboard-check-outline</v-icon>
              Occupancy Requirements Checklist
            </v-tab>
          </v-tabs>

          <v-divider></v-divider>

          <v-window v-model="activeTab">
            <!-- Tab 1: Applicant Information -->
            <v-window-item value="applicant">
              <div class="tab-content pa-6">
                <v-card class="unified-tab-card elevation-0">
                  <div class="tab-header-section">
                    <div class="tab-title-section">
                      <div class="tab-icon-wrapper">
                        <v-icon class="tab-icon">mdi-account-details-outline</v-icon>
                      </div>
                      <div class="tab-title-content">
                        <h1 class="tab-title">Applicant Information</h1>
                        <p class="tab-subtitle">
                          Review applicant and property details for this occupancy permit
                          application
                        </p>
                      </div>
                    </div>
                  </div>

                  <div class="tab-divider"></div>

                  <div class="tab-content-section">
                    <!-- Applicant Information Section -->
                    <div class="content-section mb-6">
                      <h3 class="section-header">
                        <v-icon class="mr-2" size="18">mdi-account</v-icon>
                        Applicant Information
                      </h3>
                      <v-row class="mt-4">
                        <v-col cols="12" sm="6" class="info-field">
                          <div class="field-label">Application Number</div>
                          <div class="field-value">{{ applicant.applicationNumber }}</div>
                        </v-col>
                        <v-col cols="12" sm="6" class="info-field">
                          <div class="field-label">Type of Application</div>
                          <div class="field-value">{{ applicant.typeOfApplication }}</div>
                        </v-col>
                        <v-col cols="12" sm="6" class="info-field">
                          <div class="field-label">Applicant Name</div>
                          <div class="field-value">{{ applicant.name }}</div>
                        </v-col>
                        <v-col cols="12" sm="6" class="info-field">
                          <div class="field-label">Contact No.</div>
                          <div class="field-value">{{ applicant.contactNo }}</div>
                        </v-col>
                        <v-col cols="12" sm="6" class="info-field">
                          <div class="field-label">Address</div>
                          <div class="field-value">{{ applicant.address }}</div>
                        </v-col>
                      </v-row>
                    </div>

                    <!-- Property Details Section -->
                    <div class="content-section">
                      <h3 class="section-header">
                        <v-icon class="mr-2" size="18">mdi-home-city-outline</v-icon>
                        Property Details
                      </h3>
                      <v-row class="mt-4">
                        <v-col cols="12" sm="6" class="info-field">
                          <div class="field-label">Name of Project</div>
                          <div class="field-value">{{ property.projectName }}</div>
                        </v-col>
                        <v-col cols="12" sm="6" class="info-field">
                          <div class="field-label">No. of Storey/s</div>
                          <div class="field-value">{{ property.noOfStoreys }}</div>
                        </v-col>
                        <v-col cols="12" sm="6" class="info-field">
                          <div class="field-label">Project Location</div>
                          <div class="field-value">{{ property.projectLocation }}</div>
                        </v-col>
                        <v-col cols="12" sm="6" class="info-field">
                          <div class="field-label">No. of Units</div>
                          <div class="field-value">{{ property.noOfUnits }}</div>
                        </v-col>
                        <v-col cols="12" sm="6" class="info-field">
                          <div class="field-label">Use/Character of Occupancy</div>
                          <div class="field-value">{{ property.buildingUse }}</div>
                        </v-col>
                        <v-col cols="12" sm="6" class="info-field">
                          <div class="field-label">Total Gross Floor Area</div>
                          <div class="field-value">
                            {{ property.totalGrossFloorArea }}
                          </div>
                        </v-col>
                      </v-row>
                    </div>
                  </div>
                </v-card>
              </div>
            </v-window-item>

            <!-- Tab 2: Occupancy Requirements Checklist -->
            <v-window-item value="checklist">
              <div class="tab-content pa-6">
                <v-card class="unified-tab-card elevation-0">
                  <div class="tab-header-section">
                    <div class="tab-title-section">
                      <div class="tab-icon-wrapper">
                        <v-icon class="tab-icon">mdi-clipboard-check-outline</v-icon>
                      </div>
                      <div class="tab-title-content">
                        <h1 class="tab-title">Occupancy Requirements Checklist</h1>
                        <p class="tab-subtitle">
                          Review and verify all required documents for occupancy permit
                          approval
                        </p>
                      </div>
                    </div>
                    <div class="status-wrapper">
                      <div class="status-chip">
                        <v-icon class="status-icon" size="16">mdi-clock-outline</v-icon>
                        <span class="status-text">{{ pendingCount }} Pending</span>
                      </div>
                    </div>
                  </div>

                  <div class="tab-divider"></div>

                  <div class="tab-content-section">
                    <div v-for="(item, index) in checklist" :key="index" class="mb-4">
                      <div class="checklist-item-card">
                        <v-checkbox
                          v-model="item.checked"
                          :label="item.label"
                          color="primary"
                          density="compact"
                          hide-details
                          class="checklist-checkbox"
                          @change="handleCheckboxChange(item)"
                        >
                        </v-checkbox>
                        <v-textarea
                          v-if="item.key === 'others'"
                          v-model="item.remarks"
                          placeholder="Please specify..."
                          variant="outlined"
                          rows="2"
                          hide-details
                          density="compact"
                          class="mt-3 ml-8"
                        ></v-textarea>
                      </div>
                    </div>

                    <div class="action-buttons-section mt-6 d-flex justify-end">
                      <v-btn
                        variant="flat"
                        color="#FFCCCC"
                        class="text-none mr-3 font-weight-medium"
                        size="large"
                        @click="showReturnDialog = true"
                        style="color: #b91c1c; border: 1px solid #fca5a5"
                      >
                        RETURN
                      </v-btn>
                      <v-btn
                        variant="flat"
                        color="#D1FAE5"
                        class="text-none font-weight-medium"
                        size="large"
                        @click="showVerifyDialog = true"
                        style="color: #065f46; border: 1px solid #a7f3d0"
                      >
                        VERIFIED
                      </v-btn>
                    </div>
                  </div>
                </v-card>
              </div>
            </v-window-item>
          </v-window>
        </v-card>
      </div>
    </v-main>

    <!-- Return Application Dialog -->
    <v-dialog v-model="showReturnDialog" max-width="600px" persistent>
      <v-card class="dialog-card">
        <v-card-title class="dialog-header pa-5">
          <v-icon color="#dc2626" size="28" class="mr-3">mdi-alert-circle</v-icon>
          <span class="dialog-title">Return Application</span>
          <v-spacer></v-spacer>
          <v-btn icon variant="text" @click="showReturnDialog = false" size="small">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="pa-5">
          <div class="dialog-subtitle mb-4">
            Provide detailed remarks explaining why this application is being returned
          </div>
          <v-alert
            variant="tonal"
            color="#fef3c7"
            class="mb-4"
            density="compact"
            style="border-left: 4px solid #f59e0b"
          >
            <div style="color: #92400e; font-size: 13px">
              Please specify which requirements are missing or need corrections. Your
              remarks will be sent to the applicant.
            </div>
          </v-alert>
          <div class="field-label mb-2">
            Remarks/Reason for Return <span class="text-red-darken-2">*</span>
          </div>
          <v-textarea
            v-model="returnRemarks"
            placeholder="Please specify missing documents, incomplete requirements, or corrections needed..."
            variant="outlined"
            rows="4"
            hide-details
            class="remarks-textarea"
          ></v-textarea>
          <div class="text-caption text-grey-darken-1 mt-2">
            Be specific about what needs to be completed or corrected
          </div>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="pa-4 d-flex justify-end">
          <v-btn
            variant="outlined"
            color="#6b7280"
            class="text-none font-weight-medium"
            size="large"
            @click="showReturnDialog = false"
            style="min-width: 120px"
          >
            Cancel
          </v-btn>
          <v-btn
            variant="flat"
            color="#dc2626"
            class="text-none font-weight-medium ml-3"
            size="large"
            @click="handleReturnApplication"
            :disabled="!returnRemarks.trim()"
            style="min-width: 180px"
          >
            Return Application
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Verify Requirements Dialog -->
    <v-dialog v-model="showVerifyDialog" max-width="500px" persistent>
      <v-card class="dialog-card">
        <v-card-title class="dialog-header pa-5">
          <v-icon color="#16a34a" size="28" class="mr-3">mdi-check-circle</v-icon>
          <span class="dialog-title">Verify Requirements</span>
          <v-spacer></v-spacer>
          <v-btn icon variant="text" @click="showVerifyDialog = false" size="small">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="pa-5">
          <div class="dialog-subtitle mb-3">
            Are you sure you want to mark all requirements as verified?
          </div>
          <v-alert
            variant="tonal"
            color="#d1fae5"
            density="compact"
            style="border-left: 4px solid #10b981"
          >
            <div style="color: #065f46; font-size: 13px">
              By confirming, you are certifying that all occupancy requirements have been
              reviewed and meet the necessary standards for approval.
            </div>
          </v-alert>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="pa-4 d-flex justify-end">
          <v-btn
            variant="outlined"
            color="#6b7280"
            class="text-none font-weight-medium"
            size="large"
            @click="showVerifyDialog = false"
            style="min-width: 120px"
          >
            Cancel
          </v-btn>
          <v-btn
            variant="flat"
            color="#16a34a"
            class="text-none font-weight-medium ml-3"
            size="large"
            @click="handleVerifyRequirements"
            style="min-width: 180px"
          >
            Confirm Verification
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

const navItems = [
  {
    title: "Building Permit",
    icon: "mdi-home-city-outline",
    to: "/dashboard",
  },
  {
    title: "Locational Clearance",
    icon: "mdi-map-marker-radius-outline",
    to: "/locational-clearance",
  },
  {
    title: "Compliance Monitoring",
    icon: "mdi-clipboard-check-multiple-outline",
    to: "/admin/opmonitoring",
    hasSubmenu: true,
  },
  {
    title: "Occupancy Permit",
    icon: "mdi-key-variant",
    to: "/admin/AdminDashboard",
  },
];

const activeTab = ref("applicant");
const search = ref("");
const activeFilterApps = ref("Total");
const showReturnDialog = ref(false);
const showVerifyDialog = ref(false);
const returnRemarks = ref("");
// Removed loading state
const router = useRouter();

const goBack = () => {
  router.push("/admin/AdminDashboard");
};

const applicant = ref({
  applicationNumber: "OP-2025-002",
  name: "Noah A. Deguzman",
  address: "Calauag Filoville Naga City",
  contactNo: "09265428922",
  typeOfApplication: "Full",
});

const property = ref({
  projectName: "Deguzman Residential Building",
  projectLocation: "456 Main St., Brgy. San Isidro, Naga City",
  buildingUse: "Residential - Single-Family",
  noOfStoreys: 2,
  noOfUnits: 5,
  totalGrossFloorArea: "200.00 sqm",
});

// Checklist data with reactive 'checked' and 'remarks' for 'Others'
const checklist = ref([
  {
    label:
      "Two (2) copies of accomplished Unified Application form for Certificate of Occupancy, duly notarized;",
    checked: false,
    key: "unifiedForm",
  },
  {
    label: "Two (2) copies of Certificate of Completion, duly notarized;",
    checked: false,
    key: "completionCert",
  },
  {
    label:
      "Construction Logbook, signed and sealed by the Owner's Architect or Civil Engineer who undertook full-time inspection and supervision;",
    checked: false,
    key: "logbook",
  },
  {
    label: "Two (2) photocopies of the valid licenses of all involved professionals;",
    checked: false,
    key: "licenses",
  },
  {
    label:
      "Photograph of the structure with substantial completion showing front, sides, and rear areas;",
    checked: false,
    key: "photograph",
  },
  {
    label:
      "Two (2) sets of As-Built Plans, if there are changes in the building plans covered by the issued Building Permit;",
    checked: false,
    key: "asBuiltPlans",
  },
  {
    label: "Two (2) copies of Certificate of Final Electrical Inspection;",
    checked: false,
    key: "electricalInsp",
  },
  {
    label:
      "Two (2) copies of Fire Safety Inspection Certificate from the Bureau of Fire and Protection;",
    checked: false,
    key: "fireSafetyCert",
  },
  {
    label: "Sketch map indicating the location of the project;",
    checked: false,
    key: "sketchMap",
  },
  { label: "Others:", checked: false, key: "others", remarks: "" },
]);

// Computed property to calculate pending count
const pendingCount = computed(() => {
  return checklist.value.filter((item) => !item.checked).length;
});

// Function to handle checkbox change
const handleCheckboxChange = (item) => {
  // If "Others" is unchecked, clear its remarks
  if (item.key === "others" && !item.checked) {
    item.remarks = "";
  }
};

const applicants = ref([
  {
    applicationNumber: "OP-2025-001",
    name: "Maria Santos",
    initials: "MS",
    dateSubmitted: "May 8, 2025",
    checklistStatus: "Pending",
  },
  {
    applicationNumber: "OP-2025-002",
    name: "Noah Deguzman",
    initials: "ND",
    dateSubmitted: "June 17, 2025",
    checklistStatus: "Verified",
  },
  {
    applicationNumber: "OP-2025-003",
    name: "John Doe",
    initials: "JD",
    dateSubmitted: "July 1, 24025",
    checklistStatus: "Return",
  },
]);

const applicantStatus = (applicant) => {
  return applicant.checklistStatus;
};

const filteredApplicants = computed(() => {
  let filtered = applicants.value;

  if (activeFilterApps.value !== "Total") {
    filtered = filtered.filter((a) => applicantStatus(a) === activeFilterApps.value);
  }
  if (search.value) {
    const q = search.value.toLowerCase();
    filtered = filtered.filter(
      (a) =>
        a.name.toLowerCase().includes(q) || a.applicationNumber.toLowerCase().includes(q)
    );
  }

  return filtered;
});

function onClick() {
  // Removed loading logic
  console.log("Action button clicked.");
  console.log("Final Checklist Data:", checklist.value);
}

const handleReturnApplication = () => {
  console.log("Return Application with remarks:", returnRemarks.value);
  // Add your logic here to process the return
  showReturnDialog.value = false;
  returnRemarks.value = "";
};

const handleVerifyRequirements = () => {
  console.log("Requirements Verified");
  console.log("Final Checklist Data:", checklist.value);
  // Add your logic here to process the verification
  showVerifyDialog.value = false;
};

const filterByStatus = (status) => {
  activeFilterApps.value = status;
};

const logOut = () => {
  console.log("Log Out clicked. User should be logged out.");
};

const filterOptions = computed(() => ["Total", "Pending", "Verified", "Return"]);

const stringToHslColor = (str, s, l) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash);
  const h = hash % 360;
  return `hsl(${h}, ${s}%, ${l}%)`;
};

const getAvatarColor = (initials) => {
  const defined = {
    MS: "#F59E0B",
    ND: "#3B82F6",
    JD: "#22c55e",
  };
  return defined[initials] ?? stringToHslColor(initials, 45, 75);
};

const getRouteForStatus = (status) => {
  switch (status) {
    case "Pending":
      return "/admin/OPchecklist";
    case "Verified":
      return "/admin/OPverified";
    case "Return":
      return "/admin/OPreturn";
    default:
      return "/admin/OPdefaultdetails";
  }
};

const viewDetails = (item) => {
  const status = applicantStatus(item);
  const route = getRouteForStatus(status);

  router.push({
    path: route,
    query: { applicationNumber: item.applicationNumber },
    state: { applicantData: item, isInitialLoad: true },
  });
};
</script>

<style scoped>
/* Header Styles */
.header-subtitle {
  font-size: 12px;
  font-weight: 400;
  color: black;
  line-height: 1.2;
}

.header-title {
  font-size: 15px;
  font-weight: 700;
  color: black;
  line-height: 1.2;
}

/* Navigation Drawer Styles */
.navigation-drawer {
  background: linear-gradient(180deg, #ffffff 0%, #ffffff 100%) !important;
  border: none !important;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.15) !important;
  overflow: hidden !important;
  height: calc(100vh - 88px) !important;
  min-height: calc(100vh - 88px) !important;
  max-height: calc(100vh - 88px) !important;
  top: 88px !important;
  position: fixed !important;
}

.nav-content {
  display: flex;
  flex-direction: column;
  height: 100% !important;
  overflow: hidden !important;
}

.nav-list {
  padding: 8px 0 !important;
  overflow: hidden;
}

.nav-item {
  margin: 0 16px 4px 16px !important;
  border-radius: 8px !important;
  min-height: 44px !important;
  padding: 0 16px !important;
  transition: all 0.2s ease !important;
}

.nav-item:hover {
  background-color: #f5f5f5 !important;
}

.nav-item--active {
  background-color: #e0f7fa !important;
  box-shadow: none !important;
}

.nav-item--active .v-icon {
  color: #00bcd4 !important;
}

.nav-item-text {
  color: #111827 !important;
  font-size: 14px !important;
  font-weight: 500 !important;
  letter-spacing: 0.25px !important;
}

.nav-item--active .nav-item-text {
  color: #111827 !important;
  font-weight: 600 !important;
}

.nav-bottom {
  margin-top: auto;
  border-top: 1px solid #e5e7eb;
  padding-top: 16px;
}

.logout-item {
  margin: 0 16px !important;
  border-radius: 8px !important;
  min-height: 44px !important;
  padding: 0 16px !important;
  transition: all 0.2s ease !important;
}

.logout-item:hover {
  background-color: rgba(239, 68, 68, 0.1) !important;
}

.logout-text {
  color: #111827 !important;
  font-size: 14px !important;
  font-weight: 500 !important;
}

.logout-item:hover .logout-text {
  color: #111827 !important;
}

/* Profile Styles */
.profile-btn {
  background-color: transparent !important;
  box-shadow: none !important;
  padding: 0 !important;
  min-width: unset !important;
}

.profile-name {
  color: #555 !important;
  white-space: nowrap;
}

.profile-role {
  color: #888 !important;
  white-space: nowrap;
}

/* Main Content */
.main-content {
  background-color: #f5f6fa !important;
  padding-top: 88px !important;
  height: 100vh !important;
  overflow-y: auto !important;
}

/* Page Layout */
.page-container {
  max-width: 1460px;
  margin: 16px auto 0;
  padding: 0 12px;
}

/* Application Header */
.application-header {
  background: transparent;
}

.header-main-title {
  font-size: 18px;
  font-weight: 600;
  color: #111827;
}

.header-app-number {
  font-size: 13px;
  color: #6b7280;
  margin-top: 2px;
}

/* Tabs Card */
.tabs-card {
  border-radius: 12px;
  overflow: hidden;
}

.custom-tabs {
  background-color: #fff;
}

.custom-tabs :deep(.v-tab) {
  text-transform: none;
  font-weight: 500;
  letter-spacing: normal;
}

.tab-content {
  min-height: 420px;
  background-color: #fafbfc;
}

/* Unified Tab Styles */
.unified-tab-card {
  background: #ffffff;
  border: 1px solid #f1f5f9;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05) !important;
}

.tab-header-section {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 32px;
  gap: 24px;
}

.tab-title-section {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  flex: 1;
}

.tab-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  border-radius: 12px;
  flex-shrink: 0;
}

.tab-icon {
  color: white;
  font-size: 24px;
}

.tab-title-content {
  flex: 1;
}

.tab-title {
  font-size: 24px;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
  line-height: 1.2;
  letter-spacing: -0.025em;
}

.tab-subtitle {
  font-size: 14px;
  color: #64748b;
  margin: 4px 0 0 0;
  font-weight: 400;
}

.status-wrapper {
  display: flex;
  align-items: flex-start;
}

.status-chip {
  display: flex;
  align-items: center;
  gap: 6px;
  background: #fef3c7;
  color: #92400e;
  padding: 6px 12px;
  border-radius: 6px;
  border: 1px solid #fbbf24;
}

.status-icon {
  color: #f59e0b;
  font-size: 16px;
}

.status-text {
  color: #92400e;
  font-weight: 600;
  font-size: 13px;
}

.tab-divider {
  height: 1px;
  background: linear-gradient(90deg, #e2e8f0 0%, #cbd5e1 50%, #e2e8f0 100%);
  margin-bottom: 32px;
}

.tab-content-section {
  min-height: 200px;
}

.content-section {
  background: #fafbfc;
  border-radius: 8px;
  padding: 24px;
  border: 1px solid #e5e7eb;
}

.section-header {
  font-size: 16px;
  font-weight: 600;
  color: #374151;
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}

.info-field {
  padding: 8px 0;
}

.field-label {
  font-size: 12px;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 6px;
}

.field-value {
  font-size: 15px;
  font-weight: 500;
  color: #111827;
  line-height: 1.5;
}

/* Checklist Styles */
.checklist-item-card {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 16px;
  transition: all 0.2s ease;
}

.checklist-item-card:hover {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-color: #d1d5db;
}

.checklist-checkbox.v-input--density-compact .v-label {
  white-space: normal;
  line-height: 1.4;
}

.checklist-checkbox .v-label {
  text-decoration: none !important;
}

.action-buttons-section {
  padding-top: 24px;
  border-top: 1px solid #e5e7eb;
}

/* Dialog Styles */
.dialog-card {
  border-radius: 12px !important;
}

.dialog-header {
  background-color: #f9fafb;
  display: flex;
  align-items: center;
}

.dialog-title {
  font-size: 18px;
  font-weight: 600;
  color: #111827;
}

.dialog-subtitle {
  font-size: 14px;
  color: #6b7280;
  line-height: 1.5;
}

.remarks-textarea :deep(.v-field) {
  border-radius: 8px;
  font-size: 14px;
}

.remarks-textarea :deep(.v-field__input) {
  padding: 12px;
}

/* Vuetify Overrides */
.v-card__text > .v-row {
  margin-top: 0;
  margin-bottom: 0;
}

.v-card__text .v-col {
  padding-top: 0;
  padding-bottom: 0;
}
</style>
