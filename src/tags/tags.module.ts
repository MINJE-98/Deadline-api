import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tags, TeamMembers, Teams, Users } from 'src/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Teams, TeamMembers, Users, Tags])],
  controllers: [TagsController],
  providers: [TagsService],
})
export class TagsModule {}
