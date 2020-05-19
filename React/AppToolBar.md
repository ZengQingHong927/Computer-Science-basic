# DashPage
```js
Import React from ‘react’
Import {Fragment} from ‘react’
Import {createPortal} from ‘react’
Import {Helmet} from ‘react-helmet’
Import Typography from ‘@material-ui/Typography’

function AppHelmet (props) {
let { title } = props;
let container = document.querySelector(“#title”);
If (!container)	return;

let     titleElement            =
        <Fragment>
                <Helmet title={title} />
                <Typography variant="h4" color="inherit" >{title}</Typography>
        </Fragment>;

        return createPortal (titleElement, container);

}


function DashPage (props) {

	let { title, children, … rest } = props;


	return (<div {…rest}>
		<AppHelmet title={title} />
		{children}
	</div>)

}

// 在所有组件页面AppBarTool显示不同Title

<DashPage title={“blog posts”} className={classes.blogposts} >
	<BlogPosts>
</DashPage>
```