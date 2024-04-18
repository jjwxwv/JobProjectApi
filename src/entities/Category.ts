import { Entity, OneToMany } from "typeorm";
import { Common } from "./utils/Common";
import { Post } from "./Post";

@Entity("category")
export class Category extends Common {
  @OneToMany(() => Post, (post) => post.category)
  posts: Post[];
}
