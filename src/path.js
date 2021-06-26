const { join } = require('path')

const ORIGINAL_PATH = 'original'
const COMPRESSED_PATH = 'compressed'


function genPathsFor(kind) {
  return {
    original: join(process.cwd(), kind, ORIGINAL_PATH),
    compressed: join(process.cwd(), kind, COMPRESSED_PATH)
  }
}

module.exports = {
  targetImages: genPathsFor('target_images'),
  materialImages: genPathsFor('material_images')
}
