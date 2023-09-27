import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import "reflect-metadata";
import { StudentEntity } from "../../data/db/entity";

const isTest = process.env.TEST;
isTest
  ? dotenv.config({ path: __dirname + "/../../../.env.test" })
  : dotenv.config();

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  url: process.env.DB_BASE_URL,
  synchronize: true,
  logging: true,
  entities: [StudentEntity],
  migrations: [],
  subscribers: [],
});

export async function createConnection() {
  console.log("Starting conect DB!");
  console.log(process.env.DB_BASE_URL, isTest);
  await AppDataSource.initialize();
  console.log("Conected...!");
}

export const dataSource = AppDataSource.manager;

export async function ClearDb() {
  await dataSource.query('TRUNCATE TABLE "student" RESTART IDENTITY CASCADE');
}

export default AppDataSource;
