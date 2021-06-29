const { join } = require('path')
const { constructMosaicImage } = require('./constructor')
const { targetImageName, targetImageResolution, materialImageResolutionCandidates } = require('../config.json')


async function go() {
  let i = 0
  console.time('entire construction')
  for (const materialImageResolution of materialImageResolutionCandidates) {
    for (const displayMaterialResolution of materialImageResolutionCandidates) {
      const outputFile = join(process.cwd(), 'data', `${i}_${materialImageResolution}_done.jpg`)
      await constructMosaicImage({
        targetImageName,
        targetImageResolution,
        outputFile,
        displayMaterialResolution,
        materialImageResolution,
        // TODO: manipulate
        colorLimit: 30,
      })
      i++
    }
  }
  console.timeEnd('entire construction')
}

go()
