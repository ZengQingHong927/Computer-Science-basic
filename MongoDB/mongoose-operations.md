# Mongoose CRUD Operations
## 加入時間屬性timestampes
```js
new mongoose.Schema({},{ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt', deletedAt: 'deletedAt'} });
or timestamps: true
```
## 關聯表的索引建立
```js
userId: { type: mongoose.Schema.Types.ObjectId, ref:'User' } // model name
```
## 原子操作
給username屬性更新值為Judy
```js
modelName.updateMany({username: 'Kathy'}, {$set: {username: 'Judy'}});
```
## 給schema添加實例方法
```js
schemaName.methods.encryptPassword = async function () {
  const salt = await bcrypt.genSalt(7);
  this.password = await bcrypt.hash(this.password, salt);
};
```