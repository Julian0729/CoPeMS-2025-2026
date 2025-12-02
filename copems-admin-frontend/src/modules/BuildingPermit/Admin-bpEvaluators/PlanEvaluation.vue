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

    <v-main
      style="
        background-color: #f5f6fa;
        padding-top: 88px;
        display: flex;
        flex-direction: column;
        overflow: hidden;
      "
    >
      <div :style="s.topToolbar" style="flex-shrink: 0">
        <div class="left d-flex align-center">
          <v-icon color="#3b82f6" class="mr-2">mdi-office-building</v-icon>
          <h3 class="mb-0 font-weight-bold" :style="s.textToolbar">
            Building Permit Application
          </h3>
        </div>
        <div class="right d-flex align-center">
          <v-menu :close-on-content-click="true" location="bottom end">
            <template #activator="{ props }">
              <v-btn variant="text" :style="s.profileBtn" v-bind="props">
                <v-avatar size="32" class="mx-2">
                  <v-img
                    :alt="mockEvaluatorProfile.name"
                    :src="mockEvaluatorProfile.avatar"
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
                <v-icon class="ml-1" size="small">mdi-chevron-down</v-icon>
              </v-btn>
            </template>
            <v-card min-width="250" class="mt-1">
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
                <v-list-item to="/profile" link>
                  <template #prepend>
                    <v-icon>mdi-account-outline</v-icon>
                  </template>
                  <v-list-item-title>My Profile</v-list-item-title>
                </v-list-item>
                <v-list-item link @click="logout" class="text-red-darken-1">
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

      <div
        class="flex-grow-1 overflow-y-auto bg-grey-lighten-3 pa-6"
        style="min-height: 0"
      >
        <v-card
          class="mx-auto rounded-2xl elevation-6"
          max-width="1800"
          style="border: 2px solid #e3e6ea"
        >
          <v-card-title
            class="d-flex align-center justify-space-between py-6 px-8 bg-gradient"
            style="border-radius: 1rem 1rem 0 0"
          >
            <div class="d-flex align-center">
              <v-icon
                color="blue-darken-2"
                size="40"
                class="me-3 elevation-1"
                style="background: #e3f2fd; border-radius: 50%"
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
                      height: 80vh;
                      min-height: 600px;
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

                  <v-card
                    variant="flat"
                    color="white"
                    class="pa-4 mb-5 elevation-2 rounded-lg"
                  >
                    <div
                      class="text-h6 font-weight-bold mb-2 text-blue-darken-2"
                    >
                      Fee Summary
                    </div>
                    <div class="d-flex flex-column" style="gap: 8px">
                      <div class="d-flex justify-space-between">
                        <div class="text-caption text-grey-darken-2">
                          Plan Review Fee (per sqm)
                        </div>
                        <div class="text-caption font-weight-medium">
                          ₱500.00
                        </div>
                      </div>
                      <div class="d-flex justify-space-between">
                        <div class="text-caption text-grey-darken-2">
                          Processing Fee
                        </div>
                        <div class="text-caption font-weight-medium">
                          ₱500.00
                        </div>
                      </div>
                      <v-divider class="my-2"></v-divider>
                      <div
                        class="d-flex justify-space-between font-weight-bold text-blue-darken-2"
                      >
                        <div class="text-body-1">Total Amount Due</div>
                        <div class="text-body-1">₱1,000.00</div>
                      </div>
                    </div>
                  </v-card>

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
  </v-app>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

// --- Header/Profile Data (From Saved Info) ---
const mockEvaluatorProfile = ref({
  name: "Julian Lumanta",
  title: "Architect",
  specialty: "Architectural",
  initials: "ZL",
  avatar: "https://cdn.vuetifyjs.com/images/john.jpg",
});

// --- Styles (From Saved Info) ---
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
  textToolbar: { color: "#111827" },
  profileBtn: {
    backgroundColor: "transparent",
    boxShadow: "none",
    padding: 0,
    minWidth: "unset",
  },
};

const logout = () => {
  console.log("User logging out...");
  router.push("/login");
};

// --- Applicant Data (From PlanInformation.vue) ---
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
  {
    id: 3,
    applicantName: "Michael Padilla",
    applicationNumber: "BP-2024-808345-T",
    applicationId: "BP-2024-000345-T",
    projectName: "Mixed-Use Building",
  },
  {
    id: 4,
    applicantName: "David Tolo",
    applicationNumber: "BP-2024-808678-T",
    applicationId: "BP-2024-000678-T",
    projectName: "Structural Addition",
  },
];

// --- Evaluation Logic (From Current Context) ---
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
    evaluationData.value
  );
  alert(
    `Evaluation for ${evaluatorRole.value} plan submitted as: ${evaluationData.value.status}`
  );

  resetEvaluationForm();
};
</script>

<style scoped>
.bg-gradient {
  background: linear-gradient(90deg, #e3f2fd 0%, #f5faff 100%);
}
</style>