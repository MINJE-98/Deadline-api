import {
  Column,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Users } from './Users';

@Entity('SocialAccounts', { schema: 'Deadline' })
export class SocialAccounts {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'socialID', length: 255 })
  socialId: string;

  @Column('varchar', { name: 'provider', length: 20 })
  provider: string;

  @Column('varchar', { name: 'refreshToken', length: 255 })
  refreshToken: string;

  @DeleteDateColumn({ name: 'refreshExpiredAt' })
  refreshExpiredAt: string;

  @OneToMany(() => Users, Users => Users.Account)
  Users: Users[];
}
