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

    <v-main style="background-color: #f5f6fa">
      <v-container class="py-8">
        <v-btn variant="text" color="primary" class="mb-4 text-none" @click="goBack">
          <v-icon start>mdi-arrow-left</v-icon>
          Back to Application
        </v-btn>

        <v-card
          class="mx-auto pa-6 pa-md-8 checklist-card"
          max-width="1200"
          rounded="xl"
          elevation="0"
        >
          <div class="header-section">
            <div class="title-section">
              <div class="icon-wrapper">
                <v-icon class="checklist-icon">mdi-clipboard-check-outline</v-icon>
              </div>
              <div class="title-content">
                <h1 class="checklist-title">Occupancy Requirements</h1>
                <p class="checklist-subtitle">
                  Verification checklist for occupancy permit application
                </p>
              </div>
            </div>
            <div class="status-wrapper">
              <div class="status-chip">
                <v-icon class="status-icon">mdi-check-circle</v-icon>
                <span class="status-text">Verified</span>
              </div>
            </div>
          </div>

          <div class="divider-section"></div>

          <v-list class="checklist-list">
            <v-list-item
              v-for="(item, index) in checklistItems"
              :key="index"
              class="checklist-item"
            >
              <template #prepend>
                <div class="check-icon-wrapper">
                  <v-icon class="check-icon">mdi-check</v-icon>
                </div>
              </template>
              <div class="item-content">
                <div class="item-title">{{ item.title }}</div>
                <div v-if="item.details" class="item-details">
                  {{ item.details }}
                </div>
              </div>
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
];

const logOut = () => {
  console.log("Log Out clicked. User should be logged out.");
};

const goBack = () => {
  router.push("/admin/VerifiedApplication", {});
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
/* Header Styles */
.header-subtitle {
  font-size: 12px;
  font-weight: 400;
  color: black;
  line-height: 1.2;
}

.header-title {
  font-size: 15px;
  font-weight: 700;
  color: black;
  line-height: 1.2;
}

/* Profile Button */
.profile-btn {
  background-color: transparent !important;
  box-shadow: none !important;
  padding: 0 !important;
  min-width: unset !important;
}

.profile-name {
  color: #555 !important;
  white-space: nowrap;
}

.profile-role {
  color: #888 !important;
  white-space: nowrap;
}

/* Main Card */
.checklist-card {
  background: #ffffff;
  border: 1px solid #f1f5f9;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05) !important;
}

/* Header Section */
.header-section {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 32px;
  gap: 24px;
}

.title-section {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  flex: 1;
}

.icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  border-radius: 12px;
  flex-shrink: 0;
}

.checklist-icon {
  color: white;
  font-size: 24px;
}

.title-content {
  flex: 1;
}

.checklist-title {
  font-size: 28px;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
  line-height: 1.2;
  letter-spacing: -0.025em;
}

.checklist-subtitle {
  font-size: 16px;
  color: #64748b;
  margin: 4px 0 0 0;
  font-weight: 400;
}

/* Status Chip */
.status-wrapper {
  display: flex;
  align-items: flex-start;
}

.status-chip {
  display: flex;
  align-items: center;
  gap: 6px;
  background: #d1fae5;
  color: #059669;
  padding: 6px 12px;
  border-radius: 6px;
  border: 1px solid #a7f3d0;
}

.status-icon {
  color: #059669;
  font-size: 16px;
}

.status-text {
  color: #059669;
  font-weight: 600;
  font-size: 13px;
}

/* Divider */
.divider-section {
  height: 1px;
  background: linear-gradient(90deg, #e2e8f0 0%, #cbd5e1 50%, #e2e8f0 100%);
  margin-bottom: 32px;
}

/* Checklist List */
.checklist-list {
  background: transparent;
  padding: 0;
}

.checklist-item {
  padding: 20px 0;
  border-bottom: 1px solid #f1f5f9;
  transition: all 0.2s ease;
}

.checklist-item:last-child {
  border-bottom: none;
}

.checklist-item:hover {
  background: #f8fafc;
  border-radius: 8px;
  padding-left: 12px;
  padding-right: 12px;
  margin: 0 -12px;
}

.check-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background: #10b981;
  border-radius: 6px;
  margin-right: 16px;
  flex-shrink: 0;
}

.check-icon {
  color: white;
  font-size: 14px;
  font-weight: 700;
}

.item-content {
  flex: 1;
}

.item-title {
  font-size: 16px;
  font-weight: 500;
  color: #1e293b;
  line-height: 1.5;
  margin-bottom: 4px;
}

.item-details {
  font-size: 14px;
  color: #64748b;
  font-style: italic;
  line-height: 1.4;
}

/* Back Button Enhancement */
.v-btn {
  text-transform: none !important;
}

/* Responsive Design */
@media (max-width: 768px) {
  .header-section {
    flex-direction: column;
    gap: 20px;
  }

  .title-section {
    gap: 12px;
  }

  .checklist-title {
    font-size: 24px;
  }

  .checklist-subtitle {
    font-size: 14px;
  }

  .icon-wrapper {
    width: 40px;
    height: 40px;
  }

  .checklist-icon {
    font-size: 20px;
  }
}
</style>
