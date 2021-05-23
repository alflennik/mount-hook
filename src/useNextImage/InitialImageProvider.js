import React, { createContext, useState } from 'react'
import PropTypes from 'prop-types'

const InitialImageContext = createContext()

const InitialImageProvider = ({ children }) => {
  const [initialImage, setInitialImage] = useState()
  return (
    <InitialImageContext.Provider value={{ initialImage, setInitialImage }}>
      {children}
    </InitialImageContext.Provider>
  )
}

InitialImageProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export { InitialImageContext }
export default InitialImageProvider
