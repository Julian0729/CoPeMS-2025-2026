import { defineStore } from "pinia";
import { useDraftStore } from "./draft";

// Backend API base URL
const API_BASE_URL = "http://localhost:4003/api/user";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    isAuthenticated: false,
    loading: false,
  }),

  getters: {
    isLoggedIn: (state) => state.isAuthenticated,
    currentUser: (state) => state.user,
  },

  actions: {
    async login(email, password) {
      this.loading = true;

      try {
        const response = await fetch(`${API_BASE_URL}/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: email, // Backend expects 'username' field
            user_password: password, // Backend expects 'user_password' field
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Login failed");
        }

        if (data.success) {
          this.user = {
            id: data.user.User_ID,
            email: data.user.Email_Account,
            email_verified: data.user.email_verified,
            status: data.user.Status,
            role: "applicant",
          };
          this.isAuthenticated = true;

          // Store tokens and user data in localStorage
          localStorage.setItem("accessToken", data.accessToken);
          localStorage.setItem("refreshToken", data.refreshToken);
          localStorage.setItem("user", JSON.stringify(this.user));

          // Load user's draft data
          const draftStore = useDraftStore();
          await draftStore.loadDrafts();
        } else {
          throw new Error(data.message || "Login failed");
        }
      } catch (error) {
        this.user = null;
        this.isAuthenticated = false;
        console.error("Login error:", error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async register(email, password, confirmPassword) {
      this.loading = true;

      try {
        // Validate passwords match
        if (password !== confirmPassword) {
          throw new Error("Passwords do not match");
        }

        // Validate password strength
        if (password.length < 6) {
          throw new Error("Password must be at least 6 characters long");
        }

        const response = await fetch(`${API_BASE_URL}/register-no-email`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Registration failed");
        }

        if (data.success) {
          // For demo purposes, we'll automatically "verify" the email
          // In a real app, user would need to check their email

          // Auto-verify the email (since we're using register-no-email endpoint)
          const verifyResponse = await fetch(`${API_BASE_URL}/verify-email`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              token: data.data.verification_token,
            }),
          });

          const verifyData = await verifyResponse.json();

          if (verifyData.success) {
            // Now log the user in automatically
            await this.login(email, password);
            return {
              success: true,
              message: "Registration and login successful!",
            };
          } else {
            return {
              success: true,
              message: "Registration successful! Please login.",
            };
          }
        } else {
          throw new Error(data.message || "Registration failed");
        }
      } catch (error) {
        console.error("Registration error:", error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async logout() {
      const refreshToken = localStorage.getItem("refreshToken");

      // Attempt to revoke refresh token on server
      if (refreshToken) {
        try {
          await fetch(`${API_BASE_URL}/logout`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              refreshToken: refreshToken,
            }),
          });
        } catch (error) {
          console.error("Logout error:", error);
          // Continue with logout even if server request fails
        }
      }

      this.user = null;
      this.isAuthenticated = false;

      // Clear stored auth data
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");

      // Clear draft data
      const draftStore = useDraftStore();
      draftStore.clearDrafts();
    },

    // Check if user is already authenticated (e.g., on app startup)
    async checkAuth() {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");
      const userData = localStorage.getItem("user");

      if ((accessToken || refreshToken) && userData) {
        try {
          this.user = JSON.parse(userData);
          this.isAuthenticated = true;

          // Load user's draft data
          const draftStore = useDraftStore();
          await draftStore.loadDrafts();
        } catch (error) {
          // If there's an error parsing user data, clear everything
          this.logout();
        }
      }
    },
  },
});
