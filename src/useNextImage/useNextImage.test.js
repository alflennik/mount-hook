import { useEffect } from 'react'
import InitialImageProvider, { InitialImageContext } from '../../LolrandomCard/InitialImageProvider'
import useNextImage from './useNextImage'

describe('useNextImage', () => {
  it('automatically loads an image', async () => {
    await testReact(resolve => {
      const { imageElement, isLoading } = useNextImage()

      useEffect(() => {
        expect(imageElement).toBe(undefined)
        expect(isLoading).toBe(true)
      }, [])

      useEffect(() => {
        if (isLoading) return
        expect(imageElement).not.toBe(undefined)
        expect(isLoading).toBe(false)
        resolve()
      })
    })
  })

  it('uses the preloaded image present on InitialImageContext', async () => {
    const initialImage = '<img src="MockImage" />'

    const PopulateInitialImage = () => {
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

    await testReact({ Wrapper }, resolve => {
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
      setTimeout(callback, 20)
    }

    await testReact(resolve => {
      const { imageElement, isLoading, getNext } = useNextImage()
      const previousImage = useRef()
      const iterationsToCheck = useRef(3)

      useEffect(() => {
        if (isLoading) return

        expect(imageElement).not.toBeFalsy()
        expect(imageElement).not.toBe(previousImage.current)

        waitAMoment(() => {
          getNext()
        })

        iterationsToCheck.current -= 1
        previousImage.current = imageElement
        if (iterationsToCheck.current === 0) {
          resolve()
        }
      }, [imageElement, isLoading])
    })
  })
})
