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
        <v-row>
          <v-col cols="12" md="7">
            <v-card class="mb-4 elevation-1 detail-card">
              <v-card-title class="card-title">
                <v-icon class="mr-2" color="#3b82f6" size="20"
                  >mdi-account-details-outline</v-icon
                >
                Applicant Information
              </v-card-title>
              <v-card-text>
                <v-row>
                  <v-col cols="12" sm="6" class="grid-item">
                    <div class="field-label">Application Number</div>
                    <div class="field-value">{{ applicant.applicationNumber }}</div>
                  </v-col>
                  <v-col cols="12" sm="6" class="grid-item">
                    <div class="field-label">Type of Application</div>
                    <div class="field-value">{{ applicant.typeOfApplication }}</div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6" class="grid-item">
                    <div class="field-label">Applicant Name</div>
                    <div class="field-value">{{ applicant.name }}</div>
                  </v-col>
                  <v-col cols="12" sm="6" class="grid-item">
                    <div class="field-label">Building Permit</div>
                    <div class="field-value">{{ applicant.buildingPermit }}</div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6" class="grid-item">
                    <div class="field-label">Contact No.</div>
                    <div class="field-value">{{ applicant.contactNo }}</div>
                  </v-col>
                  <v-col cols="12" sm="6" class="grid-item">
                    <div class="field-label">Address</div>
                    <div class="field-value">{{ applicant.address }}</div>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>

            <v-card class="mb-4 elevation-1 detail-card">
              <v-card-title class="card-title">
                <v-icon class="mr-2" color="#3b82f6" size="20"
                  >mdi-home-city-outline</v-icon
                >
                Property Details
              </v-card-title>
              <v-card-text>
                <v-row>
                  <v-col cols="12" sm="6" class="grid-item">
                    <div class="field-label">Name of Project</div>
                    <div class="field-value">{{ property.projectName }}</div>
                  </v-col>
                  <v-col cols="12" sm="6" class="grid-item">
                    <div class="field-label">No. of Storey/s</div>
                    <div class="field-value">{{ property.noOfStoreys }}</div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6" class="grid-item">
                    <div class="field-label">Project Location</div>
                    <div class="field-value">{{ property.projectLocation }}</div>
                  </v-col>
                  <v-col cols="12" sm="6" class="grid-item">
                    <div class="field-label">No. of Units</div>
                    <div class="field-value">{{ property.noOfUnits }}</div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6" class="grid-item">
                    <div class="field-label">Use/Character of Occupancy</div>
                    <div class="field-value">{{ property.buildingUse }}</div>
                  </v-col>
                  <v-col cols="12" sm="6" class="grid-item">
                    <div class="field-label">Total Gross Floor Area</div>
                    <div class="field-value">{{ property.totalGrossFloorArea }}</div>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from "vue";

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
const logOut = () => {
  console.log("Log Out clicked. User should be logged out.");
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

/* Page Layout */
.page-container {
  max-width: 1460px;
  margin: 16px auto 0;
  padding: 0 12px;
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
