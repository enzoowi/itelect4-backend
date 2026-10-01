import { Router, type Request, type Response } from "express";
import { Job } from "../models/Job";
import { requireAuth } from "../middleware/auth";
import type { NewJobBody } from "../types/index";

export const jobRouter = Router();

jobRouter.use(requireAuth);

interface IdParam {
  id: string;
}

jobRouter.get("/", async (req: Request, res: Response) => {
  const jobs = await Job.find({
    clientId: req.userId,
  });
  res.json(jobs);
});

jobRouter.get(
  "/:id",
  async (req: Request<IdParam>, res: Response) => {
    const job = await Job.findOne({
      _id: req.params.id,
      clientId: req.userId,
    });

    if (!job) {
      res.status(404).json({ message: "No job with that id" });
      return;
    }

    res.json(job);
  },
);

jobRouter.post(
  "/",
  async (
    req: Request<unknown, unknown, NewJobBody>,
    res: Response,
  ) => {
    const job = await Job.create({
      ...req.body,
      clientId: req.userId,
    });

    res.status(201).json(job);
  },
);

jobRouter.patch(
  "/:id",
  async (
    req: Request<IdParam, unknown, Partial<NewJobBody>>,
    res: Response,
  ) => {
    const job = await Job.findOneAndUpdate(
      { _id: req.params.id, clientId: req.userId },
      req.body,
      { new: true, runValidators: true },
    );

    if (!job) {
      res.status(404).json({ message: "No job with that id" });
      return;
    }

    res.json(job);
  },
);

jobRouter.delete(
  "/:id",
  async (req: Request<IdParam>, res: Response) => {
    const job = await Job.findOneAndDelete({
      _id: req.params.id,
      clientId: req.userId,
    });

    if (!job) {
      res.status(404).json({ message: "No job with that id" });
      return;
    }

    res.status(204).send();
  },
);
