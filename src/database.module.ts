import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { connectionOptions } from './configs/orm.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => connectionOptions,
    }),
  ],
})
export class DatabaseModule {}
