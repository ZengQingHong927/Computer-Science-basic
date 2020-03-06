# RichEditor
https://segmentfault.com/a/1190000019833834  
https://codesandbox.io/s/insert-image-3svtu  
https://jpuri.github.io/react-draft-wysiwyg/#/demo  
https://www.jianshu.com/p/e7d85ab7471b  
https://github.com/facebook/draft-js/blob/master/examples/draft-0-10-0/media/media.html  
## tool
draftjs-to-html
import  Reactmarkdown from 'react-markdown/with-html'
import {convertToRaw} from 'draft-js'
import {convertFromRaw} from draft-js
import {EditorState} from draft-js
<div dangerouslySetInnerHTML={__html: rawHTML} />
or
<Markdown source={innerHtml} escapeHtml={false}>

let draft_Raw = convertToRaw (contentState)
EditorState.createWithContent (convertFromRaw)