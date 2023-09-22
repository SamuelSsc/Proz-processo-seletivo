import { MaritalStatusType, SexType } from "../model";

export interface GetStudentsFromSpreadsheetDto {
  "Nome do Aluno": string;
  "Estado Civil": MaritalStatusType;
  Email: string;
  CPF: string;
  RG: string;
  "Data de Nascimento": string;
  Sexo: SexType;
}
