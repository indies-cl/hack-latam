// @ts-check
import { defineConfig, passthroughImageService } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: cloudflare(),
  integrations: [react()],
  image: {
    service: passthroughImageService(),
    remotePatterns: [{ protocol: "https", hostname: "lh3.googleusercontent.com" }],
  },
  vite: {
    plugins: [tailwindcss()]
  }
});