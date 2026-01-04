<template>
  <v-app>
    <v-main class="no-scroll">
      <v-container fluid class="pa-0 content-area fill-height">
        <v-row no-gutters class="fill-height">
          <BPNavigation
            :sidebar-step="sidebarStep"
            :sidebar-steps="sidebarSteps"
            @go-to-step="goToStep"
            @logout="handleLogout"
          />

          <v-col
            cols="12"
            md="9"
            class="main-content-bg d-flex flex-column pa-0"
          >
            <div class="stepper-fixed-container pa-6 pb-2">
              <v-container fluid class="px-4 mx-auto" style="max-width: 1300px">
                <v-stepper
                  v-model="formStepValue"
                  alt-labels
                  flat
                  class="mb-0 mt-2 stepper-elevated"
                >
                  <v-stepper-header>
                    <template v-for="n in 4" :key="n">
                      <v-stepper-item
                        :title="getStepTitle(n)"
                        :value="n.toString()"
                        :complete="parseInt(formStepValue) > n"
                        :color="
                          parseInt(formStepValue) >= n
                            ? 'blue-darken-1'
                            : 'grey-lighten-2'
                        "
                        class="stepper-item-custom"
                      />
                      <v-divider
                        v-if="n < 4"
                        :thickness="3"
                        :style="{
                          'border-color':
                            parseInt(formStepValue) > n ? '#1976D2' : '#e0e0e0',
                        }"
                        class="mx-2"
                      ></v-divider>
                    </template>
                  </v-stepper-header>
                </v-stepper>
              </v-container>
            </div>

            <div class="scrollable-content pa-6 pt-0">
              <v-container fluid class="px-4 mx-auto" style="max-width: 1300px">
                <v-card class="my-2 pa-4 card-shadow">
                  <v-alert
                    v-if="successMessage"
                    type="success"
                    closable
                    @click:close="successMessage = ''"
                    class="mb-4"
                  >
                    {{ successMessage }}
                  </v-alert>
                  <v-alert
                    v-if="errorMessage"
                    type="error"
                    closable
                    @click:close="errorMessage = ''"
                    class="mb-4"
                  >
                    {{ errorMessage }}
                  </v-alert>

                  <v-card-text>
                    <v-form ref="form" v-model="formValid">
                      <div v-if="formStepValue === '2'">
                        <v-card class="mb-4 card-section">
                          <v-card-title class="text-h6 section-title">
                            <v-icon left color="blue-darken-3" class="mr-2"
                              >mdi-map-marker</v-icon
                            >
                            PROJECT LOCATION
                          </v-card-title>
                          <v-divider></v-divider>
                          <v-card-text>
                            <v-row dense>
                              <v-col cols="12" sm="4">
                                <div class="input-label">Barangay</div>
                                <v-select
                                  v-model="barangay"
                                  :items="barangays"
                                  variant="outlined"
                                  density="comfortable"
                                  :rules="[rules.required]"
                                  prepend-inner-icon="mdi-home-group"
                                  color="blue-darken-3"
                                ></v-select>
                              </v-col>
                              <v-col cols="12" sm="4">
                                <div class="input-label">BLK. No.</div>
                                <v-text-field
                                  v-model="blkNo"
                                  variant="outlined"
                                  density="comfortable"
                                  :rules="[rules.required]"
                                  prepend-inner-icon="mdi-numeric"
                                  color="blue-darken-3"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="4">
                                <div class="input-label">Street</div>
                                <v-text-field
                                  v-model="street"
                                  variant="outlined"
                                  density="comfortable"
                                  :rules="[rules.required]"
                                  prepend-inner-icon="mdi-road-variant"
                                  color="blue-darken-3"
                                ></v-text-field>
                              </v-col>
                            </v-row>
                          </v-card-text>
                        </v-card>

                        <v-card class="mb-4 card-section">
                          <v-card-title class="text-h6 section-title">
                            <v-icon left color="blue-darken-3" class="mr-2"
                              >mdi-file-document-outline</v-icon
                            >
                            LOT INFORMATION
                          </v-card-title>
                          <v-divider></v-divider>
                          <v-card-text>
                            <v-row dense>
                              <v-col cols="12" sm="6">
                                <div class="input-label">TCT No.</div>
                                <v-text-field
                                  v-model="tctNo"
                                  variant="outlined"
                                  density="comfortable"
                                  :rules="[rules.required]"
                                  prepend-inner-icon="mdi-numeric"
                                  color="blue-darken-3"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6">
                                <div class="input-label">
                                  Current Tax Dec No.
                                </div>
                                <v-text-field
                                  v-model="taxDecNo"
                                  variant="outlined"
                                  density="comfortable"
                                  :rules="[rules.required]"
                                  prepend-inner-icon="mdi-numeric"
                                  color="blue-darken-3"
                                ></v-text-field>
                              </v-col>
                            </v-row>
                          </v-card-text>
                        </v-card>

                        <v-card class="mb-4 card-section">
                          <v-card-title class="text-h6 section-title">
                            <v-icon left color="blue-darken-3" class="mr-2"
                              >mdi-hammer-wrench</v-icon
                            >
                            SCOPE OF WORK
                          </v-card-title>
                          <v-divider></v-divider>
                          <v-card-text>
                            <v-row dense>
                              <v-col cols="12">
                                <div class="input-label">
                                  Select Scope of Work
                                </div>
                                <v-select
                                  v-model="selectedScope"
                                  :items="scopeOfWork"
                                  variant="outlined"
                                  density="comfortable"
                                  multiple
                                  :rules="[rules.requiredScope]"
                                  chips
                                  prepend-inner-icon="mdi-format-list-bulleted"
                                  color="blue-darken-3"
                                ></v-select>
                              </v-col>
                              <v-col
                                v-if="selectedScope.includes('Other (Specify)')"
                                cols="12"
                              >
                                <v-text-field
                                  v-model="otherDetails"
                                  label="Please specify"
                                  variant="outlined"
                                  density="comfortable"
                                  :rules="[rules.requiredOther]"
                                  color="blue-darken-3"
                                  prepend-inner-icon="mdi-pencil"
                                ></v-text-field>
                              </v-col>
                            </v-row>
                          </v-card-text>
                        </v-card>
                      </div>

                      <div v-if="formStepValue === '3'">
                        <v-card class="mb-4 card-section">
                          <v-card-title class="text-h6 section-title">
                            <v-icon left color="blue-darken-3" class="mr-2"
                              >mdi-domain</v-icon
                            >
                            USE OR CHARACTER OF OCCUPANCY
                          </v-card-title>
                          <v-divider></v-divider>
                          <v-card-text>
                            <v-row dense>
                              <v-col cols="12" md="6">
                                <v-select
                                  v-model="selectedGroup"
                                  :items="groups"
                                  label="Groups"
                                  variant="outlined"
                                  prepend-inner-icon="mdi-format-list-bulleted"
                                  color="blue-darken-3"
                                ></v-select>
                              </v-col>
                              <v-col cols="12" md="6">
                                <v-select
                                  v-model="selectedCategory"
                                  :items="categories"
                                  label="Category"
                                  variant="outlined"
                                  :disabled="!selectedGroup"
                                  prepend-inner-icon="mdi-shape"
                                  color="blue-darken-3"
                                ></v-select>
                              </v-col>
                            </v-row>
                          </v-card-text>
                        </v-card>
                      </div>
                    </v-form>
                  </v-card-text>
                </v-card>

                <div class="d-flex justify-end mt-6 mb-8">
                  <v-btn
                    color="blue-grey-lighten-4"
                    class="mr-2 btn-rounded"
                    elevation="2"
                    variant="tonal"
                    @click="$router.push('/applicant/bpowner')"
                  >
                    <v-icon left>mdi-arrow-left</v-icon>Back
                  </v-btn>
                  <v-btn
                    color="blue-darken-3"
                    class="btn-rounded"
                    elevation="2"
                    @click="nextStep"
                    variant="elevated"
                    :loading="isLoading"
                    :disabled="isLoading"
                  >
                    {{ isLoading ? "Saving..." : "Next" }}
                    <v-icon right>mdi-arrow-right</v-icon>
                  </v-btn>
                </div>
              </v-container>
            </div>

            <v-snackbar
              v-model="snackbar"
              :color="snackbarColor"
              :timeout="3000"
              location="top right"
            >
              {{ snackbarMessage }}
            </v-snackbar>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
/**
 * Building Permit Application System - Step 2
 * Follows ACM citation style for software component documentation.
 */

import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import BPNavigation from "./bpnavigation.vue";
import bpConstructionService from "@/services/bpConstructionService";

export default defineComponent({
  name: "BuildingPermitStep2",
  components: { BPNavigation },

  setup() {
    const router = useRouter();
    return { router };
  },

  data() {
    return {
      // Form State
      formStepValue: "2",
      formValid: false,
      constructionId: null,
      isLoading: false,

      // Location Data
      barangay: null,
      blkNo: "",
      street: "",
      cityMunicipality: "Naga City",

      // Lot Information
      tctNo: "",
      taxDecNo: "",

      // Feedback UI
      errorMessage: "",
      successMessage: "",
      snackbar: false,
      snackbarMessage: "",
      snackbarColor: "success",

      // Scope of Work Logic
      selectedScope: [],
      otherDetails: "",
      scopeOfWork: [
        "New Construction",
        "Erection",
        "Addition",
        "Alteration",
        "Renovation",
        "Conversion",
        "Repair",
        "Moving",
        "Raising",
        "Accessory Building/Structure",
        "Legalization of Existing Building",
        "Other (Specify)",
      ],

      // Location Reference
      barangays: [
        "Abella",
        "Bagumbayan Norte",
        "Bagumbayan Sur",
        "Balatas",
        "Calauag",
        "Cararayan",
        "Carolina",
        "Concepcion Grande",
        "Concepcion Pequeña",
        "Dayangdang",
        "Del Rosario",
        "Dinaga",
        "Igualdad Interior",
        "Lerma",
        "Liboton",
        "Mabolo",
        "Pacol",
        "Panicuason",
        "Peñafrancia",
        "Sabang",
        "San Felipe",
        "San Francisco",
        "San Isidro",
        "Santa Cruz",
        "Tabuco",
        "Tinago",
        "Triangulo",
      ],

      // Validation Rules
      rules: {
        required: (value) => !!value || "This field is required.",
        requiredScope: (value) =>
          value.length > 0 || "Please select at least one scope of work.",
        requiredOther: (value) => {
          if (this.selectedScope.includes("Other (Specify)")) {
            return !!value || "Please specify details for 'Other'.";
          }
          return true;
        },
      },

      // Occupancy Groupings
      selectedGroup: null,
      selectedCategory: null,
      groupCategoryData: {
        "GROUP A: RESIDENTIAL (DWELLINGS)": [
          "SINGLE",
          "DUPLEX",
          "RESIDENTIAL R-1, R-2",
          "OTHERS",
        ],
        "GROUP B: RESIDENTIAL": [
          "HOTEL",
          "MOTEL",
          "TOWNHOUSE",
          "DORMITORY",
          "OTHERS",
        ],
        "GROUP C: EDUCATIONAL & RECREATIONAL": [
          "SCHOOL BUILDING",
          "SCHOOL AUDITORIUM, GYMNASIUM",
          "OTHERS",
        ],
        "GROUP E: COMMERCIAL": [
          "BANK",
          "STORE",
          "SHOPPING CENTER/MALL",
          "OTHERS",
        ],
        "GROUP F: LIGHT INDUSTRIAL": ["FACTORY/PLANT", "OTHERS"],
        "GROUP G: MEDIUM INDUSTRIAL": [
          "STORAGE/WAREHOUSE",
          "FACTORY",
          "OTHERS",
        ],
        "GROUP H: ASSEMBLY": ["THEATER, AUDITORIUM", "OTHERS"],
        "GROUP I: ASSEMBLY": ["COLISEUM, SPORTS COMPLEX", "OTHERS"],
        "GROUP J: AGRICULTURAL & ACCESSORIES": [
          "AGRICULTURAL STRUCTURES",
          "ACCESSORIES",
          "OTHERS",
        ],
      },

      // Sidebar Progress
      sidebarStep: 0,
      sidebarSteps: [
        "Fill up the Unified Application Form",
        "Upload Building Plans & Lot Plans",
        "Download Filled-up Unified Application Form and Required Ancillary Permits ",
      ],
    };
  },

  computed: {
    groups() {
      return Object.keys(this.groupCategoryData);
    },
    categories() {
      return this.selectedGroup
        ? this.groupCategoryData[this.selectedGroup]
        : [];
    },
  },

  watch: {
    selectedGroup() {
      this.selectedCategory = null;
    },
  },

  methods: {
    getStepTitle(n) {
      const titles = [
        "Building Owner Information",
        "Construction Information",
        "Use or Character of Occupancy",
        "Signatories Details",
      ];
      return titles[n - 1];
    },

    async saveConstructionData() {
      try {
        this.isLoading = true;
        const constructionData = {
          barangay: this.barangay,
          blk_no: this.blkNo,
          street: this.street,
          tct_no: this.tctNo,
          current_tax_dec_no: this.taxDecNo,
          scope_of_work: this.selectedScope.join(", "),
        };

        let result = this.constructionId
          ? await bpConstructionService.update(
              this.constructionId,
              constructionData
            )
          : await bpConstructionService.create(constructionData);

        if (result.success) {
          this.successMessage = "Construction data saved successfully!";
          if (result.data?.data?.bp_construction_id) {
            this.constructionId = result.data.data.bp_construction_id;
            localStorage.setItem("bp_construction_id", this.constructionId);
          }
          return true;
        } else {
          this.errorMessage = result.message || "Failed to save data";
          return false;
        }
      } catch (error) {
        this.errorMessage = "An unexpected error occurred";
        return false;
      } finally {
        this.isLoading = false;
      }
    },

    async nextStep() {
      const { valid } = await this.$refs.form.validate();
      if (!valid) return;

      const saved = await this.saveConstructionData();
      if (saved) {
        const nextStep = parseInt(this.formStepValue) + 1;
        // Navigation based on step target
        if (nextStep === 3) this.$router.push("/applicant/bpcharacter");
      }
    },

    async loadConstructionData() {
      const savedId = localStorage.getItem("bp_construction_id");
      if (savedId) {
        try {
          const result = await bpConstructionService.getById(savedId);
          if (result.success && result.data?.data) {
            const data = result.data.data;
            this.constructionId = data.bp_construction_id;
            this.barangay = data.barangay;
            this.blkNo = data.blk_no;
            this.street = data.street;
            this.tctNo = data.tct_no;
            this.taxDecNo = data.current_tax_dec_no;
            this.selectedScope = data.scope_of_work
              ? data.scope_of_work.split(", ")
              : [];
          }
        } catch (e) {
          console.error("Error loading construction data:", e);
        }
      }
    },

    handleLogout() {
      localStorage.clear();
      this.$router.push("/login");
    },

    goToStep(index) {
      if (index === 0) this.$router.push("/applicant/applicantdetails");
    },
  },

  mounted() {
    this.loadConstructionData();
  },
});
</script>

<style scoped>
/* Scoped Layout Styles */
.no-scroll {
  overflow: hidden !important;
}

.v-main.no-scroll {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f6fafd;
}

.main-content-bg {
  background: #fafdff;
  height: 100%;
  overflow: hidden;
}

.stepper-fixed-container {
  flex: 0 0 auto;
  z-index: 10;
  background: #fafdff;
}

.scrollable-content {
  flex: 1 1 auto;
  overflow-y: auto;
  scrollbar-width: thin;
}

.scrollable-content::-webkit-scrollbar {
  width: 6px;
}
.scrollable-content::-webkit-scrollbar-thumb {
  background: #cfd8dc;
  border-radius: 10px;
}

/* UI Component Refinement */
.stepper-elevated {
  background: white;
  border-radius: 14px;
  box-shadow: 0 2px 6px 0 rgba(25, 118, 210, 0.06);
  padding: 15px 0;
}

.card-shadow {
  box-shadow: 0 2px 8px 0 rgba(25, 118, 210, 0.08);
  border-radius: 18px;
  border: 1.5px solid #e3eafc;
}

.card-section {
  background: #f7fafd;
  border-radius: 12px;
  border: 1px solid #e3eafc;
}

.section-title {
  color: #1976d2;
  font-weight: bold;
}

.btn-rounded {
  border-radius: 30px !important;
  min-width: 110px;
}

.input-label {
  font-weight: 500;
  color: #455a64;
  margin-bottom: 4px;
  font-size: 0.875rem;
}

/* Responsive Overrides */
@media (max-width: 600px) {
  :deep(.v-stepper-item__title) {
    display: none !important;
  }
}
</style>