
<template>
  <v-container fluid class="bg-grey-lighten-4 py-8">
    <v-row justify="center">
      <v-col cols="12" md="10" lg="9">
        <v-row>
          <v-col cols="12" lg="7">
            <v-card class="mb-5 elevation-2 rounded-lg">
              <v-card-title class="bg-blue-grey-lighten-5 py-3">
                <v-icon class="me-2" color="blue-grey-darken-2"
                  >mdi-account-details</v-icon
                >
                <span class="text-subtitle-1 font-weight-bold"
                  >Applicant Information</span
                >
              </v-card-title>
              <v-card-text class="pt-4 pb-2">
                <v-row>
                  <v-col cols="6">
                    <div
                      class="text-caption text-uppercase text-medium-emphasis"
                    >
                      Application Number
                    </div>
                    <div class="text-subtitle-1 font-weight-bold">
                      OP-2025-09-015
                    </div>
                  </v-col>
                  <v-col cols="6">
                    <div
                      class="text-caption text-uppercase text-medium-emphasis"
                    >
                      Type of Application
                    </div>
                    <div class="text-subtitle-1 font-weight-bold">Full</div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6">
                    <div
                      class="text-caption text-uppercase text-medium-emphasis"
                    >
                      Applicant Name
                    </div>
                    <div class="text-subtitle-1 font-weight-bold">
                      Maria C. Dela Cruz
                    </div>
                  </v-col>
                  <v-col cols="6">
                    <div
                      class="text-caption text-uppercase text-medium-emphasis"
                    >
                      Contact No.
                    </div>
                    <div class="text-subtitle-1 font-weight-bold">
                      0917 555 1234
                    </div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <div
                      class="text-caption text-uppercase text-medium-emphasis"
                    >
                      Address
                    </div>
                    <div class="text-subtitle-1 font-weight-bold">
                      Zone 1, Brgy. Concepcion Grande, Naga City
                    </div>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>

            <v-card class="elevation-2 rounded-lg">
              <v-card-title class="bg-blue-grey-lighten-5 py-3">
                <v-icon class="me-2" color="blue-grey-darken-2"
                  >mdi-home-city-outline</v-icon
                >
                <span class="text-subtitle-1 font-weight-bold"
                  >Property Details</span
                >
              </v-card-title>
              <v-card-text class="pt-4 pb-2">
                <v-row>
                  <v-col cols="6">
                    <div
                      class="text-caption text-uppercase text-medium-emphasis"
                    >
                      Name of Project
                    </div>
                    <div class="text-subtitle-1 font-weight-bold">
                      Dela Cruz Commercial-Residential Bldg.
                    </div>
                  </v-col>
                  <v-col cols="6">
                    <div
                      class="text-caption text-uppercase text-medium-emphasis"
                    >
                      No. of Storey/s
                    </div>
                    <div class="text-subtitle-1 font-weight-bold">3</div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6">
                    <div
                      class="text-caption text-uppercase text-medium-emphasis"
                    >
                      Project Location
                    </div>
                    <div class="text-subtitle-1 font-weight-bold">
                      Purok 4, J. Miranda Ave., Brgy. Triangulo, Naga City
                    </div>
                  </v-col>
                  <v-col cols="6">
                    <div
                      class="text-caption text-uppercase text-medium-emphasis"
                    >
                      No. of Units
                    </div>
                    <div class="text-subtitle-1 font-weight-bold">
                      8 (Apartment)
                    </div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <div
                      class="text-caption text-uppercase text-medium-emphasis"
                    >
                      Use/Character of Occupancy
                    </div>
                    <div class="text-subtitle-1 font-weight-bold">
                      Mixed-Use (Commercial/Residential)
                    </div>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" lg="5">
            <v-card class="elevation-2 rounded-lg">
              <v-card-title class="bg-light-blue-lighten-5 py-3">
                <v-icon class="me-2" color="light-blue-darken-2"
                  >mdi-list-status</v-icon
                >
                <span class="text-subtitle-1 font-weight-bold"
                  >Requirement Status</span
                >
              </v-card-title>

              <v-card-text
                class="pa-6 d-flex flex-column align-center justify-center text-center"
                style="min-height: 400px"
              >
                <v-icon size="64" color="light-blue-darken-1" class="mb-4">
                  mdi-chart-line-variant
                </v-icon>
                <p class="text-h6 text-medium-emphasis mb-6">
                  View the detailed monitoring and evaluation log for all
                  submitted documents and clearances.
                </p>
                <v-btn
                  color="primary"
                  size="large"
                  prepend-icon="mdi-monitor"
                  to="/admin/rqmonitoring"
                  class="text-uppercase font-weight-bold"
                  elevation="4"
                >
                  Go to Monitoring
                </v-btn>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "OccupancyApplicationDetail",
  // No complex data, computed properties, or methods are required for this static layout.
};
</script>

<style scoped>
/* Scoped styles can be minimal since Vuetify handles most layout and styling */
.text-medium-emphasis {
  color: #6c757d; /* A subtle gray for labels */
}
/* Ensure the container takes up space */
.v-container.fluid {
  height: 100%;
}
</style>
```