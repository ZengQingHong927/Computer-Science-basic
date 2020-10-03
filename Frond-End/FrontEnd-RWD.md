# RWD 設計模式

一種為了讓網頁在各種尺寸的裝置下，畫面都能呈現合適比例的設計原則。

1. 設定 viewport
2. 決定 RWD 設計模式

再來最重要的一步，就是要決定網頁內容在不同 viewport 下的版面如何配置、流動。

在 RWD 中有五種比較常用的設計模式：局部流動 (mostly fluid)、欄內容下排 (column drop)、版面配置位移 (layout shifter)、細微調整 (tiny tweaks) 和畫布外空間利用 (off canvas)。

3. 套用 CSS media query

所以在 RWD 中為了要在不同螢幕寬度做不同的 CSS 樣式調整，就需要使用 CSS3 中提供的 media query 語法。

4. 使用相對單位設定寬高、大小
最後要注意在不同尺寸的 CSS media query 中，內容的寬高、大小，大多會使用「相對單位」來設定，像是 width: 50%、width: 100vh、height: 80vh、font-size: 2em 等，如此才能在該範圍的 viewport 中達到 RWD 的效果。

