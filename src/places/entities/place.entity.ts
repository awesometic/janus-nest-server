import { Beacon } from "src/beacons/entities/beacon.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Place {
  @PrimaryGeneratedColumn({
    type: "int",
    unsigned: true,
  })
  id: number;

  @ManyToOne(type => Beacon, beacon => beacon.place)
  beacon: Beacon;

  @ManyToMany(type => User, user => user.place)
  user: User[];

  @Column({
    length: 20
  })
  name: string;

  @Column({
    type: "point",
    spatialFeatureType: "Point",
    srid: 4326
  })
  location: string;
}
