# Strapi
## 安装问题
清除缓存
npm cache clean --force
全局安装
npm i strapi@alpha -g

strapi
1.npm install strapi@3.0.0-alpha.26.2
2.npm i strapi-hook-mongoose -g
3.mv strapi-hook-mongoose ./strapi (~.nvm/versions/node/v10.16.2/lib/node_modules/strapi)
4.rm -rf 项目里的node_module，npm install
5.http://127.0.0.1:1337/adminpanel/plugins/users-permissions/auth/register

## mongoose hook issue
hook.json timeout-> 30000
package.json
strapi, strapi-hook-mongoose, strapi-provider-upload-aws-s3


strapi is not a function
package.josn strapi/strapi-hook-mongoose/strapi-provider-upload-aws-s3版本一致3.0.0-alpha.26.2
config->hook.json timeout改大一些

stripe
tbyc-wtbx-othq-jfkn-fngy

## API authenticated to user
1. Roles& Permissions -> Authenticated or Public 勾选那些API需要授权那些是无需授权
2. POST /auth/local to get Bearer token
	identifier:'yilin', // username || phoneNumber || email
	password:'test123'
3. Get /users/:id with Bearer token to retrieve user information 

## CRON schedule task
strapi-app/config/function/cron.js

# Error Handler Middleware 
strapi-app/middleware/beforeboom/index.js

## 创建API
1.api->order->controller->Order.js 写好handler
2.api->order->config->routes.json 设定好route method/path/handler
3.启动strapi start -> Plugins -> Roles & Permission -> Order勾选新增的handler -> save

api.fusion
dashboard 
yilin test123

fs.createReadStream(path) // 绝对路径 path.join(__dirname, 'xxx/xxx');
ctx.response.set("content-type","image/jpg")
ctx.body = stream

administrator
User id
NickZeng
5d6894eac8f23854a6e9bc5c

test account
stella
abc123

test account
lucylin
abc123
