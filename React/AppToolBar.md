# DashPage

```js
import React from 'react'
import {Fragment} from 'react'
import {createPortal} from 'react'
import {Helmet} from 'react-helmet'
import Typography from '@material-ui/Typography'

function AppHelmet (props) {
        let { title } = props;
        let container = document.querySelector('#title');
        if (!container) return;

        let     titleElement    =
                <Fragment>
                        <Helmet title={title} />
                        <Typography variant="h4" color="inherit" >{title}</Typography>
                </Fragment>;

        return createPortal (titleElement, container);
}

function DashPage (props) {

        let { title, children, … rest } = props;


        return (
                <div {…rest}>
                        <AppHelmet title={title} />
                                {children}
                </div>
        )

}

// 在所有組件件頁面AppBarTool顯示不同Title

<DashPage title={“blog posts”} className={classes.blogposts} >
        <BlogPosts>
</DashPage>
```
