import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET || "default_secret";

export function signToken(payload: { userId: string }) {
  return jwt.sign(payload, jwtSecret, { expiresIn: "7d" });
}

export function verifyToken(token: string) {
  return jwt.verify(token, jwtSecret) as { userId: string };
}
