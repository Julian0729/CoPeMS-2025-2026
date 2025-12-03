<template>
  <v-app>
    <v-app-bar flat color="#0000CC" dark height="88" app class="elevation-4">
      <v-container
        fluid
        class="d-flex align-center py-0"
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

    <v-main style="background-color: #f5f6fa; padding-top: 88px">
      <div :style="s.topToolbar">
        <div class="left d-flex align-center">
          <v-icon color="#3b82f6" class="mr-2">mdi-office-building</v-icon>
          <h3 class="mb-0 font-weight-bold" :style="s.textToolbar">
            Building Permit Application
          </h3>
        </div>

        <div class="right d-flex align-center">
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
                  <v-list-item-title class="font-weight-bold">{{
                    mockEvaluatorProfile.name
                  }}</v-list-item-title>
                  <v-list-item-subtitle>{{
                    mockEvaluatorProfile.specialty
                  }}</v-list-item-subtitle>
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
      </div>

      <div :style="s.pageContainer">
        <v-card class="rounded-lg overflow-hidden border mb-6" flat>
          <v-tabs
            v-model="activeTab"
            color="primary"
            bg-color="white"
            class="border-b"
          >
            <v-tab value="application" class="text-capitalize">
              <v-icon
                start
                icon="mdi-file-document-outline"
                class="mr-2"
              ></v-icon>
              Application Form
            </v-tab>
            <v-tab value="evaluation" class="text-capitalize">
              <v-icon
                start
                icon="mdi-clipboard-check-outline"
                class="mr-2"
              ></v-icon>
              Evaluation Summary
            </v-tab>
            <v-tab value="plans" class="text-capitalize">
              <v-icon start icon="mdi-file-check-outline" class="mr-2"></v-icon>
              PDF Plans
            </v-tab>
            <v-tab value="checklist" class="text-capitalize">
              <v-icon start icon="mdi-format-list-checks" class="mr-2"></v-icon>
              Checklist
            </v-tab>
          </v-tabs>

          <div class="pa-6 bg-white" style="min-height: 500px">
            <v-window v-model="activeTab">
              <v-window-item value="application">
                <v-card class="rounded-lg" flat>
                  <v-img
                    src="https://placehold.co/800x1000/png?text=Unified+Application+Form+Preview"
                    alt="Unified Application Form"
                    cover
                    class="bg-grey-lighten-2"
                    aspect-ratio="0.8"
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
                <div class="d-flex flex-column gap-4">
                  <v-card class="rounded-lg pa-4" flat border>
                    <h3
                      class="text-h6 font-weight-medium text-grey-darken-4 mb-4"
                    >
                      Application Details
                    </h3>
                    <v-row dense>
                      <v-col cols="12" sm="6">
                        <div class="text-caption text-grey-darken-1">
                          Control No.
                        </div>
                        <div
                          class="text-body-2 font-weight-medium text-grey-darken-3"
                        >
                          {{ evaluationData.application.controlNo }}
                        </div>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <div class="text-caption text-grey-darken-1">
                          Date Received
                        </div>
                        <div
                          class="text-body-2 font-weight-medium text-grey-darken-3"
                        >
                          {{ evaluationData.application.dateReceived }}
                        </div>
                      </v-col>
                      <v-col cols="12" class="mt-2">
                        <div class="text-caption text-grey-darken-1">
                          Applicant
                        </div>
                        <div
                          class="text-body-2 font-weight-medium text-grey-darken-3"
                        >
                          {{ evaluationData.application.applicantName }}
                        </div>
                      </v-col>
                      <v-col cols="12" class="mt-2">
                        <div class="text-caption text-grey-darken-1">
                          Project
                        </div>
                        <div
                          class="text-body-2 font-weight-medium text-grey-darken-3"
                        >
                          {{ evaluationData.application.projectName }}
                        </div>
                      </v-col>
                      <v-col cols="12" class="mt-2">
                        <div class="text-caption text-grey-darken-1">
                          Location
                        </div>
                        <div
                          class="text-body-2 font-weight-medium text-grey-darken-3"
                        >
                          {{ evaluationData.application.projectLocation }}
                        </div>
                      </v-col>
                    </v-row>
                  </v-card>

                  <v-card class="rounded-lg pa-4" flat border>
                    <h3
                      class="text-h6 font-weight-medium text-grey-darken-4 mb-4"
                    >
                      Plan Evaluations
                    </h3>

                    <div
                      v-for="(evaluation, index) in evaluationData.evaluations"
                      :key="index"
                    >
                      <div
                        class="py-4"
                        :class="{
                          'border-b':
                            index !== evaluationData.evaluations.length - 1,
                        }"
                      >
                        <div
                          class="d-flex justify-space-between align-start mb-2"
                        >
                          <div>
                            <div
                              class="text-subtitle-1 font-weight-medium text-grey-darken-3"
                            >
                              {{ evaluation.title }}
                            </div>
                            <div class="text-caption text-grey-darken-1">
                              {{ evaluation.evaluator }}
                            </div>
                          </div>
                          <div class="text-right">
                            <div class="text-caption text-grey-darken-1 mb-1">
                              {{ evaluation.date }}
                            </div>
                            <v-chip
                              size="x-small"
                              color="green-darken-1"
                              variant="flat"
                              class="font-weight-medium"
                            >
                              {{
                                evaluation.status === "approved"
                                  ? "Approved"
                                  : "Pending"
                              }}
                            </v-chip>
                          </div>
                        </div>

                        <div class="mt-2">
                          <div
                            class="text-caption text-grey-darken-2 font-weight-medium mb-1"
                          >
                            Findings:
                          </div>
                          <div
                            v-for="(finding, fIndex) in evaluation.findings"
                            :key="fIndex"
                            class="d-flex align-start gap-2 mb-1"
                          >
                            <v-icon
                              icon="mdi-circle-small"
                              size="small"
                              color="grey-lighten-1"
                              class="mt-1"
                            ></v-icon>
                            <span class="text-body-2 text-grey-darken-2">{{
                              finding
                            }}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </v-card>

                  <v-card class="rounded-lg pa-4" flat border>
                    <h3
                      class="text-h6 font-weight-medium text-grey-darken-4 mb-4"
                    >
                      Final Recommendation
                    </h3>
                    <div class="d-flex align-start gap-3 mb-4">
                      <v-icon
                        icon="mdi-checkbox-marked"
                        color="grey-darken-4"
                        class="mt-1"
                      ></v-icon>
                      <div>
                        <div
                          class="text-body-1 font-weight-bold text-grey-darken-4"
                        >
                          {{ evaluationData.recommendation.recommendation }}
                        </div>
                        <div class="text-caption text-grey-darken-1 mt-1">
                          All plans have been evaluated and found compliant with
                          applicable building codes and regulations.
                        </div>
                      </div>
                    </div>

                    <v-divider class="mb-3"></v-divider>

                    <div class="d-flex justify-space-between align-end">
                      <div>
                        <div class="text-caption text-grey-darken-1">
                          Building Official
                        </div>
                        <div
                          class="text-body-2 font-weight-medium text-grey-darken-3"
                        >
                          {{ evaluationData.recommendation.buildingOfficial }}
                        </div>
                      </div>
                      <div class="text-right">
                        <div class="text-caption text-grey-darken-1">
                          Date Completed
                        </div>
                        <div
                          class="text-body-2 font-weight-medium text-grey-darken-3"
                        >
                          {{ evaluationData.recommendation.date }}
                        </div>
                      </div>
                    </div>
                  </v-card>
                </div>
              </v-window-item>

              <v-window-item value="plans">
                <div class="d-flex flex-column gap-3">
                  <v-card
                    v-for="(plan, index) in pdfPlans"
                    :key="index"
                    class="rounded-lg mb-3"
                    flat
                    border
                  >
                    <div class="pa-4">
                      <div class="d-flex align-center justify-space-between">
                        <div class="d-flex align-center">
                          <v-avatar color="grey-lighten-4" rounded class="mr-3">
                            <v-icon color="grey-darken-1"
                              >mdi-file-document-outline</v-icon
                            >
                          </v-avatar>
                          <div>
                            <div
                              class="text-subtitle-1 font-weight-medium text-grey-darken-3"
                            >
                              {{ plan.name }}
                            </div>
                            <div class="text-caption text-grey-darken-1">
                              {{ plan.evaluator }} • {{ plan.date }}
                            </div>
                          </div>
                        </div>
                        <v-btn
                          :variant="
                            selectedPlan === index ? 'outlined' : 'text'
                          "
                          :color="
                            selectedPlan === index
                              ? 'grey-darken-3'
                              : 'grey-darken-1'
                          "
                          size="small"
                          prepend-icon="mdi-eye"
                          @click="togglePlan(index)"
                        >
                          {{ selectedPlan === index ? "Close" : "View" }}
                        </v-btn>
                      </div>
                    </div>

                    <v-expand-transition>
                      <div v-if="selectedPlan === index">
                        <v-divider></v-divider>
                        <div class="bg-grey-lighten-5 pa-4">
                          <iframe
                            :src="
                              plan.pdfUrl + '#toolbar=0&navpanes=0&scrollbar=1'
                            "
                            width="100%"
                            height="500"
                            style="
                              border: 1px solid #e2e8f0;
                              border-radius: 4px;
                              background: white;
                            "
                            :title="plan.name"
                          ></iframe>
                        </div>
                      </div>
                    </v-expand-transition>
                  </v-card>
                </div>
              </v-window-item>

              <v-window-item value="checklist">
                <v-card class="pa-4 rounded-lg" flat border>
                  <div class="mb-4">
                    <h3 class="text-h6 font-weight-bold text-grey-darken-3">
                      Documentary Requirements
                    </h3>
                    <p class="text-body-2 text-grey-darken-1">
                      Building Permit Application
                    </p>
                  </div>

                  <div
                    v-for="(section, sIndex) in documentaryData.sections"
                    :key="sIndex"
                    class="mb-6"
                  >
                    <v-sheet color="grey-lighten-4" class="pa-2 mb-2 rounded">
                      <span
                        class="text-subtitle-2 font-weight-bold text-grey-darken-3"
                        >{{ section.title }}</span
                      >
                    </v-sheet>

                    <div class="d-flex flex-column gap-2">
                      <div
                        v-for="(item, iIndex) in section.items"
                        :key="iIndex"
                        class="d-flex align-start py-1 cursor-pointer checklist-item"
                        @click="item.checked = !item.checked"
                      >
                        <v-icon
                          :icon="
                            item.checked
                              ? 'mdi-checkbox-marked'
                              : 'mdi-checkbox-blank-outline'
                          "
                          size="small"
                          :color="item.checked ? 'primary' : 'grey-lighten-1'"
                          class="mr-2 mt-1"
                        ></v-icon>
                        <span
                          class="text-body-2"
                          :class="
                            item.checked
                              ? 'text-grey-darken-3 font-weight-medium'
                              : 'text-grey-darken-2'
                          "
                        >
                          {{ item.text }}
                        </span>
                      </div>
                    </div>
                  </div>
                </v-card>
              </v-window-item>
            </v-window>
          </div>
        </v-card>
      </div>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from "vue";

// --- Layout Styles ---
const s = {
  topToolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 24px",
    background: "#fff",
    borderBottom: "1px solid #e8eaf0",
  },
  textToolbar: { color: "#111827" },
  pageContainer: {
    maxWidth: "1460px",
    margin: "16px auto 0",
    padding: "0 12px",
  },
  profileBtn: {
    backgroundColor: "transparent",
    boxShadow: "none",
    padding: 0,
    minWidth: "unset",
  },
};

const activeTab = ref("application");

// --- Profile & Header Data ---
const mockEvaluatorProfile = ref({
  name: "Zoe Lumanta",
  title: "Administrative Aide",
  specialty: "Administrative Aide",
  image: "https://randomuser.me/api/portraits/men/32.jpg",
});

const logout = () => {
  console.log("Logout clicked");
};

// --- Document Checklist Data (REACTIVE & INTERACTIVE) ---
// Transformed items into objects with { text, checked } properties
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

// --- PDF Plans Data & Logic ---
const selectedPlan = ref<number | null>(null);

const pdfPlans = [
  {
    name: "Architectural Plans",
    date: "November 17, 2024",
    evaluator: "Arch. Roberto Garcia",
    status: "Approved",
    pdfUrl:
      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  },
  {
    name: "Civil/Structural Plans",
    date: "November 17, 2024",
    evaluator: "Engr. Maria Santos",
    status: "Approved",
    pdfUrl:
      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  },
  {
    name: "Mechanical Plan",
    date: "November 18, 2024",
    evaluator: "Engr. Lisa Tan",
    status: "Approved",
    pdfUrl:
      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  },
  {
    name: "Electrical Plans",
    date: "November 18, 2024",
    evaluator: "Engr. Pedro Reyes",
    status: "Approved",
    pdfUrl:
      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  },
  {
    name: "Plumbing Plans",
    date: "November 19, 2024",
    evaluator: "Engr. Jose Cruz",
    status: "Approved",
    pdfUrl:
      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  },
];

const togglePlan = (index: number) => {
  selectedPlan.value = selectedPlan.value === index ? null : index;
};

// --- Evaluation Summary Data ---
const evaluationData = {
  application: {
    controlNo: "2024-BP-001234",
    applicantName: "Juan dela Cruz",
    projectName: "Commercial Building Construction",
    projectLocation: "123 Rizal Avenue, Manila",
    dateReceived: "November 15, 2024",
  },
  evaluations: [
    {
      title: "Architectural Plans",
      evaluator: "Arch. Roberto Garcia",
      date: "November 17, 2024",
      status: "approved",
      findings: [
        "Building design complies with National Building Code (PD 1096)",
        "Floor plans show proper room dimensions and spatial requirements",
        "Fire exits and emergency egress properly indicated",
        "Accessibility features comply with BP 344 (Accessibility Law)",
        "Building height and setback requirements met",
      ],
    },
    {
      title: "Civil/Structural Plans",
      evaluator: "Engr. Maria Santos",
      date: "November 17, 2024",
      status: "approved",
      findings: [
        "Structural design meets NSCP (National Structural Code of the Philippines)",
        "Foundation design appropriate for soil bearing capacity",
        "Seismic design parameters properly calculated for Seismic Zone 4",
        "Reinforcement details and specifications clearly indicated",
        "Load calculations verified and acceptable",
      ],
    },
    {
      title: "Mechanical Plan",
      evaluator: "Engr. Lisa Tan",
      date: "November 18, 2024",
      status: "approved",
      findings: [
        "HVAC system design adequate for building occupancy load",
        "Ventilation requirements comply with building code standards",
        "Equipment specifications and capacity properly indicated",
        "Fire dampers and smoke control systems included",
        "Energy efficiency measures incorporated in design",
      ],
    },
    {
      title: "Electrical Plans",
      evaluator: "Engr. Pedro Reyes",
      date: "November 18, 2024",
      status: "approved",
      findings: [
        "Electrical design complies with Philippine Electrical Code (PEC)",
        "Power load calculations verified and adequate",
        "Emergency lighting and power backup systems included",
        "Grounding and lightning protection properly designed",
        "Circuit breaker specifications and panel schedules complete",
      ],
    },
    {
      title: "Plumbing Plans",
      evaluator: "Engr. Jose Cruz",
      date: "November 19, 2024",
      status: "approved",
      findings: [
        "Plumbing design complies with National Plumbing Code",
        "Water supply system properly sized and designed",
        "Drainage and sewerage system meets code requirements",
        "Fixture units and pipe sizing calculations verified",
        "Water conservation fixtures specified",
      ],
    },
  ],
  recommendation: {
    status: "approved",
    recommendation: "FOR APPROVAL. FOR ORDER OF PAYMENT",
    buildingOfficial: "Engr. Vicente Alvarez",
    date: "November 20, 2024",
  },
};
</script>

<style scoped>
.v-card {
  border-color: #e2e8f0 !important;
}

.hover-bg:hover {
  background-color: rgba(0, 0, 0, 0.04);
}

.checklist-item:hover {
  background-color: rgba(0, 0, 0, 0.02);
  border-radius: 4px;
}
</style>