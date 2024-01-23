import { Router } from "express";
import { Request, Response } from "express";

import { read, write } from "../fs.service";
import { IUser } from "../interfaces/user.interface";
import { User } from "../models/user.model";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  res.render("register");
});
router.post("/", async (req: Request, res: Response) => {
  try {
    const { email, userName, password } = req.body;
    const age = Number(req.body.age);
    if (!age || !Number.isInteger(age) || age <= 0 || age > 100) {
      throw new Error("wrong age");
    }
    if (!email || !email.includes("@")) {
      throw new Error("wrong email");
    }
    if (!userName || userName.length <= 3) {
      throw new Error("wrong name");
    }
    const users = await read();

    const newUser: IUser = await User.create({
      userName,
      email,
      password,
      age,
    });
    users.push(newUser);
    await write(users);

    res.render("login");
  } catch (e) {
    res.redirect("/error?message=" + encodeURIComponent(e.message));
  }
});

export const registerRouter = router;
