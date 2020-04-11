# JWT basic
## JWT & Passport & Bearer Token
https://medium.com/front-end-weekly/learn-using-jwt-with-passport-authentication-9761539c4314  
https://www.cnblogs.com/pomelott/p/11026626.html  

### passport 權限驗證  
1. login 使用username, password進行passport local驗證返回token
2. 後面請求api時使用passport bearer token驗證

```js
const passport = require('koa-passport')
const LocalStrategy = require('passport-local').Strategy
const BearerStrategy = require('passport-http-bearer');
const jwt = require ('jsonwebtoken');

const db = require('./models');

passport.use('local', new LocalStrategy(async (username, password, done) => {
        // console.log (` username: ${username}, password: ${password}`);
        const user = await db.users.findOne({name: username});
        const isValid = await user.decryptPassword(password);
        if (!isValid) {
                done({ type: 'username & password', message: 'No such user found' }, false);
                return;
        }
        let token = await jwt.sign (JSON.stringify (user), 'my-jwt-key');
        done(null, token);
}));

passport.use('bearer', new BearerStrategy(async (token, done) => {
        if(!token){
                done(null, false);
        }
        try {
                let decode = await jwt.verify (token, 'my-jwt-key');
                done (null, decode);
        }
        catch (e) {
                console.log ('error token');
                done (null, false, {msg: 'error token'});
        }
}))

passport.serializeUser((user, done) => {
        console.log (` serializer user ${JSON.stringify (user, null, 4)}`);
        done(null, user)
})

passport.deserializeUser(async (user, done) => {
        console.log (` deserializer user ${JSON.stringify (user, null, 4)}`);

        done(null, user)
})

exports.isBearerAuthenticated = function () {
        return passport.authenticate('bearer', {session: false})
}
exports.isLocalAuthenticated = function () {
        return passport.authenticate('local', {session: false})
}


module.exports = passport


app.use(passport.initialize ());
// app.use(passport.session ());

router.post ('/signin', async (ctx, next) => {
        return passport.authenticate('local', {session: false},  (err, token, info, status) => {
                // 封裝權限驗證結果
                if (err) {
                        resobj = {
                                code: 'abc123',
                                msg:err,
                                token,
                        }
                        await next (resobj)
                }
                else {
                        if (token) {
                                resobj = {
                                        code: 'ijk123',
                                        msg:'登录成功',
                                        token
                                }
                                ctx.login(token);
                                await next (resobj);
                        }
                        else {
                                resobj = {
                                        code: 'abc123',
                                        msg:info
                                }
                                await next (resobj)
                        }
                }
        })(ctx)
})




```