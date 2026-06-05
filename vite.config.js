import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' macht das Build relativ, sodass es auch unter einem
// Unterpfad (z. B. GitHub Pages) ohne Anpassung funktioniert.
export default defineConfig({
  base: './',
  plugins: [react()],
})
