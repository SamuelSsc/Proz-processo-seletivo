export enum MaritalStatusType {
  single = "SOLTEIRO(A)",
  married = "CASADO(A)",
  Separate = "SEPARADO(A)",
  divorced = "DIVORCIADO(A)",
  widower = "VIÚVO(A)",
  //Esses dados aqui deveriam ser salvos no banco em inglês.
  //O mapeamento dos valores para (A) deveriam ser feitos no front, ou no minimo em dominio se fosse necessario retornar em pt-br
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

export interface UpdateStudentInputModel {
  name?: string;
  maritalStatus?: string;
  email?: string;
  sex?: string;
}
