# Digital Logic Wiki - 專案開發指南

## 專案目的
這是一個用於展示「數位邏輯設計」互動教學元件的靜態知識庫網站。
目標是讓使用者能透過網頁，學習並操作各種數位電路（如邏輯閘、正反器、計數器）。

## 技術棧 (Tech Stack)
- HTML5 (語意化標籤)
- CSS3 (Vanilla CSS，不使用 Tailwind 或 Bootstrap)
- Vanilla JavaScript (直接寫在 HTML 檔案的 `<script>` 中)

## 網站視覺與風格指南 (UI/UX Guidelines)
- **主題顏色 (Dark Mode 為主)**：
  - 背景色 (`--bg-color`)：`#0f172a` (深藍灰)
  - 面板背景 (`--panel-bg`)：`#1e293b`
  - 主要文字 (`--text-main`)：`#f8fafc`
  - High 訊號/強調色 (`--high-color`)：`#4ade80` (螢光綠)
  - Low 訊號/次要文字 (`--low-color`)：`#64748b` (暗灰色)
- **排版原則**：所有內容須置中對齊，並使用 Flexbox 進行版面配置。卡片與面板需有 `border-radius: 12px` 與陰影。

## 檔案結構與命名規則
- **首頁**：`/index.html` (包含所有子頁面的導覽卡片)。
- **共用樣式**：`/style.css` (存放 CSS 變數與全域設定)。
- **內容頁面**：所有新的邏輯元件頁面必須存放在 `/pages/` 資料夾下。
- **命名規則**：HTML 檔案必須使用 Kebab-case (例如 `multiplexer.html`, `ripple-counter.html`)。

## AI 擴充內容標準作業流程 (SOP)
當使用者要求「新增一個新的邏輯元件頁面」時，AI 必須嚴格遵守以下步驟：
1. **建立新檔案**：在 `/pages/` 目錄下建立對應的 HTML 檔案。
2. **引入共用資源**：在 `<head>` 中必須透過 `<link rel="stylesheet" href="../style.css">` 引入共用樣式。
3. **頁面結構要求**：
   - 必須包含一個 `<h1>` 標題（標註元件名稱）。
   - 必須包含一段 `<p class="desc">` 說明文字。
   - 必須包含 `<div class="interactive-area">` 供使用者操作的互動 UI（按鈕、開關）。
   - 必須包含 `<table class="truth-table">` 顯示該元件的真值表。
4. **互動邏輯**：JavaScript 必須寫在該 HTML 檔案底部的 `<script>` 標籤內，並負責處理 UI 狀態切換與訊號顏色 (`high-color` / `low-color`) 的渲染。
5. **更新首頁**：完成子頁面後，AI 必須主動修改 `/index.html`，在導覽區塊中加入指向該新頁面的連結卡片。