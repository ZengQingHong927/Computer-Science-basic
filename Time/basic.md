# Date
## Library
npm install moment-timezone

## MongoDB Date
MongoDB 數據類型為時間對象 Date Object，存儲時，將時間字符串轉換成時間對象

## Date operation
```js
const moment = require('moment-timezone');
const timestamp = moment(Date.now()).format('YYYY-MM-DDTHH:mm:ss.SSS');

// UTC time GMT+00:00
const nowDate = new Date(timestamp);
console.log(`Date instance: ${nowDate}`);

// Date string, offset by months, UTC time GMT+08:00, local time
const day = moment().subtract(10, 'months').format('YYYY-MM-DDTHH:mm:ss.SSS');
console.log(`Moment 10 months offset: ${day}`)

// Date object UTC time GMT+00:00, 2019-10-13T02:28:51.425Z 2018-12-13T02:28:51.426Z
const startDate = new Date(day);
console.log(`Moment create Date instance: ${nowDate} ${startDate}`);

// Calculate days 304 days
console.log(`Spacing Days: ${Math.round(Math.abs(nowDate-startDate) / (24 * 60 * 60 * 1000))}`);

// Date substraction 86400000
console.log(`2 Date substraction (miliseconds): ${new Date('2019-10-13T10:20:30') - new Date('2019-10-12T10:20:30')}`);

// Local time 2019-10-13T10:28:51.430
console.log(`Moment instance: ${moment().format('YYYY-MM-DDTHH:mm:ss.SSS')}`);

// timezone
var newYork    = moment.tz(nowDate, "America/New_York");
var losAngeles = newYork.clone().tz("America/Los_Angeles");
var london     = newYork.clone().tz("Europe/London");
console.log(`Timezone NewYork: ${newYork.format('YYYY-MM-DDTHH:mm:ss.SSS')}`);
console.log(`Timezone LosAngeles: ${losAngeles.format('YYYY-MM-DDTHH:mm:ss.SSS')}`);
console.log(`Timezone London: ${london.format('YYYY-MM-DDTHH:mm:ss.SSS')}`);
```
## MongoDB date operation
```js
const startDate = new Date(moment().subtract(1, 'months').format('YYYY-MM-DDTHH:mm:ss.SSS'));
const endDate = new Date(moment().add(12, 'months').format('YYYY-MM-DDTHH:mm:ss.SSS'));
// or
const startDate = new Date(moment().subtract(1, 'months').format('YYYY-MM-DD'));
const endDate = new Date(moment().add(12, 'months').format('YYYY-MM-DD'));
const instance = await Product.create({ ...req.body, startDate, endDate });
```
## Timezone convertion
https://stackoverflow.com/questions/43113350/how-to-convert-moment-to-another-moment-depending-on-timezone
```js
const m = moment.utc(exCreateDate); // UTC-00
const UTC = m.format('YYYY-MM-DD:THH:mm:ss.SSS');
const NY = m.clone().tz('America/New_York').format('YYYY-MM-DDTHH:mm:ss.SSS'); // convert UTC to specific timezone
const CH = m.clone().tz('America/Chicago').format('YYYY-MM-DDTHH:mm:ss.SSS'); // convert UTC to specific timezone
const DE = m.clone().tz('America/Denver').format('YYYY-MM-DDTHH:mm:ss.SSS'); // convert UTC to specific timezone
const LA = m.clone().tz('America/Los_Angeles').format('YYYY-MM-DDTHH:mm:ss.SSS'); // convert UTC to specific timezone
```

## Calculate difference between two dates
```js
let pd = moment('2019-11-25T10:30:50.123');
let rd = moment('2019-11-30T12:20:10.458');
let differenceDate = rd.diff(pd, 'days'); // years,months,days,weeks,hours,minutes,seconds
```

## MongoDB
時間輸入都會轉換成UTC-00，從數據庫讀取時間值，會自動轉換成當地時間