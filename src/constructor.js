const sharp = require("sharp");
const { targetImageResolution } = require('../config.json')

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
  const compositeOptions = positionedImages.map(pi => pi.toCompositeOptions())

  const BATCH_SIZE = 80
  let doneCount = 0

  let wipImage = createBaseImage()
  while (doneCount <= compositeOptions.length) {
    const outputPath = `./tmp/${doneCount}.jpg`
    await wipImage.composite(compositeOptions.slice(doneCount, doneCount+BATCH_SIZE)).toFile(outputPath)

    wipImage = sharp(outputPath)
    doneCount += BATCH_SIZE
  }
  return wipImage
}

module.exports = {
  stichMaterialImages,
  PositionedImage
}