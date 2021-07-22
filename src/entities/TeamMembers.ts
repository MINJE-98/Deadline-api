import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Teams } from './Teams';
import { Users } from './Users';

@Index('FK_TeamMembers_teamid_Teams_teamid', ['teamid'], {})
@Index('FK_TeamMembers_userid_Users_userid', ['userid'], {})
@Entity('TeamMembers', { schema: 'Deadline' })
export class TeamMembers {
  @ApiProperty({
    example: '1',
    description: '팀멤버 아이디',
  })
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', comment: '멤버 아이디' })
  id: number;

  @ApiProperty({
    example: '1',
    description: '유저 ID',
  })
  @Column('int', { name: 'userid', comment: '유저ID(FK)' })
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
    description: '팀멤버 생성일자',
  })
  @CreateDateColumn({ comment: '팀멤버 생성일자' })
  createdAt: Date;

  @ApiProperty({
    example: '2021-07-09:15:31:32',
    description: '팀멤버 수정일자',
  })
  @UpdateDateColumn({ comment: '팀멤버 수정일자' })
  updatedAt: Date;

  @ApiProperty({
    example: '2021-07-10:01:31:32',
    description: '팀멤버 삭제일자',
  })
  @DeleteDateColumn({ comment: '팀멤버 삭제일자' })
  deletedAt: Date | null;

  @ManyToOne(() => Teams, teams => teams.teamMembers, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'teamid', referencedColumnName: 'id' }])
  team: Teams;

  @ManyToOne(() => Users, users => users.teamMembers, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'usersid', referencedColumnName: 'id' }])
  user: Users;
}
