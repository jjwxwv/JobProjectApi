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
import { FindOptionsWhere, ILike } from "typeorm";

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
  query.title = title ? ILike(`%${title.toLowerCase()}%`) : title;
  query.salary = { id: salaryId };
  query.category = { id: categoryId };
  query.hiringType = { id: hiringTypeId };
  const post = await Post.find({
    where: query,
  });
  const response = post.map((cur) => {
    const { company_name, address, tel, email, image_url } = cur.company;
    const benefit = cur.benefit.map((value) => value);
    const jobDescription = cur.jobDescription.map((value) => value);
    const responsibility = cur.responsibility.map((value) => value);
    const qualification = cur.qualification.map((value) => value);
    return {
      id: cur.id,
      title: cur.title,
      updated_at: cur.updated_at,
      companyName: company_name,
      salary: cur.salary.title,
      address,
      tel,
      email,
      image_url,
      category: cur.category.title,
      hiringType: cur.hiringType.title,
      exp: cur.exp.title,
      benefit,
      jobDescription,
      responsibility,
      qualification,
    };
  });
  return res.json(response);
};

export const getPostByPostId = async (req: Request, res: Response) => {
  const { id } = req.params;
  const post = await Post.findOneOrFail({
    where: { id: Number(id) },
  });
  const { company_name, address, tel, email, image_url } = post.company;
  const benefit = post.benefit.map((value) => value);
  const jobDescription = post.jobDescription.map((value) => value);
  const responsibility = post.responsibility.map((value) => value);
  const qualification = post.qualification.map((value) => value);
  const response = {
    id: post.id,
    title: post.title,
    updated_at: post.updated_at,
    companyName: company_name,
    salary: post.salary.title,
    address,
    tel,
    email,
    image_url,
    category: post.category.title,
    hiringType: post.hiringType.title,
    exp: post.exp.title,
    benefit,
    jobDescription,
    responsibility,
    qualification,
  };
  return res.json(response);
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
