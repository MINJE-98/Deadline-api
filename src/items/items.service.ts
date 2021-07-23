import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Items, TeamMembers, Teams, Users } from 'src/entities';
import { Like, Repository } from 'typeorm';
import { ItemsCreate } from './dto/itemsCreate.dto';
import { ItemsUpdate } from './dto/itemsUpdate.dto';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Teams) private teamsRepository: Repository<Teams>,
    @InjectRepository(TeamMembers)
    private teamMembersRepository: Repository<TeamMembers>,
    @InjectRepository(Items) private itemsRepository: Repository<Items>,
  ) {}

  async createItems(body: ItemsCreate, id: number) {
    const { teamid, name, imageURL, barcode } = body;
    const teamMemberinfo = await this.teamMembersRepository.findOne({
      teamid: teamid,
      userid: id,
    });
    if (teamMemberinfo == undefined) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: '팀에 가입되어 있지않습니다.',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    const now = new Date();
    return await this.itemsRepository.save({
      name: name,
      teamid: teamid,
      barcode: barcode,
      imageURL: imageURL,
      updatedAt: now,
      createdAt: now,
    });
  }

  async findItems(itemname: string, barcode: string, itemid: number) {
    if (itemname != undefined)
      return await this.itemsRepository.find({ name: Like(`%${itemname}%`) });
    if (itemid != undefined)
      return await this.itemsRepository.find({
        id: itemid,
      });
    if (barcode != undefined)
      return await this.itemsRepository.find({
        barcode: barcode,
      });
  }

  async updateItems(id: number, body: ItemsUpdate, itemid: number) {
    const { teamid, name, imageURL } = body;
    const teamMemberinfo = await this.teamMembersRepository.findOne({
      teamid: teamid,
      userid: id,
    });
    if (teamMemberinfo == undefined) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: '팀에 가입되어 있지않습니다.',
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
    const iteminfo = await this.itemsRepository.findOne({
      id: itemid,
    });
    if (iteminfo == undefined) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: '해당 아이템을 찾을 수 없습니다.',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    iteminfo.imageUrl = imageURL ? imageURL : iteminfo.imageUrl;
    iteminfo.name = name ? name : iteminfo.name;
    iteminfo.updatedAt = new Date();
    return await this.itemsRepository.save(iteminfo);
  }

  async removeItem(id: number, teamid: number, itemid: number) {
    const teamMemberinfo = await this.teamMembersRepository.findOne({
      teamid: teamid,
      userid: id,
    });
    if (teamMemberinfo == undefined) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: '팀에 가입되어 있지않습니다.',
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
    const iteminfo = await this.itemsRepository.findOne({
      id: itemid,
    });
    if (iteminfo == undefined) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: '해당 아이템을 찾을 수 없습니다.',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    const { affected } = await this.itemsRepository.delete({ id: itemid });
    if (affected) {
      throw new HttpException(
        {
          status: HttpStatus.OK,
          error: '아이템삭제가 완료되었습니다.',
        },
        HttpStatus.OK,
      );
    }
    throw new HttpException(
      {
        status: HttpStatus.NOT_FOUND,
        error: '아이템삭제를 실패하였습니다.',
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
