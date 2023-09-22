import { Repository } from "typeorm";
import { StudentEntity } from "../db/entity";
import AppDataSource from "../../api/config/data-source.config";
import { StudentModel } from "../../domain/model";

export class StudentsDataSource {
  private readonly repository: Repository<StudentEntity> =
    AppDataSource.getRepository(StudentEntity);

  getStudents() {
    return this.repository.find();
  }

  insertStudents(input: StudentModel[]) {
    return this.repository.insert(input);
  }
}
