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
                  :elevation="sidebarStep === index ? 2 : 0"
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
                <v-card-text>
                  <v-form ref="form">
                    <v-card class="mb-4 card-section">
                      <v-card-title class="text-h6 card-title-responsive section-title">
                        <v-icon left color="blue-darken-3" class="mr-2"
                          >mdi-account-hard-hat</v-icon
                        >
                        ENGINEER'S INFORMATION
                      </v-card-title>
                      <v-divider></v-divider>
                      <v-card-text>
                        <v-row dense>
                          <v-col cols="12" sm="4">
                            <div class="input-label">First Name</div>
                            <v-text-field
                              v-model="engineerFirstName"
                              variant="plain"
                              density="compact"
                              style="height: 50px; min-height: 50px"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="4">
                            <div class="input-label">Last Name</div>
                            <v-text-field
                              v-model="engineerLastName"
                              variant="plain"
                              density="compact"
                              style="height: 50px; min-height: 50px"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="4">
                            <div class="input-label">Middle Name</div>
                            <v-text-field
                              v-model="engineerMiddleName"
                              variant="plain"
                              density="compact"
                              style="height: 50px; min-height: 50px"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-card-text>
                    </v-card>

                    <v-card class="mb-4 card-section">
                      <v-card-title class="text-h6 card-title-responsive section-title">
                        <v-icon left color="blue-darken-3" class="mr-2"
                          >mdi-card-account-details</v-icon
                        >
                        PROFESSIONAL'S VALID ID
                      </v-card-title>
                      <v-divider></v-divider>
                      <v-card-text>
                        <v-row dense>
                          <v-col cols="12" sm="6">
                            <div class="input-label">PRC No.</div>
                            <v-text-field
                              v-model="prcNo"
                              variant="plain"
                              density="compact"
                              :maxlength="7"
                              style="height: 50px; min-height: 50px"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6">
                            <div class="input-label">Validity</div>
                            <v-menu
                              v-model="validityMenu"
                              :close-on-content-click="false"
                              transition="scale-transition"
                              min-width="auto"
                            >
                              <template v-slot:activator="{ props }">
                                <v-text-field
                                  v-model="validity"
                                  variant="plain"
                                  density="compact"
                                  style="height: 50px; min-height: 50px"
                                  v-bind="props"
                                ></v-text-field>
                              </template>
                              <v-date-picker
                                v-model="validity"
                                @update:model-value="validityMenu = false"
                              ></v-date-picker>
                            </v-menu>
                          </v-col>
                          <v-col cols="12" sm="4">
                            <div class="input-label">PTR No.</div>
                            <v-text-field
                              v-model="ptrNo"
                              variant="plain"
                              density="compact"
                              :maxlength="8"
                              style="height: 50px; min-height: 50px"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="4">
                            <div class="input-label">Date Issued</div>
                            <v-menu
                              v-model="dateIssuedMenu"
                              :close-on-content-click="false"
                              transition="scale-transition"
                              min-width="auto"
                            >
                              <template v-slot:activator="{ props }">
                                <v-text-field
                                  v-model="dateIssued"
                                  variant="plain"
                                  density="compact"
                                  style="height: 50px; min-height: 50px"
                                  v-bind="props"
                                ></v-text-field>
                              </template>
                              <v-date-picker
                                v-model="dateIssued"
                                @update:model-value="dateIssuedMenu = false"
                              ></v-date-picker>
                            </v-menu>
                          </v-col>
                          <v-col cols="12" sm="4">
                            <div class="input-label">Issued At</div>
                            <v-text-field
                              v-model="issuedAt"
                              variant="plain"
                              density="compact"
                              style="height: 50px; min-height: 50px"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6">
                            <div class="input-label">TIN</div>
                            <v-text-field
                              v-model="tin"
                              variant="plain"
                              density="compact"
                              :maxlength="15"
                              style="height: 50px; min-height: 50px"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-card-text>
                    </v-card>

                    <v-card class="mb-4 card-section">
                      <v-card-title class="text-h6 card-title-responsive section-title">
                        <v-icon left color="blue-darken-3" class="mr-2"
                          >mdi-map-marker</v-icon
                        >
                        ADDRESS
                      </v-card-title>
                      <v-divider></v-divider>
                      <v-card-text>
                        <v-row dense>
                          <v-col cols="12" sm="4">
                            <div class="input-label">Province</div>
                            <v-select
                              v-model="province"
                              :items="provinces"
                              variant="plain"
                              density="compact"
                              style="height: 50px; min-height: 50px"
                            ></v-select>
                          </v-col>
                          <v-col cols="12" sm="4">
                            <div class="input-label">Municipality</div>
                            <v-text-field
                              v-model="municipality"
                              variant="plain"
                              density="compact"
                              style="height: 50px; min-height: 50px"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="4">
                            <div class="input-label">Barangay</div>
                            <v-select
                              v-model="barangay"
                              :items="barangays"
                              variant="plain"
                              density="compact"
                              style="height: 50px; min-height: 50px"
                            ></v-select>
                          </v-col>
                          <v-col cols="12" sm="4">
                            <div class="input-label">Block No.</div>
                            <v-text-field
                              v-model="blkNo"
                              variant="plain"
                              density="compact"
                              style="height: 50px; min-height: 50px"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="8">
                            <div class="input-label">Street</div>
                            <v-text-field
                              v-model="street"
                              variant="plain"
                              density="compact"
                              style="height: 50px; min-height: 50px"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-card-text>
                    </v-card>

                    <v-card class="mb-4 card-section">
                      <v-card-title class="text-h6 card-title-responsive section-title">
                        <v-icon left color="blue-darken-3" class="mr-2"
                          >mdi-account</v-icon
                        >
                        APPLICANT'S INFORMATION
                      </v-card-title>
                      <v-divider></v-divider>
                      <v-card-text>
                        <v-row dense>
                          <v-col cols="12" sm="4">
                            <div class="input-label">Last Name</div>
                            <v-text-field
                              v-model="applicantLastName"
                              variant="plain"
                              density="compact"
                              style="height: 50px; min-height: 50px"
                              readonly
                              disabled
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="4">
                            <div class="input-label">First Name</div>
                            <v-text-field
                              v-model="applicantFirstName"
                              variant="plain"
                              density="compact"
                              style="height: 50px; min-height: 50px"
                              disabled
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="4">
                            <div class="input-label">M.I.</div>
                            <v-text-field
                              v-model="applicantMiddleInitial"
                              variant="plain"
                              density="compact"
                              style="height: 50px; min-height: 50px"
                              disabled
                            ></v-text-field>
                          </v-col>
                        </v-row>
                        <v-row dense>
                          <v-col cols="12" sm="4">
                            <div class="input-label">Province</div>
                            <v-select
                              v-model="applicantProvince"
                              :items="provinces"
                              variant="plain"
                              density="compact"
                              style="height: 50px; min-height: 50px"
                              disabled
                            ></v-select>
                          </v-col>
                          <v-col cols="12" sm="4">
                            <div class="input-label">City/Municipality</div>
                            <v-text-field
                              v-model="applicantMunicipality"
                              variant="plain"
                              density="compact"
                              style="height: 50px; min-height: 50px"
                              disabled
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="4">
                            <div class="input-label">Barangay</div>
                            <v-select
                              v-model="applicantBarangay"
                              :items="barangays"
                              variant="plain"
                              density="compact"
                              style="height: 50px; min-height: 50px"
                              disabled
                            ></v-select>
                          </v-col>
                          <v-col cols="12" sm="4">
                            <div class="input-label">House No.</div>
                            <v-text-field
                              v-model="applicantHouseNo"
                              variant="plain"
                              density="compact"
                              style="height: 50px; min-height: 50px"
                              disabled
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="8">
                            <div class="input-label">Street</div>
                            <v-text-field
                              v-model="applicantStreet"
                              variant="plain"
                              density="compact"
                              style="height: 50px; min-height: 50px"
                              disabled
                            ></v-text-field>
                          </v-col>
                        </v-row>
                        <v-row dense>
                          <v-col cols="12" sm="4">
                            <div class="input-label">Gov't Issued ID No.</div>
                            <v-text-field
                              v-model="applicantGovIdNo"
                              variant="plain"
                              density="compact"
                              style="height: 50px; min-height: 50px"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="4">
                            <div class="input-label">Date Issued</div>
                            <v-text-field
                              v-model="applicantIdDateIssued"
                              variant="plain"
                              density="compact"
                              style="height: 50px; min-height: 50px"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="4">
                            <div class="input-label">Place Issued</div>
                            <v-text-field
                              v-model="applicantIdPlaceIssued"
                              variant="plain"
                              density="compact"
                              style="height: 50px; min-height: 50px"
                            ></v-text-field>
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
                  @click="openSuccessDialog"
                  variant="elevated"
                >
                  SUBMIT
                </v-btn>
              </div>
            </v-container>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <v-dialog v-model="dialog" max-width="400" persistent>
      <v-card class="pa-4 text-center rounded-xl" elevation="10">
        <v-card-text>
          <div class="mb-4">
            <v-icon color="green" size="72"> mdi-check-circle </v-icon>
          </div>
          <h3 class="text-h6 font-weight-bold mb-4">
            Application Submitted Successfully!
          </h3>
          <p class="text-body-1 mb-6 text-grey-darken-1">
            Your occupancy permit application has been submitted.
          </p>

          <v-card flat class="pa-4 mx-auto mb-6 submission-number-card">
            <p class="text-subtitle-1 mb-1">Your Application Number</p>
            <p class="text-h5 font-weight-black text-blue-darken-3">
              {{ applicationNumber }}
            </p>
          </v-card>

          <p class="text-caption text-grey-darken-1 mb-6">
            Please keep this number for tracking your application status.
          </p>

          <v-btn
            color="blue-darken-3"
            block
            @click="closeDialog"
            class="text-capitalize font-weight-bold"
            size="large"
            to="/applicant/FormsSection"
          >
            SAVE
          </v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "OccupancySignatoriesPage",
  data() {
    return {
      // Existing data properties...
      formStepValue: 4,
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
      selectedApplicationType: null,
      validationFailed: false,
      engineerFirstName: "",
      engineerLastName: "",
      engineerMiddleName: "",
      prcNo: "",
      validity: new Date().toISOString().substr(0, 10),
      validityMenu: false,
      ptrNo: "",
      dateIssued: new Date().toISOString().substr(0, 10),
      dateIssuedMenu: false,
      issuedAt: "",
      tin: "",

      province: "",
      municipality: "",
      barangay: "",
      blkNo: "",
      street: "",

      applicantFirstName: "",
      applicantLastName: "",
      applicantMiddleInitial: "",
      applicantProvince: "",
      applicantMunicipality: "",
      applicantBarangay: "",
      applicantHouseNo: "",
      applicantStreet: "",
      applicantGovIdNo: "",
      applicantIdDateIssued: "",
      applicantIdPlaceIssued: "",

      provinces: ["Province A", "Province B"],
      barangays: ["Barangay 1", "Barangay 2"],

      dialog: false,
      applicationNumber: "",
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
    goBack() {
      this.$router.push("/applicant/OPlocation");
    },

    async openSuccessDialog() {
      const year = new Date().getFullYear();
      const randomNumber = Math.floor(1000 + Math.random() * 9000);
      this.applicationNumber = `OP-${year}-${randomNumber}`;

      this.dialog = true;

      console.log("Application submitted, dialog displayed.");
    },

    closeDialog() {
      this.dialog = false;
      this.$router.push("/FormsSection");
      console.log("Dialog closed, navigating to FormsSection.");
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
:deep(.v-stepper-item--selected .v-stepper-item__step) {
  background-color: #1976d2 !important;
  color: #fff !important;
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

.submission-number-card {
  background: #e3f0ff !important;
  border: 1px solid #a3c9f2;
  border-radius: 8px;
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
