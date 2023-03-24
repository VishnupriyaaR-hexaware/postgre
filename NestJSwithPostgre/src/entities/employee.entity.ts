import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  EmpId: string;

  @Column()
  EmpName: string;

}
