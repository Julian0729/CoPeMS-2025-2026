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
                  :color="currentStep === index ? 'blue-lighten-5' : '#f6f8fa'"
                  class="d-flex align-center pa-3 mb-4 rounded-lg quick-guide-step"
                  :class="{
                    'clickable-step': index === 0,
                    'active-step': currentStep === index,
                  }"
                  @click="goToStep(index)"
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
                  to="/login"
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
            <div class="main-content-wrapper">
              <v-container fluid style="max-width: 1400px" class="pa-0">
                <v-row class="mt-0" align="stretch">
                  <v-col cols="12" md="4">
                    <v-card
                      class="pa-4 rounded-xl card-shadow certificate-guide-fixed-height"
                    >
                      <v-card-title class="text-h6 font-weight-bold mb-2">
                        <v-icon left color="#1565c0" class="mr-2"
                          >mdi-information-outline</v-icon
                        >
                        Certificate Type Guide
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
                    <v-card class="pa-6 rounded-xl card-shadow completion-forms-card">
                      <v-card-title
                        class="text-h5 font-weight-bold card-title-responsive mb-1 gradient-text"
                      >
                        <v-icon left color="#1565c0" class="mr-2"
                          >mdi-file-document-multiple-outline</v-icon
                        >
                        Completion Forms
                      </v-card-title>
                      <v-card-subtitle class="mt-1 text-wrap mb-4 text-grey-darken-1">
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
                            @click="goToForm(form)"
                          >
                            <div class="icon-bg mb-2 d-flex align-center justify-center">
                              <v-icon size="44" color="#0000CC">{{ form.icon }}</v-icon>
                            </div>
                            <v-card-text class="pa-0 font-weight-medium form-title-text">
                              {{ form.title }}
                            </v-card-text>
                          </v-card>
                        </v-col>
                      </v-row>
                    </v-card>
                    <v-row justify="end" class="mt-4">
                      <v-col cols="auto">
                        <v-btn
                          color="#0000CC"
                          dark
                          elevation="2"
                          size="x-large"
                          class="rounded-pill font-weight-bold px-8 btn-rounded-custom"
                          to="/applicant/OPstatusMonitoring"
                        >
                          Save
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-container>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { useRouter } from "vue-router";

export default {
  name: "BuildingPermitPageWithForms",
  data() {
    return {
      currentStep: 1,
      notificationsVisible: false,
      steps: [
        "Fill up the Unified Application Form",
        "Download Filled-up Unified Application Form and Completion Permits",
      ],
      constructionTypes: [
        {
          title: "COMPLETION FORMS",
          forms: ["Required for all Occupancy Permit applications"],
        },
        {
          title: "CERTIFICATE OF FINAL ELECTRICAL INSPECTION",
          forms: [
            "Electrical wiring and power distribution",
            "Lighting systems",
            "Emergency power (generators, UPS)",
            "Fire alarm and detection systems (if electrical-based)",
          ],
        },
      ],
      ancillaryForms: [
        {
          title: "Completion Certificate",
          icon: "mdi-hammer",
          to: "/applicant/Completion",
        },
        {
          title: "Electrical Certificate",
          icon: "mdi-lightning-bolt",
          to: "/applicant/Electrical",
        },
        {
          title: "Unified Application",
          icon: "mdi-file-document-edit-outline",
          to: "/applicant/Unified",
        },
      ],
    };
  },
  methods: {
    handleLogout() {
      console.log("User logged out");
    },
    goToStep(index) {
      this.currentStep = index;
    },
    showNotifications() {
      this.notificationsVisible = true;
      console.log("Toggling notifications menu");
    },
    goToForm(form) {
      if (form.to) {
        if (this.$router) {
          this.$router.push(form.to);
        } else {
          console.warn("Vue Router instance not found. Cannot navigate to:", form.to);
        }
      }
    },
  },
};
</script>

<style scoped>
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
  background: #f6fafd;
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
.completion-forms-card {
  background: #f7fafd;
}
.certificate-guide-fixed-height {
  min-height: 420px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
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
.btn-rounded-custom {
  border-radius: 30px !important;
}

@media (max-width: 1200px) {
  .page-title-responsive {
    font-size: 1.13rem !important;
  }
}
@media (max-width: 960px) {
  .page-title-responsive {
    font-size: 1rem !important;
  }
  .card-title-responsive {
    font-size: 1.1rem !important;
  }
  .certificate-guide-fixed-height {
    min-height: 320px;
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
@media (max-width: 800px) {
  .card-title-responsive {
    font-size: 1.02rem !important;
  }
}
@media (max-width: 600px) {
  .completion-forms-card,
  .certificate-guide-fixed-height {
    padding: 12px !important;
  }
  .card-title-responsive {
    font-size: 0.98rem !important;
  }
  .doc-card {
    min-width: 100% !important;
    width: 100% !important;
    height: 140px !important;
  }
}
</style>
