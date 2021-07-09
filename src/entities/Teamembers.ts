import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Teams } from './Teams';
import { Users } from './Users';

@Index('FK_Teamembers_teamid_Teams_teamid', ['teamid'], {})
@Index('FK_Teamembers_userid_Users_userid', ['userid'], {})
@Entity('Teamembers', { schema: 'Deadline' })
export class Teamembers {
  @ApiProperty({
    example: '1',
    description: '팀멤버 아이디',
  })
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', comment: '멤버 아이디' })
  id: number;

  @ApiProperty({
    example: '1',
    description: '유저 UID',
  })
  @Column('int', { name: 'userid', comment: '유저UID(FK)' })
  userid: number;

  @ApiProperty({
    example: '1',
    description: '팀 아이디',
  })
  @Column('int', { name: 'teamid', comment: '팀 아이디(FK)' })
  teamid: number;

  @ApiProperty({
    example: '0',
    description: 'admin',
  })
  @Column('int', { name: 'state', comment: '유저상태' })
  state: number;

  @ApiProperty({
    example: '2021-07-09:15:31:32',
    description: '팀 생성일자',
  })
  @Column('datetime', { name: 'createAt', comment: '생성일자' })
  createAt: Date;

  @ApiProperty({
    example: '2021-07-09:15:31:32',
    description: '팀 수정일자',
  })
  @Column('datetime', { name: 'updateAt', comment: '수정일자' })
  updateAt: Date;

  @ApiProperty({
    example: '2021-07-10:01:31:32',
    description: '팀 삭제일자',
  })
  @Column('datetime', { name: 'deleteAt', nullable: true, comment: '삭제일자' })
  deleteAt: Date | null;

  @ManyToOne(() => Teams, teams => teams.teamembers, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'teamid', referencedColumnName: 'id' }])
  team: Teams;

  @ManyToOne(() => Users, users => users.teamembers, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'userid', referencedColumnName: 'id' }])
  user: Users;
}
