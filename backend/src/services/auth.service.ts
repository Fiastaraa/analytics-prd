import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { loginSchema } from "../validations/auth.schema";
import { findUserByEmail } from "../repositories/user.repository";

const jwtSecret = process.env.JWT_SECRET || "default_secret";
const jwtExpiresIn = process.env.JWT_EXPIRES_IN || "7d";

type AuthResult =
  | { success: true; token: string; user: { id: string; email: string; username: string; full_name: string; photo_profile: string | null; bio: string | null } }
  | { success: false; status: number; message: string };

export async function loginUser(body: unknown): Promise<AuthResult> {
  const parseResult = loginSchema.safeParse(body);
  if (!parseResult.success) {
    return { success: false, status: 400, message: "Invalid request body" };
  }

  const { email, password } = parseResult.data;
  const user = await findUserByEmail(email);

  if (!user) {
    return { success: false, status: 404, message: "User not found" };
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return { success: false, status: 401, message: "Invalid credentials" };
  }

  const token = jwt.sign({ id: user.id, email: user.email, username: user.username }, jwtSecret, {
    expiresIn: jwtExpiresIn,
  });

  return {
    success: true,
    token,
    user: {
      id: user.id,
      email: user.email,
      username: user.username,
      full_name: user.full_name,
      photo_profile: user.photo_profile,
      bio: user.bio,
    },
  };
}
