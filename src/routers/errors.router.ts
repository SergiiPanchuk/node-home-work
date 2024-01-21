import { Router } from "express";
import { Request, Response } from "express";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const errorState = req.query.message as string;
  res.render("error", { errorState });
});

export const errorRouter = router;
