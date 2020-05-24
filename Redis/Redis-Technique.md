# Redis - cache clean for expiry data  
## 緩存淘汰機制  
緩存的數據存放在內存裡，內存空間不足無法寫入數據，或主機重啓時數據會遺失。  
- 過期策略，1.定期刪除（主動），2.惰性刪除（被動），3.淘汰機制  
- 定期刪除：給key設置過期時間，redis默認每隔100ms隨機檢查設置過期時間的key，若過期則刪除，因此造成某些已過期的key沒被刪除。  
- 惰性刪除：當獲取某個key時，檢查是否過期，若過期則刪除，返回空值。  
- 淘汰機制：  
1. noevistion：寫入新數據時，內存空間不夠會報錯。  
2. allkeys-lru：寫入新數據時，內存空間不夠會，全部的鍵空間移除最近最少用的key。  
3. allkeys-random：寫入新數據時，內存空間不夠，隨機移除某個key。  
4. volatile-lru：寫入新數據時，內存空間不夠，在設置過期時間的鍵空間，移除最近最少用的key。  
5. volatile-random：寫入新數據時，內存空間不夠，在設置過期時間的鍵空間，隨機移除某個key。  
6. volatile-ttl：寫入新數據時，內存空間不夠，在設置過期時間的鍵空間，有更早過期時間的key優先移除。  

## 數據一致性策略
先寫數據庫在更新緩存，先讀緩存再寫數據庫
1. 設置緩存TTL，先寫數據庫再更新緩存，即使更新緩存失敗，後面讀請求會回填緩存
2. 使用異步更新緩存（主機重啓會使異步更新線程消失）
![Cache Flow](./cache-strategy.jpeg)
## 悲觀鎖與樂觀鎖
  - 悲觀鎖：每次使用數據時，認為別人會來修改同一筆數據，因此加鎖防止他人修改
  - 樂觀鎖：每次使用數據時，認為別人不會來修改同一筆數據，因此不加鎖防止他人修改，只有在修改數據時才加鎖，防止他人修改