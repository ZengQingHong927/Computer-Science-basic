# Hooks
## useEffect
```js
    let     onRefreshDpOrdersCB  = useCallback (onRefreshDpOrders, []);

    useEffect (() => {
            onRefreshDpOrdersCB ();
    }, [onRefreshDpOrdersCB]);

    // async componentDidMount () {
    //         await this.onRefreshDpOrders ();
    // }
```
## useState
```js
    let   [ filterProvIdx, setFilterProvIdx ]       = useState (-1);            // init number
    let   [ filterDateEnd, setFilterDateEnd ]       = useState (defaultEnd);    // use a variable to initiate
    let   [ filterAmountFrom, setFilterAmountFrom ] = useState ('');            // init tring
    let   [ filterAmountFrom, setFilterAmountFrom ] = useState ();              // init undefined
```