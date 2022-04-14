import { User } from 'src/users/entities/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Entrance extends BaseEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
    unsigned: true,
  })
  id: number;

  @ManyToOne((type) => User, (user) => user.entrance)
  user: User;

  @Column({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  accessTime: Date;
}
