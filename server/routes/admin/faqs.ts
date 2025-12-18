import { RequestHandler } from "express";
import { query } from "../../db";

export const listFaqs: RequestHandler = async (_req, res, next) => {
  try {
    const rows = await query<any>(
      `SELECT id, question, answer, created_at, updated_at
         FROM faqs
     ORDER BY id DESC`
    );
    res.json(rows);
  } catch (err) {
    next(err);
  }
};

export const createFaq: RequestHandler = async (req, res, next) => {
  try {
    const { question, answer } = req.body as Record<string, any>;
    if (!question || !answer) return res.status(400).json({ message: "Question and answer are required" });

    const result = await query<any>(
      `INSERT INTO faqs (question, answer) VALUES (:q, :a)`,
      { q: question, a: answer }
    );
    res.status(201).json({ id: (result as any).insertId });
  } catch (err) {
    next(err);
  }
};

export const updateFaq: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { question, answer } = req.body as Record<string, any>;
    if (!question || !answer) return res.status(400).json({ message: "Question and answer are required" });

    await query(
      `UPDATE faqs SET question = :q, answer = :a WHERE id = :id`,
      { id, q: question, a: answer }
    );
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
};

export const deleteFaq: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    await query(`DELETE FROM faqs WHERE id = :id`, { id });
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
};
