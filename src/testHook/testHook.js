import React from 'react'
import ReactDOM from 'react-dom'
import { act } from 'react-dom/test-utils'

const TestHookHostComponent = ({ unmount, useTestHook }) => {
  useTestHook(unmount)
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

  const { Wrapper: TestHookWrapperComponent } = options

  const container = document.createElement('div')
  document.body.appendChild(container)

  return act(async () => {
    await new Promise(async resolve => {
      ReactDOM.render(
        <TestHookWrapperComponent>
          <TestHookHostComponent unmount={resolve} useTestHook={useTestHook} />
        </TestHookWrapperComponent>,
        container
      )
    }).then(() => {
      ReactDOM.unmountComponentAtNode(container)
    })
  })
}

export default testHook
