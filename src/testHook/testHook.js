import React from 'react'
import ReactDOM from 'react-dom'
import { act } from 'react-dom/test-utils'

const Mounter = ({ resolve, useTestHook }) => {
  useTestHook(resolve)
  return null
}

const defaultOptions = {
  Wrapper: ({ children }) => {
    return children
  },
}

const testHook = (...args) => {
  const useTestHook = args[1] ? args[1] : args[0]
  const providedOptions = args[1] ? args[0] : {}
  const options = {
    ...defaultOptions,
    ...providedOptions,
  }

  const { Wrapper } = options

  const container = document.createElement('div')
  document.body.appendChild(container)

  return act(async () => {
    await new Promise(async resolve => {
      ReactDOM.render(
        <Wrapper>
          <Mounter resolve={resolve} useTestHook={useTestHook} />
        </Wrapper>,
        container
      )
    }).then(() => {
      ReactDOM.unmountComponentAtNode(container)
    })
  })
}

export default testHook
