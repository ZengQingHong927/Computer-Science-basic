# Basic Concept
## Special case for JSX
綁定屬性
```js
this.state = {
  style: {
    color: red,
    fontSize: 40px
  }
}
class => className
for => forHtml

<div style={{color: red}}>Hello</div> // inline style
// or
<div style={this.state.style}>Hello</div>
```
綁定事件
DOM對象改變this指向
```js
  run() {
    alert (this.state.name);
  }

  <button onClick={this.run.bind(this)}>Click</button>
```
構造函數改變this指向
```js
  constructor () {
    super (props);
    this.run = this.run.bind(this);
  }

  run() {
    alert (this.state.name);
  }

  <button onClick={this.run}>Click</button>
```
箭頭函數
```js
  run = () => {
    alert (this.state.name);
  }

  <button onClick={this.run}>Click</button>
```
## 改變狀態
```js
constuctor (props) {
  this.state = {
    name: '',
    number: 0
  }
}

onHandleChange () {
  this.steState({name: 'Jiani', number: 100});
}
```
## 雙向數據綁定(視圖改變影響組件狀態，組件狀態改變影響視圖) MVVM design mode
監聽表單的改變事件             // onChange
在改變事件裏獲取表單輸入值      // ref獲取輸入值
把表單輸入值賦給組件狀態        // this.setState ({})
點擊按鈕獲取組件狀態值          // this.state.username

```js

onKeyPress (e) {
        if (e.keyCode === 13) {
        this.setState ({username: this.refs.username.value});
        }
}

onHandleChange (e) {
        let val = this.refs.username.value;
        this.setState ({username: val});
}

<input ref="username" type="text" onChange={this.onHandleChange}>

// MVVM
<input ref="username" type="text" value={this.state.value} onChange={this.onHandleChange}>

// MV
<input ref="username" type="text" defaultValue={this.state.value} >
```
## 表單處理
```js
        <form onSubmit={this.handleSubmit}>
        <input type="text" value={this.state.value} onChange={this.onChange} />
        <input type="radio" value="1" checked={this.stae.gender == 1} onChange={this.onChange} />
        <input type="radio" value="2" checked={this.state.gender == 2} onChange={this.onChange} />
        <br/> 
        <input type="submit" defaultValue="Submit" />
        </form>

```