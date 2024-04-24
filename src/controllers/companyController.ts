import { Request, Response } from "express";
import { Company } from "../entities/Company";
import { Post } from "../entities/Post";

export const getCompanyProfile = async (req: Request, res: Response) => {};

export const getCompanyById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const company = await Company.findOneOrFail({ where: { id: Number(id) } });
  const post = await Post.find({ where: { company: { id: Number(id) } } });
  return res.json({ company, post });
};

export const editCompanyProfile = async (req: Request, res: Response) => {};
