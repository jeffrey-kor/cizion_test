import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Post } from "./Post";
import { Comment } from "./Comment";
import { Likes } from "./Likes";
import { Dislikes } from "./Dislikes";
import {UserInterface} from "../interfaces/User.interface";

@Entity({ name: "users" })
export class User extends BaseEntity {

  @PrimaryGeneratedColumn({ type: "int" })
  private user_id: number;

  @Column("varchar", { length: 50, nullable: false })
  private user_name: string;

  @Column("varchar", { length: 100, nullable: false })
  private user_password: string;

  @Column("varchar", { length: 50, nullable: false })
  private user_phone: string;

  @Column("varchar", { length: 100, nullable: false })
  private user_email: string;

  @Column("varchar", { length: 100, nullable: true })
  private user_address: string;

  @CreateDateColumn()
  private created_At: Date;

  @UpdateDateColumn({ type: "timestamp" })
  private updated_At: Date;

  @OneToMany(() => Post, (post) => post.user)
  public post: Post[];

  @OneToMany(() => Comment, (comment) => comment.user)
  public comment: Comment[];

  @OneToMany(() => Likes, (likes) => likes.user)
  public likes: Likes[];

  @OneToMany(() => Dislikes, (dislikes) => dislikes.user)
  public dislikes: Dislikes[];

  get getUserId(): number { return this.user_id; }
  get getUserName(): string { return this.user_name; }
  get getUserPassword(): string { return this.user_password; }
  get getUserPhone(): string { return this.user_phone; }
  get getUserEmail(): string { return this.user_email; }
  get getUserAddress(): string { return this.user_address; }

}
