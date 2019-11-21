# RichEditor(DraftJs)
URL https://draftjs.org/docs/api-reference-editor-state#getcurrentcontent
URL https://jpuri.github.io/react-draft-wysiwyg/#/demo
library draftjs-to-html, draftjs-to-export-html
UI material-ui-kit
## Data Conversion
```js
    let [ innerHTML, setInnerHTML ] = useState ({__html: ''});                      // HTML content
    let [ editorState, setEditorState ] = useState (EditorState.createEmpty ());    // Init editorState with EditorState.createWithContent (convertFromRaw (Doc.draft_raw))

    convertToRaw (contentState);
    let rawHTML = draftToHtml (convertToRaw (contentState));
    setInnerHTML (rawHTML)
    <div dangerouslySetInnerHTML={innerHTML}></div>
```