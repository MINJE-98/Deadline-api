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
import { Deadline } from './Deadline';
import { Teams } from './Teams';

@Index('FK_Items_teamid_Teams_teamid', ['teamid'], {})
@Entity('Items', { schema: 'Deadline' })
export class Items {
  @ApiProperty({
    example: '1',
    description: '아이템 아이디',
  })
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', comment: '아이템 아이디' })
  id: number;

  @ApiProperty({
    example: '1',
    description: '팀 아이디',
  })
  @Column('int', { name: 'teamid', nullable: true, comment: '팀 아이디(FK)' })
  teamid: number | null;

  @ApiProperty({
    example: '880123123123',
    description: '아이템 바코드',
  })
  @Column('varchar', { name: 'barcode', comment: '바코드', length: 255 })
  barcode: string;

  @ApiProperty({
    example: '아이시스',
    description: '아이템 상품명',
  })
  @Column('varchar', { name: 'name', comment: '상품 명', length: 100 })
  name: string;

  @ApiProperty({
    example: 'https://aws.sdufybhsjds.com/image',
    description: '아이템 이미지',
  })
  @Column('varchar', {
    name: 'imageURL',
    nullable: true,
    comment: '이미지URL',
    length: 255,
  })
  imageUrl: string | null;

  @ApiProperty({
    example: '2021-07-09:15:31:32',
    description: '아이템 생성일자',
  })
  @Column('datetime', { name: 'createAt', comment: '생성일자' })
  createAt: Date;

  @ApiProperty({
    example: '2021-07-09:15:31:32',
    description: '아이템 수정일자',
  })
  @Column('datetime', { name: 'updateAt', comment: '수정일자' })
  updateAt: Date;

  @ApiProperty({
    example: '2021-07-10:15:31:32',
    description: '아이템 삭제일자',
  })
  @Column('datetime', { name: 'deleteAt', nullable: true, comment: '삭제일자' })
  deleteAt: Date | null;

  @OneToMany(() => Deadline, deadline => deadline.item)
  deadlines: Deadline[];

  @ManyToOne(() => Teams, teams => teams.items, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'teamid', referencedColumnName: 'id' }])
  team: Teams;
}
