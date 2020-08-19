# Mongoose CRUD Operations

遠端連線mongodb
<https://jasonwatmore.com/post/2020/02/05/connect-to-remote-mongodb-on-aws-ec2-simply-and-securely-via-ssh-tunnel>

## Mongoose建立連線

- mongoose.connect(uri(s),
  [options],
  [options.useMongoClient],
  [callback])返回一個MongooseThenable對象，定義schema生成model操作數據

example:

```js
  var URL = 'mongodb://localhost:27017/test3';

  mongoose.connect(URL,function(err){
    if(err){
      console.warn('connection fail：'+err);
    }else {
      console.log('connection success：'+URL);
    }
  });
```

- mongoose.createConnection(
  [uri],
  [options],
  [options.config],
  [options.config.autoIndex],
  [options.useMongoClient]
)
返回一個Connection對象。
Connection對象中包含model，collection，dropDatabase等操作數據庫的方法，也包含connected，disconnected，error等事件觸發方法，但是没有Schema

example:

```js
  var mongoose = require('mongoose');
  var URL = 'mongodb://localhost:27017/test2';

  // 只是創建了一個Connection對象，能夠操作數據庫，但是不能操作具體的document
  var db = mongoose.createConnection(URL);

  db.on('connected',function(err){
  if(err){
      console.warn('connection fail：'+err);
    }else {
      console.log('connection success：'+URL);
    }
  });
```

- mongoose.connection是mongoose模塊的默認引用，返回一個Connetion對象。因爲connect()方法并不能監聽數據庫連接情况，一般情况與connet()方法搭配使用
example:

```js
  mongoose.connect(URL);

  var db = mongoose.connection;//获取connection实例
  //使用Connetion监听连接状态
  db.on('connected',function(err){
    if(err){
        console.log('连接数据库失败：'+err);
    }else{
        console.log('连接数据库成功！');
    }
  });

  var userSchema = new Schema({
    name:String,
    date:Date
  });
  var User = mongoose.model('usert',userSchema);//默认表名：userts

  var userm = new User({
    name:'yanghao',
    date:new Date()
  });
```

## 加入時間屬性timestampes

```js
new mongoose.Schema({},{
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt'
  }
});
// or timestamps: true
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

## insert non-duplciate doc 避免插入重复数据

<https://stackoverflow.com/questions/24122981/how-to-stop-insertion-of-duplicate-documents-in-a-mongodb-collection>

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
          condition.exSellPrice = {
            $gte: Number(condition.exSellPrice.split('-')[0]),
            $lte: Number(condition.exSellPrice.split('-')[1])
          };
        }

        if (condition.exRentalPrice) {
          condition.exRentalPrice = {
            $gte: Number(condition.exRentalPrice.split('-')[0]),
            $lte: Number(condition.exRentalPrice.split('-')[1])
          };
        }

        if (condition.exYear) {
          condition.exYear = {
            $gte: Number(condition.exYear.split('-')[0]),
            $lte: Number(condition.exYear.split('-')[1])
          };
        }

        switch (search.exTradeType) {
            case 'lease': {
                sort.exRentalPrice =
                search.sortPrice ? Number(search.sortPrice) : -1;
            }
                break;
            case 'sell': {
                sort.exSellPrice =
                search.sortPrice ? Number(search.sortPrice) : -1;
            }
                break;
            default: {
                sort = { exSellPrice: -1, exRentalPrice: -1, exYear: -1 };
            }
                break;
        }

        sort.exYear =
        search.sortYear ? Number(search.sortYear) : -1;

        const instances = await Excar.aggregate([
            { '$match': condition },
            { '$sort': sort }
        ]);

        return ctx.body = instances;
    }
```

## 時間區間搜索

```js
{ $match: {
    refereeCode: user.profile.refId,
    createdAt: { $gt: firstDay, $lt: lastDay } } }, // Date object
```

## 排序

```js
modelName.find().sort({field: 1}) // 升序，-1降序
```

## 模糊匹配

<https://docs.mongodb.com/manual/reference/operator/query/or/>
<https://www.cnblogs.com/coolslider/p/7832083.html>
<https://stackoverflow.com/questions/35321004/mongodb-query-in-with-regex-array-of-element>

```js
modelName.find({name: /reg/ })

let     query   = {$or: []};
text.split (' ').forEach (kw => {
        let     re   = new RegExp (kw, 'i');

        query.$or.push ({field1: {$regex: re}});
        query.$or.push ({field2: {$regex: re}});
});

db.collection.find(query);

```

## 聚合查詢

```js
modelName.find().count()
modelName.aggregate({
  $group: {
    _id: 'fieldName',
    sumScroe:{$sum:'$score'
  }
}})
// or {$avg:'$score'}
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

<https://stackoverflow.com/questions/36019713/mongodb-nested-lookup-with-3-levels>

- aggregate operation
- $project 增加，刪除，重命名字段
- $match 條件匹配
- $limit 限制結果的數量
- $skip 跳過文檔的數量
- $sort 條件排序
- $group 條件組合結果
- $lookup 用以引入其他集合的數據

```js
modelName.aggregate([
  {
    { '$match': {
        'refereeCode': refId,
        '$or':[ { 'level': 'basic' }, { 'level': 'register' } ],
        'createdAt': { '$gt': date }
      }
    }, // date必須為Date instance
    {'$group': {
      '_id': '$type',
      'total': { '$sum': '$amount'},
      'count': { '$sum': 1 }
    }},
    { '$count': 'total' },
    { '$lookup':{
      'from': 'modelName',
      'localField': 'fieldName',
      'foreignField': 'fieldName',
      'as': 'field to present'
    }},
    {'$lookup':{
      'from': 'users',
      'localField': 'user',
      'foreignField': '_id',
      'as': 'userinfo'
    }},
    {'$unwind': '$userinfo'}, // 將數組壓平
    {'$lookup':{
            'from': 'memberships',
            'localField': 'userinfo.membership',
            'foreignField': '_id',
            'as': 'memberinfo'
    }},
    {'$unwind': '$memberinfo'},
    { '$project': { 'fieldName.fieldName': 1, 'createdAt':1,'_id':0 }}
])
```

## 時間處理

```js
// Use ObjectId data type to parse id to do aggregate query
const ObjectId = mongoose.Types.ObjectId;
const User = mongoose.model('User')

User.aggregate([
  {
    { $match: {
        amount: {$lte: 300},
        status: req.query.status
      }
    },
    { $group : {
        _id: '$status',
        total: { $sum: '$amount' }}}
    $match: {
      _id: ObjectId('560c24b853b558856ef193a3'),
      status: req.query.status
    }
  }
])
```

```js
// date comparison
const date = moment(req.query.startDate)
  .format();
const instance = await CommissionRecord
  .find({ startDate: { $gte: date } });
```

```js
// format date and date comparison
instance.endDate = moment(instance.endDate)
  .valueOf() + 365 * 24 * 60 * 60 * 1000;
console.log(moment(Date.now()+5*365*24*60*60*1000)
  .isBetween(instance.startDate, instance.endDate));
```

## 時間偏移

```js
const condition = moment()
  .substract(spacing, 'months')
  .format('YYYY-MM-DDTHH:mm:ss.SSS');
const date = new Date(condition)
```

## 查找更新返回新數據

```js
const instance = await Exfavorite
  .findOneAndUpdate(filter, update, {new: true});
```

## Nested Populate

url <http://frontendcollisionblog.com/mongodb/2016/01/24/mongoose-populate.html>
url <https://github.com/strapi/strapi/issues/877>

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

<https://stackoverflow.com/questions/51228059/mongo-db-4-0-transactions-with-mongoose-nodejs-express>
<https://medium.com/@radheyg11/mongodb-transaction-with-node-js-b81618bebae8>

## 更新Embedded Document field

<https://dba.stackexchange.com/questions/157149/how-can-i-update-a-single-field-in-an-array-of-embedded-documents/157162>
<https://docs.mongodb.com/manual/reference/operator/update/set/>

```js
// original document
{
  _id: 100,
  sku: "abc123",
  quantity: 250,
  instock: true,
  reorder: false,
  details: { model: "14Q2", make: "xyz" },
  tags: [ "apparel", "clothing" ],
  ratings: [ { by: "ijk", rating: 4 } ]
}

db.products.update(
   { _id: 100 },
   { $set:
      {
        quantity: 500,
        details: { model: "14Q3", make: "xyz" },
        tags: [ "coats", "outerwear", "clothing" ]
      }
   }
)

db.products.update(
   { _id: 100 },
   { $set: { "details.make": "zzz" } }
)

db.products.update(
   { _id: 100 },
   { $set:
      {
        "tags.1": "rain gear",
        "ratings.0.rating": 2
      }
   }
)
```

## Conditional query documents with multi-fields exists

<https://stackoverflow.com/questions/38320003/mongodb-checking-to-see-if-multiple-fields-exist-in-a-collection>n>

```js
db.collection.find({
  $and : [
    { userId: { $exists: true } },
    { artId : { $exists: true } }
  ]
})

db.collection.find({
  $or : [
    { userId: { $exists: true } },
    { artId : { $exists: true } }
  ]
})
```

1. update an array value in the specific field

```js
{
   _id: 1,
   fruits: [ "apples", "pears", "oranges", "grapes", "bananas" ],
   vegetables: [ "carrots", "celery", "squash", "carrots" ]
}
{
   _id: 2,
   fruits: [ "plums", "kiwis", "oranges", "bananas", "apples" ],
   vegetables: [ "broccoli", "zucchini", "carrots", "onions" ]
}

db.stores.update(
    { },
    { $pull: {
        fruits: {
          $in: [ "apples", "oranges" ]
        },
        vegetables: "carrots" } },
    { multi: true }
)

{
  "_id" : 1,
  "fruits" : [ "pears", "grapes", "bananas" ],
  "vegetables" : [ "celery", "squash" ]
}
{
  "_id" : 2,
  "fruits" : [ "plums", "kiwis", "bananas" ],
  "vegetables" : [ "broccoli", "zucchini", "onions" ]
}

```

```js
db.collection.findOneAndUpdate(
   <filter>,
   <update document or aggregation pipeline>,
   {
     projection: <document>,
     sort: <document>,
     maxTimeMS: <number>,
     upsert: <boolean>,
     returnNewDocument: <boolean>,
     collation: <document>,
     arrayFilters: [ <filterdocument1>, ... ]
   }
)

filter: { "name" : "A.B. Abracus" },
update: {
  $set: {
    "name" : "A.B. Abracus", "assignment" : 5
  },
  $inc : { "points" : 5 } },
options: {
  sort: { "points" : 1 },
  upsert: true,
  returnNewDocument : true
}

filter: The same query selector as in find() operation

```

## 删除字段

```js
Account.update (
  {"priviledges5":{$exists: true}},
  {$unset: {"priviledges5": ""}},
  false,
  true)
```

## 聚合查询增加临时字段

```js
YMAccount.aggregateP ([
  {$match: query},
  {$addFields: {
          priviledges4Length:     {$size: '$priviledges4'}}},
  {$sort: {
          priviledges4Length:     -1
  }},
  {$skip: limit * pageidx},
  {$limit: limit}
]);
```

```js
findManyByDateRangeAndName (name, start, end, options, ...rest) {
 options             = options || {};
 options.sort        = {date: -1};

 let     query       = {
  name,
  date:       {$gte: start, $lt: end}
 };
// return super.findMany2P (query, options, ...rest);
}

```

## 查询并更新 findOneAndUpdate

appends each element of [ 90, 92, 85 ] to the scores array and select last 3 items in scores array

```js
  var query  = {name: 'klimt'}
  var update = {
    $set: {
      name: 'jason bourne'
    },
    $push: {
      scores: {
        $each: [ 90, 92, 85 ],
        $slice: -3
      }
    }
  };
  Model.findOneAndUpdate(query, update, options, callback)
```

## 查詢並更新 findOneAndUpdate (寫入數組對象)

判断mgr_accounts字段是否存在，存在并且数组对象的account_id不重复，符合条件的doc会被找出来，并在mgr_accounts字段写入更新

```js
let     query   = {
        dpid,
        $or:    [{mgr_accounts: {$elemMatch: {account_id: {$ne: member_id}}}}, {mgr_accounts: {$exists: false}}]
};

if (typeof account_id !== 'undefined') {
        query.$or.push ({account_id});
        query.$or.push ({mgr_accounts: {$elemMatch: {account_id}}});
}

let     update          = {
        $push:  {mgr_accounts: {account_id: member_id, account_name: member_name, account_email: member_email, biz_priviledges: []}}
};

findOneAndUpdate (query, update)

```

## 查詢並更新 findOneAndUpdate (刪除數組對象)

判斷mgr_accounts字段是否存在，存在並且數組對象的account_id存在，符合條件的doc會被找出来，並在mgr_accounts字段寫入更新

```js
let     query           = {
        spid,
        $or:    [{mgr_accounts: {$elemMatch: {account_id: {$eq: member_id}}}}]
};

if (typeof account_id !== 'undefined') {
        query.$or.push ({account_id});
        query.$or.push ({mgr_accounts: {$elemMatch: {account_id}}})
}

let     update          = {
        $pull:  {mgr_accounts: {account_id: member_id}}
};

findOneAndUpdate (query, update)
```

## 隨機查詢document
<https://stackoverflow.com/questions/52651723/mongo-find-a-random-document>
以下例子：
    找出匹配type=1000的documents，在多個documents中返回隨機1個樣本

```js
Model.aggregate([
  {$match: {type: 1000}},
  {$sample: {size: 1}}
])


```

## Two phase commit

<https://docs.mongodb.com/v3.4/tutorial/perform-two-phase-commits/>
<http://learnmongodbthehardway.com/article/transactions/>
<https://github.com/mongodb/node-mongodb-native/releases/tag/v3.2.1>
<https://docs.mongodb.com/manual/core/transactions-in-applications/>

## MongoDB Design

```js

var fs              = require ('fs');
var path            = require ('path');
var mongodb         = require ('mongodb');
// var config      = require ('../config/config');

var configMongoDB   = {
        ObjectID:               mongodb.ObjectID,
        Long:                   mongodb.Long,
        // mongocfg.mongo_url  = config.mongo_url;

        client:                 undefined,
        db:                     undefined,

        client2:                undefined,
        db2:                    undefined,
};


var connectDB   = async function () {

        console.log ('mongocfg.connect ()');

        if (config.mongo_url && config.mongo_dbname) {
                let     client      = await mongodb.MongoClient.connect (config.mongo_url, {
                        useNewUrlParser:        true,
                        useUnifiedTopology:     true,
                        poolSize:               50
                });

                let     db          = client.db (config.mongo_dbname);
                configMongoDB.client     = client;
                configMongoDB.db         = db;
        }


        if (config.mongo_url2 && config.mongo_dbname2) {
                console.log (`- url2 configured`);
                let     client2     =
                await mongodb.MongoClient.connect (config.mongo_url2, {
                        useNewUrlParser:        true,
                        useUnifiedTopology:     true,
                        poolSize:               50
                });
                let     db2         = client2.db (config.mongo_dbname2);

                configMongoDB.client2    = client2;
                configMongoDB.db2        = db2;
        }


        if (0) {
                let     dirs    = [
                        path.join (__dirname, '../mongoose_schemma'),
                ];

                for (let dir of dirs) {
                        let     files   = await fs.promises.readdir (dir);
                        files.forEach (async (file) => {
                                if (file.search (/^.*.js$/) !== -1 && file !== 'base.class') {
                                        // console.log (`- routefile: ${file}`);
                                        let     model   = require (`${dir}/` + file);
                                        await model.init ();
                                }
                        });
                }

        }
};

var closeDBA     = async function ()
{
        console.log (`- mongodb close ()`);
        if (configMongoDB.client) {
                await configMongoDB.client.close ();
                delete configMongoDB.client;
        }

        if (configMongoDB.client2) {
                await configMongoDB.client2.close ();
                delete configMongoDB.client;
        }
};

```

<http://mongodb.github.io/node-mongodb-native/3.1/api/MongoClient.html>
<https://stackoverflow.com/questions/48411897/severe-performance-drop-with-mongodb-change-streams>
<https://github.com/mongodb/node-mongodb-native/releases/tag/v3.2.1>
<https://jira.mongodb.org/browse/SERVER-32946>
<https://thecodebarbarian.com/slow-trains-in-mongodb-and-nodejs>
<https://blog.csdn.net/newCheng/article/details/102943976>

遠程連線EC2mongodb
<https://jasonwatmore.com/post/2020/02/05/connect-to-remote-mongodb-on-aws-ec2-simply-and-securely-via-ssh-tunnel>
