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
              <v-btn variant="text" v-bind="props" class="profile-btn">
                <div class="d-flex align-center">
                  <v-avatar color="#3b82f6" size="38" class="mr-3">
                    <span style="color: white; font-weight: 600">NS</span>
                  </v-avatar>
                  <div class="text-left">
                    <div class="profile-name" style="font-size: 14px; font-weight: 600">
                      Noah Sinclair
                    </div>
                    <div class="profile-role" style="font-size: 12px">Inspector</div>
                  </div>
                  <v-icon class="ml-2" style="color: #6b7280">mdi-chevron-down</v-icon>
                </div>
              </v-btn>
            </template>
            <v-card min-width="250" class="mt-1">
              <v-list>
                <v-list-item>
                  <div class="d-flex align-center">
                    <v-avatar color="#3b82f6" size="40" class="mr-3">
                      <span style="color: white; font-weight: 600">NS</span>
                    </v-avatar>
                    <div>
                      <div style="font-weight: 600; font-size: 14px">Chief Inspector</div>
                      <div style="font-size: 12px; color: #6b7280">Chief Inspector</div>
                    </div>
                  </div>
                </v-list-item>
                <v-divider></v-divider>
                <v-list-item @click="logOut">
                  <v-icon class="mr-2" size="small">mdi-logout</v-icon>
                  Log Out
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
              <h2 class="header-main-title">Inspection Report Details</h2>
              <p class="header-app-number">
                Application No. {{ applicant.applicationNumber }}
              </p>
            </div>
          </div>
        </div>

        <!-- Tabs Section -->
        <v-card class="elevation-1 tabs-card">
          <v-tabs v-model="activeTab" color="#3b82f6" class="custom-tabs">
            <v-tab value="applicant">
              <v-icon class="mr-2" size="small">mdi-account-circle</v-icon>
              Application Details
            </v-tab>
            <v-tab value="plans">
              <v-icon class="mr-2" size="small">mdi-file-document-multiple</v-icon>
              Building Plans
            </v-tab>
            <v-tab value="reports">
              <v-icon class="mr-2" size="small">mdi-clipboard-text</v-icon>
              Inspection Reports
            </v-tab>
          </v-tabs>

          <v-divider></v-divider>

          <v-window v-model="activeTab">
            <!-- Tab 1: Application Details -->
            <v-window-item value="applicant">
              <div class="tab-content pa-6">
                <!-- Page Header with Icon -->
                <div class="details-page-header mb-6">
                  <div class="d-flex align-center mb-2">
                    <div class="header-icon-box">
                      <v-icon size="28" color="white"
                        >mdi-file-document-edit-outline</v-icon
                      >
                    </div>
                    <div class="ml-4">
                      <h2 class="details-main-title">Application & Property Details</h2>
                      <p class="details-subtitle">
                        Complete information about the occupancy permit application
                      </p>
                    </div>
                  </div>
                </div>

                <!-- Applicant Information Card -->
                <v-card class="details-card mb-5 elevation-1">
                  <div class="details-card-header">
                    <v-icon size="20" class="mr-2">mdi-account</v-icon>
                    <span class="details-card-title">Applicant Information</span>
                  </div>
                  <v-card-text class="pa-6">
                    <v-row>
                      <v-col cols="12" md="6">
                        <div class="detail-label">APPLICATION NUMBER</div>
                        <div class="detail-value">{{ applicant.applicationNumber }}</div>
                      </v-col>
                      <v-col cols="12" md="6">
                        <div class="detail-label">TYPE OF APPLICATION</div>
                        <div class="detail-value">{{ applicant.typeOfApplication }}</div>
                      </v-col>
                      <v-col cols="12" md="6">
                        <div class="detail-label">APPLICANT NAME</div>
                        <div class="detail-value">{{ applicant.name }}</div>
                      </v-col>
                      <v-col cols="12" md="6">
                        <div class="detail-label">BUILDING PERMIT</div>
                        <div class="detail-value">{{ applicant.buildingPermit }}</div>
                      </v-col>
                      <v-col cols="12" md="6">
                        <div class="detail-label">CONTACT NO.</div>
                        <div class="detail-value">{{ applicant.contactNo }}</div>
                      </v-col>
                      <v-col cols="12" md="6">
                        <div class="detail-label">ADDRESS</div>
                        <div class="detail-value">{{ applicant.address }}</div>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>

                <!-- Property Details Card -->
                <v-card class="details-card elevation-1">
                  <div class="details-card-header">
                    <v-icon size="20" class="mr-2">mdi-home-city</v-icon>
                    <span class="details-card-title">Property Details</span>
                  </div>
                  <v-card-text class="pa-6">
                    <v-row>
                      <v-col cols="12" md="6">
                        <div class="detail-label">NAME OF PROJECT</div>
                        <div class="detail-value">{{ property.projectName }}</div>
                      </v-col>
                      <v-col cols="12" md="6">
                        <div class="detail-label">NO. OF STOREY/S</div>
                        <div class="detail-value">{{ property.noOfStoreys }}</div>
                      </v-col>
                      <v-col cols="12" md="6">
                        <div class="detail-label">PROJECT LOCATION</div>
                        <div class="detail-value">{{ property.projectLocation }}</div>
                      </v-col>
                      <v-col cols="12" md="6">
                        <div class="detail-label">NO. OF UNITS</div>
                        <div class="detail-value">{{ property.noOfUnits }}</div>
                      </v-col>
                      <v-col cols="12" md="6">
                        <div class="detail-label">USE/CHARACTER OF OCCUPANCY</div>
                        <div class="detail-value">{{ property.buildingUse }}</div>
                      </v-col>
                      <v-col cols="12" md="6">
                        <div class="detail-label">TOTAL GROSS FLOOR AREA</div>
                        <div class="detail-value">{{ property.totalGrossFloorArea }}</div>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </div>
            </v-window-item>

            <!-- Tab 2: Building Plans -->
            <v-window-item value="plans">
              <div class="tab-content pa-6">
                <v-row>
                  <v-col cols="12" md="8">
                    <div class="plan-preview-container mb-4">
                      <div class="plan-preview-header mb-4">
                        <h3>Building Plans</h3>
                      </div>
                      <v-card class="pdf-viewer-card">
                        <div class="pdf-preview-container">
                          <v-icon size="64" color="#3b82f6">mdi-file-pdf-box</v-icon>
                          <p class="pdf-title mt-4">{{ selectedPlan.name }}</p>
                          <p class="pdf-filename">{{ selectedPlan.filename }}</p>
                          <p class="pdf-meta">
                            {{ selectedPlan.size }} • {{ selectedPlan.type }} • Uploaded
                            {{ selectedPlan.uploadDate }}
                          </p>
                        </div>
                      </v-card>
                    </div>
                  </v-col>

                  <v-col cols="12" md="4">
                    <div class="plan-list-container">
                      <h3 class="mb-3">Additional Documents</h3>
                      <div class="d-flex flex-column" style="gap: 12px">
                        <v-card
                          v-for="(plan, index) in buildingPlans"
                          :key="index"
                          class="plan-card"
                          :class="{ 'plan-card-active': selectedPlan.name === plan.name }"
                          @click="selectPlan(plan)"
                        >
                          <div class="d-flex align-center">
                            <v-icon color="#ef4444" size="32" class="mr-3"
                              >mdi-file-pdf-box</v-icon
                            >
                            <div class="flex-grow-1">
                              <p class="plan-card-title">{{ plan.name }}</p>
                              <p class="plan-card-meta">
                                {{ plan.size }} • {{ plan.type }}
                              </p>
                            </div>
                          </div>
                        </v-card>
                      </div>
                    </div>
                  </v-col>
                </v-row>
              </div>
            </v-window-item>

            <!-- Tab 3: Inspection Reports -->
            <v-window-item value="reports">
              <div class="tab-content pa-6">
                <!-- Report Navigation -->
                <div class="reports-nav-section mb-4">
                  <h4 class="reports-nav-title">
                    Reports ({{ inspectionData.reports.length }})
                  </h4>
                  <div class="reports-nav-buttons">
                    <v-btn
                      v-for="(report, index) in inspectionData.reports"
                      :key="index"
                      :variant="currentReportIndex === index ? 'flat' : 'outlined'"
                      :color="currentReportIndex === index ? '#3b82f6' : 'default'"
                      class="report-nav-btn"
                      :class="{ 'report-nav-btn-active': currentReportIndex === index }"
                      @click="currentReportIndex = index"
                    >
                      <v-icon start size="18">mdi-file-document</v-icon>
                      {{ report.workType }}
                    </v-btn>
                  </div>
                </div>

                <!-- Report Content -->
                <v-card class="report-display-card elevation-1">
                  <div class="report-display-header">
                    <div>
                      <h3 class="report-display-title">
                        {{ inspectionData.reports[currentReportIndex].workType }}
                      </h3>
                      <p class="report-display-inspector">
                        Assigned Inspector:
                        <strong>{{
                          inspectionData.reports[currentReportIndex].inspector
                        }}</strong>
                      </p>
                    </div>
                  </div>

                  <v-divider></v-divider>

                  <v-card-text class="pa-6">
                    <div class="report-items-grid">
                      <div
                        v-for="(item, itemIndex) in inspectionData.reports[
                          currentReportIndex
                        ].items"
                        :key="itemIndex"
                        class="report-item-box"
                      >
                        <h4 class="report-item-box-title">{{ item.title }}</h4>
                        <p class="report-item-box-detail">{{ item.detail }}</p>
                      </div>
                    </div>
                  </v-card-text>
                </v-card>
              </div>
            </v-window-item>
          </v-window>
        </v-card>
      </div>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const activeTab = ref("applicant");
const currentReportIndex = ref(0);

const goBack = () => {
  router.push("/admin/InspectorDashboard");
};

const applicant = ref({
  applicationNumber: "OP-2025-002",
  name: "Noah A. Deguzman",
  address: "Calauag Filoville Naga City",
  contactNo: "09265428922",
  typeOfApplication: "Full",
  buildingPermit: "BP-2024-001",
});

const property = ref({
  projectName: "Deguzman Residential Building",
  projectLocation: "456 Main St., Brgy. San Isidro, Naga City",
  buildingUse: "Residential - Single-Family",
  noOfStoreys: 2,
  noOfUnits: 5,
  totalGrossFloorArea: "200.00 sqm",
});

const buildingPlans = ref([
  {
    name: "Architectural Plans",
    filename: "architectural_plans_deguzman.pdf",
    size: "3.4 MB",
    type: "PDF",
    uploadDate: "June 17, 2025",
  },
  {
    name: "Site Development Plan",
    filename: "site_development_plan.pdf",
    size: "1.8 MB",
    type: "PDF",
    uploadDate: "June 17, 2025",
  },
  {
    name: "Structural Plans",
    filename: "structural_plans.pdf",
    size: "3.2 MB",
    type: "PDF",
    uploadDate: "June 17, 2025",
  },
  {
    name: "Electrical Plans",
    filename: "electrical_plans.pdf",
    size: "2.1 MB",
    type: "PDF",
    uploadDate: "June 17, 2025",
  },
  {
    name: "Plumbing Plans",
    filename: "plumbing_plans.pdf",
    size: "1.5 MB",
    type: "PDF",
    uploadDate: "June 17, 2025",
  },
]);

const selectedPlan = ref(buildingPlans.value[0]);

const selectPlan = (plan) => {
  selectedPlan.value = plan;
};

const inspectionData = ref({
  date: "October 25, 2025",
  time: "10:30 AM",
  status: "Complete",
  reports: [
    {
      workType: "Architectural Works Report",
      inspector: "Arch. Maria F. Santos",
      items: [
        {
          title: "Site Development Setting",
          detail:
            "The site layout conforms to the approved plans, including setbacks and landscaping buffers.",
        },
        {
          title: "Fire Safety Requirements",
          detail:
            "All passive fire safety elements (rated walls, proper separations) and access routes are correctly in place.",
        },
        {
          title: "Occupancy/Use & Functionalities",
          detail:
            "The interior space layout meets the functional requirements for a Residential-Single Family use.",
        },
        {
          title: "Light & Ventilation",
          detail:
            "All rooms have adequate natural light and ventilation as per the Building Code.",
        },
        {
          title: "BP 344 Requirements",
          detail:
            "Accessibility features (ramps, accessible comfort rooms) are provided and compliant.",
        },
        {
          title: "Architectural Deficiencies & Parking Requirements",
          detail:
            "All required parking slots are provided, and no aesthetic deficiencies were noted.",
        },
      ],
    },
    {
      workType: "Civil / Structural Works Report",
      inspector: "Engr. Evangeline Tolosa",
      items: [
        {
          title: "Application for Building Permit",
          detail: "The necessary application for the building permit has been completed.",
        },
        {
          title: "Excavation & Foundation",
          detail:
            "The foundation system installation passed inspection, matching design specifications and soil bearing capacity.",
        },
        {
          title: "Scaffolding & Sidewalk",
          detail:
            "All scaffolding was removed, and the sidewalk was restored/completed without obstruction.",
        },
        {
          title: "Safety Requirements for Construction/Demolition",
          detail:
            "The construction process adhered to all safety standards; all debris has been cleared.",
        },
        {
          title: "Placement of Rebars/Pre-Pouring of Concrete",
          detail:
            "Structural elements (columns, beams, slabs) passed final inspection prior to pouring and cured correctly.",
        },
        {
          title: "Structural Hazards",
          detail:
            "No structural hazards were identified, and all critical load-bearing elements are secure.",
        },
      ],
    },
    {
      workType: "Electrical Works Report",
      inspector: "Engr. Benigno A. Cruz",
      items: [
        {
          title: "General Requirements",
          detail: "All electrical works comply with the approved electrical permit.",
        },
        {
          title: "General Wiring Method",
          detail:
            "Wiring methods used (conduits, cable trays) are appropriate and correctly installed.",
        },
        {
          title: "Services, Feeders & Branch Circuits",
          detail:
            "Service entrance, feeders, and branch circuits are correctly rated and protected.",
        },
        {
          title: "Grounding & Bonding",
          detail:
            "The grounding electrode system and bonding are correctly installed and tested.",
        },
        {
          title: "Emergency & Standby Systems & Fire Pumps",
          detail:
            "Emergency lighting and required standby power systems are installed and tested for functionality.",
        },
        {
          title: "Hazardous Locations",
          detail:
            "No hazardous locations are present; if applicable (e.g., generator room), code requirements are met.",
        },
      ],
    },
    {
      workType: "Sanitary / Plumbing Works Report",
      inspector: "Engr. Ricardo L. Reyes",
      items: [
        {
          title: "Source of Water Supply & Plumbing Installation",
          detail:
            "The plumbing system is connected to an approved water source, and all pipe installations are complete.",
        },
        {
          title: "Drainage & Solid / Wastewater Disposal Installation",
          detail:
            "The sanitary and storm drainage systems are correctly terminated and connect to the public sewer system or approved septic tank.",
        },
        {
          title: "Hazards & Pollution on Building & Premises",
          detail:
            "No immediate plumbing hazards (e.g., cross-connections, backflow issues) or pollution risks were identified.",
        },
      ],
    },
  ],
});

const nextReport = () => {
  if (currentReportIndex.value < inspectionData.value.reports.length - 1) {
    currentReportIndex.value++;
  }
};

const previousReport = () => {
  if (currentReportIndex.value > 0) {
    currentReportIndex.value--;
  }
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

/* Application Details Page Styles */
.details-page-header {
  margin-bottom: 24px;
}

.header-icon-box {
  width: 56px;
  height: 56px;
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.details-main-title {
  font-size: 22px;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
  line-height: 1.2;
}

.details-subtitle {
  font-size: 14px;
  color: #9ca3af;
  margin: 4px 0 0 0;
  font-weight: 400;
}

.details-card {
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  overflow: hidden;
}

.details-card-header {
  background: #f9fafb;
  padding: 16px 24px;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
}

.details-card-title {
  font-size: 16px;
  font-weight: 600;
  color: #374151;
}

.detail-label {
  font-size: 11px;
  font-weight: 600;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
}

.detail-value {
  font-size: 15px;
  font-weight: 500;
  color: #1f2937;
  line-height: 1.5;
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

/* Building Plans Styles */
.plan-preview-container {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  border: 1px solid #e5e7eb;
}

.plan-preview-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.plan-preview-header h3 {
  font-size: 18px;
  font-weight: 600;
  color: #111827;
  margin: 0;
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

.plan-list-container h3 {
  font-size: 16px;
  font-weight: 600;
  color: #111827;
}

.plan-card {
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  cursor: pointer;
  transition: all 0.2s;
  background: #fff;
}

.plan-card:hover {
  border-color: #3b82f6;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.1);
}

.plan-card-active {
  border-color: #3b82f6;
  background-color: #eff6ff;
}

.plan-card-title {
  font-size: 14px;
  font-weight: 600;
  color: #111827;
  margin-bottom: 4px;
}

.plan-card-meta {
  font-size: 12px;
  color: #6b7280;
}

/* Inspection Reports Styles */
.reports-nav-section {
  margin-bottom: 24px;
}

.reports-nav-title {
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 12px;
}

.reports-nav-buttons {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.report-nav-btn {
  text-transform: none;
  font-weight: 500;
  font-size: 14px;
  padding: 10px 20px;
  border-radius: 8px;
  letter-spacing: normal;
}

.report-nav-btn-active {
  color: white !important;
}

.report-display-card {
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  overflow: hidden;
}

.report-display-header {
  padding: 20px 24px;
  background: #fff;
}

.report-display-title {
  font-size: 20px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 6px 0;
}

.report-display-inspector {
  font-size: 14px;
  color: #6b7280;
  margin: 0;
}

.report-items-grid {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.report-item-box {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-left: 4px solid #3b82f6;
  border-radius: 8px;
  padding: 16px 20px;
}

.report-item-box-title {
  font-size: 15px;
  font-weight: 600;
  color: #111827;
  margin: 0 0 8px 0;
}

.report-item-box-detail {
  font-size: 14px;
  color: #4b5563;
  margin: 0;
  line-height: 1.6;
}
</style>
