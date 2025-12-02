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
    <v-navigation-drawer app permanent width="250" class="border-e">
      <div class="drawer-header">
        <v-icon size="36" class="me-2" color="#007bff">mdi-office-building</v-icon>
        <div>
          <div class="text-h7 font-weight-bold" style="line-height: 1.2">
            Construction Permit
          </div>
          <div class="text-caption font-weight-regular" style="color: #6c757d">
            Management System
          </div>
        </div>
      </div>
      <div class="d-flex flex-column">
        <v-list nav dense class="py-0 flex-grow-1" style="font-size: 14px">
          <v-list-item
            v-for="item in navItems"
            :key="item.title"
            :to="item.to"
            :class="['py-1', { 'v-list-item--active': $route.path === item.to }]"
            active-class="v-list-item--active-custom"
          >
            <div class="d-flex align-center">
              <v-icon class="me-3">{{ item.icon }}</v-icon>
              <span>{{ item.title }}</span>
            </div>
          </v-list-item>
        </v-list>
      </div>
    </v-navigation-drawer>
    <v-main style="background-color: #f5f6fa; padding-top: 88px">
      <div :style="s.heroBanner"></div>

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
        <v-row class="mb-6">
          <v-col v-for="card in statCards" :key="card.key" cols="12" sm="6" md="3">
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
                <td class="text-left">{{ item.dateSubmitted }}</td>
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
const navItems = [
  { title: "Dashboard", icon: "mdi-home-outline", to: "/dashboard" },
  {
    title: "Locational Clearance",
    icon: "mdi-map-marker-outline",
    to: "/locational-clearance",
  },
  {
    title: "Building Permit",
    icon: "mdi-file-document-outline",
    to: "/admin/ComplianceMonitoring",
  },
  {
    title: "Occupancy Permit",
    icon: "mdi-file-certificate-outline",
    to: "/admin/opmonitoring",
  },
];
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

const activeTab = ref("applications");
const search = ref("");
const activeFilterApps = ref("Total");
const loading = ref(false);
const router = useRouter();
const applicants = ref([
  {
    applicationNumber: "OP-2025-001",
    name: "Maria Santos",
    initials: "MS",
    dateSubmitted: "May 8, 2025",
    checklistStatus: "Pending",
  },
  {
    applicationNumber: "OP-2025-002",
    name: "Noah Deguzman",
    initials: "ND",
    dateSubmitted: "June 17, 2025",
    checklistStatus: "Verified",
  },
  {
    applicationNumber: "OP-2025-003",
    name: "John Doe",
    initials: "JD",
    dateSubmitted: "July 1, 2025",
    checklistStatus: "Return",
  },
]);

const applicantStatus = (applicant) => {
  return applicant.checklistStatus;
};

const statCards = computed(() => {
  const total = applicants.value.length;
  const pending = applicants.value.filter((a) => applicantStatus(a) === "Pending").length;
  const verified = applicants.value.filter((a) => applicantStatus(a) === "Verified")
    .length;
  const returned = applicants.value.filter((a) => applicantStatus(a) === "Return").length;

  return [
    {
      key: "total",
      label: "Total Applicants",
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
      key: "verified",
      label: "Verified",
      value: verified,
      icon: "mdi-check-circle-outline",
      iconColor: "#22c55e",
      clickStatus: "Verified",
    },
    {
      key: "return",
      label: "Return",
      value: returned,
      icon: "mdi-alert-circle-outline",
      iconColor: "#ef4444",
      clickStatus: "Return",
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

const filterOptions = computed(() => ["Total", "Pending", "Verified", "Return"]);

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
    JD: "#22c55e",
  };
  return defined[initials] ?? stringToHslColor(initials, 45, 75);
};

// Helper function to determine the route based on the status
const getRouteForStatus = (status) => {
  switch (status) {
    case "Pending":
      return "/admin/OPchecklist";
    case "Verified":
      return "/admin/OPverified";
    case "Return":
      return "/admin/OPreturn";
    // Add more cases as needed for other statuses
    default:
      // Fallback route
      return "/admin/OPdefaultdetails";
  }
};

const viewDetails = (item) => {
  const status = applicantStatus(item);
  const route = getRouteForStatus(status);

  router.push({
    path: route, // Dynamically determined route
    query: { applicationNumber: item.applicationNumber },
    state: { applicantData: item, isInitialLoad: true },
  });
};

const appHeaders = [
  { title: "Application Number", key: "applicationNumber", sortable: false },
  { title: "Applicant Name", key: "name", sortable: false },
  { title: "Date Submitted", key: "dateSubmitted", sortable: true },
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
};

const statusStyles = {
  Verified: { background: "#e6f9ee", color: "#067647" },
  Pending: { background: "#fff7e6", color: "#92400e" },
  Return: { background: "#fee2e2", color: "#991b1b" },
  Passed: { background: "#d1fae5", color: "#065f46" },
  Violation: { background: "#fee2e2", color: "#991b1b" },
};
</script>

<style scoped>
.custom-data-table tr:hover {
  background-color: #f5f5f5 !important;
}
.custom-data-table tr td {
  border-bottom: 1px solid #e5e7eb;
}
</style>
