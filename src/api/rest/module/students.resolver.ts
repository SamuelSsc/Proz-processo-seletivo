import { Application } from "express";
import { GetStudentsUseCase } from "../../../domain/students";

export class StudentsResolvers {
  private readonly getStudentsUseCase: GetStudentsUseCase;

  constructor(private app: Application) {
    this.getStudentsUseCase = new GetStudentsUseCase();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.app.get("/students", async (req, res) => {
      res.json(await this.getStudentsUseCase.exec());
    });
  }
}
