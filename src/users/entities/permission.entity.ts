import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Permission {
  @PrimaryGeneratedColumn({
    type: "int",
    unsigned: true,
  })
  id: number;

  @OneToMany(type => User, user => user.permission)
  user: User[];

  @Column({
    length: 20,
  })
  name: string;

  @Column({
    type: "int",
  })
  level: number;
}
