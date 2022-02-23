import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Department {
  @PrimaryGeneratedColumn({
    type: "int",
    unsigned: true,
  })
  id: number;

  @OneToMany(type => User, user => user.department)
  user: User[];

  @Column({
    length: 20,
  })
  name: string;
}
