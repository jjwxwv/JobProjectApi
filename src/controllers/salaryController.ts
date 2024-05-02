import { Request, Response } from "express";
import { Salary } from "../entities/Salary";

type salaryType = {
  id: number;
  title: string;
};
export const getSalary = async (
  req: Request<{}, {}, {}, salaryType>,
  res: Response
) => {
  const salary = await Salary.find();
  return res.json(salary);
};
