import { Entity, OneToMany } from "typeorm";
import { Common } from "./utils/Common";
import { Post } from "./Post";

@Entity("salary")
export class Salary extends Common {
  @OneToMany(() => Post, (post) => post.salary)
  posts: Post[];
}
