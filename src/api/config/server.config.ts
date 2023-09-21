import express from "express";
import { StudentsResolvers } from "../rest/module/students.resolver";

export function setupServer() {
  const app = express();
  const port = 3000;

  new StudentsResolvers(app);

  app.listen(port, () => {
    console.log(`Server executing on port ${port}`);
  });
}
