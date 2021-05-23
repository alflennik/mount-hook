import { useEffect, useState } from 'react'
import useNextImage from './useNextImage/useNextImage'

const Hello = () => {
  const { imageElement, isLoading, getNext } = useNextImage()

  useEffect(() => {
    console.log(imageElement)
  })

  return 'hello'
}

module.exports = Hello
