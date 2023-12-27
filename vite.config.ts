import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  publicDir: false,
  build: {
    lib: {
      entry: "src/components/index.tsx",
      name: "react-auth-image",
      fileName: (format) => `react-auth-image.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
        },
      },
    },
  },
  plugins: [react()],
});
