<template>
  <v-app>
    <v-main class="no-scroll">
      <v-container fluid class="pa-0 fill-height">
        <v-row no-gutters class="fill-height">
          <v-col cols="12" md="3" class="pa-0 sidebar-column">
            <v-card
              flat
              class="pa-4 quick-guide-card d-flex flex-column"
              style="
                border-right: 1px solid #e0e0e0;
                height: 100%;
                background: #fcfcff;
              "
            >
              <div class="flex-grow-1">
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
                  :elevation="sidebarStep === index ? 2 : 0"
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

              <div class="pb-4 mt-auto">
                <v-btn
                  block
                  color="white"
                  variant="outlined"
                  class="text-capitalize font-weight-bold logout-btn"
                  @click="handleLogout"
                >
                  <v-icon left class="mr-2">mdi-logout</v-icon>
                  Logout
                </v-btn>
              </div>
            </v-card>
          </v-col>

          <v-col
            cols="12"
            md="9"
            class="main-content-bg pa-6 scrollable-content"
          >
            <v-container fluid>
              <v-card
                class="main-content-card card-shadow mx-auto"
                max-width="1300"
              >
                <v-row>
                  <v-col
                    v-for="(plan, i) in planUploads"
                    :key="i"
                    cols="12"
                    sm="6"
                    md="4"
                    class="d-flex"
                  >
                    <v-card
                      class="pa-2 rounded-xl plan-upload-card flex-grow-1"
                      elevation="3"
                    >
                      <div class="d-flex align-start ga-2 mb-1">
                        <div
                          class="plan-icon-bg d-flex align-center justify-center mr-3"
                        >
                          <v-icon size="30" color="#0000CC">{{
                            plan.icon
                          }}</v-icon>
                        </div>
                        <div class="text-left">
                          <v-card-title
                            class="pa-0 font-weight-bold text-wrap text-subtitle-1 plan-title"
                          >
                            {{ plan.title }}
                          </v-card-title>
                          <v-card-text
                            class="pa-0 text-caption text-grey-darken-1 text-wrap mt-1"
                          >
                            {{ plan.description }}
                          </v-card-text>
                        </div>
                      </div>

                      <v-divider class="my-divider"></v-divider>

                      <v-card
                        flat
                        class="pa-2 rounded-lg d-flex flex-column align-center plan-dropzone"
                        elevation="0"
                        @click="triggerFileInput(i)"
                        :class="{ 'has-file': uploadedFiles[i] }"
                      >
                        <template v-if="!uploadedFiles[i]">
                          <v-icon size="30" color="#c0c0c0">
                            mdi-cloud-upload-outline
                          </v-icon>
                          <v-card-text
                            class="pa-1 text-caption font-weight-bold text-wrap text-center"
                            style="margin-bottom: 3px"
                          >
                            Drop files here or click to browse
                          </v-card-text>
                          <v-card-text
                            class="pa-0 text-caption font-weight-regular text-grey-darken-1 text-wrap text-center"
                          >
                            PDF files only • Maximum file size: 50MB
                          </v-card-text>
                        </template>
                        <template v-else>
                          <div
                            class="d-flex flex-column align-center justify-center h-100 w-100"
                          >
                            <v-icon color="success" size="30"
                              >mdi-check-circle</v-icon
                            >
                            <v-card-text
                              class="pa-0 text-caption font-weight-bold text-center text-truncate w-100 px-2"
                            >
                              {{ uploadedFiles[i].name }}
                            </v-card-text>
                            <span class="text-caption text-grey-darken-1">
                              {{
                                (uploadedFiles[i].size / 1024 / 1024).toFixed(2)
                              }}
                              MB
                            </span>
                          </div>
                        </template>

                        <v-file-input
                          ref="fileInputs"
                          v-model="rawFileInputs[i]"
                          class="file-input-overlay"
                          accept=".pdf"
                          hide-details
                          @update:modelValue="
                            (file) => handleFileUpload(i, file)
                          "
                        ></v-file-input>
                      </v-card>
                    </v-card>
                  </v-col>
                </v-row>

                <v-row justify="end" class="mt-6 align-center">
                  <v-col cols="auto" class="d-flex align-center ga-4">
                    <v-alert
                      v-if="showUploadError"
                      type="error"
                      variant="tonal"
                      density="compact"
                      class="mb-0 rounded-pill"
                    >
                      Incomplete upload: All 6 plans are required.
                    </v-alert>

                    <v-btn
                      variant="outlined"
                      color="blue-darken-2"
                      class="text-none rounded-pill font-weight-bold"
                      @click="saveDraft"
                    >
                      Save as Draft
                    </v-btn>

                    <v-btn
                      color="#0000CC"
                      class="rounded-pill text-none font-weight-bold px-10"
                      elevation="4"
                      size="large"
                      @click="handleFinalSubmit"
                    >
                      SUBMIT
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card>
            </v-container>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <v-dialog v-model="showSuccessDialog" max-width="400" persistent>
      <v-card class="pa-4 text-center rounded-xl" elevation="10">
        <div class="d-flex justify-center my-4">
          <v-icon color="green-lighten-1" size="80"
            >mdi-check-circle-outline</v-icon
          >
        </div>
        <v-card-title class="text-h5 font-weight-bold text-wrap mb-2">
          Submitted Successfully
        </v-card-title>
        <v-card-text class="text-subtitle-1 text-grey-darken-1">
          All files have been received.
        </v-card-text>
        <v-card-actions class="justify-center pt-4 pb-2">
          <v-btn
            color="#0000CC"
            class="text-none rounded-pill px-8"
            @click="closeSuccessDialog"
          >
            Continue
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar
      v-model="snackbar"
      timeout="2000"
      color="success"
      rounded="pill"
    >
      Progress saved as draft.
    </v-snackbar>
  </v-app>
</template>

<script setup>
/**
 * ACM Citation Style:
 * [1] Gemini AI. 2026. Vue 3 Building Permit Portal Fixed Layout. (January 2026).
 */

import { ref, nextTick, onMounted, watch } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const sidebarStep = ref(1);
const showSuccessDialog = ref(false);
const showUploadError = ref(false);
const snackbar = ref(false);
const fileInputs = ref([]);

const sidebarSteps = ref([
  "Fill up the Unified Application Form",
  "Upload Building Plans & Lot Plans",
  "Download Filled-up Unified Application Form and Required Ancillary Permits",
]);

const planUploads = ref([
  {
    title: "Architectural Plans",
    description: "Floor plans, elevations, sections, and details",
    icon: "mdi-home-outline",
  },
  {
    title: "Civil/Structural Plans",
    description: "Foundation, framing, and structural details",
    icon: "mdi-domain",
  },
  {
    title: "Mechanical Plan",
    description: "HVAC, ventilation, and mechanical systems",
    icon: "mdi-cog-outline",
  },
  {
    title: "Electrical Plans",
    description: "Wiring, lighting, and electrical systems",
    icon: "mdi-flash-outline",
  },
  {
    title: "Plumbing Plans",
    description: "Water supply, drainage, and plumbing fixtures",
    icon: "mdi-pipe-wrench",
  },
  {
    title: "Other Plans",
    description: "Site plans, landscape, and miscellaneous",
    icon: "mdi-file-document-outline",
  },
]);

const rawFileInputs = ref(new Array(6).fill(null));
const uploadedFiles = ref(new Array(6).fill(null));

const handleFileUpload = (index, file) => {
  if (file) {
    const selected = Array.isArray(file) ? file[0] : file;
    if (selected.type !== "application/pdf") {
      alert("Only PDF files are allowed.");
      rawFileInputs.value[index] = null;
      return;
    }
    if (selected.size > 50 * 1024 * 1024) {
      alert("File is too large (Max 50MB).");
      rawFileInputs.value[index] = null;
      return;
    }
    uploadedFiles.value[index] = selected;
    if (uploadedFiles.value.every((f) => f !== null))
      showUploadError.value = false;
  } else {
    uploadedFiles.value[index] = null;
  }
};

const triggerFileInput = (index) => {
  nextTick(() => {
    const el = fileInputs.value[index];
    if (el) {
      const input = el.$el.querySelector("input[type='file']");
      if (input) input.click();
    }
  });
};

const saveDraft = () => {
  const draftNames = uploadedFiles.value.map((f) => (f ? f.name : null));
  localStorage.setItem("bp_draft_files", JSON.stringify(draftNames));
  snackbar.value = true;
};

const handleFinalSubmit = () => {
  if (!uploadedFiles.value.every((f) => f !== null)) {
    showUploadError.value = true;
    return;
  }
  showSuccessDialog.value = true;
};

const handleLogout = () => {
  localStorage.removeItem("bp_draft_files");
  router.push("/login");
};

const goToSidebarStep = (i) => {
  sidebarStep.value = i;
  if (i === 0) router.push("/applicant/applicantdetails");
};

const closeSuccessDialog = () => {
  showSuccessDialog.value = false;
  router.push("/applicant/selectancillary");
};

onMounted(() => {
  console.log("Portal Initialized - ACM Reference [1]");
});

watch(
  uploadedFiles,
  (newVal) => {
    const count = newVal.filter((f) => f !== null).length;
    console.log(`Current upload progress: ${count}/6`);
  },
  { deep: true }
);
</script>

<style scoped>
/* Key Layout Fixes */
.no-scroll {
  height: 100vh !important;
  overflow: hidden !important;
}

.sidebar-column {
  height: 100vh;
  position: sticky;
  top: 0;
}

.scrollable-content {
  height: 100vh;
  overflow-y: auto !important;
}

.logout-btn {
  border: 1px solid #d1d5db !important;
  color: #374151 !important;
}

.main-content-bg {
  background: #fafdff;
}

.quick-guide-card {
  height: 100%;
}

.active-step {
  background: #e7efff !important;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.12);
}

.step-label {
  color: #23407c;
  font-size: 1rem;
}

.clickable-step {
  cursor: pointer;
}

.card-shadow {
  box-shadow: 0 2px 14px 0 rgba(25, 118, 210, 0.11);
  border-radius: 18px;
  border: 1.5px solid #e3eafc;
}

.main-content-card {
  padding: 30px;
  border-radius: 18px;
  background: #ffffff;
}

.plan-upload-card {
  min-height: 220px;
  border: 1px solid #e3eafc;
  padding: 12px !important;
}

.plan-icon-bg {
  background: #eef2ff;
  border-radius: 50%;
  width: 36px;
  height: 36px;
}

.plan-dropzone {
  border: 2px dashed #e0e0e0;
  background: #f8fbff;
  flex: 1;
  cursor: pointer;
}

.plan-dropzone.has-file {
  border: 2px solid #4caf50;
  background: #f1fdf1;
}

.file-input-overlay {
  display: none;
}

@media (max-width: 960px) {
  .no-scroll,
  .sidebar-column,
  .scrollable-content {
    height: auto !important;
    overflow: visible !important;
  }
}
</style>