import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EspeciesController } from './especies.controller';
import { EspeciesService } from './especies.service';
import { Especie } from './especie.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Especie])],
  controllers: [EspeciesController],
  providers: [EspeciesService],
  exports: [EspeciesService],
})
export class EspeciesModule {}