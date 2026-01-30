import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/",
});

// export default defineConfig({
//   build: {
//     rollupOptions: {
//       output: {
//         manualChunks(id) {
//           if (id.includes('node_modules')) {
//             return 'vendor'; // Splits all libraries into a file named 'vendor'
//           }
//         },
//       },
//     },
//     chunkSizeWarningLimit: 1000, // Optional: adjust limit if needed
//   },
// });
