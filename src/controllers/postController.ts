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

export const getPosts = async (req: Request, res: Response) => {
  //   let { salary, hiring_type, category } = req.query;
};

export const getPostByPostId = async (req: Request, res: Response) => {};

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
  const company = await Company.findOne(companyId);
  const salary = await Salary.findOne(salaryId);
  const category = await Category.findOne(categoryId);
  const hiringType = await HiringType.findOne(hiringTypeId);
  const exp = await Exp.findOne(expId);
  const post = Post.create({
    title,
    company,
    salary,
    category,
    hiringType,
    exp,
  });
  await post.save();
  //add free text
//   const jobDesc = JobDescription.create({
//     title: jobDescription.title,
//     post,
//   });
//   await jobDesc.save();
//   const respons = Responsibility.create({
//     title: responsibility.title,
//     post,
//   });
//   await respons.save();
//   const qualifies = Qualification.create({
//     title: qualification.title,
//     post,
//   });
//   await qualifies.save();
//   const benefits = Benefit.create({
//     title: benefit.title,
//     post,
//   });
//   await benefits.save();
//   return res.json(post);
// };

export const editPost = async (req: Request, res: Response) => {
  const postId = req.params;
};
