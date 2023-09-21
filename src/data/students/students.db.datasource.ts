import { Repository } from "typeorm";
import { StudentEntity } from "../db/entity";
import AppDataSource from "../../api/config/data-source.config";

export class StudentsDataSource {
  private readonly repository: Repository<StudentEntity> =
    AppDataSource.getRepository(StudentEntity);

  getStudents() {
    return this.repository.find();
  }
}
