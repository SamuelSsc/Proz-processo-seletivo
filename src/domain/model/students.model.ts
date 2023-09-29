export enum MaritalStatusType {
  single = "SOLTEIRO(A)",
  married = "CASADO(A)",
  Separate = "SEPARADO(A)",
  divorced = "DIVORCIADO(A)",
  widower = "VIÚVO(A)",
}

export enum SexType {
  male = "Masculino",
  female = "Feminino",
  other = "Não binário",
}

export interface StudentModel {
  name: string;
  maritalStatus: MaritalStatusType;
  email: string;
  cpf: string;
  rg: string;
  birthDate: Date;
  sex: SexType;
}

export interface UpdateUserInputModel {
  name?: string;
  maritalStatus?: string;
  email?: string;
  sex?: string;
}
