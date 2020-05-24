# React-Router-DOM

## react-router-dom BrowserRouter 無法跳轉問題

<https://blog.csdn.net/N_Lucifer/article/details/86547943>

BrowserRouter是使用了H5的api, 如果使用了BrowserRouter一旦路徑改變，那麼瀏覽器就會去請求服務端，但是這個路徑根本不存在的所有頁面就會顯示404，而使用hashHistory那麼我们的路徑中就會增加一個#，這個#號後面的路徑改變後是不會再去請求後臺服務器。
如果做服務端渲染建議使用BrowserHistory, 而開發階段可以在webpack devServer中配置historyApiFallback: true，
否則還是建議用hashHistory

根組件依據路由動態加載組件
exact path 嚴格匹配（成功匹配第一個後，不會繼續往後匹配）

## 頁面跳轉

1. DOM跳轉 route 指定主件，Link改變url跳轉，ex: window.location.href = 'http://xxx.xxx.xxx'
2. API跳轉 history.push () , history.goBack()

## 頁面傳值

1. get傳值, this.props.location.search ex:'http://xxx.xxx.com/xxx?aid='
2. 動態路由, this.props.match.params ex:'http://xxx.xxx.com/xxx/:aid'
3. localStorage
4. state傳參

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

```js
const routes = [
    {
        path: '/',
        exact: true,
        component: () => <Redirect to="/presentation" />
    },
    {
        path: '/auth',
        component: AuthLayout,
        routes: [
            {
                path: '/auth/login',
                exact: true,
                component: lazy(() => import('views/Login'))
            },
            {
                path: '/auth/register',
                exact: true,
                component: lazy(() => import('views/Register'))
            },
            {
                component: () => <Redirect to="/errors/error-404" />
            }
        ]
    },
    {
        path: '/errors',
        component: ErrorLayout,
        routes: [
            {
                path: '/errors/error-401',
                exact: true,
                component: lazy(() => import('views/Error401'))
            },
            {
                path: '/errors/error-404',
                exact: true,
                component: lazy(() => import('views/Error404'))
            },
            {
                path: '/errors/error-500',
                exact: true,
                component: lazy(() => import('views/Error500'))
            },
            {
                component: () => <Redirect to="/errors/error-404" />
            }
        ]
    },
```

## 嵌套路由父子組件傳值，路由模塊化

```js
import { renderRoutes } from 'react-router-config';
import { Router } from 'react-router-dom';

<Router>
  {renderRoutes(routes)}
</Router>


const routes = [
  {
    path: '/',
    exact: true,
    component: () => <Redirect to="/presentation" />
  },
  {
    path: '/auth',
    component: AuthLayout,
    routes: [
      {
        path: '/auth/login',
        exact: true,
        component: lazy(() => import('views/Login'))
      },
      {
        path: '/auth/register',
        exact: true,
        component: lazy(() => import('views/Register'))
      },
      {
        component: () => <Redirect to="/errors/error-404" />
      }
    ]
  },
  {
    path: '/errors',
    component: ErrorLayout,
    routes: [
      {
        path: '/errors/error-401',
        exact: true,
        component: lazy(() => import('views/Error401'))
      },
      {
        path: '/errors/error-404',
        exact: true,
        component: lazy(() => import('views/Error404'))
      },
      {
        path: '/errors/error-500',
        exact: true,
        component: lazy(() => import('views/Error500'))
      },
      {
        component: () => <Redirect to="/errors/error-404" />
      }
    ]
  },
  {
    route: '*',
    component: DashboardLayout,
    routes: [
      {
        path: '/calendar',
        exact: true,
        component: lazy(() => import('views/Calendar'))
      },
      {
        path: '/changelog',
        exact: true,
        component: lazy(() => import('views/Changelog'))
      },
      {
        path: '/chat',
        exact: true,
        component: lazy(() => import('views/Chat'))
      },
      {
        path: '/chat/:id',
        exact: true,
        component: lazy(() => import('views/Chat'))
      },
      {
        path: '/getting-started',
        exact: true,
        component: lazy(() => import('views/GettingStarted'))
      },
      {
        component: () => <Redirect to="/errors/error-404" />
      }
    ]
  }
];
```
