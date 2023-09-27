import axios from "axios";
import { describe } from "mocha";
import { expect } from "chai";

describe("Rest - StudentsResolver - getStudents", async () => {
  it("shoul return user success", async () => {
    const url = "http://localhost:3000/students";

    const response = await axios.get(url);
    console.log(response);

    expect(response.status).to.equal(200);
    expect(response.request.data).not.null;
  });
});
