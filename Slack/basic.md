# Slack API

file upload
https://api.slack.com/methods/files.upload/test
Create new workspace for file uploda
https://app.slack.com/create#email

App management page
https://api.slack.com/apps
https://api.slack.com/apps/AU0LXRZ7B/oauth?

Scope
1. Add an OAuth Scope
2. Reinstall App
https://api.slack.com/apps/AU0LXRZ7B/oauth?


Get OAuth token
https://api.slack.com/apps/AU0LXRZ7B/oauth?

Sending message and setup bot
https://api.slack.com/messaging/sending

Upload
https://api.slack.com/methods/files.upload
https://api.slack.com/messaging/files/uploading

[Ref1] (https://api.slack.com/methods/files.upload)
[Ref2] (https://api.slack.com/messaging/files/uploading)

## SendMessage
```js
var fetch = require ('node-fetch');
var formData = require ('form-data');

let     url             = 'https://slack.com/api/chat.postMessage';
let     queryParams     = {
        channel:                'slack_channel_ID',
        text:                   'message_to_send',
};
let     headers         = {
        'Authorization':        `Bearer xxxxxxxxxx`,
        'Content-Type':         'application/json'
};

fetch(url, option)
```

## UploadFile


```js

let form        =new FormData ();
form.append ('file', fs.createReadStream (path.resolve ('file_path')));
form.append ('channels', 'slack_channel_ID');
form.append ('token', 'bot token');
form.append ('filename', 'filename');
form.append ('filetype', 'lowerextname');

let     options = {
                method: 'POST',
                headers:
                        {
                                // 'Content-Type': 'multipart/form-data',
                                'cache-control': 'no-cache',
                                'Authorization': `Bearer bot-token`,
                        },

                body:   form
        };
let response    = await fetch(url, option);
let resobj      = await response.json ();

let     queryParams     = {
                file:                   resobj.file.id,
                token:                  'xoxp-user-token'
        };
let     headers         = {
        'Authorization': `Bearer xoxp-user-token`,
};

let     optionsJSON     = {
        url:            'url',
        method:         'POST',
        headers:        {
                'Content-Type':         'application/json',
        },
        body:   JSON.stringyify (queryParams)
};

let     optionsurlencoded       = {
        url:            'url',
        method:         'POST',
        headers:        {
                'Content-Type':         'application/x-www-form-urlencoded; charset=UTF-8',
        },
        body:   qs.stringify (queryParams)
};

let     response_shared = await fetch ('url', );
let     slack_url       = `${response_shared.file.url_private}/?pub_secret=${response_shared.file.permalink_public.split('/')[3].split('-')[2]}`;       // 拼接链接地址

// https://stackoverflow.com/questions/58186399/how-to-create-a-slack-message-containing-an-uploaded-image
// https://files.slack.com/files-pri/T011KSNR84B-F012JP3Q3BJ/file_upload_teapot_2.png/?pub_secret=c8efae07d3

```