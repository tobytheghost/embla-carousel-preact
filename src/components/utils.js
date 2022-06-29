function canUseDOM () {
  return !!(
    typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement
  )
}

function areObjectsEqualShallow (objectA, objectB) {
  return (
    Object.keys(objectA).length === Object.keys(objectB).length &&
    Object.keys(objectA).every(objectKey => {
      if (!Object.prototype.hasOwnProperty.call(objectB, objectKey)) {
        return false
      }
      return objectA[objectKey] === objectB[objectKey]
    })
  )
}

function sortAndMapPluginToOptions (plugins) {
  return plugins
    .concat()
    .sort((a, b) => (a.name > b.name ? 1 : -1))
    .map(plugin => plugin.options)
}

function arePluginsEqual (pluginsA, pluginsB) {
  if (pluginsA.length !== pluginsB.length) return false
  const optionsA = sortAndMapPluginToOptions(pluginsA)
  const optionsB = sortAndMapPluginToOptions(pluginsB)
  return optionsA.every((optionA, index) => {
    const optionB = optionsB[index]
    return areObjectsEqualShallow(optionA, optionB)
  })
}

module.exports = {
  canUseDOM,
  areObjectsEqualShallow,
  sortAndMapPluginToOptions,
  arePluginsEqual
}