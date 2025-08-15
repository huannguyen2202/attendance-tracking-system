import { z } from "zod";
import { adminLogin, login } from "./auth.service";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function loginController(body: unknown) {
  const { email, password } = schema.parse(body);
  return login(email.trim().toLowerCase(), password);
}

export async function adminLoginController(body: unknown) {
  const { email, password } = schema.parse(body);
  return adminLogin(email.trim().toLowerCase(), password);
}
