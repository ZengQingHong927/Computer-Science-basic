# TextArea

## Demo

```js

function ProfileSetting (props) {

    let   { className,
            ...rest }                           = props;

    let     classes                             = useStyles ();
    let   [ name, setName ]                     = useState ('');
    let   [ nickname, setNickName ]             = useState ('');
    let   [ introduction, setIntroduction ]     = useState ('');


    async function submit () {
            console.log (`- submit ()`);
    }

    return (
        <Card {...rest} className={clsx(classes.root, className)}>
                <CardHeader title="Profile" />
                <Divider />
                <CardContent className={classes.content}>
                                <div className={classes.field}>
                                        <TextField fullWidth label="名稱" name="name" onChange={(e) => setName (e.target.value)} value={password} variant="outlined" />
                                        <TextField fullWidth label="暱稱" name="nickname" onChange={(e) => setNickName (e.target.value)} value={withdrawCode} variant="outlined" />
                                </div>
                                <div className={classes.field}>
                                        <TextareaAutosize id="publicKey" rows={20} rowsMax={20} aria-label="maximum height" value={introduction} onChange={(e) => setIntroduction (e.target.value)} className={classes.textArea} placeholder='请输入自介'/>
                                </div>
                </CardContent>
                <Divider />
                <CardActions>
                        <Button className={classes.saveButton} variant="contained" onClick={submit}>
                                保存
                        </Button>
                </CardActions>
        </Card>
    )
}

var     useStyles       = makeStyles (theme => ({
    root: {

    },
    content: {
            display:                'flex',
    },
    saveButton: {
            color:                          theme.palette.white,
            backgroundColor:                colorsRed[600],
            '&:hover': {
                    backgroundColor:        colorsRed[900]
            }
    },
    textArea: {
            width:                          '100%',
            borderRadius:                   '3px',
            padding:                        '10px',
            resize:                         'none',
            fontFamily:                     'Roboto Mono, monospace',
    },
    field: {
            display: 		        'flex',
            flexWrap: 		        'wrap',
            flexDirection:                  'column',
            flexBasis:                      '50%',
            margin: 	                theme.spacing (1),
            alignContent:                   'flex-start',
            '& > *': {
                        flexGrow: 	        1,
                        margin: 	        theme.spacing (1)
            }
    },
}));

```