import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Permission } from "./permission.entity";
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

  @OneToMany(type => Permission, permission => permission.department)
  permission: Permission[];

  @Column({
    length: 20,
  })
  name: string;
}
