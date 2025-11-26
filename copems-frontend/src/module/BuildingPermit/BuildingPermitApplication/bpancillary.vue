<template>
  <v-app>
    <v-main class="no-scroll">
      <v-row no-gutters class="fill-height" style="height: 100vh">
        <v-col
          cols="12"
          md="3"
          class="pa-0"
          style="overflow: hidden; max-height: 100vh"
        >
          <v-card
            flat
            class="pa-4 quick-guide-card d-flex flex-column justify-space-between elevation-2"
            style="
              border-right: 1px solid #e0e0e0;
              height: 100%;
              background: #fcfcff;
              overflow: hidden;
            "
          >
            <div>
              <h4 class="mb-2 text-h5 font-weight-bold text-blue-darken-3">
                Building Permit Application
              </h4>
              <div class="text-subtitle-2 mb-6 text-blue-grey-darken-1">
                Follow these steps to complete your application
              </div>
              <v-card
                v-for="(step, index) in sidebarSteps"
                :key="index"
                flat
                :color="sidebarStep === index ? 'blue-lighten-5' : '#f6f8fa'"
                class="d-flex align-center pa-3 mb-4 rounded-lg quick-guide-step"
                :class="{
                  'clickable-step': true,
                  'active-step': sidebarStep === index,
                }"
                @click="goToSidebarStep(index)"
                elevation="sidebarStep === index ? 2 : 0"
                style="transition: box-shadow 0.16s, background 0.16s"
              >
                <v-avatar
                  :color="sidebarStep === index ? 'primary' : '#2563EB'"
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
                outlined
                to="/login"
                class="text-capitalize font-weight-bold"
                @click="handleLogout"
              >
                <v-icon left>mdi-logout</v-icon>
                Logout
              </v-btn>
            </div>
          </v-card>
        </v-col>

        <v-col cols="12" md="9" class="main-content-bg pa-6 main-content">
          <div style="max-width: 1400px; margin: 0 auto">
            <v-row class="mt-4" align="stretch">
              <v-col cols="12" md="4">
                <v-card class="pa-4 rounded-xl card-shadow">
                  <v-card-title class="text-h6 font-weight-bold mb-2">
                    <v-icon left color="#1565c0" class="mr-2"
                      >mdi-information-outline</v-icon
                    >
                    Construction Type Guide
                  </v-card-title>
                  <v-expansion-panels flat multiple>
                    <v-expansion-panel
                      v-for="(item, i) in constructionTypes"
                      :key="i"
                      class="bg-transparent"
                      elevation="0"
                    >
                      <v-expansion-panel-title
                        class="font-weight-medium text-primary"
                      >
                        <v-icon left small color="#0000CC" class="mr-2"
                          >mdi-domain</v-icon
                        >
                        {{ item.title }}
                      </v-expansion-panel-title>
                      <v-expansion-panel-text>
                        <ul class="ml-4 mb-2">
                          <li
                            v-for="(form, j) in item.forms"
                            :key="j"
                            class="font-weight-regular text-grey-darken-2"
                          >
                            {{ form }}
                          </li>
                        </ul>
                      </v-expansion-panel-text>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </v-card>
              </v-col>

              <v-col cols="12" md="8">
                <v-card class="pa-6 rounded-xl card-shadow">
                  <v-card-title
                    class="text-h5 font-weight-bold card-title-responsive mb-1 gradient-text"
                  >
                    <v-icon left color="#1565c0" class="mr-2"
                      >mdi-file-document-multiple-outline</v-icon
                    >
                    Ancillary Forms
                  </v-card-title>
                  <v-card-subtitle
                    class="mt-1 text-wrap mb-4 text-grey-darken-1"
                  >
                    Click on a document type to download its specific forms.
                  </v-card-subtitle>
                  <v-row class="mt-1" align="stretch" justify="center">
                    <v-col
                      v-for="(form, i) in ancillaryForms"
                      :key="i"
                      cols="12"
                      sm="6"
                      md="4"
                      class="d-flex justify-center"
                    >
                      <v-card
                        elevation="2"
                        class="d-flex flex-column align-center justify-center pa-4 text-center rounded-lg hoverable-card transition-ease doc-card"
                        @click="downloadForm(form.title)"
                      >
                        <div
                          class="icon-bg mb-2 d-flex align-center justify-center"
                        >
                          <v-icon size="44" color="#0000CC">{{
                            form.icon
                          }}</v-icon>
                        </div>
                        <v-card-text
                          class="pa-0 font-weight-medium form-title-text"
                        >
                          {{ form.title }}
                        </v-card-text>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-card>

                <div class="d-flex justify-end mt-6 mb-8">
                  <router-link
                    to="/Applicant/bpuploadingofplans"
                    style="text-decoration: none"
                  >
                    <v-btn
                      color="blue-grey-lighten-4"
                      class="mr-2 btn-rounded"
                      elevation="2"
                      variant="tonal"
                      size="large"
                    >
                      <v-icon left>mdi-arrow-left</v-icon>Back
                    </v-btn>
                  </router-link>
                  <v-btn
                    color="blue-darken-3"
                    class="btn-rounded"
                    elevation="2"
                    @click="handleSaveAndRedirect"
                    variant="elevated"
                    to="/applicant/bpportal"
                    size="large"
                  >
                    Save
                  </v-btn>
                </div>
              </v-col>
            </v-row>
          </div>
        </v-col>
      </v-row>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const sidebarStep = ref(2);
const sidebarSteps = ref([
  "Fill up the Unified Application Form",
  "Upload Building Plans & Lot Plans",
  "Download Filled-up Unified Application Form and Required Ancillary Permits ",
]);

const handleLogout = () => {
  console.log("User logged out");
  router.push("/login");
};

// Handle Save Button
const handleSaveAndRedirect = () => {
  console.log("Application Saved");
  router.push("/portal");
};

const goToSidebarStep = (index) => {
  sidebarStep.value = index;
  if (index === 0) {
    router.push("/applicant/applicantdetails");
  } else if (index === 2) {
    router.push("/applicant/uploadingofplans");
  }
};

const constructionTypes = ref([
  {
    title: "NEW CONSTRUCTION",
    forms: [
      "Architectural",
      "Civil/Structural",
      "Sanitary/Plumbing",
      "Mechanical",
      "Electrical",
      "Electronics",
    ],
  },
  {
    title: "ERECTION",
    forms: [
      "Civil/Structural",
      "Architectural",
      "Electrical",
      "Mechanical",
      "Electronics",
      "Sanitary",
    ],
  },
  {
    title: "ADDITION",
    forms: [
      "Civil/Structural",
      "Architectural",
      "Electrical",
      "Mechanical",
      "Electronics",
      "Sanitary",
    ],
  },
  {
    title: "ALTERATION",
    forms: ["Architectural", "Civil/Structural", "Electrical"],
  },
  { title: "RENOVATION", forms: ["Architectural", "Structural"] },
  {
    title: "CONVERSION",
    forms: ["Architectural", "Structural", "Electrical", "Electronics"],
  },
  { title: "REPAIR", forms: ["Architectural", "Structural"] },
  { title: "MOVING", forms: ["Architectural/Structural", "Mechanical"] },
  { title: "RAISING", forms: ["Architectural", "Structural"] },
  {
    title: "ACCESSORY BUILDING",
    forms: ["Architectural", "Structural", "Electrical", "Sanitary"],
  },
  { title: "LEGALIZATION", forms: ["Architectural", "Structural"] },
]);

const ancillaryForms = ref([
  { title: "Architectural Document", icon: "mdi-drawing" },
  { title: "Civil/Structural Document", icon: "mdi-hammer" },
  { title: "Electrical Document", icon: "mdi-lightning-bolt" },
  { title: "Sanitary Document", icon: "mdi-water-pump" },
  { title: "Mechanical Document", icon: "mdi-cog" },
  { title: "Electronics Document", icon: "mdi-chip" },
]);

function downloadForm(title) {
  alert(`Downloading ${title}...`);
}
</script>

<style scoped>
.no-scroll {
  overflow: hidden !important;
}
.v-main.no-scroll {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f6fafd;
  overflow: hidden;
}
.content-area {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
}
.main-content {
  overflow-y: auto;
  overflow-x: hidden;
  max-height: 100vh;
  padding: 0 !important;
}
.main-content > div {
  padding: 24px;
}
.main-content-bg {
  background: #fafdff;
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
  background: #e3f0ff !important;
  box-shadow: 0 2px 12px rgba(59, 130, 246, 0.08);
}
.active-step {
  background: #e7efff !important;
  box-shadow: 0 4px 20px rgba(59, 130, 246, 0.12);
}
.quick-guide-avatar {
  transition: background 0.2s;
}
.step-label {
  color: #23407c;
}
.clickable-step {
  cursor: pointer;
}

.gradient-text {
  background: linear-gradient(90deg, #1976d2 10%, #0000cc 90%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.card-shadow {
  box-shadow: 0 2px 14px 0 rgba(25, 118, 210, 0.11);
  border-radius: 22px;
  border: 1.5px solid #e3eafc;
}
.icon-bg {
  background: linear-gradient(180deg, #e3eaff 70%, #fff 100%);
  border-radius: 50%;
  width: 64px;
  height: 64px;
}
.form-title-text {
  font-size: 1.13rem;
  color: #00145a;
}
.hoverable-card {
  transition: box-shadow 0.23s, border-color 0.23s, transform 0.12s;
}
.hoverable-card:hover {
  border-color: #0000cc;
  box-shadow: 0 4px 16px 2px rgba(0, 0, 100, 0.07);
  transform: translateY(-3px) scale(1.035);
}
.v-card.pa-6 {
  background: #f7fafd;
}

.doc-card {
  width: 280px;
  height: 170px;
  min-width: 0;
  min-height: 0;
  box-sizing: border-box;
  justify-content: center !important;
  align-items: center !important;
  margin-left: auto;
  margin-right: auto;
  transition: box-shadow 0.22s, border-color 0.22s;
  display: flex;
}

/* Custom class for the rounded buttons in the snippet */
.btn-rounded {
  border-radius: 24px !important;
}

.page-title-responsive {
  font-size: 1.35rem;
  letter-spacing: 0.02em;
}

@media (max-width: 1200px) {
  .page-title-responsive {
    font-size: 1.13rem !important;
  }
}
@media (max-width: 960px) {
  .content-area {
    overflow-y: auto;
  }
  .v-main.no-scroll {
    height: 100vh;
  }
  .quick-guide-card {
    height: auto !important;
    min-height: auto;
  }

  .page-title-responsive {
    font-size: 1rem !important;
  }
  .card-title-responsive {
    font-size: 1.1rem !important;
  }
}
@media (max-width: 900px) {
  .doc-card {
    width: 100% !important;
    min-width: 0 !important;
    max-width: none !important;
    height: 170px !important;
  }
}
@media (max-width: 600px) {
  .v-card.pa-6,
  .v-card.pa-4 {
    padding: 12px !important;
  }
  .card-title-responsive {
    font-size: 1.02rem !important;
  }
  .doc-card {
    min-width: 100% !important;
    width: 100% !important;
    height: 140px !important;
  }
  .step-label {
    font-size: 1rem !important;
  }
  .main-content-bg {
    padding: 12px !important;
  }
}
</style>