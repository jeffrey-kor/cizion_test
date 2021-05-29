import { Get, JsonController, Req } from "routing-controllers";
import { PostService } from "../service/PostService";
import { Inject } from "typedi";
import { PostGetAllCommentDto } from "./dtos/PostGetAllCommentDto";

@JsonController("/post")
export class PostController {

  constructor(
    @Inject("PostService") private postService: PostService,
    @Inject("PostGetAllCommentDto") private postGetAllCommentDto: PostGetAllCommentDto
  ) {}

  @Get("/all-comment")
  async getAllComment(@Req() postGetAllCommentDto: PostGetAllCommentDto) {
    await this.postService.getAllComment(postGetAllCommentDto);
  }


}