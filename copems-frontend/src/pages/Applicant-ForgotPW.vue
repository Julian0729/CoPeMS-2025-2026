<template>
  <div class="page-wrapper">
    <v-main>
      <v-container class="fill-height pa-8 d-flex align-center justify-center" fluid>
        <v-row align="center" justify="center" class="w-100">
          <v-col cols="12" md="7" class="pa-6">
            <div class="info-section elevation-2">
              <h2 class="info-title gradient-info-title">
                Why Choose Online Application
              </h2>
              <v-row class="mt-8" align="stretch">
                <v-col cols="12" sm="4" class="text-center">
                  <div class="icon-wrapper blue-bg">
                    <v-icon color="#3D5AFE" size="38">mdi-clock-outline</v-icon>
                  </div>
                  <h3 class="feature-title">Time-Saving</h3>
                  <p class="feature-description">
                    Save valuable time by processing your permits online. No more waiting
                    in long queues – complete everything from the comfort of your home or
                    office.
                  </p>
                </v-col>
                <v-col cols="12" sm="4" class="text-center">
                  <div class="icon-wrapper green-bg">
                    <v-icon color="#00C853" size="38">mdi-web</v-icon>
                  </div>
                  <h3 class="feature-title">24/7 Access</h3>
                  <p class="feature-description">
                    Access our services around the clock, every day of the year. Submit
                    applications and track progress at any time that suits your schedule.
                  </p>
                </v-col>
                <v-col cols="12" sm="4" class="text-center">
                  <div class="icon-wrapper purple-bg">
                    <v-icon color="#6200EA" size="38">mdi-bell-outline</v-icon>
                  </div>
                  <h3 class="feature-title">Real-time Updates</h3>
                  <p class="feature-description">
                    Stay informed with instant notifications about your application
                    status. Receive timely updates and never miss important information.
                  </p>
                </v-col>
              </v-row>
            </div>
          </v-col>

          <v-col cols="12" md="4" class="pa-6">
            <v-card class="login-card pa-7 elevation-8">
              <v-card-title
                class="text-center text-h5 font-weight-bold pb-1 text-blue-darken-3"
              >
                <a href="#" class="text-primary text-decoration-none">Forgot Password?</a>
              </v-card-title>
              <v-card-subtitle class="text-center mb-6 text-grey-darken-1">
                Enter your email address and we'll send you instructions to reset your
                password.
              </v-card-subtitle>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Email Address"
                    density="comfortable"
                    variant="outlined"
                    class="mb-6"
                    prepend-inner-icon="mdi-email-outline"
                  ></v-text-field>

                  <v-btn
                    block
                    color="primary"
                    size="large"
                    class="login-btn gradient-btn"
                    @click="sendResetLink"
                  >
                    Send Reset Link
                  </v-btn>

                  <div class="text-center mt-6">
                    <router-link
                      to="/Applicant-Login"
                      class="text-primary font-weight-bold ms-1"
                    >
                      <v-icon size="small" class="me-1">mdi-arrow-left</v-icon>
                      Back to Login
                    </router-link>
                  </div>
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </div>
</template>

<script>
export default {
  name: "ForgotPasswordPage",
  data() {
    return {
      // You may add a data property for the email if you are collecting the input
      email: "",
    };
  },
  methods: {
    sendResetLink() {
      // Logic to handle sending the reset link goes here
      console.log("Sending reset link to:", this.email);
    },
  },
};
</script>

<style scoped>
/*
  The styles remain largely the same, but I've kept them here for completeness.
  Note: The color of the "Forgot Password?" title is adjusted in the template using the `text-primary` class to better match the image.
*/
.page-wrapper {
  background: linear-gradient(120deg, #f7f8fa 60%, #e6f0fa 100%);
  min-height: 100vh;
}

.info-section {
  padding: 2.2rem 2.2rem 1.7rem 2.2rem;
  background: #ffffff;
  border-radius: 24px;
  box-shadow: 0 2px 18px 0 rgba(25, 118, 210, 0.08);
  min-height: 370px;
  transition: box-shadow 0.19s;
}

.info-section:hover {
  box-shadow: 0 6px 32px 0 rgba(25, 118, 210, 0.16);
}

.info-title {
  color: #2c3e50;
  font-weight: 700;
  font-size: 2rem;
  text-align: center;
  margin-bottom: 0.7em;
  letter-spacing: 0.03em;
}
.gradient-info-title {
  background: linear-gradient(90deg, #1976d2 20%, #4a148c 90%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.icon-wrapper {
  width: 78px;
  height: 78px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 18px auto;
  box-shadow: 0 1px 8px 0 rgba(25, 118, 210, 0.06);
}
.icon-wrapper.blue-bg {
  background: #e8f0fe;
}
.icon-wrapper.green-bg {
  background: #e6f9f0;
}
.icon-wrapper.purple-bg {
  background: #f3e8ff;
}
.feature-title {
  font-size: 1.13rem;
  font-weight: 700;
  color: #283593;
  margin-bottom: 8px;
  letter-spacing: 0.01em;
}
.feature-description {
  font-size: 0.99rem;
  color: #5c6f7c;
  line-height: 1.63;
  padding: 0 10px;
  margin-bottom: 0;
}

.login-card {
  border-radius: 22px !important;
  box-shadow: 0 8px 40px rgba(33, 150, 243, 0.12) !important;
  border: none;
  background: #fff;
  transition: box-shadow 0.18s;
}
.login-card:hover {
  box-shadow: 0 12px 48px rgba(25, 118, 210, 0.17) !important;
}
.login-btn {
  color: #fff !important;
  text-transform: none;
  font-weight: 700;
  font-size: 1.13rem;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(76, 0, 224, 0.09);
  letter-spacing: 0.01em;
  transition: background 0.15s;
}
.gradient-btn {
  background: linear-gradient(90deg, #4a00e0 30%, #1976d2 100%) !important;
}
.forgot-password-link {
  text-decoration: underline dotted;
}
.v-text-field {
  font-size: 1.04rem;
}
.v-text-field input {
  color: #283593;
  font-weight: 500;
}
.v-checkbox-btn .v-label {
  font-size: 1.01rem;
  color: #3775c6;
  font-weight: 500;
}

a {
  text-decoration: none;
}

@media (max-width: 1200px) {
  .info-section {
    padding: 1.2rem;
  }
  .login-card {
    padding: 2rem !important;
  }
}
@media (max-width: 900px) {
  .info-section {
    min-height: 320px;
  }
  .login-card {
    padding: 1.2rem !important;
  }
}
@media (max-width: 600px) {
  .info-section,
  .login-card {
    padding: 1rem !important;
  }
  .info-section {
    min-height: auto;
  }
  .login-card {
    border-radius: 9px !important;
  }
  .icon-wrapper {
    width: 56px;
    height: 56px;
  }
}
</style>
