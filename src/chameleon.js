import React, { useState, useEffect, useRef } from 'react'
import Helmet from 'react-helmet'

const Chameleon = () => {
  const defaultColor = '#fff'
  const empty = 'rgba(0, 0, 0, 0)'
  const key = 'background'
  const keyAlt = 'backgroundColor'
  const [color, setColor] = useState(defaultColor)
  const container = useRef()
  useEffect(() =>{
    const getComputedStyle = (element) => window ? (element.parentNode ? window.getComputedStyle(element) : false) : false
    const getBackground = (element) =>  {
      const styles = getComputedStyle(element)
      if (styles) {
        const value = styles.getPropertyValue(key)
        return value ? value : styles[keyAlt]
      }
      return false
    }
    const trim = (value) => {
      // Regex to match RGB and RGBA colors
      // https://stackoverflow.com/a/27622101/9129020
      if (!value) return false
      return value.match(/(.*?)(rgb|rgba)\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)/i)[0]
    }
    let cur = container.current
    while (cur && trim(getBackground(cur)) === empty) {
      cur = cur.parentNode
    }
    const newColor = trim(getBackground(cur))
    setColor(newColor ? newColor : defaultColor)
  })
  const meta = (name) => ({ name, content: color })
  return (
    <div ref={container}>
      <Helmet
        meta={[
          meta('theme-color'),
          meta('msapplication-navbutton-color'),
        ]}>
      </Helmet>
    </div>
  )
}

export default Chameleon
