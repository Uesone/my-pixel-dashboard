import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { createHtmlPlugin } from "vite-plugin-html";

export default defineConfig({
  plugins: [
    react(),
    createHtmlPlugin({
      inject: {
        data: {
          title: "Uesone's Portfolio",
          description:
            "Il portfolio di Umberto Amoroso, full stack developer. Scopri progetti, competenze e contatti.",
          ogImage: "/og-image.png",
          ogUrl: "https://uesone.vercel.app/",
        },
      },
    }),
  ],
  server: {
    host: true,
    port: 5173,
  },
});
