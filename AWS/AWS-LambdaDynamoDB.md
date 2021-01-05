# Lambda DynamoDB

url: <https://www.youtube.com/watch?v=ijyeE-pXFk0>

1. Dynamodb -> Table -> Overview (記住 ARN，創建Role時用到)
2. Create role -> choose Lambda service -> Next Permissions -> Add Policy -> check AWSLambdaBasicExecutionRole -> Next: Tags -> Next: Review -> Role Name LambdaDynamoDBRole -> create role
3. click LambdaDynamoDBRole -> Add inline policy -> choose service -> DynamoDB -> add actions -> GetItem and PutItem -> Resources -> Add ARN -> Specify ARN for table -> Review Policy -> Name DynamoDBReadWriteAccess
4. Create lambda function with this role