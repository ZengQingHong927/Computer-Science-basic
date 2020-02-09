# App Configuration
## timestamp
require ('console-stamp') (console, {pattern: 'yyyy/mm/dd HH:MM:ss.l'})
## logger
app.use (require('koa-logger'))
## cors
koa2-cors
app.use (cors({
        maxAge: 24 * 60 * 60 * 1000
        credentials: true,
        methods: 'GET, POST, PUT, DELETE, HEAD, OPTIONS'
        headers: 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
}))
## koa-session2
https://www.itread01.com/p/1000466.html
https://www.colabug.com/2018/0927/4714341/
var session2 = require ('koa-session2');
var Store = require ('koa-session2').Store;

app.use (session2 ({
        store: new MongoSessionStore
}))

```js
// 改寫session.store
class MongoSessionStore extends Store {
        constructor () {
                super ();
        }

        async get (sid, ctx) {
                try {
                        // 根據sid找到session並更新adate
                        let session_ro = await KSSession.findOneAndUpsert ({sid}, {$set: {adate: new Date()}})
                        return session_ro;
                }
                catch (e) {}
        }

        async set (session, opts, ctx) {
                let _id = session.sid;

                if (session.regen_sid || session.delete_sid) {
                        if (opts.sid) {
                                try {
                                        await KSSession.findOneAndDeleteP ({sid: opts.sid});
                                }
                                catch (e) {}
                        }

                        _id = session.regen_sid;
                }

                if (_id) {
                        let session_upsertobj = {
                                date: new Date (),
                                account_id: session.account_id,
                                user_id: session.user_id
                        };

                        await KSSession.findOneAndUpsert2P ({sid: _id}, session_upsertobj, {$set: {adate: new Date ()}}, {upsert: true})
                }

                return _id;
        }

        async destory (sid, ctx) {
                try {
                        await KSSession.findOneAndDeleteP ({sid});
                }
                catch (e) {}
        }
}
```

## compress
koa-compress
app.use (compress ({
        filter: function () {
                let compressible = /application\/json/i.test (content_type);
                return compressible;
        },
        threshold: 2048,
        flush: require(zlib).Z_SYNC_FLUSH
}))
## body-parser
koa-bodyparser
parse text/xml type body as a text string
app.use (bodyParser ({
        extendTypes: {
                text: ['text/xml', 'application/xml', 'text/html']
        },
        enableTypes: ['json', 'form', 'text']
}))