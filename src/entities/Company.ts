import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Common } from "./utils/Common";
import { Post } from "./Post";

@Entity("company")
export class Company extends Common {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  company_ts: string;

  @Column()
  address: string;

  @Column()
  tel: string;

  @Column()
  email: string;

  @Column()
  image_url: string;

  @OneToMany(() => Post, (post) => post.company)
  posts: Post[];
}
