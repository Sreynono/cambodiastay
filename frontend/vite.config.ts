import { fileURLToPath, URL } from 'node:url'
import fs from 'node:fs'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

function homestayOgMetaPlugin() {
  return {
    name: 'vite-plugin-homestay-og-meta',
    transformIndexHtml: {
      order: 'post' as const,
      async handler(html: string, ctx: any) {
        const url = ctx.originalUrl || ctx.path || '';
        const match = url.match(/^\/homestay\/(\d+)/);
        if (!match) return html;

        try {
          const stayId = match[1];
          const response = await fetch(`http://localhost:3000/homestays/${stayId}`);
          if (!response.ok) return html;
          const stay = (await response.json()) as any;

          const name = stay.title || stay.name || 'Cambodian Homestay';
          const province = stay.province || 'Cambodia';
          const price = stay.price || stay.price_per_night || 25;
          const title = `${name} · ${province} ($${price}/night) | CamStay`;
          const rawDesc = stay.description || `Experience authentic village hospitality and countryside tranquility at ${name} in ${province}, Cambodia. Verified local host, farmstay experiences, and 24/7 guest support.`;
          const description = rawDesc.length > 180 ? rawDesc.substring(0, 177) + '...' : rawDesc;
          const reqHost = ctx.req?.headers['x-forwarded-host'] || ctx.req?.headers['host'] || 'localhost:5173';
          const reqProto = ctx.req?.headers['x-forwarded-proto'] || (String(reqHost).includes('localhost') ? 'http' : 'https');
          let publicOrigin = `${reqProto}://${reqHost}`;
          try {
            const tunnelPath = 'C:\\Users\\User\\.gemini\\antigravity-ide\\brain\\ba75ae59-7a9e-4d90-840c-fb7b2656b22c\\scratch\\tunnel_url.txt';
            if (fs.existsSync(tunnelPath)) {
              const url = fs.readFileSync(tunnelPath, 'utf8').trim();
              if (url) publicOrigin = url;
            }
          } catch {}

          let imageUrl = stay.coverPhotoUrl || stay.image_url || '';
          if (imageUrl.includes('/uploads/')) {
            const uploadPath = imageUrl.substring(imageUrl.indexOf('/uploads/'));
            imageUrl = `${publicOrigin}${uploadPath}`;
          } else if (imageUrl && imageUrl.startsWith('/')) {
            imageUrl = `${publicOrigin}${imageUrl}`;
          }

          let newHtml = html
            .replace(/<title>.*?<\/title>/i, `<title>${title}</title>`)
            .replace(/<meta property="og:title"[^>]*>/i, `<meta property="og:title" content="${title}">`)
            .replace(/<meta property="og:description"[^>]*>/i, `<meta property="og:description" content="${description}">`)
            .replace(/<meta property="og:image"[^>]*>/i, `<meta property="og:image" content="${imageUrl}">`)
            .replace(/<meta name="twitter:title"[^>]*>/i, `<meta name="twitter:title" content="${title}">`)
            .replace(/<meta name="twitter:description"[^>]*>/i, `<meta name="twitter:description" content="${description}">`)
            .replace(/<meta name="twitter:image"[^>]*>/i, `<meta name="twitter:image" content="${imageUrl}">`);

          newHtml = newHtml.replace(
            '</head>',
            `    <meta property="og:url" content="${publicOrigin}/homestay/${stayId}">\n  </head>`
          );

          return newHtml;
        } catch {
          return html;
        }
      },
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    homestayOgMetaPlugin(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    host: true,
    allowedHosts: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/uploads': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
})
