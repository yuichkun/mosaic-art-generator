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

  const BATCH_SIZE = 40
  let doneCount = 0

  let wipImage = createBaseImage()
  while (doneCount <= compositeOptions.length) {
    const outputPath = `./playground/tmp/${doneCount}.jpg`
    await wipImage.composite(compositeOptions.slice(doneCount, doneCount+BATCH_SIZE)).toFile(outputPath)

    wipImage = sharp(outputPath)
    doneCount += BATCH_SIZE
  }
  
}



// const positionedImages = []
// const BLOCK_SIZE = 40
// for (let top = 0; top < 1080; top += BLOCK_SIZE) {
//   for (let left = 0; left < 1920; left += BLOCK_SIZE) {
//     const i = Math.floor(Math.random() * 3) + 1
//     positionedImages.push(new PositionedImage(`./playground/${i}.jpg`, top, left))
//   }
// }

// async function main() {
//   (await stichMaterialImages(positionedImages))
//     // .toFile('./playground/hoge.jpg')
// }

// main()