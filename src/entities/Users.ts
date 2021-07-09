import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TeamMembers } from './TeamMembers';
import { SocialAccounts } from './SocialAccounts';
import { ApiProperty } from '@nestjs/swagger';

@Index('FK_Users_socialID_SocialAccounts_id', ['socialId'], {})
@Entity('Users', { schema: 'Deadline' })
export class Users {
  @ApiProperty({
    example: 1,
    description: '사용자 아이디',
  })
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', comment: 'ID' })
  id: number;

  @ApiProperty({
    example: 1,
    description: '소셜로그인 아이디',
  })
  @Column('int', { name: 'socialID', nullable: true, comment: 'UID' })
  socialId: number | null;

  @ApiProperty({
    example: '워뇨띠',
    description: '사용자 이름',
  })
  @Column('varchar', { name: 'name', comment: '유저이름', length: 100 })
  name: string;

  @ApiProperty({
    example: 'jmj012100@gmail.com',
    description: '사용자 이메일',
  })
  @Column('varchar', { name: 'email', comment: '유저이메일', length: 100 })
  email: string;

  @ApiProperty({
    example: '2021-07-05',
    description: '유저 생성일자',
  })
  @Column('datetime', { name: 'createAt', comment: '유저생성일자' })
  createAt: Date;

  @ApiProperty({
    example: '2021-07-05',
    description: '유저 수정일자',
  })
  @Column('datetime', { name: 'updateAt', comment: '유저수정일자' })
  updateAt: Date;

  @ApiProperty({
    example: '2021-07-05',
    description: '유저 삭제일자',
  })
  @Column('datetime', {
    name: 'deleteAt',
    nullable: true,
    comment: '유저삭제일자',
  })
  deleteAt: Date | null;

  @OneToMany(() => TeamMembers, teamMembers => teamMembers.user)
  teamMembers: TeamMembers[];

  @ManyToOne(() => SocialAccounts, socialAccounts => socialAccounts.users, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'socialID', referencedColumnName: 'id' }])
  social: SocialAccounts;
}
