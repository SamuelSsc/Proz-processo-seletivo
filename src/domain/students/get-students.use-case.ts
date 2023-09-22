import { StudentsDataSource } from "../../data/students/students.db.datasource";

export class GetStudentsUseCase {
  private readonly datasource: StudentsDataSource;
  constructor() {
    this.datasource = new StudentsDataSource();
  }

  async exec() {
    return await this.datasource.getStudents();
  }
}
