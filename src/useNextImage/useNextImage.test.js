import React, { useState, useEffect, useContext, useRef } from 'react'
import InitialImageProvider, { InitialImageContext } from './InitialImageProvider'
import loadImageElement from './loadImageElement'
import useNextImage from './useNextImage'

describe('useNextImage', () => {
  it('automatically loads an image', async () => {
    await testHook(resolve => {
      const { imageElement, isLoading } = useNextImage()

      useEffect(() => {
        expect(imageElement).toBe(undefined)
        expect(isLoading).toBe(true)
      }, [])

      useEffect(() => {
        if (isLoading) return
        expect(imageElement).not.toBe(undefined)
        resolve()
      })
    })
  })

  it('uses the preloaded image present on InitialImageContext', async () => {
    const initialImage = await loadImageElement()

    const PopulateInitialImage = ({ children }) => {
      const [isReady, setIsReady] = useState(false)
      const { setInitialImage } = useContext(InitialImageContext)

      useEffect(() => {
        setInitialImage(initialImage)
        setIsReady(true)
      }, [])

      if (!isReady) return null

      return children
    }

    const Wrapper = ({ children }) => {
      return (
        <InitialImageProvider>
          <PopulateInitialImage>{children}</PopulateInitialImage>
        </InitialImageProvider>
      )
    }

    await testHook({ Wrapper }, resolve => {
      const { imageElement, isLoading } = useNextImage()
      useEffect(() => {
        expect(imageElement).toBe(initialImage)
        expect(isLoading).toBe(false)
        resolve()
      }, [])
    })
  })

  it('loads another image when getNext is called', async () => {
    const waitAMoment = callback => {
      callback()
      // setTimeout(callback, 20)
    }

    await testHook(resolve => {
      const { imageElement, isLoading, getNext } = useNextImage()
      const previousImage = useRef()
      const iterationsToCheck = useRef(3)

      useEffect(() => {
        if (isLoading) return

        if (iterationsToCheck.current === 0) {
          resolve()
          return
        }

        expect(imageElement).not.toBeFalsy()
        expect(imageElement).not.toBe(previousImage.current)
        expect(imageElement.src).not.toBe(previousImage.current?.src)

        waitAMoment(() => {
          previousImage.current = imageElement
          iterationsToCheck.current -= 1
          getNext()
        })
      }, [imageElement, isLoading])
    })
  })
})
