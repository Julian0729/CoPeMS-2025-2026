<template>
  <v-app>
    <v-app-bar flat color="#ffffff" dark height="88" app class="elevation-4">
      <v-container
        fluid
        class="d-flex align-center py-0 justify-space-between"
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
            <div class="header-subtitle">REPUBLIC OF THE PHILIPPINES</div>
            <div class="header-title">CITY GOVERNMENT OF NAGA</div>
          </div>
        </div>
        <!-- Profile section from Testingarea.vue header -->
        <div class="d-flex align-center">
          <v-menu :close-on-content-click="true" location="bottom end">
            <template #activator="{ props }">
              <v-btn variant="text" class="profile-btn" v-bind="props">
                <v-avatar size="36" class="mx-2 text-white" color="#5B21B6">JA</v-avatar>
                <div class="d-flex flex-column text-left">
                  <span class="text-caption font-weight-bold profile-name"
                    >Jacqueline Azada</span
                  >
                  <span class="text-caption font-weight-medium profile-role"
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
      </v-container>
    </v-app-bar>
    <v-main style="background-color: #f5f6fa; padding-top: 88px">
      <!-- Schedule Inspection Dialog -->
      <v-dialog v-model="approvalDialog" max-width="600px" persistent>
        <v-card v-if="selectedApplicant" class="schedule-dialog-card">
          <v-card-title class="schedule-dialog-header pa-5">
            <v-icon color="#3b82f6" size="28" class="mr-3">mdi-calendar-check</v-icon>
            <span class="schedule-dialog-title">Schedule Inspection</span>
            <v-spacer></v-spacer>
            <v-btn icon variant="text" @click="approvalDialog = false" size="small">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="pa-5">
            <v-row>
              <v-col cols="6">
                <div class="mb-4">
                  <div class="schedule-field-label">Inspection Date</div>
                  <div class="schedule-field-value">{{ selectedApplicant.date }}</div>
                </div>
                <div>
                  <div class="schedule-field-label">Inspection Time</div>
                  <div class="schedule-field-value">{{ selectedApplicant.time }}</div>
                </div>
              </v-col>

              <v-col cols="6">
                <div class="mb-4">
                  <div class="schedule-field-label">Application Number</div>
                  <div class="schedule-field-value">
                    {{ selectedApplicant.applicationNumber }}
                  </div>
                </div>
                <div>
                  <div class="schedule-field-label">Applicant Name</div>
                  <div class="schedule-field-value">{{ selectedApplicant.name }}</div>
                </div>
              </v-col>
            </v-row>

            <div class="mt-3">
              <div class="schedule-field-label">Project Location</div>
              <div class="schedule-field-value">Barangay Concepcion Grande</div>
            </div>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions class="pa-4 d-flex justify-end">
            <v-btn
              variant="outlined"
              color="#ef4444"
              class="text-none font-weight-medium"
              size="large"
              @click="rejectSchedule(selectedApplicant)"
              style="min-width: 160px; border-width: 2px"
            >
              Reject Schedule
            </v-btn>
            <v-btn
              variant="flat"
              color="#3b82f6"
              class="text-none font-weight-medium ml-3"
              size="large"
              @click="approveSchedule(selectedApplicant)"
              style="min-width: 160px"
            >
              Approve Schedule
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- Reject Inspection Schedule Dialog -->
      <v-dialog v-model="rejectDialog" max-width="500px" persistent>
        <v-card class="reject-dialog-card">
          <v-card-title class="reject-dialog-header pa-5">
            <v-icon color="#ef4444" size="28" class="mr-3">mdi-close-circle</v-icon>
            <span class="reject-dialog-title">Reject Inspection Schedule</span>
            <v-spacer></v-spacer>
            <v-btn icon variant="text" @click="rejectDialog = false" size="small">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="pa-5">
            <div class="reject-dialog-subtitle mb-4">
              Provide a reason for rejecting this inspection schedule
            </div>
            <div class="field-label mb-2">
              Remarks / Reason for Rejection <span class="text-red-darken-2">*</span>
            </div>
            <v-textarea
              v-model="rejectionRemarks"
              placeholder="Please provide a clear reason for rejecting this schedule..."
              variant="outlined"
              rows="3"
              hide-details
              class="reject-textarea"
            ></v-textarea>
            <div class="text-caption text-grey-darken-1 mt-2">
              This will be communicated to the applicant
            </div>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions class="pa-4 d-flex justify-end">
            <v-btn
              variant="outlined"
              color="#6b7280"
              class="text-none font-weight-medium"
              size="large"
              @click="rejectDialog = false"
              style="min-width: 120px"
            >
              Cancel
            </v-btn>
            <v-btn
              variant="flat"
              color="#ef4444"
              class="text-none font-weight-medium ml-3"
              size="large"
              @click="confirmReject(selectedApplicant)"
              :disabled="!rejectionRemarks"
              style="min-width: 150px"
            >
              Confirm Reject
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <div :style="s.pageContainer">
        <v-row class="mb-6">
          <v-col v-for="card in statCards" :key="card.key" cols="12" sm="6" md="4">
            <div
              :style="s.statCard"
              role="button"
              @click="filterByStatus(card.clickStatus)"
            >
              <div :style="s.statLabel">{{ card.label }}</div>
              <div :style="s.statValueGroup">
                <div :style="s.statValue">{{ card.value }}</div>
                <v-icon :style="s.statInlineIcon" :color="card.iconColor">{{
                  card.icon
                }}</v-icon>
              </div>
            </div>
          </v-col>
        </v-row>

        <v-row class="mb-4 align-center">
          <v-col cols="12" sm="4" md="6"></v-col>

          <v-col cols="12" sm="8" md="6" class="d-flex justify-end align-center">
            <div :style="s.searchWrapper">
              <v-text-field
                v-model="search"
                label="Search applicants..."
                prepend-inner-icon="mdi-magnify"
                density="compact"
                variant="solo"
                rounded="lg"
                hide-details
                single-line
                :loading="loading"
                @click:append-inner="onClick"
              />
            </div>

            <v-menu :close-on-content-click="false" location="bottom right">
              <template #activator="{ props }">
                <v-btn
                  :style="s.filterBtn"
                  prepend-icon="mdi-filter-variant"
                  v-bind="props"
                  >Filter</v-btn
                >
              </template>
              <v-list>
                <v-list-item
                  v-for="opt in filterOptions"
                  :key="opt"
                  @click="filterByStatus(opt)"
                >
                  <v-list-item-title>{{
                    opt === "Total" ? "All" : opt
                  }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-col>
        </v-row>

        <v-card class="elevation-1" :style="s.tableCard">
          <v-table class="custom-data-table">
            <thead>
              <tr>
                <th
                  v-for="header in appHeaders"
                  :key="header.key"
                  class="text-left"
                  :style="[
                    s.tableHeader,
                    header.key === 'action' ? { width: '120px' } : {},
                  ]"
                >
                  {{ header.title }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in filteredApplicants" :key="item.applicationNumber">
                <td class="text-left">{{ item.applicationNumber }}</td>
                <td class="text-left py-2">
                  <div class="d-flex align-center">
                    <v-avatar
                      size="36"
                      :color="getAvatarColor(item.initials)"
                      class="me-2 text-white"
                      >{{ item.initials }}</v-avatar
                    >
                    <span>{{ item.name }}</span>
                  </div>
                </td>
                <td class="text-left">{{ item.date }}</td>
                <td class="text-left">{{ item.time }}</td>
                <td class="text-left">
                  <span :style="[s.statusPill, statusStyles[applicantStatus(item)]]">
                    {{ applicantStatus(item) }}
                  </span>
                </td>
                <td class="text-left">
                  <v-btn size="small" :style="s.viewBtn" @click="viewDetails(item)"
                    >View Details</v-btn
                  >
                </td>
              </tr>
            </tbody>
          </v-table>
          <div
            v-if="!filteredApplicants.length"
            class="text-center pa-4 text-medium-emphasis"
          >
            No applicants found matching the search or filter criteria.
          </div>
        </v-card>
      </div>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

const search = ref("");
const activeFilterApps = ref("Total");
const loading = ref(false);

const approvalDialog = ref(false);
const rejectDialog = ref(false);
const selectedApplicant = ref(null);
const rejectionRemarks = ref("");

const router = useRouter();

const applicants = ref([
  {
    applicationNumber: "OP-2025-001",
    name: "Maria Santos",
    initials: "MS",
    date: "May 8, 2025",
    time: "10:30 AM",
    isVerifiedByAdmin: false, // Pending
    isReturned: false,
  },
  {
    applicationNumber: "OP-2025-002",
    name: "Noah Deguzman",
    initials: "ND",
    date: "June 17, 2_025",
    time: "02:00 PM",
    isVerifiedByAdmin: true, // Approved
    isReturned: false,
  },
]);

const applicantStatus = (applicant) => {
  if (applicant.isReturned) return "Return";
  if (applicant.isVerifiedByAdmin) return "Approved";
  return "Pending";
};

const statCards = computed(() => {
  const total = applicants.value.length;
  const pending = applicants.value.filter((a) => applicantStatus(a) === "Pending").length;
  const approved = applicants.value.filter((a) => applicantStatus(a) === "Approved")
    .length;

  return [
    {
      key: "total",
      label: "Total Applicants (Architectural Works)",
      value: total,
      icon: "mdi-account-group",
      iconColor: "#3b82f6",
      clickStatus: "Total",
    },
    {
      key: "pending",
      label: "Pending",
      value: pending,
      icon: "mdi-clock-outline",
      iconColor: "#f59e0b",
      clickStatus: "Pending",
    },
    {
      key: "approved",
      label: "Approved",
      value: approved,
      icon: "mdi-check-circle-outline",
      iconColor: "#22c55e",
      clickStatus: "Approved",
    },
  ];
});

const filteredApplicants = computed(() => {
  let filtered = applicants.value;

  if (activeFilterApps.value !== "Total") {
    filtered = filtered.filter((a) => applicantStatus(a) === activeFilterApps.value);
  }

  if (search.value) {
    const q = search.value.toLowerCase();
    filtered = filtered.filter(
      (a) =>
        a.name.toLowerCase().includes(q) || a.applicationNumber.toLowerCase().includes(q)
    );
  }

  return filtered;
});

const approveSchedule = (applicant) => {
  const applicantToUpdate = applicants.value.find(
    (a) => a.applicationNumber === applicant.applicationNumber
  );

  if (applicantToUpdate) {
    applicantToUpdate.isVerifiedByAdmin = true;
    applicantToUpdate.isReturned = false;
  }
  approvalDialog.value = false;
  selectedApplicant.value = null;

  console.log(`Schedule Approved for ${applicant.name}. Status updated.`);
};

const rejectSchedule = (applicant) => {
  approvalDialog.value = false;
  rejectDialog.value = true;
};

const confirmReject = (applicant) => {
  if (!rejectionRemarks.value) return;

  console.log(
    `Schedule Rejected for ${applicant.name}. Reason: ${rejectionRemarks.value}`
  );

  const index = applicants.value.findIndex(
    (a) => a.applicationNumber === applicant.applicationNumber
  );
  if (index > -1) {
    applicants.value.splice(index, 1);
  }

  rejectionRemarks.value = "";
  rejectDialog.value = false;
  selectedApplicant.value = null;
};

function onClick() {
  loading.value = true;
  setTimeout(() => (loading.value = false), 2000);
}

const filterByStatus = (status) => {
  activeFilterApps.value = status;
};

const logOut = () => {
  console.log("Log Out clicked. User should be logged out.");
};

const filterOptions = computed(() => ["Total", "Pending", "Approved", "Return"]);

const stringToHslColor = (str, s, l) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash);
  const h = hash % 360;
  return `hsl(${h}, ${s}%, ${l}%)`;
};

const getAvatarColor = (initials) => {
  const defined = {
    MS: "#F59E0B",
    ND: "#3B82F6",
  };
  return defined[initials] ?? stringToHslColor(initials, 45, 75);
};

const viewDetails = (item) => {
  const status = applicantStatus(item);

  if (status === "Pending") {
    selectedApplicant.value = item;
    approvalDialog.value = true;
  } else if (status === "Approved") {
    router.push("/admin/ReportInput");
    console.log(
      `Navigating to /admin/ReportInput for approved application: ${item.applicationNumber}`
    );
  } else {
    console.log("View Details clicked for:", item);
    console.log(
      `Details for ${item.name} (${item.applicationNumber}) should open here, current status: ${status}.`
    );
  }
};

const appHeaders = [
  { title: "Application Number", key: "applicationNumber", sortable: false },
  { title: "Applicant Name", key: "name", sortable: false },
  { title: "Date", key: "date", sortable: true },
  { title: "Time", key: "time", sortable: false },
  { title: "Status", key: "status", sortable: true },
  { title: "Action", key: "action", sortable: false },
];

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
  pageContainer: {
    maxWidth: "1460px",
    margin: "16px auto 0",
    padding: "0 12px",
  },
  statCard: {
    background: "#fff",
    borderRadius: "8px",
    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
    padding: "16px",
    minHeight: "100px",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    transition: "transform 0.1s ease-in-out",
  },
  statLabel: {
    fontSize: "15px",
    color: "#475467",
    fontWeight: 500,
    marginBottom: "8px",
  },
  statValueGroup: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  statValue: {
    fontSize: "36px",
    color: "#111827",
    fontWeight: 800,
    lineHeight: 1,
  },
  statInlineIcon: {
    fontSize: "40px",
    lineHeight: 1,
  },
  filterBtn: {
    background: "#e5e7eb",
    color: "#4b5563",
    borderRadius: "10px",
    textTransform: "none",
    fontWeight: 600,
    height: "42px",
    boxShadow: "none",
  },
  searchWrapper: {
    flexGrow: 1,
    maxWidth: "350px",
    marginRight: "8px",
  },
  tableCard: { borderRadius: "12px", overflow: "hidden" },
  tableHeader: {
    background: "#f8fafc",
    color: "#334155",
    fontSize: "12px",
    fontWeight: 700,
    textTransform: "uppercase",
  },
  statusPill: {
    padding: "4px 10px",
    borderRadius: "16px",
    fontSize: "12px",
    fontWeight: 700,
  },
  viewBtn: {
    background: "#3b82f6",
    color: "#fff",
    textTransform: "none",
    fontWeight: 600,
    borderRadius: "4px",
  },
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
  approveBtn: {
    background: "#22c55e",
    color: "#fff",
    textTransform: "capitalize",
    fontWeight: 600,
  },
  rejectBtn: {
    background: "#ef4444",
    color: "#fff",
    textTransform: "capitalize",
    fontWeight: 600,
  },
};

const statusStyles = {
  Approved: { background: "#e6f9ee", color: "#067647" },
  Pending: { background: "#fff7e6", color: "#92400e" },
  Return: { background: "#fee2e2", color: "#991b1b" },
};
</script>

<style scoped>
.header-subtitle {
  font-size: 12px;
  font-weight: 400;
  color: #111827;
  line-height: 1.2;
}

.header-title {
  font-size: 15px;
  font-weight: 700;
  color: #111827;
  line-height: 1.2;
}

.profile-btn {
  background-color: transparent !important;
  box-shadow: none !important;
  padding: 0 !important;
  min-width: unset !important;
}

.profile-name {
  color: #555 !important;
}

.profile-role {
  color: #888 !important;
}

.custom-data-table tr:hover {
  background-color: #f5f5f5 !important;
}

.custom-data-table tr td {
  border-bottom: 1px solid #e5e7eb;
}

/* Schedule Dialog Styles */
.schedule-dialog-card {
  border-radius: 12px !important;
}

.schedule-dialog-header {
  background-color: #f9fafb;
  display: flex;
  align-items: center;
}

.schedule-dialog-title {
  font-size: 18px;
  font-weight: 600;
  color: #111827;
}

.schedule-dialog-subtitle {
  font-size: 14px;
  color: #6b7280;
  line-height: 1.5;
}

.schedule-field-label {
  font-size: 12px;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  margin-bottom: 6px;
  letter-spacing: 0.5px;
}

.schedule-field-value {
  font-size: 15px;
  font-weight: 500;
  color: #111827;
}

/* Reject Dialog Styles */
.reject-dialog-card {
  border-radius: 12px !important;
}

.reject-dialog-header {
  background-color: #f9fafb;
  display: flex;
  align-items: center;
}

.reject-dialog-title {
  font-size: 18px;
  font-weight: 600;
  color: #111827;
}

.reject-dialog-subtitle {
  font-size: 14px;
  color: #6b7280;
  line-height: 1.5;
}

.field-label {
  font-size: 13px;
  font-weight: 600;
  color: #374151;
}

.reject-textarea :deep(.v-field) {
  border-radius: 8px;
  font-size: 14px;
}

.reject-textarea :deep(.v-field__input) {
  padding: 12px;
}
</style>
