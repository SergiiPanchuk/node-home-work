import { Router } from "express";
import { Request, Response } from "express";

import { read, write } from "../fs.service";
import { IUser } from "../interfaces/user.interface";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  res.render("login");
});
router.post("/", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !email.includes("@")) {
      throw new Error("wrong email");
    }

    const users = await read();
    const user = users.find((user) => user.email === email);
    if (!user || user.password !== password) {
      throw new Error("wrong email or password");
    }

    res.redirect("users");
  } catch (e) {
    res.redirect("/error?message=" + encodeURIComponent(e.message));
  }
});

router.get("/register", async (req: Request, res: Response) => {
  res.render("register");
});
router.post("/register", async (req: Request, res: Response) => {
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

    const newUser: IUser = {
      id: users[users.length - 1].id + 1,
      userName,
      email,
      password,
      age,
    };
    users.push(newUser);
    await write(users);

    res.render("login");
  } catch (e) {
    res.redirect("/error?message=" + encodeURIComponent(e.message));
  }
});

export const loginRouter = router;
