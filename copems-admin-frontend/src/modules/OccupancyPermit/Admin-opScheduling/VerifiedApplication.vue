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
    <v-main style="background-color: #f5f6fa; padding-top: 88px">
      <v-dialog v-model="dialog" max-width="600px">
        <v-card :style="s.dialogCard">
          <v-card-title :style="s.dialogHeader">
            <v-icon class="mr-3" color="#fff">mdi-calendar-check</v-icon>
            <span class="text-h6 font-weight-bold" style="color: #fff"
              >Schedule Inspection</span
            >
            <v-spacer></v-spacer>
            <v-btn icon variant="text" @click="dialog = false" size="small">
              <v-icon color="#fff">mdi-close</v-icon>
            </v-btn>
          </v-card-title>

          <v-card-text class="pt-4">
            <v-form @submit.prevent="submitSchedule">
              <v-row class="mb-2">
                <v-col cols="12" sm="6">
                  <v-label :style="s.inputLabel">Date of Inspection</v-label>
                  <v-text-field
                    v-model="inspectionDate"
                    placeholder="dd/mm/yyyy"
                    density="compact"
                    variant="outlined"
                    hide-details
                    type="date"
                  >
                    <template #append-inner>
                      <v-icon>mdi-calendar-month-outline</v-icon>
                    </template>
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-label :style="s.inputLabel">Time</v-label>
                  <v-text-field
                    v-model="inspectionTime"
                    placeholder="-- : --"
                    density="compact"
                    variant="outlined"
                    hide-details
                    type="time"
                  >
                    <template #append-inner>
                      <v-icon>mdi-clock-outline</v-icon>
                    </template>
                  </v-text-field>
                </v-col>
              </v-row>

              <v-label class="mt-4 mb-2" :style="s.inputLabel">Assign Inspectors</v-label>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-label :style="s.inputLabelSmall">Architectural Works</v-label>
                  <v-select
                    v-model="inspectors.architectural"
                    :items="inspectorsList.architectural"
                    label="Select Inspector"
                    density="compact"
                    variant="outlined"
                    hide-details
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-label :style="s.inputLabelSmall">Civil/Structural Works</v-label>
                  <v-select
                    v-model="inspectors.civilStructural"
                    :items="inspectorsList.civilStructural"
                    label="Select Inspector"
                    density="compact"
                    variant="outlined"
                    hide-details
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-label :style="s.inputLabelSmall">Electrical Works</v-label>
                  <v-select
                    v-model="inspectors.electrical"
                    :items="inspectorsList.electrical"
                    label="Select Inspector"
                    density="compact"
                    variant="outlined"
                    hide-details
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-label :style="s.inputLabelSmall">Sanitary Plumbing Works</v-label>
                  <v-select
                    v-model="inspectors.sanitaryPlumbing"
                    :items="inspectorsList.sanitaryPlumbing"
                    label="Select Inspector"
                    density="compact"
                    variant="outlined"
                    hide-details
                  ></v-select>
                </v-col>
              </v-row>

              <v-btn :style="s.submitBtn" type="submit" block class="mt-4 mb-2"
                >SUBMIT</v-btn
              >
            </v-form>
          </v-card-text>
        </v-card>
      </v-dialog>
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
        </div>
      </div>

      <div :style="s.pageContainer">
        <v-row>
          <v-col cols="12" md="7">
            <v-card class="mb-4 elevation-1" :style="s.detailCard">
              <v-card-title :style="s.cardTitle">
                <v-icon class="mr-2" color="#3b82f6" size="20"
                  >mdi-account-details-outline</v-icon
                >
                Applicant Information
              </v-card-title>
              <v-card-text>
                <v-row>
                  <v-col cols="12" sm="6" :style="s.gridItemMargin">
                    <div :style="s.label">Application Number</div>
                    <div :style="s.value">{{ applicant.applicationNumber }}</div>
                  </v-col>
                  <v-col cols="12" sm="6" :style="s.gridItemMargin">
                    <div :style="s.label">Type of Application</div>
                    <div :style="s.value">{{ applicant.typeOfApplication }}</div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6" :style="s.gridItemMargin">
                    <div :style="s.label">Applicant Name</div>
                    <div :style="s.value">{{ applicant.name }}</div>
                  </v-col>
                  <v-col cols="12" sm="6" :style="s.gridItemMargin">
                    <div :style="s.label">Contact No.</div>
                    <div :style="s.value">{{ applicant.contactNo }}</div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6">
                    <div :style="s.label">Address</div>
                    <div :style="s.value">{{ applicant.address }}</div>
                  </v-col>
                  <v-col cols="12" sm="6"></v-col>
                </v-row>
              </v-card-text>
            </v-card>

            <v-card class="mb-4 elevation-1" :style="s.detailCard">
              <v-card-title :style="s.cardTitle">
                <v-icon class="mr-2" color="#3b82f6" size="20"
                  >mdi-home-city-outline</v-icon
                >
                Property Details
              </v-card-title>
              <v-card-text>
                <v-row>
                  <v-col cols="12" sm="6" :style="s.gridItemMargin">
                    <div :style="s.label">Name of Project</div>
                    <div :style="s.value">{{ property.projectName }}</div>
                  </v-col>
                  <v-col cols="12" sm="6" :style="s.gridItemMargin">
                    <div :style="s.label">No. of Storey/s</div>
                    <div :style="s.value">{{ property.noOfStoreys }}</div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6" :style="s.gridItemMargin">
                    <div :style="s.label">Project Location</div>
                    <div :style="s.value">{{ property.projectLocation }}</div>
                  </v-col>
                  <v-col cols="12" sm="6" :style="s.gridItemMargin">
                    <div :style="s.label">No. of Units</div>
                    <div :style="s.value">{{ property.noOfUnits }}</div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6">
                    <div :style="s.label">Use/Character of Occupancy</div>
                    <div :style="s.value">{{ property.buildingUse }}</div>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <div :style="s.label">Total Gross Floor Area</div>
                    <div :style="s.value">{{ property.totalGrossFloorArea }}</div>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>

            <v-card class="elevation-1" :style="s.detailCard">
              <v-card-title :style="s.cardTitle">
                <v-icon class="mr-2" color="#3b82f6" size="20"
                  >mdi-clipboard-list-outline</v-icon
                >
                Occupancy Requirements Checklist
              </v-card-title>
              <v-card-text class="d-flex justify-space-between align-center py-4">
                <div class="d-flex align-center">
                  <v-icon class="mr-2" size="24" color="#4b5563"
                    >mdi-file-document</v-icon
                  >
                  <span :style="s.value">Requirement Checklist</span>
                </div>
                <v-btn size="small" :style="s.viewBtn" @click="viewChecklist">View</v-btn>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" md="5">
            <v-card class="elevation-1" :style="[s.detailCard, s.inspectionCard]">
              <v-card-title :style="s.cardTitleBlue">
                <v-icon class="mr-2" color="#fff" size="20">mdi-calendar-check</v-icon>
                Inspection Schedule
              </v-card-title>

              <v-card-text v-if="inspectionDetails.date">
                <v-row no-gutters class="mb-3">
                  <v-col cols="6" class="pr-1">
                    <div :style="s.infoBoxFixed">
                      <div class="d-flex align-center mb-1">
                        <v-icon size="20" color="#3b82f6" class="mr-1"
                          >mdi-calendar</v-icon
                        >
                        <span :style="s.infoLabel">Inspection Date</span>
                      </div>
                      <div :style="s.infoValue">
                        {{ formatDate(inspectionDetails.date) }}
                      </div>
                    </div>
                  </v-col>

                  <v-col cols="6" class="pl-1">
                    <div :style="s.infoBoxFixed">
                      <div class="d-flex align-center mb-1">
                        <v-icon size="20" color="#3b82f6" class="mr-1"
                          >mdi-clock-outline</v-icon
                        >
                        <span :style="s.infoLabel">Inspection Time</span>
                      </div>
                      <div :style="s.infoValue">
                        {{ formatTime(inspectionDetails.time) }}
                      </div>
                    </div>
                  </v-col>
                </v-row>

                <div
                  class="text-caption font-weight-bold text-uppercase mb-3"
                  :style="s.scheduleMonitorLabel"
                >
                  Schedule Monitoring
                </div>

                <div
                  v-for="(detail, key) in inspectionDetails.works"
                  :key="key"
                  :style="s.monitorItem"
                >
                  <div class="d-flex justify-space-between align-center">
                    <div class="d-flex align-center">
                      <v-icon
                        size="20"
                        class="mr-2"
                        :color="statusColors[detail.status].icon"
                      >
                        {{
                          detail.status === "Approved"
                            ? "mdi-check-circle"
                            : "mdi-alert-circle"
                        }}
                      </v-icon>
                      <span class="font-weight-medium">{{ detail.label }}</span>
                    </div>
                    <span :style="[s.statusPill, statusColors[detail.status].style]">
                      {{ detail.status }}
                    </span>
                  </div>
                  <div :style="s.inspectorName">{{ detail.inspector }}</div>
                </div>

                <v-btn :style="s.submitBtnFilled" block class="mt-4">
                  Send Schedule
                </v-btn>
              </v-card-text>

              <v-card-text class="text-center" v-else>
                <div class="py-8">
                  <v-icon color="#3b82f6" size="64">mdi-calendar-off</v-icon>
                  <div class="text-h6 mt-4 mb-2">No Inspection Scheduled</div>
                  <p class="text-medium-emphasis text-body-2 mb-6">
                    Schedule an inspection by assigning inspectors and setting the date
                    and time.
                  </p>
                  <v-btn
                    :style="s.scheduleBtn"
                    prepend-icon="mdi-calendar-plus"
                    @click="scheduleInspection"
                    >Schedule Inspection</v-btn
                  >
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const dialog = ref(false);
const inspectionDate = ref(null);
const inspectionTime = ref(null);
const inspectors = ref({
  architectural: null,
  civilStructural: null,
  electrical: null,
  sanitaryPlumbing: null,
});

const inspectionDetails = ref({
  date: null,
  time: null,
  works: {
    architectural: { label: "Architectural Works", inspector: null, status: "Pending" },
    civilStructural: {
      label: "Civil/Structural Works",
      inspector: null,
      status: "Pending",
    },
    electrical: { label: "Electrical Works", inspector: null, status: "Pending" },
    sanitaryPlumbing: {
      label: "Sanitary Plumbing Works",
      inspector: null,
      status: "Pending",
    },
  },
});

const inspectorsList = {
  architectural: ["Arch. Joyce Oberos", "Arch. Anne Dela Cruz", "Arch. Mark Villanueva"],
  civilStructural: ["Eng. Roberto Martinez", "Eng. Brian Santos", "Eng. Lyka Gomez"],
  electrical: ["Eng. Bernadette Veroza", "Eng. Claire Garcia", "Eng. John Paul Lim"],
  sanitaryPlumbing: ["Eng. Andrew Villapane", "Eng. D. Reyes", "Eng. M. Fernandez"],
};

const applicant = ref({
  applicationNumber: "OP-2025-002",
  name: "Noah A. Deguzman",
  address: "Calauag Filoville Naga City",
  contactNo: "09265428922",
  typeOfApplication: "Full",
});

const property = ref({
  projectName: "Deguzman Residential Building",
  projectLocation: "456 Main St., Brgy. San Isidro, Naga City",
  buildingUse: "Residential - Single-Family",
  noOfStoreys: 2,
  noOfUnits: 5,
  totalGrossFloorArea: "200.00 sqm",
});

const formatDate = (dateString) => {
  if (!dateString) return "";
  const [year, month, day] = dateString.split("-");
  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

const formatTime = (timeString) => {
  if (!timeString) return "";
  const [hours, minutes] = timeString.split(":");
  const date = new Date();
  date.setHours(parseInt(hours), parseInt(minutes));
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const logOut = () => {
  console.log("Log Out clicked. User should be logged out.");
};

const viewChecklist = () => {
  router.push("/admin/OPchecklist");
  console.log("Navigating to /admin/OPchecklist from View Checklist button.");
};

const scheduleInspection = () => {
  dialog.value = true;
};

const submitSchedule = () => {
  if (
    !inspectionDate.value ||
    !inspectionTime.value ||
    !inspectors.value.architectural ||
    !inspectors.value.civilStructural ||
    !inspectors.value.electrical ||
    !inspectors.value.sanitaryPlumbing
  ) {
    alert("Please fill in all date, time, and inspector fields.");
    return;
  }

  inspectionDetails.value.date = inspectionDate.value;
  inspectionDetails.value.time = inspectionTime.value;
  inspectionDetails.value.works.architectural.inspector = inspectors.value.architectural;
  inspectionDetails.value.works.architectural.status = "Pending";

  inspectionDetails.value.works.civilStructural.inspector =
    inspectors.value.civilStructural;
  inspectionDetails.value.works.civilStructural.status = "Pending";

  inspectionDetails.value.works.electrical.inspector = inspectors.value.electrical;
  inspectionDetails.value.works.electrical.status = "Pending";

  inspectionDetails.value.works.sanitaryPlumbing.inspector =
    inspectors.value.sanitaryPlumbing;
  inspectionDetails.value.works.sanitaryPlumbing.status = "Pending";

  console.log("Inspection Schedule Submitted and Card Updated:", inspectionDetails.value);

  dialog.value = false;
  inspectionDate.value = null;
  inspectionTime.value = null;
  inspectors.value = {
    architectural: null,
    civilStructural: null,
    electrical: null,
    sanitaryPlumbing: null,
  };
};

const statusColors = {
  Pending: {
    style: { background: "#fff7e6", color: "#92400e" },
    icon: "#f59e0b",
  },
  Approved: {
    style: { background: "#d1fae5", color: "#065f46" },
    icon: "#10b981",
  },
};

const s = {
  heroBanner: {},
  topToolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 24px",
    background: "#fff",
    borderBottom: "1px solid #e8eaf0",
  },
  textToolbar: { color: "#111827" },
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
  inputLabel: {
    fontSize: "14px",
    fontWeight: 500,
    color: "#1f2937",
    marginBottom: "4px",
    display: "block",
  },
  inputLabelSmall: {
    fontSize: "14px",
    fontWeight: 500,
    color: "#1f2937",
    marginBottom: "4px",
    display: "block",
  },
  submitBtn: {
    background: "#3b82f6",
    color: "#fff",
    textTransform: "uppercase",
    fontWeight: 600,
  },

  pageContainer: {
    maxWidth: "1460px",
    margin: "16px auto 0",
    padding: "0 12px",
  },
  detailCard: {
    borderRadius: "10px",
  },
  cardTitle: {
    fontSize: "14px",
    fontWeight: 500,
    color: "#1f2937",
    borderBottom: "1px solid #e5e7eb",
    padding: "10px 10px",
    display: "flex",
    alignItems: "center",
  },
  cardTitleBlue: {
    fontSize: "15px",
    fontWeight: 500,
    color: "#fff",
    background: "#3b82f6",
    padding: "14px 10px",
    display: "flex",
    alignItems: "center",
  },
  label: {
    fontSize: "12px",
    fontWeight: 500,
    color: "#6b7280",
    textTransform: "uppercase",
    marginTop: "12px",
    marginBottom: "7px",
  },
  value: {
    fontSize: "15px",
    fontWeight: 500,
    color: "#1f2937",
  },
  viewBtn: {
    background: "#3b82f6",
    color: "#fff",
    textTransform: "none",
    fontWeight: 600,
    borderRadius: "4px",
  },
  inspectionCard: {
    overflow: "hidden",
  },
  scheduleBtn: {
    background: "#3b82f6",
    color: "#fff",
    textTransform: "none",
    fontWeight: 600,
    borderRadius: "4px",
  },
  gridItemMargin: {
    marginBottom: "4px",
  },

  infoBoxFixed: {
    backgroundColor: "#fff",
    padding: "16px",
    borderRadius: "8px",
    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
    border: "1px solid #e5e7eb",
  },
  infoLabel: {
    fontSize: "13px",
    color: "#3b82f6",
    fontWeight: 500,
  },
  infoValue: {
    fontSize: "18px",
    color: "#1f2937",
    fontWeight: 700,
    marginTop: "4px",
  },
  scheduleMonitorLabel: {
    fontSize: "12px",
    color: "#6b7280",
    marginTop: "16px",
    marginBottom: "8px",
  },
  monitorItem: {
    border: "1px solid #e5e7eb",
    padding: "12px",
    borderRadius: "4px",
    marginBottom: "8px",
  },
  inspectorName: {
    fontSize: "13px",
    color: "#6b7280",
    marginTop: "4px",
    marginLeft: "22px",
  },
  statusPill: {
    padding: "4px 8px",
    borderRadius: "16px",
    fontSize: "11px",
    fontWeight: 700,
    minWidth: "70px",
    textAlign: "center",
  },
  submitBtnFilled: {
    background: "#3b82f6",
    color: "#fff",
    textTransform: "capitalize",
    fontWeight: 600,
    marginTop: "12px",
    height: "40px",
  },
};
</script>

<style scoped>
.v-card__text > .v-row {
  margin-top: 0;
  margin-bottom: 0;
}
.v-card__text .v-col {
  padding-top: 0;
  padding-bottom: 0;
}
</style>
