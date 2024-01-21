import { Request, Response } from "express";

import { userService } from "../services/user.service";

class UserController {
  public async getAll(req: Request, res: Response) {
    try {
      const users = await userService.getAll();
      res.render("users", { users });
    } catch (e) {
      res.redirect("/error?message=" + encodeURIComponent(e.message));
    }
  }

  public async getById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const users = await userService.getById(id);
      res.render("chosenUser", { users });
    } catch (e) {
      res.redirect("/error?message=" + encodeURIComponent(e.message));
    }
  }
}

export const userController = new UserController();
