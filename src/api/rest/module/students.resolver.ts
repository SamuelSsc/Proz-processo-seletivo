import { Application } from "express";
import { StudentsUseCase } from "../../../domain/students";
import { Service } from "typedi";

export class StudentsResolvers {
  private readonly studentsUseCase: StudentsUseCase;

  constructor(private app: Application) {
    this.studentsUseCase = new StudentsUseCase();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.app.get("/students", (req, res) => {
      res.json(this.studentsUseCase.getStudents());
    });
  }
}
