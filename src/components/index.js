const { useRef, useEffect, useState, useMemo } = require('preact/hooks')
const { areObjectsEqualShallow, arePluginsEqual, canUseDOM } = require('./utils')
const EmblaCarousel = require('embla-carousel').default

function useEmblaCarousel (options = {}, plugins = []) {
  const [embla, setEmbla] = useState()
  const [viewport, setViewport] = useState()
  const storedOptions = useRef(options)
  const storedPlugins = useRef(plugins)

  const activeOptions = useMemo(() => {
    if (!areObjectsEqualShallow(storedOptions.current, options)) {
      storedOptions.current = options
    }
    return storedOptions.current
  }, [storedOptions, options])

  const activePlugins = useMemo(() => {
    if (!arePluginsEqual(storedPlugins.current, plugins)) {
      storedPlugins.current = plugins
    }
    return storedPlugins.current
  }, [storedPlugins, plugins])

  useEffect(() => {
    if (canUseDOM() && viewport) {
      EmblaCarousel.globalOptions = useEmblaCarousel.globalOptions
      const newEmbla = EmblaCarousel(viewport, activeOptions, activePlugins)
      setEmbla(newEmbla)
      return () => newEmbla.destroy()
    } else {
      setEmbla(undefined)
    }
  }, [viewport, activeOptions, activePlugins, setEmbla])

  return [setViewport, embla]
}

useEmblaCarousel.globalOptions = undefined

module.exports = useEmblaCarousel
