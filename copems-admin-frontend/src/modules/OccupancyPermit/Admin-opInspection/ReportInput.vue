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
                    >Jacqueline Azada</span
                  >
                  <span
                    class="text-caption font-weight-medium"
                    style="color: #888; white-space: nowrap"
                    >Engineer</span
                  >
                </div>
                <v-icon class="ml-1" size="small">mdi-chevron-down</v-icon>
              </v-btn>
            </template>
            <v-card min-width="250" class="mt-1">
              <v-list density="compact" nav>
                <v-list-item>
                  <v-list-item-title class="font-weight-bold">
                    Jacqueline Azada
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    jacqueline.azada@nagacity.gov.ph
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

      <v-container>
        <v-card :style="s.reviewCard" class="mx-auto" max-width="800">
          <v-card-title :style="s.reviewHeader" class="font-weight-bold">
            Architectural Works
          </v-card-title>
          <v-card-text class="pt-4">
            <v-form ref="reviewFormRef" @submit.prevent="submitReport">
              <div v-for="(item, index) in checklistItems" :key="index">
                <div class="d-flex align-center mt-2">
                  <v-checkbox
                    v-model="reviewFormData.checkedItems[index]"
                    :label="item.label"
                    hide-details
                    density="compact"
                  ></v-checkbox>
                </div>
                <div class="ml-4">
                  <v-textarea
                    v-model="reviewFormData.remarks[index]"
                    :label="item.remarkLabel"
                    :placeholder="item.placeholder"
                    rows="1"
                    auto-grow
                    density="compact"
                    variant="outlined"
                    class="mt-1 mb-3"
                    hide-details
                    style="width: 100%; min-height: 80px"
                  ></v-textarea>
                </div>
              </div>

              <div class="mt-4">
                <v-checkbox
                  v-model="reviewFormData.checkedItems[checklistItems.length]"
                  label="Others"
                  hide-details
                  density="compact"
                ></v-checkbox>
                <div class="ml-4">
                  <v-textarea
                    v-model="reviewFormData.othersRemarks"
                    label="Enter detailed structural assessment findings..."
                    placeholder="Enter detailed structural assessment findings..."
                    rows="1"
                    auto-grow
                    density="compact"
                    variant="outlined"
                    class="mt-1 mb-3"
                    hide-details
                    style="width: 100%; min-height: 80px"
                  ></v-textarea>
                </div>
              </div>

              <div class="d-flex justify-end mt-6">
                <v-btn
                  type="submit"
                  color="#3b82f6"
                  variant="flat"
                  size="large"
                  class="font-weight-bold"
                >
                  Submit Report
                </v-btn>
              </div>
            </v-form>
          </v-card-text>
        </v-card>
      </v-container>

      <v-dialog v-model="reviewSummaryDialog" max-width="800">
        <v-card :style="s.dialogCard">
          <div :style="s.dialogHeader" class="font-weight-bold">
            Review Architectural Report
            <v-btn
              icon="mdi-close"
              variant="text"
              size="small"
              @click="reviewSummaryDialog = false"
            ></v-btn>
          </div>
          <v-card-text class="pt-4">
            <p class="font-weight-bold mb-3 text-subtitle-1">
              Please confirm the following items for submission:
            </p>

            <div class="mb-4">
              <p
                class="font-weight-bold text-caption text-uppercase text-grey-darken-1 mb-1"
              >
                Checked Items & Remarks
              </p>
              <v-list density="compact" class="pa-0">
                <v-list-item
                  v-for="(item, index) in summaryData.filteredItems"
                  :key="index"
                  class="px-0 py-2"
                  :style="{ borderBottom: '1px solid #eee' }"
                >
                  <v-list-item-title class="font-weight-medium text-wrap">
                    <v-icon
                      size="small"
                      :color="item.isChecked ? 'success' : 'warning'"
                      class="mr-2"
                    >
                      {{ item.isChecked ? "mdi-check-circle" : "mdi-alert-circle" }}
                    </v-icon>
                    {{ item.label }}
                  </v-list-item-title>
                  <v-list-item-subtitle
                    class="mt-1 text-wrap ml-7"
                    :style="{ color: '#444', whiteSpace: 'pre-wrap' }"
                  >
                    **Remarks:** {{ item.remark || "*No remarks provided.*" }}
                  </v-list-item-subtitle>
                </v-list-item>
              </v-list>
              <p
                v-if="summaryData.filteredItems.length === 0"
                class="text-caption text-grey-darken-1 pt-2"
              >
                *No checklist items were checked or had remarks.*
              </p>
            </div>

            <div class="mt-4">
              <p
                class="font-weight-bold text-caption text-uppercase text-grey-darken-1 mb-1"
              >
                Others (Detailed Assessment)
              </p>
              <v-card
                variant="outlined"
                class="pa-3 text-body-2"
                :style="{ whiteSpace: 'pre-wrap' }"
              >
                {{
                  summaryData.othersRemarks || "No additional detailed remarks entered."
                }}
              </v-card>
            </div>
          </v-card-text>
          <v-card-actions class="d-flex justify-end pa-4">
            <v-btn
              variant="flat"
              color="grey-darken-1"
              @click="reviewSummaryDialog = false"
              class="font-weight-bold"
            >
              Cancel / Edit
            </v-btn>
            <v-btn
              variant="flat"
              color="#3b82f6"
              @click="confirmSubmission"
              class="font-weight-bold"
              to="/admin/architecturalDB"
            >
              Confirm Submission
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from "vue";

const approvalDialog = ref(false);
const rejectDialog = ref(false);
const selectedApplicant = ref(null);
const rejectionRemarks = ref("");

const reviewFormRef = ref(null);
const checklistItems = ref([
  { label: "Site Development Setting", remarkLabel: "Enter remarks..." },
  { label: "Fire Safety Requirements", remarkLabel: "Enter remarks..." },
  { label: "Occupancy Use and Functionalities", remarkLabel: "Enter remarks..." },
  {
    label: "Architectural Deficiencies & Parking Requirements",
    remarkLabel: "Enter remarks...",
  },
  { label: "Light Ventilation", remarkLabel: "Enter remarks..." },
  { label: "Accessories Control Location", remarkLabel: "Enter remarks..." },
  { label: "BP 344 Requirements", remarkLabel: "Enter remarks..." },
]);

const initialFormData = {
  checkedItems: new Array(checklistItems.value.length + 1).fill(false),
  remarks: new Array(checklistItems.value.length).fill(""),
  othersRemarks: "",
};

const reviewFormData = ref({ ...initialFormData });

const reviewSummaryDialog = ref(false);
const summaryData = ref({
  filteredItems: [],
  othersRemarks: "",
});

const approveSchedule = (applicant) => {
  approvalDialog.value = false;
  selectedApplicant.value = null;

  console.log(`Schedule Approved for ${applicant.name}. Status updated.`);
};

const confirmReject = (applicant) => {
  if (!rejectionRemarks.value) return;

  console.log(
    `Schedule Rejected for ${applicant.name}. Reason: ${rejectionRemarks.value}`
  );

  rejectionRemarks.value = "";
  rejectDialog.value = false;
  selectedApplicant.value = null;
};

const submitReport = async () => {
  if (reviewFormRef.value) {
    const { valid } = await reviewFormRef.value.validate();
    if (!valid) return;
  }

  const reportData = reviewFormData.value;
  const filteredItems = [];

  checklistItems.value.forEach((item, index) => {
    const isChecked = reportData.checkedItems[index];
    const remark = reportData.remarks[index].trim();

    if (isChecked || remark) {
      filteredItems.push({
        label: item.label,
        remark: remark,
        isChecked: isChecked,
      });
    }
  });

  summaryData.value = {
    filteredItems: filteredItems,
    othersRemarks: reportData.othersRemarks.trim(),
  };

  reviewSummaryDialog.value = true;
};

const confirmSubmission = () => {
  console.log("Architectural Works Report FINAL Submission Confirmed! Data:");
  console.log({
    filteredItems: summaryData.value.filteredItems,
    othersRemarks: summaryData.value.othersRemarks,
  });

  console.log("Full raw form data:", reviewFormData.value);

  reviewSummaryDialog.value = false;

  reviewFormData.value = { ...initialFormData };
  console.log("Form reset.");
};

const logOut = () => {
  console.log("Log Out clicked. User should be logged out.");
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
  dialogHeader: {
    background: "#3b82f6",
    color: "#fff",
    padding: "16px 24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    fontSize: "1.25rem",
  },
  label: {
    fontSize: "12px",
    fontWeight: 500,
    color: "#6b7280",
    textTransform: "uppercase",
    marginBottom: "4px",
  },
  dialogValue: {
    fontSize: "16px",
    fontWeight: 600,
    color: "#1f2937",
  },
  reviewCard: {
    borderRadius: "10px",
    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  },
  reviewHeader: {
    background: "#3b82f6",
    color: "#fff",
    padding: "16px 24px",
    fontSize: "1.25rem",
  },
};
</script>

<style scoped></style>
