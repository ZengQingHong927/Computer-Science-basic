# Jenkis Setup

<https://www.youtube.com/watch?v=XNDEK5HWLXA>

## Install

使用Jenkins作持續整合部署，需要在服務器安裝Jenkins服務

brew install jenkis-lts
brew services start jenkis-lts
open browser and login
brew services stop jenkis-lts

## config document

Mac ~/.jenkins/config.xml

## Uninstall on MacOS

brew uninstall jenkins --force
brew cleanup
