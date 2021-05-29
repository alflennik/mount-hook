const { useLayoutEffect, useRef, useCallback } = require('react')

class UnmountError extends Error {
  constructor() {
    super()
    this.name = 'UnmountError'
  }
}

const useUnmountable = () => {
  const isMounted = useRef(true)

  useLayoutEffect(() => {
    return () => {
      isMounted.current = false
    }
  }, [])

  const unmountable = useCallback(promise => {
    const wrappedPromise = promise.then(result => {
      if (!isMounted.current) throw new UnmountError()
      return result
    })

    wrappedPromise.originalCatch = wrappedPromise.catch
    wrappedPromise.catch = errorHandler => {
      return wrappedPromise.originalCatch(error => {
        if (error.name === 'UnmountError') throw error
        return errorHandler(error)
      })
    }

    return wrappedPromise
  }, [])

  const wrapAction = action => {
    return (...args) => {
      const response = action(...args)
      if (!(response && response.catch)) return response

      response.catch(error => {
        if (error.name === 'UnmountError') return
        throw error
      })

      return response
    }
  }

  return { unmountable, wrapAction }
}

export default useUnmountable
