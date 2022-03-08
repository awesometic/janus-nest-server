import { Entrance } from 'src/entrances/entities/entrance.entity';
import { Place } from 'src/places/entities/place.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Department } from './department.entity';
import { Permission } from './permission.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn({
    type: 'int',
    unsigned: true,
  })
  id: number;

  @OneToMany((type) => Entrance, (entrance) => entrance.user, {
    onDelete: 'SET NULL',
  })
  entrance: Entrance[];

  @ManyToOne((type) => Department, (department) => department.user)
  department: Department;

  @ManyToOne((type) => Permission, (permission) => permission.user)
  permission: Permission;

  @ManyToMany(() => Place)
  @JoinTable()
  place: Place[];

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
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createTime: Date;

  @Column({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  lastLoginTime: Date;
}
