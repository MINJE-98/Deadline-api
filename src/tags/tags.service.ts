import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tags, TeamMembers, Teams, Users } from 'src/entities';
import { Like, Repository } from 'typeorm';
@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Teams) private teamsRepository: Repository<Teams>,
    @InjectRepository(TeamMembers)
    private teamMembersRepository: Repository<TeamMembers>,
    @InjectRepository(Users) private usersRepository: Repository<Users>,
    @InjectRepository(Tags) private tagsRepository: Repository<Tags>,
  ) {}
  async createTags(userinfo: Users, teamid: number, tagname: string) {
    // 팀에 가입되어있는지?
    const isjoined = await this.teamMembersRepository.findOne({
      userid: userinfo.id,
      teamid: teamid,
    });
    // no
    if (isjoined == undefined) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: '팀에 가입되어 있지 않습니다.',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    // yes but.
    // 테그를 추가할 권한이 있는지?
    if (isjoined.state) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: '권한이 없습니다.',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    const tags = new Tags();
    const now = new Date();
    tags.name = tagname;
    tags.teamid = teamid;
    tags.createdAt = now;
    tags.updatedAt = now;
    return await this.tagsRepository.save(tags);
  }

  async findTags(
    userinfo: Users,
    teamid: number,
    tagid: number,
    tagname: string,
  ) {
    // 팀에 가입되어있는지?
    const isjoined = await this.teamMembersRepository.findOne({
      userid: userinfo.id,
      teamid: teamid,
    });
    // no
    if (isjoined == undefined) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: '팀에 가입되어 있지 않습니다.',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    // 테그 아이디로 검색
    if (!!tagid)
      return await this.tagsRepository.findOne({
        id: tagid,
      });
    // 테그 명으로 검색
    if (!!tagname)
      return await this.tagsRepository.findOne({
        name: Like(`%${tagname}%`),
      });

    // 옵션이 없을때 전체 검색
    return await this.tagsRepository.find({
      teamid: teamid,
    });
  }

  async updateTag(
    userinfo: Users,
    teamid: number,
    tagid: number,
    tagname: string,
  ) {
    const isjoined = await this.teamMembersRepository.findOne({
      userid: userinfo.id,
      teamid: teamid,
    });
    // no
    if (isjoined == undefined) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: '팀에 가입되어 있지 않습니다.',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    // 수정할 권한이 있는가?
    if (isjoined.state) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: '권한이 없습니다.',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    // 해당 테그가 있는가?
    const tags = await this.tagsRepository.findOne({
      id: tagid,
    });
    if (tags == undefined) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: '권한이 없습니다.',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    const now = new Date();
    tags.name = tagname;
    tags.updatedAt = now;
    return await this.tagsRepository.save(tags);
  }

  async removeTags(userinfo: Users, teamid: number, tagid: number) {
    const isjoined = await this.teamMembersRepository.findOne({
      userid: userinfo.id,
      teamid: teamid,
    });
    // no
    if (isjoined == undefined) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: '팀에 가입되어 있지 않습니다.',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    // 수정할 권한이 있는가?
    if (isjoined.state) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: '권한이 없습니다.',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    const { affected } = await this.tagsRepository.softDelete({
      id: tagid,
    });
    if (affected) {
      throw new HttpException(
        {
          status: HttpStatus.OK,
          error: '테그가 삭제되었습니다.',
        },
        HttpStatus.OK,
      );
    }
    throw new HttpException(
      {
        status: HttpStatus.NOT_FOUND,
        error: '테그 삭제를 실패하였습니다.',
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
