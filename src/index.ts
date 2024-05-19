/**
 * External Modules
 */

import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
// import { createServer } from "node:http;
// import { EventEmitter } from "node:events";
import { Server } from "socket.io";

import { server, app } from "../src/app-server";
import eventEmitter from "../src/events/api-events";
import connectDB from "./data-access/connection";
import userRouter from "./routes/user.route";
import authRouter from "./routes/auth.route";
import taskRouter from "./routes/task.route";

dotenv.config();

/**
 * Server and socket setup
 */

const PORT: number = parseInt(process.env.PORT as string, 10) || 3456;

// const app = express();
// const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:8080',
  },
});

// const ee = new EventEmitter();

/**
 *  Configuration and middlewares
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
app.get("/", (_, res) => {
  res.json({ success: true, data: 'LIVE' })
  eventEmitter.emit('apiEvent', 'sanity check successfull!');
});

// Socket

/**
 * Server and socket startup
 */
connectDB()
  .then(() => {
    server.listen(PORT, () => {
      eventEmitter.on('apiEvent', (msg) => {
        io.emit('apiEvent', msg);
      });

      console.log(`Listening on port ${PORT}`);
    });
  })
  .catch(console.log);
