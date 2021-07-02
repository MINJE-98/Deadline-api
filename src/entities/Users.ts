import {
  Column,
  Entity,
  Index,
  JoinColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  CreateDateColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SocialAccounts } from './SocialAccounts';

@Index('FK_Users_accountid_SocialAccounts_id', ['accountid'], {})
@Entity('Users', { schema: 'Deadline' })
export class Users {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { primary: true, name: 'accountid' })
  accountid: number;

  @Column('varchar', { name: 'name', length: 30 })
  name: string;

  @Column('varchar', { name: 'email', length: 30 })
  email: string;

  @Column('varchar', { name: 'profileUrl', length: 255 })
  profileurl: string;

  @CreateDateColumn({ name: 'createAt' })
  createAt: string;

  @CreateDateColumn({ name: 'updateAt' })
  updateAt: string;

  @CreateDateColumn({ name: 'deleteAt' })
  deleteAt: string | null;

  @ManyToOne(() => SocialAccounts, SocialAccounts => SocialAccounts.Users, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'accountid', referencedColumnName: 'id' }])
  Account: SocialAccounts;
}
