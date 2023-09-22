import express from "express";
import { StudentsResolvers } from "../rest/module/students.resolver";
import bodyParser from "body-parser";

export function setupServer() {
  const app = express();
  const port = 3000;
  app.use(bodyParser.json());

  new StudentsResolvers(app);

  app.listen(port, () => {
    console.log(`Server executing on port ${port}`);
  });
}
