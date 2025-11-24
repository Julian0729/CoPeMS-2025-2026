/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from "@/plugins";

// Components
import App from "./App.vue";

// Composables
import { createApp } from "vue";
import router from "@/router";
import { useAuthStore } from "@/stores/auth";

// Styles
import "unfonts.css";

const app = createApp(App);

registerPlugins(app);
app.use(router);

app.mount("#app");

// Initialize auth store and check for existing authentication after mount
app.config.globalProperties.$nextTick(() => {
  try {
    const authStore = useAuthStore();
    authStore.checkAuth();
  } catch (error) {
    console.warn("Auth store initialization warning:", error);
  }
});
