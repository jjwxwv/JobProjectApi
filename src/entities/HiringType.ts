import { Entity, OneToMany } from "typeorm";
import { Common } from "./utils/Common";
import { Post } from "./Post";

@Entity()
export class HiringType extends Common {
  @OneToMany(() => Post, (post) => post.hiringType)
  posts: Post[];
}
