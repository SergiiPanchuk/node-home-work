import { NextFunction, Request, Response } from "express";

import { userService } from "../services/user.service";

class UserController {
  public async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await userService.getAll();
      res.render("users", { users });
    } catch (e) {
      next(e);
    }
  }

  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const users = await userService.getById(id);
      res.render("chosenUser", { user: users });
    } catch (e) {
      next(e);
    }
  }
}

export const userController = new UserController();
