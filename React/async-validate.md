# 表单验证

<https://www.npmjs.com/package/async-validator>

## 基礎使用方式

```js
import schema from 'async-validator';
var descriptor = {
  name: {
    type: "string",
    required: true,
    validator: (rule, value) => value === 'muji',
  },
  age: {
    type: "number",
    asyncValidator: (rule, value) => {
        return new Promise((resolve, reject) => {
          if (value < 18) {
            reject("too young");  // reject with error message
          } else {
            resolve();
          }
        });
      }
  }
};

var validator = new schema(descriptor);

validator.validate({name: "muji"}, (errors, fields) => {
  if(errors) {
    return handleErrors(errors, fields);
  }
});

// PROMISE USAGE
validator.validate({ name: "muji", age: 16 })
        .then(() => {})
        .catch (({ errors, fields }) => {
                return handleErrors(errors, fields);
        })
```
