const { join } = require('path')
const { constructMosaicImage } = require('./constructor')
const { targetImageName, targetImageResolution, materialImageResolutionCandidates, colorConstraints } = require('../config.json')


async function go() {
  let i = 0
  console.time('entire construction')
  for (const materialImageResolution of materialImageResolutionCandidates) {
    for (const displayMaterialResolution of materialImageResolutionCandidates) {
      for (const colorLimit of colorConstraints) {
        const outputFile = join(process.cwd(), 'data', `${i}_${materialImageResolution}_${displayMaterialResolution}_${colorLimit}_done.jpg`)
        await constructMosaicImage({
          targetImageName,
          targetImageResolution,
          outputFile,
          displayMaterialResolution,
          materialImageResolution,
          colorLimit
        })
        i++
      }
    }
  }
  console.timeEnd('entire construction')
}

go()
