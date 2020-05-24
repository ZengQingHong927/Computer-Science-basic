# React Basic

## 生命週期

1. constructor()中初始化組件內部的資料
2. 組件初始化會執行componentWillUpdate()
3. 組件渲染，使用rendor()在網頁輸出組件內容
4. 組建渲染完成，執行componentDidMount()
5. 當組件更新前執行調用shouldComponentUpdate(newProps,newState)  // 返回true則執行componentWillUpdate()
6. 執行組建渲染，render()
7. 當組件狀態更新並完成渲染後，執行componentDidUpdate()
8. 當組件被移出時會執行調用一次componentWillUnmount()
每次呼叫的組件都是獨一無二的，會有自己的生命週期

## JSX Syntax

JavaScript合法的表達式（變量宣告），放在{}来引用
元素的属性值可用“xxx”或{user.avatar}
DOM元素存放在宣告的變量中

```js
    const element = (
        <h1 className="greeting">
            Hello, world!
        </h1>
    );
    const element = {
        type: 'h1',
        props: {
            className: 'greeting',
            children: 'Hello, world!'
        }
    };
```

## 渲染组件

每個React element是唯一不可變的。唯一改變的方法，就是創造一個新的React element，並且React在創建新組件時，會比較之前的組件，只更新不一樣的地方

```js
// in HTML file
<div id="root"></div>

// in JSX file
const element = <h1>Hello, world</h1>;
ReactDOM.render(element, document.getElementById('root'));
```

## 组件和属性

There are two way to create a React component, function base and class base.
组件的return只能返回一个DOM元素。
將组件做階層規劃，一個大组件拆分成多個小组件

```js
// Error examlple
return (
    <div>Hello</div>
    <div>Hello</div>
    <div>Hello</div>
)
```

```html
    <div id='root'></div>
```

```js
    function Welcome (props) {
        return (
            <div>
                Hello {props.name}, Welcome to My React App.
            </div>
        )
    }

    class Welcome extends React.Component {
        constructor(props) {
            super(props);
        }

        render () {
            return (
                <div>
                    Hello {this.props.name}. Welcome to My React App.
                </div>
            )
        }
    }

    const element = <Welcome name='Ladies and Gentlemen' />
    ReactDOM.render(element, document.getElementById('root'))
```

## 组件的属性和生命周期

componentDiMount: 組件輸出後立即調用的函數
componentWillUpdate： 組件更新後立即調用的函數
componentWillUnmount: 組件被移除後立即調用的函數
使用setState來改變组件狀態state
可以透過props，將屬性值層層傳遞给自己的子組件

```js
this.setState((state, props) => ({
    counter: state.counter + props.increment
}));
// or
this.setState(function(state, props) {
    return {
        counter: state.counter + props.increment
    };
});
```

## 事件處理函数

使用event.preventDefault()阻止提交訂單開啓新頁面。
使用{函數名稱}作事件監聽

```js
class LogginButton extends React.Component {
    constructor (props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick (e) {
        alert(`Hello ${e.target.name}`);
    }

    render () {
        return (
            <div>
                <label for='username'>User :
                <input id='username' value={this.state.name}>
                <button type='submit' value='Click Me!' onClick={this.handleClick.bind(this)}>
            </div>
        )
    }
}
```

## 條件渲染组件

logical statement
if-else, conditional, inline if with logical && operator
阻止組件被渲染，將組件return null即可

```js
// true output expression, false output false
{true && expression} or {false && expression}
// conditional
<b>{isLoggedIn ? 'currently' : 'not'}</b>
```

## Lists and Keys

Keys must be unique, and be used to help React to identify which element update

```js
class ToDoList extends React.Component {
    constructor (props) {
        super(props);
        this.listItem = this.listItem.bind(this);
    }

    listItem (list) {
        return <li>{list.data}</li>
    }

    render () {
        const rows = this.props.lists.map(list => listItem.bind(this, list));
        return (
            <ul>{rows}</ul>
        );
    }
}

const lists = [{id:'a', data:'NodeJs'}, {id:'b', data:'React'}, {id:'c', data:'Linux'}, {id:'d', data:'Web'}]
const element = <ToDoList lists={lists}/>;

ReactDOM.render(element, document.querySelector('#root'));
```

## Form-雙向數據綁定

- 使用事件監聽，將視圖數據存到組件狀態
- 可控组件：可變狀態的屬性保存在state中，透過事件監聽調用setState來更新
- 不可控組件：表單的input file元素只可讀
- 處理多個輸入，可以爲每個元素添加name屬性，讓處理函數根據event.target.name來操作

## 狀態提升

## Composition and Inheritance

```js
class FancyBorder extends React.Component {
    constructor (props) {
        super (props);
    }

    componentDidMount () {
        this.props.children.map(element => {
            console.log(element.key, element.props.children)
        })
    }

    render () {
        return (
            <div>{this.props.children}</div>
        );
    }
}

class Dialog extends React.Component {
    constructor (props) {
        super (props);
    }

    render () {
        return (
            // FancyBorder内的DOM元素會以porps.children傳入子组件
            <FancyBorder>
                <h1 key='a'>Welcome</h1>
                <p key='b'>Thank you for visiting our studio</p>
            </FancyBorder>
        );
    }

}
```

## DOM元素的innerHTML

```js
innerHtml = {__html: '<h1>Welcome!!!</h1>'}     // string
<div id="html-show" dangerouslySetInnerHTML={innerHtml}></div>
```

## React Element

React 用JS對象來描述DOM結構的一種數據結構

```js
ReactDOM.render(
    React.createElement('h1',null,['hello']);
)
// ===>
{
    tagName:'h1',
    attr:null,
    children: ['hello']
}
```