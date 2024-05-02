import { Request, Response } from "express";
import { Category } from "../entities/Category";

type categoryType = {
  id: number;
  title: string;
};
export const getCategory = async (
  req: Request<{}, {}, {}, categoryType>,
  res: Response
) => {
  const category = await Category.find();
  return res.json(category);
};
