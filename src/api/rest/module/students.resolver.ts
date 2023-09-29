import { Application } from "express";
import multer from "multer";

import {
  GetStudentsUseCase,
  UploadSpreadsheetUseCase,
  UpdateStudentUseCase,
  DeleteStudentUseCase,
} from "../../../domain/students";

export class StudentsResolvers {
  private readonly getStudentsUseCase: GetStudentsUseCase;
  private readonly uploadSpreadsheetUseCase: UploadSpreadsheetUseCase;
  private readonly updateStudentUseCase: UpdateStudentUseCase;
  private readonly deleteStudentUseCase: DeleteStudentUseCase;

  constructor(private app: Application) {
    this.getStudentsUseCase = new GetStudentsUseCase();
    this.uploadSpreadsheetUseCase = new UploadSpreadsheetUseCase();
    this.updateStudentUseCase = new UpdateStudentUseCase();
    this.deleteStudentUseCase = new DeleteStudentUseCase();
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

    this.app.put("/update-student/:id", async (req, res) => {
      const userId = req.params.id;
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

    this.app.delete("/delete-student/:id", async (req, res) => {
      const userId = req.params.id;

      console.log("O QUE ESTÁ CHEGANDOP AQUIIIIIII???????", userId);

      try {
        res.json(await this.deleteStudentUseCase.exec(userId));
      } catch (error: any) {
        res.status(400).json({ error: error.message });
      }
    });
  }
}
