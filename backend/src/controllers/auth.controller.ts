import { Request, Response } from "express";
import { loginUser } from "../services/auth.service";

export async function login(req: Request, res: Response) {
  const result = await loginUser(req.body);

  if (!result.success) {
    return res.status(result.status).json({ success: false, message: result.message });
  }

  return res.json({ success: true, token: result.token, user: result.user });
}
