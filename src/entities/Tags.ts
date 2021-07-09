import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Deadlines } from "./Deadlines";
import { Teams } from "./Teams";

@Index("FK_Tags_teamId_Teams_id", ["teamId"], {})
@Entity("Tags", { schema: "Deadline" })
export class Tags {
  @PrimaryGeneratedColumn({ type: "int", name: "id", comment: "테그아이디" })
  id: number;

  @Column("int", { name: "teamId", comment: "팀아이디" })
  teamId: number;

  @Column("varchar", { name: "name", comment: "테그이름", length: 100 })
  name: string;

  @Column("datetime", { name: "createAt", comment: "테그생성일자" })
  createAt: Date;

  @Column("datetime", { name: "updateAt", comment: "테그수정일자" })
  updateAt: Date;

  @Column("datetime", {
    name: "deleteAt",
    nullable: true,
    comment: "테그삭제일자",
  })
  deleteAt: Date | null;

  @OneToMany(() => Deadlines, (deadlines) => deadlines.tag)
  deadlines: Deadlines[];

  @ManyToOne(() => Teams, (teams) => teams.tags, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "teamId", referencedColumnName: "id" }])
  team: Teams;
}
