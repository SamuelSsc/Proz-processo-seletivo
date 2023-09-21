import { StudentsDataSource } from "../../data/students/students.db.datasource";

export class StudentsUseCase {
  private readonly datasource: StudentsDataSource;
  constructor() {
    this.datasource = new StudentsDataSource();
  }

  getStudents = () => {
    return this.datasource.getStudents();
  };
}
