# 貢獻指南

## 你需要編輯的檔案

學員只需要編輯 `data/` 底下的 Markdown 檔案：

- **個人資料**：`data/members/<你的英文名>.md`
- **隊伍資料**：`data/teams/team-<代號>/team.md`

不需要修改任何 HTML、CSS 或 JavaScript 檔案。

## 個人資料檔格式

檔案位置：`data/members/<你的英文名>.md`

檔名規則：
- 全部小寫英文字母
- 可用連字號（`-`）分隔，例如 `wang-ming.md`
- 不可使用中文、空格、底線或大寫

範例：

```markdown
# 王小明

## 系所

資訊工程學系

## 年級

三年級

## 興趣

Web 開發 / 機器學習

## GitHub

xiaoming-wang
```

## 隊伍資料檔格式

檔案位置：`data/teams/team-<代號>/team.md`

```markdown
# Team A

## Team Name

超級程式戰隊

## Slogan

Code like there's no tomorrow!

## Introduction

我們是一群熱愛寫程式的學生，這是我們第一次學 Git！

## Members

- alice
- bob
- charlie
```

`## Members` 底下每一行列出一位組員的**檔案名稱**（不含 `.md`），必須對應到 `data/members/` 底下的檔案。

## Branch 命名慣例

建立 branch 時請遵循以下格式：

```
feat/<描述>
```

範例：
- `feat/alice-profile` — 新增 Alice 的個人資料
- `feat/team-info` — 編輯隊伍資訊

## Commit Message 慣例

一個好的 commit message 要能讓人**不看 diff 就知道你做了什麼**。

### 好的範例

```
Add Alice's profile
```

```
Update Team A slogan and introduction
```

```
Add member list to Team A
```

### 不好的範例

| 訊息 | 為什麼不好 |
|------|-----------|
| `update` | 更新了什麼？每個 commit 都是 update |
| `fix` | 修了什麼？ |
| `done` | 什麼 done 了？ |
| `final` | 真的是 final 嗎？ |
| `真的final` | ... |
| `aaa` | 你未來的自己會感謝你多打幾個字 |
| `.` | 這不是 commit message |

### 原則

1. **用英文**，以動詞原形開頭（`Add`、`Update`、`Fix`、`Remove`）
2. **說明做了什麼**，不要只寫一個動詞
3. **簡短但具體**，一行不超過 50 個字元
