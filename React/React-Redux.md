# 狀態管理

組件和數據解耦，共享組件狀態。
使用時機：數據頻繁在兄弟組件傳遞，組件數據較多，傳遞層級較深

## Redux核心概念

action, dispatch, reducer, store

1. action用戶端發出的動作，也可以是組件首次渲染發出的請求數據
2. dispatch負責把action發送到store中，經歷所有middleware
3. 所有對store的修改都是經過reducer完成
4. store數據存儲中心

## Redux使用的流程

1. 創建reducer函數
2. 使用combineReducers合併多個reducer
3. 使用createStore創建store
4. 使用Provider在最外層組件注入store
5. 在組件中使用useSelector取用store的狀態數據，或使用connect將store的狀態映射注入組件props
6. 在組件中使用useDispatch函數創建dispatch傳入Action對象修改store狀態
7. 使用Redux-thunk處理異步dispatch
