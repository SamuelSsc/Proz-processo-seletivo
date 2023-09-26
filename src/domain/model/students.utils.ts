import { MaritalStatusType, SexType } from "./students.model";

export const maritalStatusMapping: Record<string, MaritalStatusType> = {
  "SOLTEIRO(A)": MaritalStatusType.single,
  "CASADO(A)": MaritalStatusType.married,
  "SEPARADO(A)": MaritalStatusType.Separate,
  "DIVORCIADO(A)": MaritalStatusType.divorced,
  "VIÚVO(A)": MaritalStatusType.widower,
};

export const sexMapping: Record<string, SexType> = {
  Masculino: SexType.male,
  Feminino: SexType.female,
  "Não binário": SexType.other,
};
