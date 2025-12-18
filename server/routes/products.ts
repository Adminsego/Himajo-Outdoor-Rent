import { RequestHandler } from "express";
import { query } from "../db";

export const listProducts: RequestHandler = async (_req, res, next) => {
  try {
    const rows = await query<{
      id: number;
      slug: string;
      name: string;
      price_idr: number;
      image: string | null;
      category: string | null;
      is_best_seller: 0 | 1;
      quantity: number | null;
    }>(
      `SELECT p.id, p.slug, p.name, p.price_idr, p.image, p.category, p.is_best_seller,
              COALESCE(s.quantity, 0) AS quantity
         FROM products p
    LEFT JOIN stock s ON s.product_id = p.id
     ORDER BY p.id DESC`
    );

    res.json(
      rows.map((r) => ({
        id: r.id,
        slug: r.slug,
        name: r.name,
        price_idr: r.price_idr,
        image: r.image,
        category: r.category,
        is_best_seller: !!r.is_best_seller,
        quantity: r.quantity ?? 0,
      }))
    );
  } catch (err) {
    next(err);
  }
};

export const getProductBySlug: RequestHandler = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const rows = await query<any>(
      `SELECT p.id, p.slug, p.name, p.price_idr, p.image, p.category, p.is_best_seller,
              COALESCE(s.quantity, 0) AS quantity
         FROM products p
    LEFT JOIN stock s ON s.product_id = p.id
        WHERE p.slug = :slug
        LIMIT 1`,
      { slug }
    );
    if (!rows.length) return res.status(404).json({ message: "Not found" });
    const r = rows[0];
    res.json({
      id: r.id,
      slug: r.slug,
      name: r.name,
      price_idr: r.price_idr,
      image: r.image,
      category: r.category,
      is_best_seller: !!r.is_best_seller,
      quantity: r.quantity ?? 0,
    });
  } catch (err) {
    next(err);
  }
};

// Update price and/or stock
export const updateProduct: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { price_idr, quantity } = req.body as { price_idr?: number; quantity?: number };

    if (price_idr != null) {
      await query(`UPDATE products SET price_idr = :price WHERE id = :id`, {
        price: Math.max(0, Math.floor(price_idr)),
        id,
      });
    }

    if (quantity != null) {
      // upsert stock
      await query(
        `INSERT INTO stock (product_id, quantity) VALUES (:id, :q)
         ON DUPLICATE KEY UPDATE quantity = VALUES(quantity), updated_at = CURRENT_TIMESTAMP`,
        { id, q: Math.max(0, Math.floor(quantity)) }
      );
    }

    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
};
