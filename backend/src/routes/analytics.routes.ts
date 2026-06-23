import { Router } from "express";
import { requireAuth } from "../middlewares/auth.middleware";
import { getSummary, getTopThreads, getActivity } from "../controllers/analytics.controller";

const router = Router();

router.use(requireAuth);
router.get("/summary", getSummary);
router.get("/top-threads", getTopThreads);
router.get("/activity", getActivity);

export default router;
