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
        <!-- Profile section from Testingarea.vue header -->
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

        <!-- Tabs Section -->
        <v-card class="elevation-1 tabs-card">
          <v-tabs v-model="activeTab" color="#3b82f6" class="custom-tabs">
            <v-tab value="applicant">
              <v-icon size="18" class="mr-2">mdi-account-details-outline</v-icon>
              Applicant Information
            </v-tab>
            <v-tab value="pdf">
              <v-icon size="18" class="mr-2">mdi-file-pdf-box</v-icon>
              Architectural Plan
            </v-tab>
            <v-tab value="checklist">
              <v-icon size="18" class="mr-2">mdi-clipboard-check-outline</v-icon>
              Report Checklist
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
                        <h2 class="tab-title">Application & Property Details</h2>
                        <p class="tab-subtitle">
                          Complete information about the inspection report application
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
                        <v-col cols="12" sm="4" class="info-field">
                          <div class="field-label">Application Number</div>
                          <div class="field-value">{{ applicant.applicationNumber }}</div>
                        </v-col>
                        <v-col cols="12" sm="4" class="info-field">
                          <div class="field-label">Type of Application</div>
                          <div class="field-value">{{ applicant.typeOfApplication }}</div>
                        </v-col>
                        <v-col cols="12" sm="4" class="info-field">
                          <div class="field-label">Applicant Name</div>
                          <div class="field-value">{{ applicant.name }}</div>
                        </v-col>
                        <v-col cols="12" sm="4" class="info-field">
                          <div class="field-label">Building Permit</div>
                          <div class="field-value">{{ applicant.buildingPermit }}</div>
                        </v-col>
                        <v-col cols="12" sm="4" class="info-field">
                          <div class="field-label">Contact No.</div>
                          <div class="field-value">{{ applicant.contactNo }}</div>
                        </v-col>
                        <v-col cols="12" sm="4" class="info-field">
                          <div class="field-label">Address</div>
                          <div class="field-value">{{ applicant.address }}</div>
                        </v-col>
                      </v-row>
                    </div>

                    <!-- Property Details Section -->
                    <div class="content-section">
                      <h3 class="section-header">
                        <v-icon class="mr-2" size="18">mdi-home-city</v-icon>
                        Property Details
                      </h3>
                      <v-row class="mt-4">
                        <v-col cols="12" sm="4" class="info-field">
                          <div class="field-label">Name of Project</div>
                          <div class="field-value">{{ property.projectName }}</div>
                        </v-col>
                        <v-col cols="12" sm="4" class="info-field">
                          <div class="field-label">No. of Storey/s</div>
                          <div class="field-value">{{ property.noOfStoreys }}</div>
                        </v-col>
                        <v-col cols="12" sm="4" class="info-field">
                          <div class="field-label">Project Location</div>
                          <div class="field-value">{{ property.projectLocation }}</div>
                        </v-col>
                        <v-col cols="12" sm="4" class="info-field">
                          <div class="field-label">No. of Units</div>
                          <div class="field-value">{{ property.noOfUnits }}</div>
                        </v-col>
                        <v-col cols="12" sm="4" class="info-field">
                          <div class="field-label">Use/Character of Occupancy</div>
                          <div class="field-value">{{ property.buildingUse }}</div>
                        </v-col>
                        <v-col cols="12" sm="4" class="info-field">
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

            <!-- Tab 2: PDF Plans -->
            <v-window-item value="pdf">
              <div class="tab-content pa-6">
                <v-card class="unified-tab-card elevation-0">
                  <div class="tab-header-section">
                    <div class="tab-title-section">
                      <div class="tab-icon-wrapper">
                        <v-icon class="tab-icon">mdi-file-pdf-box</v-icon>
                      </div>
                      <div class="tab-title-content">
                        <h2 class="tab-title">Architectural Plan</h2>
                        <p class="tab-subtitle">
                          Review uploaded building plans and documents
                        </p>
                      </div>
                    </div>
                  </div>

                  <div class="tab-divider"></div>

                  <div class="tab-content-section">
                    <div class="content-section">
                      <h3 class="section-header">
                        <v-icon class="mr-2" size="18">mdi-file-document</v-icon>
                        Uploaded Document
                      </h3>
                      <v-card class="pdf-viewer-card mt-4">
                        <div class="pdf-preview-container">
                          <v-icon size="64" color="#ef4444"
                            >mdi-file-upload-outline</v-icon
                          >
                          <div class="pdf-title mt-4">Building Plan Document</div>
                          <div class="pdf-filename">architectural_plans_deguzman.pdf</div>
                        </div>
                      </v-card>
                    </div>
                  </div>
                </v-card>
              </div>
            </v-window-item>

            <!-- Tab 3: Report Checklist -->
            <v-window-item value="checklist">
              <div class="tab-content pa-6">
                <div class="d-flex justify-space-between align-center mb-4">
                  <div class="checklist-header-title">Inspection Checklist Report</div>
                </div>

                <v-card class="checklist-section-card mb-4">
                  <v-card-title class="checklist-section-title">
                    Architectural Works
                  </v-card-title>
                  <v-card-text class="pa-0">
                    <div
                      v-for="(item, index) in checklistItems"
                      :key="index"
                      class="checklist-item"
                    >
                      <div class="d-flex align-center justify-space-between pa-4">
                        <div class="d-flex align-center flex-grow-1">
                          <v-checkbox
                            v-model="item.checked"
                            hide-details
                            color="#3b82f6"
                            class="checklist-checkbox"
                          ></v-checkbox>
                          <div class="ml-3">
                            <div class="checklist-item-label">{{ item.label }}</div>
                          </div>
                        </div>
                      </div>
                      <v-divider v-if="item.checked"></v-divider>
                      <div v-if="item.checked" class="pa-4 pt-2 remarks-section">
                        <v-textarea
                          v-model="item.remarks"
                          placeholder="Add your remarks here..."
                          variant="outlined"
                          rows="2"
                          density="compact"
                          hide-details
                          class="remarks-textarea"
                        ></v-textarea>
                      </div>
                      <v-divider v-if="index < checklistItems.length - 1"></v-divider>
                    </div>
                  </v-card-text>
                </v-card>

                <div class="d-flex justify-end">
                  <v-btn
                    variant="flat"
                    color="#3b82f6"
                    class="text-none font-weight-medium"
                    size="large"
                    @click="submitReport"
                  >
                    Submit Report
                  </v-btn>
                </div>
              </div>
            </v-window-item>
          </v-window>
        </v-card>
      </div>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

const activeTab = ref("applicant");

const router = useRouter();

const goBack = () => {
  router.push("/admin/InspectorDashboard");
};

const applicant = ref({
  applicationNumber: "OP-2025-002",
  name: "Noah A. Deguzman",
  address: "Calauag Filoville Naga City",
  contactNo: "09265428922",
  buildingPermit: "BP-2024-001",
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

const checklistItems = ref([
  {
    label: "Site Development Setting",
    checked: false,
    remarks: "",
  },
  { label: "Fire Safety Requirements", checked: false, remarks: "" },
  { label: "Occupancy/Use & Functionalities", checked: false, remarks: "" },
  {
    label: "Architectural Deficiencies & Parking Requirements",
    checked: false,
    remarks: "",
  },
  {
    label: "Light & Ventilation",
    checked: false,
    remarks: "",
  },
  {
    label: "Accessories Control Location",
    checked: false,
    remarks: "",
  },
  {
    label: "BP 344 Requirements",
    checked: false,
    remarks: "",
  },
  {
    label: "Mechanical Requirements",
    checked: false,
    remarks: "",
  },
]);

const totalItems = computed(() => checklistItems.value.length);
const completedItems = computed(
  () => checklistItems.value.filter((item) => item.checked).length
);

const submitReport = () => {
  console.log("Report submitted:", checklistItems.value);
};

const logOut = () => {
  console.log("Log Out clicked. User should be logged out.");
};
</script>

<style scoped>
/* Header Styles */
.header-subtitle {
  font-size: 12px;
  font-weight: 400;
  color: #111827;
  line-height: 1.2;
}

.header-title {
  font-size: 15px;
  font-weight: 700;
  color: #111827;
  line-height: 1.2;
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
}

.profile-role {
  color: #888 !important;
}

/* Main Content */
.main-content {
  background-color: #f5f6fa;
  padding-top: 88px;
}

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
  min-height: 500px;
  background-color: #fafbfc;
}

/* Info Section Cards */
.info-section-card {
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.section-title {
  font-size: 15px;
  font-weight: 600;
  color: #111827;
  padding: 20px 24px;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
}

.info-field {
  padding: 16px 24px !important;
}

.info-label {
  font-size: 11px;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
}

.info-value {
  font-size: 15px;
  font-weight: 500;
  color: #111827;
  line-height: 1.5;
}

/* PDF Viewer Section */
.pdf-header-title {
  font-size: 16px;
  font-weight: 600;
  color: #111827;
}

.pdf-viewer-card {
  border-radius: 8px;
  border: 2px dashed #d1d5db;
  background-color: #f9fafb;
}

.pdf-preview-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 40px;
  text-align: center;
}

.pdf-title {
  font-size: 16px;
  font-weight: 600;
  color: #111827;
}

.pdf-filename {
  font-size: 14px;
  color: #3b82f6;
  margin-top: 4px;
}

.pdf-meta {
  font-size: 12px;
  color: #6b7280;
  margin-top: 8px;
}

/* Checklist Section */
.checklist-header-title {
  font-size: 16px;
  font-weight: 600;
  color: #111827;
}

.progress-text {
  font-size: 13px;
  color: #3b82f6;
  font-weight: 600;
}

.checklist-section-card {
  border-radius: 8px;
  border: 1px solid #e5e7eb;
}

.checklist-section-title {
  font-size: 14px;
  font-weight: 600;
  color: #111827;
  padding: 16px;
  border-bottom: 1px solid #e5e7eb;
  background-color: #f9fafb;
}

.checklist-item {
  background-color: #fff;
  transition: background-color 0.2s;
}

.checklist-item:hover {
  background-color: #fafbfc;
}

.checklist-checkbox :deep(.v-selection-control) {
  min-height: unset;
}

.checklist-item-label {
  font-size: 14px;
  font-weight: 500;
  color: #111827;
}

/* checklist-status removed - icon and text no longer shown */

.remarks-section {
  background-color: #f9fafb;
}

.remarks-label {
  font-size: 11px;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
}

.remarks-textarea :deep(.v-field) {
  font-size: 13px;
  background-color: #fff;
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

.unified-btn {
  background: #3b82f6 !important;
  color: white !important;
  text-transform: none;
  font-weight: 600;
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.unified-btn:hover {
  background: #2563eb !important;
  transform: translateY(-1px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
