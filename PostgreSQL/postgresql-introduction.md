# PostgreSQL - Introduction  
## 介紹

## 數據庫設計三大范式
1. 每個屬性保持原子性，某一屬性不能有多個值
2. 屬性完全屬於主鍵，在使用聯合主鍵情況
3. 屬性不依賴於其他主屬性

## 外鍵的作用
保持主表和子表的數據一致性，若子表有的數據，而主表沒有，則會報錯。

## 約束
約束允許你對數據施加任意控制，如果用戶企圖在字段存儲違反約束的數據，就會拋出錯誤，也可適用於數值來自自缺省值。
1. 檢測約束
檢查約束是最常見的約束類型，允許聲明在某個字段裡的數值必須使用一個boolean表達式為真。
例如：
```js
CREATE TABLE products (
    product_no integer,
    name text,
    price numeric CHECK (price > 0)
);
```
一個檢查約束可用於多個字段
```js
CREATE TABLE products (
    product_no integer,
    name text,
    price numeric CHECK (price > 0),
    discounted_price numeric CHECK (discounted_price > 0),
    CHECK (price > discounted_price)
);
```
2. 非空約束
例如：
```js
CREATE TABLE products (
  product_no integer NOT NULL,
  name text NOT NULL,
  price numeric NOT NULL CHECK (price > 0)
);
```

3. 唯一字段
唯一約束保證在一個字段或一組字段裡的數據與表中其他行的數據相比是唯一的。
添加一個唯一約束會在一個使用約束的列或數組中自動創建使用唯一的BTREE索引。
例如：
```js
CREATE TABLE products (
    product_no integer UNIQUE,
    name text,
    price numeric
);
or
CREATE TABLE example (
    a integer,
    b integer,
    c integer,
    UNIQUE (a, c)
);
```

4. 主鍵
主鍵約束是唯一約束和非空約束的組合。
添加一個主鍵將在使用主鍵的列或列組中自動創建一個唯一的BTREE索引。最左匹配原則。
例如：
```js
CREATE TABLE products (
    product_no integer PRIMARY KEY,
    name text,
    price numeric
);
```
or 多組字段形成主鍵（聯合主鍵）
```js
CREATE TABLE example (
    a integer,
    b integer,
    c integer,
    PRIMARY KEY (a, c)
);
```

5. 外鍵
外鍵約束聲明一個字段（或者一組字段）的數值必須匹配另一個表中出現的數值，把這個行為稱為兩個相關表的參照完整性。一個表可以包含多於一個外鍵約束。
```js
CREATE TABLE products (
    product_no integer PRIMARY KEY,
    name text,
    price numeric
);

CREATE TABLE orders (
    order_id integer PRIMARY KEY,
    product_no integer REFERENCES products (product_no),
    quantity integer
);
or // 約束一組字段
CREATE TABLE t1 (
  a integer PRIMARY KEY,
  b integer,
  c integer,
  FOREIGN KEY (b, c) REFERENCES other_table (c1, c2)
);

CREATE TABLE products (
    product_no integer PRIMARY KEY,
    name text,
    price numeric
);
CREATE TABLE orders (
    order_id integer PRIMARY KEY,
    shipping_address text,
    ...
);
CREATE TABLE order_items (
    product_no integer REFERENCES products ON DELETE RESTRICT,
    order_id integer REFERENCES orders ON DELETE CASCADE,
    quantity integer,
    PRIMARY KEY (product_no, order_id)
);
```
限制和級聯刪除是兩個常見的選項。RESTRICT禁止刪除被引用的行。No ACTION的意思是如果在檢查約束的時候還存在任何引用行，則拋出錯誤。CASCADE聲明在刪除一個被引用的行的時候，所有引用他的行也會被自動刪除掉。