# 常用文字居中方法 (RWD)

## Flex

```js
        <div className={classes.container}>
                <p>Byte Dance!Go!Go!</p>
        </div>

        container: {
                backgroundColor:        '#b7efcd',
                width:                  '100%',
                height:                 '100%',
                border:                 'solid 5px #363636',
                display:                'flex',
                justifyContent:         'center',
                alignItems:             'center'
        },

```

## Table

```js
        <div className={classes.container}>
                <p>Byte Dance!Go!Go!</p>
        </div>

        container: {
                backgroundColor:        '#b7efcd',
                width:                  '100%',
                height:                 '200px',
                border:                 'solid 5px #363636',
                display:                'table',
                textAlign:              'center',
                '& > p': {
                        display:        'table-cell',
                        verticalAlign:  'middle'
                }
        },

```

## Grid

```js
        <div className={classes.container}>
                <p>Byte Dance!Go!Go!</p>
        </div>

        container: {
                backgroundColor:        '#b7efcd',
                width:                  '100%',
                height:                 '200px',
                border:                 'solid 5px #363636',
                display:                'grid',
                '& > p': {
                        margin:         'auto'
                }
        },

```

## Margin & Absolute

```js

        <div className={classes.container}>
                <div className={classes.content}><p>Byte Dance!Go!Go!</p></div>
        </div>

        content: {
                verticalAlign:          'middle',
                backgroundColor:        '#fff',
                borderRadius:           '20px',
                width:                  '300px',
                height:                 '350px',
                margin:                 'auto',
                position:               'absolute',
                top:                    0,
                left:                   0,
                bottom:                 0,
                right:                  0,
        }

```