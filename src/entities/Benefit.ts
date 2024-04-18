import { Entity, JoinColumn, ManyToOne } from "typeorm";
import { Common } from "./utils/Common";
import { Post } from "./Post";

@Entity()
export class Benefit extends Common {
  @ManyToOne(() => Post, (post) => post.benefit, {
    onDelete: "CASCADE",
  })
  @JoinColumn({
    name: "post_id",
  })
  post: Post;
}
