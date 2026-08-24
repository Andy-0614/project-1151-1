# 講師流程表（Run of Show）

總時長：90 分鐘

---

## 課前 5 分鐘：建立隊伍

> ⚠ **以下步驟的順序不可顛倒。** 若組長在隊伍資料夾建立之前就 fork，他們的 fork 裡不會有自己的隊伍資料夾，會需要額外的同步操作，現場會很混亂。

1. 數到場人數，決定組數（每組 3 至 4 人）
2. 指定每組的組長
3. 在終端機執行：
   ```bash
   node scripts/init-teams.mjs <組數>
   ```
4. 確認輸出正確，然後 commit 並 push：
   ```bash
   git add data/teams/
   git commit -m "Initialize teams"
   git push origin main
   ```
5. 等待 GitHub Actions 跑完（約 30 秒），確認 GitHub Pages 已更新
6. 在投影幕上打開網頁，確認出現正確數量的灰色「⏳ 尚未提交」卡片
7. **確認以上全部完成後**，才口頭宣布隊伍代號，請各組組長開始 fork

> ⚠ **再次強調：** 絕對不要在步驟 6 之前讓組長 fork！

### 課前檢查清單

確認所有學員已完成以下事項：

- [ ] 有 GitHub 帳號並已登入
- [ ] 已安裝 IntelliJ IDEA（Community 版即可）
- [ ] 已安裝 Git
- [ ] 已在 IDEA 中登入 GitHub（File → Settings → Version Control → GitHub）
- [ ] 投影幕上可以正常顯示 GitHub Pages 網頁
- [ ] 講師電腦上已 clone 上游 repository 且 `node scripts/build.mjs` 可正常執行

---

## 0:00–0:10（10 分鐘）開場與環境確認

**目標：** 讓所有人知道今天要幹嘛、確認工具就緒。

**講師要做的事：**
- 自我介紹、說明今天的目標：「用 Git 協作完成一個網頁」
- 投影幕上展示目前的灰色卡片：「今天結束時，這些灰色卡片都會變成你們的作品」
- 確認所有人的 IDEA 和 GitHub 準備好了
- 公布組別與代號（Team A、Team B、...）
- 指定各組組長

**預期會卡住的地方：**
- 有人沒裝 IDEA → 先讓他們開始安裝，同時繼續上課
- 有人沒註冊 GitHub → 現場快速註冊
- IDEA 的 GitHub 登入失敗 → 先跳過，PR 改用網頁版

---

## 0:10–0:20（10 分鐘）組長設定 Fork

**目標：** 所有組長完成 fork 和基礎設定。

**講師要做的事：**
- 投影幕上示範 fork 流程
- 指導組長完成：
  1. Fork 上游 repository
  2. Settings → Collaborators → 加入組員
  3. Settings → Pages → Source 選 GitHub Actions
- 確認每位組長的 fork URL，寫在白板或公用頻道上讓組員看到

**預期會卡住的地方：**
- Collaborator 邀請需要組員帳號 → 請組員到 GitHub 個人頁面拿 username
- Pages 設定找不到 → 引導到正確的設定頁面

---

## 0:20–0:40（20 分鐘）個人資料任務（任務 1–6）

**目標：** 每位學員完成 clone → branch → commit → push → PR 的完整流程。

**講師要做的事：**
- 投影幕上示範任務 1 到 6
- 每個任務先示範 IDEA 操作，再提一下對應的 CLI 指令
- 在教室巡視，協助卡住的學員

**預期會卡住的地方：**
- Clone 的 URL 打錯 → 確認是組長 fork 的 URL，不是上游的
- Branch 名稱打錯或忘記切換 → 提醒看右下角狀態列
- Commit 之後忘記 Push → 提醒 commit 只存本機，要 push 才上傳
- PR 的 base branch 選錯 → 確認是組長 fork 的 `main`

**里程碑：** 每位學員都成功發出至少一個 PR。

---

## 0:40–0:55（15 分鐘）組長 Merge 與 Team 資料

**目標：** 組長練習 review 和 merge PR，組員開始編輯 team.md。

**講師要做的事：**
- 教組長如何在 GitHub 上 review PR（看 diff、留 comment、approve、merge）
- 組長 merge 所有組員的個人資料 PR
- 指示所有人 pull 最新的 `main`，然後開始編輯 `team.md`
- **此時先不要啟動衝突腳本**，讓大家先順利完成一次完整的協作循環

**預期會卡住的地方：**
- Merge 按鈕灰色 → 檢查是否有 CI 失敗或衝突
- 組員的 PR 有衝突（因為同時改了 team.md）→ 這正好是教學機會，但先讓組長處理簡單的

---

## 0:55–1:15（20 分鐘）衝突體驗

**目標：** 讓學員親身體驗 Git 衝突，並學會用 IDEA 的三方合併工具解決。

**講師要做的事：**
- 依照 [conflict-script.md](conflict-script.md) 分配角色
- 明確指示每個角色要改的內容
- 讓角色 1 先 push 並被 merge
- 角色 2 再 push 時會遇到衝突
- **在投影幕上示範三方合併檢視器的操作**
- 引導學員自己在 IDEA 中解決衝突
- 教學重點台詞：「看到了嗎？角色 3 和角色 4 改了不同的區段，Git 自動合併成功了。但角色 1 和角色 2 改了同一行，Git 不知道要保留哪一邊——這需要人來決定。」

**預期會卡住的地方：**
- 學員直接 commit 了衝突標記 → validate 腳本會攔下來，趁機教大家看 CI 結果
- 三方檢視器按成 Accept Theirs 把自己的改動弄丟了 → 沒關係，衝突可以重來
- 有人搞不清楚左邊右邊 → 耐心解釋，這是正常的

---

## 1:15–1:25（10 分鐘）組長提交到上游

**目標：** 每組組長把成果 PR 到上游 repository，講師 merge。

**講師要做的事：**
- 請各組組長確認 fork 的 `main` 上所有修改都已完成
- 組長從 fork 發 PR 到上游 `GDG-NTUST/project-1151-1` 的 `main`
- 講師在投影幕上**一組一組 merge**，每 merge 一組就 reload 網頁
- 網頁上的灰色卡片會一張一張「亮起來」——**這是全場的高潮**
- 進度指示從 `0 / N` 逐漸變成 `N / N`

**預期會卡住的地方：**
- 組長 PR 有衝突（兩組改了同名的 member 檔案）→ 不太可能發生但有可能，講師協助解決
- GitHub Actions 跑比較久 → 可以先 merge 下一組的 PR

---

## 1:25–1:30（5 分鐘）收尾與回顧

**目標：** 帶大家回顧今天學了什麼，給出後續學習方向。

**講師要做的事：**
- 展示最終的網頁：所有卡片都亮了
- 回顧今天的流程：clone → branch → commit → push → PR → review → merge → 衝突解決
- 強調 Git 的核心概念：版本控制是團隊協作的基礎設施
- 推薦後續學習資源：Git 官方文件、GitHub Skills
- 感謝大家參與

---

## 緊急備案

### 網路斷線
- 所有腳本都是離線可執行的，`node scripts/build.mjs` 不需要網路
- 可以在講師電腦上本機 build 後直接展示 `dist/index.html`
- Push / PR / merge 等操作暫停，等網路恢復

### GitHub Pages 沒有更新
- 到 repository 的 Actions 分頁確認 workflow 有沒有在跑
- 如果 workflow 失敗，看 log 找原因
- 備案：講師本機 build 後直接展示

### 學員電腦出問題
- 找同組已經 clone 成功的人幫忙看
- 最壞情況：兩人共用一台電腦，輪流操作
