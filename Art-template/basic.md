# Art-template
## loop
{{each target }}
    {{$value}} {{$index}}
{{/each}}
## variable
{{value}}
{{data.key}}
{{data['key']}}
{{a ? b : c}}
{{a || b}}
{{a + b}}
## condition
{{if value}} ... {{/if}}
{{if v1}} ... {{else if v2}} ... {{/if}}

```js
{{if $value.status==1}}
    <img src="{{__HOST__}}/admin/images/yes.gif" onclick="app.toggle(this,'articlecate','status','{{@$value._id}}')" />
{{else}}
    <img src="{{__HOST__}}/admin/images/no.gif" onclick="app.toggle(this,'articlecate','status','{{@$value._id}}')" />
{{/if}}
```
## raw output
raw output will not escape the content of HTML, so there may be security problems. Please be careful.
{{@value}}
## template inheritance
```js
<!--layout.art-->
<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <title>{{block 'title'}}My Site{{/block}}</title>

    {{block 'head'}}
    <link rel="stylesheet" href="main.css">
    {{/block}}
</head>
<body>
    {{block 'content'}}{{/block}}
</body>
</html>

<!--index.art-->
{{extend './layout.art'}}

{{block 'title'}}{{title}}{{/block}}

{{block 'head'}}
    <link rel="stylesheet" href="custom.css">
{{/block}}

{{block 'content'}}
<p>This is just an awesome page.</p>
{{/block}}
```
## sub template
<html>
<head>
    {{include 'default/public/header-inner.html'}}
</head>
<body>
    <h2>Welcome to my Web Site</h2>
</body>
<foot>
    {{include 'default/public/footer-inner.html'}}
</foot>
</html>
{{include 'default/public/header-inner.html'}}