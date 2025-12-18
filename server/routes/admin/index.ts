import { Router } from "express";
import { login, profile } from "./auth";
import {
  listAdminProducts,
  createProduct,
  updateProductAdmin,
  deleteProduct,
} from "./products";
import {
  listFeatured,
  createFeatured,
  updateFeatured,
  deleteFeatured,
} from "./featured";
import { listFaqs, createFaq, updateFaq, deleteFaq } from "./faqs";
import { requireAdmin } from "../../middleware/auth";

const router = Router();

// Auth
router.post("/login", login);
router.get("/profile", requireAdmin, profile);

// Products
router.get("/products", requireAdmin, listAdminProducts);
router.post("/products", requireAdmin, createProduct);
router.put("/products/:id", requireAdmin, updateProductAdmin);
router.delete("/products/:id", requireAdmin, deleteProduct);

// Featured
router.get("/featured", requireAdmin, listFeatured);
router.post("/featured", requireAdmin, createFeatured);
router.put("/featured/:id", requireAdmin, updateFeatured);
router.delete("/featured/:id", requireAdmin, deleteFeatured);

// FAQs
router.get("/faqs", requireAdmin, listFaqs);
router.post("/faqs", requireAdmin, createFaq);
router.put("/faqs/:id", requireAdmin, updateFaq);
router.delete("/faqs/:id", requireAdmin, deleteFaq);

export default router;
