import 'jsdom-global/register'
import React from 'react'
import ReactDOM from 'react-dom'
import Hello from './Hello'

global.fetch = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        text: async () => 'https://lolrandom-images.s3.amazonaws.com/haulinass.gif',
      })
    }, 400)
  })
}

const div = document.createElement('div')
document.body.appendChild(div)

ReactDOM.render(<Hello />, div)

// setTimeout(() => {
//   console.log('reached 5s')
// }, 5000)
