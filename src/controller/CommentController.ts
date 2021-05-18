import { Delete, Get, Controller, Post, Put } from "routing-controllers";
// import { Service } from "typedi";

// @Service()
@Controller()
export class CommentController {

  @Get("comment")
  async test() {
    return "Hello, World!, This is comment Controller";
  }

  @Get()
  async getOneComment() {}

  @Get()
  async getAllComment() {}

  @Get()
  async getAllNestedComment() {}

  @Get()
  async isForbiddenWordUsed() {}

  @Get()
  async blockDuplicatedComment() {}

  @Post()
  async writeComment() {}

  @Put()
  async editComment() {}

  @Delete()
  async deleteComment() {}

}