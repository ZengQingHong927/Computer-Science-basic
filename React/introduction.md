# React Basic
## 生命週期
1. constructor()中初始化組件內部的資料
2. 使用rendor()在網頁輸出組件內容
3. 輸出組件內容後會執行componentDidMount()一次調用
4. 當組件內部state被修改時，執行componentDidUpdate()
5. 當組件被移出時會執行調用一次componentWillUnmount()
每次呼叫的組件都是獨一無二的，會有自己的生命週期