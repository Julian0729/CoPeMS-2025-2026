<template>
  <v-app>
    <v-app-bar flat color="#0000CC" dark height="88" app class="elevation-4">
      <v-container
        fluid
        class="d-flex align-center justify-space-between py-0"
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
            <div
              style="
                font-size: 12px;
                font-weight: 400;
                color: white;
                line-height: 1.2;
              "
            >
              REPUBLIC OF THE PHILIPPINES
            </div>
            <div
              style="
                font-size: 15px;
                font-weight: 700;
                color: white;
                line-height: 1.2;
              "
            >
              CITY GOVERNMENT OF NAGA
            </div>
          </div>
        </div>
      </v-container>
    </v-app-bar>

    <v-main
      style="
        background-color: #f5f6fa;
        padding-top: 88px;
        display: flex;
        flex-direction: column;
        overflow: hidden;
      "
    >
      <div
        :style="s.topToolbar"
        style="flex-shrink: 0; position: sticky; top: 0; z-index: 10"
      >
        <div class="left d-flex align-center">
          <v-icon color="#3b82f6" class="mr-2">mdi-office-building</v-icon>
          <h3 class="mb-0 font-weight-bold" :style="s.textToolbar">
            Building Permit Application
          </h3>
        </div>
        <div class="right d-flex align-center">
          <v-menu
            :close-on-content-click="true"
            location="bottom end"
            offset="10"
            transition="slide-y-transition"
          >
            <template #activator="{ props }">
              <v-btn variant="text" :style="s.profileBtn" v-bind="props">
                <v-avatar size="32" class="mx-2">
                  <v-img
                    :alt="mockEvaluatorProfile.name"
                    :src="mockEvaluatorProfile.avatar"
                    cover
                  />
                </v-avatar>
                <div class="d-flex flex-column text-left">
                  <span
                    class="text-caption font-weight-bold"
                    style="color: #555; white-space: nowrap"
                    >{{ mockEvaluatorProfile.name }}</span
                  >
                  <span
                    class="text-caption font-weight-medium"
                    style="color: #888; white-space: nowrap"
                    >{{ mockEvaluatorProfile.title }}</span
                  >
                </div>
                <v-icon class="ml-1" size="small" color="#888"
                  >mdi-chevron-down</v-icon
                >
              </v-btn>
            </template>

            <v-card min-width="250" class="mt-1 rounded-lg elevation-3">
              <div class="px-4 py-3">
                <div
                  class="text-subtitle-1 font-weight-bold text-black"
                  style="line-height: 1.2"
                >
                  {{ mockEvaluatorProfile.name }}
                </div>
                <div class="text-caption text-medium-emphasis">
                  {{ mockEvaluatorProfile.department }}
                </div>
              </div>

              <v-divider></v-divider>

              <v-list density="compact" nav class="pa-2">
                <v-list-item to="/profile" link rounded="lg" class="mb-1">
                  <template #prepend>
                    <v-icon class="me-3">mdi-account-outline</v-icon>
                  </template>
                  <v-list-item-title>My Profile</v-list-item-title>
                </v-list-item>
                <v-list-item
                  link
                  @click="logout"
                  class="text-red-darken-1"
                  rounded="lg"
                >
                  <template #prepend>
                    <v-icon class="me-3" color="red-darken-1"
                      >mdi-logout</v-icon
                    >
                  </template>
                  <v-list-item-title>Log Out</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-card>
          </v-menu>
        </div>
      </div>

      <div
        class="d-flex flex-wrap pa-6 flex-grow-1"
        style="min-height: 0; overflow: hidden; gap: 20px"
      >
        <div
          class="d-flex flex-column"
          style="flex: 2; min-width: 350px; flex-shrink: 0"
        >
          <v-card
            elevation="2"
            class="rounded-lg mb-5"
            v-if="selectedApplicant.id"
          >
            <div class="pa-4">
              <div class="d-flex align-center mb-3">
                <v-icon class="me-3" color="blue"
                  >mdi-account-details-outline</v-icon
                >
                <div class="text-h6 font-weight-bold">
                  Applicant Information
                </div>
              </div>
              <v-divider class="mb-4"></v-divider>
              <v-row dense>
                <v-col cols="12" sm="6" class="mb-2">
                  <div class="text-caption text-grey-darken-1">
                    Applicant Name:
                  </div>
                  <div class="text-subtitle-2 font-weight-medium text-black">
                    {{ selectedApplicant.applicantName }}
                  </div>
                </v-col>
                <v-col cols="12" sm="6" class="mb-2">
                  <div class="text-caption text-grey-darken-1">
                    Project Name:
                  </div>
                  <div class="text-subtitle-2 font-weight-medium text-black">
                    {{ selectedApplicant.projectName }}
                  </div>
                </v-col>
                <v-col cols="12">
                  <div class="text-caption text-grey-darken-1">
                    Project Location:
                  </div>
                  <div class="text-subtitle-2 font-weight-medium text-black">
                    {{ selectedApplicant.projectLocation }}
                  </div>
                </v-col>
              </v-row>
            </div>
          </v-card>

          <v-card
            elevation="2"
            class="rounded-lg mb-5"
            v-if="selectedApplicant.id"
          >
            <div class="pa-4">
              <div class="d-flex align-center mb-3">
                <v-icon class="me-3" color="blue">mdi-home-city-outline</v-icon>
                <div class="text-h6 font-weight-bold">Property Details</div>
              </div>
              <v-divider class="mb-4"></v-divider>
              <v-row dense>
                <v-col cols="12" sm="6" class="mb-2">
                  <div class="text-caption text-grey-darken-1">
                    Property Type:
                  </div>
                  <div class="text-subtitle-2 font-weight-medium text-black">
                    {{ selectedApplicant.propertyDetails.propertyType }}
                  </div>
                </v-col>
                <v-col cols="12" sm="6" class="mb-2">
                  <div class="text-caption text-grey-darken-1">
                    Building Use:
                  </div>
                  <div class="text-subtitle-2 font-weight-medium text-black">
                    {{ selectedApplicant.propertyDetails.buildingUse }}
                  </div>
                </v-col>
                <v-col cols="12" sm="6" class="mb-2">
                  <div class="text-caption text-grey-darken-1">Floor Area:</div>
                  <div class="text-subtitle-2 font-weight-medium text-black">
                    {{ selectedApplicant.propertyDetails.floorArea }}
                  </div>
                </v-col>
                <v-col cols="12" sm="6" class="mb-2">
                  <div class="text-caption text-grey-darken-1">
                    Number of Floors:
                  </div>
                  <div class="text-subtitle-2 font-weight-medium text-black">
                    {{ selectedApplicant.propertyDetails.numberOfFloors }}
                  </div>
                </v-col>
                <v-col cols="12" sm="6" class="mb-2">
                  <div class="text-caption text-grey-darken-1">Lot Area:</div>
                  <div class="text-subtitle-2 font-weight-medium text-black">
                    {{ selectedApplicant.propertyDetails.lotArea }}
                  </div>
                </v-col>
                <v-col cols="12" sm="6" class="mb-2">
                  <div class="text-caption text-grey-darken-1">
                    Property Address:
                  </div>
                  <div class="text-subtitle-2 font-weight-medium text-black">
                    {{ selectedApplicant.propertyDetails.propertyAddress }}
                  </div>
                </v-col>
              </v-row>
            </div>
          </v-card>

          <v-card elevation="2" class="rounded-lg" v-if="selectedApplicant.id">
            <div class="pa-4">
              <div class="d-flex align-center mb-3">
                <v-icon class="me-3" color="blue"
                  >mdi-file-download-outline</v-icon
                >
                <div class="text-h6 font-weight-bold">Submitted Documents</div>
              </div>
              <v-divider class="mb-4"></v-divider>
              <v-list class="pa-0">
                <v-list-item
                  v-for="(plan, index) in selectedApplicant.documents
                    .surveyPlans"
                  :key="index"
                  class="rounded-lg mb-2 document-item"
                  lines="two"
                  color="blue"
                >
                  <template v-slot:prepend>
                    <v-icon color="red-darken-1" size="24"
                      >mdi-file-pdf-box</v-icon
                    >
                  </template>
                  <v-list-item-title class="font-weight-medium text-body-1">
                    {{ plan.name }}
                    <v-chip
                      size="x-small"
                      label
                      class="ml-2 text-uppercase font-weight-bold"
                      color="blue-grey-lighten-4"
                      >{{ plan.planType }}</v-chip
                    >
                  </v-list-item-title>
                  <v-list-item-subtitle class="text-caption">
                    {{ plan.description }} - {{ plan.size }} MB
                  </v-list-item-subtitle>

                  <template v-slot:append>
                    <v-btn
                      color="blue"
                      variant="outlined"
                      size="small"
                      class="text-none"
                      @click="goToEvaluationPage(plan)"
                      >Evaluate</v-btn
                    >
                  </template>
                </v-list-item>
              </v-list>
            </div>
          </v-card>

          <div class="overflow-y-auto" style="flex-grow: 1; min-height: 0">
            <!-- This is a placeholder for scrollable content if needed -->
          </div>
        </div>

        <div
          class="d-flex flex-column overflow-y-auto"
          style="flex: 1; min-width: 300px; min-height: 0"
        >
          <v-card
            elevation="2"
            class="rounded-lg mb-5"
            v-if="selectedApplicant.id"
          >
            <div class="pa-4">
              <div class="d-flex align-center mb-3">
                <v-icon class="me-3" color="blue">mdi-text-box-outline</v-icon>
                <div class="text-h6 font-weight-bold">Application Summary</div>
              </div>
              <v-divider class="mb-4"></v-divider>
              <v-row dense>
                <v-col cols="12" class="mb-2">
                  <div class="text-caption text-grey-darken-1">
                    Application Number
                  </div>
                  <div class="text-subtitle-2 font-weight-medium text-black">
                    {{ selectedApplicant.applicationId }}
                  </div>
                </v-col>
                <v-col cols="12" class="mb-2">
                  <div class="text-caption text-grey-darken-1">Type</div>
                  <div class="text-subtitle-2 font-weight-medium text-black">
                    {{ selectedApplicant.type }}
                  </div>
                </v-col>
                <v-col cols="12" class="mb-2">
                  <div class="text-caption text-grey-darken-1">
                    Processing Fee
                  </div>
                  <div class="text-subtitle-2 font-weight-medium text-black">
                    {{ selectedApplicant.processingFee }}
                  </div>
                </v-col>
                <v-col cols="12">
                  <div class="text-caption text-grey-darken-1 mb-1">
                    Payment Status
                  </div>
                  <v-chip
                    :color="selectedApplicant.paymentStatusColor"
                    size="small"
                    variant="flat"
                    label
                    class="font-weight-bold"
                    >{{ selectedApplicant.paymentStatus }}</v-chip
                  >
                </v-col>
              </v-row>
              <div class="text-caption mt-4 text-grey-darken-2">
                <strong class="font-weight-bold">Note:</strong> Payment will be
                processed after plan evaluation is complete.
              </div>
            </div>
          </v-card>

          <v-card elevation="2" class="rounded-lg" v-if="selectedApplicant.id">
            <div class="pa-4">
              <div class="d-flex align-center mb-3">
                <v-icon class="me-3" color="blue">mdi-list-box-outline</v-icon>
                <div class="text-h6 font-weight-bold">Application Timeline</div>
              </div>
              <v-divider class="mb-4"></v-divider>
              <v-timeline side="end" align="start" density="compact">
                <v-timeline-item
                  v-for="(event, index) in selectedApplicant.timeline"
                  :key="index"
                  :dot-color="event.color"
                  size="small"
                  :fill-dot="event.filled"
                  class="pb-0"
                >
                  <div class="text-body-2 font-weight-bold text-black">
                    {{ event.title }}
                  </div>
                  <div class="text-caption text-grey-darken-1">
                    {{ event.date }}
                  </div>
                </v-timeline-item>
              </v-timeline>
            </div>
          </v-card>
        </div>

        <v-card
          v-if="!selectedApplicant.id"
          class="ma-6 pa-6 text-center text-h6 text-grey-darken-1 w-100 align-self-center"
        >
          Select an application from the table to view its details and begin
          evaluation.
        </v-card>
      </div>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

const mockEvaluatorProfile = ref({
  name: "Julian Lumanta",
  title: "Architect",
  department: "Architectural",
  avatar: "https://cdn.vuetifyjs.com/images/john.jpg",
});

const s = {
  topToolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 24px",
    background: "#fff",
    borderBottom: "1px solid #e8eaf0",
    flexShrink: 0,
  },
  textToolbar: {
    color: "#111827",
  },
  profileBtn: {
    backgroundColor: "transparent",
    boxShadow: "none",
    padding: "0",
    minWidth: "unset",
  },
};

const applicantsDetailed = ref([
  {
    id: 1,
    applicantName: "Jim Deguzman",
    initials: "JD",
    status: "Verified",
    applicationNumber: "BP-2024-808123-T",
    applicationId: "BP-2024-000123-T",
    projectName: "Commercial Building",
    projectLocation: "San Felipe, Deca II Naga City",
    propertyDetails: {
      propertyType: "Commercial Building",
      buildingUse: "Retail Store",
      floorArea: "230 sq m",
      numberOfFloors: "2 Floors",
      propertyAddress: "456 Commercial Avenue, San Felipe, Deca I Naga City",
      lotArea: "350 sq m",
    },
    documents: {
      surveyPlans: [
        {
          name: "Architectural Plan ",
          description: "Floor plan and elevations",
          size: 2.5,
          planType: "Architectural",
        },
      ],
    },
    type: "Building Permit",
    processingFee: "₱2,500.00",
    paymentStatus: "Pending Plan Evaluation",
    paymentStatusColor: "#FBF46D",
    timeline: [
      {
        title: "Application Submitted",
        date: "Jan 16, 2024 - 10:30 AM",
        color: "#B4FE98",
        filled: true,
      },
      {
        title: "Under Architectural Review",
        date: "Jan 17, 2024 - 9:00 AM",
        color: "#FBF46D",
        filled: true,
      },
      {
        title: "Payment Processing",
        date: "Pending",
        color: "grey",
        filled: false,
      },
    ],
  },
  {
    id: 2,
    applicantName: "Sarah Geronimo",
    initials: "SG",
    status: "Pending",
    applicationNumber: "BP-2024-808234-T",
    applicationId: "BP-2024-000234-T",
    projectName: "Residential Building",
    projectLocation: "Abucay, Naga City",
    propertyDetails: {
      propertyType: "Residential Building",
      buildingUse: "Apartment",
      floorArea: "450 sq m",
      numberOfFloors: "5 Floors",
      propertyAddress: "123 Abucay Street, Abucay, Naga City",
      lotArea: "600 sq m",
    },
    documents: {
      surveyPlans: [
        {
          name: "Architectural Plan ",
          description: "Floor plan and elevations",
          size: 3.2,
          planType: "Architectural",
        },
      ],
    },
    type: "Building Permit",
    processingFee: "₱3,500.00",
    paymentStatus: "Pending Payment",
    paymentStatusColor: "#FBF46D",
    timeline: [
      {
        title: "Application Submitted",
        date: "Jan 16, 2024 - 2:15 PM",
        color: "#B4FE98",
        filled: true,
      },
      {
        title: "Under Architectural Review",
        date: "Jan 18, 2024 - 10:00 AM",
        color: "#FBF46D",
        filled: true,
      },
      {
        title: "Payment Processing",
        date: "Pending",
        color: "grey",
        filled: false,
      },
    ],
  },
  {
    id: 3,
    applicantName: "Michael Padilla",
    initials: "MP",
    status: "Return",
    applicationNumber: "BP-2024-808345-T",
    applicationId: "BP-2024-000345-T",
    projectName: "Mixed-Use Building",
    projectLocation: "Tinago, Naga City",
    propertyDetails: {
      propertyType: "Mixed-Use Building",
      buildingUse: "Commercial/Residential",
      floorArea: "800 sq m",
      numberOfFloors: "8 Floors",
      propertyAddress: "789 Tinago Avenue, Tinago, Naga City",
      lotArea: "1000 sq m",
    },
    documents: {
      surveyPlans: [
        {
          name: "Architectural Plan ",
          description: "Floor plan and elevations",
          size: 4.1,
          planType: "Architectural",
        },
      ],
    },
    type: "Building Permit",
    processingFee: "₱4,500.00",
    paymentStatus: "Returned for Revision",
    paymentStatusColor: "#FF6B6B",
    timeline: [
      {
        title: "Application Submitted",
        date: "Jan 14, 2024 - 9:00 AM",
        color: "#B4FE98",
        filled: true,
      },
      {
        title: "Under Review",
        date: "Jan 15, 2024 - 11:00 AM",
        color: "#FBF46D",
        filled: true,
      },
      {
        title: "Returned for Revision",
        date: "Jan 19, 2024 - 3:30 PM",
        color: "#FF6B6B",
        filled: true,
      },
    ],
  },
  {
    id: 4,
    applicantName: "David Tolo",
    initials: "DT",
    status: "Pending",
    applicationNumber: "BP-2024-808678-T",
    applicationId: "BP-2024-000678-T",
    projectName: "Structural Addition",
    projectLocation: "West Poblacion, Naga City",
    propertyDetails: {
      propertyType: "Structural Addition",
      buildingUse: "Industrial Warehouse",
      floorArea: "1200 sq m",
      numberOfFloors: "3 Floors",
      propertyAddress: "321 West Poblacion Road, Naga City",
      lotArea: "1500 sq m",
    },
    documents: {
      surveyPlans: [
        {
          name: "Structural Plan ",
          description: "Structural design and specifications",
          size: 5.3,
          planType: "Structural",
        },
      ],
    },
    type: "Building Permit",
    processingFee: "₱5,000.00",
    paymentStatus: "Pending Structural Review",
    paymentStatusColor: "#FBF46D",
    timeline: [
      {
        title: "Application Submitted",
        date: "Jan 20, 2024 - 8:00 AM",
        color: "#B4FE98",
        filled: true,
      },
      {
        title: "Under Structural Review",
        date: "Jan 21, 2024 - 9:00 AM",
        color: "#FBF46D",
        filled: true,
      },
      {
        title: "Awaiting Evaluation",
        date: "Pending",
        color: "grey",
        filled: false,
      },
    ],
  },
]);

const selectedApplicant = computed(() => {
  const applicationNumber = route.query.applicationNumber;
  if (applicationNumber) {
    const found = applicantsDetailed.value.find(
      (app) => app.applicationNumber === applicationNumber
    );
    return found || {};
  }
  return {};
});

const logout = () => {
  console.log("User clicked logout");
  router.push("/login");
};

const goToEvaluationPage = (plan) => {
  console.log(`Navigating to evaluation for: ${plan.name}`);
  router.push({
    name: "PlanEvaluationAssessment",
    query: {
      applicationData: JSON.stringify(selectedApplicant.value),
      planType: plan.planType,
      planName: plan.name,
    },
  });
};
</script>

<style scoped>
.document-item {
  transition: all 0.2s ease;
  cursor: pointer;
}

.document-item:hover {
  background-color: #f0f0f0;
}
</style>