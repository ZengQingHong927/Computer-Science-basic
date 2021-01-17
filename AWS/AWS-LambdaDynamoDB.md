# Lambda DynamoDB

url: <https://www.youtube.com/watch?v=ijyeE-pXFk0>

1. Dynamodb -> Table -> Overview (記住 ARN，創建Role時用到)
2. Create role -> choose Lambda service -> Next Permissions -> Add Policy -> check AWSLambdaBasicExecutionRole -> Next: Tags -> Next: Review -> Role Name LambdaDynamoDBRole -> create role
3. click LambdaDynamoDBRole -> Add inline policy -> choose service -> DynamoDB -> add actions -> GetItem and PutItem -> Resources -> Add ARN -> Specify ARN for table -> Review Policy -> Name DynamoDBReadWriteAccess
4. Create lambda function with this role
5. Only deploy new lambda function cmd: sls deploy -f handler

## RDS service

url: <https://ithelp.ithome.com.tw/articles/10195307>

1. login aws admin -> RDS service -> create database
2. DB instance identifier & USername & Pwd
3. check Public Access & create VPC security
4. Go to VPC security page & inbound rules setting