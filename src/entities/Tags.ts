import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
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
  @CreateDateColumn({ comment: '테그 생성일자' })
  createdAt: Date;

  @ApiProperty({
    example: '2021-07-09:15:31:32',
    description: '테그 수정일자',
  })
  @UpdateDateColumn({ comment: '테그 수정일자' })
  updatedAt: Date;

  @ApiProperty({
    example: '2021-07-09:15:31:32',
    description: '테그 삭제일자',
  })
  @DeleteDateColumn({ comment: '테그 삭제일자' })
  deletedAt: Date | null;

  @OneToMany(() => Deadlines, deadline => deadline.tag)
  deadlines: Deadlines[];

  @ManyToOne(() => Teams, teams => teams.tags, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'teamid', referencedColumnName: 'id' }])
  team: Teams;
}
