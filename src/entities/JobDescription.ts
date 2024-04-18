import { Entity, JoinColumn, ManyToOne } from "typeorm";
import { Common } from "./utils/Common";
import { Post } from "./Post";

@Entity()
export class JobDescription extends Common {
  @ManyToOne(() => Post, (post) => post.job_description, {
    onDelete: "CASCADE",
  })
  @JoinColumn({
    name: "post_id",
  })
  post: Post;
}
