import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Deadlines } from "./Deadlines";
import { Items } from "./Items";
import { Tags } from "./Tags";
import { TeamMembers } from "./TeamMembers";

@Entity("Teams", { schema: "Deadline" })
export class Teams {
  @PrimaryGeneratedColumn({ type: "int", name: "id", comment: "팀아이디" })
  id: number;

  @Column("varchar", { name: "name", comment: "팀이름", length: 100 })
  name: string;

  @Column("datetime", { name: "createAt", comment: "팀생성일자" })
  createAt: Date;

  @Column("datetime", { name: "updateAt", comment: "팀수정일자" })
  updateAt: Date;

  @Column("datetime", {
    name: "deleteAt",
    nullable: true,
    comment: "팀삭제일자",
  })
  deleteAt: Date | null;

  @OneToMany(() => Deadlines, (deadlines) => deadlines.team)
  deadlines: Deadlines[];

  @OneToMany(() => Items, (items) => items.team)
  items: Items[];

  @OneToMany(() => Tags, (tags) => tags.team)
  tags: Tags[];

  @OneToMany(() => TeamMembers, (teamMembers) => teamMembers.team)
  teamMembers: TeamMembers[];
}
