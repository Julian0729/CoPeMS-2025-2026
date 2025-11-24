<template>
  <div class="page-wrapper">
    <transition name="fade">
      <div class="loader-wrapper" v-if="isLoading">
        <div class="loader-content">
          <img src="@/assets/copemslogo.png" alt="CoPeMS Logo" class="loader-logo" />
          <div class="branding-text">
            <span class="main-title text-fade-in-subtle">Construction Permit</span>
            <span class="sub-title text-fade-in-subtle">Management System</span>
          </div>
        </div>
      </div>
    </transition>

    <v-main v-if="!isLoading">
      <v-container fluid class="pa-0">
        <section class="hero-section d-flex align-center justify-center">
          <div class="login-card-wrapper">
            <v-card class="login-card pa-7 elevation-8">
              <v-card-text>
                <div class="login-logo-row">
                  <img
                    src="https://www2.naga.gov.ph/wp-content/uploads/2022/05/Naga_City_Official_Seal-1.png"
                    alt="City of Naga Seal"
                    class="login-logo-naga"
                  />
                </div>
                <h2 class="login-title">Staff Login</h2>
                <v-form @submit.prevent="handleLogin" ref="loginForm">
                  <v-select
                    label="Role"
                    :items="[
                      'Administrative Aide',
                      'Engineer',
                      'Architect',
                      'Inspector',
                      'Building Official',
                    ]"
                    class="mb-3"
                  ></v-select>

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
                  ></v-text-field>

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

                  <div class="d-flex justify-space-between align-center mt-2 mb-4">
                    <v-checkbox-btn
                      label="Remember me"
                      class="ma-0 pa-0"
                      color="primary"
                    ></v-checkbox-btn>
                    <a
                      href="#"
                      class="forgot-password-link text-primary text-caption font-weight-medium"
                      >Forgot password?</a
                    >
                  </div>

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
                    {{ loading ? "Signing in..." : "Sign In" }}
                  </v-btn>

                  <div class="text-center mt-6">
                    <span class="text-grey-darken-1"
                      >Need access? Contact your system administrator</span
                    >
                  </div>
                </v-form>
              </v-card-text>
            </v-card>
          </div>
        </section>
      </v-container>
    </v-main>
  </div>
</template>

<script>
import { useAuthStore } from "@/stores/auth";
import nagaImage from "@/assets/naga.png";

export default {
  name: "HomePage",
  data() {
    return {
      isLoading: true,
      backgroundImageUrl: nagaImage,
      email: "",
      password: "",
      showPassword: false,
      loading: false,
      alertMessage: "",
      alertType: "error",
      emailRules: [
        (v) => !!v || "Email is required",
        (v) => /.+@.+\..+/.test(v) || "Email must be valid",
      ],
      passwordRules: [(v) => !!v || "Password is required"],
    };
  },
  mounted() {
    setTimeout(() => {
      this.isLoading = false;
    }, 3000);
  },
  methods: {
    toggleShowPassword() {
      this.showPassword = !this.showPassword;
    },
    async handleLogin() {
      const { valid } = await this.$refs.loginForm.validate();
      if (!valid) {
        return;
      }

      this.loading = true;
      this.alertMessage = "";

      try {
        const authStore = useAuthStore();
        const success = await authStore.login(this.email, this.password);

        if (success) {
          this.alertType = "success";
          this.alertMessage = "Login successful!";

          setTimeout(() => {
            this.$router.push("/applicant/OPapply");
          }, 1000);
        }
      } catch (error) {
        this.alertType = "error";
        this.alertMessage =
          error.message || "Login failed. Please check your credentials.";
      } finally {
        this.loading = false;
      }
    },
    goToLogin() {
      window.location.href = "/alogin";
    },
  },
};
</script>

<style scoped>
/* ================================== */
/* LOADER STYLES */
/* ================================== */

.loader-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f7fafd;
  z-index: 9999;
}
.loader-content {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  gap: 15px;
}
.loader-logo {
  width: 180px;
  height: 180px;
  object-fit: contain;
}
.branding-text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  line-height: 0.9;
}
.main-title {
  font-size: 3.2rem;
  font-weight: 800;
  color: #1a355e;
  font-family: "Segoe UI", "Roboto", Arial, sans-serif;
  line-height: 1.1;
}
.sub-title {
  font-size: 2.1rem;
  font-weight: 700;
  color: #f3921b;
  font-family: "Segoe UI", "Roboto", Arial, sans-serif;
  margin-top: 0.1em;
  line-height: 1.1;
}

@keyframes textFadeInSubtle {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.text-fade-in-subtle {
  animation: textFadeInSubtle 1s ease-out forwards;
  animation-delay: 0.2s;
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

/* ================================== */
/* EXISTING LOGIN PAGE STYLES */
/* ================================== */

.page-wrapper {
  background-color: #f7f7f7;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.nav-links .v-btn {
  text-transform: none !important;
  font-weight: 500;
  font-size: 17px;
}

.hero-section {
  width: 100vw;
  height: 100vh;
  background-image: url("@/assets/naga.png");
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  color: white;
  padding: 0 16px;
  overflow: hidden;
}

.hero-section::before {
  content: none;
}

.hero-content {
  max-width: 1600px;
  position: relative;
  z-index: 2;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 12px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  color: white;
}

.hero-subtitle {
  font-size: 1.25rem;
  font-weight: 400;
  line-height: 1.5;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

.v-btn {
  text-transform: none;
  font-weight: 600;
  font-size: 1rem;
  border-radius: 8px;
  box-shadow: none;
}

.v-btn.v-size--large {
  height: 48px;
}

.v-btn.text-white {
  color: white !important;
  border-color: white;
}

@media (max-width: 960px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }
}

.login-logo-row {
  display: flex;
  justify-content: center;
  margin-bottom: 8px;
}
.login-logo-naga {
  width: 75px;
  height: 75px;
  object-fit: contain;
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(25, 118, 210, 0.12);
  background: #fff;
  border: 2px solid #e0e0e0;
}
.login-title {
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 18px;
  margin-top: 0;
  color: #222;
  font-family: "Segoe UI", "Roboto", Arial, sans-serif;
}
.login-card-wrapper {
  position: absolute;
  top: 50%;
  right: 6vw;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  z-index: 20;
}

.login-card {
  border-radius: 22px !important;
  box-shadow: 0 8px 40px rgba(33, 150, 243, 0.12) !important;
  border: none;
  background: #ffffffea;
  transition: box-shadow 0.18s;
  width: 450px;
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
</style>
