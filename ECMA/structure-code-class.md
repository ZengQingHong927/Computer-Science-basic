# 模块化代码
## 根据表或特殊功能封装通用函数或常量

```js
'use strict'；

class Books {
        constructure (rawobj) {

        }

        // 不需要实例化就能调用的方法
        static queryById (book_id) {

        }

        // 实体才能调用的方法
        getBookName () {
                return rawObj.book_name;
        }

        //
        get calcQuantities () {

        }
}

Books.kTypeComic        = 1000;
Books.kTypeThriller     = 2000;
Books.kTypeDetective    = 3000;
```