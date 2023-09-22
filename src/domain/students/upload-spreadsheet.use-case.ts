import { StudentsDataSource } from "../../data/students/students.db.datasource";
import { GetStudentsFromSpreadsheetDto } from "../dto/students.dto";
import { parse } from "date-fns";

export class UploadSpreadsheetUseCase {
  private readonly datasource: StudentsDataSource;
  constructor() {
    this.datasource = new StudentsDataSource();
  }

  async exec(uploadedFile?: Express.Multer.File) {
    if (!uploadedFile) {
      throw new Error("planilha não encontrada");
    }

    if (
      !(
        uploadedFile.mimetype ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        uploadedFile.mimetype === "application/vnd.ms-excel"
      )
    ) {
      throw new Error("O tipo do arquivo é de um formato inválido");
    }

    const XLSX = require("xlsx");

    const workbook = XLSX.read(uploadedFile?.buffer);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data: GetStudentsFromSpreadsheetDto[] = XLSX.utils.sheet_to_json(
      worksheet,
      {
        header: 4,
        raw: false,
        defval: null,
        blankrows: false,
        dateNF: "dd-mm-yyyy",
        range: 4,
      }
    );

    const mappedData = data.map((student) => {
      const dateParts = student["Data de Nascimento"].split("/");
      const formattedDay =
        dateParts[0].length === 1 ? `0${dateParts[0]}` : dateParts[0];
      const formattedMonth =
        dateParts[1].length === 1 ? `0${dateParts[1]}` : dateParts[1];
      const formattedDate = `${formattedDay}-${formattedMonth}-${dateParts[2]}`;

      return {
        name: student["Nome do Aluno"],
        maritalStatus: student["Estado Civil"],
        email: student.Email,
        cpf: student.CPF,
        rg: student.RG,
        birthDate: parse(formattedDate, "dd-MM-yyyy", new Date()),
        sex: student.Sexo,
      };
    });

    await this.datasource.insertStudents(mappedData);

    return { data: "Os dados foram inseridos com sucesso" };
  }
}
