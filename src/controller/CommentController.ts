import { Delete, Get, Controller, Post, Put, Req, Param, Res } from "routing-controllers";
import { CommentService } from "../service/CommentService";
import { CommentWriteDto } from "./dtos/CommentWriteDto";
import { CommentEditDto } from "./dtos/CommentEditDto";
import { CommentDeleteDto } from "./dtos/CommentDeleteDto";
// import { Service } from "typedi";

// @Service()
@Controller("/comment")
export class CommentController {

  private commentService: CommentService;

  constructor(private readonly commentsService: CommentService) {
    this.commentService = commentsService;
  }

  @Get("comment")
  async test() {
    return "Hello, World!, This is comment Controller";
  }

  @Get("/:id")
  async getOneComment(@Param("id") req: number) {
    await this.commentService.getOneComment(req);
  }

  @Get("/all/:postId")
  async getAllComment(@Param("postId") req: number) {
    await this.commentService.getAllComment(req);
  }

  @Get("/nested/all/:commentId")
  async getAllNestedComment(@Param("commentId") req: number) {
    await this.commentService.getOneComment(req);
  }

  @Get("/forbidden")
  async isForbiddenWordUsed() {}

  @Get("/duplicate")
  async blockDuplicatedComment() {}

  @Post("/write")
  async writeComment(@Req() req: CommentWriteDto, @Res() res) {
    await this.commentService.writeComment(req);
  }

  @Put("/edit")
  async editComment(@Req() req: CommentEditDto, @Res() res) {
    await this.commentService.editComment(req);
  }

  @Delete("/delete")
  async deleteComment(@Req() req: CommentDeleteDto, @Res() res) {
    await this.commentService.deleteComment(req);
  }

}