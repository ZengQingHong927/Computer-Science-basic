## basic middleware
https://www.bookstack.cn/read/koa-docs-Zh-CN-v2.7.0/middleware.md
https://www.npmjs.com/package/koa-bearer-token

```js
// 校验路由
 App.use (async function (cox, next) {

	if (ctx.path.startsWith (‘/api/’) || ctx.path.startsWith (‘/entry/’)) {
		await next ();
		return;
	}
})
```