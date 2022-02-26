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

  @OneToMany(type => User, user => user.department, { onDelete: "SET NULL" })
  user: User[];

  @OneToMany(type => Permission, permission => permission.department, { onDelete: "SET NULL" })
  permission: Permission[];

  @Column({
    length: 20,
    unique: true,
  })
  name: string;
}
