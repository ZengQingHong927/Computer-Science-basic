# React-Router-DOM

根組件依據路由動態加載組件
exact path 嚴格匹配（成功匹配第一個後，不會繼續往後匹配）

## 頁面傳值

1. get 傳值, this.props.location.search // http://xxx.xxx.com/xxx?aid=
2. 動態路由, this.props.match.params // http://xxx.xxx.com/xxx/:aid
3. localStorage

```js
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Home from 'Home.js'
import About from 'About.js'
import Topics from 'Topics.js'



class App extends React.Component {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav>

        <Route exact path="/home" component={home}>
        <Route path="/about" component={about}>
        <Route path="/topics" component={topics}>

      </div>
    </Router>
  );
}

```

## 嵌套路由

## 嵌套路由父子組件傳值，路由模塊化
