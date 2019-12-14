# Basic Concept

## 生命周期函數

組件加載前，組建加載後，組建更新數據前，組建銷毀後，觸發一系列的函數

1. 組建加載前觸發的生命周期函數：  
   contructor, componentWillMount, render, componentDidMount
2. 組建數據更新的時候觸發的生命周期函數：
   shouldComponentMount, componentWillUpdate, render, componentDidUpdate
3. 父組件裏面改變 props 傳值時觸發的生命周期函數：  
   componentWillRecieve
4. 組件銷毀時觸發的生命周期函數：  
   componentWillUnmount

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
DOM 對象改變 this 指向

```js
  run() {
    alert (this.state.name);
  }

  <button onClick={this.run.bind(this)}>Click</button>
```

構造函數改變 this 指向

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
  alert(this.state.name);
};

<button onClick={this.run}>Click</button>;
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

監聽表單的改變事件 // onChange
在改變事件裏獲取表單輸入值 // ref 獲取輸入值
把表單輸入值賦給組件狀態 // this.setState ({})
點擊按鈕獲取組件狀態值 // this.state.username

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
class Exercise extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      gender: 0,
      msg: "",
      city: "",
      cities: ["Shanghai", "Taipei", "San Fressico"],
      hobby: [
        { title: "Jogging", checked: false },
        { title: "Dancing", checked: false },
        { title: "Movie", checked: false },
        { title: "Web Programming", checked: false }
      ]
    };
    this.onChange = this.onChange.bind(this);
    this.onChangeGender = this.onChangeGender.bind(this);
    this.onChangeCity = this.onChangeCity.bind(this);
    this.onChangeHobby = this.onChangeHobby.bind(this);
    this.onChangeMsg = this.onChangeMsg.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeGender(e) {
    this.setState({ gender: e.target.value });
  }

  onChangeCity(e) {
    this.setState({ city: e.target.value }, () => {
      console.log(this.state.city);
    });
  }

  onChangeHobby(key) {
    let hobby = this.state.hobby;
    hobby[key].checked = !hobby[key].checked;
    this.setState({ hobby });
  }

  onChangeMsg(e) {
    this.setState({ msg: e.target.value }, () => {
      console.log(this.state.msg);
    });
  }

  onChange(e) {
    this.setState({ username: e.target.value });
  }

  onSubmit(e) {
    // Prevent form submit event
    e.preventDefault();
    console.log(this.state);
  }

  render() {
    return (
      <div>
        <h1>Basic Information</h1>
        <form onSubmit={this.onSubmit}>
          Username:
          <input
            ref="username"
            type="text"
            value={this.state.username}
            onChange={this.onChange}
          />
          <br />
          <br />
          Gender:
          <input
            ref="gender"
            type="radio"
            value="1"
            checked={this.state.gender == "1"}
            onChange={this.onChangeGender}
          />
          Male
          <input
            ref="gender"
            type="radio"
            value="2"
            checked={this.state.gender == "2"}
            onChange={this.onChangeGender}
          />
          Female
          <br />
          <br />
          City:
          <select value={this.state.city} onChange={this.onChangeCity}>
            {this.state.cities.map((value, key) => {
              return <option key={key}>{value}</option>;
            })}
          </select>
          <br />
          <br />
          {this.state.hobby.map((value, key) => {
            return (
              <span key={key}>
                {value.title}
                <input
                  type="checkbox"
                  checked={value.checked}
                  onChange={this.onChangeHobby.bind(this, key)}
                  key={key}
                />
              </span>
            );
          })}
          <br />
          <br />
          Message:
          <input
            type="textarea"
            value={this.state.msg}
            onChange={this.onChangeMsg}
          />
          <br />
          <br />
          <input type="submit" defaultValue="Submit" />
        </form>
      </div>
    );
  }
}
```

## 父組件給子組件傳值

defaultProps: 父子組件傳值中，若父組件不給子組件傳值，則子組件可以使用預設值
propTypes: 子組件驗證父組件傳值的數據類型合法性

```js
import PropType from "prop-type";

class Child extends React.Pure.Component {}

Child.defaultProps = {
  title: "Web Development"
};

Child.propTypes = {
  title: PropTypes.string,
  price: PropTypes.number
};
```

## React img

第一次組件加載，render 時沒有數據因此 GET Error，
componentDidMount 後請求完成數據，img 有值，再 GET image,
加入判斷 img src，有值則請求數據，無則 Null
