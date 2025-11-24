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
        {
          path: "Applicant-opInquiry",
          name: "Applicant-opInquiry",
          component: () => import("@/pages/Applicant-opInquiry.vue"),
        },
      ],
    },
    {
      path: "/applicant",
      component: () => import("@/layouts/ApplicantLayout.vue"),
      children: [
        // Building Permit Applicant Routes
        {
          path: "bpcharacter",
          name: "bpcharacter",
          component: () =>
            import(
              "@/module/BuildingPermit/BuildingPermitApplication/bpcharacter.vue"
            ),
        },
        {
          path: "bpconstruction",
          name: "bpconstruction",
          component: () =>
            import(
              "@/module/BuildingPermit/BuildingPermitApplication/bpconstruction.vue"
            ),
        },
        {
          path: "bpowner",
          name: "bpowner",
          component: () =>
            import(
              "@/module/BuildingPermit/BuildingPermitApplication/bpowner.vue"
            ),
        },
        {
          path: "bpsignatories",
          name: "bpsignatories",
          component: () =>
            import(
              "@/module/BuildingPermit/BuildingPermitApplication/bpsignatories.vue"
            ),
        },
        {
          path: "bpuploadingofplans",
          name: "bpuploadingofplans",
          component: () =>
            import(
              "@/module/BuildingPermit/BuildingPermitApplication/bpuploadingofplans.vue"
            ),
        },
                {
          path: "bpancillary",
          name: "bpancillary",
          component: () =>
            import(
              "@/module/BuildingPermit/BuildingPermitApplication/bpancillary.vue"
            ),
        },
        {
          path: "bpnavigation",
          name: "bpnavigation",
          component: () =>
            import(
              "@/module/BuildingPermit/BuildingPermitApplication/bpnavigation.vue"
            ),
        },

        // Occupancy Permit Applicant Routes
        {
          path: "FormsSection",
          name: "FormsSection",
          component: () =>
            import(
              "@/module/OccupancyPermit/OccupancyApplications/FormsSection.vue"
            ),
        },
        {
          path: "OPapply",
          name: "OPapply",
          component: () =>
            import(
              "@/module/OccupancyPermit/OccupancyApplications/OPapply.vue"
            ),
        },
        {
          path: "OPlocation",
          name: "OPlocation",
          component: () =>
            import(
              "@/module/OccupancyPermit/OccupancyApplications/OPlocation.vue"
            ),
        },
        {
          path: "OPowner",
          name: "OPowner",
          component: () =>
            import(
              "@/module/OccupancyPermit/OccupancyApplications/OPowner.vue"
            ),
        },
        {
          path: "OPowner",
          name: "OPowner",
          component: () =>
            import(
              "@/module/OccupancyPermit/OccupancyApplications/OPowner.vue"
            ),
        },
        {
          path: "OPtype",
          name: "OPtype",
          component: () =>
            import("@/module/OccupancyPermit/OccupancyApplications/OPtype.vue"),
        },
      ],
    },
  ],
});
export default router;
