import { Service } from "typedi";

@Service()
export class PostGetAllCommentDto {

  public post_id: number;
  public limit: number;

  get getPostId() { return this.post_id; }
  get getLimit() { return this.limit; }

}