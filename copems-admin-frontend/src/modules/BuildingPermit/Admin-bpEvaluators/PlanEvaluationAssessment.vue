<template>
  <v-app>
    <v-app-bar flat color="#0000CC" dark height="88" app class="elevation-4">
      <v-container
        fluid
        class="d-flex align-center py-0"
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
                color: white;
                line-height: 1.2;
              "
            >
              REPUBLIC OF THE PHILIPPINES
            </div>
            <div
              style="
                font-size: 15px;
                font-weight: 700;
                color: white;
                line-height: 1.2;
              "
            >
              CITY GOVERNMENT OF NAGA
            </div>
          </div>
        </div>
      </v-container>
    </v-app-bar>

    <v-main
      style="
        background-color: #f5f6fa;
        padding-top: 88px;
        display: flex;
        flex-direction: column;
        overflow: hidden;
      "
    >
      <div :style="s.topToolbar" style="flex-shrink: 0">
        <div class="left d-flex align-center">
          <v-icon color="#3b82f6" class="mr-2">mdi-office-building</v-icon>
          <h3 class="mb-0 font-weight-bold" :style="s.textToolbar">
            Building Permit Application
          </h3>
        </div>
        <div class="right d-flex align-center">
          <v-menu :close-on-content-click="true" location="bottom end">
            <template #activator="{ props }">
              <v-btn variant="text" :style="s.profileBtn" v-bind="props">
                <v-avatar size="32" class="mx-2">
                  <v-img
                    :alt="mockEvaluatorProfile.name"
                    :src="mockEvaluatorProfile.avatar"
                  />
                </v-avatar>
                <div class="d-flex flex-column text-left">
                  <span
                    class="text-caption font-weight-bold"
                    style="color: #555; white-space: nowrap"
                    >{{ mockEvaluatorProfile.name }}</span
                  >
                  <span
                    class="text-caption font-weight-medium"
                    style="color: #888; white-space: nowrap"
                    >{{ mockEvaluatorProfile.title }}</span
                  >
                </div>
                <v-icon class="ml-1" size="small">mdi-chevron-down</v-icon>
              </v-btn>
            </template>
            <v-card min-width="250" class="mt-1">
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
                <v-list-item to="/profile" link>
                  <template #prepend>
                    <v-icon>mdi-account-outline</v-icon>
                  </template>
                  <v-list-item-title>My Profile</v-list-item-title>
                </v-list-item>
                <v-list-item link @click="logout" class="text-red-darken-1">
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

      <div
        class="flex-grow-1 overflow-y-auto bg-grey-lighten-3 pa-6"
        style="min-height: 0"
      >
        <v-card
          class="mx-auto rounded-2xl elevation-6"
          max-width="1800"
          style="border: 2px solid #e3e6ea"
        >
          <v-card-title
            class="d-flex align-center justify-space-between py-6 px-8 bg-gradient"
            style="border-radius: 1rem 1rem 0 0"
          >
            <div class="d-flex align-center">
              <v-icon
                color="blue-darken-2"
                size="40"
                class="me-3 elevation-1"
                style="background: #e3f2fd; border-radius: 50%"
                >mdi-city-variant-outline</v-icon
              >
              <div class="text-h6 font-weight-bold text-blue-darken-2">
                {{ currentPageTitle }}
              </div>
              <v-chip
                size="small"
                class="ml-4 font-weight-bold px-4"
                color="blue"
                variant="elevated"
              >
                {{ evaluatorRole }}
              </v-chip>
            </div>
          </v-card-title>
          <v-divider></v-divider>

          <!-- Tabs Section -->
          <v-tabs
            v-model="activeMainTab"
            color="blue-darken-3"
            class="px-8 pt-4"
            slider-color="blue-darken-3"
          >
            <v-tab value="evaluation" class="text-none font-weight-bold">
              <v-icon start>mdi-file-check</v-icon>
              Plan Evaluation
            </v-tab>
            <v-tab value="assessment" class="text-none font-weight-bold">
              <v-icon start>mdi-calculator</v-icon>
              Assessment
            </v-tab>
          </v-tabs>

          <v-card-text class="pt-6 px-8">
            <v-window v-model="activeMainTab">
              <!-- TAB 1: PLAN EVALUATION -->
              <v-window-item value="evaluation">
                <v-row>
                  <v-col cols="12" md="8">
                    <div
                      class="pa-2 rounded-lg border"
                      style="background-color: #f5f5f5"
                    >
                      <div
                        class="d-flex align-center justify-center rounded-lg"
                        style="
                          height: 80vh;
                          min-height: 600px;
                          background: repeating-linear-gradient(
                            135deg,
                            #e0e0e0,
                            #e0e0e0 40px,
                            #f5f5f5 40px,
                            #f5f5f5 80px
                          );
                        "
                      >
                        <div
                          class="text-h5 font-weight-bold text-black opacity-70"
                        >
                          {{ evaluatorRole }} Plan Placeholder
                        </div>
                      </div>
                    </div>
                    <div
                      class="text-caption text-center pt-3 text-grey-darken-1"
                    >
                      Plan View – <span class="font-italic">Zoom</span> and
                      <span class="font-italic">annotation</span> tools would be
                      implemented here.
                    </div>
                  </v-col>

                  <v-col cols="12" md="4">
                    <v-form @submit.prevent="submitEvaluation">
                      <v-sheet
                        class="rounded-lg pa-5 bg-white elevation-2 mb-6"
                      >
                        <div class="mb-5">
                          <div
                            class="text-h6 font-weight-bold mb-3 text-blue-darken-2"
                          >
                            {{ currentChecklistTitle }}
                          </div>
                          <v-divider class="mb-4"></v-divider>
                          <div
                            v-for="(req, index) in currentChecklist"
                            :key="index"
                          >
                            <v-checkbox
                              v-model="evaluationData.requirements"
                              :label="req.label"
                              :value="req.value"
                              density="compact"
                              hide-details
                              class="flex-grow-1"
                              color="blue"
                            ></v-checkbox>

                            <v-textarea
                              v-if="
                                !evaluationData.requirements.includes(req.value)
                              "
                              v-model="
                                evaluationData.commentsByRequirement[req.value]
                              "
                              placeholder="Reason for non-compliance..."
                              variant="outlined"
                              rows="1"
                              auto-grow
                              class="mt-1 mb-3"
                              hide-details
                              density="compact"
                            ></v-textarea>
                          </div>
                        </div>

                        <div class="mb-5">
                          <div
                            class="text-h6 font-weight-bold mb-3 text-blue-darken-2"
                          >
                            General Comments/Feedback
                          </div>
                          <v-textarea
                            v-model="evaluationData.comments"
                            placeholder="General summary or additional feedback..."
                            variant="outlined"
                            rows="3"
                            hide-details
                            auto-grow
                          ></v-textarea>
                        </div>

                        <div class="mb-5">
                          <div
                            class="text-h6 font-weight-bold mb-3 text-blue-darken-2"
                          >
                            Assessment Status
                          </div>
                          <v-radio-group
                            v-model="computedStatus"
                            hide-details
                            color="blue"
                            class="mt-1"
                            readonly
                            inline
                          >
                            <v-radio
                              label="Approved"
                              value="Approved"
                              class="font-weight-bold"
                            ></v-radio>
                            <v-radio
                              label="For Revision"
                              value="For Revision"
                              class="font-weight-bold"
                            ></v-radio>
                          </v-radio-group>
                        </div>
                      </v-sheet>

                      <v-card
                        variant="flat"
                        color="white"
                        class="pa-4 mb-5 elevation-2 rounded-lg"
                      >
                        <div
                          class="text-h6 font-weight-bold mb-2 text-blue-darken-2"
                        >
                          Fee Summary
                        </div>
                        <div class="d-flex flex-column" style="gap: 8px">
                          <div class="d-flex justify-space-between">
                            <div class="text-caption text-grey-darken-2">
                              Plan Review Fee (per sqm)
                            </div>
                            <div class="text-caption font-weight-medium">
                              ₱500.00
                            </div>
                          </div>
                          <div class="d-flex justify-space-between">
                            <div class="text-caption text-grey-darken-2">
                              Processing Fee
                            </div>
                            <div class="text-caption font-weight-medium">
                              ₱500.00
                            </div>
                          </div>
                          <v-divider class="my-2"></v-divider>
                          <div
                            class="d-flex justify-space-between font-weight-bold text-blue-darken-2"
                          >
                            <div class="text-body-1">Total Amount Due</div>
                            <div class="text-body-1">₱1,000.00</div>
                          </div>
                        </div>
                      </v-card>

                      <v-btn
                        type="submit"
                        color="success"
                        class="w-100 font-weight-bold"
                        size="large"
                        variant="elevated"
                      >
                        <v-icon start>mdi-check-circle</v-icon>
                        Submit Evaluation
                      </v-btn>
                    </v-form>
                  </v-col>
                </v-row>
              </v-window-item>

              <!-- TAB 2: ASSESSMENT -->
              <v-window-item value="assessment">
                <v-row>
                  <v-col cols="12" md="8">
                    <v-card
                      class="mb-6"
                      elevation="0"
                      border
                      style="border-color: #e0e0e0"
                    >
                      <div class="pa-6">
                        <div
                          class="d-flex align-center gap-4 mb-6 pb-4 border-b"
                        >
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
                            <h3
                              class="text-h6 font-weight-bold text-blue-darken-4"
                            >
                              Assessment Inputs
                            </h3>
                            <p class="text-caption text-grey-darken-1">
                              Enter specifications. Fees compute automatically
                              based on NBCDO rates.
                            </p>
                          </div>
                        </div>

                        <v-sheet
                          class="bg-blue-lighten-5 rounded pa-4 mb-6 border"
                          style="border-color: #90caf9 !important"
                        >
                          <div class="d-flex align-center mb-3">
                            <v-icon
                              color="blue-darken-2"
                              size="small"
                              class="mr-2"
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
                          v-model="activeAssessmentTab"
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

                        <v-window v-model="activeAssessmentTab">
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
                                  type="number"
                                  variant="outlined"
                                  bg-color="grey-lighten-4"
                                  density="compact"
                                  hide-details
                                  readonly
                                  class="font-weight-bold"
                                ></v-text-field>
                              </v-col>
                            </v-row>

                            <div
                              class="text-caption text-grey-darken-1 mb-2 ml-1 font-weight-bold mt-4"
                            >
                              B. Architectural Fee
                            </div>

                            <v-row dense class="mb-2">
                              <v-col cols="12" md="8">
                                <v-text-field
                                  label="Arch. Fee"
                                  model-value="200"
                                  prefix="₱"
                                  type="number"
                                  variant="outlined"
                                  bg-color="green-lighten-5"
                                  base-color="green-darken-1"
                                  density="compact"
                                  hide-details
                                  readonly
                                  class="font-weight-bold"
                                >
                                  <template v-slot:append-inner>
                                    <v-chip
                                      size="x-small"
                                      color="green-darken-1"
                                      class="font-weight-bold px-2"
                                      label
                                      >Fix</v-chip
                                    >
                                  </template>
                                </v-text-field>
                              </v-col>
                              <v-col cols="12" md="4">
                                <v-text-field
                                  label="Processing (Arch)"
                                  model-value="100"
                                  prefix="₱"
                                  type="number"
                                  variant="outlined"
                                  bg-color="grey-lighten-4"
                                  density="compact"
                                  hide-details
                                  readonly
                                  class="font-weight-bold"
                                ></v-text-field>
                              </v-col>
                            </v-row>
                          </v-window-item>

                          <v-window-item value="technical">
                            <div
                              class="text-caption text-grey-darken-1 mb-2 ml-1 font-weight-bold"
                            >
                              C. Electrical Fee
                            </div>

                            <v-row dense class="mb-2">
                              <v-col cols="12" md="8">
                                <v-text-field
                                  label="Electrical Fee"
                                  :model-value="electricalFee"
                                  prefix="₱"
                                  type="number"
                                  variant="outlined"
                                  bg-color="green-lighten-5"
                                  base-color="green-darken-1"
                                  density="compact"
                                  hide-details
                                  readonly
                                  class="font-weight-bold"
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
                                  label="Elec. KVA"
                                  v-model.number="kva"
                                  type="number"
                                  variant="outlined"
                                  bg-color="white"
                                  density="compact"
                                  hide-details
                                  color="blue-darken-2"
                                  placeholder="0"
                                ></v-text-field>
                              </v-col>
                            </v-row>

                            <div
                              class="text-caption text-grey-darken-1 mb-2 ml-1 font-weight-bold mt-4"
                            >
                              D. Mechanical Fee
                            </div>

                            <v-row dense class="mb-2">
                              <v-col cols="12" md="8">
                                <v-text-field
                                  label="Mechanical Fee"
                                  :model-value="mechanicalFee"
                                  prefix="₱"
                                  type="number"
                                  variant="outlined"
                                  bg-color="green-lighten-5"
                                  base-color="green-darken-1"
                                  density="compact"
                                  hide-details
                                  readonly
                                  class="font-weight-bold"
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
                                  label="Units"
                                  v-model.number="mechUnits"
                                  type="number"
                                  variant="outlined"
                                  bg-color="white"
                                  density="compact"
                                  hide-details
                                  color="blue-darken-2"
                                  placeholder="0"
                                ></v-text-field>
                              </v-col>
                            </v-row>
                          </v-window-item>

                          <v-window-item value="sanitary">
                            <div
                              class="text-caption text-grey-darken-1 mb-2 ml-1 font-weight-bold"
                            >
                              E. Plumbing Fee
                            </div>

                            <v-row dense class="mb-2">
                              <v-col cols="12" md="8">
                                <v-text-field
                                  label="Plumbing Fee"
                                  :model-value="plumbingFee"
                                  prefix="₱"
                                  type="number"
                                  variant="outlined"
                                  bg-color="green-lighten-5"
                                  base-color="green-darken-1"
                                  density="compact"
                                  hide-details
                                  readonly
                                  class="font-weight-bold"
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
                                  label="Fixtures"
                                  v-model.number="fixtures"
                                  type="number"
                                  variant="outlined"
                                  bg-color="white"
                                  density="compact"
                                  hide-details
                                  color="blue-darken-2"
                                  placeholder="0"
                                ></v-text-field>
                              </v-col>
                            </v-row>

                            <div
                              class="text-caption text-grey-darken-1 mb-2 ml-1 font-weight-bold mt-4"
                            >
                              F. Sanitary Fee
                            </div>

                            <v-row dense class="mb-2">
                              <v-col cols="12" md="8">
                                <v-text-field
                                  label="Sanitary Fee"
                                  :model-value="sanitaryFee"
                                  prefix="₱"
                                  type="number"
                                  variant="outlined"
                                  bg-color="green-lighten-5"
                                  base-color="green-darken-1"
                                  density="compact"
                                  hide-details
                                  readonly
                                  class="font-weight-bold"
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
                                  label="Systems"
                                  v-model.number="sanitarySystems"
                                  type="number"
                                  variant="outlined"
                                  bg-color="white"
                                  density="compact"
                                  hide-details
                                  color="blue-darken-2"
                                  placeholder="0"
                                ></v-text-field>
                              </v-col>
                            </v-row>
                          </v-window-item>

                          <v-window-item value="penalties">
                            <v-row dense>
                              <v-col cols="12" md="8">
                                <v-text-field
                                  label="Penalties"
                                  v-model.number="penalties"
                                  prefix="₱"
                                  type="number"
                                  variant="outlined"
                                  bg-color="white"
                                  density="compact"
                                  hide-details
                                  color="blue-darken-2"
                                  placeholder="0"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" md="4">
                                <v-text-field
                                  label="Surcharges"
                                  v-model.number="surcharges"
                                  prefix="₱"
                                  type="number"
                                  variant="outlined"
                                  bg-color="white"
                                  density="compact"
                                  hide-details
                                  color="blue-darken-2"
                                  placeholder="0"
                                ></v-text-field>
                              </v-col>
                            </v-row>

                            <v-textarea
                              v-model="penaltyRemarks"
                              label="Penalty Remarks"
                              placeholder="Enter remarks for penalties..."
                              variant="outlined"
                              rows="3"
                              class="mt-4"
                              hide-details
                            ></v-textarea>
                          </v-window-item>
                        </v-window>
                      </div>
                    </v-card>
                  </v-col>

                  <v-col cols="12" md="4">
                    <v-card
                      elevation="0"
                      border
                      style="border-color: #e0e0e0; position: sticky; top: 0"
                    >
                      <div class="pa-6">
                        <div class="text-h6 font-weight-bold mb-4">
                          Fee Summary
                        </div>

                        <div
                          v-for="(item, index) in summaryItems"
                          :key="index"
                          class="d-flex justify-space-between text-body-2 mb-2"
                          :class="{
                            'font-weight-bold text-blue-darken-3':
                              !item.isIndent && item.label.includes('Total'),
                            'ml-4': item.isIndent,
                            'text-grey-darken-2': item.isIndent,
                          }"
                        >
                          <span>{{ item.label }}</span>
                          <span>₱ {{ formatCurrency(item.amount) }}</span>
                        </div>

                        <v-divider class="my-4"></v-divider>

                        <div
                          class="text-h6 font-weight-bold text-blue-darken-3 d-flex justify-space-between mb-6"
                        >
                          <span>Total Due</span>
                          <span>₱ {{ formatCurrency(totalAmount) }}</span>
                        </div>

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
                          <span class="text-black font-weight-medium"
                            >Engineer</span
                          >
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
                          class="pa-3 rounded text-caption text-blue-darken-3 mb-4"
                          style="border: 1px solid #bbdefb"
                        >
                          <strong>Note:</strong> All fees are computed based on
                          the NBCDO fee schedule and building specifications.
                          Please verify all inputs before finalizing.
                        </v-sheet>

                        <v-btn
                          color="success"
                          class="w-100 font-weight-bold"
                          size="large"
                          variant="elevated"
                          @click="handleGenerateOrder"
                        >
                          <v-icon start>mdi-file-document</v-icon>
                          Generate Order
                        </v-btn>
                      </div>
                    </v-card>
                  </v-col>
                </v-row>
              </v-window-item>
            </v-window>
          </v-card-text>
        </v-card>
      </div>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const activeMainTab = ref("evaluation");
const activeAssessmentTab = ref("building");

// --- Layout Styles ---
const s = {
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
};

// --- Profile Data ---
const mockEvaluatorProfile = ref({
  name: "Arch. Roberto Garcia",
  title: "Architectural Evaluator",
  specialty: "Architectural",
  avatar: "https://randomuser.me/api/portraits/men/32.jpg",
});

const logout = () => {
  console.log("Logout clicked");
};

// --- PLAN EVALUATION DATA ---
const evaluatorRole = ref("Architectural");

const applicantsData = [
  {
    id: "BP-2024-00101",
    applicationNumber: "BP-2024-00101",
    applicantName: "John D. Smith",
  },
  {
    id: "BP-2024-00102",
    applicationNumber: "BP-2024-00102",
    applicantName: "Jane Doe",
  },
];

const selectedApplicant = ref({
  id: "BP-2024-00101",
  applicantName: "John D. Smith",
  applicationNumber: "BP-2024-00101",
});

onMounted(() => {
  const applicationData = route.query.applicationData;
  const planType = route.query.planType;

  if (applicationData) {
    try {
      const dataStr = Array.isArray(applicationData)
        ? applicationData[0]
        : applicationData;
      selectedApplicant.value = JSON.parse(dataStr);
      console.log("Application data loaded:", selectedApplicant.value);

      // Pre-fill floor area from application data if available
      if (selectedApplicant.value.propertyDetails?.floorArea) {
        const areaStr = selectedApplicant.value.propertyDetails.floorArea;
        const area = parseInt(areaStr.replace(/\D/g, ""));
        if (!isNaN(area)) {
          floorArea.value = area;
        }
      }
    } catch (e) {
      console.error("Failed to parse application data:", e);
    }
  }

  if (planType) {
    const planTypeStr = Array.isArray(planType) ? planType[0] : planType;
    evaluatorRole.value = planTypeStr;
  }
});

const checklistData = {
  Architectural: [
    {
      label: "Standard Form (Type A0, A1, A2, A3) for Bldg Plans",
      value: "arch_std_form",
    },
    {
      label: "Lot Plan (Orientation, Bearing, Distance, Roads, Area)",
      value: "arch_lot_plan",
    },
    {
      label: "Site Development Plan (Scale, Tech Desc, Setbacks)",
      value: "arch_site_dev_plan",
    },
    {
      label: "Restrictions: Abutments and Firewalls",
      value: "arch_restrictions",
    },
    {
      label: "Vicinity Map/Location Plan (2km radius)",
      value: "arch_vicinity_map",
    },
    {
      label: "Perspective (Eye level or Bird's Eye View)",
      value: "arch_perspective",
    },
    {
      label: "Column Gridlines & Dimensions (All plans)",
      value: "arch_gridlines",
    },
    {
      label: "Floor Plans (min 1:100m, labels, dimensions)",
      value: "arch_floor_plans",
    },
    {
      label: "Min. 4 Elevations and 2 Sections (showing heights)",
      value: "arch_elevations_sections",
    },
    {
      label: "Stairs/Access Details (Comply with PD 1096, BP 344)",
      value: "arch_stairs",
    },
    {
      label: "Toilet and Bath Details (plans, sections, finishes)",
      value: "arch_toilet_details",
    },
    {
      label: "Kitchen Details (plans, sections, finishes)",
      value: "arch_kitchen_details",
    },
    {
      label: "Doors and Windows Schedule & Details",
      value: "arch_doors_windows",
    },
    {
      label: "Roof Plan / Roof Deck Plan (Passable/Non-passable)",
      value: "arch_roof_plan",
    },
    {
      label: "Other Architectural Details (as needed)",
      value: "arch_other_details",
    },
  ],
};

const planTitles = {
  Architectural: "Architectural Plan",
};

const checklistTitles = {
  Architectural: "Architectural Requirements Checklist",
};

const currentChecklist = computed(() => {
  return checklistData[evaluatorRole.value] || [];
});

const currentPageTitle = computed(() => {
  const applicantName = selectedApplicant.value?.applicantName || "Applicant";
  const appNumber = selectedApplicant.value?.applicationNumber || "";
  return `${applicantName} - ${appNumber}`;
});

const currentChecklistTitle = computed(() => {
  return checklistTitles[evaluatorRole.value] || "Requirements Checklist";
});

const evaluationData = ref({
  requirements: [],
  comments: "",
  commentsByRequirement: {},
  status: "",
});

const resetEvaluationForm = () => {
  evaluationData.value = {
    requirements: [],
    comments: "",
    commentsByRequirement: {},
    status: "",
  };
};

watch(
  () => evaluationData.value.commentsByRequirement,
  (newComments) => {
    for (const itemValue in newComments) {
      const comment = newComments[itemValue];
      if (comment && comment.trim() !== "") {
        const index = evaluationData.value.requirements.indexOf(itemValue);
        if (index > -1) {
          evaluationData.value.requirements.splice(index, 1);
        }
      }
    }
  },
  { deep: true }
);

watch(
  () => [...evaluationData.value.requirements],
  (newCheckedItems, oldCheckedItems) => {
    const justChecked = newCheckedItems.filter(
      (item) => !oldCheckedItems.includes(item)
    );

    for (const itemValue of justChecked) {
      if (evaluationData.value.commentsByRequirement[itemValue] !== undefined) {
        delete evaluationData.value.commentsByRequirement[itemValue];
      }
    }
  }
);

const computedStatus = computed(() => {
  if (currentChecklist.value.length === 0) {
    return "";
  }

  const allItemsChecked = currentChecklist.value.every((req) =>
    evaluationData.value.requirements.includes(req.value)
  );

  if (allItemsChecked) {
    return "Approved";
  } else {
    return "For Revision";
  }
});

const submitEvaluation = () => {
  evaluationData.value.status = computedStatus.value;

  if (!evaluationData.value.status) {
    alert("Cannot submit, status is not determined.");
    return;
  }

  console.log(
    `Evaluation Submitted for ${evaluatorRole.value} plan (App ID: ${selectedApplicant.value.id}):`,
    evaluationData.value
  );
  alert(
    `Evaluation for ${evaluatorRole.value} plan submitted as: ${evaluationData.value.status}`
  );

  resetEvaluationForm();
};

// --- ASSESSMENT DATA ---
const FIXED_FILING = 200;
const FIXED_PROC = 100;
const STAKING_RATE = 50;
const FENCE_RATE = 5;
const MECH_RATE = 100;
const PLUMB_RATE = 7;
const ELEX_RATE = 2.4;
const SAN_RATE = 50;

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

const currentRate = computed(() => {
  const grp = occupancyOptions.find((o) => o.value === occupancyGroup.value);
  return grp ? grp.rate : 0;
});

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

const summaryItems = computed(() => [
  { label: "Filing Fee", amount: FIXED_FILING, isIndent: false },
  { label: "Building Fee", amount: buildingFee.value, isIndent: false },
  { label: "Civil Processing", amount: FIXED_PROC, isIndent: true },
  { label: "Arch. Processing", amount: FIXED_PROC, isIndent: false },
  { label: "Interior Processing", amount: FIXED_PROC, isIndent: false },
  {
    label: "Line & Grade Staking",
    amount: cornerStakingFee.value,
    isIndent: false,
  },
  { label: "L&G Processing", amount: FIXED_PROC, isIndent: true },
  { label: "Fencing Fee", amount: fencingFee.value, isIndent: false },
  { label: "Electrical Fee", amount: electricalFee.value, isIndent: false },
  { label: "Elec. Processing", amount: FIXED_PROC, isIndent: true },
  { label: "Mechanical Fee", amount: mechanicalFee.value, isIndent: false },
  { label: "Mech. Processing", amount: FIXED_PROC, isIndent: true },
  { label: "Plumbing Fee", amount: plumbingFee.value, isIndent: false },
  { label: "Plumb. Processing", amount: FIXED_PROC, isIndent: true },
  { label: "Sanitary Fee", amount: sanitaryFee.value, isIndent: false },
  { label: "San. Processing", amount: FIXED_PROC, isIndent: true },
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
  alert(`Assessment Generated! Total: ₱ ${formatCurrency(totalAmount.value)}`);
};
</script>

<style scoped>
.bg-gradient {
  background: linear-gradient(90deg, #e3f2fd 0%, #f5faff 100%);
}

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
