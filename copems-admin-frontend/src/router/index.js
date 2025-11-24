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
            import(
              "@/modules/OccupancyPermit/Admin-opVerification/AdminDashboard.vue"
            ),
        },
        {
          path: "OPchecklist",
          name: "OPchecklist",
          component: () =>
            import(
              "@/modules/OccupancyPermit/Admin-opVerification/OPchecklist.vue"
            ),
        },
        {
          path: "TechstaffDashboard",
          name: "TechstaffDashboard",
          component: () =>
            import(
              "@/modules/OccupancyPermit/Admin-opScheduling/TechstaffDashboard.vue"
            ),
        },
        {
          path: "VerifiedApplication",
          name: "VerifiedApplication",
          component: () =>
            import(
              "@/modules/OccupancyPermit/Admin-opScheduling/VerifiedApplication.vue"
            ),
        },
        {
          path: "VerifiedChecklist",
          name: "VerifiedChecklist",
          component: () =>
            import(
              "@/modules/OccupancyPermit/Admin-opScheduling/VerifiedChecklist.vue"
            ),
        },
        {
          path: "ChiefInspectorDashboard",
          name: "ChiefInspectorDashboard",
          component: () =>
            import(
              "@/modules/OccupancyPermit/Admin-opInspection/ChiefInspectorDashboard.vue"
            ),
        },
        {
          path: "InspectorDashboard",
          name: "InspectorDashboard",
          component: () =>
            import(
              "@/modules/OccupancyPermit/Admin-opInspection/InspectorDashboard.vue"
            ),
        },
        {
          path: "ReportInput",
          name: "ReportInput",
          component: () =>
            import(
              "@/modules/OccupancyPermit/Admin-opInspection/ReportInput.vue"
            ),
        },
        {
          path: "ReportViewing",
          name: "ReportViewing",
          component: () =>
            import(
              "@/modules/OccupancyPermit/Admin-opInspection/ReportViewing.vue"
            ),
        },
      ],
    },
  ],
});

export default router;
