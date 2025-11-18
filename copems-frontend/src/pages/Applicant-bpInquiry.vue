<template>
  <v-app>
    <v-main class="no-scroll">
      <v-container fluid class="pa-0 content-area">
        <v-row no-gutters class="fill-height">
          <v-col cols="12" class="pa-6 main-content-bg">
            <v-btn text color="white" @click="goBack" class="mb-4" to="home">
              <v-icon left>mdi-arrow-left</v-icon>
              Back
            </v-btn>
            <v-card
              flat
              class="mb-6 pa-5 process-card elevation-3"
              style="
                border-radius: 20px;
                background: linear-gradient(90deg, #f8fbff 0%, #e3f0ff 60%, #3b82f6 100%);
              "
            >
              <div>
                <h1 class="font-weight-bold mb-2 process-title" style="color: #23407c">
                  Building Permit Application Process
                </h1>
                <p class="mb-4 process-lead" style="color: #23407c">
                  Complete guide to obtaining your building permit in Naga City
                </p>
                <div class="processing-time-badge">
                  <v-icon color="#23407c" size="20" class="mr-2">
                    mdi-clock-outline
                  </v-icon>
                  <span class="font-weight-bold"> Standard Processing Time: </span>
                  <span class="ml-2">7 Working Days</span>
                </div>
              </div>
            </v-card>

            <v-card
              flat
              outlined
              color="#fff"
              class="mb-6 pa-4 timeline-card elevation-1"
            >
              <div class="application-timeline-card pa-0">
                <div class="mb-5">
                  <span class="timeline-title">Application Timeline</span>
                </div>
                <div
                  v-for="(item, i) in timelineItems"
                  :key="i"
                  class="d-flex align-start mb-4 timeline-step"
                >
                  <v-avatar
                    color="#2563EB"
                    size="32"
                    class="white--text mr-4"
                    style="font-size: 1rem"
                  >
                    <span>{{ i + 1 }}</span>
                  </v-avatar>
                  <div>
                    <div class="timeline-step-title">
                      {{ item.title }}
                    </div>
                    <div class="timeline-step-desc">
                      {{ item.description }}
                    </div>
                  </div>
                </div>
              </div>
            </v-card>

            <v-card
              flat
              outlined
              color="#fff"
              class="mb-6 pa-4 requirements-card elevation-1"
            >
              <div class="requirements-overview-card pa-0">
                <div class="mb-4">
                  <span class="requirements-title">Requirements Overview</span>
                </div>
                <v-row>
                  <v-col cols="12" md="4">
                    <div class="pa-2">
                      <div class="d-flex align-center mb-2">
                        <v-icon color="green" size="20" class="mr-2">
                          mdi-checkbox-marked-circle-outline
                        </v-icon>
                        <span class="font-weight-bold text-green">
                          Basic Requirements
                        </span>
                      </div>
                      <div
                        v-for="(req, i) in basicRequirements"
                        :key="i"
                        class="d-flex align-center mb-1"
                      >
                        <v-icon color="green" size="16" class="mr-1"> mdi-check </v-icon>
                        <span class="requirement-text">{{ req }}</span>
                      </div>
                    </div>
                  </v-col>
                  <v-col cols="12" md="4">
                    <div class="pa-2">
                      <div class="d-flex align-center mb-2">
                        <v-icon color="red" size="20" class="mr-2">
                          mdi-alert-circle-outline
                        </v-icon>
                        <span class="font-weight-bold text-red">
                          Common Reasons for Delays
                        </span>
                      </div>
                      <div
                        v-for="(reason, i) in delayReasons"
                        :key="i"
                        class="d-flex align-center mb-1"
                      >
                        <v-icon color="red" size="16" class="mr-1"> mdi-close </v-icon>
                        <span class="requirement-text">{{ reason }}</span>
                      </div>
                    </div>
                  </v-col>
                  <v-col cols="12" md="4">
                    <div class="pa-2">
                      <div class="d-flex align-center mb-2">
                        <v-icon color="orange" size="20" class="mr-2">
                          mdi-lightbulb-on-outline
                        </v-icon>
                        <span class="font-weight-bold text-orange">
                          Tips for Faster Processing
                        </span>
                      </div>
                      <div
                        v-for="(tip, i) in fasterProcessingTips"
                        :key="i"
                        class="d-flex align-center mb-1"
                      >
                        <v-icon color="orange" size="16" class="mr-1">
                          mdi-lightbulb
                        </v-icon>
                        <span class="requirement-text">{{ tip }}</span>
                      </div>
                    </div>
                  </v-col>
                </v-row>
              </div>
            </v-card>

            <v-card
              flat
              outlined
              color="#fff"
              class="mb-6 pa-4 requirement-checklist-card elevation-1"
            >
              <div class="pa-0">
                <div class="d-flex align-center mb-4">
                  <v-icon color="#2962ff" size="22" class="mr-2">
                    mdi-format-list-checks
                  </v-icon>
                  <span class="text-h6 font-weight-bold" style="color: #222">
                    Documentary Requirement Checklist for Building Permit
                  </span>
                </div>

                <v-row>
                  <v-col cols="12" md="6" class="pt-0">
                    <v-expansion-panels flat accordion>
                      <v-expansion-panel
                        v-for="(category, i) in checklistCol1"
                        :key="i"
                        class="mb-2"
                        style="border: 1px solid #e0e0e0; border-radius: 8px"
                      >
                        <v-expansion-panel-title
                          class="font-weight-bold text-blue-darken-3"
                        >
                          {{ category.title }}
                        </v-expansion-panel-title>
                        <v-expansion-panel-text>
                          <v-list dense class="pa-0">
                            <v-list-item
                              v-for="(item, j) in category.items"
                              :key="j"
                              class="pl-2"
                            >
                              <template v-slot:prepend>
                                <v-icon color="primary" size="18" class="mr-3"
                                  >mdi-circle-small</v-icon
                                >
                              </template>
                              <v-list-item-title class="text-body-1">{{
                                item
                              }}</v-list-item-title>
                            </v-list-item>
                          </v-list>
                        </v-expansion-panel-text>
                      </v-expansion-panel>
                    </v-expansion-panels>
                  </v-col>
                  <v-col cols="12" md="6" class="pt-0">
                    <v-expansion-panels flat accordion>
                      <v-expansion-panel
                        v-for="(category, i) in checklistCol2"
                        :key="i"
                        class="mb-2"
                        style="border: 1px solid #e0e0e0; border-radius: 8px"
                      >
                        <v-expansion-panel-title
                          class="font-weight-bold text-blue-darken-3"
                        >
                          {{ category.title }}
                        </v-expansion-panel-title>
                        <v-expansion-panel-text>
                          <v-list dense class="pa-0">
                            <v-list-item
                              v-for="(item, j) in category.items"
                              :key="j"
                              class="pl-2"
                            >
                              <template v-slot:prepend>
                                <v-icon color="primary" size="18" class="mr-3"
                                  >mdi-circle-small</v-icon
                                >
                              </template>
                              <v-list-item-title class="text-body-1">{{
                                item
                              }}</v-list-item-title>
                            </v-list-item>
                          </v-list>
                        </v-expansion-panel-text>
                      </v-expansion-panel>
                    </v-expansion-panels>
                  </v-col>
                </v-row>
              </div>
            </v-card>

            <div class="important-info-wrapper pa-4 mb-6">
              <div class="d-flex align-center mb-4">
                <v-icon color="#ffc107" size="28" class="mr-2"> mdi-information </v-icon>
                <span class="important-info-title text-h6 font-weight-bold">
                  Important Information
                </span>
              </div>
              <v-row>
                <v-col cols="12" md="6" class="pb-3">
                  <v-card class="info-card pa-4" outlined>
                    <div class="d-flex align-center mb-2">
                      <v-icon color="#2962ff" size="24" class="mr-2">
                        mdi-clock-outline
                      </v-icon>
                      <span class="font-weight-bold">Processing Time</span>
                    </div>
                    <div class="info-content">
                      <div>Standard: 7 working days</div>
                      <div>Complex projects: May require additional time</div>
                    </div>
                  </v-card>
                </v-col>
                <v-col cols="12" md="6" class="pb-3">
                  <v-card class="info-card pa-4" outlined>
                    <div class="d-flex align-center mb-2">
                      <v-icon color="#8e24aa" size="24" class="mr-2">
                        mdi-account-clock
                      </v-icon>
                      <span class="font-weight-bold">Office Hours</span>
                    </div>
                    <div class="info-content">
                      <div>Monday - Friday: 8:00 AM - 5:00 PM</div>
                      <div>Lunch Break: 12:00 PM - 1:00 PM</div>
                    </div>
                  </v-card>
                </v-col>
                <v-col cols="12" md="6">
                  <v-card class="info-card pa-4" outlined>
                    <div class="d-flex align-center mb-2">
                      <v-icon color="#43a047" size="24" class="mr-2">
                        mdi-credit-card-outline
                      </v-icon>
                      <span class="font-weight-bold">Payment Methods</span>
                    </div>
                    <div class="info-content">
                      <div>Cash and Online Payment</div>
                      <div class="text-caption">
                        All fees must be settled before permit release
                      </div>
                    </div>
                  </v-card>
                </v-col>
                <v-col cols="12" md="6">
                  <v-card class="info-card pa-4" outlined>
                    <div class="d-flex align-center mb-2">
                      <v-icon color="#e53935" size="24" class="mr-2"> mdi-phone </v-icon>
                      <span class="font-weight-bold">Contact Information</span>
                    </div>
                    <div class="info-content">
                      <div>Phone: (054) 473-2328</div>
                      <div>Email: permits@nagacity.gov.ph</div>
                    </div>
                  </v-card>
                </v-col>
              </v-row>
            </div>
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
      timelineItems: [
        {
          title: "Application Submission & Verification",
          description: "Day 1 - Submit complete documents and initial verification",
        },
        {
          title: "Document Review & Assessment",
          description: "Days 2-3 - Thorough review of submitted documents and plans",
        },
        {
          title: "Technical Evaluation",
          description: "Days 4-5 - Engineering and architectural plan evaluation",
        },
        {
          title: "Final Approval & Permit Release",
          description: "Days 6-7 - Final approval and permit issuance",
        },
      ],
      basicRequirements: [
        "Completed Unified Application Form",
        "Locational Clearance Application Form",
        "Building Plans and Lot Plans",
        "Required Ancillary Permits",
        "Complete Documentary Requirements",
      ],
      delayReasons: [
        "Incomplete or incorrect documentation",
        "Plans not compliant with building codes",
        "Missing ancillary permits",
        "Unpaid fees or incorrect payment amounts",
      ],
      fasterProcessingTips: [
        "Submit complete and accurate documents",
        "Ensure plans are signed by licensed professionals",
        "Follow up regularly on application status",
        "Prepare all fees in advance",
      ],
      checklistItems: [
        {
          title: "NEW CONSTRUCTION, ERECTION, & ADDITION",
          items: [
            "Architectural",
            "Civil/Structural",
            "Sanitary/Plumbing",
            "Mechanical",
            "Electrical",
            "Electronics",
          ],
        },
        {
          title: "ALTERATION",
          items: ["Architectural", "Civil/Structural", "Electrical"],
        },
        {
          title: "RENOVATION, REPAIR, RAISING & LEGALIZATION",
          items: ["Architectural", "Structural"],
        },
        {
          title: "CONVERSION",
          items: ["Architectural", "Structural", "Electrical", "Electronics"],
        },
        {
          title: "MOVING",
          items: ["Architectural/Structural", "Mechanical"],
        },
        {
          title: "ACCESSORY BUILDING",
          items: ["Architectural", "Structural", "Electrical", "SanZitary"],
        },
      ],
    };
  },
  computed: {
    checklistCol1() {
      const midpoint = Math.ceil(this.checklistItems.length / 2);
      return this.checklistItems.slice(0, midpoint);
    },
    checklistCol2() {
      const midpoint = Math.ceil(this.checklistItems.length / 2);
      return this.checklistItems.slice(midpoint);
    },
  },
  methods: {
    goBack() {
      window.location.href = "http://localhost:3000/";
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
  scrollbar-width: none; /* Firefox */
}

.content-area::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Edge */
}
.main-content-bg {
  background: linear-gradient(90deg, #fafdff 70%, #f3f7ff 100%);
  border-radius: 0 24px 24px 0;
  scrollbar-width: none; /* Firefox */
}

.main-content-bg::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Edge */
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
.page-title-gradient {
  background: linear-gradient(90deg, #1976d2 20%, #3b82f6 80%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.process-card {
  box-shadow: 0 4px 20px rgba(59, 130, 246, 0.09);
}
.process-title {
  font-size: 2rem;
  text-shadow: 0 1px 2px #fff8;
  letter-spacing: 0.02em;
}
.process-lead {
  font-size: 1.1rem;
  text-shadow: 0 1px 2px #fff8;
  font-weight: 500;
}
.processing-time-badge {
  display: inline-flex;
  align-items: center;
  background: rgba(59, 130, 246, 0.1);
  border-radius: 8px;
  padding: 7px 16px;
  color: #23407c;
  font-size: 1rem;
  margin-top: 6px;
  font-weight: 500;
}

.timeline-card,
.requirements-card,
.requirement-checklist-card {
  border-radius: 14px;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.04);
  background: #fff;
}
.timeline-title {
  font-size: 1.14rem;
  color: #1976d2;
  font-weight: bold;
  letter-spacing: 0.01em;
}
.timeline-step-title {
  font-size: 1.06rem;
  color: #222;
  font-weight: 600;
  margin-bottom: 2px;
}
.timeline-step-desc {
  font-size: 0.97rem;
  color: #555;
}
.requirements-title {
  font-size: 1.14rem;
  color: #1976d2;
  font-weight: bold;
}
.text-green {
  color: #2e7d32;
}
.text-red {
  color: #d32f2f;
}
.text-orange {
  color: #ff8500;
}
.requirement-text {
  font-size: 0.97rem;
}
.requirement-checklist-card {
  border-radius: 14px;
}
.important-info-wrapper {
  background: #fff9e6;
  border-radius: 16px;
  box-shadow: 0 2px 10px 0 rgba(255, 193, 7, 0.06);
}
.important-info-title {
  color: #d17f00;
}
.info-card {
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.08);
  transition: box-shadow 0.18s;
  border-width: 1.5px !important;
}
.info-card:hover {
  box-shadow: 0 8px 28px rgba(33, 150, 243, 0.14);
}
.info-content {
  font-size: 1rem;
  color: #23407c;
  font-weight: 500;
}
@media (max-width: 1200px) {
  .main-content-bg {
    border-radius: 0 14px 14px 0;
    padding: 8px !important;
  }
}
@media (max-width: 900px) {
  .content-area {
    padding-left: 0 !important;
    padding-right: 0 !important;
  }
  .main-content-bg {
    border-radius: 0 0 14px 14px;
    padding: 6px !important;
  }
}
@media (max-width: 600px) {
  .main-content-bg {
    border-radius: 0;
    padding: 2px !important;
  }
  .process-title {
    font-size: 1.1rem !important;
  }
  .timeline-title,
  .requirements-title {
    font-size: 1.01rem !important;
  }
  .step-label {
    font-size: 1rem !important;
  }
}
</style>
