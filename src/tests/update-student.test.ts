import axios from "axios";
import { describe } from "mocha";
import { expect } from "chai";
import { CreateStudent } from "./seeds/create-student";
import { ClearDb, dataSource } from "../api/config/data-source.config";
import { StudentEntity } from "../data/db/entity";
import { MaritalStatusType, SexType } from "../domain/model";

describe("Rest - StudentsResolver - updateStudents", async () => {
  const url = "http://localhost:3000/update-student/";

  afterEach(async function () {
    await ClearDb();
  });

  it("should update student info with success", async () => {
    const expectResponse = "Usuário atualizado com sucesso";
    const student = await CreateStudent();

    const response = await axios.put(`${url}${student.id}`, {
      name: "New Name Student",
      email: "newStudentMail@gmail.com",
      sex: SexType.other,
      maritalStatus: MaritalStatusType.married,
    });

    const studentDb = await dataSource.findOneBy(StudentEntity, {
      id: student.id,
    });
    studentDb?.birthDate;
    const responseFormated = {
      ...response.data.student,
      birthDate: new Date(response.data.student.birthDate),
    };

    expect(response.data.message).to.be.deep.eq(expectResponse);
    expect(response.status).to.be.eq(200);
    expect(responseFormated).to.be.deep.eq(studentDb);
  });

  it("should return student not found", async () => {
    const expectResponse = { error: "Estudante não encontrado" };
    const invalidId = 123456789;

    try {
      await axios.put(`${url}${invalidId}`);
    } catch (error: any) {
      expect(error.response.data).to.be.deep.eq(expectResponse);
      expect(error.response.status).to.be.eq(400);
    }
  });

  it("should return error invalid civil state", async () => {
    const expectResponse = {
      error: "Valor de estado civil inválido: NAMORANDO",
    };
    const student = await CreateStudent();

    try {
      await axios.put(`${url}${student.id}`, {
        maritalStatus: "NAMORANDO",
      });
    } catch (error: any) {
      expect(error.response.data).to.be.deep.eq(expectResponse);
      expect(error.response.status).to.be.eq(400);
    }
  });

  it("should return error invalid sex", async () => {
    const expectResponse = {
      error: "Valor de sexo inválido: ABCDE",
    };
    const student = await CreateStudent();

    try {
      await axios.put(`${url}${student.id}`, {
        sex: "ABCDE",
      });
    } catch (error: any) {
      expect(error.response.data).to.be.deep.eq(expectResponse);
      expect(error.response.status).to.be.eq(400);
    }
  });
});
