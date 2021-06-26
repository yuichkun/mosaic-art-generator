const fs = require('fs')
const { join } = require('path')

const ORIGINAL_PATH = 'original'
const COMPRESSED_PATH = 'compressed'


function genPathsFor(kind) {
  return {
    original: join(process.cwd(), kind, ORIGINAL_PATH),
    compressed: join(process.cwd(), kind, COMPRESSED_PATH)
  }
}

function getListOfCompressedMaterialImages() {
  const pathToDir = genPathsFor('material_images').compressed
  return fs.readdirSync(pathToDir)
    .filter(f => f !== '.keep')
    .map(f => join(pathToDir, f))
}

module.exports = {
  targetImages: genPathsFor('target_images'),
  materialImages: genPathsFor('material_images'),
  getListOfCompressedMaterialImages
}
