import testHook from './src/testHook/testHook'

global.testHook = testHook

let fetchCount = 0
global.fetch = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      const imageLinks = [
        'https://lolrandom-images.s3.amazonaws.com/haulinass.gif',
        'https://lolrandom-images.s3.amazonaws.com/paperairplanemill.gif',
        'https://lolrandom-images.s3.amazonaws.com/eatmenowk.gif',
        // 'https://lolrandom-images.s3.amazonaws.com/ohfuckoffnow.gif',
      ]
      const imageLink = imageLinks[fetchCount]
      fetchCount += 1
      if (fetchCount >= 3) fetchCount = 0
      resolve({
        text: async () => imageLink,
      })
    }, 30)
  })
}
