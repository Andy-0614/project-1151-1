# GDG on Campus NTUST — Git 多人協作 Workshop

這是 GDG on Campus NTUST 舉辦的 Git 多人協作 workshop 種子專案。學員透過編輯 `data/` 底下的 Markdown 檔案來練習 Git 的基本操作與多人協作流程，每一次合併都會讓網站即時長出新的內容。

> **學員只需要編輯 `data/` 資料夾底下的 `.md` 檔案，不需要碰任何 HTML、CSS 或 JavaScript。**

## 目錄結構

```
data/              ← 學員編輯的資料檔
  members/         ← 個人資料（每人一個 .md）
  teams/           ← 各組資料（每組一個資料夾）
scripts/           ← 建置與驗證腳本
site/              ← 網站模板與樣式
docs/              ← 教學文件
.github/workflows/ ← CI/CD 自動化
```

## 課前準備：初始化隊伍

講師在課程當天依到場人數決定組數後執行：

```bash
# 方式一：指定組數（自動產生 Team A 到 Team E）
node scripts/init-teams.mjs 5

# 方式二：明確指定代號
node scripts/init-teams.mjs a b c d e
```

執行後 commit 並 push 到 `main`：

```bash
git add data/teams/
git commit -m "Initialize teams"
git push origin main
```

GitHub Actions 會自動建置並部署到 GitHub Pages，投影幕上會出現對應數量的灰色卡片。

> **重要：** 必須先完成隊伍初始化並 push，確認 GitHub Pages 更新後，才請各組組長 fork。否則組長的 fork 裡不會有隊伍資料夾。

## 組長操作流程

1. **Fork** 這個 repository 到自己的帳號
2. 在 fork 的 Settings → Pages 啟用 GitHub Pages（Source 選 GitHub Actions）
3. 把組員加為 fork 的 **Collaborator**（Settings → Collaborators）
4. 組員在組長的 fork 上開 branch、編輯檔案、發 PR
5. 組長 Review 並 Merge 組員的 PR
6. 全部完成後，組長從自己的 fork 發 PR 到上游的 `main`

## 本機預覽

不需要安裝任何套件，只要有 Node.js 20 以上：

```bash
node scripts/build.mjs
```

然後用瀏覽器打開 `dist/index.html` 即可預覽。

## 驗證資料

```bash
node scripts/validate.mjs
```

會檢查資料檔格式、衝突標記、成員引用等問題。

## 相關文件

- [學員指南](docs/workshop-guide.md) — 課程中跟著做的任務清單
- [IDEA 操作指南](docs/idea-guide.md) — IntelliJ IDEA 的圖形化 Git 操作
- [指令速查表](docs/cheatsheet.md) — 情境 → IDEA 操作 → CLI 指令 對照
- [講師流程表](docs/instructor/run-of-show.md) — 90 分鐘時間表
- [衝突腳本](docs/instructor/conflict-script.md) — 刻意製造衝突的教學劇本
- [貢獻指南](CONTRIBUTING.md) — 資料格式與 commit 規範

1
