# Authentication-React
https://kentcdodds.com/blog/authentication-in-react-applications

```js
import  { useContext } from 'react';
import  { useLocalStorage } from 'react-use'
import  { useHistory } from 'react-router-dom';

function AuthContextProvider (props) {
        let     [login, setLogin]       = useLocalStorage ('key', 'value');
        let     history                 = useHistory ();

        function login () {
                console.log ('user login')
        }

        function logout () {
                console.log ('user logout');
                window.localStorage.clear ();
                history.go ('/login');
        }

        let authctx     = {
                login,
                logout,isLogin  =       true
        }

        return (
                <AuthContext.Provider value={authctx}>
                        {props.children}
                </AuthContext.Provider>
        )


}


function useAuthCtx () {
        return useContext (AuthContext);
}


export {
        AuthContextProvider,
        useAuthCtx,
};

import {AuthContextProvider} from './AuthContext'

// 最外层路由加入authctxprovider
function App (props) {

        return (
                <AuthContextProvider>
                        <Switch>
                                <PassRoute path="/login" component={PcLiteLogin} />
                                <PassRoute component={DashboardLayout} />
                        </Switch>
                </AuthContextProvider>
        );
}


```

```js
Import { useLcoalStorage } from ‘react-use’

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