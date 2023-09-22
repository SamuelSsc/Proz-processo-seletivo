import { Application } from "express";
import multer from "multer";

import {
  GetStudentsUseCase,
  UploadSpreadsheetUseCase,
  UpdateStudentUseCase,
} from "../../../domain/students";
import { MaritalStatusType, SexType } from "../../../domain/model";

export class StudentsResolvers {
  private readonly getStudentsUseCase: GetStudentsUseCase;
  private readonly uploadSpreadsheetUseCase: UploadSpreadsheetUseCase;
  private readonly updateStudentUseCase: UpdateStudentUseCase;

  constructor(private app: Application) {
    this.getStudentsUseCase = new GetStudentsUseCase();
    this.uploadSpreadsheetUseCase = new UploadSpreadsheetUseCase();
    this.updateStudentUseCase = new UpdateStudentUseCase();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.app.get("/students", async (_, res) => {
      res.json(await this.getStudentsUseCase.exec());
    });

    const storage = multer.memoryStorage();
    const upload = multer({ storage: storage });

    this.app.post("/upload", upload.single("file"), async (req, res) => {
      const uploadedFile = req.file;

      try {
        res.json(await this.uploadSpreadsheetUseCase.exec(uploadedFile));
      } catch (error: any) {
        res.status(400).json({ error: error.message });
      }
    });

    this.app.put("/update-user/:userId", async (req, res) => {
      const userId = req.params.userId;
      const userData = req.body;
      try {
        const updatedUser = await this.updateStudentUseCase.exec(
          {
            ...userData,
            maritalStatus: userData.maritalStatus,
            sex: userData.sex,
          },
          userId
        );

        res.status(200).json({
          message: "Usuário atualizado com sucesso",
          user: updatedUser,
        });
      } catch (error: any) {
        res.status(400).json({ error: error.message });
      }
    });
  }
}
