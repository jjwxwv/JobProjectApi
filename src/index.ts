import express from 'express';
import { createConnection } from 'typeorm';
import { Benefit } from './entities/Benefit';
import { Categories } from './entities/Categories';
import { Company } from './entities/Company';
import { Exp } from './entities/Exp';
import { HiringType } from './entities/HiringType';
import { JobDescription } from './entities/JobDescription';
import { Post } from './entities/Post';
import { Qualification } from './entities/Qualification';
import { Responsibility } from './entities/Responsibility';
import { salary } from './entities/Salary';
import { User } from './entities/User';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

(async () => {
  try {
    console.log(process.env.DB_USERNAME);
    await createConnection({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: 'postgres',
      entities: [
        Benefit,
        Categories,
        Company,
        Exp,
        HiringType,
        JobDescription,
        Post,
        Qualification,
        Responsibility,
        salary,
        User,
      ],
      synchronize: true,
      ssl: true,
    });
    console.log('Connected to Postgres');

    app.use(express.json());

    app.listen(8080, () => {
      console.log('Now running on port 8080');
    });
  } catch (error) {
    console.error(error);
    throw new Error('Unable to connect to db');
  }
})();
