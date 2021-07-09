import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./Users";

@Entity("SocialAccounts", { schema: "Deadline" })
export class SocialAccounts {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "id",
    comment: "소셜계정아이디",
  })
  id: number;

  @Column("varchar", { name: "uid", comment: "소셜계정 uid", length: 255 })
  uid: string;

  @Column("varchar", { name: "provider", comment: "제공자", length: 30 })
  provider: string;

  @Column("varchar", {
    name: "refreshToken",
    comment: "리프레쉬토큰",
    length: 255,
  })
  refreshToken: string;

  @Column("datetime", {
    name: "refreshExpiredAt",
    comment: "리프레쉬토큰 만료일자",
  })
  refreshExpiredAt: Date;

  @OneToMany(() => Users, (users) => users.social)
  users: Users[];
}
