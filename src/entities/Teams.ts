import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Deadlines } from './Deadlines';
import { Items } from './Items';
import { Tags } from './Tags';
import { TeamMembers } from './TeamMembers';

@Entity('Teams', { schema: 'Deadline' })
export class Teams {
  @ApiProperty({
    example: '1',
    description: '팀 아이디',
  })
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', comment: '팀ID' })
  id: number;

  @ApiProperty({
    example: '가톨릭 요양병원',
    description: '팀 이름',
  })
  @Column('varchar', { name: 'name', comment: '팀이름', length: 20 })
  name: string;

  @ApiProperty({
    example: '2021-07-09:15:31:32',
    description: '팀 생성일자',
  })
  @CreateDateColumn({ comment: '팀 생성일자' })
  createdAt: Date;

  @ApiProperty({
    example: '2021-07-09:15:31:32',
    description: '팀 수정일자',
  })
  @UpdateDateColumn({ comment: '팀 수정일자' })
  updatedAt: Date;

  @ApiProperty({
    example: '2021-07-10:15:31:32',
    description: '팀 삭제일자',
  })
  @DeleteDateColumn({ comment: '팀 삭제일자' })
  deletedAt: Date | null;

  @OneToMany(() => Deadlines, deadline => deadline.team)
  deadlines: Deadlines[];

  @OneToMany(() => Items, items => items.team)
  items: Items[];

  @OneToMany(() => Tags, tags => tags.team)
  tags: Tags[];

  @OneToMany(() => TeamMembers, teamMembers => teamMembers.team)
  teamMembers: TeamMembers[];
}
