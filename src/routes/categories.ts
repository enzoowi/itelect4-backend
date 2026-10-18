import { Router, type Request, type Response } from "express";
import { Category } from "../models/Category";

export const categoryRouter = Router();

// Public routes for categories reference data
// GET /api/categories
categoryRouter.get("/", async (_req: Request, res: Response) => {
  const categories = await Category.find().sort({ code: 1 });
  res.json(categories);
});

interface CodeParam {
  code: string;
}

// GET /api/categories/:code
categoryRouter.get(
  "/:code",
  async (req: Request<CodeParam>, res: Response) => {
    const category = await Category.findOne({
      code: req.params.code.toUpperCase(),
    });

    if (!category) {
      res.status(404).json({
        message: `No category with code "${req.params.code}"`,
      });
      return;
    }

    res.json(category);
  },
);
