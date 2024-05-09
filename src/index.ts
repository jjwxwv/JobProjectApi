import express from "express";
import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { postRouter } from "./routes/postRoutes";
import { companyRouter } from "./routes/companyRoutes";
import { userRouter } from "./routes/userRoutes";
import { categoryRouter } from "./routes/categoryRoute";
import { hiringRouter } from "./routes/hiringRoute";
import { salaryRouter } from "./routes/salaryRoute";
import { expRouter } from "./routes/expRoute";
dotenv.config();

const app = express();
const cors = require("cors");

const appDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: "postgres",
  entities: ["src/entities/*.ts"],
  synchronize: true,
  ssl: true,
});
appDataSource
  .initialize()
  .then(() => {
    console.log("Connected to Postgres");
  })
  .catch((error) => {
    console.error(error);
    throw new Error("Unable to connect to db");
  });
app.use(cors());
app.use(express.json());
//Routes
app.use("/post", postRouter);
app.use("/company", companyRouter);
app.use("/user", userRouter);
app.use("/category", categoryRouter);
app.use("/hiring", hiringRouter);
app.use("/salary", salaryRouter);
app.use("/exp", expRouter);

app.listen(8080, () => {
  console.log("Now running on port 8080");
});
