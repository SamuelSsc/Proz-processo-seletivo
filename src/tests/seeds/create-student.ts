import { DataSource } from "typeorm";
import { StudentEntity } from "../../data/db/entity";
import { MaritalStatusType, SexType } from "../../domain/model";
import { dataSource } from "../../api/config/data-source.config";
import { parse } from "date-fns";

export const defaultStudent = {
  name: "Default Student",
  email: "DefaultStudent@gmail.com",
  cpf: "638.772.040-07",
  rg: "63.877.204-07",
  birthDate: "21-10-2002",
  maritalStatus: MaritalStatusType.divorced,
  sex: SexType.male,
};

export const CreateStudent = async () => {
  const student = new StudentEntity();
  student.email = defaultStudent.email;
  student.birthDate = parse(defaultStudent.birthDate, "dd-MM-yyyy", new Date());
  student.cpf = defaultStudent.cpf;
  student.maritalStatus = defaultStudent.maritalStatus;
  student.name = defaultStudent.name;
  student.rg = defaultStudent.rg;
  student.sex = defaultStudent.sex;

  await dataSource.save(student);

  return student;
};
