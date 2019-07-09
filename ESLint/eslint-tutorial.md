# ESLint - Tutorial  
* 用途  
代碼設計規範，警示提醒代碼不符規範處  
參考網址 http://eslint.cn/docs/user-guide/configuring
---
### 使用步驟
1. 在專案根目錄下安裝相關套件，npm install eslint eslint-config-airbnb eslint-friendly-formatter eslint-loader eslint-plugin-html eslint-plugin-import --save-dev  
2. 在專案根目錄下運行 eslint --init，創建新文件.eslintrc.js
3. 編輯 .eslintrc.js配置
4. 在VSCode設定相關配置 Code->Preferences->Settings，在User和Workspace編輯設定，“eslint.validate”:["javascript","javascriptreact",{"language":"vue","autofix":true}]
5. airbnb-base代碼風格範例  
.eslintrc.js
```
module,exports = {
  "env": {
        "browser": true,
        "commonjs": true,
        "es6": true
    },
    "extends": "airbnb-base",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 8
    },
    "rules": {}
}
```