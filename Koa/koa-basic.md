# Koa basic
## koa-body & koa-multer
url http://www.ptbird.cn/koa-body.html

## Error handler
```js
module.exports = strapi => {
  return {
    // can also be async
    initialize(cb) {
      console.info('before boom middleware initialize')
      strapi.app.use(async (ctx, next) => {
        try {
          await next();
        } catch (error) {
          console.info('before boom', error)
          if (typeof error == 'string') {
            return ctx.badRequest(error);
          }
          else {
            if (/pro/i.test(strapi.config.environment)) {
              // pass to boom middleware
              throw error;
            }
            else {
              console.error(error);
              ctx.status = 500;
              ctx.body = {
                message: error.message,
                statusCode: 500,
                error: "Internal Server Error",
                stack: error.stack
              }
            }
          }
        }
      });
      cb();
    },
  };
};
```