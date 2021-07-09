import { Injectable } from '@nestjs/common';
import { Teams } from 'src/entities';

@Injectable()
export class TeamsService {
  createTeam(createTeamDto: Teams) {
    return 'createTeam';
  }

  findTeam(id: number) {
    return `findTeam`;
  }

  updateTeam(id: number, updateTeamDto: Teams) {
    return `updateTeam`;
  }

  removeTeam(id: number) {
    return `removeTeam`;
  }

  createTeamMembers(email: string) {
    return `createTeamMembers ${email}`;
  }

  getTeamMembers(param: string) {
    return `getTeamMembers ${param}`;
  }
  updateTeamMembersState(email: string) {
    return `updateTeamMembersState ${email}`;
  }
  deleteTeamMembersState(email: string) {
    return `deleteTeamMembersState ${email}`;
  }
}
