# Helmet

```js
import      React                                       from 'react';
import    { createPortal }                              from 'react-dom';
import    { Helmet }                                    from 'react-helmet';
import      Typography                                  from '@material-ui/core/Typography';

function Title (props) {
        let   { title }                 = props;

        let     container               = document.getElementById ('substitution place');
        if (!container)         return null;

        let     titleElement            =
        <div>
                <Helmet title={title} />
                <Typography variant="h4" color="inherit" >{title}</Typography>
        </div>;

        // 将titleelement放进container
        return createPortal (titleElement, container);
}

export default Title;
```