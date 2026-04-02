import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const inputPath = path.resolve(__dirname, '../public/icon-1024.png')

const outputs = [
  { file: 'icon-192.png', size: 192 },
  { file: 'icon-512.png', size: 512 },
]

async function generate() {
  for (const { file, size } of outputs) {
    const outputPath = path.resolve(__dirname, `../public/${file}`)
    await sharp(inputPath)
      .resize(size, size, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
      .flatten({ background: '#ffffff' })
      .png()
      .toFile(outputPath)
    console.log(`Generated ${file} (${size}x${size})`)
  }
}

generate().catch((error) => {
  console.error('Failed to generate icons:', error)
  process.exit(1)
})
