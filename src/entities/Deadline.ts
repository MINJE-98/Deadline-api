import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Items } from './Items';
import { Tags } from './Tags';
import { Teams } from './Teams';

@Index('FK_Deadline_itemid_Items_itemid', ['itemid'], {})
@Index('FK_Deadline_tagid_Tags_tagid', ['tagid'], {})
@Index('FK_Deadline_teamid_Teams_teamid', ['teamid'], {})
@Entity('Deadline', { schema: 'Deadline' })
export class Deadline {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
    comment: '유통기한아이디',
  })
  id: number;

  @ApiProperty({
    example: '1',
    description: '팀 아이디',
  })
  @Column('int', { name: 'teamid', comment: '팀 아이디(FK)' })
  teamid: number;

  @ApiProperty({
    example: '1',
    description: '팀 아이디',
  })
  @Column('int', {
    name: 'itemid',
    nullable: true,
    comment: '아이템 아이디(FK)',
  })
  itemid: number | null;

  @ApiProperty({
    example: '1',
    description: '테그 아이디',
  })
  @Column('int', { name: 'tagid', nullable: true, comment: '태그 아이디(FK)' })
  tagid: number | null;

  @ApiProperty({
    example: '2021-10-01:15:31:32',
    description: '유통기한 일자',
  })
  @Column('datetime', { name: 'expiredAt', comment: '유통기한' })
  expiredAt: Date;

  @ApiProperty({
    example: '2021-07-09:15:31:32',
    description: '유통기한 생성일자',
  })
  @Column('datetime', { name: 'createAt', comment: '생성일자' })
  createAt: Date;

  @ApiProperty({
    example: '2021-07-09:15:31:32',
    description: '유통기한 수정일자',
  })
  @Column('datetime', { name: 'updateAt', comment: '수정일자' })
  updateAt: Date;

  @ApiProperty({
    example: '2021-07-10:15:31:32',
    description: '유통기한 삭제일자',
  })
  @Column('datetime', { name: 'deleteAt', nullable: true, comment: '삭제일자' })
  deleteAt: Date | null;

  @ManyToOne(() => Items, items => items.deadlines, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'itemid', referencedColumnName: 'id' }])
  item: Items;

  @ManyToOne(() => Tags, tags => tags.deadlines, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'tagid', referencedColumnName: 'id' }])
  tag: Tags;

  @ManyToOne(() => Teams, teams => teams.deadlines, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'teamid', referencedColumnName: 'id' }])
  team: Teams;
}
