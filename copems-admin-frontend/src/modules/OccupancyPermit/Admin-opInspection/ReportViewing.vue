<template>
  <v-app>
    <v-app-bar flat color="#0000CC" dark height="88" app class="elevation-4">
      <v-container fluid class="d-flex align-center py-0" style="max-width: 100%">
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
            <div
              style="font-size: 12px; font-weight: 400; color: white; line-height: 1.2"
            >
              REPUBLIC OF THE PHILIPPINES
            </div>
            <div
              style="font-size: 15px; font-weight: 700; color: white; line-height: 1.2"
            >
              CITY GOVERNMENT OF NAGA
            </div>
          </div>
        </div>
      </v-container>
    </v-app-bar>
    <v-main style="background-color: #f5f6fa; padding-top: 88px">
      <div :style="s.heroBanner"></div>
      <div :style="s.topToolbar">
        <div class="left d-flex align-center">
          <v-icon color="#3b82f6" class="mr-2">mdi-home-city</v-icon>
          <h3 class="mb-0 font-weight-bold" :style="s.textToolbar">
            Occupancy Permit Application
          </h3>
        </div>
        <div class="right d-flex align-center">
          <v-menu :close-on-content-click="true" location="bottom end">
            <template #activator="{ props }">
              <v-btn variant="text" :style="s.profileBtn" v-bind="props">
                <v-avatar size="32" class="mx-2">
                  <v-img
                    alt="Jacque"
                    src="https://png.pngtree.com/png-clipart/20241018/original/pngtree-construction-worker-back-view-with-yellow-hard-hat-clipart-illustration-png-image_16380171.png"
                  />
                </v-avatar>
                <div class="d-flex flex-column text-left">
                  <span
                    class="text-caption font-weight-bold"
                    style="color: #555; white-space: nowrap"
                    >Inspection Chief</span
                  >
                  <span
                    class="text-caption font-weight-medium"
                    style="color: #888; white-space: nowrap"
                    >Inspector</span
                  >
                </div>
                <v-icon class="ml-1" size="small">mdi-chevron-down</v-icon>
              </v-btn>
            </template>
            <v-card min-width="250" class="mt-1">
              <v-list density="compact" nav>
                <v-list-item>
                  <v-list-item-title class="font-weight-bold">
                    Lea Bernice
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    lea.bernice@nagacity.gov.ph
                  </v-list-item-subtitle>
                </v-list-item>
                <v-divider class="my-1"></v-divider>
                <v-list-item to="/profile" link>
                  <template #prepend>
                    <v-icon>mdi-account-outline</v-icon>
                  </template>
                  <v-list-item-title>My Profile</v-list-item-title>
                </v-list-item>
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
      </div>

      <div :style="s.pageContainer">
        <v-row>
          <v-col cols="12" md="7">
            <v-card class="mb-4 elevation-1" :style="s.detailCard">
              <v-card-title :style="s.cardTitle">
                <v-icon class="mr-2" color="#3b82f6" size="20"
                  >mdi-account-details-outline</v-icon
                >
                Applicant Information
              </v-card-title>
              <v-card-text>
                <v-row>
                  <v-col cols="12" sm="6" :style="s.gridItemMargin">
                    <div :style="s.label">Application Number</div>
                    <div :style="s.value">{{ applicant.applicationNumber }}</div>
                  </v-col>
                  <v-col cols="12" sm="6" :style="s.gridItemMargin">
                    <div :style="s.label">Type of Application</div>
                    <div :style="s.value">{{ applicant.typeOfApplication }}</div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6" :style="s.gridItemMargin">
                    <div :style="s.label">Applicant Name</div>
                    <div :style="s.value">{{ applicant.name }}</div>
                  </v-col>
                  <v-col cols="12" sm="6" :style="s.gridItemMargin">
                    <div :style="s.label">Contact No.</div>
                    <div :style="s.value">{{ applicant.contactNo }}</div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6">
                    <div :style="s.label">Address</div>
                    <div :style="s.value">{{ applicant.address }}</div>
                  </v-col>
                  <v-col cols="12" sm="6"></v-col>
                </v-row>
              </v-card-text>
            </v-card>

            <v-card class="mb-4 elevation-1" :style="s.detailCard">
              <v-card-title :style="s.cardTitle">
                <v-icon class="mr-2" color="#3b82f6" size="20"
                  >mdi-home-city-outline</v-icon
                >
                Property Details
              </v-card-title>
              <v-card-text>
                <v-row>
                  <v-col cols="12" sm="6" :style="s.gridItemMargin">
                    <div :style="s.label">Name of Project</div>
                    <div :style="s.value">{{ property.projectName }}</div>
                  </v-col>
                  <v-col cols="12" sm="6" :style="s.gridItemMargin">
                    <div :style="s.label">No. of Storey/s</div>
                    <div :style="s.value">{{ property.noOfStoreys }}</div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6" :style="s.gridItemMargin">
                    <div :style="s.label">Project Location</div>
                    <div :style="s.value">{{ property.projectLocation }}</div>
                  </v-col>
                  <v-col cols="12" sm="6" :style="s.gridItemMargin">
                    <div :style="s.label">No. of Units</div>
                    <div :style="s.value">{{ property.noOfUnits }}</div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6">
                    <div :style="s.label">Use/Character of Occupancy</div>
                    <div :style="s.value">{{ property.buildingUse }}</div>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <div :style="s.label">Total Gross Floor Area</div>
                    <div :style="s.value">{{ property.totalGrossFloorArea }}</div>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" md="5">
            <v-row class="ma-0 mb-4">
              <v-col cols="6" class="pa-1">
                <v-card :style="s.cleanDateCard" class="pa-4 elevation-1">
                  <div class="d-flex align-center mb-1">
                    <v-icon color="#3b82f6" size="20">mdi-calendar-month</v-icon>
                    <span class="text-caption font-weight-medium text-grey-darken-1 ml-2"
                      >Inspection Date</span
                    >
                  </div>
                  <p class="text-h6 font-weight-bold text-truncate">
                    {{ inspectionData.date }}
                  </p>
                </v-card>
              </v-col>
              <v-col cols="6" class="pa-1">
                <v-card :style="s.cleanDateCard" class="pa-4 elevation-1">
                  <div class="d-flex align-center mb-1">
                    <v-icon color="#3b82f6" size="20">mdi-clock-outline</v-icon>
                    <span class="text-caption font-weight-medium text-grey-darken-1 ml-2"
                      >Inspection Time</span
                    >
                  </div>
                  <p class="text-h6 font-weight-bold text-truncate">
                    {{ inspectionData.time }}
                  </p>
                </v-card>
              </v-col>
            </v-row>

            <v-card class="elevation-2" :style="s.enhancedChecklistCard">
              <v-card-title :style="s.cardTitleEnhanced">
                <v-icon class="mr-3" color="#3b82f6" size="22"
                  >mdi-file-document-outline</v-icon
                >
                <span class="font-weight-bold">Inspection Reports</span>
                <v-spacer></v-spacer>
                <v-chip size="small" color="#10b981" label class="font-weight-bold">
                  {{ inspectionData.status }}
                </v-chip>
              </v-card-title>

              <v-window v-model="currentReportIndex" touchless>
                <v-window-item
                  v-for="(report, index) in inspectionData.reports"
                  :key="index"
                  :value="index"
                >
                  <v-card-text class="pt-4 pb-2 px-4">
                    <h4 :style="s.reportSectionTitleNoMargin">
                      {{ report.workType }}
                    </h4>
                    <p :style="s.inspectorInfo">
                      Assigned Inspector: **{{ report.inspector }}**
                    </p>

                    <div
                      v-for="(item, itemIndex) in report.items"
                      :key="itemIndex"
                      class="mb-4"
                    >
                      <p :style="s.reportItemTitle">{{ item.title }}</p>
                      <p :style="s.reportItemDetail">{{ item.detail }}</p>
                    </div>

                    <div v-if="report.comments" class="mt-8">
                      <h4 :style="s.reportSectionTitle">Comments/Recommendations</h4>
                      <p :style="s.reportItemDetail">{{ report.comments }}</p>
                    </div>
                  </v-card-text>
                </v-window-item>
              </v-window>

              <v-divider></v-divider>

              <v-card-actions class="px-4 py-3 d-flex justify-space-between align-center">
                <v-btn
                  variant="text"
                  color="#6b7280"
                  :disabled="currentReportIndex === 0"
                  @click="previousReport"
                >
                  <v-icon start>mdi-chevron-left</v-icon>
                  Previous
                </v-btn>

                <div class="text-caption font-weight-medium text-grey-darken-1">
                  {{ currentReportIndex + 1 }} of {{ inspectionData.reports.length }}
                </div>

                <v-btn
                  variant="flat"
                  color="#3b82f6"
                  :disabled="currentReportIndex === inspectionData.reports.length - 1"
                  @click="nextReport"
                  class="text-white"
                >
                  Next
                  <v-icon end>mdi-chevron-right</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const currentReportIndex = ref(0);

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

const s = {
  heroBanner: {},
  topToolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 24px",
    background: "#fff",
    borderBottom: "1px solid #e8eaf0",
  },
  textToolbar: { color: "#111827" },
  profileBtn: {
    backgroundColor: "transparent",
    boxShadow: "none",
    padding: 0,
    minWidth: "unset",
  },

  pageContainer: {
    maxWidth: "1260px",
    margin: "16px auto 0",
    padding: "0 12px",
  },
  detailCard: {
    borderRadius: "10px",
  },
  cardTitle: {
    fontSize: "14px",
    fontWeight: 500,
    color: "#1f2937",
    borderBottom: "1px solid #e5e7eb",
    padding: "10px 10px",
    display: "flex",
    alignItems: "center",
  },
  label: {
    fontSize: "12px",
    fontWeight: 500,
    color: "#6b7280",
    textTransform: "uppercase",
    marginTop: "12px",
    marginBottom: "7px",
  },
  value: {
    fontSize: "15px",
    fontWeight: 500,
    color: "#1f2937",
  },
  gridItemMargin: {
    marginBottom: "4px",
  },

  cleanDateCard: {
    backgroundColor: "#eff6ff",
    borderRadius: "12px",
  },
  enhancedChecklistCard: {
    borderRadius: "12px",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  },
  cardTitleEnhanced: {
    fontSize: "16px",
    fontWeight: 500,
    color: "#1f2937",
    padding: "16px 16px",
    borderBottom: "1px solid #e5e7eb",
    display: "flex",
    alignItems: "center",
    backgroundColor: "#f9fafb",
  },
  reportSectionTitleNoMargin: {
    fontSize: "16px",
    fontWeight: 700,
    color: "#1f2937",
    marginTop: "0",
    marginBottom: "8px",
    borderBottom: "1px solid #e5e7eb",
    paddingBottom: "5px",
  },
  reportSectionTitle: {
    fontSize: "16px",
    fontWeight: 700,
    color: "#1f2937",
    marginTop: "20px",
    marginBottom: "8px",
    borderBottom: "1px solid #e5e7eb",
    paddingBottom: "5px",
  },
  inspectorInfo: {
    fontSize: "13px",
    color: "#6b7280",
    marginBottom: "15px",
  },
  reportItemTitle: {
    fontSize: "14px",
    fontWeight: 600,
    color: "#374151",
    marginBottom: "3px",
  },
  reportItemDetail: {
    fontSize: "14px",
    color: "#4b5563",
    marginLeft: "10px",
    paddingLeft: "10px",
    borderLeft: "2px solid #d1d5db",
  },
};
</script>

<style scoped>
.v-card__text > .v-row {
  margin-top: 0;
  margin-bottom: 0;
}
.v-card__text .v-col {
  padding-top: 0;
  padding-bottom: 0;
}
p {
  margin-bottom: 0 !important;
}
.v-window-item {
  padding-top: 0;
}
</style>
