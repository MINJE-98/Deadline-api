import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Items } from "./Items";
import { Tags } from "./Tags";
import { Teams } from "./Teams";

@Index("FK_Deadlines_teamId_Teams_id", ["teamId"], {})
@Index("FK_Deadlines_tagId_Tags_id", ["tagId"], {})
@Index("FK_Deadlines_itemId_Items_id", ["itemId"], {})
@Entity("Deadlines", { schema: "Deadline" })
export class Deadlines {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "id",
    comment: "유통기한아이디",
  })
  id: number;

  @Column("int", { name: "teamId", comment: "팀아이디" })
  teamId: number;

  @Column("int", { name: "tagId", nullable: true, comment: "테그아이디" })
  tagId: number | null;

  @Column("int", { name: "itemId", nullable: true, comment: "아이템아이디" })
  itemId: number | null;

  @Column("datetime", { name: "ExpiredAt", comment: "유통기한" })
  expiredAt: Date;

  @Column("datetime", { name: "createAt", comment: "생성일자" })
  createAt: Date;

  @Column("datetime", { name: "updateAt", comment: "수정일자" })
  updateAt: Date;

  @Column("datetime", { name: "deleteAt", nullable: true, comment: "삭제일자" })
  deleteAt: Date | null;

  @ManyToOne(() => Items, (items) => items.deadlines, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "itemId", referencedColumnName: "id" }])
  item: Items;

  @ManyToOne(() => Tags, (tags) => tags.deadlines, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "tagId", referencedColumnName: "id" }])
  tag: Tags;

  @ManyToOne(() => Teams, (teams) => teams.deadlines, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "teamId", referencedColumnName: "id" }])
  team: Teams;
}
