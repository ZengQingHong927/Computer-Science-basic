# Strapi
## 车价查询
https://www.truecar.com/trade/#
https://www.autodna.com/vin/4JGBB8GB7AA541983

## Upload file and Create model
```js
	// 創建的modelName
	const {model} = ctx.params;
	// 上傳的文件和字段
	const {files, fields} = ctx.request.body;
	// strapi model 找尋model實例
	const instance = strapi.models[model];
	// model 實例的字段（屬性，fields）
	console.log(instance.attributes)
	// 創建model實例
	const entry = await strapi.models[model].create(fields);
	
    // 檢查是否上上傳文件的handler並且files長度>0（有文件上傳）
    if (strapi.plugins.upload && Object.keys(files).length > 0) {
      // Upload new files and attach them to this entity.
      const instance = await strapi.plugins.upload.services.upload.uploadToEntity({
        id: entry.id || entry._id,	// model實例的id
        model: model				// model name
      }, files, '');				// files 上傳的文件
      console.log(instance);
    }

    return ctx.body = 'model';
```
## invoke /upload
ctx.request.body = { 
  files: uploading file
  field: {
    refId: The ID of entity whick the file will be linked to
    field: The field name of the entity which the file will be linked to
    ref: The name of the model which the file will be linked to
  }
}

## strapi.service
```js
  const relations = _.pick(values, Exfavorite.associations.map(a => a.alias));
  const data = _.omit(values, Exfavorite.associations.map(a => a.alias));
  console.log(Exfavorite.associations);

// exmaple
  [
    {
      alias: 'exUser',
      type: 'model',
      model: 'user',
      via: 'exFavorites',
      nature: 'oneToOne',
      autoPopulate: true,
      dominant: true,
      plugin: 'users-permissions',
      filter: undefined
    },
    {
      alias: 'exCars',
      type: 'collection',
      collection: 'excar',
      via: 'exFavorites',
      nature: 'manyToMany',
      autoPopulate: true,
      dominant: true,
      plugin: undefined,
      filter: undefined
    }
  ]
```
## ipStack
藉由ip位置取得定位和目標地距離
url：http://api.ipstack.com/