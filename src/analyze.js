const sharp = require('sharp')
const { Pixel, reduceAvgPixel } = require('./pixel')

async function analyze(pathToImage) {
  const { data, info } = await sharp(pathToImage).raw().toBuffer({ resolveWithObject: true })
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
  console.log('avg Pixel', reduceAvgPixel(pixels))
}


module.exports = {
  analyze
}