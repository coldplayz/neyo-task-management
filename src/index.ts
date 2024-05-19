/**
 * External Modules
 */

import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";

import connectDB from "./data-access/connection";
import userRouter from "./routes/user.route";
import authRouter from "./routes/auth.route";
import taskRouter from "./routes/task.route";

dotenv.config();

/**
 * App
 */

const PORT: number = parseInt(process.env.PORT as string, 10) || 3456;

const app = express();

/**
 *  Configuration
 */

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/v1/users', userRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/tasks', taskRouter);

// Sanity check
app.get("/", (_, res) => res.json({ success: true, data: 'LIVE' }));

/**
 * Server Startup
 */
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
  })
  .catch(console.log);
