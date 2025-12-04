<template>
  <v-app>
    <v-navigation-drawer app permanent width="280" class="navigation-drawer">
      <div class="drawer-header">
        <div class="header-logo-wrapper">
          <img src="@/assets/copemslogo.png" alt="CoPeMS Logo" class="header-logo" />
        </div>
        <div class="header-text">
          <div class="header-title">CoPeMS</div>
          <div class="header-subtitle">OBO Dashboard</div>
        </div>
      </div>

      <div class="nav-content">
        <v-list nav class="nav-list">
          <v-list-item
            v-for="item in navItems"
            :key="item.title"
            :to="item.to"
            :class="['nav-item', { 'nav-item--active': $route.path === item.to }]"
          >
            <template #prepend>
              <v-icon :color="'#111827'" size="20">
                {{ item.icon }}
              </v-icon>
            </template>
            <v-list-item-title class="nav-item-text">
              {{ item.title }}
            </v-list-item-title>
            <template #append v-if="item.hasSubmenu">
              <v-icon :color="'#111827'" size="16"> mdi-chevron-right </v-icon>
            </template>
          </v-list-item>
        </v-list>

        <div class="nav-bottom">
          <v-list nav class="nav-list">
            <v-list-item @click="logOut" class="logout-item">
              <template #prepend>
                <v-icon color="#111827" size="20">mdi-logout-variant</v-icon>
              </template>
              <v-list-item-title class="logout-text"> Logout </v-list-item-title>
            </v-list-item>
          </v-list>
        </div>
      </div>
    </v-navigation-drawer>

    <div :style="s.topToolbar" class="d-flex justify-space-between align-center">
      <div class="left d-flex align-center">
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
                <v-list-item-subtitle> lea.bernice@nagacity.gov.ph </v-list-item-subtitle>
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
    <v-main class="main-content">
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
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

const navItems = [
  {
    title: "Building Permit",
    icon: "mdi-home-city-outline",
    to: "/dashboard",
  },
  {
    title: "Locational Clearance",
    icon: "mdi-map-marker-radius-outline",
    to: "/locational-clearance",
  },
  {
    title: "Compliance Monitoring",
    icon: "mdi-clipboard-check-multiple-outline",
    to: "/admin/opmonitoring",
    hasSubmenu: true,
  },
  {
    title: "Occupancy Permit",
    icon: "mdi-key-variant",
    to: "/inspection",
  },
];

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
    dateSubmitted: "July 1, 24025",
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

const getRouteForStatus = (status) => {
  switch (status) {
    case "Pending":
      return "/admin/OPchecklist";
    case "Verified":
      return "/admin/OPverified";
    case "Return":
      return "/admin/OPreturn";
    default:
      return "/admin/OPdefaultdetails";
  }
};

const viewDetails = (item) => {
  const status = applicantStatus(item);
  const route = getRouteForStatus(status);

  router.push({
    path: route,
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
    position: "fixed",
    top: 0,
    left: "280px",
    right: 0,
    zIndex: 1000,
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
    marginTop: "calc(12px + 60px)",
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
  // UPDATED: Standard Blue Style for the "View Details" button
  viewBtn: {
    background: "#3b82f6" /* Blue color for primary action */,
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
.navigation-drawer {
  background: linear-gradient(180deg, #ffffff 0%, #ffffff 100%) !important;
  border: none !important;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.15) !important;
  overflow: hidden !important;
  height: 100vh !important;
}

.drawer-header {
  padding: 24px 20px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 8px;
}

.header-logo-wrapper {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
}
.header-logo {
  width: 32px;
  height: 32px;
  object-fit: contain;
}

.header-text {
  color: #111827;
}

.header-title {
  font-size: 18px;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: 0.5px;
  color: #111827;
}

.header-subtitle {
  font-size: 12px;
  font-weight: 400;
  opacity: 0.8;
  line-height: 1.2;
  color: #111827;
}

.nav-content {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 96px);
  overflow: hidden;
}

.nav-list {
  padding: 8px 0 !important;
  overflow: hidden;
}

.nav-item {
  margin: 0 16px 4px 16px !important;
  border-radius: 8px !important;
  min-height: 44px !important;
  padding: 0 16px !important;
  transition: all 0.2s ease !important;
}

.nav-item:hover {
  background-color: #f5f5f5 !important;
}

.nav-item--active {
  background-color: #e0f7fa !important;
  box-shadow: none !important;
}

.nav-item--active .v-icon {
  color: #00bcd4 !important;
}

.nav-item-text {
  color: #111827 !important;
  font-size: 14px !important;
  font-weight: 500 !important;
  letter-spacing: 0.25px !important;
}

.nav-item--active .nav-item-text {
  color: #111827 !important;
  font-weight: 600 !important;
}

.nav-bottom {
  margin-top: auto;
  border-top: 1px solid #e5e7eb;
  padding-top: 16px;
}

.logout-item {
  margin: 0 16px !important;
  border-radius: 8px !important;
  min-height: 44px !important;
  padding: 0 16px !important;
  transition: all 0.2s ease !important;
}

.logout-item:hover {
  background-color: rgba(239, 68, 68, 0.1) !important;
}

.logout-text {
  color: #111827 !important;
  font-size: 14px !important;
  font-weight: 500 !important;
}

.logout-item:hover .logout-text {
  color: #111827 !important;
}

.main-content {
  background-color: #f8fafc !important;
}

.custom-data-table tr:hover {
  background-color: #f5f5f5 !important;
}

.custom-data-table tr td {
  border-bottom: 1px solid #e5e7eb;
}
</style>
