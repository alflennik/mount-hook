import 'jsdom-global/register'
import testHook from './testHook/testHook'

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
    }, 400)
  })
}

global.testHook = testHook

global.describe = (a, b) => b()
global.it = (a, b) => b()
global.expect = actual => {
  const toBe = expected => {
    if (actual !== expected) {
      throw new Error(`${actual} is not ${expected}`)
    }
  }
  const notToBe = expected => {
    if (actual === expected) {
      throw new Error(`${actual} is ${expected}`)
    }
  }
  const notToBeFalsy = () => {
    if (!actual) {
      throw new Error(`${actual} is falsy`)
    }
  }
  return {
    toBe,
    not: {
      toBe: notToBe, // That is the question
      toBeFalsy: notToBeFalsy,
    },
  }
}

require('./useNextImage/useNextImage.test')
