import { Request, Response } from "express";
import { HiringType } from "../entities/HiringType";

type hiringType = {
  id: number;
  title: string;
};
export const getHiring = async (
  req: Request<{}, {}, {}, hiringType>,
  res: Response
) => {
  const hiring = await HiringType.find();
  return res.json(hiring);
};
