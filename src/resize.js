const fs = require('fs')
const { join } = require('path')
const sharp = require('sharp')
const imagePaths = require('./path')
const config = require('../config.json')

async function resize() {
  console.log('Getting the list of material images...')
  const originalMaterialImages = fs.readdirSync(imagePaths.materialImages.original).filter(f => f !== '.keep')
  console.log('Material Images:', originalMaterialImages)
  for (const materialImage of originalMaterialImages) {
    const inputPath = join(imagePaths.materialImages.original, materialImage)
    const outputPath = join(imagePaths.materialImages.compressed, materialImage)
    console.log(`Start Resizing for ${inputPath}`)
    await sharp(inputPath).resize(config.materialImageResolution).jpeg().toFile(outputPath)
    console.log(`Done Resizing. Output @ ${outputPath}`)
  }

  console.log('Getting the list of target images...')
  const originalTargetImages = fs.readdirSync(imagePaths.targetImages.original).filter(f => f !== '.keep')
  console.log('Target Images:', originalTargetImages)
  for (const targetImage of originalTargetImages) {
    const inputPath = join(imagePaths.targetImages.original, targetImage)
    const outputPath = join(imagePaths.targetImages.compressed, targetImage)
    console.log(`Start Resizing for ${inputPath}`)
    await sharp(inputPath).resize(config.targetImageResolution).jpeg().toFile(outputPath)
    console.log(`Done Resizing. Output @ ${outputPath}`)
  }
}

resize()

