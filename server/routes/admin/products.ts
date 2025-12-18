import { RequestHandler } from "express";
import { query } from "../../db";

export const listAdminProducts: RequestHandler = async (_req, res, next) => {
  try {
    const rows = await query<any>(
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

export const createProduct: RequestHandler = async (req, res, next) => {
  try {
    const { name, price_idr, category, is_best_seller = false, quantity = 0, image = "" } =
      req.body as Record<string, any>;

    if (!name || price_idr == null) return res.status(400).json({ message: "Name and price are required" });

    const slug = String(name)
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-_]/g, "");

    const result = await query<any>(
      `INSERT INTO products (name, slug, price_idr, category, is_best_seller, image)
       VALUES (:name, :slug, :price, :category, :best, :image)`,
      {
        name,
        slug,
        price: Math.max(0, Math.floor(Number(price_idr))),
        category: category ?? null,
        best: is_best_seller ? 1 : 0,
        image: image || null,
      }
    );

    const productId = (result as any).insertId;
    await query(
      `INSERT INTO stock (product_id, quantity) VALUES (:id, :q)
       ON DUPLICATE KEY UPDATE quantity = VALUES(quantity), updated_at = CURRENT_TIMESTAMP`,
      { id: productId, q: Math.max(0, Math.floor(Number(quantity))) }
    );

    res.status(201).json({ id: productId, slug });
  } catch (err) {
    next(err);
  }
};

export const updateProductAdmin: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, price_idr, category, is_best_seller = false, quantity, image = "" } =
      req.body as Record<string, any>;

    if (!name || price_idr == null) return res.status(400).json({ message: "Name and price are required" });

    const slug = String(name)
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-_]/g, "");

    await query(
      `UPDATE products
          SET name = :name,
              slug = :slug,
              price_idr = :price,
              category = :category,
              is_best_seller = :best,
              image = :image
        WHERE id = :id`,
      {
        id,
        name,
        slug,
        price: Math.max(0, Math.floor(Number(price_idr))),
        category: category ?? null,
        best: is_best_seller ? 1 : 0,
        image: image || null,
      }
    );

    if (quantity != null) {
      await query(
        `INSERT INTO stock (product_id, quantity) VALUES (:id, :q)
         ON DUPLICATE KEY UPDATE quantity = VALUES(quantity), updated_at = CURRENT_TIMESTAMP`,
        { id, q: Math.max(0, Math.floor(Number(quantity))) }
      );
    }

    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
};

export const deleteProduct: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    await query(`DELETE FROM products WHERE id = :id`, { id });
    await query(`DELETE FROM stock WHERE product_id = :id`, { id });
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
};
