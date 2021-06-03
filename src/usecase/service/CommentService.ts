import { Body } from "routing-controllers";
import { PostRepository } from "../../domain/repository/PostRepository";
import { CommentRepository } from "../../domain/repository/CommentRepository";
import { Comment } from "../../domain/entity/Comment";
import { Inject, Service } from "typedi";

@Service()
export class CommentService {

  constructor(
    @Inject("PostRepository") private readonly postsRepository: PostRepository,
    @Inject("CommentRepository") private readonly commentsRepository: CommentRepository
  ) {}

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

  async like() {
    // 댓글 사용자는 api를 이용할 수 없음.
    // 로그인이 되어야, like를 누를 수 있음
  }

  async cancelLike() {}

  async dislike() {
    // 댓글 사용자는 api를 이용할 수 없음.
    // 로그인이 되어야 like를 누를 수 있음.
    // 포스트 자체내에서 댓글의 필터링을 적용해봄직함.
    // 현재 서비스에 한번 더 클릭하면 좋아요 취소 이벤트가 없음.
  }

  async cancelDisLike() {}

  async getAllNestedComment() {}

  async isForbiddenWordUsed() {
    // 지금 금지어 처리가 미구현 되어있다?
    // 머신러닝 딥러닝 NLP 구현
    // 단순 정규표현식 이용
    // 트라이나 해쉬테이블로 만들수 있는 모든 문자열의 경우의 수를 찾아 하나씩 금지어인지 아닌지 판단한다.?
    // Dictionary library(?) 또는 Open API 이용..?

  }

  async blockDuplicatedComment() {
    // 최신순으로 정렬한 후 달린 댓글 중 10개만 가져와서,
    // 지금 작성한 유저의 id와 컨텐트의 내용이 일치하면,
    // 중복이라고 띄어줌
    // 지금 중복 코멘트를 작성하면, 그대로 중복이 허용됌, 시급한 문제를 야기(해커의 공격성이 있을수도 있음, 포스트에)
    // 그리고 하나의 리스트 출력은 좋은데 닉네임 바로 옆에 작성날짜가 보이면서 가독성이나 깔끔함을 해침
    // 그리고 댓글 작성 시점에서, 포스트 작성자나, 댓글 오리진 작성자나 해당 유저의 소셜 정보를 알 수 없음
  }

  async writeComment(@Body() req) {
    // req가 동영상인지, 이미지인지, 문자열인지 확인하는 로직이 필요함
    // 단순 스트링이라면, 이미지라면, 동영상이라면(움짤? GIF) Comment Content의 타입을 세가지 정도로 분류해 테이블을 따로 만들어서
    // 작성해볼 수 있을 것 같음.
    // 만약 오리진 댓글이 아니라 대댓글이 달렸을 경우, 오리진 댓글 작성자에게 알람이 가는 서비스를 제작해야함 // 별도로 고민
    // 댓글 인용 서비스는 어떻게 만드는거지 // 해쉬태그를 고민, 기존에 달린 댓글의 정보와 사용자 정보를 가져다 주는
    // 모든 데이터는 보안성을 중시하는데, 코멘트의 데이터 또한 보안성이 지켜져서 디비에 저장이 되어야 하나?
    // 그럼 로그인 사용자에 한 해 댓글이 보여지거나, 아니면 코멘트 작성자에 대한 정보만을 보안에 넣어야 한다.?
    // 대댓글이 달렸을 경우 알람이 가는 서비스를, 플러그인을 별도로 제작해 전구모양을 클릭하면 댓글 현황 자체를 파악할 수 있도록 리스트 형태로 API를 제공한다던지, -> 스크립트 코드에 몇줄 작성하면 될정도
    // 사용자 댓글 숨기기를 클릭할 경우, api를 호출해 해당 코멘트의 컨텐츠를 데이터분석 서버에 따로 제공하고 학습을 시켜야하나 ? // 어쨋던간에 데이터 자체는 분석과 학습이 필요하다고 판단
    // 관리자 콘솔도 생각해야함 // 관리자가 있다는것은 로그인 시 지금 이 사용자가 Role이 관리자인지 유저인지를 파악할 수 있는 코드를 만들어야함. 예) enum? Role 테이블 따로 설계
    // 재밌는걸 생각해보면 댓글에 유튜브 영상을 올려보는 것도 재밌을 듯, 작게, 그리고 재생버튼을 클릭하면 모두가 공유 가능한 유튜브 영상을 볼 수 있도록, 다만 사이트 자체 내에서 동영상이 가지고 있는
    // 트래픽 때문에 도입이 안되는 것인지 검색해서 알아보기 // 만약 성능 이슈라면, 유튜브 영상의 핵심내용을 편집한 동영상을 사이트에 무리 없을 정도의 파일 크기를 요구하는 근데 이거 자체가 GIF 아닌가
    // SDK 만드는 법 공부
    // 라이브 태그 공부

    const write = await this.commentsRepository.save(req);
    return { status: 201 };
  }

  async editComment(@Body() req) {
    const edit = await this.commentsRepository.update({ comment_id: req.comment_id }, req.comment_content);
    // 변경한 edit이 공백을 허용할건지 / 허용한다면 데이터베이스에는 어떻게 삽입을 해야할지
    // edit에 공백을 허용하지 않는다면, 공백입니다를 보내주고, 클라이언트에서 수정이 아닌 삭제를 요구한다던지,
    //
    return { status: 204, comment: { edit }};
  }

  async deleteComment(@Body() req) {
    // 1번째, 댓글 작성자인지 확인
    // 2번째, 댓글에 포함된 대댓글이 있는지 확인
    // 3번째, 대댓글 삭제 // 대댓글이 달려있으면 댓글으 삭제 할수 없도록 만든다던지 고민
    // 4번째, 댓글삭제
    const q = await this.commentsRepository.delete(req.comment_id);
  }

}