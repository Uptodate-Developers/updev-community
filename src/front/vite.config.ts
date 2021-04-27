import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const fs = require('fs')

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    server:{
        open: true,
        https: {
            key: fs.readFileSync('localhost-key.pem'),
            cert: fs.readFileSync('localhost.pem'),
        },
    }
})
