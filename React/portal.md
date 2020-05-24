## Portal

```js
function Title (props) {
        let   { title }         = props;
        let     container       = document.querySelector ('#title-id');
        if (!container)         return null;

        // let titleElement        = <span {...rest}>{title}</span>
        // return (
        //         <React.Fragment>
        //                 <Helmet title={title}>
        //         </React.Fragment>
        // )
        let     titleElement    =
        <div>
                <Helmet title={title}>
                        <Typology variant='h4' color='inherit'>{title}<Typology>
                </Helmet>
        </div>;

        let    titleElementCloned       = cloneElement (titleElement);
        return createPortal (titleElement, container); 
}


funciton OtherComponent (props) {
        ...
        ...
        return (
                <React.Fragment>
                ...
                ...
                        <div id='title-id'/> // Portal will rerender this tag
                </React.Fragment>
        )
}


```