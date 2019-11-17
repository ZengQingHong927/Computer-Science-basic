# React Basic
## 生命週期
1. constructor()中初始化組件內部的資料
2. 使用rendor()在網頁輸出組件內容
3. 輸出組件內容後會執行componentDidMount()一次調用
4. 當組件內部state被修改時，執行componentDidUpdate()
5. 當組件被移出時會執行調用一次componentWillUnmount()
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
每个React element是唯一不可变的。唯一改变的方法，就是创造一个新的React element，并且React在创建新组件时，会比较之前的组件，只更新不一样的地方
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
将组件做阶层规划，一个大组件拆分成多个小组件
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
componentDiMount: 组件输出后立即调用的函数
componentWillUpdate： 组件更新后立即调用的函数
componentWillUnmount: 组件被移除后立即调用的函数
使用setState来改变组件状态state
可以透过props，将属性值层层传递给自己的子组件
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
## 事件处理函数
使用event.preventDefault()阻止提交订单开启新页面。
使用{函数名称}作事件监听
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
## 条件渲染组件
logical statement
if-else, conditional, inline if with logical && operator
阻止组件被渲染，將组件return null即可
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
## Form-双向数据绑定
- 使用事件监听，讲视图数据写到组件状态
- 可控组件：可变状态的属性保存在state中，透过事件监听调用setState来更新
- 不可控组件：表单的input file元素只可读
- 处理多个输入，可以为每个元素添加name属性，让处理函数根据event.target.name来操作
## 状态提升
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
            // FancyBorder 内的DOM元素会以porps.children传入子组件
            <FancyBorder>
                <h1 key='a'>Welcome</h1>
                <p key='b'>Thank you for visiting our studio</p>
            </FancyBorder>
        );
    }

}
```
## 綁定數據
## 綁定對象
## 綁定屬性
