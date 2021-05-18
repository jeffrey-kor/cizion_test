import {BaseEntity, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import { User } from "./User";
import { Comment } from "./Comment";

@Entity({ name: "dislikes" })
export class Dislikes extends BaseEntity {

  @PrimaryGeneratedColumn({ type: "int" })
  private dislikes_id: number;

  @ManyToOne(() => User, (user) => user.dislikes, { nullable: false, onDelete: 'CASCADE' })
  public user: User;

  @ManyToOne(() => Comment, (comment) => comment.dislikes, { nullable: false, onDelete: 'CASCADE' })
  public comment: Comment;

}