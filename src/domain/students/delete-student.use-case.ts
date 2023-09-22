import { StudentsDataSource } from "../../data/students/students.db.datasource";

export class DeleteStudentUseCase {
  private readonly datasource: StudentsDataSource;
  constructor() {
    this.datasource = new StudentsDataSource();
  }

  async exec(userId: string) {
    const user = await this.datasource.findById(userId);

    if (!user.length) {
      throw new Error("Estudante não encontrado");
    }

    await this.datasource.deleteStudent(userId);
    return { data: "Estudante deletado" };
  }
}
