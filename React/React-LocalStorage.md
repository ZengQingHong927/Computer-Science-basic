# React-LocalStorage

<https://usehooks.com/useLocalStorage/>

```js
import { useLcoalStorage } from ‘react-use’

function useLocalStorageCustomized (key, initialVal) {

	let [ localState, setLocalState ]	= useLcoalStorage (key, initialVal)
	let [ memState, setMemState ]	= useState (localState);


	function setState (val) {
		setLocalState (val)
		setMemState (val)
	}

	return [ memState, setState ];

}
```