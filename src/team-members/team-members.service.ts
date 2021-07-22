import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TeamMembers, Teams, Users } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class TeamMembersService {
  constructor(
    @InjectRepository(Teams) private teamsRepository: Repository<Teams>,
    @InjectRepository(TeamMembers)
    private teamMembersRepository: Repository<TeamMembers>,
    @InjectRepository(Users) private usersRepository: Repository<Users>,
  ) {}
  async createTeamMembers(teamid: number, email: string, id: number) {
    // 초대할 유저
    const inviteUserInfo = await this.usersRepository.findOne({
      email: email,
    });
    // 초대한 유저 상태값
    const { state } = await this.teamMembersRepository.findOne({
      userid: id,
    });
    // 유저가 회원인지?
    if (inviteUserInfo == undefined) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: '팀에 가입되어 있지 않습니다.',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    const isJoined = await this.teamMembersRepository.findOne({
      teamid: teamid,
      userid: inviteUserInfo.id,
    });
    //이미 팀에 가입되어있는지?
    if (isJoined != undefined) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: '팀에 이미 가입되어 있습니다.',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    const now = new Date();
    if (state == 0) {
      return await this.teamMembersRepository.save({
        teamid: teamid,
        userid: inviteUserInfo.id,
        state: 1,
        createdAt: now,
        updatedAt: now,
      });
    }
    if (state == 1) {
      return await this.teamMembersRepository.save({
        teamid: teamid,
        userid: inviteUserInfo.id,
        state: 2,
        createdAt: now,
        updatedAt: now,
      });
    }
    throw new HttpException(
      {
        status: HttpStatus.NOT_FOUND,
        error: '팀에 초대할 수 없습니다.',
      },
      HttpStatus.NOT_FOUND,
    );
  }

  async getTeamMembers(teamid: number) {
    return await this.teamMembersRepository.find({ teamid: teamid });
  }

  async updateTeamMembers(
    teamid: number,
    mstate: number,
    mid: number,
    id: number,
  ) {
    // 타겟 유저가 팀에 가입이 되어있는지?
    const teamMemberInfo = await this.teamMembersRepository.findOne({
      userid: mid,
      teamid: teamid,
    });
    if (teamMemberInfo == undefined) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: '팀에 가입되어 있지 않습니다.',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    // 나의 권한은 뭔가?
    const { state } = await this.teamMembersRepository.findOne({
      userid: id,
      teamid: teamid,
    });
    if (state != 0) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: '권한이 없습니다.',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    const now = new Date();
    teamMemberInfo.updatedAt = now;
    teamMemberInfo.state = mstate;
    return await this.teamMembersRepository.save(teamMemberInfo);
  }

  async deleteTeamMembers(teamid: number, id: number) {
    const { affected } = await this.teamMembersRepository.delete({
      teamid: teamid,
      userid: id,
    });
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
  async deleteTeamSpecialMembers(teamid: number, email: string, id: number) {}
}
