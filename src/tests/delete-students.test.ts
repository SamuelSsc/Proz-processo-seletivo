import axios from "axios";
import { describe } from "mocha";
import { expect } from "chai";
import { CreateStudent } from "./seeds/create-student";
import { ClearDb, dataSource } from "../api/config/data-source.config";
import { StudentEntity } from "../data/db/entity";

describe("Rest - StudentsResolver - deleteStudents", async () => {
  const url = "http://localhost:3000/delete-student";

  afterEach(async function () {
    await ClearDb();
  });

  it("should deleted student with success", async () => {
    const expectResponse = { data: "Estudante deletado" };
    const student = await CreateStudent();

    const response = await axios.delete(`${url}/${student.id}`);
    const studentDb = await dataSource.findOneBy(StudentEntity, {
      id: student.id,
    });

    expect(response.data).to.be.deep.eq(expectResponse);
    expect(response.status).to.be.eq(200);
    expect(studentDb).is.null;
  });

  it("should return student not found", async () => {
    const expectResponse = { error: "Estudante não encontrado" };
    const invalidId = 123456789;

    try {
      await axios.delete(`${url}/${invalidId}`);
    } catch (error: any) {
      expect(error.response.data).to.be.deep.eq(expectResponse);
      expect(error.response.status).to.be.eq(400);
    }
  });
});
