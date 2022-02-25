import { Entrance } from 'src/entrances/entities/entrance.entity';
import { Place } from 'src/places/entities/place.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany } from 'typeorm';
import { Department } from './department.entity';
import { Permission } from './permission.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn({
    type: "int",
    unsigned: true,
  })
  id: number;

  @ManyToOne(type => Entrance, entrance => entrance.user)
  entrance: Entrance;

  @ManyToOne(type => Department, department => department.user)
  department: Department;

  @ManyToOne(type => Permission, permission => permission.user)
  permission: Permission;

  @ManyToMany(type => Place, place => place.user)
  place: Place[];

  @Column({
    type: "int",
    unsigned: true,
  })
  permissionId: number;

  @Column({
    type: "int",
    unsigned: true,
  })
  departmentId: number;

  @Column({
    length: 30,
    unique: true,
  })
  email: string;

  @Column({
    length: 30,
  })
  name: string;

  @Column({
    length: 30,
  })
  password: string;

  @Column({
    type: "datetime",
    default: () => "CURRENT_TIMESTAMP",
  })
  createTime: Date;

  @Column({
    type: "datetime",
    default: () => "CURRENT_TIMESTAMP",
  })
  lastLoginTime: Date;
}
