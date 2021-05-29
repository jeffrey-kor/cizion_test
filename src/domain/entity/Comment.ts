import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne, OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { User } from "./User";
import { Post } from "./Post";
import { Likes } from "./Likes";
import { Dislikes } from "./Dislikes";

@Entity({ name: "comments" })
export class Comment extends BaseEntity {

  @PrimaryGeneratedColumn({ type: "int" })
  private comment_id: number;

  @Column({ length: 150, nullable: false })
  private comment_content: string;

  @Column({ nullable: false })
  private nested: number;

  @Column({ nullable: false })
  private order: number;

  @Column({ nullable: false })
  private group: number;

  @CreateDateColumn()
  private created_At: Date;

  @UpdateDateColumn()
  private updated_At: Date;

  @ManyToOne(() => User, (user) => user.comment, { nullable: false, onDelete: 'CASCADE' })
  public user: User;

  @ManyToOne(() => Post, (post) => post.comment, { nullable: false, onDelete: 'CASCADE' })
  public post: Post;

  @OneToMany(() => Likes, (likes) => likes.comment)
  public likes: Likes[];

  @OneToMany(() => Dislikes, (dislikes) => dislikes.comment)
  public dislikes: Dislikes[];

}