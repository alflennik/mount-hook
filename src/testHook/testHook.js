import React from 'react'
import ReactDOM from 'react-dom'

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

  return new Promise(resolve => {
    ReactDOM.render(
      <Wrapper>
        <Mounter resolve={resolve} useTestHook={useTestHook} />
      </Wrapper>,
      container
    )
  }).then(() => {
    ReactDOM.unmountComponentAtNode(container)
  })
}

export default testHook
