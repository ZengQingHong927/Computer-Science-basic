# Calendar Schema

```js
        static schema () {
                return {
                        _id:                    mongocfg.ObjectID,

                        date:                   Date,                           // 创建日期
                        adate:                  Date,                           // 最后修改日期
                        type:                   Number,                         // 活动类型
                        account_id:             mongocfg.ObjectID,              // Priviledge
                        account_name:           String,                         // Cached
                        // version:                Number,                         // 防止保存覆盖
                        // title:                  String,                         // 活动标题
                        // desc:                   String,                         // 活动标题
                        date_start:             Date,                           // 活动开始时间
                        date_end:               Date,                           // 活动结束时间
                        // allDay:                 Boolean,                        // 是否全天
                        duty_account_id:        mongocfg.ObjectID,              // 值班人员account id
                        duty_account_full_name: String,                         // 值班人员姓名

                        isOnDuty:               Number,                         // 是否在值班
                        workplace:              String,                         // 工作场所
                        duty_color:             String                          // 值班颜色
                };
        }
```