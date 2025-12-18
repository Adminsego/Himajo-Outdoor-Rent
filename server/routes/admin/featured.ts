import { RequestHandler } from "express";
import { query } from "../../db";

export const listFeatured: RequestHandler = async (_req, res, next) => {
  try {
    const rows = await query<any>(
      `SELECT f.id, f.product_id, f.title, f.description, f.image_url, f.button_text, f.button_link,
              f.is_active, f.display_order, f.created_at, f.updated_at,
              p.name AS product_name, p.slug AS product_slug
         FROM featured_items f
    LEFT JOIN products p ON p.id = f.product_id
     ORDER BY f.display_order ASC, f.id DESC`
    );
    res.json(
      rows.map((r) => ({
        id: r.id,
        product_id: r.product_id,
        title: r.title,
        description: r.description,
        image_url: r.image_url,
        button_text: r.button_text,
        button_link: r.button_link,
        is_active: !!r.is_active,
        display_order: r.display_order ?? 0,
        product_name: r.product_name,
        product_slug: r.product_slug,
      }))
    );
  } catch (err) {
    next(err);
  }
};

export const createFeatured: RequestHandler = async (req, res, next) => {
  try {
    const { product_id, title, description = "", image_url = "", button_text = "", button_link = "", is_active = true, display_order = 0 } =
      req.body as Record<string, any>;

    if (!title) return res.status(400).json({ message: "Title is required" });

    const result = await query<any>(
      `INSERT INTO featured_items (product_id, title, description, image_url, button_text, button_link, is_active, display_order)
       VALUES (:product_id, :title, :description, :image_url, :button_text, :button_link, :is_active, :display_order)`,
      {
        product_id: product_id || null,
        title,
        description,
        image_url: image_url || null,
        button_text: button_text || null,
        button_link: button_link || null,
        is_active: is_active ? 1 : 0,
        display_order: Number(display_order) || 0,
      }
    );

    res.status(201).json({ id: (result as any).insertId });
  } catch (err) {
    next(err);
  }
};

export const updateFeatured: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { product_id, title, description = "", image_url = "", button_text = "", button_link = "", is_active = true, display_order = 0 } =
      req.body as Record<string, any>;

    if (!title) return res.status(400).json({ message: "Title is required" });

    await query(
      `UPDATE featured_items
          SET product_id = :product_id,
              title = :title,
              description = :description,
              image_url = :image_url,
              button_text = :button_text,
              button_link = :button_link,
              is_active = :is_active,
              display_order = :display_order
        WHERE id = :id`,
      {
        id,
        product_id: product_id || null,
        title,
        description,
        image_url: image_url || null,
        button_text: button_text || null,
        button_link: button_link || null,
        is_active: is_active ? 1 : 0,
        display_order: Number(display_order) || 0,
      }
    );

    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
};

export const deleteFeatured: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    await query(`DELETE FROM featured_items WHERE id = :id`, { id });
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
};
