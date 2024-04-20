import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Post } from "./Post";

@Entity("company")
export class Company extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  company_name: string;

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
