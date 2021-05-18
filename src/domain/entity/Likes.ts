import { BaseEntity, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Comment } from "./Comment";

@Entity({ name: "likes" })
export class Likes extends BaseEntity {

  @PrimaryGeneratedColumn({ type: "int" })
  private likes_id: number;

  @ManyToOne(() => User, (user) => user.likes, { nullable: false, onDelete: 'CASCADE' })
  public user: User;

  @ManyToOne(() => Comment, (comment) => comment.likes, { nullable: false, onDelete: 'CASCADE' })
  public comment: Comment;
}
