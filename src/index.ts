/**
 * External Modules
 */

import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
// import { itemsRouter } from "./items/items.router";

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
// app.use("/api/menu/items", itemsRouter);

app.get("/", (req, res) => res.json({ success: true, data: 1989 }));

/**
 * Server Startup
 */

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
