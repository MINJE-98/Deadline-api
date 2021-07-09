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

@Index('FK_Items_teamId_Teams_id', ['teamId'], {})
@Entity('Items', { schema: 'Deadline' })
export class Items {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', comment: '아이템아이디' })
  id: number;

  @Column('int', { name: 'teamId', comment: '팀아이디', nullable: true })
  teamId: number | null;

  @Column('varchar', { name: 'name', comment: '아이템이름', length: 100 })
  name: string;

  @Column('varchar', {
    name: 'itemImage',
    comment: '아이템이미지',
    length: 255,
  })
  itemImage: string;

  @Column('varchar', { name: 'barcode', comment: '아이템바코드', length: 255 })
  barcode: string;

  @Column('varchar', { name: 'itemsTag', comment: '아이템 테그', length: 100 })
  itemsTag: string;

  @Column('datetime', { name: 'createAt', comment: '아이템생성일자' })
  createAt: Date;

  @Column('datetime', { name: 'updateAt', comment: '아이템수정일자' })
  updateAt: Date;

  @Column('datetime', {
    name: 'deleteAt',
    nullable: true,
    comment: '아이템삭제일자',
  })
  deleteAt: Date | null;

  @OneToMany(() => Deadlines, deadlines => deadlines.item)
  deadlines: Deadlines[];

  @ManyToOne(() => Teams, teams => teams.items, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'teamId', referencedColumnName: 'id' }])
  team: Teams;
}
