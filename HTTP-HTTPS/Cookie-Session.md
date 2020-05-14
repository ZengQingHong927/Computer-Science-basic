# Cookie-Session
- session 記錄客戶端狀態的機制，不同於cookie存放在瀏覽器，session保存在服務器上
- session工作流程：當瀏覽器訪問訪問服務器並發送第一次請求時，服務器創建一個session對象，生成類似鍵值對，將key(cookie)返回到瀏覽器（客戶端），瀏覽器下次訪問時，攜帶key（cookie），找到對應的session（value）。客戶信息都保存在session中。
- session 检查
```js
var msleepP   = function (ms)
{
      return new Promise (resolve => setTimeout (resolve, ms));
};
                        YMAccount.checkSession (ctx.session);
if (!session || !session.account_id) throw new Error(`no session or account_id in session, session: ${session}`)
```