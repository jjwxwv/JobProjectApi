import { Entity, OneToMany } from "typeorm";
import { Common } from "./utils/Common";
import { Post } from "./Post";

@Entity()
export class Exp extends Common {
  @OneToMany(() => Post, (post) => post.exp)
  posts: Post[];
}
