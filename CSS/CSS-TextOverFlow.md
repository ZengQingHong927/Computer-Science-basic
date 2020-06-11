# 文字内容超出外框处理

<https://juejin.im/post/5de9d710f265da33c028a0e7>
<https://codepen.io/Yukishi/pen/zEBoMr?__cf_chl_jschl_tk__=620b2f671a786f24227b9952420681458709da54-1591787546-0-ASzl-YdCYCOlwzSlLE5Zd3PoWrtKDmyjE_tRbXF3wE6PB-Ygh-o0MeOPy_UFzRjrzaKhWpTV-l49EMjDB__DzDSx3fZRvcvRc3mTwADW0xUPbQtj4Qcbf7420Xp-rUg-yB5IpvZDuUhsWfZdTvPaMpIhbNFpoFbX2yk_meTu-Uk8a8UuShznsHoYy_8qFncRpi6kbHzEVxVD_DnAGsjcC8fSTzVtW5npPVp6OwmkNhCH18e2oElWfr5CL9OkWFUWhzbY0ufeBTOzU9_hutYaNiQktaTEUUj3gQ_XBOrMeN-P5B0SNJKlITZjA2thKcsM5y5tFR2IY6FakFBnWAbyOpF_f5JKWd-qDJbtG1GykGQe>

## chrome瀏覽器無法正常顯示

```js
// 超出寬度自動換行，並且首行縮進兩個字符
div{
    word-break: break-all;
    word-wrap: break-word;
    text-indent: 2em;
}

// 單行超出顯示...
.Ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

// 多行超出顯示...，以及要求顯示幾行或根據文字多少顯示幾行
.Ellipsis {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;          // 控制顯示幾行
        -webkit-box-orient: vertical;   // webbox方向
}

1. word-break:break-all; // 只对英文起作用，以字母作为换行依据
2. word-wrap:break-word; // 只对英文起作用，以单词作为换行依据
3. white-space:pre-wrap; // 只对中文起作用，强制换行
4. white-space:nowrap; // 强制不换行，都起作用
5. white-space:nowrap; overflow:hidden; text-overflow:ellipsis; // 不换行，超出部分隐藏且以省略号形式出现（部分浏览器支持）

.cardheader {
    textOverflow:           'ellipsis',
    // overFlow:               'hidden',
    width:                  '150px',
    whiteSpace:             'nowrap',
    display:                'block',
    overflowX:              'hidden'
},

```
