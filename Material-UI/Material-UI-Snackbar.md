# Material-UI Theme


## Snackbar Provider

```js
var SnackbarContext        = React.createContext ();

function SnackbarCtxProvider (props) {
        let   { children }      = props;

        let   [ snackbarOpen, toggleSnackbarOpen ]      = useToggle (false);
        let   [ snackbarMessage, setSnackbarMessage ]   = useState ('');
        let     location                                = useLocation ();

        function showSnackBarMessage (message) {
                setSnackbarMessage (message);
                toggleSnackbarOpen (true);
        }

        function addToastForError (err, logoutOnNoAuth) {
                showSnackBarMessage (`[${err.status}] ${err.message || '未知错误'}`);

                if (logoutOnNoAuth && err.status === 520) {
                        let     pathname        = location.pathname;
                        window.location.search  = location.search ? `?redirectUrl=${pathname}?${location.search}` : `?redirectUrl=${pathname}`;

                        // 权限或session错误信息进行登出
                        return Logout ()
                }
        }

        let     snkctx      = {
                snackbarOpen,
                toggleSnackbarOpen,
                showSnackBarMessage,
                addToastForError,
        };

        return (
                <SnackbarContext.Provider value={snkctx}>
                        {children}

                        <Snackbar anchorOrigin={{vertical: 'bottom', horizontal: 'center'}} open={snackbarOpen} autoHideDuration={1000} onClose={() => toggleSnackbarOpen (false)} message={<span id="id-message">{snackbarMessage}</span>} />
                </SnackbarContext.Provider>
        );
}

function useSnackbarCtx () {
        return useContext (SnackbarContext);
}

export {
        SnackbarCtxProvider,
        useSnackbarCtx,
};
```
