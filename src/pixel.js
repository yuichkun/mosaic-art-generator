class Pixel {
  constructor(r, g, b) {
    this.r = r
    this.g = g
    this.b = b
  }

  toJson() {
    return {
      r: this.r,
      g: this.g,
      b: this.b
    }
  }
}

function reduceAvgPixel(pixels) {
  let rSum = 0
  let gSum = 0
  let bSum = 0
  for (const pixel of pixels) {
    rSum += pixel.r
    gSum += pixel.g
    bSum += pixel.b
  }
  return new Pixel(
    rSum / pixels.length,
    gSum / pixels.length,
    bSum / pixels.length,
  )
}

module.exports = {
  Pixel,
  reduceAvgPixel
}