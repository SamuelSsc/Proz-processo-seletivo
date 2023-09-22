import { StudentsDataSource } from "../../data/students/students.db.datasource";
import { UpdateUserInputModel } from "../model";

export class UpdateStudentUseCase {
  private readonly datasource: StudentsDataSource;
  constructor() {
    this.datasource = new StudentsDataSource();
  }

  async exec(input: UpdateUserInputModel, userId: string) {
    const user = await this.datasource.findById(userId);

    if (!user) {
      throw new Error("Estudante não encontrado");
    }

    //Lançar erro se input for invalido type

    return await this.datasource.updateStudent({ ...input, id: userId });
  }
}
