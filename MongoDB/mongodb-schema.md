# Mongoose Schema
https://stackoverflow.com/questions/35509611/mongoose-save-array-of-strings

## Schema定義 
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

// 復合索引(compound index)
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
## 在model和instance上自定義方法  

statics是定義在models上
methods是定義在instances上


```js

// define a schema
var animalSchema = new Schema({ name: String, type: String });

// assign a function to the "methods" object of our animalSchema
animalSchema.methods.findSimilarTypes = function (cb) {
  return this.model('Animal').find({ type: this.type }, cb);
}

// Now all of our animal document instances have a findSimilarTypes method available to it.

// assign a function to the "statics" object of our animalSchema
animalSchema.statics.findByName = function (name, cb) {
  return this.find({ name: new RegExp(name, 'i') }, cb);
}

var Animal = mongoose.model('Animal', animalSchema);
Animal.findByName('fido', function (err, animals) {
  console.log(animals);
});

Animal.findByName('fido', function(err, fido){
    // fido => { name: 'fido', type: 'dog' }
    fido.findSimilarTypes(function(err, dogs){
      // dogs => [ {name:'fido',type:'dog} , {name:'sheeba',type:'dog'} ]
  });
});

```