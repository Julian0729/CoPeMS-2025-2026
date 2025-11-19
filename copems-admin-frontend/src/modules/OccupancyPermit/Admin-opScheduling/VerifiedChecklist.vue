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
    <v-app-bar app fixed color="white" elevation="1" height="64">
      <v-toolbar-title class="title-inline">
        <v-icon color="#3b82f6" class="mr-2">mdi-home-city</v-icon>
        <span class="title-text">Occupancy Permit Application</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-menu :close-on-content-click="true" location="bottom end">
        <template #activator="{ props }">
          <v-btn variant="text" :style="s.profileBtn" v-bind="props">
            <v-avatar size="32" class="mx-2">
              <v-img
                alt="Jacque"
                src="https://i.pinimg.com/736x/71/84/c9/7184c9d52f44b93a96f09451fdcf6d44.jpg"
              />
            </v-avatar>
            <div class="d-flex flex-column text-left hidden-sm-and-down">
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
    </v-app-bar>

    <v-main style="background-color: #f5f6fa">
      <v-container class="py-8">
        <v-btn variant="text" color="primary" class="mb-4 text-none" @click="goBack">
          <v-icon start>mdi-arrow-left</v-icon>
          Back to Application
        </v-btn>

        <v-card class="mx-auto pa-4 pa-md-6" max-width="1200" rounded="lg" elevation="4">
          <div class="d-flex justify-space-between align-center mb-4">
            <div class="d-flex align-center">
              <v-icon color="#1e3a8a" class="mr-3" size="25"
                >mdi-checkbox-multiple-marked-outline</v-icon
              >
              <h2 class="text-h8 font-weight-bold text-grey-darken-4">
                Occupancy Requirement Checklist
              </h2>
            </div>
            <v-chip color="green-darken-2" label size="large" class="font-weight-bold">
              <v-icon start icon="mdi-check-circle-outline"></v-icon>
              Verified
            </v-chip>
          </div>

          <v-divider class="mb-4"></v-divider>

          <v-list lines="two" density="comfortable" class="bg-transparent">
            <v-list-item
              v-for="(item, index) in checklistItems"
              :key="index"
              class="mb-2 pa-0"
              :class="{ 'border-b': index < checklistItems.length - 1 }"
            >
              <template #prepend>
                <v-icon color="success" size="24" class="mr-3">mdi-check-circle</v-icon>
              </template>
              <v-list-item-title
                class="font-weight-medium text-body-1 text-grey-darken-3"
              >
                {{ item.title }}
              </v-list-item-title>
              <v-list-item-subtitle
                v-if="item.details"
                class="text-caption text-grey-darken-1"
              >
                Details: {{ item.details }}
              </v-list-item-subtitle>
            </v-list-item>
          </v-list>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const checklistItems = [
  {
    title:
      "Two (2) copies of accomplished Unified Application form for Certificate of Occupancy, duly notarized;",
    details: null,
  },
  {
    title: "Two (2) copies of Certificate of Completion, duly notarized;",
    details: null,
  },
  {
    title:
      "Construction Logbook, signed and sealed by the Owner's Architect or Civil Engineer who undertook full-time inspection and supervision;",
    details: null,
  },
  {
    title: "Two (2) photocopies of the valid licenses of all involved professionals;",
    details: null,
  },
  {
    title:
      "Photograph of the structure with substantial completion showing front, sides, and rear areas;",
    details: null,
  },
  {
    title:
      "Two (2) sets of As-Built Plans, if there are changes in the building plans covered by the issued Building Permit;",
    details: null,
  },
  {
    title: "Two (2) copies of Certificate of Final Electrical Inspection;",
    details: null,
  },
  {
    title:
      "Two (2) copies of Fire Safety Inspection Certificate from the Bureau of Fire and Protection;",
    details: null,
  },
  {
    title: "Sketch map indicating the location of the project;",
    details: null,
  },
  {
    title: "Others:",
    details: "Submitted latest version of the site plan and structural analysis.",
  },
];

const logOut = () => {
  console.log("Log Out clicked. User should be logged out.");
};

const goBack = () => {
  router.push("/admin/OPverified");
  console.log("Navigating back to OPverified page.");
};

const s = {
  profileBtn: {
    backgroundColor: "transparent",
    boxShadow: "none",
    padding: 0,
    minWidth: "unset",
  },
};
</script>

<style scoped>
.border-b {
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 8px;
}

.title-inline {
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
}
.title-text {
  color: #111827;
  font-weight: 700;
  font-size: 1rem;
  line-height: 1;
}
</style>
