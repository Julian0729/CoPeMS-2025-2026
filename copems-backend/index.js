import express from "express";
import cors from "cors";
import "dotenv/config";

import auth from "./routes/auth.js";
import bldg_owner_procedures from "./routes/procedures/bldg_owner_procedures.js";

const app = express();
const PORT = 4000;

const routes = [
  { path: "/api/auth", handler: auth },
  { path: "/api/bldg-owner-procedures", handler: bldg_owner_procedures },
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
