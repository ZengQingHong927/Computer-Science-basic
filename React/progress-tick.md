# Progress Tick
https://material-ui.com/components/progress/

```js
        const [loading, setLoading] = React.useState(false);
        const [success, setSuccess] = React.useState(false);
        const timer = React.useRef();

        const buttonClassname = clsx({
                [classes.buttonSuccess]: success,
                classes.avatar
        });

        React.useEffect(() => {
                return () => {
                        clearTimeout(timer.current);
                };
        }, []);

        const handleButtonClick = () => {
                if (!loading) {
                        setSuccess(false);
                        setLoading(true);
                        timer.current = setTimeout(() => {
                                setSuccess(true);
                                setLoading(false);
                        }, 2000);
                }
        };
```