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
        {
          path: "ListPlan",
          name: "ListPlan",
          component: () =>
            import(
              "@/modules/BuildingPermit/Admin-bpEvaluators/ListPlan.vue"
            ),
        },
        {
          path: "PlanInformation",
          name: "PlanInformation",
          component: () =>
            import(
              "@/modules/BuildingPermit/Admin-bpEvaluators/PlanInformation.vue"
            ),
        },

        {
          path: "PlanEvaluationAssessment",
          name: "PlanEvaluationAssessment",
          component: () =>
            import(
              "@/modules/BuildingPermit/Admin-bpEvaluators/PlanEvaluationAssessment.vue"
            ),
        },
        {
          path: "ApprovedPlans",
          name: "ApprovedPlans",
          component: () =>
            import(
              "@/modules/BuildingPermit/Admin-bpVerification/ApprovedPlans.vue"
            ),
        },
        {
          path: "PhysicalPlanVerification",
          name: "PhysicalPlanVerification",
          component: () =>
            import(
              "@/modules/BuildingPermit/Admin-bpVerification/PhysicalPlanVerification.vue"
            ),
          props: true,
        },
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

        {
          path: "ComplianceMonitoring",
          name: "ComplianceMonitoring",
          component: () =>
            import("@/modules/ComplianceMonitoring/Compliance/compliance.vue"), // Or any other component for the root
        },

        {
          path: "rqmonitoring",
          name: "rqmonitoring",
          component: () =>
            import(
              "@/modules/ComplianceMonitoring/RQMonitoring/rqmonitoring.vue"
            ), // Or any other component for the root
        },

        {
          path: "applicantinfo",
          name: "applicantinfo",
          component: () =>
            import(
              "@/modules/ComplianceMonitoring/ApplicantInfo/applicantinfo.vue"
            ), // Or any other component for the root
        },
        {
          path: "Testingarea",
          name: "Testingarea",
          component: () => import("@/modules/OccupancyPermit/Testingarea.vue"), // Or any other component for the root
        },

        // Compliance Monitoring Router
      ],
    },
  ],
});

export default router;
