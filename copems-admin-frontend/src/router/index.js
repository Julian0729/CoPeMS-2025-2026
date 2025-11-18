import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: () => import("@/layouts/MainLayout.vue"),
      children: [
        {
          path: "",
          name: "Admin-LandingPage",
          component: () => import("@/pages/Admin-LandingPage.vue"),
        },
        {
          path: "Admin-Usermanagement",
          name: "Admin-Usermanagement",
          component: () => import("@/pages/Admin-Usermanagement.vue"),
        },
      ],
    },
    {
      path: "/admin",
      component: () => import("@/layouts/AdminLayout.vue"),
      children: [],
    },
    // Building Permit Applicant Routes

    // Occupancy Permit Applicant Routes
  ],
});

export default router;
