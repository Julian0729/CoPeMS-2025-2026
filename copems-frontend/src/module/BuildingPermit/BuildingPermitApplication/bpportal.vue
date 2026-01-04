<template>
  <v-app>
    <v-app-bar elevation="1" color="white" height="60" style="flex-shrink: 0">
      <v-container
        class="d-flex align-center px-6"
        fluid
        style="max-width: 1300px"
      >
        <h1 class="text-subtitle-1 font-weight-bold text-grey-darken-3">
          Building Permit Information
        </h1>
        <v-spacer></v-spacer>

        <v-menu v-model="showProfileMenu" location="bottom end" offset="10">
          <template v-slot:activator="{ props }">
            <v-btn
              variant="text"
              class="text-none px-2"
              v-bind="props"
              height="40"
            >
              <div class="d-flex align-center">
                <v-avatar
                  color="blue-lighten-5"
                  size="32"
                  class="mr-2 text-blue-darken-1 font-weight-medium text-caption"
                >
                  JL
                </v-avatar>
                <div class="d-none d-sm-block text-left mr-2">
                  <div class="text-caption font-weight-bold text-grey-darken-3">
                    Julian Lumanta
                  </div>
                </div>
                <v-icon size="small" color="grey-lighten-1"
                  >mdi-chevron-down</v-icon
                >
              </div>
            </v-btn>
          </template>

          <v-list elevation="2" rounded="lg" border density="compact">
            <v-list-item @click="handleLogout" density="compact">
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-container>
    </v-app-bar>

    <v-main class="bg-grey-lighten-5 pt-0">
      <v-container style="max-width: 1300px" class="pa-0 px-6 pb-6" fluid>
        <div class="mb-1 mt-0 py-2">
          <h2 class="text-h6 font-weight-bold text-grey-darken-3 mb-0">
            Application BP-2025-0808-001
          </h2>
          <p class="text-caption text-grey-darken-1">
            View the current progress of your building permit request.
          </p>
        </div>

        <v-card flat border class="mb-2 rounded-lg">
          <v-card-text class="pa-4">
            <v-row dense>
              <v-col cols="6" md="3">
                <div class="text-caption text-grey mb-1">Submission Date</div>
                <div class="text-body-2 font-weight-medium text-grey-darken-3">
                  Jan 15, 2024
                </div>
              </v-col>
              <v-col cols="6" md="3">
                <div class="text-caption text-grey mb-1">Application Type</div>
                <div class="text-body-2 font-weight-medium text-grey-darken-3">
                  New Construction
                </div>
              </v-col>
              <v-col cols="6" md="3">
                <div class="text-caption text-grey mb-1">Current Status</div>
                <v-chip
                  color="success"
                  variant="tonal"
                  size="x-small"
                  class="font-weight-medium rounded-sm"
                >
                  Submitted
                </v-chip>
              </v-col>
              <v-col cols="6" md="3">
                <div class="text-caption text-grey mb-1">Last Updated</div>
                <div class="text-body-2 font-weight-medium text-grey-darken-3">
                  2h ago
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

        <v-card flat border class="rounded-lg">
          <v-card-title
            class="text-subtitle-1 font-weight-bold text-grey-darken-3 px-4 pt-4 pb-2"
          >
            Application Status Tracker
          </v-card-title>

          <v-card-text class="px-4 pb-4">
            <v-timeline
              align="start"
              density="compact"
              side="end"
              truncate-line="both"
            >
              <v-timeline-item
                v-for="step in steps"
                :key="step.id"
                :dot-color="
                  step.status === 'completed' ? 'primary' : 'grey-lighten-2'
                "
                :icon="step.status === 'completed' ? 'mdi-check' : ''"
                :icon-color="step.status === 'completed' ? 'white' : ''"
                size="x-small"
                fill-dot
                width="100%"
              >
                <div class="d-flex flex-column w-100">
                  <div
                    class="d-flex align-center justify-space-between mb-1 w-100"
                  >
                    <h4
                      class="text-body-2 font-weight-bold text-grey-darken-3 flex-grow-1 mr-4"
                    >
                      {{ step.title }}
                    </h4>

                    <div
                      style="width: 100px"
                      class="flex-shrink-0 d-flex justify-end"
                    >
                      <v-chip
                        :color="
                          step.status === 'completed' ? 'success' : 'grey'
                        "
                        variant="tonal"
                        size="x-small"
                        class="font-weight-medium justify-center"
                        style="width: 100%"
                      >
                        {{
                          step.status === "completed" ? "Completed" : "Pending"
                        }}
                      </v-chip>
                    </div>
                  </div>

                  <div
                    class="text-caption text-grey-darken-1 mb-1 font-mono"
                    style="font-size: 0.7rem !important"
                  >
                    {{ step.applicationId }}
                  </div>
                  <div
                    class="text-caption font-weight-bold text-grey-darken-2 mb-1"
                  >
                    {{ step.statusText }}
                  </div>
                  <div class="text-caption text-grey-darken-1">
                    {{ step.description }}
                  </div>
                </div>
              </v-timeline-item>
            </v-timeline>
          </v-card-text>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from "vue";

const showProfileMenu = ref(false);

const steps = ref([
  {
    id: 1,
    title: "Submitted Application",
    applicationId: "BP-2025-0808-001",
    statusText: "Submitted: Jan 15, 2024",
    description: "Application submitted and in review process.",
    status: "completed",
  },
  {
    id: 2,
    title: "PDF Plan Verification",
    applicationId: "BP-2025-0808-001",
    statusText: "Awaiting review",
    description: "Reviewing submitted plans for completeness.",
    status: "not-started",
  },
  {
    id: 3,
    title: "Evaluation of Plans",
    applicationId: "BP-2025-0808-001",
    statusText: "Pending verification",
    description: "Comprehensive evaluation begins after verification.",
    status: "not-started",
  },
  {
    id: 4,
    title: "Final Approval",
    applicationId: "BP-2025-0808-001",
    statusText: "Awaiting previous stages",
    description: "Permit issuance after successful evaluation.",
    status: "not-started",
  },
]);

const handleLogout = () => {
  showProfileMenu.value = false;
};
</script>

<style scoped>
:deep(.v-app) {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}

:deep(.v-app-bar) {
  flex-shrink: 0 !important;
  position: sticky !important;
  top: 0 !important;
}

:deep(.v-main) {
  overflow-y: auto;
  overflow-x: hidden;
  flex: 1;
  min-height: 0;
  /* Force removal of dynamic padding if necessary */
  padding-top: 0 !important;
}

.v-application {
  background-color: #f8fafc !important;
}
</style>