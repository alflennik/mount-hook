import 'jsdom-global/register'
import React from 'react'
import ReactDOM from 'react-dom'
import Hello from './Hello'

const div = document.createElement('div')
document.body.appendChild(div)

ReactDOM.render(<Hello />, div)
