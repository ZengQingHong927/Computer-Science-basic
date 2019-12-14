# Mongoose Schema

```js
let autoIncrement = require ('mongoose-auto-increment-fix);

let accountSchema = new mongoose.Schema ({
  id:			{ type: Number },
  typeId:		{ type: Number, default: 0, min: 0, max: 3 },
  name:			{ type: String, trim: true },
  password:		{ type: String, trim: true },
  nickname:		{ type: String, trim: true },
  gender:		{ type: Boolean },
  avatar:		{ type: String, trim: true },
  status:		{ type: Number, default: 1, min: 0, max: 3 },
  registerTime:		{ type: Date, default: Date.now() },
  lastLoginTime:	{ type: Date, default: Date.now() },
  lastLoginIP:		{ type: Date, trim: true },
  idCard:		{ type: String, default: '', index: true },
  newAccount:		{ type: Boolean, default: true },
});

accountSchema.index({ name: 1 }, {unique: 1});
accountSchema.index({ id: 1 }, {unique: 1});

accountSchema.plugin(autoIncrement.plugin, {
	model: 'pf_account',
	field: 'id',
	startAt: 10000,
	incrementBy: 1
});

module.exports.accountModel = mongoose.model ('pf_account', accountSchema);
```
