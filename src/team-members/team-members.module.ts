import { Module } from '@nestjs/common';
import { TeamMembersService } from './team-members.service';
import { TeamMembersController } from './team-members.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamMembers, Teams, Users } from 'src/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Teams, TeamMembers, Users])],
  controllers: [TeamMembersController],
  providers: [TeamMembersService],
})
export class TeamMembersModule {}
