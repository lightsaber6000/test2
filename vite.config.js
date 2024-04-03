import { fileURLToPath, URL } from 'url'
import { defineConfig } from 'vite'
import VitePluginSvgSpritemap from '@spiriit/vite-plugin-svg-spritemap'

import vue from '@vitejs/plugin-vue'

export default defineConfig({
    plugins: [VitePluginSvgSpritemap('./src/assets/images/sprite-icons/*.svg'), vue()],
    resolve: {
        alias: [
            {
                find: /~(.+)/,
                replacement: (val) => {
                    return val.replace(/^~/, '')
                },
            },
            {
                find: /@\//,
                replacement: fileURLToPath(new URL('./src', import.meta.url)) + '/',
            },
        ],
    },
})
