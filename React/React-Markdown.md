# React-Markdown

<https://github.com/rexxars/react-markdown>
<https://ourcodeworld.com/articles/read/532/how-to-render-markdown-as-pure-react-components>
<https://juejin.im/post/5a727bb06fb9a01cad7c7dc5>
<https://github.com/umijs/docz-theme-umi/blob/master/src/components/ui/CodeMirror/index.tsx>
<https://rexxars.github.io/react-markdown/>
<https://github.com/laysent/remark-ruby>

## Example

import prism.js css style to CodeBlock
復制node_modules/prismjs/themes/xxxxx.css，到项目src/css，並在項目直接import

```js
import remarkToc from 'remark-toc';
import remarkRuby from 'remark-ruby';
import remarkEmoji from 'remark-emoji';
var React = require("react");
var ReactDOM = require("react-dom");
var ReactMarkdown = require("react-markdown");

var input = "# This is a header\n\nAnd this is a paragraph";

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
                Prism.highlightElement (codeRef.current, false);
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


var useStyles = makeStyles(theme => ({
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
}))

```
