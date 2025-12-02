<template>
  <v-app>
    <v-main class="grey-background">
      <v-container
        fluid
        class="pa-4"
        style="max-width: 1000px; margin-top: 80px"
      >
        <v-card class="pa-6 printable-form">
          <div class="text-right mb-2">
            <small>NBC FORM NO. B - 10</small>
          </div>

          <div class="text-center mb-4">
            <div class="text-subtitle-2">Republic of the Philippines</div>
            <div class="text-subtitle-2">City of Naga</div>
            <div class="text-subtitle-2">Province of Camarines Sur</div>
            <div class="text-h6 font-weight-bold mt-2">
              OFFICE OF THE BUILDING OFFICIAL
            </div>
            <div class="text-h5 font-weight-bold mt-2 underlined">
              CERTIFICATE OF COMPLETION
            </div>
          </div>

          <div class="box">
            <div class="d-flex justify-end mb-10">
              <div class="date-field">
                <div style="width: 150px; text-align: center">
                  <span>&nbsp;</span>
                </div>
                <div class="text-center mt-0"><small>DATE</small></div>
              </div>
            </div>

            <div class="form-content">
              <p class="certification-text mb-3">
                This is to certify that the building/structure covered by
                Building Permit No.
                <span class="permit-field">&nbsp;</span> issued on
                <span class="date-field">&nbsp;</span>
                has been constructed and completed under our supervision,
                conforms with the plans and specifications submitted and on file
                with the Office of the Building Official, and complies with the
                provisions of the National Building Code and Accessibility Law
                (BP Blg. 344).
              </p>

              <div class="form-row mb-0">
                <span class="row-label">NAME OF OWNER</span>
                <div class="field-group">
                  <span class="name-field last-name">&nbsp;</span>
                  <div class="field-label">(Last Name)</div>
                </div>
                <div class="field-group">
                  <span class="name-field given-name">&nbsp;</span>
                  <div class="field-label">(Given)</div>
                </div>
                <div class="field-group">
                  <span class="name-field mi">&nbsp;</span>
                  <div class="field-label">(M.I.)</div>
                </div>
              </div>

              <div class="form-row mb-2">
                <span class="row-label">ADDRESS OF OWNER</span>
                <span class="address-field number">&nbsp;</span>
                <span class="field-label">ZIP CODE</span>
                <span class="address-field zip">&nbsp;</span>
                <span class="field-label">TEL. NO.</span>
                <span class="address-field tel">&nbsp;</span>
              </div>

              <div class="form-row mb-2">
                <span class="row-label">LOCATION OF CONSTRUCTION: LOT NO.</span>
                <span class="location-field lot">&nbsp;</span>
                <span class="row-label-inline">BLK NO.</span>
                <span class="location-field blk">&nbsp;</span>
                <span class="row-label-inline">STREET</span>
                <span class="location-field street">&nbsp;</span>
                <span class="row-label-inline">BARANGAY</span>
                <span class="location-field barangay">&nbsp;</span>
                <span class="row-label-inline">CITY/MUNICIPALITY OF</span>
                <span class="location-field city">&nbsp;</span>
              </div>

              <div class="form-row mb-2">
                <span class="row-label">USE OR CHARACTER OF OCCUPANCY</span>
                <span class="occupancy-field main">&nbsp;</span>
                <span class="row-label-inline">GROUP</span>
                <span class="occupancy-field group">&nbsp;</span>
              </div>

              <table class="main-form-table mt-0">
                <tbody>
                  <tr>
                    <td class="label-cell" style="width: 30%"></td>
                    <td class="header-cell text-center" style="width: 35%">
                      PLANNED
                    </td>
                    <td class="header-cell text-center" style="width: 35%">
                      ACTUAL
                    </td>
                  </tr>
                  <tr>
                    <td class="label-cell">DATE OF START OF CONSTRUCTION</td>
                    <td class="field-cell"></td>
                    <td class="field-cell"></td>
                  </tr>
                  <tr>
                    <td class="label-cell">DATE OF COMPLETION</td>
                    <td class="field-cell"></td>
                    <td class="field-cell"></td>
                  </tr>
                  <tr>
                    <td class="label-cell">TOTAL FLOOR AREA (Square Meters)</td>
                    <td class="field-cell"></td>
                    <td class="field-cell"></td>
                  </tr>
                  <tr>
                    <td class="label-cell">NO. OF STOREY(S)</td>
                    <td class="field-cell"></td>
                    <td class="field-cell"></td>
                  </tr>
                  <tr>
                    <td class="label-cell">NO. OF UNITS</td>
                    <td class="field-cell"></td>
                    <td class="field-cell"></td>
                  </tr>
                </tbody>
              </table>

              <div class="cost-summary-wrapper mt-4">
                <div class="cost-summary-title">SUMMARY OF ACTUAL COSTS</div>
                <table class="cost-summary-table">
                  <tbody>
                    <tr>
                      <td class="cost-left number-col">1.</td>
                      <td class="cost-left main-col">
                        TOTAL COST OF MATERIALS:
                      </td>
                      <td class="cost-right currency-col">P</td>
                      <td class="cost-line"><span></span></td>
                    </tr>
                    <tr class="subrow">
                      <td></td>
                      <td class="sub-item">1.1. CEMENT (bags)</td>
                      <td></td>
                    </tr>
                    <tr class="subrow">
                      <td></td>
                      <td class="sub-item">1.2. LUMBER (bd. ft.)</td>
                      <td></td>
                    </tr>
                    <tr class="subrow">
                      <td></td>
                      <td class="sub-item">1.3. REINFORCING BARS (kg.)</td>
                      <td></td>
                    </tr>
                    <tr class="subrow">
                      <td></td>
                      <td class="sub-item">1.4. G.I. SHEETS (sheets)</td>
                      <td></td>
                    </tr>
                    <tr class="subrow">
                      <td></td>
                      <td class="sub-item">
                        1.5. PREFAB STRUCTURAL STEEL (kg.)
                      </td>
                      <td></td>
                    </tr>
                    <tr class="subrow">
                      <td></td>
                      <td class="sub-item">1.6. Other materials</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td class="cost-left number-col">2.</td>
                      <td class="cost-left main-col">
                        TOTAL COST OF DIRECT LABOR:
                      </td>
                      <td class="cost-right currency-col">P</td>
                      <td class="cost-line"><span></span></td>
                    </tr>
                    <tr class="note-row">
                      <td></td>
                      <td colspan="3" class="note-text">
                        This includes compensation whether by salary or contract
                        for project architect/engineer down to laborers.
                      </td>
                    </tr>
                    <tr>
                      <td class="cost-left number-col">3.</td>
                      <td class="cost-left main-col">
                        TOTAL COST OF EQUIPMENT UTILIZATION:
                      </td>
                      <td class="cost-right currency-col">P</td>
                      <td class="cost-line"><span></span></td>
                    </tr>
                    <tr>
                      <td class="cost-left number-col">4.</td>
                      <td class="cost-left main-col">OTHER COSTS:</td>
                      <td class="cost-right currency-col">P</td>
                      <td class="cost-line"><span></span></td>
                    </tr>
                    <tr class="note-row">
                      <td></td>
                      <td colspan="3" class="note-text">
                        This includes professional services fees, permits and
                        other fees
                      </td>
                    </tr>
                    <tr class="total-row">
                      <td></td>
                      <td class="total-label">
                        TOTAL COST OF BUILDING/STRUCTURE
                      </td>
                      <td class="cost-right currency-col">P</td>
                      <td class="cost-line"><span></span></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div class="supervisor-contract-wrapper mt-4">
                <table class="sig-two-col-table">
                  <tr>
                    <td class="sig-col left-col">
                      <div class="section-heading">
                        FULL-TIME SUPERVISOR OR INSPECTOR OF CONSTRUCTION
                      </div>
                      <div class="signature-block text-center mt-2">
                        <div class="signature-line long-line"></div>
                        <div class="role-label">
                          ARCHITECT OR CIVIL ENGINEER<br /><span class="note"
                            >(Signed And Sealed Over Printed Name)</span
                          >
                        </div>
                        <div class="date-inline">
                          Date<span class="short-line"></span>
                        </div>
                      </div>
                      <table class="mini-info-table mt-2">
                        <tr>
                          <td class="info-label">PRC No.</td>
                          <td class="info-line"></td>
                          <td class="info-label">Validity</td>
                          <td class="info-line"></td>
                        </tr>
                        <tr>
                          <td class="info-label">PTR No.</td>
                          <td class="info-line"></td>
                          <td class="info-label">Date Issued</td>
                          <td class="info-line"></td>
                        </tr>
                        <tr>
                          <td class="info-label">Issued at</td>
                          <td class="info-line"></td>
                          <td class="info-label">TIN</td>
                          <td class="info-line"></td>
                        </tr>
                      </table>
                      <table class="mini-info-table mt-1">
                        <tr>
                          <td class="info-label">CTC No.</td>
                          <td class="info-line"></td>
                          <td class="info-label">Date Issued</td>
                          <td class="info-line"></td>
                          <td class="info-label">Issued at</td>
                          <td class="info-line"></td>
                        </tr>
                      </table>
                      <table class="conforme-table mt-2">
                        <tr>
                          <td class="conforme-label-cell" colspan="6">
                            CONFORME:
                          </td>
                        </tr>
                        <tr>
                          <td class="owner-line-cell" colspan="6">
                            <div class="owner-line-wrapper">
                              <span
                                class="signature-line owner-line-left"
                              ></span>
                              <span class="date-inline owner-date"
                                >Date<span class="short-line"></span
                              ></span>
                            </div>
                            <div class="owner-caption-left">
                              OWNER/APPLICANT<br /><span class="note"
                                >(Signature Over Printed Name)</span
                              >
                            </div>
                          </td>
                        </tr>
                      </table>
                    </td>
                    <td class="sig-col right-col">
                      <div class="section-heading">
                        IF CONSTRUCTION WAS UNDERTAKEN BY CONTRACT
                      </div>
                      <table class="contract-info-table mt-1">
                        <tr>
                          <td class="contract-wide" colspan="2">Contractor:</td>
                          <td class="contract-narrow">PCAB Lic. No.</td>
                          <td class="info-line"></td>
                        </tr>
                        <tr>
                          <td class="contract-wide" colspan="2"></td>
                          <td class="contract-narrow">Validity</td>
                          <td class="info-line"></td>
                        </tr>
                        <tr>
                          <td class="contract-wide" colspan="2"></td>
                          <td class="contract-narrow">TIN</td>
                          <td class="info-line"></td>
                        </tr>
                        <tr>
                          <td class="contract-wide" colspan="2">Address</td>
                          <td class="contract-narrow">Tel. No.</td>
                          <td class="info-line"></td>
                        </tr>
                      </table>
                      <div class="auth-officer-block text-center mt-3">
                        <div class="signature-line officer-line"></div>
                        <div class="role-label">
                          AUTHORIZED MANAGING OFFICER<br /><span class="note"
                            >(Signature Over Printed Name)</span
                          >
                        </div>
                        <div class="date-inline">
                          Date<span class="short-line"></span>
                        </div>
                      </div>
                      <table class="mini-info-table mt-2 right-ctc-table">
                        <tr>
                          <td class="info-label">CTC No</td>
                          <td class="info-line"></td>
                          <td class="info-label">Date Issued</td>
                          <td class="info-line"></td>
                          <td class="info-label">Place Issued</td>
                          <td class="info-line"></td>
                        </tr>
                        <tr>
                          <td class="info-label"></td>
                          <td class="info-line"></td>
                          <td class="info-label">Date Issued</td>
                          <td class="info-line"></td>
                          <td class="info-label">Place Issued</td>
                          <td class="info-line"></td>
                        </tr>
                        <tr>
                          <td class="info-label"></td>
                          <td class="info-line"></td>
                          <td class="info-label">Date Issued</td>
                          <td class="info-line"></td>
                          <td class="info-label">Place Issued</td>
                          <td class="info-line"></td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>

                <div class="notary-block mt-4">
                  <div class="jurat-heading">
                    <span class="bold">REPUBLIC OF THE PHILIPPINES</span>)
                    S.S<br />
                    CITY/MUNICIPALITY OF <span class="long-blank"></span>)
                  </div>
                  <p class="jurat-text mt-2">
                    BEFORE ME, at the City/Municipality of
                    <span class="mid-blank"></span>, on
                    <span class="mid-blank"></span> personally appeared the
                    persons whose signatures appear herein at the front and back
                    of this page, known to me to be the same persons who
                    executed this standard prescribed form and acknowledged to
                    me that the same is their free and voluntary act and deed.
                  </p>
                  <p class="jurat-text mt-2">
                    WITNESS MY HAND AND SEAL on the date and place above
                    written.
                  </p>
                  <div class="doc-lines mt-3">
                    <div class="doc-col left">
                      <div class="doc-item">
                        Doc. No.&nbsp;&nbsp; <span class="doc-blank"></span>
                      </div>
                      <div class="doc-item">
                        Page No.&nbsp; <span class="doc-blank"></span>
                      </div>
                      <div class="doc-item">
                        Book No.&nbsp; <span class="doc-blank"></span>
                      </div>
                      <div class="doc-item">
                        Series of <span class="doc-blank"></span>
                      </div>
                    </div>
                    <div class="doc-col right text-center">
                      <div class="signature-line notary-line"></div>
                      <div class="role-label">
                        NOTARY PUBLIC (Until December
                        <span class="short-blank"></span>)
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </v-card>

        <!-- PAGE 2: Blank for now -->
        <v-card class="pa-6 printable-form mt-8" style="min-height: 1200px">
          <div class="text-center mb-4">
            <div
              class="text-subtitle-2"
              style="font-weight: bold; font-size: 16px"
            >
              DESIGN PROFESSIONALS, PLANS AND SPECIFICATIONS:
            </div>
          </div>
          <div class="d-flex" style="gap: 16px">
            <!-- Architectural -->
            <div style="flex: 1; border: 2px solid #222">
              <div
                style="
                  border-bottom: 2px solid #222;
                  padding: 4px 8px;
                  font-weight: bold;
                  font-size: 15px;
                "
              >
                ARCHITECTURAL
              </div>
              <div style="padding: 8px 8px 0 8px">
                <div class="d-flex align-center" style="margin-bottom: 8px">
                  <div
                    style="flex: 1; border-bottom: 1px solid #222; height: 18px"
                  ></div>
                  <div style="margin-left: 8px">
                    Date<span
                      style="
                        border-bottom: 1px solid #222;
                        min-width: 70px;
                        display: inline-block;
                        height: 16px;
                        vertical-align: middle;
                      "
                    ></span>
                  </div>
                </div>
                <div
                  class="text-center"
                  style="font-size: 13px; margin-bottom: 8px"
                >
                  (Signature Over Printed Name)
                </div>
                <table
                  style="
                    width: 100%;
                    font-size: 13px;
                    border-collapse: collapse;
                  "
                >
                  <tr>
                    <td
                      style="
                        border: 1px solid #222;
                        width: 30%;
                        padding: 2px 4px;
                      "
                    >
                      Address
                    </td>
                    <td style="border: 1px solid #222" colspan="2"></td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid #222; padding: 2px 4px">
                      PRC. No
                    </td>
                    <td style="border: 1px solid #222; padding: 2px 4px">
                      Validity
                    </td>
                    <td style="border: 1px solid #222; padding: 2px 4px"></td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid #222; padding: 2px 4px">
                      IAPOA No.
                    </td>
                    <td style="border: 1px solid #222; padding: 2px 4px">
                      O.R. No.
                    </td>
                    <td style="border: 1px solid #222; padding: 2px 4px">
                      Date Issued:
                    </td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid #222; padding: 2px 4px">
                      PTR. No
                    </td>
                    <td style="border: 1px solid #222; padding: 2px 4px">
                      Date Issued
                    </td>
                    <td style="border: 1px solid #222; padding: 2px 4px"></td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid #222; padding: 2px 4px">
                      Issued at
                    </td>
                    <td style="border: 1px solid #222; padding: 2px 4px">
                      TIN
                    </td>
                    <td style="border: 1px solid #222; padding: 2px 4px"></td>
                  </tr>
                </table>
              </div>
            </div>
            <!-- Civil/Structural -->
            <div style="flex: 1; border: 2px solid #222">
              <div
                style="
                  border-bottom: 2px solid #222;
                  padding: 4px 8px;
                  font-weight: bold;
                  font-size: 15px;
                "
              >
                CIVIL / STRUCTURAL
              </div>
              <div style="padding: 8px 8px 0 8px">
                <div class="d-flex align-center" style="margin-bottom: 8px">
                  <div
                    style="flex: 1; border-bottom: 1px solid #222; height: 18px"
                  ></div>
                  <div style="margin-left: 8px">
                    Date<span
                      style="
                        border-bottom: 1px solid #222;
                        min-width: 70px;
                        display: inline-block;
                        height: 16px;
                        vertical-align: middle;
                      "
                    ></span>
                  </div>
                </div>
                <div
                  class="text-center"
                  style="font-size: 13px; margin-bottom: 8px"
                >
                  (Signature Over Printed Name)
                </div>
                <table
                  style="
                    width: 100%;
                    font-size: 13px;
                    border-collapse: collapse;
                  "
                >
                  <tr>
                    <td
                      style="
                        border: 1px solid #222;
                        width: 30%;
                        padding: 2px 4px;
                      "
                    >
                      Address
                    </td>
                    <td style="border: 1px solid #222" colspan="2"></td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid #222; padding: 2px 4px">
                      PRC. No
                    </td>
                    <td style="border: 1px solid #222; padding: 2px 4px">
                      Validity
                    </td>
                    <td style="border: 1px solid #222; padding: 2px 4px"></td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid #222; padding: 2px 4px">
                      PTR. No
                    </td>
                    <td style="border: 1px solid #222; padding: 2px 4px">
                      Date Issued
                    </td>
                    <td style="border: 1px solid #222; padding: 2px 4px"></td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid #222; padding: 2px 4px">
                      Issued at
                    </td>
                    <td style="border: 1px solid #222; padding: 2px 4px">
                      TIN
                    </td>
                    <td style="border: 1px solid #222; padding: 2px 4px"></td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
          <br />
          <div class="d-flex" style="gap: 16px">
            <!-- ELECTRICAL -->
            <div style="flex: 1; border: 2px solid #222">
              <div
                style="
                  border-bottom: 2px solid #222;
                  padding: 4px 8px;
                  font-weight: bold;
                  font-size: 15px;
                "
              >
                ELECTRICAL
              </div>
              <div style="padding: 8px 8px 0 8px">
                <div class="d-flex align-center" style="margin-bottom: 8px">
                  <div
                    style="flex: 1; border-bottom: 1px solid #222; height: 18px"
                  ></div>
                  <div style="margin-left: 8px">
                    Date<span
                      style="
                        border-bottom: 1px solid #222;
                        min-width: 70px;
                        display: inline-block;
                        height: 16px;
                        vertical-align: middle;
                      "
                    ></span>
                  </div>
                </div>
                <div
                  class="text-center"
                  style="font-size: 13px; margin-bottom: 8px"
                >
                  (Signature Over Printed Name)
                </div>
                <table
                  style="
                    width: 100%;
                    font-size: 13px;
                    border-collapse: collapse;
                  "
                >
                  <tr>
                    <td
                      style="
                        border: 1px solid #222;
                        width: 30%;
                        padding: 2px 4px;
                      "
                    >
                      Address
                    </td>
                    <td style="border: 1px solid #222" colspan="2"></td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid #222; padding: 2px 4px">
                      PRC. No
                    </td>
                    <td style="border: 1px solid #222; padding: 2px 4px">
                      Validity
                    </td>
                    <td style="border: 1px solid #222; padding: 2px 4px"></td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid #222; padding: 2px 4px">
                      PTR. No.
                    </td>
                    <td style="border: 1px solid #222; padding: 2px 4px">
                      O.R. No.
                    </td>
                    <td style="border: 1px solid #222; padding: 2px 4px">
                      Date Issued:
                    </td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid #222; padding: 2px 4px">
                      PTR. No
                    </td>
                    <td style="border: 1px solid #222; padding: 2px 4px">
                      Date Issued
                    </td>
                    <td style="border: 1px solid #222; padding: 2px 4px"></td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid #222; padding: 2px 4px">
                      Issued at
                    </td>
                    <td style="border: 1px solid #222; padding: 2px 4px">
                      TIN
                    </td>
                    <td style="border: 1px solid #222; padding: 2px 4px"></td>
                  </tr>
                </table>
              </div>
            </div>
            <!-- MECHANICAL -->
            <div style="flex: 1; border: 2px solid #222">
              <div
                style="
                  border-bottom: 2px solid #222;
                  padding: 4px 8px;
                  font-weight: bold;
                  font-size: 15px;
                "
              >
                MECHANICAL
              </div>
              <div style="padding: 8px 8px 0 8px">
                <div class="d-flex align-center" style="margin-bottom: 8px">
                  <div
                    style="flex: 1; border-bottom: 1px solid #222; height: 18px"
                  ></div>
                  <div style="margin-left: 8px">
                    Date<span
                      style="
                        border-bottom: 1px solid #222;
                        min-width: 70px;
                        display: inline-block;
                        height: 16px;
                        vertical-align: middle;
                      "
                    ></span>
                  </div>
                </div>
                <div
                  class="text-center"
                  style="font-size: 13px; margin-bottom: 8px"
                >
                  (Signature Over Printed Name)
                </div>
                <table
                  style="
                    width: 100%;
                    font-size: 13px;
                    border-collapse: collapse;
                  "
                >
                  <tr>
                    <td
                      style="
                        border: 1px solid #222;
                        width: 30%;
                        padding: 2px 4px;
                      "
                    >
                      Address
                    </td>
                    <td style="border: 1px solid #222" colspan="2"></td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid #222; padding: 2px 4px">
                      PRC. No
                    </td>
                    <td style="border: 1px solid #222; padding: 2px 4px">
                      Validity
                    </td>
                    <td style="border: 1px solid #222; padding: 2px 4px"></td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid #222; padding: 2px 4px">
                      PTR. No
                    </td>
                    <td style="border: 1px solid #222; padding: 2px 4px">
                      Date Issued
                    </td>
                    <td style="border: 1px solid #222; padding: 2px 4px"></td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid #222; padding: 2px 4px">
                      Issued at
                    </td>
                    <td style="border: 1px solid #222; padding: 2px 4px">
                      TIN
                    </td>
                    <td style="border: 1px solid #222; padding: 2px 4px"></td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
          <br />
          <div class="d-flex" style="gap: 16px">
            <div style="flex: 1; border: 2px solid #222">
              <div
                style="
                  border-bottom: 2px solid #222;
                  padding: 4px 8px;
                  font-weight: bold;
                  font-size: 15px;
                "
              >
                SANITARY
              </div>
              <div style="padding: 8px 8px 0 8px">
                <div class="d-flex align-center" style="margin-bottom: 8px">
                  <div
                    style="flex: 1; border-bottom: 1px solid #222; height: 18px"
                  ></div>
                  <div style="margin-left: 8px">
                    Date<span
                      style="
                        border-bottom: 1px solid #222;
                        min-width: 70px;
                        display: inline-block;
                        height: 16px;
                        vertical-align: middle;
                      "
                    ></span>
                  </div>
                </div>
                <div
                  class="text-center"
                  style="font-size: 13px; margin-bottom: 8px"
                >
                  (Signature Over Printed Name)
                </div>
                <table
                  style="
                    width: 100%;
                    font-size: 13px;
                    border-collapse: collapse;
                  "
                >
                  <tr>
                    <td
                      style="
                        border: 1px solid #222;
                        width: 30%;
                        padding: 2px 4px;
                      "
                    >
                      Address
                    </td>
                    <td style="border: 1px solid #222" colspan="2"></td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid #222; padding: 2px 4px">
                      PRC. No
                    </td>
                    <td style="border: 1px solid #222; padding: 2px 4px">
                      Validity
                    </td>
                    <td style="border: 1px solid #222; padding: 2px 4px"></td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid #222; padding: 2px 4px">
                      IAPOA No.
                    </td>
                    <td style="border: 1px solid #222; padding: 2px 4px">
                      O.R. No.
                    </td>
                    <td style="border: 1px solid #222; padding: 2px 4px">
                      Date Issued:
                    </td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid #222; padding: 2px 4px">
                      PTR. No
                    </td>
                    <td style="border: 1px solid #222; padding: 2px 4px">
                      Date Issued
                    </td>
                    <td style="border: 1px solid #222; padding: 2px 4px"></td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid #222; padding: 2px 4px">
                      Issued at
                    </td>
                    <td style="border: 1px solid #222; padding: 2px 4px">
                      TIN
                    </td>
                    <td style="border: 1px solid #222; padding: 2px 4px"></td>
                  </tr>
                </table>
              </div>
            </div>
            <div style="flex: 1; border: 2px solid #222">
              <div
                style="
                  border-bottom: 2px solid #222;
                  padding: 4px 8px;
                  font-weight: bold;
                  font-size: 15px;
                "
              >
                PLUMBING
              </div>
              <div style="padding: 8px 8px 0 8px">
                <div class="d-flex align-center" style="margin-bottom: 8px">
                  <div
                    style="flex: 1; border-bottom: 1px solid #222; height: 18px"
                  ></div>
                  <div style="margin-left: 8px">
                    Date<span
                      style="
                        border-bottom: 1px solid #222;
                        min-width: 70px;
                        display: inline-block;
                        height: 16px;
                        vertical-align: middle;
                      "
                    ></span>
                  </div>
                </div>
                <div
                  class="text-center"
                  style="font-size: 13px; margin-bottom: 8px"
                >
                  (Signature Over Printed Name)
                </div>
                <table
                  style="
                    width: 100%;
                    font-size: 13px;
                    border-collapse: collapse;
                  "
                >
                  <tr>
                    <td
                      style="
                        border: 1px solid #222;
                        width: 30%;
                        padding: 2px 4px;
                      "
                    >
                      Address
                    </td>
                    <td style="border: 1px solid #222" colspan="2"></td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid #222; padding: 2px 4px">
                      PRC. No
                    </td>
                    <td style="border: 1px solid #222; padding: 2px 4px">
                      Validity
                    </td>
                    <td style="border: 1px solid #222; padding: 2px 4px"></td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid #222; padding: 2px 4px">
                      PTR. No
                    </td>
                    <td style="border: 1px solid #222; padding: 2px 4px">
                      Date Issued
                    </td>
                    <td style="border: 1px solid #222; padding: 2px 4px"></td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid #222; padding: 2px 4px">
                      Issued at
                    </td>
                    <td style="border: 1px solid #222; padding: 2px 4px">
                      TIN
                    </td>
                    <td style="border: 1px solid #222; padding: 2px 4px"></td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
          <br />
          <div class="d-flex" style="gap: 16px">
            <!-- ELECTRONICS -->
            <div style="flex: 1; border: 2px solid #222">
              <div
                style="
                  border-bottom: 2px solid #222;
                  padding: 4px 8px;
                  font-weight: bold;
                  font-size: 15px;
                "
              >
                ELECTRONICS
              </div>
              <div style="padding: 8px 8px 0 8px">
                <div class="d-flex align-center" style="margin-bottom: 8px">
                  <div
                    style="flex: 1; border-bottom: 1px solid #222; height: 18px"
                  ></div>
                  <div style="margin-left: 8px">
                    Date<span
                      style="
                        border-bottom: 1px solid #222;
                        min-width: 70px;
                        display: inline-block;
                        height: 16px;
                        vertical-align: middle;
                      "
                    ></span>
                  </div>
                </div>
                <div
                  class="text-center"
                  style="font-size: 13px; margin-bottom: 8px"
                >
                  (Signature Over Printed Name)
                </div>
                <table
                  style="
                    width: 100%;
                    font-size: 13px;
                    border-collapse: collapse;
                  "
                >
                  <tr>
                    <td
                      style="
                        border: 1px solid #222;
                        width: 30%;
                        padding: 2px 4px;
                      "
                    >
                      Address
                    </td>
                    <td style="border: 1px solid #222" colspan="2"></td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid #222; padding: 2px 4px">
                      PRC. No
                    </td>
                    <td style="border: 1px solid #222; padding: 2px 4px">
                      Validity
                    </td>
                    <td style="border: 1px solid #222; padding: 2px 4px"></td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid #222; padding: 2px 4px">
                      PTR. No.
                    </td>
                    <td style="border: 1px solid #222; padding: 2px 4px">
                      O.R. No.
                    </td>
                    <td style="border: 1px solid #222; padding: 2px 4px">
                      Date Issued:
                    </td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid #222; padding: 2px 4px">
                      PTR. No
                    </td>
                    <td style="border: 1px solid #222; padding: 2px 4px">
                      Date Issued
                    </td>
                    <td style="border: 1px solid #222; padding: 2px 4px"></td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid #222; padding: 2px 4px">
                      Issued at
                    </td>
                    <td style="border: 1px solid #222; padding: 2px 4px">
                      TIN
                    </td>
                    <td style="border: 1px solid #222; padding: 2px 4px"></td>
                  </tr>
                </table>
              </div>
            </div>
            <!-- INTERIOR DESIGN -->
            <div style="flex: 1; border: 2px solid #222">
              <div
                style="
                  border-bottom: 2px solid #222;
                  padding: 4px 8px;
                  font-weight: bold;
                  font-size: 15px;
                "
              >
                INTERIOR DESIGN
              </div>
              <div style="padding: 8px 8px 0 8px">
                <div class="d-flex align-center" style="margin-bottom: 8px">
                  <div
                    style="flex: 1; border-bottom: 1px solid #222; height: 18px"
                  ></div>
                  <div style="margin-left: 8px">
                    Date<span
                      style="
                        border-bottom: 1px solid #222;
                        min-width: 70px;
                        display: inline-block;
                        height: 16px;
                        vertical-align: middle;
                      "
                    ></span>
                  </div>
                </div>
                <div
                  class="text-center"
                  style="font-size: 13px; margin-bottom: 8px"
                >
                  (Signature Over Printed Name)
                </div>
                <table
                  style="
                    width: 100%;
                    font-size: 13px;
                    border-collapse: collapse;
                  "
                >
                  <tr>
                    <td
                      style="
                        border: 1px solid #222;
                        width: 30%;
                        padding: 2px 4px;
                      "
                    >
                      Address
                    </td>
                    <td style="border: 1px solid #222" colspan="2"></td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid #222; padding: 2px 4px">
                      PRC. No
                    </td>
                    <td style="border: 1px solid #222; padding: 2px 4px">
                      Validity
                    </td>
                    <td style="border: 1px solid #222; padding: 2px 4px"></td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid #222; padding: 2px 4px">
                      PTR. No
                    </td>
                    <td style="border: 1px solid #222; padding: 2px 4px">
                      Date Issued
                    </td>
                    <td style="border: 1px solid #222; padding: 2px 4px"></td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid #222; padding: 2px 4px">
                      Issued at
                    </td>
                    <td style="border: 1px solid #222; padding: 2px 4px">
                      TIN
                    </td>
                    <td style="border: 1px solid #222; padding: 2px 4px"></td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
          <div class="text-center mb-4">
            <div
              class="text-subtitle-2"
              style="font-weight: bold; font-size: 16px"
            >
              SUPERVISORS OF SPECIALTY WORKS:
            </div>
          </div>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import html2pdf from "html2pdf.js";

export default {
  name: "BuildingPermitPDF",
  methods: {
    downloadPDF() {
      const element = this.$el.querySelector(".printable-form");
      const opt = {
        margin: 10,
        filename: "Certificate_of_Completion.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      };
      html2pdf().from(element).set(opt).save();
    },
  },
};
</script>

<style scoped>
.nav-links .v-btn {
  text-transform: none !important;
  font-weight: 500;
  font-size: 17px;
}

.grey-background {
  background-color: #f5f5f5;
}

.printable-form {
  max-width: 1000px;
  margin: 20px auto;
  font-family: Arial, sans-serif;
  font-size: 11px;
  line-height: 1.3;
}

.box {
  border: 2px solid black;
  padding-top: 14px;
}

.underlined {
  text-decoration: underline;
}

.certification-text {
  text-align: justify;
  line-height: 1.35;
  margin-bottom: 12px;
  text-indent: 4em;
}

.permit-field,
.date-field {
  display: inline-block;
  border-bottom: 1px solid black;
  min-width: 120px;
  height: 18px;
  margin: 0 5px;
}

.form-row {
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  line-height: 1.6;
}

.field-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
}

.row-label {
  font-weight: bold;
  font-size: 11px;
}

.row-label-inline {
  font-weight: bold;
  font-size: 11px;
}

.name-field {
  border-bottom: 1px solid black;
  height: 18px;
}

.name-field.last-name {
  width: 350px;
}

.name-field.given-name {
  width: 350px;
}

.name-field.mi {
  width: 112px;
}

.address-field {
  border-bottom: 1px solid black;
  height: 18px;
}

.address-field.number {
  width: 530px;
}

.address-field.zip {
  width: 50px;
}

.address-field.tel {
  width: 131px;
}

.location-field {
  border-bottom: 1px solid black;
  height: 18px;
}

.location-field.lot {
  width: 30px;
}

.location-field.blk {
  width: 30px;
}

.location-field.street {
  width: 100px;
}

.location-field.barangay {
  width: 105px;
}

.location-field.city {
  width: 150px;
}

/* Occupancy Fields */
.occupancy-field {
  border-bottom: 1px solid black;
  height: 18px;
}

.occupancy-field.main {
  width: 420px;
}

.occupancy-field.group {
  width: 243px;
}

.field-label {
  font-size: 9px;
  color: #666;
}

.underlined-field {
  border-bottom: 1px solid black;
  display: inline-block;
  min-height: 16px;
  min-width: 100px;
  padding: 2px 5px;
}

.input-field {
  border-bottom: 1px solid black;
  min-height: 20px;
  width: 100%;
  padding: 2px 4px;
  margin-bottom: 2px;
}

.cost-input {
  border-bottom: 1px solid black;
  display: inline-block;
  min-width: 100px;
  min-height: 16px;
  padding: 2px 4px;
}

.cost-input-total {
  border-bottom: 1px solid black;
  display: inline-block;
  min-width: 100px;
  min-height: 16px;
  padding: 2px 4px;
  font-weight: bold;
}

.main-form-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 15px;
}

.main-form-table td {
  padding: 4px 6px;
  vertical-align: top;
  border: 1px solid black;
}

.label-cell {
  font-weight: bold;
  font-size: 11px;
  text-align: left;
  vertical-align: middle;
  background-color: #f8f8f8;
}

.field-cell {
  padding: 8px;
  vertical-align: top;
}

.header-cell {
  font-weight: bold;
  font-size: 11px;
  background-color: #f0f0f0;
  text-align: center;
}

.field-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.cost-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

.cost-table td {
  padding: 4px 8px;
  border: 1px solid black;
  vertical-align: middle;
}

.cost-label {
  font-weight: bold;
  font-size: 11px;
  width: 70%;
}

.cost-sublabel {
  font-size: 11px;
  padding-left: 20px;
  width: 70%;
}

.cost-note {
  font-size: 10px;
  font-style: italic;
  padding-left: 20px;
  border: none !important;
}

.cost-total {
  font-weight: bold;
  font-size: 11px;
  width: 70%;
  text-align: center;
  background-color: #f0f0f0;
}

.cost-field {
  text-align: right;
  width: 30%;
  font-size: 11px;
}

.cost-field-total {
  text-align: right;
  width: 30%;
  font-size: 11px;
  font-weight: bold;
  background-color: #f0f0f0;
}

.form-content {
  text-align: justify;
}

.cost-summary-wrapper {
  margin-top: 6px;
  font-size: 10.5px;
  padding: 0 70px;
}

.cost-summary-title {
  font-weight: bold;
  margin-bottom: 4px;
  letter-spacing: 0.5px;
}

.cost-summary-table {
  width: 100%;
  border-collapse: collapse;
}

.cost-summary-table td {
  padding: 0 4px 2px 0;
  vertical-align: top;
  line-height: 1.2;
}

.number-col {
  width: 18px;
}
.main-col {
  width: 55%;
}
.currency-col {
  width: 18px;
  text-align: right;
  padding-right: 2px !important;
}
.cost-line {
  position: relative;
}
.cost-line span {
  display: block;
  border-bottom: 1px solid #000;
  height: 14px;
}

.sub-item {
  padding-left: 18px;
}
.subrow td {
  font-size: 10.5px;
}
.note-row td {
  padding-top: 0;
}
.note-text {
  font-size: 10px;
  font-style: italic;
  padding-left: 18px;
}

.total-row .total-label {
  font-weight: bold;
  text-align: center;
}

@media print {
  .cost-summary-table td {
    padding: 0 4px 2px 0;
  }
  .cost-line span {
    border-bottom: 1px solid #000;
  }
}

.supervisor-contract-wrapper {
  font-size: 11px;
}
.sig-two-col-table {
  width: 100%;
  border-collapse: collapse;
}
.sig-two-col-table td.sig-col {
  border: 1px solid #000;
  vertical-align: top;
  padding: 5px 5px 8px;
}
.sig-two-col-table td.left-col {
  width: 52%;
}
.sig-two-col-table td.right-col {
  width: 48%;
}
.section-heading {
  font-weight: bold;
  font-size: 11px;
  text-align: center;
  border-bottom: 1px solid #000;
  padding-bottom: 2px;
}
.signature-line {
  border-bottom: 1px solid #000;
  height: 14px;
  margin: 0 auto 2px;
}
.signature-line.long-line {
  width: 80%;
}
.officer-line {
  width: 80%;
}
.owner-line {
  width: 55%;
  margin-top: 10px;
}
.notary-line {
  width: 90%;
  margin-bottom: 2px;
}
.role-label {
  font-size: 10px;
  font-weight: bold;
  line-height: 1.2;
}
.role-label .note {
  font-weight: normal;
  font-size: 9px;
}
.date-inline {
  font-size: 10px;
  margin-top: 4px;
}
.date-inline .short-line {
  display: inline-block;
  border-bottom: 1px solid #000;
  width: 120px;
  height: 10px;
  margin-left: 4px;
}
.date-inline.small .short-line {
  width: 90px;
}
.mini-info-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 10px;
}
.mini-info-table td {
  padding: 2px 4px 0 2px;
}
.info-label {
  font-weight: bold;
  font-size: 9px;
  white-space: nowrap;
}
.info-line {
  border-bottom: 1px solid #000;
  height: 12px;
  min-width: 70px;
}
.info-line.transparent {
  border-bottom: 1px solid transparent;
}
.contract-info-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 10px;
}
.contract-info-table td {
  padding: 2px 4px 0 2px;
}
.contract-wide {
  width: 55%;
  font-weight: bold;
  font-size: 9px;
}
.contract-narrow {
  width: 20%;
  font-weight: bold;
  font-size: 9px;
  white-space: nowrap;
}
.auth-officer-block {
  margin-top: 10px;
}
.conforme-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 10px;
}
.conforme-label-cell {
  font-weight: bold;
  padding: 4px 4px 2px;
}
.owner-line-cell {
  padding: 2px 4px 4px;
}
.owner-line-wrapper {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 2px 0 2px;
}
.signature-line.owner-line-left {
  flex: 1;
  min-width: 220px;
}
.owner-date .short-line {
  width: 110px;
}
.owner-caption-left {
  text-align: center;
  font-size: 9px;
  font-weight: bold;
}
.owner-caption-left .note {
  font-weight: normal;
  font-size: 8px;
}
.right-ctc-table {
  margin-top: 4px;
}
.notary-block {
  font-size: 10px;
  margin-top: 18px;
}
.jurat-heading {
  font-size: 10px;
  line-height: 1.2;
}
.bold {
  font-weight: bold;
}
.long-blank,
.mid-blank {
  display: inline-block;
  border-bottom: 1px solid #000;
  min-width: 160px;
  height: 12px;
  vertical-align: baseline;
}
.mid-blank {
  min-width: 120px;
}
.jurat-text {
  text-align: justify;
  line-height: 1.3;
  margin: 0;
}
.doc-lines {
  display: flex;
  justify-content: space-between;
  margin-top: 14px;
}
.doc-col.left {
  width: 45%;
  font-size: 10px;
}
.doc-col.right {
  width: 50%;
}
.doc-item {
  margin-bottom: 4px;
}
.doc-blank {
  display: inline-block;
  border-bottom: 1px solid #000;
  width: 120px;
  height: 10px;
}
.short-blank {
  display: inline-block;
  border-bottom: 1px solid #000;
  width: 70px;
  height: 10px;
}

@media print {
  .printable-form {
    font-size: 9px;
    line-height: 1.15;
  }
  .certification-text {
    margin-bottom: 8px;
    line-height: 1.25;
    text-indent: 3.5em;
  }
  .main-form-table td {
    padding: 3px 4px;
  }
  .sig-two-col-table td.sig-col {
    padding: 3px 4px 6px;
  }
  .cost-summary-wrapper {
    padding: 0 50px;
    font-size: 9px;
  }
  .cost-summary-table td {
    padding: 0 3px 1px 0;
  }
  .signature-line.long-line,
  .officer-line {
    width: 78%;
  }
  .signature-line.owner-line-left {
    min-width: 200px;
  }
  .owner-date .short-line {
    width: 90px;
  }
  .box {
    padding-top: 10px;
  }
  .info-line,
  .signature-line,
  .doc-blank,
  .short-blank,
  .long-blank,
  .mid-blank {
    border-bottom: 1px solid #000;
  }
}

@media print {
  .no-print {
    display: none !important;
  }

  .printable-form {
    margin: 0;
    padding: 0;
    box-shadow: none;
    max-width: none;
  }

  .v-main {
    padding: 0 !important;
  }

  .grey-background {
    background-color: white;
  }

  .v-card {
    border: none !important;
    box-shadow: none !important;
    padding: 20px !important;
  }

  .main-form-table td,
  .cost-table td {
    border: 1px solid black !important;
  }

  .signature-section {
    border: 1px solid black !important;
  }

  .cost-note {
    border: none !important;
  }
}
</style>
