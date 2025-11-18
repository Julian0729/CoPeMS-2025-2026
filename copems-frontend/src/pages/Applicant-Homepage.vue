<template>
  <v-app>
    <v-main>
      <v-container fluid class="pa-0 hero-bg">
        <v-row align="center" justify="center" class="text-white py-12 hero-content">
          <v-col cols="12" md="6" class="text-center text-md-left hero-text-col">
            <h1 class="font-weight-bold mb-4 text-h3 text-md-h2 gradient-hero-title">
              Streamline Your Construction Permits
            </h1>
            <p class="subtitle-1 mb-6 hero-lead">
              Apply, track, and manage construction permits online with our comprehensive
              digital platform.<br />
              <span class="text-primary-lighten-2"
                >Fast, secure, and efficient permit processing for all your construction
                needs.</span
              >
            </p>
          </v-col>
          <v-col cols="12" md="6" class="d-none d-md-flex justify-center hero-image-col">
            <v-img :src="tabletImage" contain max-height="400" class="hero-image"></v-img>
          </v-col>
        </v-row>
      </v-container>

      <v-container class="my-16">
        <div class="text-center mb-10" ref="servicesSection">
          <h1 class="display-1 font-weight-bold gradient-section-title">
            One Stop Shop Services
          </h1>
          <p class="subtitle-1 text-secondary font-italic">
            Complete your construction requirements efficiently
          </p>
        </div>
        <v-row justify="center" align="stretch" class="gap-y">
          <v-col cols="12" sm="6" md="4">
            <v-card class="mx-auto rounded-xl elevation-4 service-card" outlined>
              <v-img :src="bpImage" height="200px" class="rounded-t-xl"></v-img>
              <v-card-title class="font-weight-bold text-h6 pt-4 pb-2">
                Building Permit Application
              </v-card-title>
              <v-card-text class="pb-2">
                Submit and process your building permit applications with ease. Ensure
                compliance with building codes and regulations.
              </v-card-text>
              <v-card-actions>
                <v-btn color="primary" class="ma-2 rounded-pill" to="Applicant-Login"
                  >Apply Now</v-btn
                >
                <v-btn
                  color="primary"
                  outlined
                  class="ma-2 rounded-pill to"
                  to="/Applicant-bpInquiry"
                  >Inquiry
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-card class="mx-auto rounded-xl elevation-4 service-card" outlined>
              <v-img :src="opImage" height="200px" class="rounded-t-xl"></v-img>
              <v-card-title class="font-weight-bold text-h6 pt-4 pb-2">
                Occupancy Permit Application
              </v-card-title>
              <v-card-text class="pb-2">
                Apply for occupancy permits for your completed construction projects.
                Ensure safety and compliance standards.
              </v-card-text>
              <v-card-actions>
                <v-btn color="primary" class="ma-2 rounded-pill" to="/Applicant-Login"
                  >Apply Now</v-btn
                >
                <v-btn
                  color="primary"
                  outlined
                  class="ma-2 rounded-pill"
                  to="/Applicant-opInquiry"
                  >Inquiry</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

      <v-container class="my-16">
        <div class="text-center mb-10">
          <h2 class="display-1 font-weight-bold gradient-section-title">Key Features</h2>
          <p class="subtitle-1 text-secondary">
            Everything you need for efficient permit management
          </p>
        </div>
        <v-row justify="center" align="stretch" class="gap-y">
          <v-col cols="12" sm="6" md="3">
            <v-card class="text-center pa-6 rounded-xl elevation-2 feature-card" outlined>
              <v-icon size="64" color="blue" class="feature-icon-bg"
                >mdi-file-document</v-icon
              >
              <v-card-title class="justify-center text-h6 font-weight-bold mt-4">
                Online Application
              </v-card-title>
              <v-card-text>
                Submit permit applications online with our user-friendly digital forms and
                document upload system.
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-card class="text-center pa-6 rounded-xl elevation-2 feature-card" outlined>
              <v-icon size="64" color="green" class="feature-icon-bg">mdi-magnify</v-icon>
              <v-card-title class="justify-center text-h6 font-weight-bold mt-4">
                Status Tracking
              </v-card-title>
              <v-card-text>
                Track your permit application status in real-time with detailed progress
                updates and notifications.
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-card class="text-center pa-6 rounded-xl elevation-2 feature-card" outlined>
              <v-icon size="64" color="purple" class="feature-icon-bg">mdi-upload</v-icon>
              <v-card-title class="justify-center text-h6 font-weight-bold mt-4">
                Document Management
              </v-card-title>
              <v-card-text>
                Securely upload, store, and manage all required documents for your
                construction permits.
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-card class="text-center pa-6 rounded-xl elevation-2 feature-card" outlined>
              <v-icon size="64" color="orange" class="feature-icon-bg"
                >mdi-credit-card-outline</v-icon
              >
              <v-card-title class="justify-center text-h6 font-weight-bold mt-4">
                Payment Processing
              </v-card-title>
              <v-card-text>
                Pay permit fees securely online with multiple payment options and instant
                confirmation.
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

      <v-container class="my-16">
        <div class="text-center mb-10">
          <h2 class="display-1 font-weight-bold gradient-section-title">
            Application Process
          </h2>
          <p class="subtitle-1 text-secondary">
            Simple steps to get your construction permit
          </p>
        </div>
        <v-row justify="center" class="text-center gap-y process-row">
          <v-col cols="12" sm="6" md="3">
            <v-avatar color="primary" size="64" class="mb-4 process-step-avatar">
              <span class="white--text text-h5 font-weight-bold">1</span>
            </v-avatar>
            <h3 class="text-h6 font-weight-bold mb-2">Register Account</h3>
            <p class="text-caption mt-2">
              Create your account and verify your identity to access the permit system.
            </p>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-avatar color="primary" size="64" class="mb-4 process-step-avatar">
              <span class="white--text text-h5 font-weight-bold">2</span>
            </v-avatar>
            <h3 class="text-h6 font-weight-bold mb-2">Submit Application</h3>
            <p class="text-caption mt-2">
              Fill out the permit application form and upload required documents.
            </p>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-avatar color="primary" size="64" class="mb-4 process-step-avatar">
              <span class="white--text text-h5 font-weight-bold">3</span>
            </v-avatar>
            <h3 class="text-h6 font-weight-bold mb-2">Review & Payment</h3>
            <p class="text-caption mt-2">
              Review your application, make payment, and wait for processing.
            </p>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-avatar color="primary" size="64" class="mb-4 process-step-avatar">
              <span class="white--text text-h5 font-weight-bold">4</span>
            </v-avatar>
            <h3 class="text-h6 font-weight-bold mb-2">Get Permit</h3>
            <p class="text-caption mt-2">
              Receive your approved permit digitally and start your construction project.
            </p>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <v-footer color="#1B3C53" dark padless>
      <v-container>
        <v-row>
          <v-col cols="12" md="3" class="mb-4">
            <div class="d-flex align-center mb-2">
              <v-img :src="officialSeal" max-width="48"></v-img>
              <div class="ml-2">
                <h4 class="font-weight-bold">OFFICIAL WEBSITE OF</h4>
                <p class="text-caption text-uppercase">THE CITY GOVERNMENT OF NAGA</p>
              </div>
            </div>
            <p class="text-caption">About this website.</p>
            <p class="text-caption">Contact us at info@naga.gov.ph</p>
            <p class="text-caption">Governance Team | City Government of Naga</p>
            <div class="mt-2">
              <v-btn icon color="white" href="#" class="mr-2"
                ><v-icon>mdi-facebook</v-icon></v-btn
              >
              <v-btn icon color="white" href="#" class="mr-2"
                ><v-icon>mdi-youtube</v-icon></v-btn
              >
              <v-btn icon color="white" href="#" class="mr-2"
                ><v-icon>mdi-instagram</v-icon></v-btn
              >
            </div>
          </v-col>
          <v-col cols="12" md="3" class="mb-4">
            <h4 class="font-weight-bold">City Government links</h4>
            <p class="text-caption footer-link">Home</p>
            <p class="text-caption footer-link">Resident</p>
            <p class="text-caption footer-link">Visitor</p>
            <p class="text-caption footer-link">Investor</p>
            <p class="text-caption footer-link">Supplier</p>
            <p class="text-caption footer-link">Student</p>
            <p class="text-caption footer-link">City Officials</p>
          </v-col>
          <v-col cols="12" md="3" class="mb-4">
            <h4 class="font-weight-bold">GOVERNMENT LINKS</h4>
            <p class="text-caption footer-link">Office of the President</p>
            <p class="text-caption footer-link">Office of the Vice President</p>
            <p class="text-caption footer-link">Senate of the Philippines</p>
            <p class="text-caption footer-link">House of Representatives</p>
            <p class="text-caption footer-link">Supreme Court</p>
            <p class="text-caption footer-link">Court of Appeals</p>
            <p class="text-caption footer-link">Sandiganbayan</p>
          </v-col>
          <v-col cols="12" md="3" class="mb-4">
            <h4 class="font-weight-bold">ABOUT GOVPH</h4>
            <p class="text-caption">
              Learn more about the Philippine government, its structure, how government
              works and the people behind it.
            </p>
            <h4 class="font-weight-bold mt-4">GOVPH</h4>
            <p class="text-caption footer-link">Open Data Portal</p>
            <p class="text-caption footer-link">Official Gazette</p>
            <div class="d-flex align-center my-2">
              <v-img :src="officialSeal" max-width="48"></v-img>
              <v-img :src="officialSeal" max-width="48" class="ml-2"></v-img>
            </div>
            <p class="text-caption mt-4 footer-link">Data Privacy Policy</p>
            <p class="text-caption footer-link">Terms and Conditions</p>
            <p class="text-caption footer-link">REPUBLIC OF THE PHILIPPINES</p>
            <p class="text-caption d-flex align-center">
              <v-icon small class="mr-1">mdi-earth</v-icon>www.naga.gov.ph
            </p>
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script>
import tabletImage from "../assets/construction.png";
import bpImage from "../assets/bp.png";
import opImage from "../assets/op.jpg";

export default {
  data() {
    return {
      tabletImage,
      bpImage,
      opImage,
      officialSeal:
        "https://www2.naga.gov.ph/wp-content/uploads/2022/05/Naga_City_Official_Seal-1.png",
    };
  },
  methods: {
    scrollToServices() {
      const servicesSection = this.$refs.servicesSection;
      if (servicesSection) {
        servicesSection.scrollIntoView({ behavior: "smooth" });
      }
    },
  },
};
</script>

<style scoped>
/* App Bar */
.appbar-title-1 {
  font-size: 12px;
  font-weight: 400;
  color: #fff;
  line-height: 1.2;
  letter-spacing: 0.07em;
}
.appbar-title-2 {
  font-size: 16px;
  font-weight: 700;
  color: #fff;
  line-height: 1.2;
  letter-spacing: 0.06em;
}
.appbar-link {
  color: #fff !important;
  font-weight: bold;
  letter-spacing: 0.02em;
  text-transform: none !important;
  font-size: 1.04rem;
}
.header-shadow {
  box-shadow: 0 2px 10px 0 rgba(0, 0, 100, 0.07) !important;
}
.header-title {
  font-size: 1.4rem;
  letter-spacing: 0.04em;
}
.gradient-text {
  background: linear-gradient(90deg, #1976d2 10%, #00b8ff 90%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* HERO SECTION */
.hero-bg {
  background: linear-gradient(90deg, #004d80 70%, #1976d2 100%);
  position: relative;
  overflow: hidden;
  min-height: 460px;
}
.hero-bg::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("../assets/crane.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  opacity: 0.21;
  z-index: 1;
}
.hero-content {
  position: relative;
  z-index: 2;
  height: 100%;
  padding-left: 5%;
  padding-right: 5%;
}
.hero-lead {
  font-size: 1.21rem;
  font-weight: 500;
  color: #e3f8ff;
  text-shadow: 0 2px 8px rgba(25, 118, 210, 0.09);
}
.gradient-hero-title {
  background: linear-gradient(90deg, #fff 20%, #00b8ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: 0.03em;
  line-height: 1.12;
}
.hero-image {
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(25, 118, 210, 0.16);
}
.hero-cta {
  font-size: 1.11rem;
  letter-spacing: 0.06em;
  font-weight: bold;
}

/* Section Titles */
.gradient-section-title {
  background: linear-gradient(90deg, #1976d2 20%, #00b8ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: 0.02em;
}

/* Service Card */
.service-card {
  transition: box-shadow 0.23s, border-color 0.23s, transform 0.1s;
  min-height: 390px;
}
.service-card:hover {
  border-color: #1976d2;
  box-shadow: 0 8px 32px 0 rgba(0, 70, 180, 0.16);
  transform: translateY(-2px) scale(1.02);
}
.service-card .v-card-title {
  color: #1976d2;
}
.service-card .v-img {
  object-fit: cover;
  box-shadow: 0 2px 24px 0 rgba(0, 0, 90, 0.06);
}

/* Feature Card */
.feature-card {
  min-height: 320px;
  background: #fafdff;
  border: 1.5px solid #e3eafc;
}
.feature-icon-bg {
  background: linear-gradient(180deg, #e3eaff 70%, #fff 100%);
  border-radius: 50%;
  width: 80px;
  height: 80px;
  padding: 8px;
  margin: 0 auto 8px auto;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 10px 0 rgba(25, 118, 210, 0.06);
}

/* Process Steps */
.process-step-avatar {
  box-shadow: 0 2px 8px rgba(25, 118, 210, 0.11);
  font-size: 1.4rem !important;
}

/* Footer */
.v-footer {
  border-top: 2px solid #1565c0;
  font-size: 0.95rem;
}
.footer-link {
  cursor: pointer;
  transition: color 0.16s;
}
.footer-link:hover {
  color: #00b8ff;
  text-decoration: underline;
}

@media (max-width: 1200px) {
  .hero-bg {
    min-height: 350px;
  }
  .service-card,
  .feature-card {
    min-height: 340px;
  }
}
@media (max-width: 900px) {
  .hero-bg {
    min-height: 270px;
  }
  .service-card,
  .feature-card {
    min-height: 280px;
  }
}
@media (max-width: 600px) {
  .header-title {
    font-size: 1.1rem !important;
  }
  .gradient-text {
    font-size: 1rem !important;
  }
  .service-card,
  .feature-card {
    min-height: 230px;
  }
  .main-content-bg {
    padding: 0 !important;
  }
}
.gap-y > .v-col {
  margin-bottom: 32px;
}
.process-row > .v-col {
  margin-bottom: 16px;
}
</style>
