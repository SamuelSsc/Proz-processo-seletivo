import { createConnection } from "./api/config/data-source.config";
import { setupServer } from "./api/config/server.config";

async function setup() {
  await createConnection();
  setupServer();
}

setup();
