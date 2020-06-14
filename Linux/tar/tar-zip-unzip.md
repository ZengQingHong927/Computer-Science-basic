# tar Zip/UnZip

## 常用壓縮解壓指令

.tar
打包：tar cvf FileName.tar DirName
解包： tar xvf FileName.tar

.gz
壓縮：gzip FileName
解壓1：gunzip FileName.gz
解壓2：gzip -d FileName.gz

.tar.gz
壓縮：tar zcvf FileName.tar.gz DirName
解壓：tar zxvf FileName.tar.gz

.bz2
壓縮： bzip2 -z FileName
解壓1：bzip2 -d FileName.bz2
解壓2：bunzip2 FileName.bz2

.tar.bz2
壓縮：tar jcvf FileName.tar.bz2 DirName
解壓：tar jxvf FileName.tar.bz2

.tgz
壓縮：unkown
解壓：tar zxvf FileName.tgz

.tar.tgz
壓縮：tar zcvf FileName.tar.tgz FileName
解壓：tar zxvf FileName.tar.tgz

.zip
壓縮：zip FileName.zip DirName
解壓：unzip FileName.zip

.rar
壓縮：rar e FileName.rar
解壓：rar a FileName.rar
