const fs = require('fs')
const { join } = require('path')

const pathToPixelMapStore = join(process.cwd(), 'data', 'material-images-store.json')

function saveMaterialPixelInfo(imgName, pixel) {
  const store = getStore()
  store[imgName] = pixel.toJson()
  fs.writeFileSync(pathToPixelMapStore, JSON.stringify(store, null, 2), 'utf-8')
  console.log('Successfully saved store:', store)
}

function getStore() {
  if (fs.existsSync(pathToPixelMapStore)) {
    console.log('Store already exists')
    const store = JSON.parse(fs.readFileSync(pathToPixelMapStore, 'utf-8'))
    console.log('Parsed Store', store)
    return store
  } else {
    console.log('Store does not yet exist')
    return {}
  }
}

module.exports = {
  saveMaterialPixelInfo
}