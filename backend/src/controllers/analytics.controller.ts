import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import { getAnalyticsSummary, getTopThreadsForUser, getActivityFeed } from "../services/analytics.service";

export async function getSummary(req: AuthRequest, res: Response) {
  const user = req.user;
  if (!user) return res.status(401).json({ success: false, message: "Unauthorized" });

  const summary = await getAnalyticsSummary(user.id);
  return res.json(summary);
}

export async function getTopThreads(req: AuthRequest, res: Response) {
  const user = req.user;
  if (!user) return res.status(401).json({ success: false, message: "Unauthorized" });

  const threads = await getTopThreadsForUser(user.id);
  return res.json(threads);
}

export async function getActivity(req: AuthRequest, res: Response) {
  const user = req.user;
  if (!user) return res.status(401).json({ success: false, message: "Unauthorized" });

  const activity = await getActivityFeed(user.id);
  return res.json(activity);
}
