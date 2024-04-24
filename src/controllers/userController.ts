import { Request, Response } from "express";
import { Company } from "../entities/Company";
import { User } from "../entities/User";

export const getCompanyProfile = async (req: Request, res: Response) => {};
type companyType = {
  email: string;
  companyName: string;
  address: string;
  tel: string;
  companyEmail: string;
  imageUrl: string;
};
export const addNewCompany = async (
  req: Request<{}, {}, companyType>,
  res: Response
) => {
  const { email, companyName, address, tel, companyEmail, imageUrl } = req.body;
  const company = Company.create({
    company_name: companyName,
    address,
    tel,
    email: companyEmail,
    image_url: imageUrl,
  });
  await company.save();
  const user = User.create({
    email,
    company,
  });
  await user.save();
  return res.json(user);
};
