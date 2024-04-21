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
  const post = await Post.find({
    where: query,
  });
  return res.json(post);
};

export const getPostByPostId = async (req: Request, res: Response) => {
  const { id } = req.params;
  let query: FindOptionsWhere<Post>;
  query = { id: Number(id) };
  const post = await Post.findOne({
    where: query,
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
    const jobD = new JobDescription();
    jobD.title = desc;
    return jobD;
  });
  const respons = responsibility.map((res) => {
    const resp = new Responsibility();
    resp.title = res;
    return resp;
  });
  const qualify = qualification.map((qua) => {
    const qual = new Qualification();
    qual.title = qua;
    return qual;
  });
  const benefits = benefit.map((ben: any) => {
    const bene = new Benefit();
    bene.title = ben;
    return bene;
  });
  const post = new Post();
  post.title = title;
  post.company = company;
  post.salary = salary;
  post.category = category;
  post.hiringType = hiringType;
  post.exp = exp;
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
  const post = await Post.findOneOrFail({ where: { id: Number(id) } });
  const company = await Company.findOneOrFail({ where: { id: companyId } });
  const salary = await Salary.findOneOrFail({ where: { id: salaryId } });
  const category = await Category.findOneOrFail({ where: { id: categoryId } });
  const hiringType = await HiringType.findOneOrFail({
    where: { id: hiringTypeId },
  });
  const exp = await Exp.findOneOrFail({ where: { id: expId } });
  const jobDesc = await jobDescription.map(async (desc) => {
    await JobDescription.update({ post }, { title: desc });
    const jobD = JobDescription.findOneOrFail({
      where: { post: { id: Number(id) } },
    });
    return jobD;
  });
  const respons = responsibility.map(async (res) => {
    await Responsibility.update({ post }, { title: res });
    const resp = Responsibility.findOneOrFail({
      where: { post: { id: Number(id) } },
    });
    return resp;
  });
  const qualify = qualification.map(async (qua) => {
    await Qualification.update({ post }, { title: qua });
    const qual = Qualification.findOneOrFail({
      where: { post: { id: Number(id) } },
    });
    return qual;
  });
  const benefits = benefit.map(async (ben: any) => {
    await Benefit.update({ post }, { title: ben });
    const bene = Benefit.findOneOrFail({ where: { post: { id: Number(id) } } });
    return bene;
  });
  await Post.update(id, {
    title,
    company,
    salary,
    category,
    hiringType,
    exp,
    jobDescription: jobDesc,
  });

  return res.json(post);
};
