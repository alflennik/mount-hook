const { useEffect, useRef, useCallback } = require('react')

class UnmountError extends Error {
  constructor() {
    super()
    this.name = 'UnmountError'
  }
}

const useRejectOnUnmountPromise = () => {
  const rejectRef = useRef()
  const rejectOnUnmountPromiseRef = useRef(
    new Promise((_, reject) => {
      rejectRef.current = reject
    })
  )
  useEffect(() => {
    return () => {
      rejectRef.current(new UnmountError())
    }
  }, [])
  return rejectOnUnmountPromiseRef
}

const useUnmountable = () => {
  const rejectOnUnmountPromiseRef = useRejectOnUnmountPromise()

  const unmountable = useCallback(promise => {
    return Promise.race([rejectOnUnmountPromiseRef.current, promise])
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
