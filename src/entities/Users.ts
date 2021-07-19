import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { TeamMembers } from './TeamMembers';

@Entity('Users', { schema: 'Deadline' })
export class Users {
  @ApiProperty({
    example: '1',
    description: '유저 아이디',
  })
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', comment: 'ID' })
  id: number;

  @ApiProperty({
    example: '1804030582',
    description: '소셜 UID',
  })
  @Column('varchar', { name: 'socialId', comment: '소셜 id', length: 255 })
  socialId: number;

  @ApiProperty({
    example: 'minje9801@gmail.com',
    description: '이메일',
  })
  @Column('varchar', {
    name: 'email',
    nullable: true,
    comment: '유저이메일',
    length: 255,
  })
  email: string | null;

  @ApiProperty({
    example: '조민제',
    description: '유저 이름',
  })
  @Column('varchar', { name: 'name', comment: '유저이름', length: 255 })
  name: string;

  @ApiProperty({
    example:
      'http://k.kakaocdn.net/dn/j0pwB/btqV2J9RykT/mmxQS5VBGi42ddfenlMp6K/img_110x110.jpg',
    description: '유저 프로필 사진',
  })
  @Column('varchar', {
    name: 'profileURL',
    nullable: true,
    comment: '유저 프로필 사진',
    length: 255,
  })
  profileUrl: string | null;

  @ApiProperty({
    example: '2021-07-09:15:31:32',
    description: '유저 생성일자',
  })
  @CreateDateColumn({ comment: '유저 생성일자' })
  createdAt: Date;

  @ApiProperty({
    example: '2021-07-09:15:31:32',
    description: '유저 수정일자',
  })
  @UpdateDateColumn({ comment: '유저 수정일자' })
  updatedAt: Date;

  @ApiProperty({
    example: '2021-07-10:01:01:32',
    description: '유저 삭제일자',
  })
  @DeleteDateColumn({ comment: '유저 삭제일자' })
  deletedAt: Date | null;

  @OneToMany(() => TeamMembers, teamMembers => teamMembers.user)
  teamMembers: TeamMembers[];
}
