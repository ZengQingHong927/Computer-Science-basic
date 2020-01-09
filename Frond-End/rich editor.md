# Draft Js Basic
URL http://jpuri.github.io/react-draft-wysiwyg/#/

## HTML render ReactMarkDown component
```js
import draftToHtml      from 'draftjs-to-html';
import {ReactMarkdown}  from 'react-markdown/with=html';

useEffect(()=>{
        let rawHTML = draftToHtml (draft_raw)   // draft_raw fortmat
        setInnerHtml (rawHTML);
})

<Reactmarkdown source={innerHtml} escapeHtml={false} />
```