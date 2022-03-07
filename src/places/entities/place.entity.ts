import { Point } from 'geojson';
import { Beacon } from 'src/beacons/entities/beacon.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Place {
  @PrimaryGeneratedColumn({
    type: 'int',
    unsigned: true,
  })
  id: number;

  @ManyToOne((type) => Beacon, (beacon) => beacon.place)
  beacon: Beacon;

  @Column({
    length: 20,
  })
  name: string;

  @Column({
    type: 'point',
    spatialFeatureType: 'Point',
    srid: 4326,
  })
  location: Point;
}
