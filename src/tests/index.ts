import AppDataSource from "../api/config/data-source.config";
import { stopServer } from "../api/config/server.config";
import { setup } from "../server";

before(async () => {
  await setup();
});

after(async () => {
  await AppDataSource.destroy();
  await stopServer();
});

require("./get-students.test");
require("./upload.spreadsheet.test");
require("./delete-students.test");
