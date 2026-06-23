import { Router } from "express";
import { requireAuth, AuthRequest } from "../middleware/auth.middleware";
import { getProfile } from "../services/profile.service";

const router = Router();

router.use(requireAuth);

router.get("/me", async (req: AuthRequest, res) => {
  if (!req.userId) return res.status(401).json({ message: "Missing user" });
  const profile = await getProfile(req.userId);
  if (!profile) return res.status(404).json({ message: "Profile not found" });
  return res.json({ profile });
});

export { router as profileRouter };
