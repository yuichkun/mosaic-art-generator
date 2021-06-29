const { join } = require('path')
const { constructMosaicImage } = require('./constructor')
const { targetImageName, targetImageResolution, materialImageResolutionCandidates } = require('../config.json')


async function go() {
  let i = 0
  console.time('entire construction')
  for (const materialImageResolution of materialImageResolutionCandidates) {
    const outputFile = join(process.cwd(), 'data', `${i}_${materialImageResolution}_done.jpg`)
    await constructMosaicImage({
      targetImageName,
      targetImageResolution,
      outputFile,
      // TODO: manipulate this
      displayMaterialResolution: materialImageResolution,
      materialImageResolution
    })
    i++
  }
  console.timeEnd('entire construction')
}

go()
