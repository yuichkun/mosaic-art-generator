const fs = require('fs')
const { join } = require('path')
const { materialImageResolutionCandidates } = require('../config.json')

const ORIGINAL_PATH = 'original'
const COMPRESSED_PATH = 'compressed'
const TARGET_IMAGES_PATH = 'target_images'
const MATERIAL_IMAGES_PATH = 'material_images'

function genPathsForMaterialImages() {
  const baseCompressedPath = join(process.cwd(), MATERIAL_IMAGES_PATH, COMPRESSED_PATH)

  const pathToCompressed = {}
  for (const resolution of materialImageResolutionCandidates) {
    pathToCompressed[resolution] = join(baseCompressedPath, resolution.toString())
  }

  return {
    original: join(process.cwd(), MATERIAL_IMAGES_PATH, ORIGINAL_PATH),
    compressed: pathToCompressed
  }
}

function getListOfCompressedMaterialImages() {
  const firstDir = materialImageResolutionCandidates[0]
  const pathToDir = genPathsForMaterialImages().compressed[firstDir]
  return fs.readdirSync(pathToDir)
    .filter(f => f !== '.keep')
    .map(f => join(pathToDir, f))
}

module.exports = {
  targetImages: {
    original: join(process.cwd(), TARGET_IMAGES_PATH, ORIGINAL_PATH),
    compressed: join(process.cwd(), TARGET_IMAGES_PATH, COMPRESSED_PATH)
  },
  materialImages: genPathsForMaterialImages(),
  getListOfCompressedMaterialImages
}
