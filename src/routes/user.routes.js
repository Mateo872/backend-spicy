import { Router } from "express";
import {
  createUser,
  login,
  auth,
  editUser,
} from "../controllers/user.controller";
import validateUser from "../helpers/validateUser";
import validateAuth from "../helpers/validateAuth";

const router = Router();

router.route("/user").post(validateUser, createUser);
router
  .route("/user/auth")
  .get(validateAuth, auth)
  .post(login)
  .put(validateAuth, validateUser, editUser);

export default router;
