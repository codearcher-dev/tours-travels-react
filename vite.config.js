import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    plugins: [react(), tailwindcss()],
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './src/test/setup.js',
    },
    server: {
        allowedHosts: true, // Allow ngrok tunneling
        proxy: {
            '/api': {
                target: "https://api.primetraveller.in",
                changeOrigin: true,
                secure: false
            }
        },
        host: '0.0.0.0'
    }
})
