const fs = require('fs')
const { join } = require('path')
const cliProgress = require('cli-progress')
const sharp = require('sharp')
const imagePaths = require('./path')
const config = require('../config.json')

async function resize() {
  const progress = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
  console.time('resize')
  console.log('Getting the list of material images...')
  const originalMaterialImages = fs.readdirSync(imagePaths.materialImages.original).filter(f => f !== '.keep')
  console.log('Material Images Count:', originalMaterialImages.length)
  progress.start(1, 0)
  for (const i in originalMaterialImages) {
    progress.update(Number(i) / originalMaterialImages.length)
    const materialImage = originalMaterialImages[i]
    const inputPath = join(imagePaths.materialImages.original, materialImage)
    const outputPath = join(imagePaths.materialImages.compressed, materialImage)
    await sharp(inputPath).resize(config.materialImageResolution).jpeg().toFile(outputPath)
  }
  progress.stop()

  console.log('Getting the list of target images...')
  const originalTargetImages = fs.readdirSync(imagePaths.targetImages.original).filter(f => f !== '.keep')
  console.log('Target Images Count:', originalTargetImages.length)
  progress.update(0)
  for (const i in originalTargetImages) {
    progress.update(Number(i) / originalTargetImages.length)
    const targetImage = originalTargetImages[i]
    const inputPath = join(imagePaths.targetImages.original, targetImage)
    const outputPath = join(imagePaths.targetImages.compressed, targetImage)
    await sharp(inputPath).resize(config.targetImageResolution).jpeg().toFile(outputPath)
  }
  progress.stop()
  console.timeEnd('resize')
}

resize()

