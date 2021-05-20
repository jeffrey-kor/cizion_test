import { EntityRepository, Repository } from "typeorm";
import { Comment } from "../entity/Comment";
import { Service } from "typedi";

@Service()
@EntityRepository(Comment)
export class CommentRepository extends Repository<Comment> {}
