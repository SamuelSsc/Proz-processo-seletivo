import axios, { AxiosError } from "axios";
import { describe } from "mocha";
import { expect } from "chai";
import { CreateStudent, defaultStudent } from "./seeds/create-student";
import { ClearDb } from "../api/config/data-source.config";
import { parse } from "date-fns";
import { createReadStream, readFile } from "fs";
import path from "path";
import { blob } from "stream/consumers";
import FormData from "form-data";

describe("Rest - StudentsResolver - uploadSpreadsheet", async () => {
  const url = "http://localhost:3000/upload";
  const pathToSpreadsheet = path.join(__dirname, "./spreadsheets");
  let data: FormData;

  afterEach(async function () {
    await ClearDb();
  });

  beforeEach(() => {
    data = new FormData();
  });

  it("should store students in database with success", async () => {
    const expectResponse = { data: "Os dados foram inseridos com sucesso" };

    data.append(
      "file",
      createReadStream(pathToSpreadsheet + "/planilha_alunos.xlsx")
    );

    const response = await axios.post(url, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    expect(response.data).to.be.deep.eq(expectResponse);
    expect(response.status).to.be.eq(200);
    //Verificar se os user estão no banco certinho
  });

  it("should return error invalid format of spreadsheet", async () => {
    const expectResponse = {
      error: "O tipo do arquivo é de um formato inválido",
    };

    data.append(
      "file",
      createReadStream(
        pathToSpreadsheet + "/planilha_alunos_invalid_format.pdf"
      )
    );

    try {
      await axios.post(url, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error: any) {
      expect(error.response.data).to.be.deep.eq(expectResponse);
      expect(error.response.status).to.be.eq(400);
    }
  });

  it("should return error invalid format of spreadsheet", async () => {
    const expectResponse = {
      error: "O tipo do arquivo é de um formato inválido",
    };

    data.append(
      "file",
      createReadStream(
        pathToSpreadsheet + "/planilha_alunos_invalid_format.pdf"
      )
    );

    try {
      await axios.post(url, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error: any) {
      expect(error.response.data).to.be.deep.eq(expectResponse);
      expect(error.response.status).to.be.eq(400);
    }
  });

  it("should return error spreadsheet not found", async () => {
    const expectResponse = {
      error: "planilha não encontrada",
    };

    try {
      await axios.post(url, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error: any) {
      expect(error.response.data).to.be.deep.eq(expectResponse);
      expect(error.response.status).to.be.eq(400);
    }
  });

  it("should return error invalid civil state", async () => {
    const expectResponse = {
      error: "Valor de estado civil inválido: NAMORANDO",
    };

    data.append(
      "file",
      createReadStream(
        pathToSpreadsheet + "/planilha_alunos_invalid-civil-state.xlsx"
      )
    );

    try {
      await axios.post(url, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error: any) {
      expect(error.response.data).to.be.deep.eq(expectResponse);
      expect(error.response.status).to.be.eq(400);
    }
  });

  it("should return error invalid civil state", async () => {
    const expectResponse = {
      error: "Valor de estado civil inválido: NAMORANDO",
    };

    data.append(
      "file",
      createReadStream(
        pathToSpreadsheet + "/planilha_alunos_invalid-civil-state.xlsx"
      )
    );

    try {
      await axios.post(url, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
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

    data.append(
      "file",
      createReadStream(pathToSpreadsheet + "/planilha_alunos_sex_invalid.xlsx")
    );

    try {
      await axios.post(url, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error: any) {
      expect(error.response.data).to.be.deep.eq(expectResponse);
      expect(error.response.status).to.be.eq(400);
    }
  });
});
