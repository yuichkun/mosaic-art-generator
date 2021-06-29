const fs = require('fs')
const { join } = require('path')

const pathToPixelMapStore = join(process.cwd(), 'data', 'material-images-store.json')

function saveMaterialPixelInfo(imgName, pixelJson) {
  const store = getStore()
  store[imgName] = pixelJson
  fs.writeFileSync(pathToPixelMapStore, JSON.stringify(store, null, 2), 'utf-8')
}

function getStore() {
  if (fs.existsSync(pathToPixelMapStore)) {
    const store = JSON.parse(fs.readFileSync(pathToPixelMapStore, 'utf-8'))
    return store
  } else {
    return {}
  }
}

module.exports = {
  saveMaterialPixelInfo,
  getStore
}