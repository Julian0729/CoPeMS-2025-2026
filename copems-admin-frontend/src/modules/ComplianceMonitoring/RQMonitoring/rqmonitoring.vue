<template>
  <v-app>
    <v-navigation-drawer app permanent>
      <div class="drawer-header">
        <v-icon size="36" class="me-2" color="#007bff"
          >mdi-office-building</v-icon
        >
        <div>
          <div class="text-h7 font-weight-bold" style="line-height: 1.2">
            Construction Permit
          </div>
          <div class="text-caption font-weight-regular" style="color: #6c757d">
            Management System
          </div>
        </div>
      </div>
      <div class="d-flex flex-column" style="height: calc(100% - 57px)">
        <v-list
          nav
          dense
          class="py-0 flex-grow-1 overflow-y-auto"
          style="font-size: 14px"
        >
          <v-list-item
            v-for="item in navItems"
            :key="item.title"
            :to="item.to"
            class="py-1"
          >
            <div class="d-flex align-center">
              <v-icon class="me-3">{{ item.icon }}</v-icon>
              <span>{{ item.title }}</span>
            </div>
          </v-list-item>
        </v-list>
        <v-list nav dense class="py-0 mt-auto" style="font-size: 14px">
          <v-list-item link @click="logout" class="py-1">
            <div class="d-flex align-center">
              <v-icon class="me-3">mdi-logout</v-icon>
              <span>Logout</span>
            </div>
          </v-list-item>
        </v-list>
      </div>
    </v-navigation-drawer>

    <v-main class="bg-grey-lighten-4">
      <div class="main-content-wrapper">
        <v-card class="main-card">
          <div class="card-header">
            <div class="text-h6 font-weight-bold">Building Permit Admin</div>
          </div>
          <v-divider></v-divider>

          <v-card-text class="flex-grow-1 pa-4">
            <v-row class="mb-4">
              <v-col cols="12" class="d-flex justify-start align-center">
                <v-text-field
                  v-model="searchQuery"
                  label="Search documents/clearances..."
                  append-icon="mdi-magnify"
                  solo
                  hide-details
                  single-line
                  @click:append="onClick"
                  style="max-width: 300px; margin-right: 8px"
                ></v-text-field>

                <v-menu :close-on-content-click="false" bottom offset-y left>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="white"
                      class="text-black"
                      v-bind="attrs"
                      v-on="on"
                    >
                      <v-icon left>mdi-filter-variant</v-icon>
                      Filter
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item
                      v-for="(item, index) in [
                        'All',
                        'Approved',
                        'Pending',
                        'In Progress Evaluation',
                        'Evaluated',
                        'Evaluated Returned Documents',
                      ]"
                      :key="index"
                      @click="selectedFilter = item"
                    >
                      <v-list-item-title>{{ item }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-col>
            </v-row>

            <v-tabs v-model="activeTab" class="mb-4">
              <v-tab>Document Requirement</v-tab>
              <v-tab>To Follow</v-tab>
            </v-tabs>

            <v-card class="elevation-1">
              <v-card-text class="pa-0">
                <v-data-table
                  :headers="computedHeaders"
                  :items="filteredItems"
                  class="rounded-b-lg"
                  hide-default-footer
                >
                  <template v-slot:[`item.id`]="{ index }">
                    {{ index + 1 }}
                  </template>

                  <template v-slot:[`item.status`]="{ item }">
                    <v-chip
                      :color="getStatusColor(item.status)"
                      label
                      dark
                      small
                      @click="showStatusHistory(item)"
                    >
                      {{ item.status }}
                    </v-chip>
                  </template>

                  <template v-slot:[`item.notify`]="{ item }">
                    <v-btn
                      small
                      :color="item.status === 'Approved' ? 'grey' : 'primary'"
                      :class="{ 'white--text': item.status !== 'Approved' }"
                      :disabled="item.status === 'Approved'"
                      @click="showEmailDialog(item)"
                    >
                      <v-icon left>mdi-email</v-icon>
                      Email
                    </v-btn>
                  </template>
                </v-data-table>
              </v-card-text>
            </v-card>
          </v-card-text>
        </v-card>
      </div>

      <v-dialog v-model="emailDialog" max-width="600">
        <v-card class="rounded-lg elevation-8">
          <v-card-title class="pa-5 primary white--text d-flex align-center">
            <v-icon dark size="24" class="me-3">mdi-email</v-icon>
            <span class="text-h6 font-weight-bold">Compose Email</span>
          </v-card-title>
          <v-card-text class="pa-6">
            <v-text-field
              label="To"
              :value="`Evaluator for ${
                selectedItem.documentType || selectedItem.clearanceType
              }`"
              readonly
              append-icon="mdi-account-tie"
              solo
              hide-details
              class="mb-4"
              style="font-weight: 500"
            ></v-text-field>

            <v-text-field
              v-model="emailSubject"
              label="Subject"
              solo
              hide-details
              class="mb-4"
            ></v-text-field>

            <v-textarea
              v-model="emailBody"
              label="Email Body"
              rows="10"
              solo
              hide-details
            ></v-textarea>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions class="pa-4">
            <v-spacer></v-spacer>
            <v-btn color="grey darken-1" text @click="emailDialog = false">
              Cancel
            </v-btn>
            <v-btn
              color="primary"
              @click="sendEmail"
              :disabled="!emailSubject || !emailBody"
              class="font-weight-bold"
            >
              <v-icon left>mdi-send</v-icon>
              Send Email
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="emailSendSuccessDialog" max-width="400">
        <v-card class="rounded-lg elevation-8">
          <v-card-title class="headline primary white--text pa-4">
            <v-icon left dark>mdi-check-circle-outline</v-icon>
            Success
          </v-card-title>
          <v-card-text class="py-6 text-center">
            <div class="text-h5 mb-2 green--text text--darken-2">
              Email Sent Successfully!
            </div>
            <p class="text-subtitle-1 grey--text text--darken-1">
              Your email has been sent to the evaluator for:
            </p>
            <p class="text-h6 font-weight-bold mb-0">
              {{ selectedItem.documentType || selectedItem.clearanceType }}
            </p>
          </v-card-text>
          <v-card-actions class="pa-4">
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              @click="emailSendSuccessDialog = false"
              class="font-weight-bold"
            >
              Close
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="statusHistoryDialog" max-width="500">
        <v-card class="rounded-lg">
          <v-card-title class="headline primary white--text">
            <v-icon left dark>mdi-history</v-icon>
            Status History
          </v-card-title>
          <v-card-text class="py-6">
            <v-timeline dense align-top>
              <v-timeline-item
                v-for="(history, index) in selectedItem.statusHistory"
                :key="index"
                :color="getStatusColor(history.status)"
                small
              >
                <v-card class="elevation-2 rounded-lg">
                  <v-card-text>
                    <div class="font-weight-bold">
                      <v-icon left :color="getStatusColor(history.status)">
                        {{ getStatusIcon(history.status) }}
                      </v-icon>
                      {{ history.status }}
                    </div>
                    <div class="text-caption grey--text text--darken-1 mt-1">
                      {{ formatDate(history.date) }}
                    </div>
                  </v-card-text>
                </v-card>
              </v-timeline-item>
            </v-timeline>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="statusHistoryDialog = false">
              Close
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "BuildingPermitMonitoring",
  data() {
    return {
      activeTab: 0,
      searchQuery: "",
      selectedFilter: "All",

      emailDialog: false,
      emailSendSuccessDialog: false,
      emailSubject: "",
      emailBody: "",
      statusHistoryDialog: false,
      selectedItem: {},
      notifications: [
        {
          title: "Documents submitted for verification",
          applicationId: "BP-2025-0808-001",
          time: "Just now",
          read: false,
        },
        {
          title: "Documents submitted for verification",
          applicationId: "BP-2024-808234-T",
          time: "2 hours ago",
          read: false,
        },
        {
          title: "Documents submitted for verification",
          applicationId: "BP-2024-808345-T",
          time: "4 hours ago",
          read: false,
        },
      ],
      navItems: [
        { title: "Dashboard", icon: "mdi-home-outline", to: "/dashboard" },
        {
          title: "Locational Clearance",
          icon: "mdi-map-marker-outline",
          to: "/locational-clearance",
        },
        {
          title: "Building Permit",
          icon: "mdi-file-document-outline",
          to: "/bpapplicants",
        },
        {
          title: "Occupancy Permit",
          icon: "mdi-file-certificate-outline",
          to: "/occupancy-permit",
        },
        {
          title: "Compliance Monitoring",
          icon: "mdi-clipboard-list-outline",
          to: "/compliance-monitoring",
        },
      ],
      headers: {
        documentRequirement: [
          { text: "#", value: "id" },
          { text: "Document Type", value: "documentType" },
          { text: "Date Submitted", value: "dateSubmitted" },
          { text: "Deadline Due", value: "deadlineDue" },
          { text: "Status", value: "status" },
          { text: "Email", value: "notify", sortable: false },
        ],
        toFollow: [
          { text: "#", value: "id" },
          { text: "Clearance Type", value: "clearanceType" },
          { text: "Date Submitted", value: "dateSubmitted" },
          { text: "Deadline Due", value: "deadlineDue" },
          { text: "Status", value: "status" },
          { text: "Email", value: "notify", sortable: false },
        ],
      },
      items: {
        documentRequirement: [
          {
            documentType: "Architectural Plans",
            dateSubmitted: "04/05/2025",
            deadlineDue: "4 Days Left",
            status: "In Progress Evaluation",
            statusHistory: [
              { status: "Pending", date: "2025-04-04" },
              { status: "In Progress Evaluation", date: "2025-04-05" },
            ],
          },
          {
            documentType: "Civil/Structural Plans",
            dateSubmitted: "04/05/2025",
            deadlineDue: "4 Days Left",
            status: "Evaluated",
            statusHistory: [
              { status: "Pending", date: "2025-04-04" },
              { status: "In Progress Evaluation", date: "2025-04-05" },
              { status: "Evaluated", date: "2025-04-09" },
            ],
          },
          {
            documentType: "Electrical Plans",
            dateSubmitted: "04/05/2025",
            deadlineDue: "Approved",
            status: "Approved",
            statusHistory: [
              { status: "Pending", date: "2025-04-05" },
              { status: "In Progress Evaluation", date: "2025-04-07" },
              { status: "Approved", date: "2025-04-12" },
            ],
          },
          {
            documentType: "Structural Analysis",
            dateSubmitted: "04/06/2025",
            deadlineDue: "Approved",
            status: "Approved",
            statusHistory: [
              { status: "Pending", date: "2025-04-06" },
              { status: "In Progress Evaluation", date: "2025-04-08" },
              { status: "Approved", date: "2025-04-13" },
            ],
          },
          {
            documentType: "Electronics Plans",
            dateSubmitted: "04/07/2025",
            deadlineDue: "",
            status: "Evaluated Returned Documents",
            statusHistory: [
              { status: "Pending", date: "2025-04-06" },
              { status: "In Progress Evaluation", date: "2025-04-07" },
              { status: "Evaluated Returned Documents", date: "2025-04-10" },
            ],
          },
          {
            documentType: "Sanitary Plans",
            dateSubmitted: "04/08/2025",
            deadlineDue: "4 Days Left",
            status: "In Progress Evaluation",
            statusHistory: [
              { status: "Pending", date: "2025-04-07" },
              { status: "In Progress Evaluation", date: "2025-04-08" },
            ],
          },
          {
            documentType: "Mechanical Plans",
            dateSubmitted: "04/08/2025",
            deadlineDue: "Pending",
            status: "Pending",
            statusHistory: [{ status: "Pending", date: "2025-04-08" }],
          },
          {
            documentType: "Geodetic Plans",
            dateSubmitted: "04/10/2025",
            deadlineDue: "Approved",
            status: "Approved",
            statusHistory: [
              { status: "Pending", date: "2025-04-09" },
              { status: "In Progress Evaluation", date: "2025-04-10" },
              { status: "Approved", date: "2025-04-17" },
            ],
          },
          {
            documentType: "Lot Plan",
            dateSubmitted: "04/11/2025",
            deadlineDue: "4 Days Left",
            status: "In Progress Evaluation",
            statusHistory: [
              { status: "Pending", date: "2025-04-10" },
              { status: "In Progress Evaluation", date: "2025-04-11" },
            ],
          },
        ],
        toFollow: [
          {
            clearanceType: "Construction Safety and Health Program",
            dateSubmitted: "04/05/2025",
            deadlineDue: "",
            status: "Approved",
            statusHistory: [
              { status: "Pending", date: "2025-04-04" },
              { status: "Approved", date: "2025-04-05" },
            ],
          },
          {
            clearanceType: "DPWH Clearance",
            dateSubmitted: "04/05/2025",
            deadlineDue: "",
            status: "Approved",
            statusHistory: [
              { status: "Pending", date: "2025-04-04" },
              { status: "Approved", date: "2025-04-05" },
            ],
          },
          {
            clearanceType: "Barangay Clearance",
            dateSubmitted: "04/05/2025",
            deadlineDue: "",
            status: "Approved",
            statusHistory: [
              { status: "Pending", date: "2025-04-04" },
              { status: "Approved", date: "2025-04-05" },
            ],
          },
        ],
      },
    };
  },
  computed: {
    unreadNotificationsCount() {
      return this.notifications.filter((n) => !n.read).length;
    },
    computedHeaders() {
      const tabNames = ["documentRequirement", "toFollow"];
      return this.headers[tabNames[this.activeTab]];
    },
    currentItems() {
      const tabNames = ["documentRequirement", "toFollow"];
      return this.items[tabNames[this.activeTab]];
    },
    filteredItems() {
      const itemsToFilter = this.currentItems;
      let filtered = itemsToFilter;

      if (this.selectedFilter !== "All") {
        filtered = filtered.filter(
          (item) => item.status === this.selectedFilter
        );
      }

      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        filtered = filtered.filter((item) => {
          const documentTypeMatch =
            item.documentType &&
            item.documentType.toLowerCase().includes(query);
          const clearanceTypeMatch =
            item.clearanceType &&
            item.clearanceType.toLowerCase().includes(query);
          return documentTypeMatch || clearanceTypeMatch;
        });
      }

      return filtered;
    },
  },
  methods: {
    closeNotifications() {
      this.notifications.forEach((notification) => {
        notification.read = true;
      });
    },
    logout() {
      console.log("Logged out");
    },
    onClick() {
      console.log("Search clicked");
    },
    getStatusColor(status) {
      if (status === "Approved") return "green";
      if (status === "Pending") return "orange";
      if (status === "In Progress Evaluation") return "blue";
      if (status === "Evaluated") return "deep-purple";
      if (status === "Evaluated Returned Documents") return "red";
      return "grey";
    },
    getStatusIcon(status) {
      if (status === "Approved") return "mdi-check-circle";
      if (status === "Pending") return "mdi-clock-time-three";
      if (status === "In Progress Evaluation") return "mdi-progress-alert";
      if (status === "Evaluated") return "mdi-checkbox-marked-circle-outline";
      if (status === "Evaluated Returned Documents")
        return "mdi-file-undo-outline";
      return "mdi-circle";
    },
    formatDate(dateString) {
      if (!dateString) return "N/A";
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },
    showEmailDialog(item) {
      this.selectedItem = item;

      this.emailSubject = "";
      this.emailBody = "";

      const type = item.documentType || item.clearanceType;
      this.emailSubject = `Inquiry regarding ${type} - Status: ${item.status}`;
      this.emailBody = `Dear Evaluator,\n\nI am writing to follow up on the status of the "${type}" document/clearance, which is currently listed as "${item.status}".\n\n[Insert your specific question or request here.]\n\nThank you.\n\nSincerely,`;
      this.emailDialog = true;
    },
    sendEmail() {
      console.log("Email Sent:");
      console.log(
        "To: Evaluator for",
        this.selectedItem.documentType || this.selectedItem.clearanceType
      );
      console.log("Subject:", this.emailSubject);
      console.log("Body:", this.emailBody);

      this.emailDialog = false;
      this.emailSendSuccessDialog = true;
    },
    showStatusHistory(item) {
      this.selectedItem = item;
      this.statusHistoryDialog = true;
    },
  },
};
</script>

<style scoped>
/* Main layout */
.header-container {
  max-width: 1600px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0;
}

.main-content-wrapper {
  display: flex;
  justify-content: center;
}

.main-card {
  width: 100%;
  max-width: 1300px;
  border-radius: 0;
  box-shadow: none;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.card-header {
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 57px;
}

/* Header & Nav */
.header-text-small {
  font-size: 12px;
  font-weight: 400;
  color: white;
  line-height: 1.2;
}

.header-text-large {
  font-size: 15px;
  font-weight: 700;
  color: white;
  line-height: 1.2;
}

.nav-links .v-btn {
  text-transform: none !important;
  font-weight: 500;
  font-size: 17px;
}

.drawer-header {
  display: flex;
  align-items: center;
  padding-left: 1rem;
  padding-right: 1rem;
  height: 57px;
}

.profile-btn {
  background-color: transparent !important;
  box-shadow: none !important;
  padding: 0 !important;
  min-width: unset !important;
}

.profile-text-name {
  color: #555;
  white-space: nowrap;
}

.profile-text-title {
  color: #888;
  white-space: nowrap;
}

/* Notifications */
.notification-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>