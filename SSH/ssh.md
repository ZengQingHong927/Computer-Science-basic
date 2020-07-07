# SSH 遠程登入

<https://www.linuxidc.com/Linux/2017-12/149623.htm>
<https://jasonwatmore.com/post/2020/02/05/connect-to-remote-mongodb-on-aws-ec2-simply-and-securely-via-ssh-tunnel>

## port forward

ssh -L port:localhost:port username@hostname

ssh -i ~/my-aws-key.pem -N -f -L 8000:localhost:27017 ubuntu@ec2-54-252-168-106.ap-southeast-2.compute.amazonaws.com

- -i ~/my-aws-key.pem specifies the path to the ssh private key file to use for authentication.
-N instructs ssh not execute a remote command, so it won't open a remote shell on the server.
-f instructs ssh to run in the background.
-L 8000:localhost:27017 tells ssh to connect your local (L) port 8000 to the address + port localhost:27017 on the server, in other words to MongoDB running locally on the server.
ubuntu@ec2-54-252-168-106.ap-southeast-2.compute.amazonaws.com is the username and address to the AWS EC2 server that I used for testing.

## 主鑰變更問題

系統重灌導致金鑰不對，可以刪除~/.ssh/known_hosts
