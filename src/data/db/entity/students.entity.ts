import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { MaritalStatusType, SexType } from "../../../domain/model";

@Entity("student")
export class StudentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  maritalStatus: MaritalStatusType;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  cpf: string;

  @Column({ unique: true })
  rg: string;

  @Column()
  birthDate: Date;

  @Column()
  sex: SexType;
}
