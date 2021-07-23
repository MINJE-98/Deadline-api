import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Deadlines, Items, Tags, TeamMembers, Teams } from 'src/entities';
import { Repository } from 'typeorm';
import { DeadlinesCreate } from './dto/daedlinesCreate.dto';
import { DeadlinesUpdate } from './dto/deadlinesUpdate.dto';

@Injectable()
export class DaedlineService {
  constructor(
    @InjectRepository(Teams) private teamsRepository: Repository<Teams>,
    @InjectRepository(TeamMembers)
    private teamMembersRepository: Repository<TeamMembers>,
    @InjectRepository(Items) private itemsRepository: Repository<Items>,
    @InjectRepository(Tags) private tagsRepository: Repository<Tags>,
    @InjectRepository(Deadlines)
    private deadlineRepository: Repository<Deadlines>,
  ) {}
  async createDeadline(body: DeadlinesCreate, teamid: number, id: number) {
    // 현재 접속 유저가 팀에 가입 되어있는지?
    const { itemid, tagid, expiredAt } = body;
    const isMembers = await this.teamMembersRepository.findOne({
      teamid: teamid,
      userid: id,
    });
    if (isMembers == undefined) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: '팀에 가입되어 있지않습니다.',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    if (isMembers.state == 2) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: '유통기한을 등록할 권한이 없습니다.',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    // 테그가 존재하는지 ?
    const isExitTag = await this.tagsRepository.findOne({ id: tagid });
    if (isExitTag == undefined) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: '테그가 존재하지 않습니다.',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    // 아이템이 존재하는지?
    const isExititem = await this.itemsRepository.findOne({ id: itemid });
    if (isExititem == undefined) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: '아이템이 존재하지 않습니다.',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    const now = new Date();
    return await this.deadlineRepository.save({
      itemid: itemid,
      tagid: tagid,
      teamid: teamid,
      expiredAt: expiredAt,
      createdAt: now,
      updatedAt: now,
    });
  }

  async findDeadline(teamid: number, id: number) {
    return await this.deadlineRepository.find({ teamid: teamid });
  }
  async updateDeadline(
    body: DeadlinesUpdate,
    teamid: number,
    id: number,
    deadlineid: number,
  ) {
    const { itemid, tagid, expiredAt } = body;
    const isMembers = await this.teamMembersRepository.findOne({
      teamid: teamid,
      userid: id,
    });
    // 현재 접속 유저가 팀에 가입 되어있는지?
    if (isMembers == undefined) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: '팀에 가입되어 있지않습니다.',
        },
        HttpStatus.NOT_FOUND,
      );
      // 현재 접속 유저가 팀에 가입 되어있는지?
    }
    // 수정할 권한은 있는지?
    if (isMembers.state == 2) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: '유통기한을 수정할 권한이 없습니다.',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    // 유통기한이 존재하는지?
    const isExitDeadline = await this.deadlineRepository.findOne({
      id: deadlineid,
    });
    if (isExitDeadline == undefined) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: '유통기한이 존재하지 않습니다.',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    // 테그가 존재하는지 ?
    const isExitTag = await this.tagsRepository.findOne({ id: tagid });
    if (isExitTag == undefined) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: '테그가 존재하지 않습니다.',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    // 아이템이 존재하는지?
    const isExititem = await this.itemsRepository.findOne({ id: itemid });
    if (isExititem == undefined) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: '아이템이 존재하지 않습니다.',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    const now = new Date();
    isExitDeadline.expiredAt = expiredAt ? expiredAt : isExitDeadline.expiredAt;
    isExitDeadline.itemid = itemid;
    isExitDeadline.tagid = tagid;
    isExitDeadline.updatedAt = now;
    return await this.deadlineRepository.save(isExitDeadline);
  }

  async removeDeadline(teamid: number, deadlineid: number, id: number) {
    const isExitMember = await this.teamMembersRepository.findOne({
      teamid: teamid,
      userid: id,
    });
    if (isExitMember == undefined) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: '팀에 가입되어 있지않습니다.',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    if (isExitMember.state == 2) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: '권한이 없습니다.',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    const isExititem = await this.deadlineRepository.findOne({
      id: deadlineid,
    });
    if (isExititem == undefined) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: '해당 유통기한을 찾을 수 없습니다.',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    const { affected } = await this.deadlineRepository.delete({
      id: deadlineid,
    });
    if (affected) {
      throw new HttpException(
        {
          status: HttpStatus.OK,
          error: '유통기한삭제가 완료되었습니다.',
        },
        HttpStatus.OK,
      );
    }
    throw new HttpException(
      {
        status: HttpStatus.NOT_FOUND,
        error: '유통기한삭제를 실패하였습니다.',
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
