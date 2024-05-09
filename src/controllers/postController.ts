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
  page: number;
  perPage?: number;
  companyId: number | undefined;
  expId: number | undefined;
};
export const getPosts = async (
  req: Request<{}, {}, {}, getPostsType>,
  res: Response
) => {
  const {
    title,
    salaryId,
    categoryId,
    hiringTypeId,
    companyId,
    expId,
    page = 1,
    perPage = 4,
  } = req.query;
  const query: FindOptionsWhere<Post> | undefined = {};
  query.title = title ? ILike(`%${title.toLowerCase()}%`) : title;
  query.salary = { id: salaryId };
  query.category = { id: categoryId };
  query.hiringType = { id: hiringTypeId };
  query.company = { id: companyId };
  query.exp = { id: expId };
  const [post, totalPost] = await Post.findAndCount({
    where: query,
    take: perPage,
    skip: (page - 1) * perPage,
    select: {
      id: true,
      title: true,
      company: {
        image_url: true,
        company_name: true,
        address: true,
      },
      responsibility: true,
      category: {
        title: true,
      },
      salary: {
        title: true,
      },
      updated_at: true,
    },
    relations: {
      company: true,
      responsibility: true,
      category: true,
      salary: true,
    },
  });
  // const response = post.map((cur) => {
  //   const { company_name, address, image_url } = cur.company;
  //   const responsibility = cur.responsibility;
  //   return {
  //     id: cur.id,
  //     image_url,
  //     title: cur.title,
  //     companyName: company_name,
  //     address,
  //     category: cur.category.title,
  //     salary: cur.salary.title,
  //     responsibility,
  //     updatedAt: cur.updated_at,
  //   };
  // });
  const response = post.map((value) => {
    return {
      id: value.id,
      image_url: value.company.image_url,
      title: value.title,
      companyName: value.company.company_name,
      address: value.company.address,
      category: value.category.title,
      salary: value.salary.title,
      updatedAt: value.updated_at,
      responsibility: value.responsibility,
    };
  });
  return res.json({
    page,
    perPage,
    totalPages: Math.ceil(totalPost / perPage),
    totalPost,
    post: response,
  });
};

export const getPostByPostId = async (req: Request, res: Response) => {
  const { id } = req.params;
  const post = await Post.findOneOrFail({
    where: { id: Number(id) },
    select: {
      id: true,
      title: true,
      company: {
        id: true,
        company_name: true,
        email: true,
        tel: true,
        address: true,
        image_url: true,
      },
      category: {
        title: true,
      },
      hiringType: {
        title: true,
      },
      salary: {
        title: true,
      },
      exp: {
        title: true,
      },
      benefit: true,
      responsibility: true,
      qualification: true,
      updated_at: true,
    },
    relations: {
      company: true,
      responsibility: true,
      category: true,
      hiringType: true,
      salary: true,
      exp: true,
      benefit: true,
      qualification: true,
    },
  });
  const response = {
    image_url: post.company.image_url,
    title: post.title,
    companyName: post.company.company_name,
    companyId: post.company.id,
    email: post.company.email,
    tel: post.company.tel,
    updatedAt: post.updated_at,
    address: post.company.address,
    category: post.category.title,
    hiringType: post.hiringType.title,
    salary: post.salary.title,
    exp: post.exp.title,
    benefit: post.benefit,
    responsibility: post.responsibility,
    qualification: post.qualification,
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
    title: title,
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
