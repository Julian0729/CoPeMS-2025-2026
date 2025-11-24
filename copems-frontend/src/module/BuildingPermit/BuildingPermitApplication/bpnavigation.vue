<template>
  <v-col cols="12" md="3" class="pa-0 nav-column">
    <v-card
      flat
      class="pa-4 quick-guide-card d-flex flex-column justify-space-between elevation-2"
      style="
        border-right: 1px solid #e0e0e0;
        height: 100%;
        background: #fcfcff;
        overflow-y: auto;
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
            'clickable-step': index === 0,
            'active-step': sidebarStep === index,
          }"
          @click="$emit('go-to-step', index)"
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
          @click="$emit('logout')"
        >
          <v-icon left>mdi-logout</v-icon>
          Logout
        </v-btn>
      </div>
    </v-card>
  </v-col>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "ApplicantNavigation",
  props: {
    sidebarStep: {
      type: Number,
      required: true,
    },
    sidebarSteps: {
      type: Array,
      required: true,
    },
  },
  emits: ["go-to-step", "logout"],
});
</script>

<style scoped>
/* keep styling scoped to match original page */
.nav-column {
  display: flex;
  flex-direction: column;
  max-height: 100%;
  flex-shrink: 0;
}
.quick-guide-card {
  height: 100%;
  background: #fcfcff;
  border-right: 1px solid #e0e0e0;
  overflow-y: auto;
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
</style>