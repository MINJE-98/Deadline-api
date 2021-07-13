import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Deadlines } from './Deadlines';
import { Items } from './Items';
import { Tags } from './Tags';
import { Teamembers } from './Teamembers';

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
  @Column('datetime', { name: 'createAt', comment: '생성일자' })
  createAt: Date;

  @ApiProperty({
    example: '2021-07-09:15:31:32',
    description: '팀 수정일자',
  })
  @Column('datetime', { name: 'updateAt', comment: '수정일자' })
  updateAt: Date;

  @ApiProperty({
    example: '2021-07-10:15:31:32',
    description: '팀 삭제일자',
  })
  @Column('datetime', { name: 'deleteAt', nullable: true, comment: '삭제일자' })
  deleteAt: Date | null;

  @OneToMany(() => Deadlines, deadline => deadline.team)
  deadlines: Deadlines[];

  @OneToMany(() => Items, items => items.team)
  items: Items[];

  @OneToMany(() => Tags, tags => tags.team)
  tags: Tags[];

  @OneToMany(() => Teamembers, teamembers => teamembers.team)
  teamembers: Teamembers[];
}
