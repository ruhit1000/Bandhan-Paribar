import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

function betterAuthPlugin() {
  return {
    name: 'better-auth-vite-plugin',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url && req.url.startsWith('/api/auth')) {
          try {
            const { toNodeHandler } = await import('better-auth/node');
            const { auth } = await import('./api/auth.js');
            return toNodeHandler(auth)(req, res);
          } catch (err) {
            console.error('Better Auth middleware error:', err);
          }
        }
        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), betterAuthPlugin()],
});
