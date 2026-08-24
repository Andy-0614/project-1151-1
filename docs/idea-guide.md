# IntelliJ IDEA Git 操作指南

本指南說明如何使用 IntelliJ IDEA 的圖形化介面來操作 Git。每一節最後會標註對應的 CLI 指令。

---

## 事前設定

### 登入 GitHub 帳號

1. File → Settings（Windows）/ IntelliJ IDEA → Preferences（macOS）
2. 展開 **Version Control** → **GitHub**
3. 點 **+** → **Log In via GitHub**
4. 瀏覽器會打開授權頁面，同意後自動回到 IDEA

> 登入後才能直接在 IDEA 裡發 PR、瀏覽 PR。如果登入有問題，可以改用 GitHub 網頁版操作 PR。

---

## Clone 專案

1. 在 IDEA 歡迎畫面選擇 **Get from VCS**
2. 或從選單 File → New → **Project from Version Control**
3. 在 URL 欄位貼上 repository 的 HTTPS 網址
4. 選擇本機存放路徑
5. 按 **Clone**

IDEA 會自動下載專案並打開。

**對應指令：** `git clone <url>`

---

## Git 工具視窗 vs. Commit 工具視窗

IDEA 有兩個主要的 Git 相關視窗，初學者容易搞混：

### Git 工具視窗（Alt+9 / ⌘9）

顯示 **commit 歷史紀錄**的地方。你可以在這裡：
- 瀏覽過去所有的 commit
- 看每一筆 commit 改了哪些檔案
- 比較不同版本之間的差異
- 切換 branch

### Commit 工具視窗（Alt+0 / ⌘0）

**做新 commit** 的地方。你可以在這裡：
- 看到目前所有修改過但還沒 commit 的檔案
- 選擇要把哪些檔案加入這次 commit
- 寫 commit message
- 執行 Commit 或 Commit and Push

> **簡單記法：** Git 視窗看歷史，Commit 視窗做新的。

---

## Branch 操作

### 查看目前的 Branch

視窗**右下角**的狀態列會顯示目前的 branch 名稱，例如 `main` 或 `feat/alice-profile`。

### 建立新 Branch

1. 點擊右下角的 branch 名稱
2. 選擇 **New Branch**
3. 輸入 branch 名稱（例如 `feat/alice-profile`）
4. 勾選 **Checkout branch**（建立後直接切換）
5. 按 **Create**

**對應指令：** `git checkout -b feat/alice-profile`

### 切換 Branch

1. 點擊右下角的 branch 名稱
2. 在清單中找到目標 branch
3. 選擇 **Checkout**

**對應指令：** `git checkout main`

### 從選單操作

你也可以從選單 Git → **Branches**（或快捷鍵 Ctrl+Shift+` / ⌃⇧\`）開啟 Branches 彈出視窗。

---

## Commit 與 Push

### 只 Commit（存在本機）

1. 打開 Commit 工具視窗（Alt+0 / ⌘0）
2. 勾選要加入的檔案
3. 在訊息欄輸入 commit message
4. 按 **Commit**

**對應指令：**
```bash
git add <檔案>
git commit -m "訊息"
```

### Commit and Push（存到本機 + 上傳 GitHub）

步驟同上，但最後按 **Commit and Push** 按鈕（Commit 按鈕旁邊的下拉箭頭）。

這等於一次做了 commit + push 兩件事。

**對應指令：**
```bash
git add <檔案>
git commit -m "訊息"
git push origin <branch 名稱>
```

### 只 Push（之前已 commit）

選單 Git → **Push**（Ctrl+Shift+K / ⌘⇧K）

**對應指令：** `git push origin <branch 名稱>`

---

## Update Project（拉取最新修改）

當組長或其他組員在 GitHub 上更新了程式碼，你需要把最新的修改拉到本機。

1. 選單 Git → **Update Project**（Ctrl+T / ⌘T）
2. 在對話框中選擇 **Merge**（建議初學者用 Merge）
3. 按 **OK**

**Merge vs. Rebase 的差別：**
- **Merge**：會產生一筆合併 commit，歷史紀錄比較清楚，適合初學者
- **Rebase**：會把你的 commit 接在最新的後面，歷史比較乾淨，但操作錯了比較難救

> **建議：** workshop 中請選 **Merge**，先學會概念，之後再研究 Rebase。

**對應指令：** `git pull origin main`（預設是 merge）

---

## 三方合併檢視器（解決衝突）

這是 IDEA 操作 Git 最強大的功能，也是這堂課的核心體驗。

### 什麼時候會出現？

當你執行 Update Project 或 Merge，而且你修改的地方別人也改了，IDEA 會彈出 **Conflicts** 對話框。

### 操作步驟

1. 在 Conflicts 對話框中，會列出所有有衝突的檔案
2. 選擇一個檔案，點 **Merge**（不要按 Accept Yours 或 Accept Theirs，除非你確定只要其中一邊）
3. 三方合併檢視器會打開

### 畫面說明

檢視器分成三欄：

| 位置 | 內容 | 代表什麼 |
|------|------|---------|
| **左邊** | 你的版本 | 你在自己 branch 上做的修改 |
| **右邊** | 對方的版本 | `main`（或其他 branch）上已經存在的修改 |
| **中間** | 合併結果 | 最終要保留的完整內容 |

### 處理每一個衝突區段

衝突的地方會用紅色或黃色標示。對於每一個衝突區段，你有三個選擇：

1. **Accept Left**（`>>` 箭頭）：把你的版本放進中間的結果
2. **Accept Right**（`<<` 箭頭）：把對方的版本放進中間的結果
3. **手動編輯**：直接在中間欄位打字，結合兩邊的內容

### 常見情境

**情境 A：你和對方改了不同的東西，但在同一個區域**
→ 兩邊都 Accept，或手動把兩邊的內容都寫進去

**情境 B：你和對方改了同一行**
→ 和隊友討論要保留哪一邊，或寫一個新的版本

**情境 C：只有一邊有修改**
→ Accept 有修改的那一邊

### 完成合併

1. 確認中間欄位的內容是你想要的最終結果
2. 按 **Apply**
3. IDEA 會自動建立一筆 merge commit

> **重要：** 處理衝突時不要慌張。仔細看左右兩邊的差異，和隊友討論，再決定中間要放什麼。

**對應的 CLI 操作：**
```bash
# 手動編輯檔案，找到衝突標記並修改
# <<<<<<< HEAD
# 你的版本
# =======
# 對方的版本
# >>>>>>> branch-name

# 刪掉所有標記，保留正確的內容，然後：
git add <檔案>
git commit -m "Resolve merge conflict"
```

---

## 送 Pull Request

### 方法一：在 IDEA 中操作

1. 確認你已經在 Settings → Version Control → GitHub 登入
2. Push 你的 branch 之後
3. 選單 Git → GitHub → **Create Pull Request**
4. 選擇 base branch（通常是 `main`）
5. 填寫標題和說明
6. 按 **Create Pull Request**

### 方法二：在 GitHub 網頁操作（保險方案）

如果 IDEA 的 GitHub 整合有問題，可以直接在網頁上操作：

1. 打開 GitHub 上 repository 的頁面
2. 如果剛 push 過，頁面上方會出現黃色提示條，點 **Compare & pull request**
3. 如果沒有提示條，點 **Pull requests** 分頁 → **New pull request**
4. 選擇 base 和 compare branch
5. 填寫標題、說明、完成檢查清單
6. 按 **Create pull request**

> **建議：** 如果是第一次用 IDEA 送 PR，可以先用網頁版確保萬無一失。IDEA 的 PR 功能在登入順利的情況下很方便，但登入問題有時候會在現場卡住。

### 查看 PR 狀態

- IDEA：Git 工具視窗 → **Pull Requests** 分頁
- 網頁：直接在 GitHub repository 的 Pull requests 分頁查看

**對應指令：** CLI 沒有內建的 PR 指令，需要使用 `gh pr create`（GitHub CLI）或直接在網頁操作。
