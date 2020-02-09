## Desktop創建app链接
https://blog.csdn.net/qianmosolo/article/details/79353632

1. 建立軟鏈接

sudo ln -s /home/c/Downloads/Postman/Postman /urs/bin/postman (前面地址爲安装目錄，後面軟鏈接地址)

2. 創建啓動文件

sudo vim  /urs/share/applications/postman.desktop

寫入：

      [Desktop Entry]

      Encoding=UTF-8

      Name=Postman

      Exec=/urs/bin/postman

      Icon=/home/c/Downloads/Postman/Postman/app/assets/icon.png

      Terminal=false

      Type=Application

      Categories=Development;

在Desktop即可收尋到postman app