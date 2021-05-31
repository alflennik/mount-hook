# Test Hook

A utility allowing you to test your hooks without resorting to weird acrobatics.

Not tied to any particular test framework.

```js
import testHook from 'test-hook'
import useTrue from './useTrue'

describe('useTrue', () => {
  it('returns true', async () => {
    await testHook(unmount => {
      const shouldBeTrue = useTrue()
      expect(shouldBeTrue).toBe(true)
      unmount()
    })
  })
})
```

You must call `unmount()` to complete the test.

You can use any hooks like you normally would, e.g. useEffect inside the testHook callback:

```js
await testHook(unmount => {
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

const MyContext = React.createContext('pork belly')

const Wrapper = ({ children }) => {
  return (
    <MyContext.Provider>
      {/* Must render its children to work! */}
      {children} 
    </MyContext.Provider>
  )
}

await testHook({ Wrapper }, unmount => {
  const value = useContext(MyContext)
  expect(value).toBe('pork belly')
})
```

Make sure your test environment supports React.