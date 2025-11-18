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
    <v-main class="bg-grey-lighten-3">
      <v-card
        flat
        class="d-flex align-center justify-space-between px-6 py-3"
        style="background-color: white; border-bottom: 1px solid lightgrey"
      >
        <div class="d-flex align-center">
          <v-icon color="blue" class="mr-3" size="24"
            >mdi-office-building</v-icon
          >
          <h2 class="mb-0 text-h6 font-weight-bold">
            Building Permit Application
          </h2>
        </div>

        <div class="d-flex align-center">
          <v-menu location="bottom end">
            <template v-slot:activator="{ props }">
              <v-btn v-bind="props" text class="profile-btn pa-2 rounded-lg">
                <v-avatar size="36" class="mx-2">
                  <v-img
                    alt="Architect"
                    :src="mockEvaluatorProfile.avatar"
                  ></v-img>
                </v-avatar>
                <div class="d-flex flex-column text-left">
                  <span
                    class="text-body-2 font-weight-bold"
                    style="color: #555; white-space: nowrap"
                  >
                    {{ mockEvaluatorProfile.name }}
                  </span>
                  <span
                    class="text-caption font-weight-medium"
                    style="color: #888; white-space: nowrap"
                  >
                    {{ mockEvaluatorProfile.title }}
                  </span>
                </div>
              </v-btn>
            </template>

            <v-card min-width="230" class="rounded-lg elevation-2">
              <v-list dense class="py-0">
                <v-list-item class="pa-3">
                  <template v-slot:prepend>
                    <v-avatar size="40">
                      <v-img
                        :src="mockEvaluatorProfile.avatar"
                        alt="User Avatar"
                      ></v-img>
                    </v-avatar>
                  </template>
                  <v-list-item-title
                    class="font-weight-bold"
                    style="line-height: 1.2rem"
                  >
                    {{ mockEvaluatorProfile.name }}
                  </v-list-item-title>
                  <v-list-item-subtitle style="line-height: 1rem">
                    {{ mockEvaluatorProfile.title }}
                  </v-list-item-subtitle>
                </v-list-item>

                <v-list-item link @click="goToUserProfile" class="mt-1">
                  <template v-slot:prepend>
                    <v-icon>mdi-account-outline</v-icon>
                  </template>
                  <v-list-item-title>Profile</v-list-item-title>
                </v-list-item>

                <v-list-item link @click="logout">
                  <template v-slot:prepend>
                    <v-icon>mdi-logout</v-icon>
                  </template>
                  <v-list-item-title>Logout</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-card>
          </v-menu>
        </div>
      </v-card>

      <div class="d-flex flex-grow-1 pa-6">
        <div class="d-flex flex-column" style="flex: 2; gap: 20px">
          <v-card elevation="2" class="rounded-lg" v-if="selectedApplicant.id">
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
                <v-col cols="12" sm="6">
                  <div class="text-caption text-grey-darken-1">
                    Applicant Name:
                  </div>
                  <div class="text-subtitle-2 font-weight-medium text-black">
                    {{ selectedApplicant.applicantName }}
                  </div>
                </v-col>
                <v-col cols="12" sm="6">
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

          <v-card elevation="2" class="rounded-lg" v-if="selectedApplicant.id">
            <div class="pa-4">
              <div class="d-flex align-center mb-3">
                <v-icon class="me-3" color="blue">mdi-home-city-outline</v-icon>
                <div class="text-h6 font-weight-bold">Property Details</div>
              </div>
              <v-divider class="mb-4"></v-divider>
              <v-row dense>
                <v-col cols="12" sm="6">
                  <div class="text-caption text-grey-darken-1">
                    Property Type:
                  </div>
                  <div class="text-subtitle-2 font-weight-medium text-black">
                    {{ selectedApplicant.propertyDetails.propertyType }}
                  </div>
                </v-col>
                <v-col cols="12" sm="6">
                  <div class="text-caption text-grey-darken-1">
                    Building Use:
                  </div>
                  <div class="text-subtitle-2 font-weight-medium text-black">
                    {{ selectedApplicant.propertyDetails.buildingUse }}
                  </div>
                </v-col>
                <v-col cols="12" sm="6">
                  <div class="text-caption text-grey-darken-1">Floor Area:</div>
                  <div class="text-subtitle-2 font-weight-medium text-black">
                    {{ selectedApplicant.propertyDetails.floorArea }}
                  </div>
                </v-col>
                <v-col cols="12" sm="6">
                  <div class="text-caption text-grey-darken-1">
                    Number of Floors:
                  </div>
                  <div class="text-subtitle-2 font-weight-medium text-black">
                    {{ selectedApplicant.propertyDetails.numberOfFloors }}
                  </div>
                </v-col>
                <v-col cols="12" sm="6">
                  <div class="text-caption text-grey-darken-1">Lot Area:</div>
                  <div class="text-subtitle-2 font-weight-medium text-black">
                    {{ selectedApplicant.propertyDetails.lotArea }}
                  </div>
                </v-col>
                <v-col cols="12" sm="6">
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
                      to="/adminlayout/evaluationplan"
                      @click="goToEvaluationPage(plan)"
                      >Evaluate</v-btn
                    >
                  </template>
                </v-list-item>
              </v-list>
            </div>
          </v-card>
        </div>

        <div
          class="d-flex flex-column"
          style="flex: 1; margin-left: 20px; gap: 20px"
        >
          <v-card elevation="2" class="rounded-lg" v-if="selectedApplicant.id">
            <div class="pa-4">
              <div class="d-flex align-center mb-3">
                <v-icon class="me-3" color="blue">mdi-text-box-outline</v-icon>
                <div class="text-h6 font-weight-bold">Application Summary</div>
              </div>
              <v-divider class="mb-4"></v-divider>
              <v-row dense>
                <v-col cols="12">
                  <div class="text-caption text-grey-darken-1">
                    Application Number
                  </div>
                  <div class="text-subtitle-2 font-weight-medium text-black">
                    {{ selectedApplicant.applicationId }}
                  </div>
                </v-col>
                <v-col cols="12">
                  <div class="text-caption text-grey-darken-1">Type</div>
                  <div class="text-subtitle-2 font-weight-medium text-black">
                    {{ selectedApplicant.type }}
                  </div>
                </v-col>
                <v-col cols="12">
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
      </div>

      <v-card
        v-if="!selectedApplicant.id"
        class="ma-6 pa-6 text-center text-h6 text-grey-darken-1"
      >
        Select an application from the table to view its details and begin
        evaluation.
      </v-card>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

const search = ref("");
const activeFilter = ref("All");
const loading = ref(false);

const router = useRouter();

const mockEvaluatorProfile = ref({
  name: "Zoe Lumanta",
  title: "Architect",
  avatar: "https://cdn.vuetifyjs.com/images/john.jpg",
});

const applicantsDetailed = ref([
  {
    id: 1,
    applicantName: "Jim Deguzman",
    initials: "JD",
    status: "Pending",
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
    applicantName: "David Tolo",
    initials: "DT",
    status: "Verified",
    applicationId: "BP-2024-000567-T",
    projectName: "Residential House",
    projectLocation: "Magarao, Camarines Sur",
    propertyDetails: {
      propertyType: "Residential House",
      buildingUse: "Single-family Home",
      floorArea: "150 sq m",
      numberOfFloors: "1 Floor",
      propertyAddress: "789 Pine Street, Magarao, Camarines Sur",
      lotArea: "250 sq m",
    },
    documents: {
      surveyPlans: [
        {
          name: "Architectural Plan - Full Set",
          description: "Complete drawings",
          size: 2.1,
          planType: "Architectural",
        },
      ],
    },
    type: "Building Permit",
    processingFee: "₱1,800.00",
    paymentStatus: "Approved - Fee Due",
    paymentStatusColor: "green",
    timeline: [
      {
        title: "Application Submitted",
        date: "Jan 10, 2024 - 9:00 AM",
        color: "#B4FE98",
        filled: true,
      },
      {
        title: "Architectural Review Completed",
        date: "Jan 11, 2024 - 2:00 PM",
        color: "#B4FE98",
        filled: true,
      },
      {
        title: "Payment Processing",
        date: "Jan 12, 2024 - 10:00 AM",
        color: "#FBF46D",
        filled: true,
      },
    ],
  },
  {
    id: 3,
    applicantName: "Jennifer Nayda",
    initials: "JN",
    status: "Return",
    applicationId: "BP-2024-000910-T",
    projectName: "Office Renovation",
    projectLocation: "Penafrancia Ave, Naga City",
    propertyDetails: {
      propertyType: "Office",
      buildingUse: "Office Space",
      floorArea: "500 sq m",
      numberOfFloors: "5th Floor",
      propertyAddress: "123 Business Center, Penafrancia Ave, Naga City",
      lotArea: "1000 sq m",
    },
    documents: {
      surveyPlans: [
        {
          name: "Architectural Layout",
          description: "Floor plan only, missing elevations",
          size: 5.0,
          planType: "Architectural",
        },
      ],
    },
    type: "Building Permit",
    processingFee: "₱5,000.00",
    paymentStatus: "Revision Required",
    paymentStatusColor: "red",
    timeline: [
      {
        title: "Application Submitted",
        date: "Jan 20, 2024 - 1:00 PM",
        color: "#B4FE98",
        filled: true,
      },
      {
        title: "Returned for Architectural Corrections",
        date: "Jan 22, 2024 - 9:00 AM",
        color: "red",
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
]);

const selectedApplicant = ref(applicantsDetailed.value[0]);

const goToUserProfile = () => {
  router.push("/userprofile");
};

const logout = () => {
  console.log("User clicked logout");

  router.push("/login");
};

function onClick() {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 2000);
}

const viewDetails = (applicant) => {
  const detailedData = applicantsDetailed.value.find(
    (a) => a.applicationId === applicant.applicationId
  );

  if (detailedData) {
    selectedApplicant.value = detailedData;
  } else {
    selectedApplicant.value = {};
    console.error("Detailed applicant data not found.");
  }
};

const goToEvaluationPage = (plan) => {
  console.log(`Navigating to evaluation for: ${plan.name}`);
  router.push("/adminlayout/evaluationplan");
};
</script>

<style scoped>
.profile-btn {
  background-color: transparent !important;
  box-shadow: none !important;
  padding: 0 !important;
  min-width: unset !important;
  transition: background-color 0.2s ease;
  border: 1px solid transparent;
}

.profile-btn:hover {
  background-color: rgba(0, 0, 0, 0.05) !important;
}

.document-item {
  transition: all 0.2s ease;
  cursor: pointer;
}

.document-item:hover {
  background-color: #f0f0f0;
}

.nav-links .v-btn {
  text-transform: none !important;
  font-weight: 600;
  font-size: 16px;
}
</style>