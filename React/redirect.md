# React Router Redirect

路由跳轉（登入 or 搜尋）
ref: https://reacttraining.com/react-router/web/example/auth-workflow
組件狀態改變會執行重新渲染

1. import Redirect
2. 定義 loginFlag
3. 判斷 loginFlag
4. 執行 Redirect 跳轉

```js
import { Redirect } from 'react-dom-router';

this.state = {
  loginFlag: false
}

doLogin (e) {

  e.preventDefault ();
  let username = this.refs.username.value;
  let password = this.refs.password.value;

  if (username === 'admin' && password === 'abc123') {
    this.setState ({loginFlage: true});
  }
  else {
    console.log ('Auth fail')
  }
}
render () {
  if ( this.state.loginFlag) {
    return <Redirect tp = {{pathName: '/'}} />
  }

  return (
    <div>Login Page
      <form onSubmit={this.doLogin} onChange={Changehandler}>
         <input type='text' ref='username' value={this.state.username} />
         <input type='text' ref='password' value={this.state.password} />
         <button type='submit'>Login</button>
      </form>
    </div>

  )
}


```
