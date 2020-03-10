# Drag and Drop to upload file
https://www.npmjs.com/package/react-dropzone-component
https://github.com/felixrieseberg/React-Dropzone-Component
https://malcoded.com/posts/react-dropzone/
https://medium.com/@mannycodes/build-a-react-drag-drop-progress-file-uploader-fb874c515a7
```js
(bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};
```