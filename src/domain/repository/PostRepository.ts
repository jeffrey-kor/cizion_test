import { EntityRepository, Repository } from "typeorm";
import { Post } from "../entity/Post";
import { Service } from "typedi";
import { PostGetAllCommentDto } from "../../controller/dtos/PostGetAllCommentDto";

@Service()
@EntityRepository(Post)
export class PostRepository extends Repository<Post> {

  async getAllComment(postGetAllCommentDto: PostGetAllCommentDto): Promise<Post> {
    return await this.createQueryBuilder("post")
      .leftJoin("post.comment", "post")
      .where("post.post_id = :post_id", { post_id: postGetAllCommentDto.getPostId })
      .limit(postGetAllCommentDto.limit)
      .orderBy("DESC")
      .getOne();
  }
}