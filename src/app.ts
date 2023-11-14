import express, { NextFunction, Request, Response, urlencoded } from "express";
import fileUpload from "express-fileupload";
import * as mongoose from "mongoose";

import { configs } from "./configs";
import { ApiError } from "./errors";
import {
  adminRouter,
  authRouter,
  carRouter,
  managerRouter,
  premiumRouter,
  userRouter,
} from "./routers";

const app = express();

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(fileUpload());

app.use("/auth", authRouter);
app.use("/cars", carRouter);
app.use("/users", userRouter);
app.use("/admin", adminRouter);
app.use("/manager", managerRouter);
app.use("/premium", premiumRouter);

app.listen(configs.PORT, async () => {
  await mongoose.connect(configs.DB_URL);
  console.log(`Server has successfully started on PORT ${configs.PORT}`);
  // cronRunner();
});

app.use("*", (req: Request, res: Response) => {
  res.status(404).json({ error: "Not Found" });
});

app.use((err: ApiError, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || 500;
  const message = err.message || "Server error";

  res.status(status).json({ error: message });
});
