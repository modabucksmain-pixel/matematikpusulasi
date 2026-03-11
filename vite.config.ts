import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                magazine: resolve(__dirname, 'magazine.html'),
                bulmacalar: resolve(__dirname, 'bulmacalar.html'),
                sorular: resolve(__dirname, 'sorular.html'),
                cevaplar: resolve(__dirname, 'cevaplar.html'),
                kaynakca: resolve(__dirname, 'kaynakca.html'),
            },
        },
    },
})
