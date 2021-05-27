const { useLayoutEffect, useRef, useCallback } = require('react')

class UnmountError extends Error {
  constructor() {
    super()
    this.name = 'UnmountError'
  }
}

const hasUnmounted = {}

const useResolveOnUnmountPromise = () => {
  const resolveRef = useRef()
  const resolveOnUnmountPromiseRef = useRef(
    new Promise(resolve => {
      resolveRef.current = resolve
    })
  )
  useLayoutEffect(() => {
    return () => {
      resolveRef.current(hasUnmounted)
    }
  }, [])
  return resolveOnUnmountPromiseRef
}

const useUnmountable = () => {
  const resolveOnUnmountPromiseRef = useResolveOnUnmountPromise()

  const unmountable = useCallback(promise => {
    const result = Promise.race([resolveOnUnmountPromiseRef.current, promise])
    console.log(Object.is(result, hasUnmounted) ? 'has unmounted' : 'still mounted')
    if (Object.is(result, hasUnmounted)) throw new UnmountError('TODO')
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
