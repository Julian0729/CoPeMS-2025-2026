import express from "express";
import cors from "cors";
import "dotenv/config";

import auth from "./routes/auth.js";
import bpConstructionRoutes from "./routes/bp_construction.js";
import characterOfOccupancyRoutes from "./routes/character_of_occupancy.js";
import projectDetailsRoutes from "./routes/project_details.js";
import occupancyTypeRoutes from "./routes/occupancy_type.js";
import engineerInformationRoutes from "./routes/engineer_information.js";

const app = express();
const PORT = 4000;

const routes = [
  { path: "/api/auth", handler: auth },
  { path: "/api/bp_construction", handler: bpConstructionRoutes },
  { path: "/api/occupancy", handler: characterOfOccupancyRoutes },
  { path: "/api/project-details", handler: projectDetailsRoutes },
  { path: "/api/occupancy-type", handler: occupancyTypeRoutes },
  { path: "/api/engineer-information", handler: engineerInformationRoutes },
];

app.use(cors());
app.use(express.json());

routes.forEach((route) => {
  app.use(route.path, route.handler);
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log("\nCTRL + C to stop the server\n");
});
