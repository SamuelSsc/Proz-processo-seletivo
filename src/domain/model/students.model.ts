export type MaritalStatusType =
  | "SOLTEIRO(A)"
  | "CASADO(A)"
  | "SEPARADO(A)"
  | "DIVORCIADO(A)"
  | "VIÚVO(A)";

export type SexType = "Masculino" | "Feminino" | "Não binário";

export interface StudentModel {
  name: string;
  maritalStatus: MaritalStatusType;
  email: string;
  cpf: string;
  rg: string;
  birthDate: Date;
  sex: SexType;
}
