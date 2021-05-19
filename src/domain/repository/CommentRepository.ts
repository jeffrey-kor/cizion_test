import { Repository } from "typeorm";
import { Comment } from "../entity/Comment";

export class CommentRepository extends Repository<Comment> {}
