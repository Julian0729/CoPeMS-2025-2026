<template>
  <v-app class="bg-slate-50">
    <v-app-bar
      flat
      color="white"
      height="88"
      class="elevation-4 border-b"
      app
      style="position: fixed; top: 0; z-index: 1006"
    >
      <v-container
        fluid
        class="d-flex align-center py-0 h-100"
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
            <div
              style="
                font-size: 12px;
                font-weight: 400;
                color: Black;
                line-height: 1.2;
              "
            >
              REPUBLIC OF THE PHILIPPINES
            </div>
            <div
              style="
                font-size: 15px;
                font-weight: 700;
                color: Black;
                line-height: 1.2;
              "
            >
              CITY GOVERNMENT OF NAGA
            </div>
          </div>
        </div>

        <v-spacer></v-spacer>

        <div class="d-flex align-center">
          <v-menu location="bottom end">
            <template #activator="{ props }">
              <v-btn variant="text" :style="s.profileBtn" v-bind="props">
                <v-avatar size="32" class="mx-2" color="blue-darken-2">
                  <span class="text-white font-weight-bold text-caption">
                    {{ getInitials(mockEvaluatorProfile.name) }}
                  </span>
                </v-avatar>
                <div class="d-flex flex-column text-left">
                  <span
                    class="text-caption font-weight-bold"
                    style="color: #555; white-space: nowrap"
                  >
                    {{ mockEvaluatorProfile.name }}
                  </span>
                  <span
                    class="text-caption font-weight-medium"
                    style="color: #888; white-space: nowrap"
                  >
                    {{ mockEvaluatorProfile.title }}
                  </span>
                </div>
                <v-icon class="ml-1" size="small">mdi-chevron-down</v-icon>
              </v-btn>
            </template>

            <v-card min-width="200" class="mt-1 border shadow-sm">
              <v-list density="compact" nav>
                <v-list-item>
                  <v-list-item-title class="font-weight-bold">
                    {{ mockEvaluatorProfile.name }}
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ mockEvaluatorProfile.specialty }}
                  </v-list-item-subtitle>
                </v-list-item>
                <v-divider class="my-1"></v-divider>
                <v-list-item link @click="logout" class="text-red-darken-1">
                  <template #prepend><v-icon>mdi-logout</v-icon></template>
                  <v-list-item-title>Log Out</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-card>
          </v-menu>
        </div>
      </v-container>
    </v-app-bar>

    <v-main style="background-color: #f5f6fa; padding-top: 88px">
      <v-container fluid class="bg-grey-lighten-5 fill-height align-start pa-6">
        <v-row>
          <v-col cols="12" md="8">
            <v-card
              class="mb-6"
              elevation="0"
              border
              style="border-color: #e0e0e0"
            >
              <div class="pa-6">
                <div class="d-flex align-center gap-4 mb-6 pb-4 border-b">
                  <v-sheet
                    color="green-lighten-5"
                    rounded="lg"
                    width="48"
                    height="48"
                    class="d-flex align-center justify-center"
                  >
                    <v-icon color="green-darken-1" size="24"
                      >mdi-calculator</v-icon
                    >
                  </v-sheet>
                  <div>
                    <h3 class="text-h6 font-weight-bold text-blue-darken-4">
                      Assessment Inputs
                    </h3>
                    <p class="text-caption text-grey-darken-1">
                      Enter specifications. Fees compute automatically based on
                      NBCDO rates.
                    </p>
                  </div>
                </div>

                <v-sheet
                  class="bg-blue-lighten-5 rounded pa-4 mb-6 border"
                  style="border-color: #90caf9 !important"
                >
                  <div class="d-flex align-center mb-3">
                    <v-icon color="blue-darken-2" size="small" class="mr-2"
                      >mdi-information-outline</v-icon
                    >
                    <span
                      class="text-subtitle-2 font-weight-bold text-blue-darken-4"
                      >Project Parameters (Basis of Assessment)</span
                    >
                  </div>
                  <v-row dense>
                    <v-col cols="12" md="8">
                      <v-select
                        label="Character of Occupancy (Group)"
                        v-model="occupancyGroup"
                        :items="occupancyOptions"
                        item-title="text"
                        item-value="value"
                        variant="outlined"
                        bg-color="white"
                        density="compact"
                        hide-details
                        color="blue-darken-2"
                        prepend-inner-icon="mdi-office-building"
                      >
                        <template v-slot:item="{ props, item }">
                          <v-list-item
                            v-bind="props"
                            :subtitle="`Rate: ₱${item.raw.rate}/sqm`"
                          ></v-list-item>
                        </template>
                      </v-select>
                    </v-col>
                    <v-col cols="12" md="4">
                      <v-text-field
                        label="Total Floor Area"
                        v-model.number="floorArea"
                        type="number"
                        variant="outlined"
                        bg-color="white"
                        density="compact"
                        hide-details
                        color="blue-darken-2"
                        suffix="m²"
                        placeholder="0"
                        class="font-weight-bold"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-sheet>

                <v-tabs
                  v-model="activeTab"
                  color="blue-darken-3"
                  align-tabs="start"
                  class="border-b mb-6"
                  slider-color="blue-darken-3"
                >
                  <v-tab
                    value="building"
                    class="text-none font-weight-bold text-body-2"
                    >Building & Civil</v-tab
                  >
                  <v-tab
                    value="technical"
                    class="text-none font-weight-medium text-body-2"
                    >Technical</v-tab
                  >
                  <v-tab
                    value="sanitary"
                    class="text-none font-weight-medium text-body-2"
                    >Plumbing & San.</v-tab
                  >
                  <v-tab
                    value="penalties"
                    class="text-none font-weight-medium text-body-2"
                    color="red-darken-1"
                    >Penalties</v-tab
                  >
                </v-tabs>

                <v-window v-model="activeTab">
                  <v-window-item value="building">
                    <div
                      class="text-caption text-grey-darken-1 mb-2 ml-1 font-weight-bold"
                    >
                      A. Building Fee Breakdown
                    </div>

                    <v-row dense class="mb-2">
                      <v-col cols="12" md="8">
                        <v-text-field
                          label="Building Fee (Area × Rate)"
                          :model-value="buildingFee"
                          prefix="₱"
                          type="number"
                          variant="outlined"
                          bg-color="green-lighten-5"
                          base-color="green-darken-1"
                          density="compact"
                          hide-details
                          class="font-weight-bold"
                          readonly
                        >
                          <template v-slot:append-inner>
                            <v-chip
                              size="x-small"
                              color="green-darken-1"
                              class="font-weight-bold px-2"
                              label
                              >Auto-Calc</v-chip
                            >
                          </template>
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" md="4">
                        <v-text-field
                          label="Processing (Civil)"
                          model-value="100"
                          prefix="₱"
                          readonly
                          variant="outlined"
                          density="compact"
                          hide-details
                          bg-color="grey-lighten-4"
                        ></v-text-field>
                      </v-col>
                    </v-row>

                    <v-divider class="my-4 border-dashed"></v-divider>

                    <div
                      class="text-caption text-grey-darken-1 mb-2 ml-1 font-weight-bold"
                    >
                      B. Other Fixed Fees
                    </div>
                    <v-row dense>
                      <v-col cols="6" md="3">
                        <v-text-field
                          label="Filing Fee"
                          model-value="200"
                          prefix="₱"
                          readonly
                          variant="outlined"
                          density="compact"
                          hide-details
                          bg-color="white"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="6" md="3">
                        <v-text-field
                          label="Arch. Proc."
                          model-value="100"
                          prefix="₱"
                          readonly
                          variant="outlined"
                          density="compact"
                          hide-details
                          bg-color="white"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="6" md="3">
                        <v-text-field
                          label="Interior Proc."
                          model-value="100"
                          prefix="₱"
                          readonly
                          variant="outlined"
                          density="compact"
                          hide-details
                          bg-color="white"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="6" md="3">
                        <v-text-field
                          label="L&G Proc."
                          model-value="100"
                          prefix="₱"
                          readonly
                          variant="outlined"
                          density="compact"
                          hide-details
                          bg-color="white"
                        ></v-text-field>
                      </v-col>
                    </v-row>

                    <v-divider class="my-4 border-dashed"></v-divider>

                    <div
                      class="text-caption text-grey-darken-1 mb-2 ml-1 font-weight-bold"
                    >
                      C. Geodetic & Fencing
                    </div>
                    <v-row dense class="mb-2">
                      <v-col cols="12" md="6">
                        <v-text-field
                          label="No. of Corners"
                          v-model.number="corners"
                          type="number"
                          suffix="pcs"
                          variant="outlined"
                          density="compact"
                          hide-details
                          bg-color="white"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-text-field
                          label="Staking Fee (@ ₱50)"
                          :model-value="cornerStakingFee"
                          prefix="₱"
                          readonly
                          variant="outlined"
                          density="compact"
                          hide-details
                          bg-color="grey-lighten-5"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row dense>
                      <v-col cols="12" md="6">
                        <v-text-field
                          label="Fence Length"
                          v-model.number="fenceLength"
                          type="number"
                          suffix="m"
                          variant="outlined"
                          density="compact"
                          hide-details
                          bg-color="white"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-text-field
                          label="Fencing Fee (@ ₱5)"
                          :model-value="fencingFee"
                          prefix="₱"
                          readonly
                          variant="outlined"
                          density="compact"
                          hide-details
                          bg-color="grey-lighten-5"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-window-item>

                  <v-window-item value="technical">
                    <v-row dense class="mb-3 align-center">
                      <v-col cols="4"
                        ><v-text-field
                          label="Electrical Load"
                          v-model.number="kva"
                          suffix="kVA"
                          variant="outlined"
                          density="compact"
                          hide-details
                          bg-color="white"
                        ></v-text-field
                      ></v-col>
                      <v-col cols="4"
                        ><v-text-field
                          label="Fee"
                          :model-value="electricalFee"
                          prefix="₱"
                          readonly
                          variant="outlined"
                          density="compact"
                          hide-details
                          bg-color="grey-lighten-5"
                        ></v-text-field
                      ></v-col>
                      <v-col cols="4"
                        ><v-text-field
                          label="Proc."
                          model-value="100"
                          prefix="₱"
                          readonly
                          variant="outlined"
                          density="compact"
                          hide-details
                          bg-color="grey-lighten-4"
                        ></v-text-field
                      ></v-col>
                    </v-row>
                    <v-row dense class="mb-3 align-center">
                      <v-col cols="4"
                        ><v-text-field
                          label="Mech. Capacity"
                          v-model.number="mechUnits"
                          suffix="HP"
                          variant="outlined"
                          density="compact"
                          hide-details
                          bg-color="white"
                        ></v-text-field
                      ></v-col>
                      <v-col cols="4"
                        ><v-text-field
                          label="Fee"
                          :model-value="mechanicalFee"
                          prefix="₱"
                          readonly
                          variant="outlined"
                          density="compact"
                          hide-details
                          bg-color="grey-lighten-5"
                        ></v-text-field
                      ></v-col>
                      <v-col cols="4"
                        ><v-text-field
                          label="Proc."
                          model-value="100"
                          prefix="₱"
                          readonly
                          variant="outlined"
                          density="compact"
                          hide-details
                          bg-color="grey-lighten-4"
                        ></v-text-field
                      ></v-col>
                    </v-row>
                    <v-row dense class="align-center">
                      <v-col cols="4"
                        ><v-text-field
                          label="Electronics Qty"
                          v-model.number="devices"
                          suffix="pcs"
                          variant="outlined"
                          density="compact"
                          hide-details
                          bg-color="white"
                        ></v-text-field
                      ></v-col>
                      <v-col cols="4"
                        ><v-text-field
                          label="Fee"
                          :model-value="electronicsFee"
                          prefix="₱"
                          readonly
                          variant="outlined"
                          density="compact"
                          hide-details
                          bg-color="grey-lighten-5"
                        ></v-text-field
                      ></v-col>
                      <v-col cols="4"
                        ><v-text-field
                          label="Proc."
                          model-value="100"
                          prefix="₱"
                          readonly
                          variant="outlined"
                          density="compact"
                          hide-details
                          bg-color="grey-lighten-4"
                        ></v-text-field
                      ></v-col>
                    </v-row>
                  </v-window-item>

                  <v-window-item value="sanitary">
                    <v-row dense class="mb-3 align-center">
                      <v-col cols="4"
                        ><v-text-field
                          label="Plumbing Fixtures"
                          v-model.number="fixtures"
                          suffix="pcs"
                          variant="outlined"
                          density="compact"
                          hide-details
                          bg-color="white"
                        ></v-text-field
                      ></v-col>
                      <v-col cols="4"
                        ><v-text-field
                          label="Fee"
                          :model-value="plumbingFee"
                          prefix="₱"
                          readonly
                          variant="outlined"
                          density="compact"
                          hide-details
                          bg-color="grey-lighten-5"
                        ></v-text-field
                      ></v-col>
                      <v-col cols="4"
                        ><v-text-field
                          label="Proc."
                          model-value="100"
                          prefix="₱"
                          readonly
                          variant="outlined"
                          density="compact"
                          hide-details
                          bg-color="grey-lighten-4"
                        ></v-text-field
                      ></v-col>
                    </v-row>
                    <v-row dense class="align-center">
                      <v-col cols="4"
                        ><v-text-field
                          label="Sanitary Systems"
                          v-model.number="sanitarySystems"
                          suffix="sys"
                          variant="outlined"
                          density="compact"
                          hide-details
                          bg-color="white"
                        ></v-text-field
                      ></v-col>
                      <v-col cols="4"
                        ><v-text-field
                          label="Fee"
                          :model-value="sanitaryFee"
                          prefix="₱"
                          readonly
                          variant="outlined"
                          density="compact"
                          hide-details
                          bg-color="grey-lighten-5"
                        ></v-text-field
                      ></v-col>
                      <v-col cols="4"
                        ><v-text-field
                          label="Proc."
                          model-value="100"
                          prefix="₱"
                          readonly
                          variant="outlined"
                          density="compact"
                          hide-details
                          bg-color="grey-lighten-4"
                        ></v-text-field
                      ></v-col>
                    </v-row>
                  </v-window-item>

                  <v-window-item value="penalties">
                    <v-sheet
                      class="bg-red-lighten-5 rounded pa-4 border"
                      style="border-color: #ffcdd2 !important"
                    >
                      <v-row dense>
                        <v-col cols="12" md="6"
                          ><v-text-field
                            label="Surcharges"
                            v-model.number="surcharges"
                            prefix="₱"
                            type="number"
                            variant="outlined"
                            bg-color="white"
                            density="compact"
                            hide-details
                            class="mb-4"
                          ></v-text-field
                        ></v-col>
                        <v-col cols="12" md="6"
                          ><v-text-field
                            label="Penalties"
                            v-model.number="penalties"
                            prefix="₱"
                            type="number"
                            variant="outlined"
                            bg-color="white"
                            density="compact"
                            hide-details
                            class="mb-4"
                          ></v-text-field
                        ></v-col>
                        <v-col cols="12"
                          ><v-textarea
                            label="Violation Details / Remarks"
                            v-model="penaltyRemarks"
                            variant="outlined"
                            bg-color="white"
                            color="red-darken-4"
                            rows="2"
                            hide-details
                          ></v-textarea
                        ></v-col>
                      </v-row>
                    </v-sheet>
                  </v-window-item>
                </v-window>
              </div>
            </v-card>
          </v-col>

          <v-col cols="12" md="4">
            <div style="position: sticky; top: 24px">
              <v-card class="border" elevation="1">
                <div class="pa-6">
                  <div class="d-flex align-center gap-4 mb-4 pb-4 border-b">
                    <v-sheet
                      color="green-lighten-5"
                      rounded="lg"
                      width="48"
                      height="48"
                      class="d-flex align-center justify-center"
                    >
                      <v-icon color="green-darken-1" size="24"
                        >mdi-receipt</v-icon
                      >
                    </v-sheet>
                    <div>
                      <h3 class="text-h6 font-weight-bold text-green-darken-4">
                        Assessment Summary
                      </h3>
                      <p class="text-caption text-grey-darken-1">
                        Fee computation details
                      </p>
                    </div>
                  </div>

                  <div class="mb-6">
                    <div
                      v-for="(item, index) in summaryItems"
                      :key="index"
                      class="d-flex justify-space-between align-center py-1"
                    >
                      <span
                        :class="[
                          'text-caption',
                          item.isIndent
                            ? 'text-grey ml-6'
                            : 'text-grey-darken-3 font-weight-medium',
                        ]"
                      >
                        {{ item.label }}
                      </span>
                      <span
                        :class="[
                          'text-caption font-weight-medium',
                          item.amount > 0
                            ? 'text-black'
                            : 'text-grey-lighten-1',
                        ]"
                      >
                        ₱ {{ formatCurrency(item.amount) }}
                      </span>
                    </div>
                  </div>

                  <v-sheet
                    class="bg-green-lighten-5 pa-4 mb-4 text-center rounded-lg"
                    style="border: 2px solid #86efac"
                  >
                    <div
                      class="text-subtitle-2 text-green-darken-3 font-weight-medium text-uppercase mb-1"
                    >
                      Total Amount Due
                    </div>
                    <div
                      class="text-h3 font-weight-bold text-green-darken-4"
                      style="letter-spacing: -1px"
                    >
                      ₱ {{ formatCurrency(totalAmount) }}
                    </div>
                  </v-sheet>

                  <v-btn
                    block
                    color="#10B981"
                    size="x-large"
                    elevation="0"
                    class="text-none rounded text-white font-weight-bold mb-6"
                    prepend-icon="mdi-file-document-outline"
                    @click="handleGenerateOrder"
                  >
                    Generate Assessment Order
                  </v-btn>

                  <v-divider class="mb-4"></v-divider>

                  <div
                    class="d-flex justify-space-between align-center text-caption text-grey-darken-1 mb-1"
                  >
                    <span>Date Assessed:</span>
                    <span class="text-black font-weight-medium">{{
                      currentDate
                    }}</span>
                  </div>
                  <div
                    class="d-flex justify-space-between align-center text-caption text-grey-darken-1 mb-1"
                  >
                    <span>Assessed By:</span>
                    <span class="text-black font-weight-medium">Engineer</span>
                  </div>
                  <div
                    class="d-flex justify-space-between align-center text-caption text-grey-darken-1 mb-4"
                  >
                    <span>Status:</span>
                    <v-chip
                      size="x-small"
                      color="orange-lighten-4"
                      class="text-orange-darken-4 font-weight-bold"
                      variant="flat"
                      >Draft</v-chip
                    >
                  </div>

                  <v-sheet
                    color="blue-lighten-5"
                    class="pa-3 rounded text-caption text-blue-darken-3"
                    style="border: 1px solid #bbdefb"
                  >
                    <strong>Note:</strong> All fees are computed based on the
                    NBCDO fee schedule and building specifications. Please
                    verify all inputs before finalizing.
                  </v-sheet>
                </div>
              </v-card>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, computed } from "vue";

// --- Profile Data ---
const mockEvaluatorProfile = ref({
  name: "Julian Lumanta",
  title: "Engineer",
  specialty: "Engineering",
  image: "https://randomuser.me/api/portraits/men/32.jpg",
});

const getInitials = (name) => {
  const parts = name.split(" ");
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

const logout = () => {
  console.log("User logging out");
};

// --- Styles ---
const s = {
  profileBtn: {
    backgroundColor: "transparent",
    boxShadow: "none",
    padding: 0,
    minWidth: "unset",
  },
};

const activeTab = ref("building");

// --- CONSTANTS ---
const FIXED_FILING = 200;
const FIXED_PROC = 100;
const STAKING_RATE = 50;
const FENCE_RATE = 5;
const MECH_RATE = 100;
const PLUMB_RATE = 7;
const ELEX_RATE = 2.4;
const SAN_RATE = 50;

// --- INPUTS ---
const occupancyGroup = ref("A");
const occupancyOptions = [
  { text: "Group A (Residential)", value: "A", rate: 10 },
  { text: "Group B (Commercial)", value: "B", rate: 20 },
  { text: "Group C (Industrial)", value: "C", rate: 40 },
  { text: "Group D (Institutional)", value: "D", rate: 20 },
  { text: "Group E (Assembly)", value: "E", rate: 20 },
  { text: "Group F (Agricultural)", value: "F", rate: 5 },
  { text: "Group G (Storage)", value: "G", rate: 10 },
  { text: "Group H (Protective)", value: "H", rate: 5 },
  { text: "Group I (Utility)", value: "I", rate: 5 },
  { text: "Group J (Accessory)", value: "J", rate: 4 },
];

const floorArea = ref(null);
const corners = ref(null);
const fenceLength = ref(null);
const kva = ref(null);
const mechUnits = ref(null);
const fixtures = ref(null);
const sanitarySystems = ref(null);
const devices = ref(null);
const surcharges = ref(0);
const penalties = ref(0);
const penaltyRemarks = ref("");

// --- COMPUTED RATE ---
const currentRate = computed(() => {
  const grp = occupancyOptions.find((o) => o.value === occupancyGroup.value);
  return grp ? grp.rate : 0;
});

// --- COMPUTED FEES ---
// Calculations are instant via computed props
const buildingFee = computed(() => (floorArea.value || 0) * currentRate.value);
const cornerStakingFee = computed(() => (corners.value || 0) * STAKING_RATE);
const fencingFee = computed(() => (fenceLength.value || 0) * FENCE_RATE);

const electricalFee = computed(() => {
  const val = kva.value || 0;
  if (val <= 0) return 0;
  if (val <= 5) return 20 * val;
  if (val <= 50) return 25 * val;
  return 30 * val;
});

const mechanicalFee = computed(() => (mechUnits.value || 0) * MECH_RATE);
const plumbingFee = computed(() => (fixtures.value || 0) * PLUMB_RATE);
const sanitaryFee = computed(() => (sanitarySystems.value || 0) * SAN_RATE);
const electronicsFee = computed(() => (devices.value || 0) * ELEX_RATE);

// --- SUMMARY LIST ---
const summaryItems = computed(() => [
  { label: "Filing Fee", amount: FIXED_FILING, isIndent: false },

  // Building / Civil
  { label: "Building Fee", amount: buildingFee.value, isIndent: false },
  { label: "Civil Processing", amount: FIXED_PROC, isIndent: true },

  // Architectural
  { label: "Arch. Processing", amount: FIXED_PROC, isIndent: false },

  // Interior
  { label: "Interior Processing", amount: FIXED_PROC, isIndent: false },

  // Geodetic
  {
    label: "Line & Grade Staking",
    amount: cornerStakingFee.value,
    isIndent: false,
  },
  { label: "L&G Processing", amount: FIXED_PROC, isIndent: true },

  // Fencing
  { label: "Fencing Fee", amount: fencingFee.value, isIndent: false },

  // Electrical
  { label: "Electrical Fee", amount: electricalFee.value, isIndent: false },
  { label: "Elec. Processing", amount: FIXED_PROC, isIndent: true },

  // Mechanical
  { label: "Mechanical Fee", amount: mechanicalFee.value, isIndent: false },
  { label: "Mech. Processing", amount: FIXED_PROC, isIndent: true },

  // Plumbing
  { label: "Plumbing Fee", amount: plumbingFee.value, isIndent: false },
  { label: "Plumb. Processing", amount: FIXED_PROC, isIndent: true },

  // Sanitary
  { label: "Sanitary Fee", amount: sanitaryFee.value, isIndent: false },
  { label: "San. Processing", amount: FIXED_PROC, isIndent: true },

  // Electronics
  { label: "Electronics Fee", amount: electronicsFee.value, isIndent: false },
  { label: "Elex. Processing", amount: FIXED_PROC, isIndent: true },

  { label: "Surcharges", amount: surcharges.value, isIndent: false },
  { label: "Penalties", amount: penalties.value, isIndent: false },
]);

const totalAmount = computed(() => {
  return summaryItems.value.reduce((acc, item) => acc + item.amount, 0);
});

const currentDate = computed(() => {
  return new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
});

const formatCurrency = (val) => {
  return val
    ? val.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    : "0.00";
};

const handleGenerateOrder = () => {
  // Logic to generate order
  alert(`Assessment Generated! Total: ₱ ${formatCurrency(totalAmount.value)}`);
};
</script>

<style scoped>
.gap-4 {
  gap: 16px;
}
.border-b {
  border-bottom: 1px solid #e0e0e0;
}
.border-dashed {
  border-style: dashed;
}
</style>