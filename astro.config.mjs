import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
// to run r3f xr
import basicSsl from '@vitejs/plugin-basic-ssl'

import tailwind from '@astrojs/tailwind'
import glsl from 'vite-plugin-glsl'

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind()],
  vite: {
    plugins: [
      glsl(),
      // basicSsl()
    ],
    server: {
      // https: true,
    },
  },
})
