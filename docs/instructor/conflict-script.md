# 衝突演練腳本

本腳本刻意讓學員在同一個檔案的相同位置做出不同的修改，藉此製造 Git 衝突，讓他們體驗衝突解決的完整流程。

> 本腳本以「角色」描述，與組數、隊伍代號無關。講師現場將角色分配給任一組的成員即可。

---

## 角色分配

| 角色 | 負責修改的區段 | 目的 |
|------|--------------|------|
| 角色 1 | `## Slogan` | 與角色 2 衝突（同一個區段） |
| 角色 2 | `## Slogan` | 與角色 1 衝突（同一個區段） |
| 角色 3 | `## Team Name` | 不同區段，Git 自動合併 |
| 角色 4 | `## Introduction` | 不同區段，Git 自動合併 |

### 三人組的處理方式

如果某組只有三人，省略角色 4。由角色 3 同時修改 `## Team Name` 和 `## Introduction`。衝突仍然發生在角色 1 與角色 2 之間，核心體驗不受影響。

---

## 執行步驟

### 事前準備

確認這一組的 `team.md` 中 `## Slogan`、`## Team Name`、`## Introduction` 目前都有內容（不是 TODO）。如果還沒填，先讓組員快速填入任意內容並 merge 到 `main`。

### Step 1：所有人同步到最新狀態

請所有角色執行：

1. 切換到 `main` branch
2. Update Project（Ctrl+T / ⌘T）拉取最新修改

確認所有人的 `team.md` 內容一致。

### Step 2：所有人同時建立新 branch

- 角色 1：`feat/slogan-v1`
- 角色 2：`feat/slogan-v2`
- 角色 3：`feat/team-name`
- 角色 4：`feat/intro`（三人組省略）

### Step 3：分頭修改

**講師宣讀以下指令（或投影指令卡）：**

> **角色 1：** 請打開 `team.md`，把 `## Slogan` 底下的內容改成你想到的第一句隊呼，然後 commit 並 push。

> **角色 2：** 請打開 `team.md`，把 `## Slogan` 底下的內容改成**不一樣**的一句隊呼，然後 commit 並 push。

> **角色 3：** 請打開 `team.md`，把 `## Team Name` 底下的內容改成一個新的隊名，然後 commit 並 push。

> **角色 4：** 請打開 `team.md`，把 `## Introduction` 底下的內容改成新的隊伍介紹，然後 commit 並 push。

### Step 4：依序合併，製造衝突

請組長按照以下順序操作：

1. **先 merge 角色 1 的 PR** → 順利合併，沒有衝突
2. **再 merge 角色 3 的 PR** → 順利合併，Git 自動處理了（不同區段）
3. **再 merge 角色 4 的 PR**（如果有）→ 順利合併，Git 自動處理了
4. **最後 merge 角色 2 的 PR** → **衝突！**

> 講師在此暫停，引導全場觀察。

### Step 5：教學時刻

**講師台詞（建議）：**

「大家看到了嗎？角色 3 改了 Team Name、角色 4 改了 Introduction，跟角色 1 改的 Slogan 是不同區段——Git 看得出它們互不干擾，所以自動合併成功了。

但是角色 1 和角色 2 都改了同一行 Slogan——Git 不知道該保留哪一句。這不是 Git 的 bug，而是 Git 的設計。**Git 能處理技術上的合併，但不能替團隊做產品決策。** 到底要用哪句 Slogan？只有你們自己能決定。」

### Step 6：在 IDEA 中解決衝突

由角色 2（或組長）在 IDEA 中操作：

1. 切換到 `main` branch
2. 嘗試 merge 角色 2 的 branch（或讓角色 2 pull 最新的 `main`）
3. IDEA 彈出 Conflicts 對話框
4. 選擇 `team.md`，點 **Merge**
5. 三方合併檢視器打開：
   - 左邊：角色 2 的 slogan
   - 右邊：角色 1 的 slogan（已在 `main` 上）
   - 中間：空白，等待決定
6. 跟隊友討論後，在中間欄位輸入最終版本的 slogan
7. 按 **Apply**
8. Commit 並 push

---

## 角色指令卡

以下內容可直接列印或投影，發給每位學員。

---

### 角色 1 指令卡

```
你的任務：修改 Slogan

1. 確認你在 main branch 上，執行 Update Project
2. 建立新 branch：feat/slogan-v1
3. 打開 data/teams/team-<代號>/team.md
4. 把「## Slogan」底下的內容改成你想到的一句隊呼
5. Commit（訊息：Update slogan）
6. Push
7. 發 PR 給組長
```

---

### 角色 2 指令卡

```
你的任務：修改 Slogan（會跟角色 1 衝突！）

1. 確認你在 main branch 上，執行 Update Project
2. 建立新 branch：feat/slogan-v2
3. 打開 data/teams/team-<代號>/team.md
4. 把「## Slogan」底下的內容改成【不一樣的】一句隊呼
5. Commit（訊息：Update slogan）
6. Push
7. 發 PR 給組長
8. ⚠ 你的 PR 會有衝突——這是故意的！等講師指示再處理。
```

---

### 角色 3 指令卡

```
你的任務：修改 Team Name

1. 確認你在 main branch 上，執行 Update Project
2. 建立新 branch：feat/team-name
3. 打開 data/teams/team-<代號>/team.md
4. 把「## Team Name」底下的內容改成新的隊名
5. Commit（訊息：Update team name）
6. Push
7. 發 PR 給組長
```

---

### 角色 4 指令卡（四人組專用）

```
你的任務：修改 Introduction

1. 確認你在 main branch 上，執行 Update Project
2. 建立新 branch：feat/intro
3. 打開 data/teams/team-<代號>/team.md
4. 把「## Introduction」底下的內容改成新的隊伍介紹
5. Commit（訊息：Update introduction）
6. Push
7. 發 PR 給組長
```

---

## 衝突解決後的驗證

解決衝突並 push 之後，執行本機驗證：

```bash
node scripts/validate.mjs
```

確認沒有殘留衝突標記（`<<<<<<<`、`=======`、`>>>>>>>`）。這是現場最常見的災難——學員把衝突標記直接 commit 上去。validate 腳本會攔住這種情況。
