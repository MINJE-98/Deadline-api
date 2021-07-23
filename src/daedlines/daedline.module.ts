import { Module } from '@nestjs/common';
import { DaedlineService } from './daedline.service';
import { DaedlineController } from './daedline.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Deadlines,
  Items,
  Tags,
  TeamMembers,
  Teams,
  Users,
} from 'src/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Teams,
      TeamMembers,
      Users,
      Items,
      Deadlines,
      Tags,
    ]),
  ],
  controllers: [DaedlineController],
  providers: [DaedlineService],
})
export class DaedlineModule {}
