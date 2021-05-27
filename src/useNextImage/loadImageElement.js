const loadImageElement = async () => {
  const imageUrl = await (await fetch('/images')).text()

  return new Promise(resolve => {
    const imageElement = new Image()
    imageElement.onload = () => {
      resolve(imageElement)
    }
    if (navigator.userAgent.includes('jsdom')) {
      resolve(imageElement) // onload not present in jsdom
    }
    imageElement.src = imageUrl
  })
}

export default loadImageElement
