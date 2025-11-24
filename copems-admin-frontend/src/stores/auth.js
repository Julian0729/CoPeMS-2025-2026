// Simple Pinia store for authentication
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    isAuthenticated: false,
  }),
  actions: {
    login(email, password) {
      // Example: hardcoded credentials for demo
      if (email === "admin@example.com" && password === "password") {
        this.user = { email };
        this.isAuthenticated = true;
        return true;
      } else {
        this.user = null;
        this.isAuthenticated = false;
        return false;
      }
    },
    logout() {
      this.user = null;
      this.isAuthenticated = false;
    },
  },
});
