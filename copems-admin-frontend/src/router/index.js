import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    // Route for Main Pages
    {
      path: "/",
      component: () => import("@/layouts/MainLayout.vue"),
      children: [
        // Main Pages for All Users
        {
          path: "",
          name: "adminLanding",
          component: () => import("@/pages/adminLanding.vue"),
        },
      ],
    },
    {
      path: "/admin",
      component: () => import("@/layouts/Adminlayout.vue"),
      children: [
        // Building Permit Admin routes can be added here

        // Occupancy Permit Admin routes can be added here
        {
          path: "AdminDashboard",
          name: "AdminDashboard",
          component: () =>
            import("@/modules/OccupancyPermit/AdminDashboard.vue"),
        },
        {
          path: "OPchecklist",
          name: "OPchecklist",
          component: () => import("@/modules/OccupancyPermit/OPchecklist.vue"),
        },
      ],
    },
  ],
});

export default router;
