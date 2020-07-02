# this  

+ 函數直接執行  
自然執行時this指向window或undefined (瀏覽器)，global（node環境）

```js
        function func () {
                console.log (this)  // this->window
        }

        func ();
```

+ 函數被別人調用  
this指向執行時誰點出來就是誰

```js
        function func () {
                console.log (this)  // this->window
        }

        var a = {
                myfunc: func        // this -> a
        }

        a.myfunc();
```

+ new 一個實例，被實例調用  

new出來的對象

```js
        function func () {
                console.log (this)  // this->window
        }

       function Person (name) {
               this.name = name;
               console.log (this)     // this -> person實例
       }

        var     person = new Person ('react');
```

+ apply, call, bind  

```js
var person = {
        name: 'react'
}
// 立即調用
apply(person, [1,2,3]);
call(person, 1,2,3);

// 返回this被改變的函數
var man = bind(person, 1,2,3)
man()

function getColor () {
        this.color = 'yellow';
        console.log (this)
}

function Car (color) {
        getColor.call(this, color)      // this -> car
}

var car = new Car ('blue')

```

+ 箭頭函數  
離箭頭函數最近的函數（執行上下文），不受call，apply，bind和板門三把斧

```js
var a = {
        myfunc: function () {
                setTimeout(function(){
                        console.log (this)  // this -> a
                },1)
        }
}

a.myfunc();

var a = {
        myfunc: function () {
                var that = this
                setTimeout(function(){
                        console.log (that)  // this -> a
                },1)
        }
}

a.myfunc();

var a = {
        myfunc: function () {
                setTimeout(() => {
                        console.log (this)  // this -> a
                },1)
        }
}

a.myfunc();

```
