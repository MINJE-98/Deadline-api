import { Module } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { TeamsController } from './teams.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamMembers, Teams, Users } from 'src/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Teams, TeamMembers, Users])],
  controllers: [TeamsController],
  providers: [TeamsService],
})
export class TeamsModule {}
