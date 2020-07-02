# 面向對象編程  

面向過程：注重的是動作，分析解決問題的需要的步驟，然後編寫函數依次調用。
面向對象：注重的是主謂，把構成問題的事物拆解成各個對象，方便描述這個事物在當前問題中的各種行爲。

封裝：讓使用對象的人不用考慮內部實現，只考慮功能使用
繼承：代碼復用
多型：不同對象作用統一操作，產生不同結果。

## 對象  

### 普通模式

缺點是無法辨識對象類型

- new 一個對象，每一個對象都要重寫一遍定義。

```js
const Player = new Object();
Player.color = "white";
Player.start = function () {
        console.log("white下棋");
};
```

- 工廠模式

```js
function createObject() {
        const Player = new Object();
        Player.color = "white";
        Player.start = function () {
                console.log("white下棋");
        };
        return Player;
}
```

### 構造函數  

通過this添加的屬性和方法總是指向當前對象的，所以在實例化的时候，通過 this添加的属性和方法都會在内存中復制一份，造成内存的浪费。

```js
function Player(color) {
        this.color = color;
        this.start = function () {
                console.log(color + "下棋");
        };
}
const whitePlayer = new Player("white");
const blackPlayer = new Player("black");
```

### 原型  

通過原型繼承的方法並不是自身的，我們在原型鏈上層層查找，好處是只在內存中創建一次，實例化的對象都會只向這個prototype對象。

```js
function Player(color) {
        this.color = color;
}
Player.prototype.start = function () {
        console.log(color + "下棋");
};
const whitePlayer = new Player("white");
const blackPlayer = new Player("black");
```

### 靜態屬性

绑定在構造函數上的屬性方法，需要通過構造函數訪問。

```js
function Player(color) {
        this.color = color;
        if (!Player.total) {
                Player.total = 0;
        }
        Player.total++;
}
let p1 = new Player("white");
console.log(Player.total); // 1
let p2 = new Player("black");
console.log(Player.total); // 2
```

## 原型與原型鏈  

原型上添加屬性或者方法節省內存空間。

原型對象：Player.prototype

```js
// 添加方式1
function Player(color) {
        this.color = color;
}
Player.prototype.start = function () {
        console.log(color + "下棋");
};
const whitePlayer = new Player("white");
const blackPlayer = new Player("black");
console.log(blackPlayer.__proto__); // Player {}
console.log(Object.getPrototypeOf(blackPlayer)); // Player {},可以通过Object.getPrototypeOf来获取__proto__
console.log(Player.prototype); // Player {}
console.log(Player.__proto__); // [Function]
```

new 一個對象做了那些事？

- 創建一個繼承Player的新對象
- 在新對象上添加屬性__proto__，並指向Player的原型對象（Player.prototype）
- 改變this指向創建的實例
- 返回實例對象。
  - 1. 不顯式return，返回實例對象
  - 2. 顯式return，返回實例對象
  - 3. 顯式return基本類型，返回實例對象
  - 4. 顯式return對象類型，返回{}

原型鏈：一個對象的屬性或方法找不到時，會去原型對象上查找，若找不到再去原型對象的原型對象查找，直到null返回undefined。

```js
function Player (color) {
        this.color = color;
}

Player.prototype.start = function () {
        console.log ('start');
}

Object.prototype.name = 'Object';

var p1 = new Player ('white');

console.log (p1.name); // Object
```

## 繼承  

### 原型繼承  

- 實現

```js
function Parent () {
        this.name = 'ParentName';
        this.actions = ['react', 'koa', 'mongodb', 'nginx', 'pm2'];
}

function Child () {}

Child.prototype = new Parent();
Child.constructor = Child;

var c1 = new Child ();
c1.actions.push ('redis');
var c2 = new Child ();
console.log (c1.actions)
console.log (c2.actions)

```

- 缺點
  - 父類存在引用類型，則所有實例共享
  - 父類不能傳參

### 構造函數繼承  

- 實現

```js
function Parent () {
        this.name = 'ParentName';
        this.actions = ['react', 'koa', 'mongodb', 'nginx', 'pm2'];
}

function Child () {
        Parent.apply (this, arguments);
        // 相當於在Child執行以下
        // this.name = 'ParentName';
        // this.actions = ['react', 'koa', 'mongodb', 'nginx', 'pm2'];
}

var c1 = new Child ('c1', ['react', 'koa', 'mongodb', 'nginx', 'pm2']);
c1.actions.push ('redis');
var c2 = new Child ('c2', ['react', 'koa', 'mongodb']);
console.log (c1.actions);
console.log (c2.actions);
```

- 缺點
  - 浪費內存

### 組合繼承  

原型繼承+構造函數繼承
解決的問題：1.引用類型被改變，所有實例共享 2.無法傳參 3.多佔用內存空間

- 實現

```js
function Parent (name, actions) {
        this.name = name;
        this.actions = actions;
}

Parent.prototype.getName = fucntion () {
        console.log (`${this.name} call getName`);
}

function Child () {
        Parent.apply (this, arguments); // 第一次調用構造函數
}

Child.prototype = new Parent (); // 第二次調用構造函數
Child.prototype.constructor = Child;

var c1 = new Child ('c1', ['react']);
var c2 = new Child ('c2', ['koa']);

```

- 缺點
調用兩次構造函數

### 寄生組合式繼承  

- 實現

```js
function Parent (name, actions) {
        this.name = name;
        this.actions = actions;
}

Parent.prototype.getName = fucntion () {
        console.log (`${this.name} call getName`);
}

function Child () {
        Parent.apply (this, arguments); // 第一次調用構造函數
}

// Child.prototype = Parent.prototype; // Child.prototype改變，則Parent.prototype也被改變
// Child.prottype = Object.create(Parent.prototype); // Child原型對象和Parent原型對象指向不同記憶體空間
function TempObject () {}
TempObject.prototype = Parent.prototype;
Child.prototype = TempObject.prototype;

Child.prototype.constructor = Child;

var c1 = new Child ('c1', ['react']);
var c2 = new Child ('c2', ['koa']);

```

- 缺點

## Class

```js
class Parent {
        constructor () {
                this.name = 'react';
        }

        getName () {
                console.log (this.name);
        }
}

class Child extends Parent {
        constructor () {
                super ();
        }
}

var c1 = new Child ();
c1.getName ();

```
