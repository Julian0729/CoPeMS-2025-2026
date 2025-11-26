<template>
  <v-app>
    <v-main class="no-scroll">
      <v-container fluid class="pa-0 content-area fill-height">
        <v-row no-gutters class="fill-height">
          <v-col cols="12" md="3" class="pa-0">
            <v-card
              flat
              class="pa-4 quick-guide-card d-flex flex-column justify-space-between elevation-2"
              style="
                border-right: 1px solid #e0e0e0;
                height: 100%;
                background: #fcfcff;
              "
            >
              <div>
                <h4 class="mb-2 text-h5 font-weight-bold text-blue-darken-3">
                  Building Permit Application
                </h4>
                <div class="text-subtitle-2 mb-6 text-blue-grey-darken-1">
                  Follow these steps to complete your application
                </div>
                <v-card
                  v-for="(step, index) in sidebarSteps"
                  :key="index"
                  flat
                  :color="sidebarStep === index ? 'blue-lighten-5' : '#f6f8fa'"
                  class="d-flex align-center pa-3 mb-4 rounded-lg quick-guide-step"
                  :class="{
                    'clickable-step': index === 0,
                    'active-step': sidebarStep === index,
                  }"
                  @click="goToSidebarStep(index)"
                  elevation="sidebarStep === index ? 2 : 0"
                  style="transition: box-shadow 0.16s, background 0.16s"
                >
                  <v-avatar
                    :color="sidebarStep === index ? 'primary' : '#2563EB'"
                    size="36"
                    class="white--text mr-3 quick-guide-avatar"
                  >
                    <span class="text-h6 font-weight-bold">
                      {{ index + 1 }}
                    </span>
                  </v-avatar>
                  <div class="font-weight-bold text-body-1 step-label">
                    {{ step }}
                  </div>
                </v-card>
              </div>
              <v-spacer></v-spacer>
              <div class="mt-4">
                <v-btn
                  block
                  color="white"
                  outlined
                  to="/login"
                  class="text-capitalize font-weight-bold"
                  @click="handleLogout"
                >
                  <v-icon left>mdi-logout</v-icon>
                  Logout
                </v-btn>
              </div>
            </v-card>
          </v-col>

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
                      parseInt(formStepValue) >= 1
                        ? 'blue-darken-1'
                        : 'grey lighten-2'
                    "
                    class="stepper-item-custom"
                  ></v-stepper-item>
                  <v-divider
                    :thickness="3"
                    :style="{
                      'border-color':
                        parseInt(formStepValue) > 1 ? '#1976D2' : '#e0e0e0',
                    }"
                    class="mx-2"
                  ></v-divider>

                  <v-stepper-item
                    title="Construction Information"
                    value="2"
                    :complete="parseInt(formStepValue) > 2"
                    :color="
                      parseInt(formStepValue) >= 2
                        ? 'blue-darken-1'
                        : 'grey lighten-2'
                    "
                    class="stepper-item-custom"
                  ></v-stepper-item>
                  <v-divider
                    :thickness="3"
                    :style="{
                      'border-color':
                        parseInt(formStepValue) > 2 ? '#1976D2' : '#e0e0e0',
                    }"
                    class="mx-2"
                  ></v-divider>

                  <v-stepper-item
                    title="Use or Character of Occupancy"
                    value="3"
                    :complete="parseInt(formStepValue) > 3"
                    :color="
                      parseInt(formStepValue) >= 3
                        ? 'blue-darken-1'
                        : 'grey lighten-2'
                    "
                    class="stepper-item-custom"
                  ></v-stepper-item>
                  <v-divider
                    :thickness="3"
                    :style="{
                      'border-color':
                        parseInt(formStepValue) > 3 ? '#1976D2' : '#e0e0e0',
                    }"
                    class="mx-2"
                  ></v-divider>

                  <v-stepper-item
                    title="Signatories Details"
                    value="4"
                    :complete="parseInt(formStepValue) > 4"
                    :color="
                      parseInt(formStepValue) >= 4
                        ? 'blue-darken-1'
                        : 'grey lighten-2'
                    "
                    class="stepper-item-custom"
                  ></v-stepper-item>
                </v-stepper-header>
              </v-stepper>

              <v-card class="my-2 pa-4 card-shadow">
                <v-card-text>
                  <v-card class="mb-4 card-section">
                    <v-card-title
                      class="text-h6 card-title-responsive section-title"
                    >
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

                  <v-card class="card-section">
                    <v-card-title
                      class="text-h6 card-title-responsive section-title"
                    >
                      <v-icon left color="blue-darken-3" class="mr-2"
                        >mdi-file-document-outline</v-icon
                      >
                      PROJECT DETAILS
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-card-text>
                      <v-row dense>
                        <v-col cols="12" md="6">
                          <div class="input-label">Occupancy Classified</div>
                          <v-text-field
                            v-model="occupancyClassified"
                            variant="outlined"
                            density="comfortable"
                            prepend-inner-icon="mdi-clipboard-outline"
                            hide-details
                          ></v-text-field>
                        </v-col>
                        <v-col
                          cols="12"
                          md="6"
                          class="d-flex flex-column justify-center"
                        >
                          <div class="input-label mb-1">
                            Total Estimated Cost
                          </div>
                          <div
                            class="font-weight-bold text-h5 gradient-cost px-2 py-1"
                          >
                            ₱ {{ totalEstimatedCostComputed }}
                          </div>
                        </v-col>
                        <v-col cols="12" md="6">
                          <div class="input-label">Number of Units</div>
                          <v-text-field
                            v-model="numberOfUnits"
                            variant="outlined"
                            density="comfortable"
                            prepend-inner-icon="mdi-counter"
                            hide-details
                            @keypress="isNumber($event)"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="3">
                          <div class="input-label">Building</div>
                          <v-text-field
                            v-model="costBuilding"
                            variant="outlined"
                            density="comfortable"
                            prefix="₱"
                            prepend-inner-icon="mdi-home-city"
                            hide-details
                            @keypress="isNumber($event)"
                            @blur="formatNumber('costBuilding')"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="3">
                          <div class="input-label">Electrical</div>
                          <v-text-field
                            v-model="costElectrical"
                            variant="outlined"
                            density="comfortable"
                            prefix="₱"
                            prepend-inner-icon="mdi-flash"
                            hide-details
                            @keypress="isNumber($event)"
                            @blur="formatNumber('costElectrical')"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                          <div class="input-label">Number of Storey</div>
                          <v-text-field
                            v-model="numberOfStorey"
                            variant="outlined"
                            density="comfortable"
                            prepend-inner-icon="mdi-numeric"
                            hide-details
                            @keypress="isNumber($event)"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="3">
                          <div class="input-label">Mechanical</div>
                          <v-text-field
                            v-model="costMechanical"
                            variant="outlined"
                            density="comfortable"
                            prefix="₱"
                            prepend-inner-icon="mdi-cog"
                            hide-details
                            @keypress="isNumber($event)"
                            @blur="formatNumber('costMechanical')"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="3">
                          <div class="input-label">Electronics</div>
                          <v-text-field
                            v-model="costElectronics"
                            variant="outlined"
                            density="comfortable"
                            prefix="₱"
                            prepend-inner-icon="mdi-television"
                            hide-details
                            @keypress="isNumber($event)"
                            @blur="formatNumber('costElectronics')"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                          <div class="input-label">
                            Total Floor Area (sq. m)
                          </div>
                          <v-text-field
                            v-model="totalFloorArea"
                            variant="outlined"
                            density="comfortable"
                            prepend-inner-icon="mdi-ruler-square"
                            hide-details
                            @keypress="isNumber($event)"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="3">
                          <div class="input-label">Plumbing</div>
                          <v-text-field
                            v-model="costPlumbing"
                            variant="outlined"
                            density="comfortable"
                            prefix="₱"
                            prepend-inner-icon="mdi-pipe"
                            hide-details
                            @keypress="isNumber($event)"
                            @blur="formatNumber('costPlumbing')"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="3">
                          <div class="input-label">Others</div>
                          <v-text-field
                            v-model="costOthers"
                            variant="outlined"
                            density="comfortable"
                            prefix="₱"
                            prepend-inner-icon="mdi-dots-horizontal"
                            hide-details
                            @keypress="isNumber($event)"
                            @blur="formatNumber('costOthers')"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                          <div class="input-label">Lot Area (sq. m)</div>
                          <v-text-field
                            v-model="lotArea"
                            variant="outlined"
                            density="comfortable"
                            prepend-inner-icon="mdi-map"
                            hide-details
                            @keypress="isNumber($event)"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="3">
                          <div class="input-label">
                            Proposed Date of Construction
                          </div>
                          <v-text-field
                            v-model="proposedDate"
                            type="date"
                            variant="outlined"
                            density="comfortable"
                            prepend-inner-icon="mdi-calendar"
                            hide-details
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="3">
                          <div class="input-label">
                            Expected Date of Completion
                          </div>
                          <v-text-field
                            v-model="expectedDate"
                            type="date"
                            variant="outlined"
                            density="comfortable"
                            prepend-inner-icon="mdi-calendar-check"
                            hide-details
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-card>
                </v-card-text>
              </v-card>

              <div class="d-flex justify-end mt-6 mb-8">
                <v-btn
                  color="blue-grey-lighten-4"
                  class="mr-2 btn-rounded"
                  elevation="2"
                  to="/applicant/bpconstruction"
                  variant="tonal"
                >
                  <v-icon left>mdi-arrow-left</v-icon>Back
                </v-btn>
                <v-btn
                  color="blue-darken-3"
                  class="btn-rounded"
                  elevation="2"
                  @click="goToNextFormStep"
                  variant="elevated"
                >
                  Next<v-icon right>mdi-arrow-right</v-icon>
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

export default defineComponent({
  name: "BuildingPermitStep3",
  setup() {
    const router = useRouter();
    return { router };
  },
  data() {
    return {
      formStepValue: "3",
      selectedGroup: null,
      selectedCategory: null,
      occupancyClassified: "",
      numberOfUnits: "",
      numberOfStorey: "",
      totalFloorArea: "",
      lotArea: "",
      costBuilding: "",
      costElectrical: "",
      costMechanical: "",
      costElectronics: "",
      costPlumbing: "",
      costOthers: "",
      proposedDate: "",
      expectedDate: "",
      formValid: false,
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
    totalEstimatedCostComputed() {
      const costs = [
        this.costBuilding,
        this.costElectrical,
        this.costMechanical,
        this.costElectronics,
        this.costPlumbing,
        this.costOthers,
      ];
      const total = costs.reduce((sum, cost) => {
        const cleanedCost =
          parseFloat((cost || "0").toString().replace(/,/g, "")) || 0;
        return sum + cleanedCost;
      }, 0);

      return total.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    },
  },
  watch: {
    selectedGroup() {
      this.selectedCategory = null;
      this.validateForm();
    },
    selectedCategory: "validateForm",
    occupancyClassified: "validateForm",
    numberOfUnits: "validateForm",
    numberOfStorey: "validateForm",
    totalFloorArea: "validateForm",
    lotArea: "validateForm",
    costBuilding() {
      this.validateForm();
    },
    costElectrical() {
      this.validateForm();
    },
    costMechanical() {
      this.validateForm();
    },
    costElectronics() {
      this.validateForm();
    },
    costPlumbing() {
      this.validateForm();
    },
    costOthers() {
      this.validateForm();
    },
    proposedDate: "validateForm",
    expectedDate: "validateForm",
  },
  mounted() {
    this.validateForm();
  },
  methods: {
    isNumber(event) {
      const charCode = event.which ? event.which : event.keyCode;
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        event.preventDefault();
      }
    },
    formatNumber(fieldName) {
      let value = this[fieldName] ? this[fieldName].replace(/,/g, "") : "";
      value = value.replace(/[^\d.]/g, "");
      const parts = value.split(".");
      let integer = parts[0];
      const decimal = parts[1];

      integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

      if (decimal !== undefined) {
        this[fieldName] = integer + "." + decimal.slice(0, 2);
      } else {
        this[fieldName] = integer;
      }
      this.validateForm();
    },
    validateForm() {
      const isDropdownSelected =
        this.selectedGroup !== null && this.selectedCategory !== null;

      const projectDetailsFilled =
        this.occupancyClassified.trim() !== "" &&
        this.numberOfUnits.trim() !== "" &&
        this.numberOfStorey.trim() !== "" &&
        this.totalFloorArea.trim() !== "" &&
        this.lotArea.trim() !== "" &&
        this.proposedDate.trim() !== "" &&
        this.expectedDate.trim() !== "";

      const totalCostValue =
        parseFloat(this.totalEstimatedCostComputed.replace(/,/g, "")) || 0;
      const isTotalCostValid = totalCostValue > 0;

      this.formValid =
        isDropdownSelected && projectDetailsFilled && isTotalCostValid;
    },
    async goToNextFormStep() {
      if (this.$refs.form) {
        const { valid } = await this.$refs.form.validate();
        if (valid) {
          this.formStepValue = "4";
          this.router.push("/Applicant/bpsignatories");
        }
      }
    },

    handleLogout() {
      console.log("User logged out");
      this.router.push("/login");
    },
    goToSidebarStep(index) {
      this.sidebarStep = index;
      if (index === 0) {
        console.log("Navigating to step 1 (Applicant Details)...");
        this.router.push("/applicant/applicantdetails");
      }
    },
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
  overflow-y: auto;
  scrollbar-width: none; /* Firefox */
}

.content-area::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Edge */
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
  background: linear-gradient(90deg, #1976d2 20%, #1565c0 80%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.gradient-cost {
  background: linear-gradient(90deg, #e3f2fd 0, #bbdefb 100%);
  border-radius: 8px;
  color: #1976d2 !important;
  display: inline-block;
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
  margin-bottom: 18px;
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