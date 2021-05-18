import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";
import { Comment } from "./Comment";

@Entity({ name: "posts"})
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn({  type: "int", name: "id" })
  post_id: number;

  @Column("varchar", { length: 40, nullable: false })
  post_author: string;

  @Column("varchar",{ length: 40, nullable: false })
  post_title: string;

  @Column("varchar", { length: 255, nullable: false })
  post_content: string;

  @CreateDateColumn()
  created_At: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updated_At: Date;

  @ManyToOne(() => User, (user) => user.post, { nullable: false, onDelete: 'CASCADE' })
  public user: User;

  @OneToMany(() => Comment, (comment) => comment.post, { nullable: false, onDelete: 'CASCADE' })
  public comment: Comment[];

}