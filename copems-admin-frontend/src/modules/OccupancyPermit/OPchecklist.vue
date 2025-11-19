<template>
  <v-app>
    <v-app-bar flat color="#0000CC" dark height="88" app class="elevation-4">
      <v-container fluid class="d-flex align-center py-0" style="max-width: 100%">
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
              style="font-size: 12px; font-weight: 400; color: white; line-height: 1.2"
            >
              REPUBLIC OF THE PHILIPPINES
            </div>
            <div
              style="font-size: 15px; font-weight: 700; color: white; line-height: 1.2"
            >
              CITY GOVERNMENT OF NAGA
            </div>
          </div>
        </div>
      </v-container>
    </v-app-bar>
    <v-main style="background-color: #f5f6fa; padding-top: 88px">
      <v-dialog v-model="verifiedDialog" max-width="400px">
        <v-card :style="s.dialogCard">
          <v-card-title :style="s.dialogHeaderGreen">
            <v-icon class="mr-3" color="#fff">mdi-check-circle-outline</v-icon>
            <span class="text-h6 font-weight-bold" style="color: #fff"
              >Requirements Verified</span
            >
            <v-spacer></v-spacer>
            <v-btn icon variant="text" @click="verifiedDialog = false" size="small">
              <v-icon color="#fff">mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text class="pt-4">
            <p class="text-body-1 font-weight-small mb-4">
              You are about to verify the following submitted documents:
            </p>
            <div class="mb-3">
              <div :style="s.label">Application Number</div>
              <div :style="s.value">{{ applicant.applicationNumber }}</div>
            </div>
            <div class="mb-4">
              <div :style="s.label">Applicant Name</div>
              <div :style="s.value">{{ applicant.name }}</div>
            </div>
            <p v-if="allRequirementsChecked" class="font-weight-medium text-success">
              All {{ checklistItems.length }} requirements have been checked and
              confirmed. The application will be marked as **Verified**.
            </p>
            <p v-else class="font-weight-medium text-warning">
              Warning: {{ uncheckedCount }} out of
              {{ checklistItems.length }} requirements are still unchecked. Proceed with
              verification? The application will be marked as **Verified**.
            </p>
          </v-card-text>
          <v-card-actions class="px-6 pb-4">
            <v-btn :style="s.submitBtn" block @click="confirmVerification"
              >Confirm Verification</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="returnDialog" max-width="600px">
        <v-card :style="s.dialogCard">
          <v-card-title :style="s.dialogHeaderRed">
            <v-icon class="mr-3" color="#fff">mdi-alert-octagon-outline</v-icon>
            <span class="text-h6 font-weight-bold" style="color: #fff"
              >Return Application</span
            >
            <v-spacer></v-spacer>
            <v-btn icon variant="text" @click="returnDialog = false" size="small">
              <v-icon color="#fff">mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text class="pt-4">
            <v-form @submit.prevent="submitReturn">
              <p class="text-body-1 font-weight-small mb-4">
                This action will mark the application as **Returned**. Please specify the
                reason.
              </p>
              <v-label :style="s.inputLabel">
                Remarks / Reason for Return <span class="text-red-darken-1">*</span>
              </v-label>
              <v-textarea
                v-model="returnRemarks"
                placeholder="Specify the missing or incorrect requirements..."
                density="compact"
                variant="outlined"
                rows="4"
                required
              ></v-textarea>
              <v-btn
                :style="s.submitBtnRed"
                type="submit"
                block
                class="mt-2 mb-2"
                :disabled="!returnRemarks"
              >
                RETURN APPLICATION
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-dialog>

      <div :style="s.topToolbar">
        <div class="left d-flex align-center">
          <v-icon color="#3b82f6" class="mr-2">mdi-home-city</v-icon>
          <h3 class="mb-0 font-weight-bold" :style="s.textToolbar">
            Occupancy Permit Application
          </h3>
        </div>
        <div class="right d-flex align-center">
          <v-menu :close-on-content-click="true" location="bottom end">
            <template #activator="{ props }">
              <v-btn variant="text" :style="s.profileBtn" v-bind="props">
                <v-avatar size="32" class="mx-2">
                  <v-img
                    alt="Jacque"
                    src="https://i.pinimg.com/736x/71/84/c9/7184c9d52f44b93a96f09451fdcf6d44.jpg"
                  />
                </v-avatar>
                <div class="d-flex flex-column text-left">
                  <span
                    class="text-caption font-weight-bold"
                    style="color: #555; white-space: nowrap"
                    >Lea Bernice</span
                  >
                  <span
                    class="text-caption font-weight-medium"
                    style="color: #888; white-space: nowrap"
                    >Administrative Aide</span
                  >
                </div>
                <v-icon class="ml-1" size="small">mdi-chevron-down</v-icon>
              </v-btn>
            </template>
            <v-card min-width="250" class="mt-1">
              <v-list density="compact" nav>
                <v-list-item>
                  <v-list-item-title class="font-weight-bold">
                    Lea Bernice
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    lea.bernice@nagacity.gov.ph
                  </v-list-item-subtitle>
                </v-list-item>
                <v-divider class="my-1"></v-divider>
                <v-list-item to="/profile" link>
                  <template #prepend>
                    <v-icon>mdi-account-outline</v-icon>
                  </template>
                  <v-list-item-title>My Profile</v-list-item-title>
                </v-list-item>
                <v-list-item link @click="logOut" class="text-red-darken-1">
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

      <div :style="s.pageContainer">
        <v-row>
          <v-col cols="12" md="7">
            <v-card class="mb-4 elevation-1" :style="s.detailCard">
              <v-card-title :style="s.cardTitle">
                <v-icon class="mr-2" color="#3b82f6" size="20"
                  >mdi-account-details-outline</v-icon
                >
                Applicant Information
              </v-card-title>
              <v-card-text>
                <v-row>
                  <v-col cols="12" sm="6" :style="s.gridItemMargin">
                    <div :style="s.label">Application Number</div>
                    <div :style="s.value">{{ applicant.applicationNumber }}</div>
                  </v-col>
                  <v-col cols="12" sm="6" :style="s.gridItemMargin">
                    <div :style="s.label">Type of Application</div>
                    <div :style="s.value">{{ applicant.typeOfApplication }}</div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6" :style="s.gridItemMargin">
                    <div :style="s.label">Applicant Name</div>
                    <div :style="s.value">{{ applicant.name }}</div>
                  </v-col>
                  <v-col cols="12" sm="6" :style="s.gridItemMargin">
                    <div :style="s.label">Contact No.</div>
                    <div :style="s.value">{{ applicant.contactNo }}</div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6">
                    <div :style="s.label">Address</div>
                    <div :style="s.value">{{ applicant.address }}</div>
                  </v-col>
                  <v-col cols="12" sm="6"></v-col>
                </v-row>
              </v-card-text>
            </v-card>

            <v-card class="mb-4 elevation-1" :style="s.detailCard">
              <v-card-title :style="s.cardTitle">
                <v-icon class="mr-2" color="#3b82f6" size="20"
                  >mdi-home-city-outline</v-icon
                >
                Property Details
              </v-card-title>
              <v-card-text>
                <v-row>
                  <v-col cols="12" sm="6" :style="s.gridItemMargin">
                    <div :style="s.label">Name of Project</div>
                    <div :style="s.value">{{ property.projectName }}</div>
                  </v-col>
                  <v-col cols="12" sm="6" :style="s.gridItemMargin">
                    <div :style="s.label">No. of Storey/s</div>
                    <div :style="s.value">{{ property.noOfStoreys }}</div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6" :style="s.gridItemMargin">
                    <div :style="s.label">Project Location</div>
                    <div :style="s.value">{{ property.projectLocation }}</div>
                  </v-col>
                  <v-col cols="12" sm="6" :style="s.gridItemMargin">
                    <div :style="s.label">No. of Units</div>
                    <div :style="s.value">{{ property.noOfUnits }}</div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6">
                    <div :style="s.label">Use/Character of Occupancy</div>
                    <div :style="s.value">{{ property.buildingUse }}</div>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <div :style="s.label">Total Gross Floor Area</div>
                    <div :style="s.value">{{ property.totalGrossFloorArea }}</div>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" md="5">
            <v-card
              v-if="applicationStatus === 'Pending'"
              class="elevation-2"
              :style="s.enhancedChecklistCard"
            >
              <v-card-title :style="s.cardTitleEnhanced">
                <v-icon class="mr-3" color="#3b82f6" size="22"
                  >mdi-clipboard-list-outline</v-icon
                >
                <span class="font-weight-bold">Occupancy Requirement Checklist</span>
                <v-spacer></v-spacer>
                <v-chip
                  size="small"
                  :color="allRequirementsChecked ? '#10b981' : '#f59e0b'"
                  label
                  class="font-weight-bold"
                >
                  {{
                    allRequirementsChecked ? "All Checked" : uncheckedCount + " Pending"
                  }}
                </v-chip>
              </v-card-title>

              <v-card-text class="pt-4 pb-2 px-4">
                <div
                  v-for="(item, index) in checklistItems"
                  :key="index"
                  class="py-1"
                  :style="s.checklistRowEnhanced"
                >
                  <div class="d-flex align-start">
                    <v-checkbox
                      v-model="item.checked"
                      density="compact"
                      hide-details
                      color="#3b82f6"
                      class="flex-grow-1"
                    >
                      <template #label>
                        <span
                          :style="
                            item.checked
                              ? s.checklistLabelChecked
                              : s.checklistLabelUnchecked
                          "
                        >
                          {{ item.label }}
                        </span>
                      </template>
                    </v-checkbox>
                  </div>
                  <v-expand-transition>
                    <div v-if="item.isCommentable && item.checked" class="pl-7 pr-3 pb-2">
                      <v-label :style="s.inputLabel"> Specify Details </v-label>
                      <v-text-field
                        v-model="item.comment"
                        placeholder="e.g., Updated site development plan"
                        density="compact"
                        variant="outlined"
                        hide-details
                        required
                      ></v-text-field>
                    </div>
                  </v-expand-transition>
                </div>
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions class="pa-4">
                <v-btn
                  :style="s.returnBtnEnhanced"
                  variant="flat"
                  class="flex-grow-1 mr-2"
                  @click="openReturnDialog"
                >
                  Return
                </v-btn>
                <v-btn
                  :style="s.verifiedBtnEnhanced"
                  variant="flat"
                  class="flex-grow-1 ml-2"
                  @click="openVerifiedDialog"
                >
                  Verified
                </v-btn>
              </v-card-actions>
            </v-card>

            <v-card
              v-else
              class="elevation-2"
              :style="s.enhancedChecklistCard"
              :class="{
                'border-success': applicationStatus === 'Verified',
                'border-error': applicationStatus === 'Returned',
              }"
            >
              <v-card-title :style="s.cardTitleResult">
                <v-icon
                  class="mr-3"
                  :color="applicationStatus === 'Verified' ? '#10b981' : '#dc2626'"
                  size="22"
                  >{{
                    applicationStatus === "Verified"
                      ? "mdi-check-all"
                      : "mdi-alert-circle-outline"
                  }}</v-icon
                >
                <span class="font-weight-bold">Verification Result</span>
                <v-spacer></v-spacer>
                <v-chip
                  size="small"
                  :color="applicationStatus === 'Verified' ? '#10b981' : '#dc2626'"
                  label
                  class="font-weight-bold text-uppercase"
                >
                  {{ applicationStatus }}
                </v-chip>
              </v-card-title>

              <v-card-text>
                <div v-if="applicationStatus === 'Returned'" class="mb-4">
                  <div :style="s.label" class="mt-0">Reason for Return</div>
                  <div :style="s.value" class="font-weight-regular text-red-darken-2">
                    **{{ returnRemarks }}**
                  </div>
                  <v-divider class="my-4"></v-divider>
                </div>

                <div
                  v-for="(item, index) in finalChecklist"
                  :key="'final-' + index"
                  class="d-flex align-start py-2"
                  :style="s.checklistRowEnhanced"
                >
                  <v-icon
                    :color="item.checked ? '#10b981' : '#f59e0b'"
                    size="20"
                    class="mr-3 mt-1"
                  >
                    {{ item.checked ? "mdi-check-circle" : "mdi-close-circle" }}
                  </v-icon>
                  <div class="flex-grow-1">
                    <span :style="s.checklistLabelUnchecked" class="font-weight-medium">
                      {{ item.label }}
                    </span>
                    <p
                      v-if="item.isCommentable && item.comment"
                      class="text-caption font-italic mt-1 mb-0"
                      style="color: #6b7280"
                    >
                      Details: {{ item.comment }}
                    </p>
                  </div>
                </div>

                <v-divider class="my-4"></v-divider>

                <div class="d-flex justify-end">
                  <v-btn
                    :style="s.resetBtn"
                    variant="text"
                    size="small"
                    @click="resetChecklist"
                  >
                    Reset Application Status
                  </v-btn>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, computed } from "vue";

const verifiedDialog = ref(false);
const returnDialog = ref(false);
const returnRemarks = ref("");
const applicationStatus = ref("Pending"); // 'Pending', 'Verified', or 'Returned'

const applicant = ref({
  applicationNumber: "OP-2025-002",
  name: "Noah A. Deguzman",
  address: "Calauag Filoville Naga City",
  contactNo: "09265428922",
  typeOfApplication: "Full",
});

const property = ref({
  projectName: "Deguzman Residential Building",
  projectLocation: "456 Main St., Brgy. San Isidro, Naga City",
  buildingUse: "Residential - Single-Family",
  noOfStoreys: 2,
  noOfUnits: 5,
  totalGrossFloorArea: "200.00 sqm",
});

const checklistItems = ref([
  {
    label:
      "Two (2) copies of accomplished Unified Application form for Certificate of Occupancy, duly notarized;",
    checked: false,
  },
  {
    label: "Two (2) copies of Certificate of Completion, duly notarized;",
    checked: false,
  },
  {
    label:
      "Construction Logbook, signed and sealed by the Owner's Architect or Civil Engineer who undertook full-time inspection and supervision;",
    checked: false,
  },
  {
    label: "Two (2) photocopies of the valid licenses of all involved professionals;",
    checked: false,
  },
  {
    label:
      "Photograph of the structure with substantial completion showing front, sides, and rear areas;",
    checked: false,
  },
  {
    label:
      "Two (2) sets of As-Built Plans, if there are changes in the building plans covered by the issued Building Permit;",
    checked: false,
  },
  {
    label: "Two (2) copies of Certificate of Final Electrical Inspection;",
    checked: false,
  },
  {
    label:
      "Two (2) copies of Fire Safety Inspection Certificate from the Bureau of Fire and Protection;",
    checked: false,
  },
  { label: "Sketch map indicating the location of the project;", checked: false },
  { label: "Others: ", checked: false, isCommentable: true, comment: "" },
]);

const finalChecklist = ref([]);

const allRequirementsChecked = computed(() => {
  return checklistItems.value.every((item) => item.checked);
});

const uncheckedCount = computed(() => {
  return checklistItems.value.filter((item) => !item.checked).length;
});

const logOut = () => {
  console.log("User logged out.");
};

const openVerifiedDialog = () => {
  verifiedDialog.value = true;
};

const confirmVerification = () => {
  finalChecklist.value = JSON.parse(JSON.stringify(checklistItems.value));
  applicationStatus.value = "Verified";
  verifiedDialog.value = false;
};

const openReturnDialog = () => {
  returnDialog.value = true;
  returnRemarks.value = "";
};

const submitReturn = () => {
  if (returnRemarks.value.trim() === "") {
    alert("Please provide remarks for returning the application.");
    return;
  }
  finalChecklist.value = JSON.parse(JSON.stringify(checklistItems.value));
  applicationStatus.value = "Returned";
  returnDialog.value = false;
};

const resetChecklist = () => {
  checklistItems.value.forEach((item) => {
    item.checked = false;
    if (item.isCommentable) {
      item.comment = "";
    }
  });
  finalChecklist.value = [];
  returnRemarks.value = "";
  applicationStatus.value = "Pending";
};

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
  profileBtn: {
    backgroundColor: "transparent",
    boxShadow: "none",
    padding: 0,
    minWidth: "unset",
  },
  dialogCard: {
    borderRadius: "10px",
  },
  dialogHeaderGreen: {
    background: "#3B82F6",
    color: "#fff",
    padding: "10px 15px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dialogHeaderRed: {
    background: "#ef4444",
    color: "#fff",
    padding: "16px 24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  inputLabel: {
    fontSize: "14px",
    fontWeight: 500,
    color: "#1f2937",
    marginBottom: "4px",
    display: "block",
  },
  submitBtn: {
    background: "#3b82f6",
    color: "#fff",
    textTransform: "uppercase",
    fontWeight: 600,
    height: "40px",
  },
  submitBtnRed: {
    background: "#ef4444",
    color: "#fff",
    textTransform: "uppercase",
    fontWeight: 600,
    height: "40px",
  },
  pageContainer: {
    maxWidth: "1460px",
    margin: "16px auto 0",
    padding: "0 12px",
  },
  detailCard: {
    borderRadius: "10px",
  },
  cardTitle: {
    fontSize: "14px",
    fontWeight: 500,
    color: "#1f2937",
    borderBottom: "1px solid #e5e7eb",
    padding: "10px 10px",
    display: "flex",
    alignItems: "center",
  },
  label: {
    fontSize: "12px",
    fontWeight: 500,
    color: "#6b7280",
    textTransform: "uppercase",
    marginTop: "12px",
    marginBottom: "7px",
  },
  value: {
    fontSize: "15px",
    fontWeight: 500,
    color: "#1f2937",
  },
  gridItemMargin: {
    marginBottom: "4px",
  },
  enhancedChecklistCard: {
    borderRadius: "12px",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  },
  cardTitleEnhanced: {
    fontSize: "16px",
    fontWeight: 500,
    color: "#1f2937",
    padding: "16px 16px",
    borderBottom: "1px solid #e5e7eb",
    display: "flex",
    alignItems: "center",
    backgroundColor: "#f9fafb",
  },
  cardTitleResult: {
    fontSize: "16px",
    fontWeight: 500,
    padding: "16px 16px",
    borderBottom: "1px solid #e5e7eb",
    display: "flex",
    alignItems: "center",
    color: "#1f2937",
    backgroundColor: "#f9fafb",
  },
  checklistRowEnhanced: {
    padding: "8px 0",
    borderBottom: "1px solid #f3f4f6",
  },
  checklistLabelUnchecked: {
    fontSize: "14px",
    color: "#374151",
    lineHeight: "1.4",
  },
  checklistLabelChecked: {
    fontSize: "14px",
    color: "#374151",
    lineHeight: "1.4",
    textDecoration: "line-through",
  },
  verifiedBtnEnhanced: {
    background: "#10b981",
    color: "#fff",
    textTransform: "uppercase",
    fontWeight: 700,
    height: "44px",
    borderRadius: "8px",
    transition: "background 0.3s ease",
  },
  returnBtnEnhanced: {
    background: "#fecaca",
    color: "#dc2626",
    textTransform: "uppercase",
    fontWeight: 700,
    height: "44px",
    borderRadius: "8px",
    transition: "background 0.3s ease",
  },
  resetBtn: {
    color: "#6b7280",
    fontSize: "12px",
  },
};
</script>

<style scoped>
.v-card__text > .v-row {
  margin-top: 0;
  margin-bottom: 0;
}
.v-card__text .v-col {
  padding-top: 0;
  padding-bottom: 0;
}
:deep(.v-checkbox .v-label) {
  opacity: 1;
  padding-left: 4px;
}
:deep(.v-checkbox .v-input__control) {
  min-height: unset;
}
:deep(.v-checkbox .v-selection-control__wrapper) {
  margin-right: 0;
}
:deep(.v-checkbox) {
  padding-top: 0;
}
.border-success {
  border: 2px solid #10b981 !important;
}
.border-error {
  border: 2px solid #dc2626 !important;
}
</style>
