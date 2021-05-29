import { Inject, Service } from "typedi";
import { PostGetAllCommentDto } from "../controller/dtos/PostGetAllCommentDto";
import { PostRepository } from "../domain/repository/PostRepository";
import { Post } from "../domain/entity/Post";

@Service()
export class PostService {

  constructor(@Inject("PostRepository") private postRepository: PostRepository) {}

  async getAllComment(postGetAllCommentDto: PostGetAllCommentDto): Promise<Post> {
    return await this.postRepository.getAllComment(postGetAllCommentDto);
  }


}