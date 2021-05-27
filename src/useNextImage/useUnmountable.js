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

  const unmountable = useCallback(async promise => {
    const result = await promise
    if (!isMounted.current) throw new UnmountError()
    return result
  }, [])

  const wrapAction = action => {
    return (...args) => {
      return action(...args)?.catch?.(error => {
        if (error.name === 'UnmountError') return
        throw error
      })
    }
  }

  return { unmountable, wrapAction }
}

export default useUnmountable
