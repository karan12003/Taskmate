import { defineConfig, minimalPreset as preset } from '@vite-pwa/assets-generator/config'

export default defineConfig({
  preset,
  images: [
    'src/assets/arrow1.svg',
    'src/assets/arrow2.svg',
    'src/assets/arrow3.svg',
    'src/assets/logo.png',
    'src/assets/react.svg',
    "public/vite.svg",
    "public/logo.png",
]
})