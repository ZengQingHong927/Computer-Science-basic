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
modelName.updateMany({username: 'Kathy'}, {$set: {username: 'Judy', age: 30, title: 'CTO'}});
```
## 給schema添加實例方法
```js
schemaName.methods.encryptPassword = async function () {
  const salt = await bcrypt.genSalt(7);
  this.password = await bcrypt.hash(this.password, salt);
};
```
## 時間資料形態
MongoDB 數據類型為時間對象 Date Object，存儲時，將時間字符串轉換成時間對象
直接用unix time赋值，取值时为GMT+00:00时间格式，moment().valueOf()，转换回unix time
## 关联查询
```js
modelName.findById(_id)
  .populate('modelName',['field','field'...])
```
## update and findOneAndUpdate
需要返回更新後的數據用findOneAndUpdate
update只返回更新的結果，不返回數據
## 分頁查尋
找出全部跳過10個返回4筆數據
```js
modelName.find().skip(10).limit(4)
```
## Filter Query
```js
    filterQuery: async (ctx) => {
        let search = qs.parse(ctx.querystring);
        let condition = _.omit(search, ['sortYear', 'sortPrice']);
        
        // sort order exSellPrice, exRentalPrice, exYear
        let sort = {};

        if (condition.exSellPrice) {
            condition.exSellPrice = { $gte: Number(condition.exSellPrice.split('-')[0]), $lte: Number(condition.exSellPrice.split('-')[1]) };
        }

        if (condition.exRentalPrice) {
            condition.exRentalPrice = { $gte: Number(condition.exRentalPrice.split('-')[0]), $lte: Number(condition.exRentalPrice.split('-')[1]) };
        }

        if (condition.exYear) {
            condition.exYear = { $gte: Number(condition.exYear.split('-')[0]), $lte: Number(condition.exYear.split('-')[1]) };
        }

        switch (search.exTradeType) {
            case 'lease': {
                sort.exRentalPrice = search.sortPrice ? Number(search.sortPrice) : -1;
            }
                break;
            case 'sell': {
                sort.exSellPrice = search.sortPrice ? Number(search.sortPrice) : -1;
            }
                break;
            default: {
                sort = { exSellPrice: -1, exRentalPrice: -1, exYear: -1 };
            }
                break;
        }

        sort.exYear = search.sortYear ? Number(search.sortYear) : -1;

        const instances = await Excar.aggregate([
            { '$match': condition },
            { '$sort': sort }
        ]);

        return ctx.body = instances;
    }
```
## 時間區間搜索
```js
{ $match: { refereeCode: user.profile.refId, createdAt: { $gt: firstDay, $lt: lastDay } } }, // Date object
```
## 排序
```js
modelName.find().sort({field: 1}) // 升序，-1降序
```
## 模糊匹配
```js
modelName.find({name: /reg/ })
```
## 聚合查詢
```js
modelName.find().count()
modelName.aggregate({$group: {_id: 'fieldName', sumScroe:{$sum:'$score'}}}) //{$avg:'$score'}
```
## 字段类型为数组（添加）
```js
PersonModel.update(
    { _id: person._id }, 
    { $push: { friends: friend } },
    done
);
```
## 字段类型为数组（刪除）
```js
PersonModel.update(
    { _id: person._id }, 
    { $pull: { projectId: { $in: user.projectId }} },
    done
);
```
## 聯合查詢
aggregate operation
$project 增加，刪除，重命名字段
$match 條件匹配
$limit 限制結果的數量
$skip 跳過文檔的數量
$sort 條件排序
$group 條件組合結果
$lookup 用以引入其他集合的數據
```js
modelName.aggregate([
  {
    { '$match': { 'refereeCode': refId, '$or':[ { 'level': 'basic' }, { 'level': 'register' } ], 'createdAt': { '$gt': date } } }, // date必須為Date instance
    {'$group': { '_id': '$type', 'total': {'$sum': '$amount'}, 'count': { '$sum': 1 }}},
    { '$count': 'total' },
    { '$lookup':{
      'from': 'modelName',
      'localField': 'fieldName',
      'foreignField': 'fieldName',
      'as': 'field to present' 
    }
  },{
    '$lookup':{
      'from': 'modelName',
      'localField': 'fieldName',
      'foreignField': 'fieldName',
      'as': 'field to present' 
    },
    {'$lookup':{
      'from': 'users',
      'localField': 'user',
      'foreignField': '_id',
      'as': 'info'
    }}
  },{
    '$project': { 'fieldName.fieldName': 1, 'createdAt':1,'_id':0 },
  }
])
```
## 時間處理
```js
// Use ObjectId data type to parse id to do aggregate query
const ObjectId = mongoose.Types.ObjectId;
const User = mongoose.model('User')

User.aggregate([
  {
    // { $match: { amount: {$lte: 300}, status: req.query.status } },
    // { $group : { _id: '$status', total: { $sum: '$amount' }}}
    $match: { _id: ObjectId('560c24b853b558856ef193a3'), status: req.query.status }
  }
])
```
```js
// date comparison
const date = moment(req.query.startDate).format();
const instance = await CommissionRecord.find({ startDate: { $gte: date } });
```
```js
// format date and date comparison
instance.endDate = moment(instance.endDate).valueOf() + 365 * 24 * 60 * 60 * 1000;
console.log(moment(Date.now()+5*365*24*60*60*1000).isBetween(instance.startDate, instance.endDate));
```
## 時間偏移
```js
const condition = moment().substract(spacing, 'months').format('YYYY-MM-DDTHH:mm:ss.SSS');
const date = new Date(condition)
```
## 查找更新返回新數據
```js
const instance = await Exfavorite.findOneAndUpdate(filter, update, {new: true});
```
## Nested Populate
url http://frontendcollisionblog.com/mongodb/2016/01/24/mongoose-populate.html
url https://github.com/strapi/strapi/issues/877
```js
const instance = await Exfavorite.findById(user.exFavorites._id)
      .populate({ path: 'exCars', populate: [
        { path: 'exRearImg' },
        { path: 'exFrontImg' },
        { path: 'exSideImg' },
        { path: 'exTrunkImg' },
        { path: 'exInteriorImg' },
        { path: 'exMileageImg' },
        { path: 'exOtherImg1' },
        { path: 'exOtherImg2' },
        { path: 'exOtherImg3' },
        { path: 'exOtherImg4' },
        { path: 'exOtherImg5' },
        { path: 'exInsuranceImg' }
      ] });
```
## Transaction
utl https://stackoverflow.com/questions/51228059/mongo-db-4-0-transactions-with-mongoose-nodejs-express
url https://medium.com/@radheyg11/mongodb-transaction-with-node-js-b81618bebae8