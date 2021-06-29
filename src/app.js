const { constructMosaicImage } = require('./constructor')
const { targetImageName, targetImageResolution } = require('../config.json')

constructMosaicImage({
  targetImageName,
  targetImageResolution,
  // TODO: iterate over list of resolutions
  materialImageResolution: 30
})