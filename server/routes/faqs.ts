import { RequestHandler } from "express";
import { query } from "../db";

export const listPublicFaqs: RequestHandler = async (_req, res, next) => {
  try {
    const rows = await query<
      { id: number; question: string; answer: string; display_order: number | null }
    >(
      `SELECT id, question, answer, display_order
         FROM faqs
        WHERE is_active = 1
        ORDER BY display_order ASC, id DESC`
    );

    res.json(
      rows.map((faq) => ({
        id: faq.id,
        question: faq.question,
        answer: faq.answer,
      }))
    );
  } catch (err) {
    next(err);
  }
};
