import { Application } from "express";
import multer from "multer";

import {
  GetStudentsUseCase,
  UploadSpreadsheetUseCase,
} from "../../../domain/students";

export class StudentsResolvers {
  private readonly getStudentsUseCase: GetStudentsUseCase;
  private readonly uploadSpreadsheetUseCase: UploadSpreadsheetUseCase;

  constructor(private app: Application) {
    this.getStudentsUseCase = new GetStudentsUseCase();
    this.uploadSpreadsheetUseCase = new UploadSpreadsheetUseCase();
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
        //Tipar esse error aqui
        res.status(400).json({ error: error.message });
      }
    });
  }
}
