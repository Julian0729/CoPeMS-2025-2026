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
      </v-container>
    </v-app-bar>

    <v-navigation-drawer app permanent width="280" class="navigation-drawer">
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

    <v-main class="main-content">
      <div :style="s.pageContainer"></div>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from "vue";
// Note: useRouter is kept in case you use it elsewhere, but it's not strictly needed
// for the logic remaining.
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
    to: "/admin/AdminDashboard",
  },
];

const router = useRouter();

const logOut = () => {
  console.log("Log Out clicked. User should be logged out.");
};

// Simplified 's' object, keeping only styles related to the header, sidebar, and main wrapper
const s = {
  pageContainer: {
    maxWidth: "1460px",
    margin: "16px auto 0",
    padding: "0 12px",
  },
  profileBtn: {
    backgroundColor: "transparent",
    boxShadow: "none",
    padding: 0,
    minWidth: "unset",
  },
};
</script>

<style scoped>
.navigation-drawer {
  background: linear-gradient(180deg, #ffffff 0%, #ffffff 100%) !important;
  border: none !important;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.15) !important;
  overflow: hidden !important;
  height: calc(100vh - 88px) !important;
  top: 88px !important;
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
  height: calc(100vh - 88px);
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
</style>
