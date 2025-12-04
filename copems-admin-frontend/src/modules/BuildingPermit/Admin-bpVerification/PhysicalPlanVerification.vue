<template>
  <v-app class="bg-slate-50">
    <v-app-bar
      flat
      color="white"
      height="88"
      class="elevation-4 border-b"
      app
      style="position: fixed; top: 0; z-index: 1006"
    >
      <v-container
        fluid
        class="d-flex align-center py-0 h-100"
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
                color: Black;
                line-height: 1.2;
              "
            >
              REPUBLIC OF THE PHILIPPINES
            </div>
            <div
              style="
                font-size: 15px;
                font-weight: 700;
                color: Black;
                line-height: 1.2;
              "
            >
              CITY GOVERNMENT OF NAGA
            </div>
          </div>
        </div>

        <v-spacer></v-spacer>

        <div class="d-flex align-center">
          <v-menu location="bottom end">
            <template #activator="{ props }">
              <v-btn variant="text" :style="s.profileBtn" v-bind="props">
                <v-avatar size="32" class="mx-2">
                  <v-img
                    :alt="mockEvaluatorProfile.name"
                    :src="mockEvaluatorProfile.image"
                    cover
                  />
                </v-avatar>
                <div class="d-flex flex-column text-left">
                  <span
                    class="text-caption font-weight-bold"
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
                <v-icon class="ml-1" size="small">mdi-chevron-down</v-icon>
              </v-btn>
            </template>

            <v-card min-width="200" class="mt-1 border shadow-sm">
              <v-list density="compact" nav>
                <v-list-item>
                  <v-list-item-title class="font-weight-bold">
                    {{ mockEvaluatorProfile.name }}
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ mockEvaluatorProfile.specialty }}
                  </v-list-item-subtitle>
                </v-list-item>
                <v-divider class="my-1"></v-divider>
                <v-list-item link @click="logout" class="text-red-darken-1">
                  <template #prepend><v-icon>mdi-logout</v-icon></template>
                  <v-list-item-title>Log Out</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-card>
          </v-menu>
        </div>
      </v-container>
    </v-app-bar>

    <v-main class="bg-grey-lighten-5">
      <div class="page-container px-3 pb-8 mt-6">
        <div class="d-flex align-center mb-4 px-2">
          <v-icon color="#2563eb" class="mr-3" size="32"
            >mdi-office-building</v-icon
          >
          <h1 class="text-h4 font-weight-bold text-grey-darken-4">
            Building Permit Application
          </h1>
        </div>

        <v-card
          class="rounded-xl border-0 shadow-sm overflow-hidden"
          color="white"
          min-height="700"
        >
          <v-tabs
            v-model="activeTab"
            color="primary"
            bg-color="white"
            class="border-b px-6"
            height="60"
            slider-color="primary"
          >
            <v-tab
              value="application"
              class="text-body-2 font-weight-medium text-capitalize"
              rounded="t-lg"
            >
              <v-icon
                start
                icon="mdi-file-document-outline"
                class="mr-2"
              ></v-icon>
              Application Form
            </v-tab>
            <v-tab
              value="evaluation"
              class="text-body-2 font-weight-medium text-capitalize"
              rounded="t-lg"
            >
              <v-icon
                start
                icon="mdi-clipboard-check-outline"
                class="mr-2"
              ></v-icon>
              Evaluation Summary
            </v-tab>
            <v-tab
              value="plans"
              class="text-body-2 font-weight-medium text-capitalize"
              rounded="t-lg"
            >
              <v-icon start icon="mdi-file-check-outline" class="mr-2"></v-icon>
              PDF Plans
              <v-badge
                content="5"
                color="grey-lighten-2"
                text-color="grey-darken-3"
                inline
                class="ml-2"
              ></v-badge>
            </v-tab>
            <v-tab
              value="checklist"
              class="text-body-2 font-weight-medium text-capitalize"
              rounded="t-lg"
            >
              <v-icon start icon="mdi-format-list-checks" class="mr-2"></v-icon>
              Checklist
            </v-tab>
          </v-tabs>

          <div class="pa-6 pa-md-8 bg-white">
            <v-window v-model="activeTab">
              <v-window-item value="application">
                <v-card
                  class="rounded-lg bg-grey-lighten-5 border-dashed pa-4"
                  flat
                  height="600"
                >
                  <v-img
                    src="https://placehold.co/800x1000/png?text=Unified+Application+Form+Preview"
                    alt="Unified Application Form"
                    cover
                    class="rounded elevation-2 mx-auto"
                    max-width="800"
                    height="100%"
                  >
                    <template v-slot:placeholder>
                      <div
                        class="d-flex align-center justify-center fill-height"
                      >
                        <v-progress-circular
                          indeterminate
                          color="primary"
                        ></v-progress-circular>
                      </div>
                    </template>
                  </v-img>
                </v-card>
              </v-window-item>

              <v-window-item value="evaluation">
                <v-row>
                  <v-col cols="12" md="4">
                    <v-card
                      class="rounded-lg bg-grey-lighten-5 pa-6 sticky-card"
                      flat
                    >
                      <div class="text-overline text-grey-darken-1 mb-4">
                        Project Information
                      </div>
                      <div class="mb-5">
                        <div class="text-caption text-grey">Control Number</div>
                        <div
                          class="text-body-1 font-weight-bold text-grey-darken-4 font-monospace"
                        >
                          {{ evaluationData.application.controlNo }}
                        </div>
                      </div>
                      <v-divider class="my-4 border-dashed"></v-divider>
                      <div class="mb-4">
                        <div class="text-caption text-grey">Applicant</div>
                        <div
                          class="text-body-2 font-weight-medium text-grey-darken-3"
                        >
                          {{ evaluationData.application.applicantName }}
                        </div>
                      </div>
                      <div class="mb-4">
                        <div class="text-caption text-grey">Project Type</div>
                        <div
                          class="text-body-2 font-weight-medium text-grey-darken-3"
                        >
                          {{ evaluationData.application.projectName }}
                        </div>
                      </div>
                      <div class="mb-4">
                        <div class="text-caption text-grey">Location</div>
                        <div
                          class="text-body-2 font-weight-medium text-grey-darken-3"
                        >
                          {{ evaluationData.application.projectLocation }}
                        </div>
                      </div>
                      <div class="mb-0">
                        <div class="text-caption text-grey">Date Received</div>
                        <div
                          class="text-body-2 font-weight-medium text-grey-darken-3"
                        >
                          {{ evaluationData.application.dateReceived }}
                        </div>
                      </div>
                    </v-card>
                  </v-col>

                  <v-col cols="12" md="8">
                    <div class="d-flex flex-column gap-4">
                      <v-alert
                        border="start"
                        border-color="success"
                        color="green-lighten-5"
                        class="mb-4 rounded-lg"
                      >
                        <div class="d-flex justify-space-between align-center">
                          <div>
                            <div
                              class="text-caption text-success font-weight-bold text-uppercase mb-1"
                            >
                              Overall Status
                            </div>
                            <div
                              class="text-h6 font-weight-bold text-green-darken-4"
                            >
                              {{ evaluationData.recommendation.recommendation }}
                            </div>
                            <div class="text-caption text-green-darken-3 mt-1">
                              Signed by
                              {{
                                evaluationData.recommendation.buildingOfficial
                              }}
                              on
                              {{ evaluationData.recommendation.date }}
                            </div>
                          </div>
                          <v-icon color="success" size="40"
                            >mdi-check-decagram</v-icon
                          >
                        </div>
                      </v-alert>

                      <div
                        class="text-subtitle-1 font-weight-bold text-grey-darken-4 mb-2"
                      >
                        Department Evaluations
                      </div>

                      <v-card
                        v-for="(
                          evaluation, index
                        ) in evaluationData.evaluations"
                        :key="index"
                        class="rounded-lg border mb-3 transition-swing"
                        flat
                      >
                        <div class="pa-4">
                          <div
                            class="d-flex justify-space-between align-start mb-3"
                          >
                            <div class="d-flex align-center">
                              <v-avatar
                                color="blue-lighten-5"
                                rounded
                                size="40"
                                class="mr-3"
                              >
                                <v-icon color="blue-darken-2" size="20"
                                  >mdi-file-certificate-outline</v-icon
                                >
                              </v-avatar>
                              <div>
                                <div
                                  class="text-subtitle-2 font-weight-bold text-grey-darken-4"
                                >
                                  {{ evaluation.title }}
                                </div>
                                <div class="text-caption text-grey-darken-1">
                                  Evaluated by {{ evaluation.evaluator }}
                                </div>
                              </div>
                            </div>
                            <v-chip
                              size="small"
                              :color="
                                evaluation.status === 'approved'
                                  ? 'success'
                                  : 'warning'
                              "
                              variant="tonal"
                              class="font-weight-bold"
                            >
                              {{
                                evaluation.status === "approved"
                                  ? "Approved"
                                  : "Pending"
                              }}
                            </v-chip>
                          </div>
                          <div class="bg-grey-lighten-5 rounded pa-3">
                            <div
                              class="text-caption font-weight-bold text-grey-darken-2 mb-2"
                            >
                              Findings & Remarks:
                            </div>
                            <div
                              v-for="(finding, fIndex) in evaluation.findings"
                              :key="fIndex"
                              class="d-flex align-start gap-2 mb-1"
                            >
                              <v-icon
                                icon="mdi-check-circle-outline"
                                size="14"
                                color="green"
                                class="mt-1"
                              ></v-icon>
                              <span class="text-caption text-grey-darken-3">{{
                                finding
                              }}</span>
                            </div>
                          </div>
                        </div>
                      </v-card>
                    </div>
                  </v-col>
                </v-row>
              </v-window-item>

              <v-window-item value="plans">
                <v-row>
                  <v-col cols="12" md="4">
                    <div class="text-overline text-grey-darken-1 mb-2">
                      Available Documents
                    </div>
                    <v-list class="bg-transparent pa-0">
                      <v-list-item
                        v-for="(plan, index) in pdfPlans"
                        :key="index"
                        @click="togglePlan(index)"
                        rounded="lg"
                        :active="selectedPlan === index"
                        active-color="primary"
                        class="mb-2 border bg-white"
                        :elevation="selectedPlan === index ? 2 : 0"
                      >
                        <template #prepend>
                          <v-icon
                            :color="selectedPlan === index ? 'primary' : 'grey'"
                            >mdi-file-pdf-box</v-icon
                          >
                        </template>
                        <v-list-item-title
                          class="font-weight-medium text-body-2"
                        >
                          {{ plan.name }}
                        </v-list-item-title>
                        <v-list-item-subtitle class="text-caption">
                          {{ plan.date }}
                        </v-list-item-subtitle>
                        <template #append>
                          <v-chip
                            size="x-small"
                            color="success"
                            variant="tonal"
                            class="ml-2"
                            >Approved</v-chip
                          >
                        </template>
                      </v-list-item>
                    </v-list>
                  </v-col>

                  <v-col cols="12" md="8">
                    <v-fade-transition mode="out-in">
                      <div v-if="selectedPlan !== null" class="h-100">
                        <div
                          class="d-flex align-center justify-space-between mb-3"
                        >
                          <h3 class="text-subtitle-1 font-weight-bold">
                            {{ pdfPlans[selectedPlan].name }}
                          </h3>
                          <v-btn
                            size="small"
                            variant="text"
                            color="grey"
                            prepend-icon="mdi-download"
                            >Download</v-btn
                          >
                        </div>
                        <v-card
                          class="rounded-lg border overflow-hidden"
                          height="600"
                          flat
                        >
                          <iframe
                            :src="
                              pdfPlans[selectedPlan].pdfUrl +
                              '#toolbar=0&navpanes=0&scrollbar=1'
                            "
                            width="100%"
                            height="100%"
                            style="border: none"
                            title="Plan Viewer"
                          ></iframe>
                        </v-card>
                      </div>
                      <div
                        v-else
                        class="d-flex align-center justify-center h-100 rounded-lg border-dashed bg-grey-lighten-5"
                        style="min-height: 400px"
                      >
                        <div class="text-center">
                          <v-icon size="64" color="grey-lighten-2" class="mb-4"
                            >mdi-file-document-outline</v-icon
                          >
                          <div class="text-body-2 text-grey">
                            Select a plan from the list to preview
                          </div>
                        </div>
                      </div>
                    </v-fade-transition>
                  </v-col>
                </v-row>
              </v-window-item>

              <v-window-item value="checklist">
                <v-row justify="center">
                  <v-col cols="12" md="10">
                    <div class="mb-6 text-center">
                      <h3 class="text-h6 font-weight-bold text-grey-darken-3">
                        Documentary Requirements
                      </h3>
                      <p class="text-body-2 text-grey">
                        Building Permit Application
                      </p>
                    </div>

                    <div
                      v-for="(section, sIndex) in documentaryData.sections"
                      :key="sIndex"
                      class="mb-8"
                    >
                      <div class="d-flex align-center mb-4">
                        <v-avatar color="primary" size="24" class="mr-3">
                          <span
                            class="text-caption font-weight-bold text-white"
                            >{{ sIndex + 1 }}</span
                          >
                        </v-avatar>
                        <span
                          class="text-subtitle-1 font-weight-bold text-grey-darken-4"
                          >{{ section.title }}</span
                        >
                        <v-divider class="ml-4"></v-divider>
                      </div>

                      <v-row dense>
                        <v-col
                          cols="12"
                          sm="6"
                          v-for="(item, iIndex) in section.items"
                          :key="iIndex"
                        >
                          <v-sheet
                            class="d-flex align-start pa-3 rounded-lg border cursor-pointer transition-fast-in-fast-out"
                            :class="
                              item.checked
                                ? 'bg-blue-lighten-5 border-blue'
                                : 'bg-white'
                            "
                            @click="item.checked = !item.checked"
                          >
                            <v-checkbox-btn
                              v-model="item.checked"
                              color="primary"
                              density="compact"
                              class="mt-n1 ml-n1"
                            ></v-checkbox-btn>
                            <span
                              class="text-body-2 ml-2"
                              :class="
                                item.checked
                                  ? 'text-grey-darken-4 font-weight-medium'
                                  : 'text-grey-darken-1'
                              "
                            >
                              {{ item.text }}
                            </span>
                          </v-sheet>
                        </v-col>
                      </v-row>
                    </div>
                  </v-col>
                </v-row>
              </v-window-item>
            </v-window>
          </div>
        </v-card>
      </div>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

// 's' object for the inserted profile button style
const s = {
  profileBtn: {
    backgroundColor: "transparent",
    boxShadow: "none",
    padding: 0,
    minWidth: "unset",
  },
};

const route = useRoute();
const activeTab = ref("application");

// Variable to store the selected application data
let selectedApplicationData: any = null;

// --- Evaluation Summary Data ---
const evaluationData = ref({
  application: {
    controlNo: "",
    applicantName: "",
    projectName: "",
    projectLocation: "",
    dateReceived: "",
  },
  evaluations: [
    {
      title: "Architectural Plans",
      evaluator: "Arch. Roberto Garcia",
      date: "November 17, 2024",
      status: "approved",
      findings: [
        "Building design complies with National Building Code",
        "Floor plans show proper room dimensions",
        "Fire exits properly indicated",
      ],
    },
    {
      title: "Civil/Structural Plans",
      evaluator: "Engr. Maria Santos",
      date: "November 17, 2024",
      status: "approved",
      findings: [
        "Structural design meets NSCP 2015",
        "Foundation design appropriate for soil bearing",
      ],
    },
    {
      title: "Electrical Plans",
      evaluator: "Engr. Pedro Reyes",
      date: "November 17, 2024",
      status: "pending",
      findings: ["Waiting for load schedule revision"],
    },
  ],
  recommendation: {
    status: "approved",
    recommendation: "FOR APPROVAL",
    buildingOfficial: "Engr. Vicente Alvarez",
    date: "November 20, 2024",
  },
});

// Initialize selected application data on mount
onMounted(() => {
  if (route.query.applicationData) {
    try {
      selectedApplicationData = JSON.parse(
        route.query.applicationData as string
      );
      // Update evaluation data with the selected application
      evaluationData.value.application = {
        controlNo: selectedApplicationData.controlNo || "2024-BP-001234",
        applicantName: selectedApplicationData.applicantName || "Unknown",
        projectName: selectedApplicationData.projectName || "Project Name",
        projectLocation: selectedApplicationData.projectLocation || "Location",
        dateReceived:
          selectedApplicationData.dateTimeReceived ||
          selectedApplicationData.submissionDate ||
          "N/A",
      };
    } catch (error) {
      console.error("Failed to parse applicationData:", error);
    }
  }
});

// --- Profile Data ---
const mockEvaluatorProfile = ref({
  name: "Zoe Lumanta",
  title: "Administrative Aide",
  specialty: "Administrative Aide",
  image: "https://randomuser.me/api/portraits/men/32.jpg",
});

const logout = () => {
  console.log("Logout clicked");
};

// --- Document Checklist Data ---
const documentaryData = ref({
  sections: [
    {
      title: "TECHNICAL DOCUMENTS",
      items: [
        {
          text: "4 copies - Notarized Application Form for Building Permit",
          checked: false,
        },
        { text: "4 copies - Ancillary Permit Forms", checked: false },
        {
          text: "4 sets - Design Plans (Architectural, Structural, Electrical, Mechanical)",
          checked: false,
        },
        { text: "3 sets - Lot Plan", checked: false },
        {
          text: "3 copies - Photocopies of Valid Licenses (PRC ID)",
          checked: false,
        },
        {
          text: "2 copies - Structural Design and Seismic Analysis",
          checked: false,
        },
      ],
    },
    {
      title: "LOT DOCUMENTS & PROOF OF OWNERSHIP",
      items: [
        { text: "2 copies - Certificate of Title (OCT/TCT)", checked: false },
        { text: "2 copies - Tax Declaration", checked: false },
        { text: "2 copies - Tax Receipt", checked: false },
      ],
    },
    {
      title: "CLEARANCES",
      items: [
        {
          text: "2 copies - Construction Safety and Health Program (DOLE)",
          checked: false,
        },
        {
          text: "2 copies - Fire Safety Evaluation Clearance (BFP)",
          checked: false,
        },
        { text: "2 copies - Locational Clearance (CPDO)", checked: false },
        { text: "2 copies - Barangay Clearance", checked: false },
      ],
    },
  ],
});

// --- PDF Plans Data ---
const selectedPlan = ref<number | null>(0);
const pdfPlans = [
  {
    name: "Architectural Plans",
    date: "Nov 17, 2024",
    evaluator: "Arch. Garcia",
    status: "Approved",
    pdfUrl:
      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  },
  {
    name: "Civil/Structural Plans",
    date: "Nov 17, 2024",
    evaluator: "Engr. Santos",
    status: "Approved",
    pdfUrl:
      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  },
  {
    name: "Mechanical Plan",
    date: "Nov 18, 2024",
    evaluator: "Engr. Tan",
    status: "Approved",
    pdfUrl:
      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  },
  {
    name: "Electrical Plans",
    date: "Nov 18, 2024",
    evaluator: "Engr. Reyes",
    status: "Approved",
    pdfUrl:
      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  },
];

const togglePlan = (index: number) => {
  selectedPlan.value = index;
};
</script>

<style scoped>
/* Utility for centering page content */
.page-container {
  max-width: 1460px;
  margin: 0 auto;
}

/* Custom transitions */
.cursor-pointer {
  cursor: pointer;
}

.hover-opacity:hover {
  background-color: rgba(0, 0, 0, 0.03);
}

.border-blue {
  border-color: #1867c0 !important;
}

/* Sticky card for evaluation details */
.sticky-card {
  position: sticky;
  top: 110px; /* Adjusted since header is fixed */
}

/* Make font slightly nicer if system font allows */
.v-application {
  font-family: "Inter", "Roboto", sans-serif !important;
}

/* Subtle shadows */
.shadow-sm {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.06) !important;
}

.font-monospace {
  font-family: "Courier New", Courier, monospace;
}
</style>