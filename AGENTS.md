# Digital Logic Interactive Wiki - AI Agent 開發與擴充規範 (AGENTS.md)

## 1. 專案目標與核心精神
本專案為「數位邏輯設計 (Digital Logic Design)」互動式教學知識庫。
核心設計哲學為 **「資料與視圖分離、單一事實來源 (Single Source of Truth)」**。所有頁面共享統一的視覺規範 (`style.css`) 與自動化導覽系統 (`nav.js`)，讓 AI Agent 在新增電路教學頁面時，無須逐一修改舊頁面的導覽連結，即可完成全站擴充。

## 2. 目錄結構與命名規範
```text
/
├── AGENTS.md                        # AI 開發準則與擴充 SOP（本文件）
├── index.html                       # 知識庫首頁（自動讀取 nav.js 渲染卡片與搜尋）
├── style.css                        # 全域 Design Tokens 與標準元件樣式
├── nav.js                           # 頁面註冊表 (WIKI_PAGES) 與共用功能引擎
└── pages/
    ├── combinational/               # 組合邏輯電路目錄
    │   └── mux-4to1.html            # 範例：4對1多工器
    ├── sequential/                  # 序向邏輯電路目錄
    │   └── jk-flipflop.html         # 範例：JK正反器
    └── tools/                       # 實用工具目錄
        └── circuit-builder.html     # 範例：自訂電路圖生成器 (Quartus-like Node Editor)
```
- **命名規則**：所有 HTML 檔案必須採用 `kebab-case`。
- **分類規則**：組合邏輯、序向邏輯、實用工具。

## 3. 視覺風格與 Design Tokens (`style.css`)
AI 必須嚴格使用以下 CSS 變數：
- `--bg-main: #0b1120;` (深邃科技藍背景)
- `--bg-panel: #1e293b;` (內容面板背景)
- `--text-main: #f8fafc;` (主要文字)
- `--logic-high: #10b981;` (邏輯 `1` / High 狀態：翡翠螢光綠)
- `--logic-low: #475569;` (邏輯 `0` / Low 狀態：暗岩灰)
- `--accent: #3b82f6;` (電光藍)

## 4. 標準頁面結構 (Page Anatomy)
每一個子頁面，必須包含：
1. **Header 標題區**
2. **Section 1 - 互動邏輯模擬器 (`.simulator-box`)**
3. **Section 2 - 動態真值表 / 特性表 (`.truth-table`)**
4. **Section 3 - 硬體描述語言範例 (`.code-block`)**
5. **Section 4 - 隨堂觀念檢測 (`.quiz-box`)**

## 5. AI Agent 新增頁面之標準作業流程 (SOP)
當使用者要求「請幫我新增 [某電路元件] 的頁面」時，AI 必須嚴格依照以下 3 步驟執行：

### Step 1：建立子頁面 HTML 檔案
- 判斷分類建立檔案。引入 `style.css` 與 `nav.js`。外層架構必須包含 `<aside id="sidebar-container" class="sidebar"></aside>` 與 `<main class="main-content">`。

### Step 2：撰寫元件專屬互動邏輯 (`<script>`)
- 統一使用 `.classList.toggle('high', val === 1)` 控制視覺發光效果。

### Step 3：於 `nav.js` 註冊新頁面（自動同步全站）
- 在 `WIKI_PAGES` 陣列中新增一筆物件，禁止手動修改其他 HTML 檔案的導覽列。
