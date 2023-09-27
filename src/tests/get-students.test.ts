import axios from "axios";
import { describe } from "mocha";
import { expect } from "chai";
import { CreateStudent, defaultStudent } from "./seeds/create-student";
import { ClearDb } from "../api/config/data-source.config";
import { parse } from "date-fns";

describe("Rest - StudentsResolver - getStudents", async () => {
  const url = "http://localhost:3000/students";

  afterEach(async function () {
    await ClearDb();
  });

  it("shoul return user success", async () => {
    await CreateStudent();

    const response = await axios.get(url);

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
  });
});
