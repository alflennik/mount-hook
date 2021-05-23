const { useEffect, useState } = require("react");

const Hello = () => {
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    setInterval(() => {
      setCount(state => state + 1)
    }, 50)
  }, [])

  useEffect(() => {
    console.log('hello', count)
  })
  return "hello";
};

module.exports = Hello
