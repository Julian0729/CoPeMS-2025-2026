<template>
  <v-app style="height: 100vh; overflow: hidden" class="bg-slate-50">
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
                <v-avatar size="32" class="mx-2" color="blue-darken-2">
                  <span class="text-white font-weight-bold text-caption">
                    {{ getInitials(mockEvaluatorProfile.name) }}
                  </span>
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

    <v-main
      style="
        background-color: #f5f6fa;
        height: 100vh;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        padding-top: 88px;
      "
    >
      <div
        class="flex-grow-1 bg-grey-lighten-3 pa-6"
        style="overflow-y: auto; min-height: 0"
      >
        <div class="d-flex align-center mb-5 px-2">
          <v-icon color="#0000CC" class="mr-3" size="36"
            >mdi-office-building</v-icon
          >
          <h1 class="text-h4 font-weight-bold text-grey-darken-4">
            Building Permit Application
          </h1>
        </div>

        <v-card
          class="mx-auto rounded-2xl elevation-6"
          max-width="1800"
          style="border: 2px solid #e3e6ea"
        >
          <v-card-title
            class="d-flex align-center justify-space-between py-3 px-6 bg-gradient"
            style="border-radius: 1rem 1rem 0 0"
          >
            <div class="d-flex align-center">
              <v-icon
                color="blue-darken-2"
                size="32"
                class="me-3 elevation-1"
                style="background: #e3f2fd; border-radius: 50%; padding: 4px"
                >mdi-city-variant-outline</v-icon
              >
              <div class="text-h6 font-weight-bold text-blue-darken-2">
                {{ currentPageTitle }}
              </div>
              <v-chip
                size="small"
                class="ml-4 font-weight-bold px-4"
                color="blue"
                variant="elevated"
              >
                {{ evaluatorRole }}
              </v-chip>
            </div>
          </v-card-title>
          <v-divider></v-divider>

          <v-card-text class="pt-6 px-8">
            <v-row>
              <v-col cols="12" md="8">
                <div
                  class="pa-2 rounded-lg border"
                  style="background-color: #f5f5f5"
                >
                  <div
                    class="d-flex align-center justify-center rounded-lg"
                    style="
                      height: 1248px;
                      background: repeating-linear-gradient(
                        135deg,
                        #e0e0e0,
                        #e0e0e0 40px,
                        #f5f5f5 40px,
                        #f5f5f5 80px
                      );
                    "
                  >
                    <div class="text-h5 font-weight-bold text-black opacity-70">
                      {{ evaluatorRole }} Plan Placeholder
                    </div>
                  </div>
                </div>
                <div class="text-caption text-center pt-3 text-grey-darken-1">
                  Plan View – <span class="font-italic">Zoom</span> and
                  <span class="font-italic">annotation</span> tools would be
                  implemented here.
                </div>

                <v-card
                  class="mt-6 elevation-2 rounded-lg"
                  border
                  style="border-color: #e0e0e0"
                >
                  <div class="d-flex align-start pa-5">
                    <div
                      class="d-flex align-center justify-center rounded-lg mr-4"
                      style="
                        width: 48px;
                        height: 48px;
                        background-color: #e8f5e9;
                        flex-shrink: 0;
                      "
                    >
                      <v-icon color="green-darken-1" size="24"
                        >mdi-calculator</v-icon
                      >
                    </div>
                    <div>
                      <div
                        class="text-h6 font-weight-bold text-blue-darken-3"
                        style="line-height: 1.2"
                      >
                        Assessment Inputs
                      </div>
                      <div class="text-body-2 text-grey-darken-1 mt-1">
                        Enter specifications. Fees compute automatically based
                        on National Building Code (PD 1096).
                      </div>
                    </div>
                  </div>

                  <v-divider></v-divider>

                  <v-card-text class="pa-5">
                    <div
                      class="rounded-lg mb-6 overflow-hidden"
                      style="
                        background-color: #e3f2fd;
                        border: 1px solid #90caf9;
                      "
                    >
                      <div class="px-4 py-3 d-flex align-center">
                        <v-icon color="blue-darken-2" size="small" class="mr-2">
                          mdi-information-outline
                        </v-icon>
                        <span
                          class="font-weight-bold text-blue-darken-3 text-body-2"
                        >
                          Project Parameters (Basis of Assessment)
                        </span>
                      </div>

                      <div class="px-4 pb-4 pt-1">
                        <v-row dense>
                          <v-col cols="12" md="8">
                            <v-select
                              label="Character of Occupancy (Group)"
                              v-model="assessmentData.occupancy"
                              :items="occupancyGroups"
                              item-title="text"
                              item-value="value"
                              variant="outlined"
                              density="compact"
                              hide-details="auto"
                              bg-color="white"
                              color="blue"
                            >
                              <template #prepend-inner>
                                <v-icon size="small" color="grey-darken-1"
                                  >mdi-office-building</v-icon
                                >
                              </template>
                            </v-select>
                          </v-col>
                          <v-col cols="12" md="4">
                            <v-text-field
                              label="Total Floor Area"
                              v-model.number="assessmentData.floorArea"
                              placeholder="0.00"
                              suffix="sqm"
                              variant="outlined"
                              density="compact"
                              hide-details="auto"
                              bg-color="white"
                              color="blue"
                              type="number"
                              min="0"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </div>
                    </div>

                    <v-divider class="mb-5"></v-divider>

                    <div class="mb-2">
                      <div
                        class="d-flex justify-space-between align-center mb-3"
                      >
                        <div
                          class="text-subtitle-1 font-weight-bold text-blue-darken-2"
                        >
                          Fee Computation
                        </div>
                        <v-chip
                          size="x-small"
                          color="blue-grey"
                          variant="tonal"
                          class="font-weight-medium"
                        >
                          Logic: {{ computationMethodLabel }}
                        </v-chip>
                      </div>

                      <v-row dense>
                        <v-col cols="12" md="4">
                          <v-text-field
                            label="Building Fee (Architectural)"
                            :model-value="formatCurrency(calculatedBuildingFee)"
                            variant="outlined"
                            density="comfortable"
                            readonly
                            bg-color="grey-lighten-5"
                            color="blue-grey"
                            hint="Computed based on Occupancy Type Logic"
                            persistent-hint
                          ></v-text-field>
                        </v-col>

                        <v-col cols="12" md="4">
                          <v-text-field
                            label="Processing Fee"
                            :model-value="formatCurrency(processingFee)"
                            variant="outlined"
                            density="comfortable"
                            readonly
                            bg-color="grey-lighten-5"
                            color="blue-grey"
                            hint="Administrative processing fee"
                            persistent-hint
                          ></v-text-field>
                        </v-col>

                        <v-col cols="12" md="4">
                          <v-text-field
                            label="Total Amount Due"
                            :model-value="formatCurrency(totalAmountDue)"
                            variant="outlined"
                            density="comfortable"
                            readonly
                            bg-color="blue-lighten-5"
                            base-color="blue"
                            color="blue-darken-3"
                            class="font-weight-bold"
                            style="
                              font-size: 1.1rem;
                              --v-theme-primary: var(--v-theme-blue-darken-2);
                            "
                          >
                            <template #prepend-inner>
                              <v-icon color="blue-darken-2">mdi-cash</v-icon>
                            </template>
                          </v-text-field>
                        </v-col>
                      </v-row>
                    </div>
                  </v-card-text>
                </v-card>
              </v-col>

              <v-col cols="12" md="4">
                <v-form @submit.prevent="submitEvaluation">
                  <v-sheet class="rounded-lg pa-5 bg-white elevation-2 mb-6">
                    <div class="mb-5">
                      <div
                        class="text-h6 font-weight-bold mb-3 text-blue-darken-2"
                      >
                        {{ currentChecklistTitle }}
                      </div>
                      <v-divider class="mb-4"></v-divider>
                      <div
                        v-for="(req, index) in currentChecklist"
                        :key="index"
                      >
                        <v-checkbox
                          v-model="evaluationData.requirements"
                          :label="req.label"
                          :value="req.value"
                          density="compact"
                          hide-details
                          class="flex-grow-1"
                          color="blue"
                        ></v-checkbox>

                        <v-textarea
                          v-if="
                            !evaluationData.requirements.includes(req.value)
                          "
                          v-model="
                            evaluationData.commentsByRequirement[req.value]
                          "
                          placeholder="Reason for non-compliance..."
                          variant="outlined"
                          rows="1"
                          auto-grow
                          class="mt-1 mb-3"
                          hide-details
                          density="compact"
                        ></v-textarea>
                      </div>
                    </div>

                    <div class="mb-5">
                      <div
                        class="text-h6 font-weight-bold mb-3 text-blue-darken-2"
                      >
                        General Comments/Feedback
                      </div>
                      <v-textarea
                        v-model="evaluationData.comments"
                        placeholder="General summary or additional feedback..."
                        variant="outlined"
                        rows="3"
                        hide-details
                        auto-grow
                      ></v-textarea>
                    </div>

                    <div class="mb-5">
                      <div
                        class="text-h6 font-weight-bold mb-3 text-blue-darken-2"
                      >
                        Assessment Status
                      </div>
                      <v-radio-group
                        v-model="computedStatus"
                        hide-details
                        color="blue"
                        class="mt-1"
                        readonly
                        inline
                      >
                        <v-radio
                          label="Approved"
                          value="Approved"
                          class="font-weight-bold"
                        ></v-radio>
                        <v-radio
                          label="For Revision"
                          value="For Revision"
                          class="font-weight-bold"
                        ></v-radio>
                      </v-radio-group>
                    </div>
                  </v-sheet>

                  <v-btn
                    type="submit"
                    color="blue"
                    variant="elevated"
                    block
                    size="x-large"
                    class="mt-4 text-none font-weight-bold rounded-lg"
                    style="font-size: 1.2rem"
                    elevation="4"
                    >Submit Evaluation</v-btn
                  >
                </v-form>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </div>
    </v-main>

    <v-dialog v-model="showSuccessDialog" max-width="400" persistent>
      <v-card class="text-center pa-6 rounded-xl">
        <div class="d-flex justify-center mb-4">
          <v-avatar color="green-lighten-5" size="80">
            <v-icon color="green" size="48">mdi-check-circle</v-icon>
          </v-avatar>
        </div>
        <div class="text-h5 font-weight-bold text-grey-darken-3 mb-2">
          Evaluated!
        </div>
        <div class="text-body-2 text-grey-darken-1 mb-6">
          The architectural plan evaluation has been submitted successfully.
        </div>
        <v-btn
          color="blue"
          block
          variant="elevated"
          size="large"
          rounded="lg"
          @click="redirectToList"
        >
          Submit
        </v-btn>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<style>
/* Global override to kill the long browser scrollbar */
html,
body {
  overflow: hidden !important;
}
</style>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

const showSuccessDialog = ref(false);

// --- Header/Profile Data ---
const mockEvaluatorProfile = ref({
  name: "Julian Lumanta",
  title: "Architect",
  specialty: "Architectural",
  initials: "ZL",
  avatar: "https://cdn.vuetifyjs.com/images/john.jpg",
});

// --- Styles ---
const s = {
  profileBtn: {
    backgroundColor: "transparent",
    boxShadow: "none",
    padding: 0,
    minWidth: "unset",
  },
};

const getInitials = (name) => {
  const parts = name.split(" ");
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

const logout = () => {
  console.log("User logging out...");
  router.push("/login");
};

// --- Assessment Data ---
const assessmentData = ref({
  occupancy: "A-1",
  floorArea: 0,
});

// --- Occupancy Options (Complete) ---
const occupancyGroups = [
  { text: "Group A-1 (Single Detached)", value: "A-1" },
  { text: "Group A-2 (Townhouse / Duplex)", value: "A-2" },
  { text: "Group B-1 (Hotels)", value: "B-1" },
  { text: "Group B-2 (Dormitories)", value: "B-2" },
  { text: "Group B-3 (Multiple Dwelling)", value: "B-3" },
  { text: "Group C-1 (Schools)", value: "C-1" },
  { text: "Group C-2 (Recreational)", value: "C-2" },
  { text: "Group D-1 (Hospitals)", value: "D-1" },
  { text: "Group D-2 (Nursing Homes)", value: "D-2" },
  { text: "Group D-3 (Jails)", value: "D-3" },
  { text: "Group E-1 (Offices)", value: "E-1" },
  { text: "Group E-2 (Banks)", value: "E-2" },
  { text: "Group E-3 (Stores)", value: "E-3" },
  { text: "Group F (Light Industrial)", value: "F" },
  { text: "Group G (Medium Industrial)", value: "G" },
  { text: "Group H (Storage/Hazardous)", value: "H" },
  { text: "Group I (Assembly)", value: "I" },
  { text: "Group J-1 (Detached Structure)", value: "J-1" },
  { text: "Group J-2 (Garages/Balconies)", value: "J-2" },
  { text: "Group J-3 (Towers/Fences)", value: "J-3" },
];

// --- FEE COMPUTATION LOGIC ---

// Helper: Format Currency
const formatCurrency = (value) => {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  }).format(value);
};

// Logic: Determine Method for Visual Hint
const computationMethodLabel = computed(() => {
  const type = assessmentData.value.occupancy;
  if (["A-1", "A-2"].includes(type)) return "Flat Rate × Area";
  if (["J-2"].includes(type)) return "50% of A-1 Rate";
  if (["J-3"].includes(type)) return "Fixed per Unit (See Note)";
  return "Cumulative Brackets";
});

// Logic: Main Building Fee Calculation
const calculatedBuildingFee = computed(() => {
  const area = assessmentData.value.floorArea || 0;
  const type = assessmentData.value.occupancy;

  if (area <= 0) return 0;

  // 1. Group A (Residential) - Flat Rate Logic
  if (type === "A-1") {
    let rate = 0;
    if (area <= 20) rate = 2.0;
    else if (area <= 50) rate = 3.4;
    else if (area <= 100) rate = 4.8;
    else if (area <= 150) rate = 6.0;
    else rate = 7.2;
    return area * rate;
  }

  if (type === "A-2") {
    let rate = 0;
    if (area <= 20) rate = 3.0;
    else if (area <= 50) rate = 5.2;
    else if (area <= 100) rate = 8.0;
    else if (area <= 150) rate = 8.0;
    else rate = 8.4;
    return area * rate;
  }

  // 2. Groups B, C-1, E, F, G, H, I, J-1 (Commercial/Industrial)
  // Cumulative Logic: Sum of (Sub-Area * Rate for that bracket)
  const commercialGroups = [
    "B-1",
    "B-2",
    "B-3",
    "C-1",
    "E-1",
    "E-2",
    "E-3",
    "F",
    "G",
    "H",
    "I",
    "J-1",
  ];
  if (commercialGroups.includes(type)) {
    let fee = 0;
    let remainingArea = area;

    // First 5,000 @ 23.00
    if (remainingArea > 0) {
      let bracketArea = Math.min(remainingArea, 5000);
      fee += bracketArea * 23.0;
      remainingArea -= bracketArea;
    }
    // Next 1,000 @ 22.00
    if (remainingArea > 0) {
      let bracketArea = Math.min(remainingArea, 1000);
      fee += bracketArea * 22.0;
      remainingArea -= bracketArea;
    }
    // Next 1,000 @ 20.50
    if (remainingArea > 0) {
      let bracketArea = Math.min(remainingArea, 1000);
      fee += bracketArea * 20.5;
      remainingArea -= bracketArea;
    }
    // Next 1,000 @ 19.50
    if (remainingArea > 0) {
      let bracketArea = Math.min(remainingArea, 1000);
      fee += bracketArea * 19.5;
      remainingArea -= bracketArea;
    }
    // Next 1,000 @ 18.00
    if (remainingArea > 0) {
      let bracketArea = Math.min(remainingArea, 1000);
      fee += bracketArea * 18.0;
      remainingArea -= bracketArea;
    }
    // Next 1,000 @ 17.00
    if (remainingArea > 0) {
      let bracketArea = Math.min(remainingArea, 1000);
      fee += bracketArea * 17.0;
      remainingArea -= bracketArea;
    }
    // For simplicity of this snippet, assumes 12.00 for anything beyond 10k as referenced "down to 12"
    if (remainingArea > 0) {
      fee += remainingArea * 12.0;
    }
    return fee;
  }

  // 3. Groups C-2, D (Institutional/Recreational)
  // Cumulative Logic (Different Rates)
  if (["C-2", "D-1", "D-2", "D-3"].includes(type)) {
    let fee = 0;
    let remainingArea = area;

    // First 5,000 @ 12.00
    if (remainingArea > 0) {
      let bracketArea = Math.min(remainingArea, 5000);
      fee += bracketArea * 12.0;
      remainingArea -= bracketArea;
    }
    // Next 1,000 @ 11.00
    if (remainingArea > 0) {
      let bracketArea = Math.min(remainingArea, 1000);
      fee += bracketArea * 11.0;
      remainingArea -= bracketArea;
    }
    // Next 1,000 @ 10.20
    if (remainingArea > 0) {
      let bracketArea = Math.min(remainingArea, 1000);
      fee += bracketArea * 10.2;
      remainingArea -= bracketArea;
    }
    // Overflow "etc" - assuming generic low rate for excess
    if (remainingArea > 0) {
      fee += remainingArea * 8.0; // Placeholder for lower bound
    }
    return fee;
  }

  // 4. Group J-2 (Garages, Balconies) - 50% of Main Building Rate
  // Logic: Calculate as if A-1, then divide by 2
  if (type === "J-2") {
    let rate = 0;
    if (area <= 20) rate = 2.0;
    else if (area <= 50) rate = 3.4;
    else if (area <= 100) rate = 4.8;
    else if (area <= 150) rate = 6.0;
    else rate = 7.2;

    return area * rate * 0.5;
  }

  // 5. Group J-3 (Towers, Fences) - Fixed Rates per Unit
  // Since input is sqm, return 0 or placeholder
  if (type === "J-3") {
    return 0; // Or specific logic if user inputs linear meters
  }

  return 0;
});

// Processing Fee (Fixed)
const processingFee = computed(() => {
  if (assessmentData.value.floorArea <= 0) return 0;
  return 500.0;
});

// Grand Total
const totalAmountDue = computed(() => {
  return calculatedBuildingFee.value + processingFee.value;
});

// --- Applicant Data ---
const applicantsData = [
  {
    id: 1,
    applicantName: "Jim Deguzman",
    applicationNumber: "BP-2024-808123-T",
    applicationId: "BP-2024-000123-T",
    projectName: "Commercial Building",
  },
  {
    id: 2,
    applicantName: "Sarah Geronimo",
    applicationNumber: "BP-2024-808234-T",
    applicationId: "BP-2024-000234-T",
    projectName: "Residential Building",
  },
];

// --- Evaluation Logic ---
const evaluatorRole = ref("Architectural");

const selectedApplicant = ref({
  id: "BP-2024-00101",
  applicantName: "John D. Smith",
});

// Load applicant data from route query
onMounted(() => {
  const applicationNumber = route.query.applicationNumber;
  const planType = route.query.planType;

  if (applicationNumber) {
    const applicant = applicantsData.find(
      (app) => app.applicationNumber === applicationNumber
    );
    if (applicant) {
      selectedApplicant.value = applicant;
    }
  }

  if (planType) {
    evaluatorRole.value = planType;
  }
});

const checklistData = {
  Architectural: [
    {
      label: "Standard Form (Type A0, A1, A2, A3) for Bldg Plans",
      value: "arch_std_form",
    },
    {
      label: "Lot Plan (Orientation, Bearing, Distance, Roads, Area)",
      value: "arch_lot_plan",
    },
    {
      label: "Site Development Plan (Scale, Tech Desc, Setbacks)",
      value: "arch_site_dev_plan",
    },
    {
      label: "Restrictions: Abutments and Firewalls",
      value: "arch_restrictions",
    },
    {
      label: "Vicinity Map/Location Plan (2km radius)",
      value: "arch_vicinity_map",
    },
    {
      label: "Perspective (Eye level or Bird's Eye View)",
      value: "arch_perspective",
    },
    {
      label: "Column Gridlines & Dimensions (All plans)",
      value: "arch_gridlines",
    },
    {
      label: "Floor Plans (min 1:100m, labels, dimensions)",
      value: "arch_floor_plans",
    },
    {
      label: "Min. 4 Elevations and 2 Sections (showing heights)",
      value: "arch_elevations_sections",
    },
    {
      label: "Stairs/Access Details (Comply with PD 1096, BP 344)",
      value: "arch_stairs",
    },
    {
      label: "Toilet and Bath Details (plans, sections, finishes)",
      value: "arch_toilet_details",
    },
    {
      label: "Kitchen Details (plans, sections, finishes)",
      value: "arch_kitchen_details",
    },
    {
      label: "Doors and Windows Schedule & Details",
      value: "arch_doors_windows",
    },
    {
      label: "Roof Plan / Roof Deck Plan (Passable/Non-passable)",
      value: "arch_roof_plan",
    },
    {
      label: "Other Architectural Details (as needed)",
      value: "arch_other_details",
    },
  ],
};

const planTitles = {
  Architectural: "Architectural Plan",
};

const checklistTitles = {
  Architectural: "Architectural Requirements Checklist",
};

const currentChecklist = computed(() => {
  return checklistData[evaluatorRole.value] || [];
});

const currentPageTitle = computed(() => {
  return `Document Evaluation: ${planTitles[evaluatorRole.value] || "Plan"}`;
});

const currentChecklistTitle = computed(() => {
  return checklistTitles[evaluatorRole.value] || "Requirements Checklist";
});

const evaluationData = ref({
  requirements: [],
  comments: "",
  commentsByRequirement: {},
  status: "",
});

const resetEvaluationForm = () => {
  evaluationData.value = {
    requirements: [],
    comments: "",
    commentsByRequirement: {},
    status: "",
  };
};

watch(
  () => evaluationData.value.commentsByRequirement,
  (newComments) => {
    for (const itemValue in newComments) {
      const comment = newComments[itemValue];
      if (comment && comment.trim() !== "") {
        const index = evaluationData.value.requirements.indexOf(itemValue);
        if (index > -1) {
          evaluationData.value.requirements.splice(index, 1);
        }
      }
    }
  },
  { deep: true }
);

watch(
  () => [...evaluationData.value.requirements],
  (newCheckedItems, oldCheckedItems) => {
    const justChecked = newCheckedItems.filter(
      (item) => !oldCheckedItems.includes(item)
    );

    for (const itemValue of justChecked) {
      if (evaluationData.value.commentsByRequirement[itemValue] !== undefined) {
        delete evaluationData.value.commentsByRequirement[itemValue];
      }
    }
  }
);

const computedStatus = computed(() => {
  if (currentChecklist.value.length === 0) {
    return "";
  }

  const allItemsChecked = currentChecklist.value.every((req) =>
    evaluationData.value.requirements.includes(req.value)
  );

  if (allItemsChecked) {
    return "Approved";
  } else {
    return "For Revision";
  }
});

const submitEvaluation = () => {
  evaluationData.value.status = computedStatus.value;

  if (!evaluationData.value.status) {
    alert("Cannot submit, status is not determined.");
    return;
  }

  console.log(
    `Evaluation Submitted for ${evaluatorRole.value} plan (App ID: ${selectedApplicant.value.id}):`,
    {
      ...evaluationData.value,
      assessment: assessmentData.value,
      totalFee: totalAmountDue.value,
    }
  );

  // Show the success dialog
  showSuccessDialog.value = true;
};

// Function called when "Back to List" is clicked
const redirectToList = () => {
  showSuccessDialog.value = false;
  router.push("/admin/listplan");
};
</script>