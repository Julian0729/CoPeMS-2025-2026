<template>
  <div class="page-wrapper">
    <v-main>
      <v-container class="fill-height pa-8" fluid>
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
                Create Account
              </v-card-title>
              <v-card-subtitle class="text-center mb-6 text-grey-darken-1">
                Register to access our services
              </v-card-subtitle>
              <v-card-text>
                <v-form @submit.prevent="handleRegister" ref="registrationForm">
                  <v-text-field
                    v-model="email"
                    label="Email Address"
                    density="comfortable"
                    variant="outlined"
                    class="mb-4"
                    prepend-inner-icon="mdi-email-outline"
                    :rules="emailRules"
                    type="email"
                    required
                  />
                  <v-text-field
                    v-model="password"
                    :type="showPassword ? 'text' : 'password'"
                    label="Password"
                    density="comfortable"
                    variant="outlined"
                    prepend-inner-icon="mdi-lock-outline"
                    :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append-inner="toggleShowPassword"
                    class="mb-2"
                    :rules="passwordRules"
                    required
                  />
                  <v-text-field
                    v-model="confirmPassword"
                    :type="showConfirmPassword ? 'text' : 'password'"
                    label="Confirm Password"
                    density="comfortable"
                    variant="outlined"
                    prepend-inner-icon="mdi-lock-check-outline"
                    :append-inner-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append-inner="toggleShowConfirmPassword"
                    class="mb-2"
                    :rules="confirmPasswordRules"
                    required
                  />

                  <!-- Error/Success Messages -->
                  <v-alert
                    v-if="alertMessage"
                    :type="alertType"
                    class="mb-4"
                    :icon="
                      alertType === 'success' ? 'mdi-check-circle' : 'mdi-alert-circle'
                    "
                  >
                    {{ alertMessage }}
                  </v-alert>

                  <v-btn
                    block
                    color="primary"
                    size="large"
                    class="login-btn gradient-btn"
                    type="submit"
                    :loading="loading"
                    :disabled="loading"
                  >
                    {{ loading ? "Creating Account..." : "Register" }}
                  </v-btn>
                  <div class="text-center mt-6">
                    <span class="text-grey-darken-1">Already have an account?</span>
                    <router-link to="/Applicant-Login" class="text-primary font-weight-bold ms-1"
                      >Login</router-link>
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
import { useAuthStore } from "@/stores/auth";

export default {
  name: "RegistrationPage",
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: "",
      showPassword: false,
      showConfirmPassword: false,
      loading: false,
      alertMessage: "",
      alertType: "error",
      emailRules: [
        (v) => !!v || "Email is required",
        (v) => /.+@.+\..+/.test(v) || "Email must be valid",
      ],
      passwordRules: [
        (v) => !!v || "Password is required",
        (v) => (v && v.length >= 6) || "Password must be at least 6 characters long",
      ],
      confirmPasswordRules: [
        (v) => !!v || "Please confirm your password",
        (v) => v === this.password || "Passwords do not match",
      ],
    };
  },
  methods: {
    toggleShowPassword() {
      this.showPassword = !this.showPassword;
    },
    toggleShowConfirmPassword() {
      this.showConfirmPassword = !this.showConfirmPassword;
    },
    async handleRegister() {
      // Validate form
      const { valid } = await this.$refs.registrationForm.validate();
      if (!valid) {
        return;
      }

      this.loading = true;
      this.alertMessage = "";

      try {
        const authStore = useAuthStore();
        const result = await authStore.register(this.email, this.password, this.confirmPassword);

        this.alertType = "success";
        this.alertMessage = result.message;

        // If registration and auto-login was successful, redirect
        if (authStore.isAuthenticated) {
          setTimeout(() => {
            this.$router.push("/applicant/OPapply");
          }, 2000);
        } else {
          // If just registration was successful, redirect to login
          setTimeout(() => {
            this.$router.push("/Applicant-Login");
          }, 2000);
        }
      } catch (error) {
        this.alertType = "error";
        this.alertMessage = error.message || "Registration failed. Please try again.";
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
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
  box-shadow: 0 6px 32px 0 rgba(25, 118, 210, 0.13);
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
  background-clip: text;
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
.v-text-field {
  font-size: 1.04rem;
}
.v-text-field input {
  color: #283593;
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
