import { Request, Response, request } from "express";
import { Company } from "../entities/Company";
import { Post } from "../entities/Post";
import { companyType } from "./userController";
import { User } from "../entities/User";

export const getCompanyProfile = async (req: Request, res: Response) => {
  const { id } = req.params;
  const company = await Company.findOneOrFail({ where: { id: Number(id) } });
  return res.json(company);
};
type CompanyParams = {
  id: number;
};
type CompanyQuery = {
  page: number;
  perPage?: number;
};
export const getCompanyById = async (
  req: Request<CompanyParams, {}, {}, CompanyQuery>,
  res: Response
) => {
  const { id } = req.params;
  const { page = 1, perPage = 3 } = req.query;
  const company = await Company.findOneOrFail({ where: { id: Number(id) } });
  // const [post, totalPost] = await Post.findAndCount({
  //   where: { company: { id: Number(id) } },
  //   take: perPage,
  //   skip: (page - 1) * perPage,
  //   select: {
  //     id: true,
  //     title: true,
  //     company: {
  //       image_url: true,
  //       company_name: true,
  //       address: true,
  //     },
  //     responsibility: true,
  //     category: {
  //       title: true,
  //     },
  //     salary: {
  //       title: true,
  //     },
  //     updated_at: true,
  //   },
  //   relations: {
  //     company: true,
  //     responsibility: true,
  //     category: true,
  //     salary: true,
  //   },
  // });
  const companyResponse = {
    id: company.id,
    companyName: company.company_name,
    address: company.address,
    tel: company.tel,
    email: company.email,
    image_url: company.image_url,
    companyDescription: company.companyDescription,
  };
  // const postResponse = post.map((value) => {
  //   return {
  //     id: value.id,
  //     image_url: value.company.image_url,
  //     title: value.title,
  //     companyName: value.company.company_name,
  //     address: value.company.address,
  //     category: value.category.title,
  //     salary: value.salary.title,
  //     updatedAt: value.updated_at,
  //     responsibility: value.responsibility,
  //   };
  // });
  return res.json(companyResponse);
};

export const editCompanyProfile = async (
  req: Request<{ id: string }, {}, companyType>,
  res: Response
) => {
  const { id } = req.params;
  const { email, companyName, address, tel, companyEmail, imageUrl } = req.body;
  await Company.update(id, {
    company_name: companyName,
    address,
    tel,
    email: companyEmail,
    image_url: imageUrl,
  });
  const company = await Company.findOneOrFail({ where: { id: Number(id) } });
  await User.update(company.id, {
    email,
    company,
  });
  const user = await User.findOneOrFail({
    where: { company: { id: Number(id) } },
  });
  return res.json({ user, company });
};
