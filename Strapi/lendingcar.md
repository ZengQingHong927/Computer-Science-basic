# Strapi
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

## ipStack
藉由ip位置取得定位和目標地距離
url：http://api.ipstack.com/