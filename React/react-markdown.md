# React-Markdown
https://github.com/rexxars/react-markdown
- react-markdown/with-html
https://ourcodeworld.com/articles/read/532/how-to-render-markdown-as-pure-react-components
https://juejin.im/post/5a727bb06fb9a01cad7c7dc5


## Example
import prism.js css style to CodeBlock
复制node_modules/prismjs/themes/xxxxx.css，到项目src/css，并在项目直接import

```js
        import remarkToc from 'remark-toc';
        import remarkRuby from 'remark-ruby';
        import remarkEmoji from 'remark-emoji';
        var React = require("react");
        var ReactDOM = require("react-dom");
        var ReactMarkdown = require("react-markdown");

        var input = "# This is a header\n\nAnd this is a paragraph";

        function CodeRender (props) {

        }

        function RubyRender (props) {

        }


        function MarkDown (props) {
                let     classes = useStyle ();

                useEffect (() => {
                        Prism.hightlightAll ()
                }, [])

                let renders = {
                        code:   CodeRender,
                        ruby:   RubyRender
                }

                let plugins = {
                        remarkToc,
                        remarkRuby,
                        remarkEmoji
                }


                return (
                        <div className={clsx (classes.root, className)}>
                                <ReactMarkdown renders={renders} plugins={plugins} />
                        </div>
                )

        }


        // source must be String (markdown, html)
        ReactDOM.render(<ReactMarkdown source={input}  escapeHtml={true}/>, document.getElementById("container"));
```
```js
Import ReactMarkdown from ‘react-markdown/with-html’
Import remarkToc	from ‘remark-toc’
Import remarkRuby from ‘remark-ruby’
Import remarkEmoji from ‘remark-emoji’

// https://github.com/umijs/docz-theme-umi/blob/master/src/components/ui/CodeMirror/index.tsx (using react-codemirror2)
// https://github.com/ZiQiangWang/react-cmirror/blob/master/src/react-cmirror.jsx (directly uses codemirror)
// https://rexxars.github.io/react-markdown/ (demo directly uses codemirror)


// https://github.com/laysent/remark-ruby

// react-markdown demo 样式 写css
'& pre': {
                        border:         '1px solid #ccc',
                },

                '& blockquote': {
                        color:                  '#666',
                        margin:                 0,
                        paddingLeft:            '3em',
                        borderLeft:             '0.5em #eee solid',
                        marginBottom:           theme.spacing (3)
                },

                '& tr': {
                        borderTop:      '1px solid #c6cbd1',
                        background:     '#fff',
                },
                '& th, td': {
                        padding:        '6px 13px',
                        border:         '1px solid #dfe2e5',
                },

                '& table': {
                        borderSpacing:          0,
                        borderCollapse:         'collapse',
                        marginBottom:           theme.spacing (3)
                },

                '& table tr:nth-child(2n)': {
                        background:             '#f6f8fa',
                },
function CodeBlock (props) {
        let {
                // async,
                source,
                language,
                className,
                color,
                // component:      Component,
                ...rest } = props;

        let     codeRef         = useRef (null);
        let     classes     = useStyles();

        // Component       = Component || 'code';

        useEffect (() => {
                console.log (`- highlighting, language = ${language}`);
                // const highlight = () => {
                Prism.highlightElement (codeRef.current, false);
                // };

                // highlight ();
        });

        let     finalStyle      = {};
        if (color === 'inherit') {
                finalStyle.background   = 'inherit';
        }

        return (
                <pre className={clsx (`language-${language}`)} style={finalStyle}>
                        <code {...rest} className={clsx (classes.root, className)} ref={codeRef} style={finalStyle}>
                                {/* {trimCode (source)} */}
                                {source}
                        </code>
                </pre>
        );
}


function CodeRenderer (props) {
	let {value, …rest} = props;
	return (<CodeBlock source={value} {…rest} >)
}

function RubyRenderer (props) {
	let	{data} = props;

	return (<ruby>{data.hChildren.map(({type, value, children, tagName}, i) => {

	if (type === ‘text’) return value
	if (type === ‘element) {
			let child0 = children[0];
			let Tag = tagName;
			return <Tag key={I}>{Child0.value}</Tag>
	}

})}</ruby>)


}


function ThMarkdown (props) {
	let {className, ...rest} = props;

	let	classes		= useStyles ();

	useEffect (() => {
		Prism.hightlightAll ()

	}, [])

	let renderers = {
		code : CodeREnderer,
		ruby: RubyRenderer,
	}

	let plugins = {
		remarkToc,
		remarkRuby,
		remarkEmoji,
	}
	return (
		<div className={clsx()}>
			<ReactMarkdown {…rest} renderers={renderers} plugins={plugins} />
		</div>
	)


}
```
