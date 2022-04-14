import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Department } from './department.entity';
import { User } from './user.entity';

@Entity()
export class Permission extends BaseEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
    unsigned: true,
  })
  id: number;

  @OneToMany((type) => User, (user) => user.permission, {
    onDelete: 'SET NULL',
  })
  user: User[];

  @ManyToOne((type) => Department, (department) => department.permission)
  department: Department;

  @Column({
    length: 20,
  })
  name: string;

  @Column({
    type: 'int',
    width: 2,
    unsigned: true,
  })
  level: number;
}
