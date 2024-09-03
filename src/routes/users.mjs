import { Router } from "express";
import Users from "../repositories/Users.mjs";
import passport from "passport";
import AuthController from "../controllers/Auth.mjs";

const router = Router();
const controller = new AuthController();

router.post("/register", controller.register);
router.post("/login", passport.authenticate("local"), (req, res) => {
  res.sendStatus(200);
});
router.get("/status", controller.status);
router.post("/logout", controller.logout )

export default router;

