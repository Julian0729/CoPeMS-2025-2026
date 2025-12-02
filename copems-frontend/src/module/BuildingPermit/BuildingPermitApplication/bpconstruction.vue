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

          <v-col cols="12" md="9" class="main-content-bg pa-6">
            <v-container fluid class="px-4 mx-auto" style="max-width: 1300px">
              <v-stepper
                v-model="formStepValue"
                alt-labels
                flat
                class="mb-4 mt-2 stepper-elevated"
              >
                <v-stepper-header>
                  <v-stepper-item
                    title="Building Owner Information"
                    value="1"
                    :complete="parseInt(formStepValue) > 1"
                    :color="
                      parseInt(formStepValue) >= 1 ? 'blue-darken-1' : 'grey lighten-2'
                    "
                    class="stepper-item-custom"
                  />
                  <v-divider
                    :thickness="3"
                    :style="{
                      'border-color': parseInt(formStepValue) > 1 ? '#1976D2' : '#e0e0e0',
                    }"
                    class="mx-2"
                  ></v-divider>
                  <v-stepper-item
                    title="Construction Information"
                    value="2"
                    :complete="parseInt(formStepValue) > 2"
                    :color="
                      parseInt(formStepValue) >= 2 ? 'blue-darken-1' : 'grey lighten-2'
                    "
                    class="stepper-item-custom"
                  />
                  <v-divider
                    :thickness="3"
                    :style="{
                      'border-color': parseInt(formStepValue) > 2 ? '#1976D2' : '#e0e0e0',
                    }"
                    class="mx-2"
                  ></v-divider>
                  <v-stepper-item
                    title="Use or Character of Occupancy"
                    value="3"
                    :complete="parseInt(formStepValue) > 3"
                    :color="
                      parseInt(formStepValue) >= 3 ? 'blue-darken-1' : 'grey lighten-2'
                    "
                    class="stepper-item-custom"
                  />
                  <v-divider
                    :thickness="3"
                    :style="{
                      'border-color': parseInt(formStepValue) > 3 ? '#1976D2' : '#e0e0e0',
                    }"
                    class="mx-2"
                  ></v-divider>
                  <v-stepper-item
                    title="Signatories Details"
                    value="4"
                    :complete="parseInt(formStepValue) > 4"
                    :color="
                      parseInt(formStepValue) >= 4 ? 'blue-darken-1' : 'grey lighten-2'
                    "
                    class="stepper-item-custom"
                  />
                </v-stepper-header>
              </v-stepper>

              <v-card class="my-2 pa-4 card-shadow">
                <!-- Success/Error Messages -->
                <v-alert
                  v-if="successMessage"
                  type="success"
                  dismissible
                  @click:close="successMessage = ''"
                  class="mb-4"
                >
                  {{ successMessage }}
                </v-alert>

                <v-alert
                  v-if="errorMessage"
                  type="error"
                  dismissible
                  @click:close="errorMessage = ''"
                  class="mb-4"
                >
                  {{ errorMessage }}
                </v-alert>

                <v-card-text>
                  <v-form ref="form" v-model="formValid">
                    <div v-if="formStepValue === '2'">
                      <v-card class="mb-4 card-section">
                        <v-card-title class="text-h6 card-title-responsive section-title">
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
                                style="min-height: 50px"
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
                                style="min-height: 50px"
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
                                style="min-height: 50px"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                        </v-card-text>
                      </v-card>

                      <v-card class="mb-4 card-section">
                        <v-card-title class="text-h6 card-title-responsive section-title">
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
                                style="min-height: 50px"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6">
                              <div class="input-label">Current Tax Dec No.</div>
                              <v-text-field
                                v-model="taxDecNo"
                                variant="outlined"
                                density="comfortable"
                                :rules="[rules.required]"
                                prepend-inner-icon="mdi-numeric"
                                color="blue-darken-3"
                                style="min-height: 50px"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                        </v-card-text>
                      </v-card>

                      <v-card class="mb-4 card-section">
                        <v-card-title class="text-h6 card-title-responsive section-title">
                          <v-icon left color="blue-darken-3" class="mr-2"
                            >mdi-hammer-wrench</v-icon
                          >
                          SCOPE OF WORK
                        </v-card-title>
                        <v-divider></v-divider>
                        <v-card-text>
                          <v-row dense>
                            <v-col cols="12">
                              <div class="input-label">Select Scope of Work</div>
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
                                style="min-height: 50px"
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
                                class="my-1"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                        </v-card-text>
                      </v-card>
                    </div>

                    <v-card class="mb-4 card-section" v-if="formStepValue === '3'">
                      <v-card-title class="text-h6 card-title-responsive section-title">
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
                              hide-details
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
                              hide-details
                            ></v-select>
                          </v-col>
                        </v-row>
                      </v-card-text>
                    </v-card>
                  </v-form>
                </v-card-text>
              </v-card>

              <div class="d-flex justify-end mt-6 mb-8">
                <router-link to="/applicant/bpowner" style="text-decoration: none">
                  <v-btn
                    color="blue-grey-lighten-4"
                    class="mr-2 btn-rounded"
                    elevation="2"
                    variant="tonal"
                  >
                    <v-icon left>mdi-arrow-left</v-icon>Back
                  </v-btn>
                </router-link>
                <v-btn
                  color="blue-darken-3"
                  class="btn-rounded"
                  elevation="2"
                  @click="nextStep"
                  variant="elevated"
                  :loading="isLoading"
                  :disabled="isLoading"
                >
                  {{ isLoading ? "Saving..." : "Next"
                  }}<v-icon right>mdi-arrow-right</v-icon>
                </v-btn>
              </div>
            </v-container>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
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
      formStepValue: "2",
      formValid: false,
      formSubmitted: false,
      barangay: null,
      blkNo: "",
      street: "",
      cityMunicipality: "Naga City",

      tctNo: "",
      taxDecNo: "",

      // Loading and error states
      isLoading: false,
      errorMessage: "",
      successMessage: "",
      constructionId: null, // Store the created record ID

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
      selectedGroup: null,
      selectedCategory: null,
      groupCategoryData: {
        "GROUP A: RESIDENTIAL (DWELLINGS)": [
          "SINGLE",
          "DUPLEX",
          "RESIDENTIAL R-1, R-2",
          "OTHERS",
        ],
        "GROUP B: RESIDENTIAL": ["HOTEL", "MOTEL", "TOWNHOUSE", "DORMITORY", "OTHERS"],
        "GROUP C: EDUCATIONAL & RECREATIONAL": [
          "SCHOOL BUILDING",
          "SCHOOL AUDITORIUM, GYMNASIUM",
          "OTHERS",
        ],
        "GROUP E: COMMERCIAL": ["BANK", "STORE", "SHOPPING CENTER/MALL", "OTHERS"],
        "GROUP F: LIGHT INDUSTRIAL": ["FACTORY/PLANT", "OTHERS"],
        "GROUP G: MEDIUM INDUSTRIAL": ["STORAGE/WAREHOUSE", "FACTORY", "OTHERS"],
        "GROUP H: ASSEMBLY": ["THEATER, AUDITORIUM", "OTHERS"],
        "GROUP I: ASSEMBLY": ["COLISEUM, SPORTS COMPLEX", "OTHERS"],
        "GROUP J: AGRICULTURAL & ACCESSORIES": [
          "AGRICULTURAL STRUCTURES",
          "ACCESSORIES",
          "OTHERS",
        ],
      },

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
      return this.selectedGroup ? this.groupCategoryData[this.selectedGroup] : [];
    },
  },
  watch: {
    selectedGroup() {
      this.selectedCategory = null;
    },
  },
  methods: {
    async saveConstructionData() {
      try {
        this.isLoading = true;
        this.errorMessage = "";
        this.successMessage = "";

        const constructionData = {
          barangay: this.barangay,
          blk_no: this.blkNo,
          street: this.street,
          tct_no: this.tctNo,
          current_tax_dec_no: this.taxDecNo,
          scope_of_work: this.selectedScope.join(", "), // Convert array to string
        };

        let result;
        if (this.constructionId) {
          // Update existing record
          result = await bpConstructionService.update(
            this.constructionId,
            constructionData
          );
        } else {
          // Create new record
          result = await bpConstructionService.create(constructionData);
        }

        if (result.success) {
          this.successMessage = "Construction data saved successfully!";
          if (result.data?.data?.bp_construction_id) {
            this.constructionId = result.data.data.bp_construction_id;
          }

          // Store the construction ID in localStorage for later use
          localStorage.setItem("bp_construction_id", this.constructionId);

          return true;
        } else {
          this.errorMessage = result.message || "Failed to save construction data";
          console.error("Error saving construction data:", result.error);
          return false;
        }
      } catch (error) {
        this.errorMessage = "An unexpected error occurred";
        console.error("Error in saveConstructionData:", error);
        return false;
      } finally {
        this.isLoading = false;
      }
    },

    async nextStep() {
      let validationPassed = true;
      if (this.formStepValue === "2") {
        const { valid } = await this.$refs.form.validate();
        validationPassed = valid;

        if (validationPassed) {
          // Save construction data before moving to next step
          const saved = await this.saveConstructionData();
          if (!saved) {
            // Don't proceed if save failed
            return;
          }
        }
      }

      if (validationPassed) {
        const nextStepNumber = parseInt(this.formStepValue) + 1;

        this.formStepValue = nextStepNumber.toString();

        if (nextStepNumber === 3) {
          this.$router.push("/applicant/bpcharacter");
        }
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
            this.selectedScope = data.scope_of_work ? data.scope_of_work.split(", ") : [];
          }
        } catch (error) {
          console.error("Error loading construction data:", error);
        }
      }
    },

    handleLogout() {
      console.log("User logged out");
    },
    goToStep(index) {
      this.sidebarStep = index;
      if (index === 0) {
        console.log("Navigating to step 1 details...");
        this.$router.push("/applicant/applicantdetails");
      }
    },
  },
  mounted() {
    // Load existing construction data if available
    this.loadConstructionData();
  },
});
</script>

<style scoped>
.no-scroll {
  overflow: hidden !important;
}
.v-main.no-scroll {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f6fafd;
}
.content-area {
  flex: 1;
  overflow: hidden;
  display: flex;
}
.content-area .v-row {
  width: 100%;
}
.main-content-bg {
  background: #fafdff;
  overflow-y: auto;
  height: 100%;
  scrollbar-width: none; /* Firefox */
}

.main-content-bg::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Edge */
}

.quick-guide-card {
  min-height: 100%;
  background: #fcfcff;
  border-right: 1px solid #e0e0e0;
}
.quick-guide-step {
  transition: background 0.2s, box-shadow 0.2s;
}
.quick-guide-step:hover {
  background: #e3f0ff !important;
  box-shadow: 0 2px 12px rgba(59, 130, 246, 0.08);
}
.active-step {
  background: #e7efff !important;
  box-shadow: 0 4px 20px rgba(59, 130, 246, 0.12);
}
.quick-guide-avatar {
  transition: background 0.2s;
}
.step-label {
  color: #23407c;
}
.clickable-step {
  cursor: pointer;
}

.gradient-text {
  background: linear-gradient(90deg, #1976d2 10%, #0000cc 90%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.stepper-elevated {
  background: white;
  border-radius: 14px;
  box-shadow: 0 2px 6px 0 rgba(25, 118, 210, 0.06);
  padding: 20px 0;
}

.stepper-item-custom .v-stepper-item__step {
  box-shadow: 0 1px 4px 0 rgba(25, 118, 210, 0.13);
  transition: background 0.2s;
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
  font-size: 1.09rem;
  letter-spacing: 0.01em;
}

.input-label {
  font-size: 0.85rem;
  color: #2a2a2a;
  margin-bottom: 4px;
  font-weight: 500;
}

.btn-rounded {
  border-radius: 30px !important;
  min-width: 110px;
  font-weight: 600;
  letter-spacing: 0.03em;
}

.page-title-responsive {
  font-size: 1.4rem;
  letter-spacing: 0.02em;
}

@media (max-width: 1200px) {
  .page-title-responsive {
    font-size: 1.12rem !important;
  }
}

@media (max-width: 960px) {
  .page-title-responsive {
    font-size: 1rem !important;
  }
  .content-area {
    overflow-y: auto;
  }
  .v-main.no-scroll {
    height: auto;
  }
  .quick-guide-card {
    height: auto !important;
    min-height: auto;
  }
}

@media (max-width: 800px) {
  .card-title-responsive {
    font-size: 1.02rem !important;
  }
  .section-title {
    font-size: 0.92rem !important;
  }
}

@media (max-width: 600px) {
  .v-stepper-item .v-stepper-item__title {
    display: none;
  }
  .page-title-responsive {
    font-size: 0.95rem !important;
  }
  .card-title-responsive,
  .section-title {
    font-size: 0.98rem !important;
  }
  .card-shadow,
  .card-section {
    padding: 6px !important;
  }
  .step-label {
    font-size: 1rem !important;
  }
  .main-content-bg {
    padding: 12px !important;
  }
}

@media (max-width: 480px) {
  .v-card-title {
    font-size: 0.88rem !important;
  }
  .btn-rounded {
    min-width: 90px;
    font-size: 0.9rem;
  }
}
</style>
