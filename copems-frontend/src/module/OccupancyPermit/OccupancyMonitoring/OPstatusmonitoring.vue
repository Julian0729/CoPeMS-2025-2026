<template>
  <v-app>
    <v-main class="no-scroll">
      <v-container fluid class="pa-0 content-area">
        <v-row no-gutters class="fill-height">
          <v-col cols="12" md="3" class="pa-0">
            <v-card
              flat
              class="pa-4 quick-guide-card d-flex flex-column justify-space-between elevation-2"
              style="border-right: 1px solid #e0e0e0; height: 100%; background: #fcfcff"
            >
              <div>
                <h4 class="mb-2 text-h5 font-weight-bold text-blue-darken-3">
                  Occupancy Permit Application
                </h4>
                <div class="text-subtitle-2 mb-6 text-blue-grey-darken-1">
                  Follow these steps to complete your application
                </div>
                <v-card
                  v-for="(step, index) in steps"
                  :key="index"
                  flat
                  class="d-flex align-center pa-3 mb-4 rounded-lg quick-guide-step"
                  :class="{
                    'active-step': currentStep === index,
                    'disabled-step': true,
                  }"
                  :elevation="currentStep === index ? 3 : 0"
                  style="transition: box-shadow 0.16s, background 0.16s"
                >
                  <v-avatar
                    :color="currentStep === index ? 'primary' : '#2563EB'"
                    size="36"
                    class="white--text mr-3 quick-guide-avatar"
                  >
                    <span class="text-h6 font-weight-bold">
                      {{ index + 1 }}
                    </span>
                  </v-avatar>
                  <div class="font-weight-bold text-body-1 step-label">
                    {{ step }}
                  </div>
                </v-card>
              </div>
              <v-spacer></v-spacer>
              <div class="mt-4">
                <v-btn
                  block
                  color="white"
                  variant="flat"
                  to="/"
                  class="text-capitalize font-weight-bold logout-btn-white"
                  @click="handleLogout"
                >
                  <v-icon left color="black">mdi-logout</v-icon>
                  <span style="color: #222; font-weight: bold">Logout</span>
                </v-btn>
              </div>
            </v-card>
          </v-col>

          <v-col cols="12" md="9" class="pa-6 main-content-bg">
            <v-card flat class="pa-4 rounded-lg application-info-card mb-6">
              <div class="d-flex justify-space-between align-center mb-4">
                <h2 class="text-h4 font-weight-bold text-grey-darken-4">
                  Application OP-2025-001
                </h2>
                <span
                  class="text-subtitle-1 font-weight-medium text-grey d-flex align-center"
                >
                  OP-2025-001
                  <v-btn
                    icon
                    size="small"
                    variant="text"
                    color="blue-darken-3"
                    class="ml-2"
                    @click="notificationsVisible = true"
                  >
                  </v-btn>
                </span>
              </div>

              <v-row dense class="text-body-2">
                <v-col cols="6" sm="3" class="pr-4">
                  <div class="font-weight-bold text-grey-darken-1 mb-1">
                    Submission Date:
                  </div>
                  <div class="text-h6 font-weight-medium text-grey-darken-3">
                    January 15, 2025
                  </div>
                </v-col>

                <v-col cols="6" sm="3" class="pr-4 mt-4 mt-sm-0">
                  <div class="font-weight-bold text-grey-darken-1 mb-1">
                    Current Status:
                  </div>
                  <div class="text-h6 font-weight-medium text-success-darken-1">
                    Submitted Application
                  </div>
                </v-col>

                <v-col cols="6" sm="3" class="mt-4 mt-sm-0">
                  <div class="font-weight-bold text-grey-darken-1 mb-1">
                    Last Updated:
                  </div>
                  <div class="text-h6 font-weight-medium text-grey-darken-3">
                    2 minutes ago
                  </div>
                </v-col>
              </v-row>
            </v-card>
            <v-card flat class="released-permit-card mb-4">
              <div class="d-flex justify-space-between align-center px-6 pt-4 pb-2">
                <div class="d-flex align-center">
                  <v-icon class="mr-2" size="24" color="grey-darken-3"
                    >mdi-file-document-outline</v-icon
                  >
                  <h2 class="text-h6 font-weight-medium text-grey-darken-4">
                    Released Building Permit
                  </h2>
                </div>
                <v-chip
                  color="green lighten-4"
                  variant="flat"
                  size="small"
                  class="font-weight-bold"
                >
                  <v-icon start size="18">mdi-check-circle</v-icon>
                  Released
                </v-chip>
              </div>

              <div class="px-6 pb-4">
                <v-card flat class="pa-3 mb-4 permit-number-box">
                  <div
                    class="text-caption font-weight-medium text-uppercase text-grey-darken-1 mb-1"
                  >
                    BUILDING PERMIT NUMBER
                  </div>
                  <div class="text-h5 font-weight-bold text-blue-darken-2">
                    BP-2024-001
                  </div>
                </v-card>

                <v-row dense class="mb-2">
                  <v-col cols="12" sm="6">
                    <div
                      class="text-caption font-weight-medium text-uppercase text-grey-darken-1 mb-1"
                    >
                      APPLICATION DATE
                    </div>
                    <div class="d-flex align-center text-body-1 text-grey-darken-3">
                      <v-icon size="20" class="mr-2" color="grey-darken-1"
                        >mdi-calendar-month</v-icon
                      >
                      <span class="font-weight-medium">January 15, 2024</span>
                    </div>
                  </v-col>

                  <v-col cols="12" sm="6">
                    <div
                      class="text-caption font-weight-medium text-uppercase text-grey-darken-1 mb-1"
                    >
                      RELEASE DATE
                    </div>
                    <div class="d-flex align-center text-body-1 text-grey-darken-3">
                      <v-icon size="20" class="mr-2" color="grey-darken-1"
                        >mdi-calendar-check</v-icon
                      >
                      <span class="font-weight-medium">March 20, 2024</span>
                    </div>
                  </v-col>
                </v-row>

                <v-divider class="my-3"></v-divider>

                <v-row dense class="mb-2">
                  <v-col cols="12" sm="6">
                    <div
                      class="text-caption font-weight-medium text-uppercase text-grey-darken-1 mb-1"
                    >
                      PERMIT STATUS
                    </div>
                    <div class="d-flex align-center text-body-1" style="color: #2e7d32">
                      <v-icon size="10" class="mr-2" color="#2e7d32">mdi-circle</v-icon>
                      <span class="font-weight-bold" style="color: #2e7d32"
                        >Active & Valid</span
                      >
                    </div>
                  </v-col>

                  <v-col cols="12" sm="6">
                    <div
                      class="text-caption font-weight-medium text-uppercase text-grey-darken-1 mb-1"
                    >
                      VALIDITY PERIOD
                    </div>
                    <div class="text-body-1 text-grey-darken-3 font-weight-medium">
                      March 20, 2025
                    </div>
                  </v-col>
                </v-row>

                <v-divider class="my-3"></v-divider>

                <div class="mb-2">
                  <div
                    class="text-caption font-weight-medium text-uppercase text-grey-darken-1 mb-1"
                  >
                    AUTHORIZED PROJECT
                  </div>
                  <div class="text-h6 font-weight-bold text-grey-darken-4 mb-1">
                    Geguaman Residential Building
                  </div>
                  <div class="text-body-2 text-grey-darken-2">
                    456 Main St., Brgy. San Isidro, Naga City
                  </div>
                </div>
              </div>
            </v-card>

            <v-card flat class="pa-4 elevation-1 rounded-lg application-info-card">
              <h3 class="text-h6 font-weight-bold text-blue-darken-3 mb-6">
                <v-icon color="blue-darken-3" class="mr-2">
                  mdi-chart-timeline-variant
                </v-icon>
                Application Status Tracker (OP-2025-001)
              </h3>

              <v-timeline
                direction="vertical"
                side="end"
                line-thickness="4"
                line-color="grey-lighten-3"
                class="application-timeline"
              >
                <v-timeline-item
                  v-for="(status, index) in applicationStatuses"
                  :key="index"
                  size="small"
                  :icon="status.icon"
                  :dot-color="status.dotColor"
                  class="mb-4"
                >
                  <template v-slot:opposite>
                    <v-chip
                      :color="status.chipColor"
                      label
                      class="font-weight-bold"
                      size="small"
                    >
                      {{ status.status }}
                    </v-chip>
                  </template>

                  <div>
                    <h4 class="text-body-1 font-weight-bold mb-1">
                      {{ status.title }}
                    </h4>
                    <p class="text-caption mb-1">
                      Application ID: OP-2025-001
                      <span v-if="status.submittedDate" class="ml-2"
                        >Submitted: {{ status.submittedDate }}</span
                      >
                      <span v-if="status.awaiting" class="ml-2">{{
                        status.awaiting
                      }}</span>
                    </p>
                    <p class="text-body-2">
                      {{ status.description }}
                    </p>
                  </div>
                </v-timeline-item>
              </v-timeline>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "BuildingPermitPage",
  data() {
    return {
      currentStep: 0,
      notificationsVisible: false,
      steps: [
        "Fill up the Unified Application Form",
        "Download Filled-up Unified Application Form and Completion Permits",
      ],
      // Data for the Application Status Tracker
      applicationStatuses: [
        {
          title: "Submitted Application",
          description:
            "Your application has been successfully submitted and is now in the review process.",
          status: "Completed",
          icon: "mdi-check-circle",
          dotColor: "blue",
          chipColor: "green-lighten-1",
          submittedDate: "May 19, 2025",
        },
        {
          title: "Requirements Checklist Verification",
          description:
            "Submit Onsite Requirements Checklist for initial review and verification.",
          status: "Not Started",
          icon: "mdi-account-clock",
          dotColor: "blue",
          chipColor: "grey",
          awaiting: "Awaiting Submission",
        },
        {
          title: "Building Inspection",
          description:
            "Onsite inspection will be scheduled upon successful verification of requirements.",
          status: "Not Started",
          icon: "mdi-magnify",
          dotColor: "blue",
          chipColor: "grey",
          awaiting: "Pending Schedule",
        },
        {
          title: "Final Approval",
          description:
            "Final approval and permit issuance will proceed after successful inspection.",
          status: "Not Started",
          icon: "mdi-list-status",
          dotColor: "blue",
          chipColor: "grey",
          awaiting: "Awaiting previous stages",
        },
      ],
    };
  },
  methods: {
    handleLogout() {
      console.log("User logged out");
    },
    // The goToStep method is kept, but its body is empty to keep the steps non-clickable.
    goToStep(index) {
      // Do nothing to disable navigation
    },
    showNotifications() {
      this.notificationsVisible = true;
      console.log("Toggling notifications menu");
    },
  },
};
</script>

<style scoped>
/* Existing Styles */
.no-scroll {
  overflow: hidden !important;
}
.v-main.no-scroll {
  height: calc(100vh - 88px);
  display: flex;
  flex-direction: column;
  background: #f6fafd;
}
.content-area {
  flex: 1;
  overflow-y: auto;
  padding-bottom: 24px;
}
.main-content-bg {
  background: linear-gradient(90deg, #fafdff 70%, #f3f7ff 100%);
  border-radius: 0 24px 24px 0;
}

.page-title-gradient {
  color: white;
}

.quick-guide-card {
  min-height: 100%;
  background: #fcfcff;
  border-right: 1px solid #e0e0e0;
}
.quick-guide-step {
  transition: background 0.2s, box-shadow 0.2s;
}

.quick-guide-step:hover {
  background: none !important;
  box-shadow: none !important;
  cursor: default !important;
}

.disabled-step {
  pointer-events: none;
  opacity: 1;
}

.active-step {
  background: none !important;
  box-shadow: none !important;
  cursor: default !important;
}
.quick-guide-avatar {
  transition: background 0.2s;
}
.step-label {
  color: #23407c;
}

.application-info-card {
  border: 1px solid #e0e0e0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08) !important;
  background-color: white;
  border-radius: 8px !important;
}

.released-permit-card {
  margin: 0;
  border: 1px solid #e0e0e0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  border-radius: 8px !important;
}

.permit-number-box {
  border: 1px solid #e0eeef;
  background-color: #f7f9fc;
  border-radius: 6px !important;
}

.application-timeline {
  padding-left: 20px;
}
.v-timeline-item:deep(.v-timeline-item__opposite) {
  text-align: right !important;
  padding-right: 16px;
  min-width: 100px;
}
.v-timeline-item:deep(.v-timeline-item__body) {
  padding-left: 16px !important;
}
</style>
