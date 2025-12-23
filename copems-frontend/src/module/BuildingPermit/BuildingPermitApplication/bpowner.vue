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
                  <template v-for="(step, index) in formSteps" :key="index">
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
                  </template>
                </v-stepper-header>
              </v-stepper>

              <v-card class="my-2 pa-4 card-shadow">
                <v-card-title class="text-h6 card-title-responsive mb-2"
                  >APPLICATION DETAILS</v-card-title
                >
                <v-divider class="mb-4"></v-divider>
                <v-card-text>
                  <v-form ref="form" @submit.prevent="validateAndProceed">
                    <v-card class="mb-4 card-section">
                      <v-card-title class="text-h6 card-title-responsive section-title"
                        ><v-icon left color="blue-darken-3" class="mr-2"
                          >mdi-account</v-icon
                        >OWNER/APPLICANT</v-card-title
                      >
                      <v-divider></v-divider>
                      <v-card-text>
                        <v-row dense>
                          <v-col cols="12" sm="6" md="3">
                            <v-text-field
                              v-model="lastName"
                              label="Last Name"
                              variant="outlined"
                              class="textfield-50"
                              density="comfortable"
                              :rules="[rules.required]"
                              prepend-inner-icon="mdi-account"
                              color="blue-darken-3"
                              hide-details="auto"
                              required
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="3">
                            <v-text-field
                              v-model="firstName"
                              label="First Name"
                              variant="outlined"
                              class="textfield-50"
                              density="comfortable"
                              :rules="[rules.required]"
                              color="blue-darken-3"
                              prepend-inner-icon="mdi-account"
                              hide-details="auto"
                              required
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="3">
                            <v-text-field
                              v-model="middleInitial"
                              label="Middle Initial"
                              variant="outlined"
                              class="textfield-50"
                              density="comfortable"
                              maxlength="2"
                              counter
                              :rules="[rules.required]"
                              color="blue-darken-3"
                              prepend-inner-icon="mdi-alpha-m-box-outline"
                              hide-details="auto"
                              required
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="3">
                            <v-text-field
                              v-model="tin"
                              label="TIN"
                              variant="outlined"
                              class="textfield-50"
                              density="comfortable"
                              :rules="[rules.required]"
                              color="blue-darken-3"
                              prepend-inner-icon="mdi-numeric"
                              hide-details="auto"
                              required
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-card-text>
                    </v-card>

                    <v-card class="mb-4 card-section">
                      <v-card-title class="text-h6 card-title-responsive section-title"
                        ><v-icon left color="blue-darken-3" class="mr-2"
                          >mdi-domain</v-icon
                        >FOR CONSTRUCTION OWNED BY AN ENTERPRISE</v-card-title
                      >
                      <v-divider></v-divider>
                      <v-card-text>
                        <v-row dense class="d-flex align-center">
                          <v-col cols="12" md="6">
                            <v-checkbox
                              v-model="isOwnedByEnterprise"
                              label="Owned by an Enterprise"
                              hide-details
                              class="mt-0 pt-0"
                              color="blue-darken-3"
                              density="comfortable"
                            ></v-checkbox>
                          </v-col>
                          <v-col cols="12" md="6">
                            <v-text-field
                              v-model="formOfOwnership"
                              label="Form of Ownership"
                              variant="outlined"
                              class="textfield-50"
                              density="comfortable"
                              :disabled="!isOwnedByEnterprise"
                              :rules="[isOwnedByEnterprise ? rules.required : true]"
                              color="blue-darken-3"
                              prepend-inner-icon="mdi-account-group-outline"
                              hide-details="auto"
                              required
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-card-text>
                    </v-card>

                    <v-card class="card-section">
                      <v-card-title class="text-h6 card-title-responsive section-title"
                        ><v-icon left color="blue-darken-3" class="mr-2"
                          >mdi-map-marker</v-icon
                        >ADDRESS</v-card-title
                      >
                      <v-divider></v-divider>
                      <v-card-text>
                        <v-row dense>
                          <v-col cols="12" sm="6" md="2">
                            <v-text-field
                              v-model="province"
                              label="Province"
                              variant="outlined"
                              class="textfield-50"
                              density="comfortable"
                              :rules="[rules.required]"
                              color="blue-darken-3"
                              prepend-inner-icon="mdi-map"
                              hide-details="auto"
                              required
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="2">
                            <v-text-field
                              v-model="city"
                              label="City/Municipality"
                              variant="outlined"
                              class="textfield-50"
                              density="comfortable"
                              :rules="[rules.required]"
                              color="blue-darken-3"
                              prepend-inner-icon="mdi-home-city"
                              hide-details="auto"
                              required
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="2">
                            <v-text-field
                              v-model="barangay"
                              label="Barangay"
                              variant="outlined"
                              class="textfield-50"
                              density="comfortable"
                              :rules="[rules.required]"
                              color="blue-darken-3"
                              prepend-inner-icon="mdi-home-group"
                              hide-details="auto"
                              required
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="2">
                            <v-text-field
                              v-model="houseNo"
                              label="House No."
                              variant="outlined"
                              class="textfield-50"
                              density="comfortable"
                              :rules="[rules.required]"
                              color="blue-darken-3"
                              prepend-inner-icon="mdi-home-outline"
                              hide-details="auto"
                              required
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="2">
                            <v-text-field
                              v-model="street"
                              label="Street"
                              variant="outlined"
                              class="textfield-50"
                              density="comfortable"
                              :rules="[rules.required]"
                              color="blue-darken-3"
                              prepend-inner-icon="mdi-road-variant"
                              hide-details="auto"
                              required
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="2">
                            <v-text-field
                              v-model="contactNo"
                              label="Contact No."
                              variant="outlined"
                              class="textfield-50"
                              density="comfortable"
                              :rules="[rules.required]"
                              color="blue-darken-3"
                              prepend-inner-icon="mdi-phone"
                              hide-details="auto"
                              required
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
                  color="blue-darken-3"
                  class="btn-rounded"
                  elevation="2"
                  @click="validateAndProceed"
                  variant="elevated"
                  :loading="saving"
                  :disabled="saving"
                >
                  {{ saving ? "Saving..." : "Save & Next" }}
                  <v-icon right>mdi-arrow-right</v-icon>
                </v-btn>
              </div>

              <!-- Snackbar for notifications -->
              <v-snackbar
                v-model="snackbar"
                :color="snackbarColor"
                :timeout="3000"
                top
                right
              >
                {{ snackbarMessage }}
                <template v-slot:actions>
                  <v-btn color="white" variant="text" @click="snackbar = false">
                    Close
                  </v-btn>
                </template>
              </v-snackbar>
            </v-container>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { defineComponent } from "vue";
import BPNavigation from "./bpnavigation.vue";
import buildingOwnerService from "@/services/buildingOwnerService.js";

export default defineComponent({
  components: { BPNavigation },
  name: "BuildingPermitPage",
  data() {
    return {
      formStepValue: 1,
      formSteps: [
        { title: "Building Owner Information", value: 1 },
        { title: "Construction Information", value: 2 },
        { title: "Use or Character of Occupancy", value: 3 },
        { title: "Signatories Details", value: 4 },
      ],
      buildingOwnerId: null,
      lastName: null,
      firstName: null,
      middleInitial: null,
      tin: null,
      isOwnedByEnterprise: false,
      formOfOwnership: null,
      houseNo: null,
      street: null,
      barangay: null,
      city: null,
      province: null,
      contactNo: null,
      rules: {
        required: (value) => !!value || "This field is required.",
      },

      sidebarStep: 0,
      sidebarSteps: [
        "Fill up the Unified Application Form",
        "Upload Building Plans & Lot Plans",
        "Download Filled-up Unified Application Form and Required Ancillary Permits ",
      ],

      // UI state
      saving: false,
      snackbar: false,
      snackbarMessage: "",
      snackbarColor: "success",
    };
  },
  methods: {
    async saveBuildingOwner() {
      try {
        this.saving = true;
        this.snackbarMessage = "";

        const ownerData = {
          last_name: this.lastName,
          first_name: this.firstName,
          middle_initial: this.middleInitial,
          tin: this.tin,
          is_enterprise: this.isOwnedByEnterprise,
          form_of_ownership: this.formOfOwnership,
          province: this.province,
          city_municipality: this.city,
          barangay: this.barangay,
          house_no: this.houseNo,
          street: this.street,
          contact_no: this.contactNo,
        };

        let result;
        if (this.buildingOwnerId) {
          // Update existing record
          result = await buildingOwnerService.update(this.buildingOwnerId, ownerData);
        } else {
          // Create new record
          result = await buildingOwnerService.create(ownerData);
        }

        if (result.success) {
          this.snackbarMessage = this.buildingOwnerId
            ? "Building owner information updated successfully!"
            : "Building owner information saved successfully!";
          this.snackbarColor = "success";
          this.snackbar = true;

          // Extract the building owner ID from the response
          if (result.data?.data?.bldg_owner_id) {
            this.buildingOwnerId = result.data.data.bldg_owner_id;
          }

          // Store the ID in localStorage for later use
          localStorage.setItem("bldg_owner_id", this.buildingOwnerId);

          // Store the form data in localStorage as backup
          localStorage.setItem("buildingOwnerData", JSON.stringify(result.data.data));

          return true;
        } else {
          this.snackbarMessage =
            result.message || "Failed to save building owner information";
          this.snackbarColor = "error";
          this.snackbar = true;
          console.error("Save error:", result.error);
          return false;
        }
      } catch (error) {
        this.snackbarMessage =
          error.response?.data?.message ||
          "An unexpected error occurred. Please try again.";
        this.snackbarColor = "error";
        this.snackbar = true;
        console.error("Error saving building owner:", error);
        return false;
      } finally {
        this.saving = false;
      }
    },

    async validateAndProceed() {
      const { valid } = await this.$refs.form.validate();
      if (valid) {
        // Save data before proceeding
        const saved = await this.saveBuildingOwner();
        if (saved) {
          // Wait a moment for the snackbar to show, then navigate
          setTimeout(() => {
            this.$router.push("/applicant/bpconstruction");
          }, 1000);
        }
      } else {
        this.snackbarMessage = "Please fill in all required fields";
        this.snackbarColor = "warning";
        this.snackbar = true;
      }
    },

    async loadExistingData() {
      const savedId = localStorage.getItem("bldg_owner_id");
      if (savedId) {
        try {
          const result = await buildingOwnerService.getById(savedId);
          if (result.success && result.data?.data) {
            const data = result.data.data;
            this.buildingOwnerId = data.bldg_owner_id;
            this.lastName = data.last_name;
            this.firstName = data.first_name;
            this.middleInitial = data.middle_initial;
            this.tin = data.tin;
            this.isOwnedByEnterprise =
              data.is_enterprise === 1 || data.is_enterprise === true;
            this.formOfOwnership = data.form_of_ownership;
            this.province = data.province;
            this.city = data.city_municipality;
            this.barangay = data.barangay;
            this.houseNo = data.house_no;
            this.street = data.street;
            this.contactNo = data.contact_no;
          }
        } catch (error) {
          console.error("Error loading building owner data:", error);
          // Fallback to localStorage if API call fails
          this.loadLocalStorageData();
        }
      } else {
        // Load from localStorage as fallback
        this.loadLocalStorageData();
      }
    },

    loadLocalStorageData() {
      const savedData = localStorage.getItem("buildingOwnerData");
      if (savedData) {
        try {
          const data = JSON.parse(savedData);
          this.buildingOwnerId = data.bldg_owner_id;
          this.lastName = data.last_name;
          this.firstName = data.first_name;
          this.middleInitial = data.middle_initial;
          this.tin = data.tin;
          this.isOwnedByEnterprise =
            data.is_enterprise === 1 || data.is_enterprise === true;
          this.formOfOwnership = data.form_of_ownership;
          this.province = data.province;
          this.city = data.city_municipality;
          this.barangay = data.barangay;
          this.houseNo = data.house_no;
          this.street = data.street;
          this.contactNo = data.contact_no;
        } catch (error) {
          console.error("Error loading saved data:", error);
        }
      }
    },

    handleLogout() {
      console.log("User logged out");
      localStorage.removeItem("bldg_owner_id");
      localStorage.removeItem("buildingOwnerData");
      localStorage.removeItem("bp_construction_id");
      this.$router.push("/login");
    },

    goToStep(index) {
      this.sidebarStep = index;
      if (index === 0) {
        console.log("Navigating to step 1 details...");
      }
    },
  },
  mounted() {
    // Load any previously saved data when component mounts
    this.loadExistingData();
  },
  watch: {
    isOwnedByEnterprise(newVal) {
      if (!newVal) {
        this.formOfOwnership = null;
      }
    },
  },
});
</script>

<style scoped>
/* Scoped styles remain unchanged */
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
  background: linear-gradient(90deg, #1976d2 20%, #1565c0 80%);
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
