import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TeamMembers, Teams, Users } from 'src/entities';
import { Repository } from 'typeorm';
@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Teams) private teamsRepository: Repository<Teams>,
    @InjectRepository(TeamMembers)
    private teamMembersRepository: Repository<TeamMembers>,
    @InjectRepository(Users) private usersRepository: Repository<Users>,
  ) {}
  /**
   * 팀을 생성합니다.
   */
  async createTeam(userinfo: Users, teamname: string) {
    const temainfo = new Teams();
    const now = new Date();
    temainfo.name = teamname;
    temainfo.createdAt = now;
    temainfo.updatedAt = now;
    const result = await this.teamsRepository.save(temainfo);
    const teamMembers = new TeamMembers();
    teamMembers.teamid = result.id;
    teamMembers.userid = userinfo.id;
    teamMembers.createdAt = now;
    teamMembers.updatedAt = now;
    teamMembers.state = 0;
    return await this.teamMembersRepository.save(teamMembers);
  }

  async findTeamFromName(teamname: string) {
    const result = await this.teamsRepository.find({
      where: { name: teamname },
    });
    if (result == []) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: '해당팀은 존재하지 않습니다.',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return result;
  }

  /**
   * 팀 id로 팀을 조회합니다.
   */
  async findTeamFromId(teamid: number) {
    const result = await this.teamsRepository.findOne({
      where: { id: teamid },
    });
    if (!result) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: '해당팀은 존재하지 않습니다.',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return result;
  }

  /**
   * 팀을 수정합니다.
   */
  async updateTeam(teamid: number, teamname: string, userinfo: Users) {
    const { state } = await this.teamMembersRepository.findOne({
      userid: userinfo.id,
      teamid: teamid,
    });
    if (state) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: '수정권한이 없습니다.',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    const teaminfo = await this.teamsRepository.findOne({
      id: teamid,
    });
    const now = new Date();
    teaminfo.updatedAt = now;
    teaminfo.name = teamname;
    return await this.teamsRepository.save(teaminfo);
  }

  async removeTeam(teamid: number, userinfo: Users) {
    const { state } = await this.teamMembersRepository.findOne({
      userid: userinfo.id,
      teamid: teamid,
    });
    if (state) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: '수정권한이 없습니다.',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    await this.teamsRepository.delete({
      id: teamid,
    });
    throw new HttpException(
      {
        status: HttpStatus.OK,
        error: '삭제가 완료되었습니다.',
      },
      HttpStatus.OK,
    );
  }

  async createTeamMembers(teamid: number, email: string, userinfo: Users) {
    const invite = await this.usersRepository.findOne({
      email: email,
    });
    if (!invite) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: '해당 유저는 존재하지 않습니다.',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    const result = await this.teamMembersRepository.findOne({
      teamid: teamid,
      userid: invite.id,
    });
    console.log(result);
    if (!!result) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: '이미 가입된 유저입니다.',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    const { state } = await this.teamMembersRepository.findOne({
      teamid: teamid,
      userid: userinfo.id,
    });
    console.log(state);
    if (state) {
      const teammembers = new TeamMembers();
      const now = new Date();
      teammembers.teamid = teamid;
      teammembers.userid = invite.id;
      teammembers.updatedAt = now;
      teammembers.createdAt = now;
      teammembers.state = 2;
      return await this.teamMembersRepository.save(teammembers);
    }
    const teammembers = new TeamMembers();
    const now = new Date();
    teammembers.teamid = teamid;
    teammembers.userid = invite.id;
    teammembers.updatedAt = now;
    teammembers.createdAt = now;
    teammembers.state = 1;
    return await this.teamMembersRepository.save(teammembers);
  }

  async getWholeTeamMembers(teamid: number) {
    return await this.teamMembersRepository.find({ where: { teamid: teamid } });
  }

  async updateTeamMembers(
    teamid: number,
    userid: number,
    userstate: number,
    userinfo: Users,
  ) {
    const teamMemberInfo = await this.teamMembersRepository.findOne({
      userid: userid,
      teamid: teamid,
    });
    if (!teamMemberInfo) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: '팀에 가입되어 있지 않습니다.',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    const { state } = await this.teamMembersRepository.findOne({
      userid: userinfo.id,
      teamid: teamid,
    });
    if (state) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: '수정권한이 없습니다.',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    const now = new Date();
    teamMemberInfo.updatedAt = now;
    teamMemberInfo.state = userstate;
    return await this.teamMembersRepository.save(teamMemberInfo);
  }

  async deleteTeamMembers(teamid: number, userinfo: Users) {
    console.log(teamid);
    console.log(userinfo);

    const { affected } = await this.teamMembersRepository.delete({
      teamid: teamid,
      userid: userinfo.id,
    });
    console.log(affected);
    if (affected) {
      throw new HttpException(
        {
          status: HttpStatus.OK,
          error: '팀 탈퇴가 완료되었습니다.',
        },
        HttpStatus.OK,
      );
    }
    throw new HttpException(
      {
        status: HttpStatus.NOT_FOUND,
        error: '팀 탐퇴를 실패하였습니다.',
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
