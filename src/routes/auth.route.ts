import { Router } from "express";

import {
  loginUser,
  logoutUser,
  refreshAccessToken,
} from "../controllers/auth.controller";
import {
  verifyJWT,
  loginValidator,
} from "../middlewares/middleware";

const authRouter = Router();

// Login route
authRouter.post('/login', loginValidator, loginUser);

// Logout
authRouter.post('/logout', verifyJWT, logoutUser);

// Refresh token
authRouter.post('/refresh-token', refreshAccessToken);

export default authRouter;
