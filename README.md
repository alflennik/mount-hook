# Mount Hook

A utility allowing you to test your hooks without resorting to weird acrobatics.

Not tied to any particular test framework.

```js
import mountHook from 'mount-hook'
import useTrue from './useTrue'

describe('useTrue', () => {
  it('returns true', async () => {
    await mountHook(unmount => {
      const shouldBeTrue = useTrue()
      expect(shouldBeTrue).toBe(true)
      unmount()
    })
  })
})
```

You must call `unmount()` to complete the test.

You can use any hooks like you normally would, e.g. useEffect inside the mountHook callback:

```js
await mountHook(unmount => {
  const apiUrl = useApiUrl()
  useEffect(() => {
    fetch(apiUrl).then(async response => {
      const text = await response.text()
      expect(text).toBeTruthy()
      unmount()
    })
  }, [])
})
```

You can provide a Wrapper component for more complicated situations:

```js
import React from 'react'
import { LoginProvider, useLoginStatus } from './LoginProvider'

const Wrapper = ({ children }) => {
  return (
    <LoginProvider>
      {/* Must render its children to work! */}
      {children} 
    </LoginProvider>
  )
}

await mountHook({ Wrapper }, unmount => {
  const isLoggedIn = useLoginStatus()
  expect(isLoggedIn).toBe(false)
})
```

Make sure your test environment supports React.