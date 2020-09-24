# Linux環境變量設定

- 登入Linux時執行文件的過程如下：
剛登入Linux時，首先啟動/etc/profile文件，然后再啟動用户目錄下的~/.bash_profile、~/.bash_login或~/.profile文件中的其中一個，執行的顺序為：~/.bash_profile、~/.bash_login，~/.profile。  
如果~/.bash_profile文件存在的話，還會執行~/.bashrc文件。  
因為在~/.bash_profile文件中一般會有下面的代碼：
if [ -f ~/.bashrc ] ; then
   . ./bashrc
fi

~/.bashrc中，一般還會有以下代碼：
if [ -f /etc/bashrc ] ; then
   . /etc/bashrc
fi

所以，~/.bashrc會調用/etc/bashrc文件。最后，在退出shell時，還會執行~/.bash_logout文件。
執行順序為： /etc/profile -> (~/.bash_profile | ~/.bash_login | ~/.profile) -> ~/.bashrc -> /etc/bashrc -> ~/.bash_logout  

- 各個文件的作用域：  

1. /etc/profile： 此文件為系统的每個用户設置環境設定，當用户第一次登入時，該文件被執行。並從/etc/profile.d目錄的配置文件中搜集shell的設置。  

2. /etc/bashrc: 為每一個運行bash shell的用户執行此文件。當bash shell被打開時，該文件被讀取（即每次新開一個终端，都會執行bashrc）。  

3. ~/.bash_profile: 每個用户都可使用該文件輸入專用於自己使用的shell設定，當用户登入時，該文件僅僅執行一次。默認情况下，設置一些環境變量，執行用户的.bashrc文件。  

4. ~/.bashrc: 該文件包含專用於你的bash shell的bash設定，當登入時以及每次打開新的shell時，該文件被讀取。  

5. ~/.bash_logout: 當每次退出系统(退出bash shell)時，執行該文件。 另外，/etc/profile中設定的變量(全局)的可以作用於任何用户，而~/.bashrc等中設定的變量(局部)只能繼承/etc/profile中的變量，他们是"父子"關系。

6. ~/.bash_profile: 是交互式、login 方式進入 bash 運行的~/.bashrc 是交互式 non-login 方式進入 bash 運行的通常二者設置大致相同，所以通常前者會調用後者。