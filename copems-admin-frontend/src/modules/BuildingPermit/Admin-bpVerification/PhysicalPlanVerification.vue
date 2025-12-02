<template>
  <v-app>
    <v-app-bar flat color="#0000CC" dark height="88" app class="elevation-4">
      <v-container
        fluid
        class="d-flex align-center py-0"
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
            <div
              style="
                font-size: 12px;
                font-weight: 400;
                color: white;
                line-height: 1.2;
              "
            >
              REPUBLIC OF THE PHILIPPINES
            </div>
            <div
              style="
                font-size: 15px;
                font-weight: 700;
                color: white;
                line-height: 1.2;
              "
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
          <v-icon color="#3b82f6" class="mr-2">mdi-office-building</v-icon>
          <h3 class="mb-0 font-weight-bold" :style="s.textToolbar">
            Building Permit Application
          </h3>
        </div>
        <div class="right d-flex align-center">
          <v-menu :close-on-content-click="false" location="bottom end">
            <template v-slot:activator="{ props }">
              <v-btn
                variant="text"
                :style="s.profileBtn"
                v-bind="props"
                class="mr-2"
              >
                <v-badge
                  dot
                  color="red"
                  offset-x="10"
                  offset-y="10"
                  :model-value="filteredApplicationsToEvaluate.length > 0"
                >
                  <v-icon>mdi-bell-outline</v-icon>
                </v-badge>
              </v-btn>
            </template>
            <v-card min-width="320" max-width="400" class="rounded-lg">
              <v-card-title
                class="d-flex justify-space-between align-center text-subtitle-1 font-weight-bold py-3"
              >
                <span>Applications to Evaluate</span>
                <v-btn
                  icon
                  size="small"
                  variant="text"
                  @click="closeNotifications"
                >
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-card-title>
              <v-divider></v-divider>
              <v-list dense>
                <v-list-item
                  v-for="(app, i) in filteredApplicationsToEvaluate"
                  :key="i"
                  class="py-2"
                >
                  <template v-slot:prepend>
                    <v-avatar
                      size="40"
                      :color="getAvatarColor(app.initials)"
                      class="text-white font-weight-bold"
                    >
                      {{ app.initials }}
                    </v-avatar>
                  </template>
                  <v-list-item-title class="font-weight-bold text-body-2">{{
                    app.name
                  }}</v-list-item-title>
                  <v-list-item-subtitle class="text-caption">{{
                    app.message
                  }}</v-list-item-subtitle>
                  <template v-slot:append>
                    <v-chip
                      size="x-small"
                      label
                      :color="getStatusColor(app.status)"
                      >{{ app.status }}</v-chip
                    >
                  </template>
                </v-list-item>
              </v-list>
            </v-card>
          </v-menu>

          <v-menu :close-on-content-click="true" location="bottom end">
            <template #activator="{ props }">
              <v-btn variant="text" :style="s.profileBtn" v-bind="props">
                <v-avatar size="32" class="mx-2">
                  <v-img
                    :alt="mockEvaluatorProfile.name"
                    :src="mockEvaluatorProfile.image"
                  />
                </v-avatar>
                <div class="d-flex flex-column text-left">
                  <span
                    class="text-caption font-weight-bold"
                    style="color: #555; white-space: nowrap"
                    >{{ mockEvaluatorProfile.name }}</span
                  >
                  <span
                    class="text-caption font-weight-medium"
                    style="color: #888; white-space: nowrap"
                    >{{ mockEvaluatorProfile.title }}</span
                  >
                </div>
                <v-icon class="ml-1" size="small">mdi-chevron-down</v-icon>
              </v-btn>
            </template>
            <v-card min-width="250" class="mt-1">
              <v-list density="compact" nav>
                <v-list-item>
                  <v-list-item-title class="font-weight-bold">{{
                    mockEvaluatorProfile.name
                  }}</v-list-item-title>
                  <v-list-item-subtitle>{{
                    mockEvaluatorProfile.specialty
                  }}</v-list-item-subtitle>
                </v-list-item>
                <v-divider class="my-1"></v-divider>
                <v-list-item link @click="logout" class="text-red-darken-1">
                  <template #prepend><v-icon>mdi-logout</v-icon></template>
                  <v-list-item-title>Log Out</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-card>
          </v-menu>
        </div>
      </div>

      <div :style="s.pageContainer">
        <v-row class="mb-6">
          <v-col
            v-for="card in statCards"
            :key="card.key"
            cols="12"
            sm="6"
            md="3"
          >
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
          <v-col
            cols="12"
            sm="8"
            md="6"
            class="d-flex justify-end align-center"
          >
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

        <!-- Placeholder for Applicant List (Implicitly needed for a search interface) -->
        <v-card class="rounded-lg border" flat>
          <v-table>
            <thead>
              <tr>
                <th class="text-left">Applicant</th>
                <th class="text-left">Project</th>
                <th class="text-left">Date</th>
                <th class="text-left">Status</th>
                <th class="text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="n in 5" :key="n">
                <td>
                  <div class="font-weight-bold text-body-2">
                    Juan Dela Cruz {{ n }}
                  </div>
                  <div class="text-caption text-grey">
                    2024-BP-00{{ 1230 + n }}
                  </div>
                </td>
                <td class="text-body-2">Commercial Building</td>
                <td class="text-body-2">Nov {{ 15 + n }}, 2024</td>
                <td><v-chip size="x-small" color="blue" label>New</v-chip></td>
                <td>
                  <v-btn size="small" variant="text" color="primary"
                    >View</v-btn
                  >
                </td>
              </tr>
            </tbody>
          </v-table>
        </v-card>
      </div>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from "vue";

// --- Styles Object (s) ---
const s = {
  topToolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 24px",
    backgroundColor: "white",
    borderBottom: "1px solid #e2e8f0",
    position: "sticky",
    top: "0",
    zIndex: 10,
  },
  textToolbar: {
    fontSize: "1.25rem",
    color: "#0f172a",
  },
  profileBtn: {
    textTransform: "none",
    letterSpacing: "normal",
    color: "#334155",
  },
  pageContainer: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "24px",
  },
  statCard: {
    backgroundColor: "white",
    borderRadius: "12px",
    padding: "20px",
    border: "1px solid #e2e8f0",
    cursor: "pointer",
    transition: "transform 0.2s, box-shadow 0.2s",
    height: "100%",
    boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1)",
  },
  statLabel: {
    fontSize: "0.875rem",
    color: "#64748b",
    fontWeight: "500",
    marginBottom: "8px",
  },
  statValueGroup: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statValue: {
    fontSize: "1.5rem",
    fontWeight: "700",
    color: "#0f172a",
  },
  statInlineIcon: {
    opacity: 0.8,
    fontSize: "24px",
  },
  searchWrapper: {
    width: "100%",
    maxWidth: "300px",
    marginRight: "12px",
  },
  filterBtn: {
    textTransform: "none",
    backgroundColor: "white",
    border: "1px solid #e2e8f0",
    boxShadow: "none",
    height: "44px",
  },
};

// --- Data ---
const search = ref("");
const filterOptions = ["Total", "Pending", "Approved", "Rejected"];

const mockEvaluatorProfile = ref({
  name: "Alyssa C. Alvarez",
  title: "Architect",
  specialty: "Architect",
  image: "https://randomuser.me/api/portraits/men/32.jpg",
});

const filteredApplicationsToEvaluate = ref([
  {
    name: "Maria Santos",
    initials: "MS",
    message: "New application received",
    status: "New",
  },
  {
    name: "Juan Cruz",
    initials: "JC",
    message: "Resubmission pending review",
    status: "Urgent",
  },
  {
    name: "ABC Construction",
    initials: "AB",
    message: "Permit ready for signing",
    status: "Pending",
  },
]);

const statCards = ref([
  {
    key: "total",
    label: "Total Applications",
    value: "1,248",
    icon: "mdi-folder-multiple-outline",
    iconColor: "blue",
    clickStatus: "Total",
  },
  {
    key: "pending",
    label: "Pending Review",
    value: "45",
    icon: "mdi-clock-outline",
    iconColor: "orange",
    clickStatus: "Pending",
  },
  {
    key: "approved",
    label: "Approved Today",
    value: "12",
    icon: "mdi-check-circle-outline",
    iconColor: "green",
    clickStatus: "Approved",
  },
  {
    key: "rejected",
    label: "Returned/Rejected",
    value: "3",
    icon: "mdi-alert-circle-outline",
    iconColor: "red",
    clickStatus: "Rejected",
  },
]);

// --- Methods ---
const filterByStatus = (status: string) => {
  console.log(`Filtering by: ${status}`);
  // Implementation for filtering logic would go here
};

const getAvatarColor = (initials: string) => {
  const colors = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];
  const index = initials.charCodeAt(0) % colors.length;
  return colors[index];
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "New":
      return "blue";
    case "Urgent":
      return "red";
    case "Pending":
      return "orange";
    default:
      return "grey";
  }
};

const closeNotifications = () => {
  console.log("Close notifications");
};

const logout = () => {
  console.log("Logout");
};
</script>

<style scoped>
/* Scoped styles mainly handled by the 's' object in template, but global overrides here */
.v-text-field :deep(.v-field__input) {
  padding-top: 10px;
  padding-bottom: 10px;
}
</style>