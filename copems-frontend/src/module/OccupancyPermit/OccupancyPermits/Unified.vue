<template>
  <v-app>
    <v-main class="bg-grey-lighten-4">
      <div class="stepper-wrapper">
        <v-stepper
          v-model="currentStep"
          alt-labels
          flat
          class="mb-4 mt-2 stepper-elevated"
        >
        </v-stepper>
      </div>
      <v-container fluid>
        <div class="ui-preview-container">
          <div class="printable-form unified-form">
            <div class="header-section">
              <div class="gov-title">Republic of the Philippines</div>
              <div class="gov-title">City/Municipality of Naga</div>
              <div class="gov-title mb-2">Province of Camarines Sur</div>
              <div class="form-title">
                UNIFIED APPLICATION FORM FOR CERTIFICATE OF OCCUPANCY
              </div>
            </div>
            <div class="row check-row">
              <div class="check-options">
                <span class="checkbox">&#9633;</span> FULL
                <span class="checkbox">&#9633;</span> PARTIAL
              </div>
            </div>
            <div class="row check-row">
              <div
                class="check-options"
                style="justify-content: center; width: 100%"
              >
                <span
                  class="check-label"
                  style="font-weight: bold; font-size: 14px"
                  >This also applies for:</span
                >
                <span class="checkbox">&#9633;</span>
                <span style="font-weight: bold"
                  >FIRE SAFETY INSPECTION CERTIFICATE</span
                >
              </div>
            </div>
            <div class="row info-row">
              <div class="info-label" style="flex: 1; text-align: left">
                Building Permit No.:
              </div>
              <div class="info-line" style="flex: 1; width: 120px"></div>
            </div>
            <div class="row info-row">
              <div class="info-label" style="flex: 1; text-align: left">
                Date Issued:
              </div>
              <div class="info-line" style="flex: 1; width: 100px"></div>
            </div>
            <div class="row info-row">
              <div class="info-label" style="flex: 1; text-align: left">
                FSEC No.:
              </div>
              <div class="info-line" style="flex: 1; width: 110px"></div>
            </div>
            <div class="row info-row">
              <div class="info-label" style="flex: 1; text-align: left">
                Date Issued:
              </div>
              <div class="info-line" style="flex: 1; width: 100px"></div>
            </div>
            <div
              class="row info-row"
              style="justify-content: flex-end; width: 100%"
            >
              <div
                style="
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                "
              >
                <div
                  class="info-line"
                  style="width: 250px; margin-bottom: 2px"
                ></div>
                <div
                  class="info-label"
                  style="
                    text-align: center;
                    font-size: 14px;
                    color: #222;
                    width: 100px;
                  "
                >
                  (Date)
                </div>
              </div>
            </div>
            <div
              class="row name-row"
              style="
                flex-direction: column;
                align-items: flex-start;
                width: 100%;
                margin-bottom: 24px;
              "
            >
              <div
                style="
                  display: flex;
                  align-items: flex-start;
                  width: 100%;
                  position: relative;
                "
              >
                <div class="info-label" style="min-width: 220px">
                  Name of Applicant/Owner:
                </div>
                <div style="flex: 1; position: relative">
                  <div class="info-line" style="width: 100%"></div>
                  <div
                    style="
                      display: flex;
                      position: absolute;
                      left: 0;
                      top: 24px;
                      width: 100%;
                      margin-top: 8px;
                    "
                  >
                    <div
                      class="sub-label"
                      style="width: 33%; text-align: center"
                    >
                      (Last Name)
                    </div>
                    <div
                      class="sub-label"
                      style="width: 33%; text-align: center"
                    >
                      (Given Name)
                    </div>
                    <div
                      class="sub-label"
                      style="width: 33%; text-align: center"
                    >
                      (Middle Initial)
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="row name-row"
              style="
                flex-direction: column;
                align-items: flex-start;
                width: 100%;
                margin-bottom: 0;
              "
            >
              <div style="display: flex; align-items: center; width: 100%">
                <div class="info-label" style="min-width: 220px">
                  Address of Applicant/Owner:
                </div>
                <div class="info-line" style="flex: 1; width: auto"></div>
              </div>
              <div
                style="
                  display: flex;
                  align-items: center;
                  width: 100%;
                  margin-top: 2px;
                "
              >
                <div
                  class="info-line"
                  style="width: 40%; margin-right: 8px"
                ></div>
                <div class="sub-label" style="width: 15%; text-align: center">
                  ZIP Code:
                </div>
                <div
                  class="info-line"
                  style="width: 20%; margin-right: 8px"
                ></div>
                <div class="sub-label" style="width: 15%; text-align: center">
                  Contact No.:
                </div>
                <div class="info-line" style="width: 20%"></div>
              </div>
            </div>
            <div
              class="section-title"
              style="font-weight: bold; font-size: 20px; margin-bottom: 16px"
            >
              Requirements submitted:
            </div>
            <ul class="requirements-list">
              <li>
                <span class="checkbox">&#9633;</span> Two (2) copies of
                accomplished Unified Application form for Certificate of
                Occupancy, duly notarized;
              </li>
              <li>
                <span class="checkbox">&#9633;</span> Two (2) copies of
                Certificate of Completion, duly notarized;
              </li>
              <li>
                <span class="checkbox">&#9633;</span> Construction Logbook,
                signed and sealed by the Owner's Architect or Civil Engineer who
                undertook full-time inspection and supervision;
              </li>
              <li>
                <span class="checkbox">&#9633;</span> Two (2) photocopies of the
                valid licenses of all involved professionals;
              </li>
              <li>
                <span class="checkbox">&#9633;</span> Photograph of the
                structure with substantial completion showing front, sides, and
                rear areas;
              </li>
              <li>
                <span class="checkbox">&#9633;</span> Two (2) sets of As-Built
                Plans, if there are changes in the building plans covered by the
                issued Building Permit;
              </li>
              <li>
                <span class="checkbox">&#9633;</span> Two (2) copies of
                Certificate of Final Electrical Inspection;
              </li>
              <li>
                <span class="checkbox">&#9633;</span> Two (2) copies of Fire
                Safety Inspection Certificate from the Bureau of Fire and
                Protection;
              </li>
              <li>
                <span class="checkbox">&#9633;</span> Sketch map indicating the
                location of the project;
              </li>
              <li style="display: flex; align-items: center">
                <span class="checkbox">&#9633;</span> Others:
                <span
                  style="flex: 1; border-bottom: 1px solid #222; margin: 0 8px"
                ></span
                >.
              </li>
            </ul>
            <div class="row project-row">
              <div class="info-label" style="min-width: 160px">
                Name of Project:
              </div>
              <div class="info-line" style="flex: 1"></div>
            </div>
            <div class="row project-row">
              <div class="info-label" style="min-width: 160px">
                Location of Project:
              </div>
              <div class="info-line" style="flex: 1"></div>
            </div>
            <div class="project-details-grid">
              <div class="project-details-row">
                <div class="info-label" style="min-width: 220px">
                  Use/Character of Occupancy:
                </div>
                <div class="info-line project-unified-line"></div>
              </div>
              <div class="project-details-row">
                <div class="info-label" style="min-width: 220px">
                  No. of Storey/s:
                </div>
                <div class="info-line project-unified-line"></div>
              </div>
              <div class="project-details-row">
                <div class="info-label" style="min-width: 220px">
                  No. of Units:
                </div>
                <div class="info-line project-unified-line"></div>
              </div>
              <div class="project-details-row">
                <div class="info-label" style="min-width: 220px">
                  Total Gross Floor Area
                  <span style="font-size: 12px; color: #555"
                    >(Square Meters)</span
                  >:
                </div>
                <div class="info-line project-unified-line"></div>
              </div>
              <div class="project-details-row">
                <div class="info-label" style="min-width: 220px">
                  Date of Completion:
                </div>
                <div class="info-line project-unified-line"></div>
              </div>
            </div>
            <br />
            <div
              style="
                display: flex;
                flex-direction: column;
                align-items: flex-end;
                margin-top: 32px;
                width: 100%;
              "
            >
              <div style="width: 379px">
                <div
                  style="font-size: 13px; margin-bottom: 19px; text-align: left"
                >
                  Submitted by:
                </div>
                <div
                  style="border-bottom: 1px solid #222; margin-bottom: 6px"
                ></div>
                <div
                  style="
                    text-align: center;
                    font-weight: bold;
                    font-size: 12px;
                    margin-top: 2px;
                  "
                >
                  APPLICANT/OWNER
                </div>
                <div
                  style="
                    text-align: center;
                    font-size: 10px;
                    margin-bottom: 5px;
                  "
                >
                  (Signature Over Printed Name)
                </div>
                <div
                  style="
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                    margin-bottom: 12px;
                  "
                >
                  <div style="display: flex; align-items: center">
                    <div style="min-width: 140px; font-size: 12px">
                      Community Tax Certificate No.
                    </div>
                    <div
                      style="
                        flex: 1;
                        border-bottom: 1px solid #888;
                        height: 14px;
                      "
                    ></div>
                  </div>
                  <div style="display: flex; align-items: center">
                    <div style="min-width: 80px; font-size: 12px">
                      Date Issued:
                    </div>
                    <div
                      style="
                        flex: 1;
                        border-bottom: 1px solid #888;
                        height: 14px;
                      "
                    ></div>
                  </div>
                  <div style="display: flex; align-items: center">
                    <div style="min-width: 80px; font-size: 12px">
                      Place Issued:
                    </div>
                    <div
                      style="
                        flex: 1;
                        border-bottom: 1px solid #888;
                        height: 14px;
                      "
                    ></div>
                  </div>
                </div>
                <div
                  style="font-size: 14px; margin-bottom: 2px; text-align: left"
                >
                  Attested by:
                </div>
                <br />
                <div
                  style="
                    border-bottom: 2px solid #888;
                    margin-bottom: 2px;
                    font-weight: bold;
                    font-size: 10px;
                    text-align: center;
                  "
                >
                  FULL-TIME INSPECTOR OR SUPERVISOR OF CONSTRUCTION
                </div>
                <br />
                <div style="height: 30px"></div>
                <div
                  style="border-bottom: 1px solid #222; margin-bottom: 6px"
                ></div>
                <div
                  style="
                    text-align: center;
                    font-weight: bold;
                    font-size: 13px;
                    margin-top: 2px;
                  "
                >
                  ARCHITECT OR CIVIL ENGINEER
                </div>
                <div
                  style="
                    text-align: center;
                    font-size: 10px;
                    margin-bottom: 2px;
                  "
                >
                  (Signed and Sealed Over Printed Name)
                </div>
                <div
                  style="
                    text-align: center;
                    font-size: 12px;
                    margin-bottom: 8px;
                  "
                >
                  Date
                  <span
                    style="
                      border-bottom: 1px solid #888;
                      display: inline-block;
                      width: 130px;
                      height: 14px;
                    "
                  ></span>
                </div>
                <table class="credentials-table">
                  <colgroup>
                    <col style="width: 50%" />
                    <col style="width: 50%" />
                  </colgroup>
                  <colgroup>
                    <col style="width: 50%" />
                    <col style="width: 25%" />
                    <col style="width: 25%" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <td colspan="2">PRC No.</td>
                      <td>Validity</td>
                    </tr>
                    <tr>
                      <td colspan="2">PTR No.</td>
                      <td>Date Issued</td>
                    </tr>
                    <tr>
                      <td colspan="2">Issued at</td>
                      <td>TIN</td>
                    </tr>
                    <tr>
                      <td>CTC No.</td>
                      <td>Date Issued</td>
                      <td>Issued at</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <br />
          </div>
        </div>
        <div class="d-flex justify-space-between align-center no-print">
          <v-btn color="green" dark class="mt-4" @click="downloadPDF">
            Download PDF
          </v-btn>
          <div class="d-flex">
            <div>
              <v-btn color="primary" to="/applicant/FormsSection">Save</v-btn>
            </div>
            <v-dialog v-model="showSuccessDialog" persistent width="auto">
              <v-card
                class="d-flex flex-column align-center text-center pa-6"
                rounded="xl"
              >
                <v-icon color="green" size="64" class="mb-4"
                  >mdi-check-circle</v-icon
                >
                <v-card-title class="text-h5 font-weight-bold"
                  >Application Completed</v-card-title
                >
                <v-card-text class="pb-2"
                  >Your Application Number is</v-card-text
                >
                <div class="application-number-box my-4 px-6 py-3">
                  <span class="font-weight-bold">{{ applicationNumber }}</span>
                </div>
                <v-card-actions class="w-100">
                  <v-btn
                    color="primary"
                    variant="flat"
                    block
                    @click="handleContinue"
                    class="text-capitalize"
                    size="large"
                    to="/applicant/SelectCompletionForms"
                    >Continue</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import html2pdf from "html2pdf.js";
export default {
  name: "OccupancyPermitPDF",
  data() {
    return {
      currentStep: "5",

      showSuccessDialog: false,
      applicationNumber: "",
    };
  },
  methods: {
    back() {
      console.log("Navigating back...");
    },
    submit() {
      console.log("Submitting application...");

      this.applicationNumber = "OP-2025-000-001";
      this.showSuccessDialog = true;
    },
    handleContinue() {
      this.showSuccessDialog = false;

      console.log("Continuing from success dialog...");
    },
    async downloadPDF() {
      await this.$nextTick();
      const element = this.$el.querySelector(".printable-form");

      const marginMm = 10;
      const pageMm = { w: 210, h: 297 };
      const contentMm = {
        w: pageMm.w - marginMm * 2,
        h: pageMm.h - marginMm * 2,
      };
      const mmToPx = (mm) => (mm * 96) / 25.4;

      const availPx = { w: mmToPx(contentMm.w), h: mmToPx(contentMm.h) };
      const rect = element.getBoundingClientRect();
      const elPx = {
        w: rect.width || element.offsetWidth,
        h: rect.height || element.offsetHeight,
      };

      const baseScale = Math.min(availPx.w / elPx.w, availPx.h / elPx.h, 1);
      const scale = Math.max(0.1, baseScale * 0.97);

      const prev = {
        transform: element.style.transform,
        transformOrigin: element.style.transformOrigin,
      };
      element.style.transform = `scale(${scale})`;
      element.style.transformOrigin = "top left";

      await new Promise((r) => setTimeout(r, 30));

      const opt = {
        margin: marginMm,
        filename: "Unified_Application_Form.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          backgroundColor: "#ffffff",
          scrollX: -window.scrollX,
          scrollY: -window.scrollY,
        },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        pagebreak: {
          mode: ["avoid-all"],
          after: "#never-match-this-selector",
        },
      };

      try {
        await html2pdf().from(element).set(opt).save();
      } finally {
        element.style.transform = prev.transform || "";
        element.style.transformOrigin = prev.transformOrigin || "";
      }
    },
  },
};
</script>

<style scoped>
.application-number-box {
  background-color: #e3f2fd;
  border: 1px solid #90caf9;
  border-radius: 8px;
  font-size: 1.25rem;
  color: #1565c0;
}

.unified-form {
  max-width: 1000px;
  margin: 4px auto 0 auto;
  padding: 8px 18px 0 18px;
  font-family: "Arial", sans-serif;
  font-size: 14px;
  background: #fff;
  color: #222;
  box-shadow: none;
  box-sizing: border-box;
}
.stepper-wrapper {
  max-width: 980px;
  margin: 0 auto;
  padding: 0 10px;
}

.stepper-item-custom .v-stepper-item__step {
  box-shadow: 0 1px 4px 0 rgba(25, 118, 210, 0.13);
  transition: background 0.2s;
}
.page-title-responsive {
  font-size: 1rem !important;
}
.header-section {
  text-align: center;
  margin-bottom: 2px;
}
.form-title {
  font-size: 17px;
  font-weight: bold;
  margin-top: 4px;
  margin-bottom: 3px;
  letter-spacing: 0.5px;
}
.row {
  display: flex;
  align-items: center;
  margin-bottom: 6px;
}
.check-row {
  justify-content: center;
  margin-bottom: 3px;
}
.check-label {
  min-width: 160px;
  font-weight: 500;
  font-size: 12px;
}
.check-options {
  display: flex;
  gap: 16px;
  font-size: 12px;
  font-weight: 400;
  justify-content: center;
  width: 100%;
}
.checkbox {
  font-size: 13px;
  margin-right: 3px;
}
.info-row {
  width: 320px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 2px;
}
.info-line {
  flex: none;
  border-bottom: 1px solid #222;
  height: 16px;
  margin-right: 3px;
}
.permit-line {
  width: 100px;
}
.date-line {
  width: 80px;
}
.fsec-line {
  width: 90px;
}
.date2-line {
  width: 80px;
}
.sub-label {
  min-width: 70px;
  font-size: 11px;
  color: #555;
  text-align: center;
}
.section-title {
  font-size: 13px;
  font-weight: bold;
  text-align: center;
  margin: 10px 0 4px 0;
}
.requirements-list {
  list-style: none;
  padding-left: 0;
  margin-bottom: 10px;
}
.requirements-list li {
  font-size: 12px;
  margin-bottom: 2px;
  display: flex;
  align-items: center;
  gap: 4px;
}
.project-row {
  gap: 6px;
}
.project-details-grid {
  display: flex;
  flex-direction: column;
  margin-left: 18px;
  margin-top: 1px;
  gap: 4px;
}
.project-details-row {
  display: flex;
  align-items: center;
  margin-bottom: 0;
}
.project-unified-line {
  width: 320px;
  margin-right: 0;
}
.action-bar-row {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 32px;
  margin-bottom: 32px;
  padding: 0 8px 0 8px;
}
.action-bar-left {
  flex: 1;
  display: flex;
  justify-content: flex-start;
}
.action-bar-right {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}
.action-btn {
  font-weight: bold;
  text-transform: uppercase;
  border-radius: 7px;
  font-size: 1.08rem;
  letter-spacing: 0.03em;
  min-width: 170px;
  min-height: 44px;
  box-shadow: 0 2px 6px 0 rgba(25, 118, 210, 0.07);
  transition: background 0.18s, color 0.18s;
}
.download-btn {
  background: #43b04a !important;
  color: #fff !important;
  box-shadow: 0 2px 6px 0 rgba(67, 176, 74, 0.13);
}
.download-btn:hover {
  background: #388e3c !important;
}
.back-btn {
  background: #e0e3e6 !important;
  color: #222 !important;
}
.back-btn:hover {
  background: #bdbdbd !important;
}
.submit-btn {
  background: #2196f3 !important;
  color: #fff !important;
}
.submit-btn:hover {
  background: #1565c0 !important;
}
.footer-download {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  padding: 0 0 32px 40px;
  background: transparent;
}
@media (max-width: 900px) {
  .action-bar-row {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
    padding: 0 2px 18px 2px;
  }
  .action-bar-left {
    justify-content: flex-start;
    margin-bottom: 8px;
  }
  .action-bar-right {
    justify-content: center;
    gap: 8px;
  }
}
@media (max-width: 600px) {
  .action-bar-row {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
    padding: 0 2px 18px 2px;
  }
  .action-bar-left {
    justify-content: flex-start;
    margin-bottom: 8px;
  }
  .action-bar-right {
    justify-content: center;
    gap: 8px;
  }
  .action-btn {
    min-width: 120px;
    font-size: 0.98rem;
    min-height: 38px;
  }
}
.ui-preview-container {
  background: #fff;
  border: 1px solid #dcdcdc;
  border-radius: 8px;
  padding: 12px 10px 0 10px;
  overflow: visible;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  max-width: 960px;
  margin: 0 auto 0 auto;
}
.credentials-table {
  width: 137%;
  margin-right: auto;
  border-collapse: collapse;
  font-size: 12px;
  margin-bottom: 8px;
  table-layout: fixed;
}
.credentials-table td {
  padding: 2px 4px;
  border-bottom: 1px solid #222;
}
.credentials-table td + td {
  border-left: 1px solid #222;
}
.credentials-table tr:first-child td {
  border-top: 1px solid #222;
}
@media (max-width: 600px) {
  .v-stepper-item .v-stepper-item__title {
    display: none;
  }
  .unified-form {
    padding: 8px 4px 8px 4px;
    margin-top: 12px;
  }
}

@media print {
  .no-print {
    display: none !important;
  }
  .ui-preview-container {
    border: none !important;
    padding: 0 !important;
    box-shadow: none !important;
    margin: 0 !important;
    border-radius: 0 !important;
    background: transparent !important;
  }
  .unified-form {
    margin: 0;
    padding: 0;
    box-shadow: none;
    max-width: none;
    background: #fff;
    border: none !important;
  }
}
</style>
