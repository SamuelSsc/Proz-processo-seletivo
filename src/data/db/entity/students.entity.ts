import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";
import {
  MaritalStatusType,
  SexType,
  StudentModel,
} from "../../../domain/model";

@Entity("student")
export class StudentEntity implements StudentModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: "enum", enum: MaritalStatusType })
  maritalStatus: MaritalStatusType;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  cpf: string;

  @Column({ unique: true })
  rg: string;

  @Column()
  birthDate: Date;

  @Column({ type: "enum", enum: SexType })
  sex: SexType;
}
