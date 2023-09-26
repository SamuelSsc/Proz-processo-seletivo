import { Repository } from "typeorm";
import { StudentEntity } from "../db/entity";
import AppDataSource from "../../api/config/data-source.config";
import { MaritalStatusType, SexType, StudentModel } from "../../domain/model";

interface UpdateStudentsParams {
  id: string;
  name?: string;
  maritalStatus?: MaritalStatusType;
  email?: string;
  sex?: SexType;
}

export class StudentsDataSource {
  private readonly repository: Repository<StudentEntity> =
    AppDataSource.getRepository(StudentEntity);

  getStudents() {
    return this.repository.find();
  }

  findById(userId: string) {
    return this.repository.findBy({ id: +userId });
  }

  insertStudents(input: StudentModel[]) {
    return this.repository.insert(input);
  }

  async updateStudent(input: UpdateStudentsParams) {
    await this.repository.update(input.id, {
      name: input.name,
      maritalStatus: input.maritalStatus,
      email: input.email,
      sex: input.sex,
    });
    return this.repository.findOneOrFail({ where: { id: +input.id } });
  }

  deleteStudent(userId: string) {
    return this.repository.delete({ id: +userId });
  }
}
