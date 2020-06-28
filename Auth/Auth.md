# Auth implement

```js
function checkSession (session) {
                if (!session || !session.account_id) {
                        throw new Consts.YMError (Consts.kBillingErrorNotLoggedIn, `no session or account_id in session, session: ${JSON.stringify (session)}`);
                }
        }

// 权限校验
checkSession (ctx.session)
let     account     = await YMAccount.findOneById2P (ctx.session.account_id);
if (!account.is_admin)  throw new Consts.YMError (Consts.kBillingErrorNotLoggedIn);


// Login

try {
	let	email	= ctx.request.body.email;
	let	password_md5	= ctx.request.body.password_md5

	if (!email || password_md5) throw error;


	// findOneByEmailAndPassword (email, password_md5)
	// update account.adate

	ctx.session.account_id	=	account._id;
	ctx.session.regen_sid	=       crypto.randomByte(24).toString(‘hex’)

	let resjosn = {
		status: 200,
 		user:account,
		sid: ctx.session.regen_sid
	}

	ctx.response.body= resjson

}
Catch {}


// Logout

try {
                console.log ('ctx.session: ' + JSON.stringify (ctx.session));

                // 删除session
                delete ctx.session.sid;
                ctx.session.delete_sid      = true;

                let     resjson         = {
                        status:     Consts.kBillingSuccess,
                };
                ctx.response.body  = resjson;
        }
catch (err) {}
```