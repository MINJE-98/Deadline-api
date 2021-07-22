import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TeamMembers, Teams, Users } from 'src/entities';
import { Like, Repository } from 'typeorm';
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
  async createTeam(id: number, teamname: string) {
    const now = new Date();
    const teamifo = await this.teamsRepository.save({
      name: teamname,
      createdAt: now,
      updatedAt: now,
    });
    return await this.teamMembersRepository.save({
      teamid: teamifo.id,
      userid: id,
      createdAt: now,
      updatedAt: now,
      state: 0,
    });
  }

  async findTeam(teamname: string, teamid: number) {
    if (teamname != undefined)
      return await this.teamsRepository.find({ name: Like(`%${teamname}%`) });
    if (teamid != undefined)
      return await this.teamsRepository.findOne({ id: teamid });
    throw new HttpException(
      {
        status: HttpStatus.NOT_FOUND,
        error: '해당팀은 존재하지 않습니다.',
      },
      HttpStatus.NOT_FOUND,
    );
  }

  /**
   * 팀을 수정합니다.
   */
  async updateTeam(teamid: number, teamname: string, id: number) {
    const teamMemberinfo = await this.teamMembersRepository.findOne({
      userid: id,
      teamid: teamid,
    });
    if (teamMemberinfo == undefined) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: '팀에 가입되어 있지않습니다..',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    if (teamMemberinfo.state != 0) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: '권한이 없습니다.',
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

  async removeTeam(teamid: number, id: number) {
    const teamMemberinfo = await this.teamMembersRepository.findOne({
      userid: id,
      teamid: teamid,
    });
    if (teamMemberinfo == undefined) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: '팀에 가입되어 있지않습니다..',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    if (teamMemberinfo.state != 0) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: '권한이 없습니다.',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    const teaminfo = await this.teamsRepository.findOne({
      id: teamid,
    });
    const { affected } = await this.teamsRepository.delete(teaminfo);
    if (affected) {
      throw new HttpException(
        {
          status: HttpStatus.OK,
          error: '회원 탈퇴가 완료되었습니다.',
        },
        HttpStatus.OK,
      );
    }
  }
}
