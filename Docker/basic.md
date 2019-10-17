# Docker Introduction
## Docker 基本三個觀念
- 映像檔（Image）  
  Docker 映像檔就是一個唯讀的模板。  
  映像檔可以用來建立 Docker 容器。

- 容器（Container）  
  容器是從映像檔建立的執行實例。  
  Docker 利用容器來執行應用。  
  可以被啟動、開始、停止、刪除。  
  每個容器都是相互隔離的、保證安全的平台。  

- 倉庫（Repository）  
  倉庫是集中存放映像檔檔案的場所。  
  每個倉庫中又包含了多個映像檔。  
  每個映像檔有不同的標籤（tag）。  
  倉庫分為公開倉庫（Public）和私有倉庫（Private）兩種形式。  

## Step By Step
將Web App打包成(Dockerize)Docker Image並執行成Container
- 安裝Docker
- 準備打包的目標程式
- 撰寫Dockerfile
- 打包程式(Dockerize)
- 執行成Container

1. 安裝Docker
安裝網址：https://docs.docker.com/docker-for-mac/install/

2. 準備目標程式
git clone https://github.com/HcwXd/docker-tutorial.git
cd docker-tutorial/docker-demo-app
資料夾有五個檔案
```t
.dockerignore
Dockerfile
docker.html
index.js
package.json
```

3. 撰寫Dockerfile
Dockerfile 透過撰寫命令行告訴 Docker 應該要如何打包我的程式。

```t
FROM node:10.15.3-alpine
```
這行會載入 Node.js 需要的執行環境，每個不同的程式需要的環境可能不同，這裏下載的是 node:10.15.3-alpine，其他版本可以在 Dockerhub 上看到

```t
WORKDIR /app
```
在這個 Docker 的環境之中建立一個工作目錄 /app

```t
ADD . /app
```
把跟 Dockerfile 同個資料夾的程式加到剛建立的工作目錄 /app 中

```t
RUN npm install
```
運行 npm install，讓 npm 透過讀取 package.json 下載相依的 package

```t
EXPOSE 3000
```
指定 container 對外開放的 port

```t
CMD node index.js
```
我們透過 node index.js 來執行我們的 Server

4. 打包程式(Dockerize)
終於把所有預備檔案準備好後，我們可以在資料夾內透過指令 docker build
```t
docker build . -t docker-demo-app
```
去建立 Docker Image 並為這個 Image 加上 tag docker-demo-app。然後我們可以再透過指令
```t
docker images
```
列出我們全部的 Docker Image 如下

```t
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
docker-demo-app     latest              55c4ff55fd72        37 seconds ago      74.2MB
node                10.15.3-alpine      56bc3a1ed035        4 months ago        71MB
```

5. 執行成Container
生成 Docker Image 後，下一步就可以來實際執行 Container 。透過上面的 docker images 指令，找到我們建立 Image 的 ID，在這邊是 733776b1db0a。輸入指令

```t
docker run -p 3000:3000 -it 733776b1db0a
```

透過 docker run，我們實際把 Image 執行成 Container 了！這時我們看到 terminal 顯示 listening on port 3000 後，用瀏覽器打開 localhost:3000，就可以迎接一隻 Docker 鯨魚。

## 停止Container
ctrl+c 無法關閉運行的 Container，新開啟一個終端介面，先輸入docker ps查看運行中的containerID，再輸入 docker stop containerID

## 移除Docker Image
docker ps -a
docker rmi imageID or tag