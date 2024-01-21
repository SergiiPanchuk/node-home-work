import { Router } from "express";
import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors/api.error";

const router = Router();

router.get(
  "/",
  (err: ApiError, req: Request, res: Response, next: NextFunction) => {
    const errorState = err.message;
    res.render("error", { errorState });
  },
);

export const errorRouter = router;
