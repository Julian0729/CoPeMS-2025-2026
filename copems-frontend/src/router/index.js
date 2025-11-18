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
          name: "Applicant-Homepage",
          component: () => import("@/pages/Applicant-Homepage.vue"),
        },
        {
          path: "Applicant-Login",
          name: "Applicant-Login",
          component: () => import("@/pages/Applicant-Login.vue"),
        },
        {
          path: "Applicant-Registration",
          name: "Applicant-Registration",
          component: () => import("@/pages/Applicant-Registration.vue"),
        },
        {
          path: "Applicant-bpInquiry",
          name: "Applicant-bpInquiry",
          component: () => import("@/pages/Applicant-bpInquiry.vue"),
        },
      ],
    },
    {
      path: "/applicant",
      component: () => import("@/layouts/ApplicantLayout.vue"),
      children: [],
    },
    // Building Permit Applicant Routes

    // Occupancy Permit Applicant Routes
  ],
});

export default router;
