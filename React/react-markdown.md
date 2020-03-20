# React-Markdown
https://github.com/rexxars/react-markdown
- react-markdown/with-html

## Example
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