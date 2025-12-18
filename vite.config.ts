// vite.config.ts
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { createServer as createApiServer } from "./server";

// Use the client folder as the Vite root so index.html is found
export default defineConfig(() => ({
  root: path.resolve(__dirname, "client"),
  server: {
    host: "0.0.0.0",
    port: 3000,
    fs: {
      allow: [path.resolve(__dirname, "client"), path.resolve(__dirname, "shared")],
      deny: [".env", ".env.*", "*.{crt,pem}", "**/.git/**"],
    },
  },
  build: {
    outDir: path.resolve(__dirname, "dist/client"),
    emptyOutDir: true,
  },
  plugins: [react(), expressPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client"),
      "@shared": path.resolve(__dirname, "./shared"),
    },
  },
}));

function expressPlugin(): Plugin {
  return {
    name: "express-plugin",
    apply: "serve", // Only apply during development (serve mode)
    configureServer(server) {
      const app = createApiServer();

      // Only handle /api/* with Express; let Vite serve the SPA assets
      server.middlewares.use((req, res, next) => {
        if (req.url?.startsWith("/api")) {
          return (app as any)(req, res, next);
        }
        return next();
      });
    },
  };
}