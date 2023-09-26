import { StudentsDataSource } from "../../data/students/students.db.datasource";
import {
  UpdateUserInputModel,
  maritalStatusMapping,
  sexMapping,
} from "../model";

export class UpdateStudentUseCase {
  private readonly datasource: StudentsDataSource;
  constructor() {
    this.datasource = new StudentsDataSource();
  }

  async exec(input: UpdateUserInputModel, userId: string) {
    const user = await this.datasource.findById(userId);
    if (!user.length) {
      throw new Error("Estudante não encontrado");
    }

    if (
      !!input.maritalStatus &&
      maritalStatusMapping[input.maritalStatus] === undefined
    ) {
      throw new Error(`Valor de estado civil inválido: ${input.maritalStatus}`);
    }

    if (!!input.sex && sexMapping[input.sex] === undefined) {
      throw new Error(`Valor de sexo inválido: ${input.sex}`);
    }

    return await this.datasource.updateStudent({
      ...input,
      id: userId,
      maritalStatus: input.maritalStatus
        ? maritalStatusMapping[input.maritalStatus]
        : undefined,
      sex: input.sex ? sexMapping[input.sex] : undefined,
    });
  }
}
