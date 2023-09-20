import { DataSource } from "typeorm";
import * as dotenv from "dotenv";

const isTest = process.env.TEST;
isTest
  ? dotenv.config({ path: __dirname + "../../../.env.test" })
  : dotenv.config();

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  url: process.env.DB_BASE_URL,
  synchronize: true,
  logging: true,
  entities: [], // Adicione todas as suas entidades aqui
  migrations: [],
  subscribers: [],
});

export async function createConnection() {
  console.log("Starting conect DB!");
  await AppDataSource.initialize();
  console.log("Conected...!");
}

export default AppDataSource;
