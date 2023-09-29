import { StudentsDataSource } from "../../data/students/students.db.datasource";

export class DeleteStudentUseCase {
  private readonly datasource: StudentsDataSource;
  constructor() {
    this.datasource = new StudentsDataSource();
  }

  async exec(studentId: string) {
    const student = await this.datasource.findById(studentId);

    if (!student.length) {
      throw new Error("Estudante não encontrado");
    }

    await this.datasource.deleteStudent(studentId);
    return { data: "Estudante deletado" };
  }
}
