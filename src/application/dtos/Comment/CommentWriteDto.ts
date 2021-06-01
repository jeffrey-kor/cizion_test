
export class CommentWriteDto {
  private comment_id: number;
  private comment_content: string;
  private nested: number;
  private order: number;
  private group: number;

  constructor(comment_id: number, comment_content: string, nested: number, order: number, group: number) {
    this.comment_id = comment_id;
    this.comment_content = comment_content;
    this.nested = nested;
    this.order = order;
    this.group = group;
  }

  get getCommentId(): number { return this.comment_id; }
  set setCommentId(value: number) { this.comment_id = value; }

  get getCommentContent(): string { return this.comment_content; }
  set setCommentContent(value: string) { this.comment_content = value; }

  get getNested(): number { return this.nested; }
  set setNested(value: number) { this.nested = value; }

  get getOrder(): number { return this.order; }
  set setOrder(value: number) { this.order = value; }

  get getGroup(): number { return this.group; }
  set setGroup(value: number) { this.group = value; }

}