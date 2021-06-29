const { join } = require('path')
const sharp = require("sharp");
const cliProgress = require('cli-progress')
const { targetImageResolution, targetImageName, materialImageResolution } = require('../config.json')
const { getStore } = require('./store')
const { targetImages, materialImages } = require('./path')
const { Pixel } = require('./pixel')

function createBaseImage() {
  return sharp({
    create: {
      width: targetImageResolution.width,
      height: targetImageResolution.height,
      channels: 3,
      background: {
        r: 0,
        g: 0,
        b: 0,
      },
    },
  });
}

class PositionedImage {
  constructor(path, top, left) {
    this.path = path
    this.top = top
    this.left= left
  }

  toCompositeOptions() {
    return {
      input: this.path,
      top: this.top,
      left: this.left,
    }
  }
}

async function stichMaterialImages(positionedImages) {
  const progress = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
  progress.start(1, 0)
  console.time('Stitching')
  const compositeOptions = positionedImages.map(pi => pi.toCompositeOptions())

  const BATCH_SIZE = 80
  let doneCount = 0

  let wipImage = createBaseImage()
  while (doneCount <= compositeOptions.length) {
    progress.update(doneCount / compositeOptions.length)
    const outputPath = `./tmp/${doneCount}.jpg`
    await wipImage.composite(compositeOptions.slice(doneCount, doneCount+BATCH_SIZE)).toFile(outputPath)

    wipImage = sharp(outputPath)
    doneCount += BATCH_SIZE
  }
  progress.stop()
  console.timeEnd('Stitching')
  return wipImage
}


async function constructMosaicImage() {
  const materialImageStore = getStore()

  const pathToTargetImage = join(targetImages.compressed, targetImageName)

  const RESIZED_WIDTH = targetImageResolution.width / materialImageResolution.width
  const RESIZED_HEIGHT = targetImageResolution.height / materialImageResolution.height
  const { data, info } = await sharp(pathToTargetImage)
    .resize({
      width: RESIZED_WIDTH,
      height: RESIZED_HEIGHT
    })
    .raw()
    .toBuffer({ resolveWithObject: true })

  if (info.channels !== 3) {
    throw new Error(`Buffer length is not multiple of 3\n ${JSON.stringify(info)}`)
  }

  const rawArray = Array.from(data)
  const pixels = []
  for (let i = 0; i < data.length; i += 3) {
    const r = rawArray[i]
    const g = rawArray[i+1]
    const b = rawArray[i+2]
    pixels.push(new Pixel(r, g, b))
  }

  const positionedImages = []

  console.log('Start Calculating the Fittest Image...')
  for (let top = 0; top < RESIZED_HEIGHT; top++) {
    for (let left = 0; left < RESIZED_WIDTH; left++) {
      const i = left + (top * RESIZED_WIDTH)
      const pixel = pixels[i]
      const fittestImageName = findFittest(materialImageStore, pixel)
      const fittestImage = join(materialImages.compressed, fittestImageName)
      const positionedImage = new PositionedImage(fittestImage, top * materialImageResolution.height, left * materialImageResolution.width)
      positionedImages.push(positionedImage)
    }
  }
  console.log('Start Stitching...')
  await (await stichMaterialImages(positionedImages)).toFile(join(process.cwd(), 'data', 'done.jpg'))
  console.log('Done!')
}

function findFittest(store, pixel) {
  let minDistance = Number.MAX_SAFE_INTEGER
  let fittestImageName = null
  for (const [candidateName, candidatePixel] of Object.entries(store)) {
    const distance = calcDistance(pixel, candidatePixel)
    if (distance < minDistance) {
      minDistance = distance
      fittestImageName = candidateName
    }
  }
  return fittestImageName
}

function calcDistance(pixelA, pixelB) {
  const rDiff = pixelA.r - pixelB.r
  const gDiff = pixelA.g - pixelB.g
  const bDiff = pixelA.b - pixelB.b

  const d = Math.sqrt(
    (rDiff * rDiff) +
    (gDiff * gDiff) +
    (bDiff * bDiff)
  )
  return d
}


module.exports = {
  stichMaterialImages,
  PositionedImage,
  constructMosaicImage
}