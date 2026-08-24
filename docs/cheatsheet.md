# Git 速查表

> 左欄是你想做的事情，中間是在 IDEA 怎麼做，右邊是對應的 CLI 指令。

## 基本操作

| 我想要... | IDEA 操作 | CLI 指令 |
|-----------|-----------|----------|
| 把專案下載到電腦 | 歡迎畫面 → Get from VCS → 貼上 URL → Clone | `git clone <url>` |
| 看看我改了什麼 | Commit 工具視窗（Alt+0 / ⌘0），檔案列表 | `git status` |
| 看某個檔案改了哪幾行 | 雙擊 Commit 視窗中的檔案，打開 diff 檢視 | `git diff <檔案>` |
| 把修改記錄成一個版本 | Commit 視窗 → 勾選檔案 → 寫訊息 → Commit | `git add <檔案>` + `git commit -m "訊息"` |
| 把版本上傳到 GitHub | Git → Push（Ctrl+Shift+K / ⌘⇧K） | `git push origin <branch>` |
| 一次做完 commit + push | Commit 視窗 → Commit and Push | `git add` + `git commit` + `git push` |

## Branch 操作

| 我想要... | IDEA 操作 | CLI 指令 |
|-----------|-----------|----------|
| 看我現在在哪個 branch | 看視窗右下角狀態列 | `git branch` |
| 開一條新 branch | 點右下角 branch 名稱 → New Branch | `git checkout -b <名稱>` |
| 切換到別的 branch | 點右下角 → 選目標 branch → Checkout | `git checkout <名稱>` |
| 把遠端最新的東西拉下來 | Git → Update Project（Ctrl+T / ⌘T）→ Merge | `git pull origin <branch>` |

## 協作操作

| 我想要... | IDEA 操作 | CLI 指令 |
|-----------|-----------|----------|
| 發 PR 給組長 | Git → GitHub → Create Pull Request | GitHub 網頁 或 `gh pr create` |
| 解決衝突 | Conflicts 對話框 → 選檔案 → Merge → 三方檢視器 | 手動編輯衝突標記 + `git add` + `git commit` |
| 看 commit 歷史 | Git 工具視窗（Alt+9 / ⌘9）→ Log 分頁 | `git log` |
| 看誰改了這一行 | 在編輯器左側 gutter 按右鍵 → Annotate with Git Blame | `git blame <檔案>` |

## 快捷鍵總整理

| 功能 | Windows / Linux | macOS |
|------|----------------|-------|
| Commit 工具視窗 | Alt+0 | ⌘0 |
| Git 工具視窗 | Alt+9 | ⌘9 |
| Push | Ctrl+Shift+K | ⌘⇧K |
| Update Project | Ctrl+T | ⌘T |
| Branches 彈出視窗 | Ctrl+Shift+` | ⌃⇧` |
