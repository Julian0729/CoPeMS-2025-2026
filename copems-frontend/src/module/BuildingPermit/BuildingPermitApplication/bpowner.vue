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
            class="main-content-wrapper d-flex flex-column"
          >
            <div class="stepper-fixed-header pa-6 pb-2">
              <v-container fluid class="px-4 mx-auto" style="max-width: 1300px">
                <v-stepper
                  v-model="formStepValue"
                  alt-labels
                  flat
                  class="stepper-elevated"
                >
                  <v-stepper-header>
                    <template v-for="(step, index) in formSteps" :key="index">
                      <v-stepper-item
                        :title="step.title"
                        :value="step.value"
                        :complete="formStepValue > step.value"
                        :color="
                          formStepValue >= step.value
                            ? 'blue-darken-1'
                            : 'grey-lighten-2'
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
              </v-container>
            </div>

            <div class="scrollable-form-area pa-6 pt-0">
              <v-container fluid class="px-4 mx-auto" style="max-width: 1300px">
                <v-card class="my-2 pa-4 card-shadow">
                  <v-card-title class="text-h6 card-title-responsive mb-2">
                    APPLICATION DETAILS
                  </v-card-title>
                  <v-divider class="mb-4"></v-divider>
                  <v-card-text>
                    <v-form
                      ref="entryForm"
                      @submit.prevent="validateAndProceed"
                    >
                      <v-card class="mb-4 card-section">
                        <v-card-title
                          class="text-h6 card-title-responsive section-title"
                        >
                          <v-icon left color="blue-darken-3" class="mr-2"
                            >mdi-account</v-icon
                          >
                          OWNER/APPLICANT
                        </v-card-title>
                        <v-divider></v-divider>
                        <v-card-text>
                          <v-row dense>
                            <v-col cols="12" sm="6" md="3">
                              <v-text-field
                                v-model="formData.last_name"
                                label="Last Name"
                                variant="outlined"
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
                                v-model="formData.first_name"
                                label="First Name"
                                variant="outlined"
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
                                v-model="formData.middle_initial"
                                label="Middle Initial"
                                variant="outlined"
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
                                v-model="formData.tin"
                                label="TIN"
                                variant="outlined"
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
                        <v-card-title
                          class="text-h6 card-title-responsive section-title"
                        >
                          <v-icon left color="blue-darken-3" class="mr-2"
                            >mdi-domain</v-icon
                          >
                          FOR CONSTRUCTION OWNED BY AN ENTERPRISE
                        </v-card-title>
                        <v-divider></v-divider>
                        <v-card-text>
                          <v-row dense class="d-flex align-center">
                            <v-col cols="12" md="6">
                              <v-checkbox
                                v-model="formData.is_enterprise"
                                label="Owned by an Enterprise"
                                hide-details
                                color="blue-darken-3"
                                density="comfortable"
                              ></v-checkbox>
                            </v-col>
                            <v-col cols="12" md="6">
                              <v-text-field
                                v-model="formData.form_of_ownership"
                                label="Form of Ownership"
                                variant="outlined"
                                density="comfortable"
                                :disabled="!formData.is_enterprise"
                                :rules="[
                                  formData.is_enterprise
                                    ? rules.required
                                    : true,
                                ]"
                                color="blue-darken-3"
                                prepend-inner-icon="mdi-account-group-outline"
                                hide-details="auto"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                        </v-card-text>
                      </v-card>

                      <v-card class="card-section">
                        <v-card-title
                          class="text-h6 card-title-responsive section-title"
                        >
                          <v-icon left color="blue-darken-3" class="mr-2"
                            >mdi-map-marker</v-icon
                          >
                          ADDRESS
                        </v-card-title>
                        <v-divider></v-divider>
                        <v-card-text>
                          <v-row dense>
                            <v-col cols="12" sm="6" md="2">
                              <v-text-field
                                v-model="formData.province"
                                label="Province"
                                variant="outlined"
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
                                v-model="formData.city_municipality"
                                label="City/Municipality"
                                variant="outlined"
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
                                v-model="formData.barangay"
                                label="Barangay"
                                variant="outlined"
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
                                v-model="formData.house_no"
                                label="House No."
                                variant="outlined"
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
                                v-model="formData.street"
                                label="Street"
                                variant="outlined"
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
                                v-model="formData.contact_no"
                                label="Contact No."
                                variant="outlined"
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
                    {{ saving ? "Saving..." : " Next" }}
                    <v-icon right>mdi-arrow-right</v-icon>
                  </v-btn>
                </div>
              </v-container>
            </div>

            <v-snackbar
              v-model="snackbar"
              :color="snackbarColor"
              :timeout="3000"
              top
              right
            >
              {{ snackbarMessage }}
              <template v-slot:actions>
                <v-btn color="white" variant="text" @click="snackbar = false"
                  >Close</v-btn
                >
              </template>
            </v-snackbar>
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
      sidebarStep: 0,
      sidebarSteps: [
        "Fill up the Unified Application Form",
        "Upload Building Plans & Lot Plans",
        "Download Filled-up Unified Application Form and Required Ancillary Permits ",
      ],

      formData: {
        bldg_owner_id: "",
        last_name: "",
        first_name: "",
        middle_initial: "",
        tin: "",
        is_enterprise: false,
        form_of_ownership: "",
        province: "",
        city_municipality: "",
        barangay: "",
        house_no: "",
        street: "",
        contact_no: "",
      },

      saving: false,
      snackbar: false,
      snackbarMessage: "",
      snackbarColor: "success",
      rules: {
        required: (value) => !!value || "This field is required.",
      },
    };
  },
  methods: {
    /**
     * Handles API call to create or update building owner
     */
    async saveBuildingOwner() {
      try {
        this.saving = true;

        const payload = { ...this.formData };

        let result;
        if (this.formData.bldg_owner_id) {
          result = await buildingOwnerService.update(
            this.formData.bldg_owner_id,
            payload
          );
        } else {
          result = await buildingOwnerService.create(payload);
        }

        if (result.success) {
          const updatedData = result.data?.data || result.data;

          this.snackbarMessage = this.formData.bldg_owner_id
            ? "Building owner information updated successfully!"
            : "Building owner information saved successfully!";
          this.snackbarColor = "success";
          this.snackbar = true;

          // Update local data with ID from server
          if (updatedData?.bldg_owner_id) {
            this.formData.bldg_owner_id = updatedData.bldg_owner_id;
          }

          // Persistence
          localStorage.setItem("bldg_owner_id", this.formData.bldg_owner_id);
          localStorage.setItem(
            "buildingOwnerData",
            JSON.stringify(this.formData)
          );

          return true;
        } else {
          this.snackbarMessage = result.message || "Failed to save data";
          this.snackbarColor = "error";
          this.snackbar = true;
          return false;
        }
      } catch (error) {
        this.snackbarMessage =
          error.response?.data?.message || "An unexpected error occurred.";
        this.snackbarColor = "error";
        this.snackbar = true;
        return false;
      } finally {
        this.saving = false;
      }
    },

    async validateAndProceed() {
      const { valid } = await this.$refs.entryForm.validate();
      if (valid) {
        const saved = await this.saveBuildingOwner();
        if (saved) {
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

    /**
     * Fetches data from API or LocalStorage on mount
     */
    async loadExistingData() {
      const savedId = localStorage.getItem("bldg_owner_id");
      if (savedId) {
        try {
          const result = await buildingOwnerService.getById(savedId);
          if (result.success && result.data?.data) {
            this.formData = { ...this.formData, ...result.data.data };
            // Ensure checkbox is boolean
            this.formData.is_enterprise = !!this.formData.is_enterprise;
          }
        } catch (error) {
          this.loadLocalStorageData();
        }
      } else {
        this.loadLocalStorageData();
      }
    },

    loadLocalStorageData() {
      const savedData = localStorage.getItem("buildingOwnerData");
      if (savedData) {
        try {
          const parsed = JSON.parse(savedData);
          this.formData = { ...this.formData, ...parsed };
        } catch (e) {
          console.error("Local Storage Parse Error:", e);
        }
      }
    },

    handleLogout() {
      localStorage.clear();
      this.$router.push("/login");
    },

    goToStep(index) {
      this.sidebarStep = index;
    },
  },
  mounted() {
    this.loadExistingData();
  },
  watch: {
    "formData.is_enterprise"(newVal) {
      if (!newVal) this.formData.form_of_ownership = null;
    },
  },
});
</script>

<style scoped>
.no-scroll {
  height: 100vh;
  overflow: hidden !important;
}

.main-content-wrapper {
  height: 100vh;
  overflow: hidden;
  background: #fafdff;
}

.stepper-fixed-header {
  flex-shrink: 0;
  background: #fafdff;
  z-index: 10;
}

.scrollable-form-area {
  flex-grow: 1;
  overflow-y: auto;
  scrollbar-width: thin;
}

.scrollable-form-area::-webkit-scrollbar {
  width: 6px;
}
.scrollable-form-area::-webkit-scrollbar-thumb {
  background: #cfd8dc;
  border-radius: 10px;
}

.stepper-elevated {
  background: white;
  border-radius: 14px;
  box-shadow: 0 2px 6px 0 rgba(25, 118, 210, 0.06);
  padding: 10px 0;
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
  font-weight: 600;
}

@media (max-width: 600px) {
  .v-stepper-item :deep(.v-stepper-item__title) {
    display: none;
  }
}
</style>