<template>
  <v-app>
    <v-main class="no-scroll">
      <v-container fluid class="pa-0 content-area">
        <v-row no-gutters class="fill-height">
          <v-col cols="12" md="3" class="pa-0">
            <v-card
              flat
              class="pa-4 quick-guide-card d-flex flex-column justify-space-between elevation-2"
              style="border-right: 1px solid #e0e0e0; height: 100%; background: #fcfcff"
            >
              <div>
                <h4 class="mb-2 text-h5 font-weight-bold text-blue-darken-3">
                  Occupancy Permit Application
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
                  @click="goToStep(index)"
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
                  variant="flat"
                  to="/login"
                  class="text-capitalize font-weight-bold logout-btn-white"
                  @click="handleLogout"
                >
                  <v-icon left color="black">mdi-logout</v-icon>
                  <span style="color: #222; font-weight: bold">Logout</span>
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
                  <div
                    v-for="(step, index) in formSteps"
                    :key="index"
                    class="d-flex align-center"
                  >
                    <v-stepper-item
                      :title="step.title"
                      :value="step.value"
                      :complete="formStepValue > step.value"
                      :color="
                        formStepValue >= step.value ? 'blue-darken-1' : 'grey lighten-2'
                      "
                      class="stepper-item-custom"
                    ></v-stepper-item>
                    <v-divider
                      v-if="index < formSteps.length - 1"
                      :thickness="3"
                      :style="{
                        'border-color':
                          formStepValue > step.value ? '#1976D2' : '#e0e0e0',
                      }"
                      class="mx-2"
                    ></v-divider>
                  </div>
                </v-stepper-header>
              </v-stepper>
              <v-card class="my-2 pa-4 card-shadow">
                <v-card-title class="text-h6 card-title-responsive mb-2">
                  APPLICATION DETAILS
                </v-card-title>
                <v-divider class="mb-4"></v-divider>
                <v-card-text>
                  <v-form ref="form" v-model="formValid">
                    <v-card class="mb-4 card-section">
                      <v-card-title class="text-h6 card-title-responsive section-title">
                        <v-icon left color="blue-darken-3" class="mr-2"
                          >mdi-clipboard-text</v-icon
                        >
                        Project Details
                      </v-card-title>
                      <v-divider></v-divider>
                      <v-card-text>
                        <v-row dense>
                          <v-col cols="12">
                            <div class="plain-label">Project Name:</div>
                            <div class="plain-value">{{ projectName }}</div>
                          </v-col>
                        </v-row>
                      </v-card-text>
                    </v-card>
                    <v-card class="mb-4 card-section">
                      <v-card-title class="text-h6 card-title-responsive section-title">
                        <v-icon left color="blue-darken-3" class="mr-2"
                          >mdi-map-marker</v-icon
                        >
                        LOCATION OF PROJECT
                      </v-card-title>
                      <v-divider></v-divider>
                      <v-card-text>
                        <v-row dense>
                          <v-col cols="12" sm="4">
                            <div class="plain-label">BLK. No.:</div>
                            <div class="plain-value">{{ blkNo }}</div>
                          </v-col>
                          <v-col cols="12" sm="4">
                            <div class="plain-label">Street:</div>
                            <div class="plain-value">{{ street }}</div>
                          </v-col>
                          <v-col cols="12" sm="4">
                            <div class="plain-label">Barangay:</div>
                            <div class="plain-value">{{ barangay || "N/A" }}</div>
                          </v-col>
                          <v-col cols="12" sm="12">
                            <div class="plain-label">City/Municipal of:</div>
                            <div class="plain-value">{{ cityMunicipality }}</div>
                          </v-col>
                        </v-row>
                      </v-card-text>
                    </v-card>
                    <v-card class="mb-4 card-section">
                      <v-card-title class="text-h6 card-title-responsive section-title">
                        <v-icon left color="blue-darken-3" class="mr-2"
                          >mdi-home-group</v-icon
                        >
                        USE OR CHARACTER OF OCCUPANCY
                      </v-card-title>
                      <v-divider></v-divider>
                      <v-card-text>
                        <v-row dense>
                          <v-col cols="12">
                            <div class="plain-label">Group:</div>
                            <div class="plain-value">{{ occupancyGroup }}</div>
                          </v-col>
                        </v-row>
                      </v-card-text>
                    </v-card>
                    <v-card class="mb-4 card-section">
                      <v-card-title class="text-h6 card-title-responsive section-title">
                        <v-icon left color="blue-darken-3" class="mr-2"
                          >mdi-file-document-multiple</v-icon
                        >
                        PROJECT DETAILS
                      </v-card-title>
                      <v-divider></v-divider>
                      <v-card-text>
                        <v-row dense>
                          <v-col cols="12" md="6">
                            <div class="plain-label">OCCUPANCY CLASSIFIED:</div>
                            <div class="plain-value">{{ occupancyClassified }}</div>
                          </v-col>
                          <v-col cols="12" md="6">
                            <div class="plain-label">Date of Completion:</div>
                            <div class="plain-value">{{ dateOfCompletion }}</div>
                          </v-col>
                          <v-col cols="12" md="6">
                            <div class="plain-label">NO. OF UNITS:</div>
                            <div class="plain-value">{{ numberOfUnits }}</div>
                          </v-col>
                          <v-col cols="12" md="6">
                            <div class="plain-label">NO. OF STOREYS:</div>
                            <div class="plain-value">{{ numberOfStoreys }}</div>
                          </v-col>
                          <v-col cols="12" md="12">
                            <div class="plain-label">TOTAL FLOOR AREA (SQ. M):</div>
                            <div class="plain-value">{{ totalFloorArea }}</div>
                          </v-col>
                        </v-row>
                      </v-card-text>
                    </v-card>
                  </v-form>
                </v-card-text>
              </v-card>
              <div class="d-flex justify-end mt-6 mb-8">
                <v-btn
                  color="blue-grey-4"
                  class="btn-rounded mr-2"
                  elevation="2"
                  @click="goBack"
                  variant="tonal"
                >
                  <v-icon left>mdi-arrow-left</v-icon>Back
                </v-btn>
                <v-btn
                  color="blue-darken-3"
                  class="btn-rounded"
                  elevation="2"
                  @click="goNext"
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

export default defineComponent({
  name: "OccupancyPermitLocationPage",
  data() {
    return {
      formStepValue: 3,
      formSteps: [
        { title: "Application", value: 1 },
        { title: "Owner/Applicant", value: 2 },
        { title: "Application Details", value: 3 },
        { title: "Signatories Details", value: 4 },
      ],
      sidebarStep: 0,
      sidebarSteps: [
        "Fill up the Unified Application Form",
        "Download Filled-up Unified Application Form and Completion Permits",
      ],

      formValid: false,
      formSubmitted: false,
      projectName: "Proposed Residential Building - 3 Storey",
      blkNo: "Lot 10",
      street: "Emerald St.",
      barangay: "Concepcion Grande",
      cityMunicipality: "Naga City",
      occupancyGroup: "Group A (Residential)",
      occupancyClassified: "Single-Family Dwelling",
      numberOfUnits: "1",
      numberOfStoreys: "3",
      totalFloorArea: "150.75",
      dateOfCompletion: "2024-09-01",
      rules: {
        required: (value) => !!value || "This field is required.",
      },
      selectedApplicationType: null,
      validationFailed: false,
    };
  },
  methods: {
    async validateAndProceed() {
      const { valid } = await this.$refs.form.validate();

      if (valid) {
        this.validationFailed = false;
        this.formStepValue = 2;
        this.$router.push("/applicantlayout/constructioninformation");
      } else {
        this.validationFailed = true;
      }
    },

    handleLogout() {
      console.log("User logged out");
    },
    goToStep(index) {
      this.sidebarStep = index;
      if (index === 0) {
        console.log("Navigating to step 1 details...");
      }
    },

    goNext() {
      this.$router.push("/applicant/OPsignatories");
    },
    goBack() {
      this.$router.push("/applicant/OPowner");
    },
  },
  watch: {
    selectedApplicationType(newValue) {
      if (newValue !== null && this.validationFailed) {
        this.validationFailed = false;
      }
    },
  },
});
</script>

<style scoped>
.plain-label {
  font-size: 0.88rem;
  color: #444;
  font-weight: 500;
  margin-bottom: 2px;
}
.plain-value {
  font-size: 1.08rem;
  color: #222;

  font-weight: 700;
  min-height: 32px;
  margin-bottom: 18px;
  word-break: break-word;
}

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
}
.main-content-bg {
  background: #fafdff;
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

.error-card-wrapper {
  border: 1.5px solid #ef9a9a !important;
}

.card-section {
  background: #f7fafd;
  border-radius: 12px;
  border: 1px solid #e3eafc;
}

.error-section {
  background: #ffebee !important;
  border: 1px solid #e57373 !important;
}

.section-title {
  color: #1976d2;
  font-weight: bold;
  font-size: 1.09rem;
  letter-spacing: 0.01em;
}

.custom-radio-card {
  border: 1px solid #e0e0e0;
  cursor: pointer;
  transition: border-color 0.2s, box-shadow 0.2s;
  border-radius: 10px;
}

.custom-radio-card:hover {
  border-color: #bbdefb;
  box-shadow: 0 0 8px rgba(25, 118, 210, 0.1);
}

.card-selected {
  border: 2px solid #1976d2;
  box-shadow: 0 0 12px rgba(25, 118, 210, 0.2);
  background-color: #e3f2fd !important;
}
.textfield-50 .v-input__control {
  min-height: 50px;
  border-radius: 8px;
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
