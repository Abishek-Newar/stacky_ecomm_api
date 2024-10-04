import express from "express";
import { UserRoute } from "../api/interface/routes/user.js";
import { adminRoute } from "../api/interface/routes/admin.js";

/** crate global router */
export const createRouter = () => {
  const router = express.Router();

  UserRoute(router);
  adminRoute(router);

  return router;
};
