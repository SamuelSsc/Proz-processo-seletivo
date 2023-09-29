import express, { Express } from "express";
import { StudentsResolvers } from "../rest/module/students.resolver";
import bodyParser from "body-parser";
import http from "http";
import { promises } from "dns";

let app: Express;
let server: http.Server;

export const setupServer = (): Promise<Express> => {
  return new Promise((resolve) => {
    app = express();
    const port = 3000;
    app.use(bodyParser.json());

    new StudentsResolvers(app);

    server = http.createServer(app);

    server.listen(port, () => {
      console.log(`Servidor executando na porta ${port}`);
      resolve(app);
    });
  });
};

export async function stopServer() {
  if (server) {
    server.close(() => {
      console.log("Servidor encerrado");
    });
  }
}
