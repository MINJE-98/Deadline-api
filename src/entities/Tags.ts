import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Deadlines } from './Deadlines';
import { Teams } from './Teams';

@Index('FK_Tags_teamid_teams_Teamid', ['teamid'], {})
@Entity('Tags', { schema: 'Deadline' })
export class Tags {
  @ApiProperty({
    example: '1',
    description: '테그 아이디',
  })
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', comment: '태그아이디' })
  id: number;

  @ApiProperty({
    example: '1',
    description: '팀 아이디',
  })
  @Column('int', { name: 'teamid', comment: '팀 아이디(FK)' })
  teamid: number;

  @ApiProperty({
    example: '생수',
    description: '테그 이름',
  })
  @Column('varchar', { name: 'name', comment: '태그이름', length: 100 })
  name: string;

  @ApiProperty({
    example: '2021-07-09:15:31:32',
    description: '테그 생성일자',
  })
  @Column('datetime', { name: 'createAt', comment: '생성일자' })
  createAt: Date;

  @ApiProperty({
    example: '2021-07-09:15:31:32',
    description: '테그 수정일자',
  })
  @Column('datetime', { name: 'updateAt', comment: '수정일자' })
  updateAt: Date;

  @ApiProperty({
    example: '2021-07-09:15:31:32',
    description: '테그 삭제일자',
  })
  @Column('datetime', { name: 'deleteAt', nullable: true, comment: '삭제일자' })
  deleteAt: Date | null;

  @OneToMany(() => Deadlines, deadline => deadline.tag)
  deadlines: Deadlines[];

  @ManyToOne(() => Teams, teams => teams.tags, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'teamid', referencedColumnName: 'id' }])
  team: Teams;
}
