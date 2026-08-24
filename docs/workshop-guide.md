# Git 多人協作 Workshop — 學員指南

> 你們這一組的代號由講師現場指定，以下範例以 Team A 示意，請自行替換成你們的代號。

## 事前準備

在課程開始前，請確認你已經完成：

- [ ] 註冊 [GitHub 帳號](https://github.com)
- [ ] 安裝 [IntelliJ IDEA](https://www.jetbrains.com/idea/)（Community 版即可）
- [ ] 安裝 [Git](https://git-scm.com)
- [ ] 在 IDEA 中登入 GitHub 帳號（File → Settings → Version Control → GitHub）

---

## 第一階段：加入專案

### 任務 1：Clone 組長的 Fork

你的組長已經 fork 了一份專案，你需要把它下載到自己的電腦。

**【IDEA 操作】**
1. 開啟 IDEA，在歡迎畫面選擇 **Get from VCS**（或 File → New → Project from Version Control）
2. 在 URL 欄位貼上組長 fork 的網址，例如 `https://github.com/<組長帳號>/project-1151-1.git`
3. 選擇要存放的本機路徑
4. 按 **Clone**

**【對應的指令】**
```bash
git clone https://github.com/<組長帳號>/project-1151-1.git
cd project-1151-1
```

**【發生了什麼】**
你把遠端 repository 的完整複本下載到了本機。現在你的電腦上有一份和組長 fork 一模一樣的專案。

---

### 任務 2：建立你自己的 Branch

在修改任何檔案之前，先建立一條屬於你的 branch。這樣你的修改不會影響到 `main`，也不會和其他組員的修改衝突。

**【IDEA 操作】**
1. 看視窗右下角的狀態列，會顯示目前的 branch 名稱（應該是 `main`）
2. 點擊它，選擇 **New Branch**
3. 輸入名稱，例如 `feat/alice-profile`（用你自己的名字）
4. 確認勾選 **Checkout branch**，然後按 **Create**

**【對應的指令】**
```bash
git checkout -b feat/alice-profile
```

**【發生了什麼】**
你建立了一條新的分支，並且已經切換到上面了。從現在開始你的修改都會記錄在這條 branch 上，不會影響 `main`。

---

## 第二階段：填寫你的個人資料

### 任務 3：建立你的個人資料檔

**【操作步驟】**
1. 在 IDEA 的專案視窗中，展開 `data/members/` 資料夾
2. 找到 `_template.md`，按右鍵選擇 **Copy**（Ctrl+C）
3. 在同一個 `members/` 資料夾上按右鍵，選擇 **Paste**（Ctrl+V）
4. 在彈出的對話框中把檔名改成你的英文名，例如 `alice.md`（全小寫，不要留底線開頭）
5. 打開這個檔案，把所有 TODO 的地方改成你的資料

**注意**：不要動 `#` 和 `##` 標題的格式，只改標題底下的文字內容。

**【修改後的範例】**
```markdown
# Alice Chen

## 系所

資訊工程學系

## 年級

三年級

## 興趣

Web 開發 / 雲端技術

## GitHub

alice-chen
```

---

### 任務 4：把修改存成一個版本

你剛剛新增了一個檔案，但這個修改還沒有被記錄下來。接下來要把它「commit」成一個版本。

**【IDEA 操作】**
1. 打開 Commit 工具視窗（Windows: Alt+0 / macOS: ⌘0），或從左側工具列點擊 **Commit**
2. 你會看到新增的 `alice.md` 出現在 **Unversioned Files** 區域
3. 勾選這個檔案（把它加入這次要提交的範圍）
4. 在下方的訊息欄輸入：`Add Alice's profile`
5. 按 **Commit** 按鈕

**【對應的指令】**
```bash
git add data/members/alice.md
git commit -m "Add Alice's profile"
```

**【發生了什麼】**
你的修改被記錄成了一個「commit」——可以想像成在歷史紀錄裡拍了一張快照。你隨時可以回到這張快照的狀態。

---

### 任務 5：把 Commit 推上 GitHub

目前你的 commit 只存在你的電腦上。要讓組長看到，你需要把它推到 GitHub。

**【IDEA 操作】**
1. 選單 Git → **Push**（Ctrl+Shift+K / ⌘⇧K）
2. 確認要 push 的 commit 是你剛剛做的那一筆
3. 按 **Push**

**【對應的指令】**
```bash
git push origin feat/alice-profile
```

**【發生了什麼】**
你的 branch 和上面的 commit 被上傳到了 GitHub。現在組長可以在 GitHub 上看到你的修改。

---

### 任務 6：發送 Pull Request 給組長

Push 之後，你需要告訴組長：「我的修改好了，請你檢查一下再合併。」這就是 Pull Request。

**【GitHub 網頁操作】**
1. 打開組長 fork 的 GitHub 頁面
2. 你會看到上方出現黃色提示：「`feat/alice-profile` had recent pushes — Compare & pull request」
3. 點擊 **Compare & pull request**
4. 確認 base 是 `main`，compare 是你的 branch
5. 填寫標題和說明，照著檢查清單逐項確認
6. 按 **Create pull request**

**【IDEA 操作】**（需要先在 Settings → Version Control → GitHub 登入）
1. 選單 Git → GitHub → **Create Pull Request**
2. 選擇 base branch 為 `main`
3. 填寫標題和說明
4. 按 **Create Pull Request**

**【發生了什麼】**
Pull Request 就像是在說「我想把我的修改合併到 main」的正式請求。組長可以在上面看到你改了什麼、留言提問、要求修改、或核准合併。

---

## 第三階段：協作編輯隊伍資料

### 任務 7：更新本機的程式碼

在開始編輯隊伍資料之前，先確保你的本機是最新的版本。

**【IDEA 操作】**
1. 先切換到 `main` branch（點右下角 branch 名稱 → 選 `main` → **Checkout**）
2. 選單 Git → **Update Project**（Ctrl+T / ⌘T）
3. 在對話框中選 **Merge** 然後按 OK
4. 建立一條新的 branch，例如 `feat/team-info`

**【對應的指令】**
```bash
git checkout main
git pull origin main
git checkout -b feat/team-info
```

**【發生了什麼】**
你先切回 `main`，把組長已經合併的最新修改拉下來，然後再開一條新 branch 來做接下來的工作。

---

### 任務 8：編輯隊伍資料

**【操作步驟】**
1. 在專案視窗中展開 `data/teams/team-<你們的代號>/`
2. 打開 `team.md`
3. 根據講師的指示，修改指定的區段

講師會告訴你具體要改哪一個區段——請只改你被分配到的部分。

修改完成後，按照任務 4、5、6 的流程：commit → push → 發 PR。

---

## 第四階段：處理衝突

### 任務 9：遇到衝突了！

當兩個人同時修改了同一個地方，Git 無法自動判斷要保留誰的版本——這就是「衝突」。別緊張，這是完全正常的情況。

**【什麼時候會發生】**
當你嘗試 merge 或 pull 的時候，如果你改的地方別人也改了，Git 就會告訴你有衝突。

### 任務 10：在 IDEA 中解決衝突

**【IDEA 操作】**
1. 當 pull 或 merge 出現衝突時，IDEA 會彈出 **Conflicts** 對話框
2. 選擇有衝突的檔案，點 **Merge**
3. 你會看到**三方合併檢視器**：
   - **左邊**：你的版本（你在自己 branch 上的修改）
   - **右邊**：對方的版本（`main` 上已經有的修改）
   - **中間**：合併結果（最終要保留的內容）
4. 對於每一個衝突區段，你可以：
   - 點 **Accept Left**（`>>>`）：只保留你的版本
   - 點 **Accept Right**（`<<<`）：只保留對方的版本
   - **手動編輯中間的區域**：結合兩邊的修改
5. 所有衝突都處理完後，按 **Apply**

**【對應的指令】**（如果不用 IDEA 的合併工具）
```bash
# 衝突的檔案會長這樣：
<<<<<<< HEAD
你的版本的內容
=======
對方版本的內容
>>>>>>> main

# 手動編輯檔案，刪掉標記，保留你要的內容
# 然後：
git add <衝突的檔案>
git commit -m "Resolve merge conflict in team.md"
```

**【發生了什麼】**
Git 能處理技術上的合併，但不能替團隊做產品決策。當兩個人改了同一個地方，最終要保留什麼，只有人能決定。

---

## 第五階段：提交到上游

### 任務 11：組長向上游發送 Pull Request

> 這個任務由**組長**操作。

當所有組員的修改都合併到組長 fork 的 `main` 之後，組長要把成果送到上游的原始 repository。

**【GitHub 網頁操作】**
1. 打開組長自己的 fork 頁面
2. 點擊 **Contribute** → **Open pull request**
3. 確認：
   - base repository: `GDG-NTUST/project-1151-1`，branch: `main`
   - head repository: `<你的帳號>/project-1151-1`，branch: `main`
4. 填寫標題和說明
5. 按 **Create pull request**

**【發生了什麼】**
組長代表整組向上游發送 PR。講師會 review 並 merge，合併後 GitHub Actions 會自動建置網站。到投影幕前 reload 一下——你們這一組就會出現在網頁上了！
