# RichEditor
URL: https://segmentfault.com/a/1190000019833834
    https://codesandbox.io/s/insert-image-3svtu
    https://jpuri.github.io/react-draft-wysiwyg/#/demo
    https://www.jianshu.com/p/e7d85ab7471b

## tool
draftjs-to-html
{convertToRaw} from draft-js
{convertFromRaw} from draft-js
{EditorState} from draft-js
<div dangerouslySetInnerHTML={__html: rawHTML} />
let draft_Raw = convertToRaw (contentState)
EditorState.createWithContent (convertFromRaw)