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
import { Like } from "typeorm";

export const getPosts = async (req: Request, res: Response) => {
  const { title, salary, category, hiringType } = req.query;
  let toLowerCaseTitle;
  let query = {};
  if (typeof title == "string") toLowerCaseTitle = title.toLowerCase();
  if (title) query = { ...query, title: Like(`%${toLowerCaseTitle}%`) };
  if (salary) query = { ...query, salary };
  if (category) query = { ...query, category };
  if (hiringType) query = { ...query, hiringType };
  const post = await Post.find({
    where: query,
    relations: [
      "company",
      "salary",
      "category",
      "hiringType",
      "exp",
      "jobDescription",
      "responsibility",
      "qualification",
      "benefit",
    ],
  });
  return res.json(post);
};

export const getPostByPostId = async (req: Request, res: Response) => {
  const postId = req.params;
  const post = await Post.findOne(postId, {
    relations: [
      "company",
      "salary",
      "category",
      "hiringType",
      "exp",
      "jobDescription",
      "responsibility",
      "qualification",
      "benefit",
    ],
  });
  return res.json(post);
};

export const addNewPost = async (req: Request, res: Response) => {
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
  let toLowerCaseTitle;
  if (typeof title == "string") toLowerCaseTitle = title.toLowerCase();
  const company = await Company.findOne(companyId);
  const salary = await Salary.findOne(salaryId);
  const category = await Category.findOne(categoryId);
  const hiringType = await HiringType.findOne(hiringTypeId);
  const exp = await Exp.findOne(expId);
  const post = Post.create({
    title: toLowerCaseTitle,
    company,
    salary,
    category,
    hiringType,
    exp,
  });
  const jobDesc = jobDescription.map((desc: any) => {
    return JobDescription.create({ title: desc.title });
  });
  const respons = responsibility.map((res: any) => {
    return Responsibility.create({ title: res.title });
  });
  const qualify = qualification.map((qua: any) => {
    return Qualification.create({ title: qua.title });
  });
  const benefits = benefit.map((ben: any) => {
    return Benefit.create({ title: ben.title });
  });
  post.jobDescription = jobDesc;
  post.responsibility = respons;
  post.qualification = qualify;
  post.benefit = benefits;
  await post.save();
  console.log(post);
  return res.json(post);
};

export const editPost = async (req: Request, res: Response) => {
  const postId = req.params;
};
