import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Common } from "./utils/Common";
import { Company } from "./Company";
import { Salary } from "./Salary";
import { Category } from "./Category";
import { HiringType } from "./HiringType";
import { Exp } from "./Exp";
import { Benefit } from "./Benefit";
import { JobDescription } from "./JobDescription";
import { Responsibility } from "./Responsibility";
import { Qualification } from "./Qualification";

@Entity("post")
export class Post extends Common {
  @ManyToOne(() => Company, (company) => company.posts, {
    onDelete: "CASCADE",
  })
  @JoinColumn({
    name: "company_id",
  })
  company: Company;

  @ManyToOne(() => Salary, (salary) => salary.posts, {
    onDelete: "CASCADE",
  })
  @JoinColumn({
    name: "saraly_id",
  })
  salary: Salary;

  @ManyToOne(() => Category, (category) => category.posts, {
    onDelete: "CASCADE",
  })
  @JoinColumn({
    name: "category_id",
  })
  category: Category;

  @ManyToOne(() => HiringType, (hiring) => hiring.posts, {
    onDelete: "CASCADE",
  })
  @JoinColumn({
    name: "hiring_id",
  })
  hiring_type: HiringType;

  @ManyToOne(() => Exp, (exp) => exp.posts, {
    onDelete: "CASCADE",
  })
  @JoinColumn({
    name: "exp_id",
  })
  exp: Exp;

  @OneToMany(() => Benefit, (benefit) => benefit.post)
  benefit: Benefit[];

  @OneToMany(() => JobDescription, (jobDesc) => jobDesc.post)
  job_description: JobDescription[];

  @OneToMany(() => Responsibility, (responsibility) => responsibility.post)
  responsibility: Responsibility[];

  @OneToMany(() => Qualification, (qualification) => qualification.post)
  qualification: Qualification[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
