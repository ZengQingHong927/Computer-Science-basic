# AWS-CLI

查看aws帳號： aws sts get-caller-identity

## AWS Configure

1. IAM 加入新的用戶

add user -> set user name -> check Access type (Programmatic access) -> Next
-> click Attach existing policies directly -> check AdministratorAccess -> Next -> Next -> Create user -> download csv (including accessKey and secretKey)
2. Local 設置credential

aws configure --profile serverlessuser
