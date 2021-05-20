import { EntityRepository, Repository } from "typeorm";
import { Post } from "../entity/Post";
import { Service } from "typedi";

@Service()
@EntityRepository(Post)
export class PostRepository extends Repository<Post> {}