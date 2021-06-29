const { join } = require('path')
const { constructMosaicImage } = require('./constructor')
const { targetImageName, targetImageResolution } = require('../config.json')

const outputFile = join(process.cwd(), 'data', 'done.jpg')

constructMosaicImage({
  targetImageName,
  targetImageResolution,
  // TODO: manipulate this
  outputFile,
  // TODO: iterate over list of resolutions
  materialImageResolution: 30
})