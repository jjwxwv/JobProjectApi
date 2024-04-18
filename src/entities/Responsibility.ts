import { Entity, JoinColumn, ManyToOne } from "typeorm";
import { Common } from "./utils/Common";
import { Post } from "./Post";

@Entity()
export class Responsibility extends Common {
  @ManyToOne(() => Post, (post) => post.responsibility, {
    onDelete: "CASCADE",
  })
  @JoinColumn({
    name: "post_id",
  })
  post: Post;
}
