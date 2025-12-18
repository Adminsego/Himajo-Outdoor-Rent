import { RequestHandler } from "express";
import bcrypt from "bcryptjs";
import { query } from "../../db";
import { signAdminToken } from "../../middleware/auth";

export const login: RequestHandler = async (req, res, next) => {
  try {
    const { username, password } = req.body as { username?: string; password?: string };
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }

    const rows = await query<{ id: number; username: string; password_hash: string }>(
      `SELECT id, username, password_hash
         FROM admin_users
        WHERE username = :username
        LIMIT 1`,
      { username }
    );

    const admin = rows[0];
    if (!admin) return res.status(401).json({ message: "Invalid credentials" });

    const valid = await bcrypt.compare(password, admin.password_hash);
    if (!valid) return res.status(401).json({ message: "Invalid credentials" });

    const token = signAdminToken({ id: admin.id, username: admin.username });
    res.json({ token, admin: { id: admin.id, username: admin.username } });
  } catch (err) {
    next(err);
  }
};

export const profile: RequestHandler = async (req, res, next) => {
  try {
    const adminId = (req as any).adminId as number | undefined;
    if (!adminId) return res.status(401).json({ message: "Unauthorized" });

    const rows = await query<{ id: number; username: string; created_at?: string }>(
      `SELECT id, username, created_at
         FROM admin_users
        WHERE id = :id
        LIMIT 1`,
      { id: adminId }
    );

    const admin = rows[0];
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    res.json(admin);
  } catch (err) {
    next(err);
  }
};
