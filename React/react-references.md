# React 小工具
https://github.com/bsonntag/react-use-toggle/blob/master/src/index.js

```js
import { useCallback, useState } from 'react';

function useToggle(initialState = false) {
  const [state, setState] = useState(initialState);
  const toggle = useCallback(() => setState(state => !state), []);

  return [state, toggle];
}

export default useToggle;
```