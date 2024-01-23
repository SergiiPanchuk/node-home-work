import { NextFunction, Request, Response } from "express";

import { IUser } from "../interfaces/user.interface";
import { authService } from "../services/auth.service";
import { userService } from "../services/user.service";
// import { IUser } from "../interfaces/user.interface";

class AuthController {
  public async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body as Partial<IUser>;
      const users = await authService.signUp(body);

      return res.json({ data: users });
    } catch (e) {
      next(e);
    }
  }

  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;

      const user = await userService.getById(id);

      res.json({ data: user });
    } catch (e) {
      next(e);
    }
  }
  //
  // public async updateById(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const id = req.params.id;
  //     const body = req.body as Partial<IUser>;
  //
  //     const user = await userService.updateById(id, body);
  //
  //     res.status(201).json(user);
  //   } catch (e) {
  //     next(e);
  //   }
  // }
  //
  // public async deleteById(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const id = req.params.id;
  //
  //     await userService.deleteById(id);
  //
  //     res.sendStatus(204);
  //   } catch (e) {
  //     next(e);
  //   }
  //  }
  // };
}

export const authController = new AuthController();