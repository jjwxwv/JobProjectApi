import { Request, Response } from "express";
import { Post } from "../entities/Post";
import { Company } from "../entities/Company";
import { Salary } from "../entities/Salary";
import { Category } from "../entities/Category";
import { HiringType } from "../entities/HiringType";
import { Exp } from "../entities/Exp";
import { JobDescription } from "../entities/JobDescription";
import { Responsibility } from "../entities/Responsibility";
import { Qualification } from "../entities/Qualification";
import { Benefit } from "../entities/Benefit";
import { FindOptionsWhere, Like } from "typeorm";

type getPostsType = {
  title: string | undefined;
  salaryId: number | undefined;
  categoryId: number | undefined;
  hiringTypeId: number | undefined;
};
export const getPosts = async (
  req: Request<{}, {}, {}, getPostsType>,
  res: Response
) => {
  const { title, salaryId, categoryId, hiringTypeId } = req.query;
  const query: FindOptionsWhere<Post> | undefined = {};
  query.title = Like(`%${title?.toLowerCase()}%`);
  query.salary = {
    id: salaryId,
  };
  query.category = {
    id: categoryId,
  };
  query.hiringType = {
    id: hiringTypeId,
  };
  console.log(query);
  const post = await Post.find({
    where: [query.salary, query.category, query.hiringType],
  });
  return res.json(post);
};

export const getPostByPostId = async (req: Request, res: Response) => {
  const { id } = req.params;
  const post = await Post.findOne({
    where: { id: Number(id) },
  });
  return res.json(post);
};

type addNewPostType = {
  title: string;
  companyId: number;
  salaryId: number;
  categoryId: number;
  hiringTypeId: number;
  expId: number;
  jobDescription: string[];
  responsibility: string[];
  qualification: string[];
  benefit: string[];
};
export const addNewPost = async (
  req: Request<{}, {}, addNewPostType>,
  res: Response
) => {
  const {
    title,
    companyId,
    salaryId,
    categoryId,
    hiringTypeId,
    expId,
    jobDescription,
    responsibility,
    qualification,
    benefit,
  } = req.body;
  const company = await Company.findOneOrFail({ where: { id: companyId } });
  const salary = await Salary.findOneOrFail({ where: { id: salaryId } });
  const category = await Category.findOneOrFail({ where: { id: categoryId } });
  const hiringType = await HiringType.findOneOrFail({
    where: { id: hiringTypeId },
  });
  const exp = await Exp.findOneOrFail({ where: { id: expId } });
  const jobDesc = jobDescription.map((desc) => {
    const jobD = JobDescription.create({ title: desc });
    return jobD;
  });
  const respons = responsibility.map((res) => {
    const resp = Responsibility.create({ title: res });
    return resp;
  });
  const qualify = qualification.map((qua) => {
    const qual = Qualification.create({ title: qua });
    return qual;
  });
  const benefits = benefit.map((ben: any) => {
    const bene = Benefit.create({ title: ben });
    return bene;
  });
  const post = Post.create({
    title: title.toLowerCase(),
    company,
    salary,
    category,
    hiringType,
    exp,
  });
  post.jobDescription = jobDesc;
  post.responsibility = respons;
  post.qualification = qualify;
  post.benefit = benefits;
  await post.save();
  console.log(post);
  return res.json(post);
};

export const editPost = async (
  req: Request<{ id: string }, {}, addNewPostType>,
  res: Response
) => {
  const { id } = req.params;
  const {
    title,
    companyId,
    salaryId,
    categoryId,
    hiringTypeId,
    expId,
    jobDescription,
    responsibility,
    qualification,
    benefit,
  } = req.body;
  const company = await Company.findOneOrFail({ where: { id: companyId } });
  const salary = await Salary.findOneOrFail({ where: { id: salaryId } });
  const category = await Category.findOneOrFail({ where: { id: categoryId } });
  const hiringType = await HiringType.findOneOrFail({
    where: { id: hiringTypeId },
  });
  const exp = await Exp.findOneOrFail({ where: { id: expId } });
  await Post.update(id, {
    title: title.toLowerCase(),
    company: company,
    salary,
    category,
    hiringType,
    exp,
  });
  const post = await Post.findOneOrFail({ where: { id: Number(id) } });
  await JobDescription.delete({ post: { id: Number(id) } });
  await Responsibility.delete({ post: { id: Number(id) } });
  await Qualification.delete({ post: { id: Number(id) } });
  await Benefit.delete({ post: { id: Number(id) } });
  const jobDesc = jobDescription.map((desc) => {
    const jobD = JobDescription.create({ title: desc, post });
    return jobD;
  });
  const respons = responsibility.map((res) => {
    const resp = Responsibility.create({ title: res, post });
    return resp;
  });
  const qualify = qualification.map((qua) => {
    const qual = Qualification.create({ title: qua, post });
    return qual;
  });
  const benefits = benefit.map((ben: any) => {
    const bene = Benefit.create({ title: ben, post });
    return bene;
  });
  await JobDescription.save(jobDesc);
  await Responsibility.save(respons);
  await Qualification.save(qualify);
  await Benefit.save(benefits);
  const updatedPost = await Post.findOneOrFail({ where: { id: Number(id) } });
  console.log(updatedPost);
  return res.json(updatedPost);
};
