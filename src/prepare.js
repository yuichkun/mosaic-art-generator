const fs =  require('fs')
const { join, basename } = require('path')
const sharp = require('sharp')
const imagePaths = require('./path')
const { analyze } = require('./analyze')
const { saveMaterialPixelInfo } = require('./store')

async function prepare() {
  console.log('Getting the list of material images...')
  const compressedMaterialImages = fs.readdirSync(imagePaths.materialImages.compressed).filter(f => f !== '.keep').map(f => join(imagePaths.materialImages.compressed, f))
  console.log('Material Images:', compressedMaterialImages)
  for (const materialImagePath of compressedMaterialImages) {
    const baseImageName = basename(materialImagePath)
    console.log(`Start Analyzing for ${baseImageName}`)
    const avgPixel = await analyze(materialImagePath)
    console.log(`Done Analyzing: ${JSON.stringify(avgPixel.toJson())}`)
    saveMaterialPixelInfo(baseImageName, avgPixel.toJson())
  }
}

prepare()