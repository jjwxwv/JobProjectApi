import { Request, Response } from "express";
import { Exp } from "../entities/Exp";

type expType = {
  id: number;
  title: string;
};
export const getExp = async (
  req: Request<{}, {}, {}, expType>,
  res: Response
) => {
  const exp = await Exp.find();
  return res.json(exp);
};
