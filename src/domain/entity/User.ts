import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Post } from "./Post";
import { Comment } from "./Comment";
import { Likes } from "./Likes";
import { Dislikes } from "./Dislikes";
import { UserInterface } from "../interfaces/User.interface";

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

  @Column("varchar", { length: 50, nullable: true })
  private password_salt: string;

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


  constructor(user_id: number, user_name: string, user_password: string, user_phone: string, user_email: string, user_address: string, password_salt: string) {
    super();
    this.user_id = user_id;
    this.user_name = user_name;
    this.user_password = user_password;
    this.user_phone = user_phone;
    this.user_email = user_email;
    this.user_address = user_address;
    this.password_salt = password_salt;
  }

  // public static UserBuilder = class {
  //
  // }

}
