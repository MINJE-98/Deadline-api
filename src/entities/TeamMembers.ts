import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Teams } from "./Teams";
import { Users } from "./Users";

@Index("FK_TeamMembers_teamId_Teams_id", ["teamId"], {})
@Index("FK_TeamMembers_userId_Users_id", ["userId"], {})
@Entity("TeamMembers", { schema: "Deadline" })
export class TeamMembers {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "id",
    comment: "팀에 소속된 유저",
  })
  id: number;

  @Column("int", { name: "teamId", comment: "팀아이디" })
  teamId: number;

  @Column("int", { name: "userId", comment: "유저아이디" })
  userId: number;

  @Column("int", { name: "state", comment: "가입상태" })
  state: number;

  @Column("datetime", { name: "reagisterAt", comment: "가입일자" })
  reagisterAt: Date;

  @Column("datetime", { name: "leaveAt", nullable: true, comment: "탈퇴일자" })
  leaveAt: Date | null;

  @ManyToOne(() => Teams, (teams) => teams.teamMembers, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "teamId", referencedColumnName: "id" }])
  team: Teams;

  @ManyToOne(() => Users, (users) => users.teamMembers, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "userId", referencedColumnName: "id" }])
  user: Users;
}
