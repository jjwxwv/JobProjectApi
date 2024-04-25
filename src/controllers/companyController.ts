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

export const getCompanyById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const company = await Company.findOneOrFail({ where: { id: Number(id) } });
  const post = await Post.find({ where: { company: { id: Number(id) } } });
  return res.json({ company, post });
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
