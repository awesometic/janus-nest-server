import { Place } from 'src/places/entities/place.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Beacon {
  @PrimaryGeneratedColumn({
    type: 'int',
    unsigned: true,
  })
  id: number;

  @OneToMany((type) => Place, (place) => place.beacon, {
    onDelete: 'SET NULL',
  })
  place: Place[];

  @Column({
    length: 17,
  })
  macAddress: string;

  @Column({
    type: 'uuid',
    length: 32,
  })
  uuid: string;

  @Column({
    length: 4,
  })
  major: string;

  @Column({
    length: 4,
  })
  minor: string;

  @Column({
    type: 'int',
    unsigned: true,
  })
  threshold: number;
}
