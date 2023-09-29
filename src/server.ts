import { createConnection } from "./api/config/data-source.config";
import { setupServer } from "./api/config/server.config";

export async function setup() {
  await createConnection();
  await setupServer();
}
