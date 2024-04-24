import express from "express";
import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { postRouter } from "./routes/postRoutes";
import { companyRouter } from "./routes/companyRoutes";
import { userRouter } from "./routes/userRoutes";
dotenv.config();

const app = express();

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
    app.use(express.json());
    app.listen(8080, () => {
      console.log("Now running on port 8080");
    });
  })
  .catch((error) => {
    console.error(error);
    throw new Error("Unable to connect to db");
  });
app.use(express.json());
//Routes
app.use("/post", postRouter);
app.use("/company", companyRouter);
app.use("/user", userRouter);
