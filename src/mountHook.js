const React = require('react')
const ReactDOM = require('react-dom')
const { act } = require('react-dom/test-utils')
require('jsdom-global')

const MountHookHostComponent = ({ unmount, useMountHook }) => {
  useMountHook(unmount)
  return null
}

const defaultOptions = {
  Wrapper: ({ children }) => {
    return children
  },
}

const mountHook = (/* options, useMountHook */ ...args) => {
  const useMountHook = args[1] ? args[1] : args[0]
  const providedOptions = args[1] ? args[0] : {}
  const options = {
    ...defaultOptions,
    ...providedOptions,
  }

  const { Wrapper: MountHookWrapperComponent } = options

  const container = document.createElement('div')
  document.body.appendChild(container)

  return act(async () => {
    await new Promise(async resolve => {
      ReactDOM.render(
        React.createElement(
          MountHookWrapperComponent,
          {},
          React.createElement(MountHookHostComponent, { unmount: resolve, useMountHook }, null)
        ),
        container
      )
    }).then(() => {
      ReactDOM.unmountComponentAtNode(container)
    })
  })
}

module.exports = mountHook
