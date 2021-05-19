import { Repository } from "typeorm";
import { Post } from "../entity/Post";

export class PostRepository extends Repository<Post> {}