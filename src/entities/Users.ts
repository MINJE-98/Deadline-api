import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { TeamMembers } from "./TeamMembers";
import { SocialAccounts } from "./SocialAccounts";

@Index("FK_Users_socialID_SocialAccounts_id", ["socialId"], {})
@Entity("Users", { schema: "Deadline" })
export class Users {
  @PrimaryGeneratedColumn({ type: "int", name: "id", comment: "ID" })
  id: number;

  @Column("int", { name: "socialID", nullable: true, comment: "UID" })
  socialId: number | null;

  @Column("varchar", { name: "name", comment: "유저이름", length: 100 })
  name: string;

  @Column("varchar", { name: "email", comment: "유저이메일", length: 100 })
  email: string;

  @Column("datetime", { name: "createAt", comment: "유저생성일자" })
  createAt: Date;

  @Column("datetime", { name: "updateAt", comment: "유저수정일자" })
  updateAt: Date;

  @Column("datetime", {
    name: "deleteAt",
    nullable: true,
    comment: "유저삭제일자",
  })
  deleteAt: Date | null;

  @OneToMany(() => TeamMembers, (teamMembers) => teamMembers.user)
  teamMembers: TeamMembers[];

  @ManyToOne(() => SocialAccounts, (socialAccounts) => socialAccounts.users, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "socialID", referencedColumnName: "id" }])
  social: SocialAccounts;
}
