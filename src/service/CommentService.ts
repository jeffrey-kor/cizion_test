import { Body } from "routing-controllers";
import { PostRepository } from "../domain/repository/PostRepository";
import { CommentRepository } from "../domain/repository/CommentRepository";
import { Comment } from "../domain/entity/Comment";

export class CommentService {

  private postRepository: PostRepository;
  private commentRepository: CommentRepository;

  constructor(
    private readonly postsRepository: PostRepository,
    private readonly commentsRepository: CommentRepository
  ) {
    this.postRepository = postsRepository;
    this.commentRepository = commentsRepository
  }

  async getOneComment(req: number) {
    const comment = await this.postsRepository.findOne({
      where: { post_id: req },
      relations: ["Comment"]
    });

    if (!comment) {
      return { status: 404, message: "포스트에 댓글이 없습니다." }
    }

    return { status: 200, comment: { comment }}
    //
    // return await getManager()
    //   .createQueryBuilder(User, "user")
    //   .where("user.userId = :id", {id})
    //   .getOne();
  }

  async getAllComment(req: number) {
    const comment = await this.postsRepository.find({
      where: { post_id: req },
      relations: ["Comment"]
    });

    if (!comment) {
      return { status: 404, message: "포스트에 댓글이 없습니다." }
    }

    return { status: 200, comment: { comment }}
  }

  /**
   * 유저가 해당하는 댓글에 좋아요를 누를 수 있음.
   * 좋아요를 누른다면, 해당 댓글에는 다시 좋아요를 할 수 없음.
   */
  async like(req: number) {}

  async cancelLike(req: number) {}

  async dislike(req: number) {}

  async cancelDislike(req: number) {}

  async getAllNestedComment() {}

  /**
   * 머신러닝 딥러닝 NLP 구현
   * 단순 정규표현식 이용
   * 트라이나 해쉬테이블로 만들수 있는 모든 문자열의 경우의 수를 찾아 하나씩 금지어인지 아닌지 판단한다.?
   * Dictionary library(?) 또는 Open API 이용..?
   */
  async isForbiddenWordUsed() {}

  /**
   * 최신순으로 정렬한 후 달린 댓글 중 10개만 가져와서,
   * 지금 작성한 유저의 id와 컨텐트의 내용이 일치하면,
   * 중복이라고 띄어줌
   */
  async blockDuplicatedComment() {}

  async writeComment(@Body() req) {
    const write = await this.commentsRepository.save(req);
    return { status: 201 };
  }

  async editComment(@Body() req) {
    const edit = await this.commentsRepository.update({ comment_id: req.comment_id }, req.comment_content);
    return { status: 204, comment: { edit }};
  }

  /**
   * 1번째, 댓글 작성자인지 확인
   * 2번째, 댓글에 포함된 대댓글이 있는지 확인
   * 3번째, 대댓글 삭제 // 대댓글이 달려있으면 댓글으 삭제 할수 없도록 만든다던지 고민
   * 4번째, 댓글삭제
   */
  async deleteComment(@Body() req) {
    const q = await this.commentsRepository.delete(req.comment_id);
  }

}