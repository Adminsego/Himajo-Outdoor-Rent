import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { getProductBySlug, listProducts, updateProduct } from "./routes/products";
import { listPublicFaqs } from "./routes/faqs";
import adminRouter from "./routes/admin";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Products API
  app.get("/api/products", listProducts);
  app.get("/api/products/:slug", getProductBySlug);
  app.put("/api/products/:id", updateProduct);
  app.get("/api/faqs", listPublicFaqs);

  // Admin API
  app.use("/api/admin", adminRouter);

  return app;
}
