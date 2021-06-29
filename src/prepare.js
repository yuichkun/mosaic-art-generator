const fs =  require('fs')
const cliProgress = require('cli-progress')
const { join, basename } = require('path')
const imagePaths = require('./path')
const { analyze } = require('./analyze')
const { saveMaterialPixelInfo } = require('./store')


async function prepare() {
  const progress = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
  console.time('Prepare')
  console.log('Getting the list of material images...')
  const compressedMaterialImages = fs.readdirSync(imagePaths.materialImages.compressed).filter(f => f !== '.keep').map(f => join(imagePaths.materialImages.compressed, f))
  console.log('Material Images Count:', compressedMaterialImages.length)
  console.log('Start Analyzing...')
  progress.start(1, 0)
  for (const i in compressedMaterialImages) {
    const materialImagePath = compressedMaterialImages[i]
    progress.update(Number(i) / compressedMaterialImages.length)
    const baseImageName = basename(materialImagePath)
    const avgPixel = await analyze(materialImagePath)
    saveMaterialPixelInfo(baseImageName, avgPixel.toJson())
  }
  progress.stop()
  console.log('Done Analyzing!')
  console.timeEnd('Prepare')
}

prepare()