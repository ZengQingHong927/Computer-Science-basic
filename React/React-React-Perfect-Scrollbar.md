# React Perfect Scrollbar

## 內容區置底
```js
function containerRef (ref) {
        scrollbarRef.current    = ref;
}

useEffect (() => {
        // console.log (`- scrollbarRef: ${scrollbarRef.current}`);
        scrollbarRef.current.scrollTop          = scrollbarRef.current.scrollHeight;
}, [messages]);


<PerfectScrollbar containerRef={containerRef}>
        {children}
</PerfectScrollbar>
```