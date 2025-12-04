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
        <!-- Profile section -->
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
                  <v-list-item-title class="font-weight-bold"
                    >Jacqueline Azada</v-list-item-title
                  >
                  <v-list-item-subtitle
                    >jacqueline.azada@nagacity.gov.ph</v-list-item-subtitle
                  >
                </v-list-item>
                <v-divider class="my-1"></v-divider>
                <v-list-item link @click="logOut" class="text-red-darken-1">
                  <template #prepend><v-icon>mdi-logout</v-icon></template>
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
            <v-tab value="schedule">
              <v-icon size="18" class="mr-2">mdi-calendar-check</v-icon>
              Inspection Schedule
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
                          Complete information about the occupancy permit application
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
                          <div class="field-label">Building Permit</div>
                          <div class="field-value">{{ applicant.buildingPermit }}</div>
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
                        <v-icon class="mr-2" size="18">mdi-home-city</v-icon>
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
                        <h2 class="tab-title">Occupancy Requirements Checklist</h2>
                        <p class="tab-subtitle">
                          Verification checklist for occupancy permit application
                        </p>
                      </div>
                    </div>
                    <div class="status-wrapper">
                      <div class="status-chip">
                        <v-icon class="status-icon">mdi-check-circle</v-icon>
                        <span class="status-text">Verified</span>
                      </div>
                    </div>
                  </div>

                  <div class="tab-divider"></div>

                  <div class="tab-content-section">
                    <v-list class="checklist-list">
                      <v-list-item
                        v-for="(item, index) in checklistItems"
                        :key="index"
                        class="checklist-item"
                      >
                        <template #prepend>
                          <div class="check-icon-wrapper">
                            <v-icon class="check-icon">mdi-check</v-icon>
                          </div>
                        </template>
                        <div class="item-content">
                          <div class="item-title">{{ item.title }}</div>
                          <div v-if="item.details" class="item-details">
                            {{ item.details }}
                          </div>
                        </div>
                      </v-list-item>
                    </v-list>
                  </div>
                </v-card>
              </div>
            </v-window-item>

            <!-- Tab 3: Inspection Schedule -->
            <v-window-item value="schedule">
              <div class="tab-content pa-6">
                <v-card class="unified-tab-card elevation-0">
                  <div class="tab-header-section">
                    <div class="tab-title-section">
                      <div class="tab-icon-wrapper">
                        <v-icon class="tab-icon">mdi-calendar-check</v-icon>
                      </div>
                      <div class="tab-title-content">
                        <h2 class="tab-title">Inspection Schedule</h2>
                        <p class="tab-subtitle">
                          Current inspection schedule and monitoring status
                        </p>
                      </div>
                    </div>
                  </div>

                  <div class="tab-divider"></div>

                  <div class="tab-content-section">
                    <div v-if="inspectionDetails.date" class="content-section">
                      <!-- Schedule Info -->
                      <div class="content-section mb-6">
                        <h3 class="section-header">
                          <v-icon class="mr-2" size="18">mdi-calendar-clock</v-icon>
                          Schedule Details
                        </h3>
                        <v-row class="mt-4">
                          <v-col cols="12" sm="6" class="info-field">
                            <div class="field-label">Inspection Date</div>
                            <div class="field-value">
                              {{ formatDate(inspectionDetails.date) }}
                            </div>
                          </v-col>
                          <v-col cols="12" sm="6" class="info-field">
                            <div class="field-label">Inspection Time</div>
                            <div class="field-value">
                              {{ formatTime(inspectionDetails.time) }}
                            </div>
                          </v-col>
                        </v-row>
                      </div>

                      <!-- Schedule Monitoring -->
                      <div class="content-section">
                        <h3 class="section-header">
                          <v-icon class="mr-2" size="18"
                            >mdi-chart-timeline-variant</v-icon
                          >
                          Schedule Monitoring
                        </h3>
                        <div class="mt-4">
                          <div
                            v-for="(detail, key) in inspectionDetails.works"
                            :key="key"
                            class="monitor-item"
                          >
                            <div class="d-flex justify-space-between align-center">
                              <div class="d-flex align-center">
                                <v-icon
                                  size="20"
                                  class="mr-2"
                                  :color="statusColors[detail.status].icon"
                                >
                                  {{
                                    detail.status === "Approved"
                                      ? "mdi-check-circle"
                                      : "mdi-alert-circle"
                                  }}
                                </v-icon>
                                <span class="font-weight-medium">{{ detail.label }}</span>
                              </div>
                              <span
                                class="status-pill"
                                :style="statusColors[detail.status].style"
                              >
                                {{ detail.status }}
                              </span>
                            </div>
                            <div class="inspector-name">{{ detail.inspector }}</div>
                          </div>
                        </div>
                      </div>

                      <div class="mt-6">
                        <v-btn class="unified-btn" block size="large"
                          >Send Schedule</v-btn
                        >
                      </div>
                    </div>

                    <div v-else class="empty-state">
                      <div class="empty-state-content">
                        <v-icon color="#3b82f6" size="64">mdi-calendar-off</v-icon>
                        <h3 class="empty-state-title mt-4 mb-2">
                          No Inspection Scheduled
                        </h3>
                        <p class="empty-state-subtitle mb-6">
                          Schedule an inspection by assigning inspectors and setting the
                          date and time.
                        </p>
                        <v-btn
                          class="unified-btn"
                          prepend-icon="mdi-calendar-plus"
                          @click="scheduleInspection"
                        >
                          Schedule Inspection
                        </v-btn>
                      </div>
                    </div>
                  </div>
                </v-card>
              </div>
            </v-window-item>
          </v-window>
        </v-card>
      </div>

      <v-dialog v-model="dialog" max-width="600px">
        <v-card class="dialog-card">
          <v-card-title class="dialog-header">
            <v-icon class="mr-3" color="#fff">mdi-calendar-check</v-icon>
            <span class="text-h6 font-weight-bold dialog-title">Schedule Inspection</span>
            <v-spacer></v-spacer>
            <v-btn icon variant="text" @click="dialog = false" size="small">
              <v-icon color="#fff">mdi-close</v-icon>
            </v-btn>
          </v-card-title>

          <v-card-text class="pt-4">
            <v-form @submit.prevent="submitSchedule">
              <v-row class="mb-2">
                <v-col cols="12" sm="6">
                  <v-label class="input-label">Date of Inspection</v-label>
                  <v-text-field
                    v-model="inspectionDate"
                    variant="outlined"
                    density="compact"
                    hide-details
                    type="date"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-label class="input-label">Time</v-label>
                  <v-text-field
                    v-model="inspectionTime"
                    variant="outlined"
                    density="compact"
                    hide-details
                    type="time"
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-label class="mt-4 mb-2 input-label">Assign Inspectors</v-label>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-label class="input-label-small">Architectural Works</v-label>
                  <v-select
                    v-model="inspectors.architectural"
                    :items="inspectorsList.architectural"
                    label="Select Inspector"
                    density="compact"
                    variant="outlined"
                    hide-details
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-label class="input-label-small">Civil/Structural Works</v-label>
                  <v-select
                    v-model="inspectors.civilStructural"
                    :items="inspectorsList.civilStructural"
                    label="Select Inspector"
                    density="compact"
                    variant="outlined"
                    hide-details
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-label class="input-label-small">Electrical Works</v-label>
                  <v-select
                    v-model="inspectors.electrical"
                    :items="inspectorsList.electrical"
                    label="Select Inspector"
                    density="compact"
                    variant="outlined"
                    hide-details
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-label class="input-label-small">Sanitary Plumbing Works</v-label>
                  <v-select
                    v-model="inspectors.sanitaryPlumbing"
                    :items="inspectorsList.sanitaryPlumbing"
                    label="Select Inspector"
                    density="compact"
                    variant="outlined"
                    hide-details
                  ></v-select>
                </v-col>
              </v-row>

              <v-btn class="submit-btn" type="submit" block>SUBMIT</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const goBack = () => {
  router.push("/admin/TechstaffDashboard");
};

const dialog = ref(false);
const inspectionDate = ref(null);
const inspectionTime = ref(null);
const inspectors = ref({
  architectural: null,
  civilStructural: null,
  electrical: null,
  sanitaryPlumbing: null,
});

const inspectionDetails = ref({
  date: null,
  time: null,
  works: {
    architectural: { label: "Architectural Works", inspector: null, status: "Pending" },
    civilStructural: {
      label: "Civil/Structural Works",
      inspector: null,
      status: "Pending",
    },
    electrical: { label: "Electrical Works", inspector: null, status: "Pending" },
    sanitaryPlumbing: {
      label: "Sanitary Plumbing Works",
      inspector: null,
      status: "Pending",
    },
  },
});

const inspectorsList = {
  architectural: ["Arch. Joyce Oberos", "Arch. Anne Dela Cruz", "Arch. Mark Villanueva"],
  civilStructural: ["Eng. Roberto Martinez", "Eng. Brian Santos", "Eng. Lyka Gomez"],
  electrical: ["Eng. Bernadette Veroza", "Eng. Claire Garcia", "Eng. John Paul Lim"],
  sanitaryPlumbing: ["Eng. Andrew Villapane", "Eng. D. Reyes", "Eng. M. Fernandez"],
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

// Tab state for the new tabbed layout
const activeTab = ref("applicant");

// Checklist items (copied from VerifiedChecklist.vue)
const checklistItems = [
  {
    title:
      "Two (2) copies of accomplished Unified Application form for Certificate of Occupancy, duly notarized;",
    details: null,
  },
  {
    title: "Two (2) copies of Certificate of Completion, duly notarized;",
    details: null,
  },
  {
    title:
      "Construction Logbook, signed and sealed by the Owner's Architect or Civil Engineer who undertook full-time inspection and supervision;",
    details: null,
  },
  {
    title: "Two (2) photocopies of the valid licenses of all involved professionals;",
    details: null,
  },
  {
    title:
      "Photograph of the structure with substantial completion showing front, sides, and rear areas;",
    details: null,
  },
  {
    title:
      "Two (2) sets of As-Built Plans, if there are changes in the building plans covered by the issued Building Permit;",
    details: null,
  },
  {
    title: "Two (2) copies of Certificate of Final Electrical Inspection;",
    details: null,
  },
  {
    title:
      "Two (2) copies of Fire Safety Inspection Certificate from the Bureau of Fire and Protection;",
    details: null,
  },
  {
    title: "Sketch map indicating the location of the project;",
    details: null,
  },
];

const formatDate = (dateString) => {
  if (!dateString) return "";
  const [year, month, day] = dateString.split("-");
  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

const formatTime = (timeString) => {
  if (!timeString) return "";
  const [hours, minutes] = timeString.split(":");
  const date = new Date();
  date.setHours(parseInt(hours), parseInt(minutes));
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const logOut = () => {
  // Implement logout functionality
};

const viewChecklist = () => {
  router.push("/admin/VerifiedChecklist");
};

const scheduleInspection = () => {
  dialog.value = true;
};

const submitSchedule = () => {
  if (
    !inspectionDate.value ||
    !inspectionTime.value ||
    !inspectors.value.architectural ||
    !inspectors.value.civilStructural ||
    !inspectors.value.electrical ||
    !inspectors.value.sanitaryPlumbing
  ) {
    alert("Please fill in all date, time, and inspector fields.");
    return;
  }

  inspectionDetails.value.date = inspectionDate.value;
  inspectionDetails.value.time = inspectionTime.value;
  inspectionDetails.value.works.architectural.inspector = inspectors.value.architectural;
  inspectionDetails.value.works.architectural.status = "Pending";

  inspectionDetails.value.works.civilStructural.inspector =
    inspectors.value.civilStructural;
  inspectionDetails.value.works.civilStructural.status = "Pending";

  inspectionDetails.value.works.electrical.inspector = inspectors.value.electrical;
  inspectionDetails.value.works.electrical.status = "Pending";

  inspectionDetails.value.works.sanitaryPlumbing.inspector =
    inspectors.value.sanitaryPlumbing;
  inspectionDetails.value.works.sanitaryPlumbing.status = "Pending";

  dialog.value = false;
  inspectionDate.value = null;
  inspectionTime.value = null;
  inspectors.value = {
    architectural: null,
    civilStructural: null,
    electrical: null,
    sanitaryPlumbing: null,
  };
};

const statusColors = {
  Pending: {
    style: { background: "#fff7e6", color: "#92400e" },
    icon: "#f59e0b",
  },
  Approved: {
    style: { background: "#d1fae5", color: "#065f46" },
    icon: "#10b981",
  },
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
  background-color: #f5f6fa;
  padding-top: 88px;
}

/* Dialog Styles */
.dialog-card {
  border-radius: 10px;
}

.dialog-header {
  background: #3b82f6;
  color: #fff;
  padding: 16px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.dialog-title {
  color: #fff;
}

/* Form Styles */
.input-label {
  font-size: 14px;
  font-weight: 500;
  color: #1f2937;
  margin-bottom: 4px;
  display: block;
}

.input-label-small {
  font-size: 14px;
  font-weight: 500;
  color: #1f2937;
  margin-bottom: 4px;
  display: block;
}

.submit-btn {
  background: #3b82f6;
  color: #fff;
  text-transform: uppercase;
  font-weight: 600;
  margin-top: 16px;
  margin-bottom: 8px;
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

/* Tabs Card (used for converting layout to tabs) */
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

/* Card Styles */
.detail-card {
  border-radius: 10px;
}

.card-title {
  font-size: 14px;
  font-weight: 500;
  color: #1f2937;
  border-bottom: 1px solid #e5e7eb;
  padding: 10px;
  display: flex;
  align-items: center;
}

.card-title-blue {
  font-size: 15px;
  font-weight: 500;
  color: #fff;
  background: #3b82f6;
  padding: 14px 10px;
  display: flex;
  align-items: center;
}

/* Field Styles */
.grid-item {
  margin-bottom: 4px;
}

.field-label {
  font-size: 12px;
  font-weight: 500;
  color: #6b7280;
  text-transform: uppercase;
  margin-top: 12px;
  margin-bottom: 7px;
}

.field-value {
  font-size: 15px;
  font-weight: 500;
  color: #1f2937;
}

/* Button Styles */
.view-btn {
  background: #3b82f6;
  color: #fff;
  text-transform: none;
  font-weight: 600;
  border-radius: 4px;
}

.schedule-btn {
  background: #3b82f6;
  color: #fff;
  text-transform: none;
  font-weight: 600;
  border-radius: 4px;
}

.submit-btn-filled {
  background: #3b82f6;
  color: #fff;
  text-transform: capitalize;
  font-weight: 600;
  margin-top: 12px;
  height: 40px;
}

/* Inspection Card */
.inspection-card {
  overflow: hidden;
}

/* Info Boxes */
.info-box {
  background-color: #fff;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  border: 1px solid #e5e7eb;
}

.info-label {
  font-size: 13px;
  color: #3b82f6;
  font-weight: 500;
}

.info-value {
  font-size: 18px;
  color: #1f2937;
  font-weight: 700;
  margin-top: 4px;
}

/* Schedule Monitor */
.schedule-monitor-label {
  font-size: 12px;
  color: #6b7280;
  margin-top: 16px;
  margin-bottom: 8px;
}

.monitor-item {
  border: 1px solid #e5e7eb;
  padding: 12px;
  border-radius: 4px;
  margin-bottom: 8px;
}

.inspector-name {
  font-size: 13px;
  color: #6b7280;
  margin-top: 4px;
  margin-left: 22px;
}

.status-pill {
  padding: 4px 8px;
  border-radius: 16px;
  font-size: 11px;
  font-weight: 700;
  min-width: 70px;
  text-align: center;
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
  background: #d1fae5;
  color: #059669;
  padding: 6px 12px;
  border-radius: 6px;
  border: 1px solid #a7f3d0;
}

.status-icon {
  color: #059669;
  font-size: 16px;
}

.status-text {
  color: #059669;
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

.empty-state {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
}

.empty-state-content {
  text-align: center;
  max-width: 400px;
}

.empty-state-title {
  font-size: 18px;
  font-weight: 600;
  color: #374151;
}

.empty-state-subtitle {
  font-size: 14px;
  color: #6b7280;
  line-height: 1.5;
}

/* Checklist Specific Styles */
.checklist-list {
  background: transparent;
  padding: 0;
}

.checklist-item {
  padding: 20px 0;
  border-bottom: 1px solid #f1f5f9;
  transition: all 0.2s ease;
}

.checklist-item:last-child {
  border-bottom: none;
}

.checklist-item:hover {
  background: #f8fafc;
  border-radius: 8px;
  padding-left: 12px;
  padding-right: 12px;
  margin: 0 -12px;
}

.check-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background: #10b981;
  border-radius: 6px;
  margin-right: 16px;
  flex-shrink: 0;
}

.check-icon {
  color: white;
  font-size: 14px;
  font-weight: 700;
}

.item-content {
  flex: 1;
}

.item-title {
  font-size: 14px;
  font-weight: 500;
  color: #1e293b;
  line-height: 1.5;
  margin-bottom: 4px;
}

.item-details {
  font-size: 13px;
  color: #64748b;
  font-style: italic;
  line-height: 1.4;
}
</style>
