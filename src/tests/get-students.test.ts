import axios from "axios";
import { describe } from "mocha";
import { expect } from "chai";
import { CreateStudent, defaultStudent } from "./seeds/create-student";
import { ClearDb, dataSource } from "../api/config/data-source.config";
import { parse } from "date-fns";
import { StudentEntity } from "../data/db/entity";

describe("Rest - StudentsResolver - getStudents", async () => {
  const url = "http://localhost:3000/students";

  afterEach(async function () {
    await ClearDb();
  });

  it.only("shoul return user success", async () => {
    await CreateStudent();

    const response = await axios.get(url);
    const studentsDb = await dataSource.find(StudentEntity);

    expect(response.status).to.equal(200);
    expect(response.request.data).not.null;
    expect(response.data[0].name).to.be.eq(defaultStudent.name);
    expect(response.data[0].maritalStatus).to.be.eq(
      defaultStudent.maritalStatus
    );
    expect(response.data[0].email).to.be.eq(defaultStudent.email);
    expect(response.data[0].cpf).to.be.eq(defaultStudent.cpf);
    expect(response.data[0].rg).to.be.eq(defaultStudent.rg);
    expect(new Date(response.data[0].birthDate).getTime()).to.be.eq(
      parse(defaultStudent.birthDate, "dd-MM-yyyy", new Date()).getTime()
    );
    expect(response.data[0].sex).to.be.eq(defaultStudent.sex);
    expect({
      ...response.data[0],
      birthDate: new Date(response.data[0].birthDate),
    }).to.be.deep.eq(studentsDb[0]);
  });
});
