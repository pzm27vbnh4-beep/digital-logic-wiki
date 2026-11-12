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
        └── circuit-builder.html     # 範例：自訂電路圖生成器
```
- **命名規則**：所有 HTML 檔案必須採用 `kebab-case`（小寫英文加連字號，如 `full-adder.html`, `d-flipflop.html`）。
- **分類規則**：
  - 無記憶性、輸出僅與當前輸入有關之電路，歸類於 `pages/combinational/`。
  - 具記憶性、含時脈 (Clock) 或狀態回授之電路，歸類於 `pages/sequential/`。
  - 特殊實用工具或產生器，歸類於 `pages/tools/`。

## 3. 視覺風格與 Design Tokens (`style.css`)
AI 在撰寫任何內嵌樣式或操作 DOM 狀態時，必須嚴格使用以下 CSS 變數，禁止硬編碼 (Hardcode) 顏色碼：
- `--bg-main: #0b1120;` (深邃科技藍背景)
- `--bg-panel: #1e293b;` (內容面板背景)
- `--text-main: #f8fafc;` (主要文字)
- `--text-muted: #94a3b8;` (次要說明文字)
- `--logic-high: #10b981;` (邏輯 `1` / High 狀態：翡翠螢光綠)
- `--logic-low: #475569;` (邏輯 `0` / Low 狀態：暗岩灰)
- `--accent: #3b82f6;` (時脈訊號 / 互動主色：電光藍)

## 4. 標準頁面結構 (Page Anatomy)
每一個位於 `/pages/{category}/` 下的子頁面，必須嚴格包含以下 5 個標準區塊（依序排列）：
1. **Header 標題區**：包含分類徽章 (`.badge`)、元件中英文名稱 (`<h1>`) 與核心功能簡介 (`.subtitle`)。
2. **Section 1 - 互動邏輯模擬器 (`.simulator-box`)**：
   - 包含輸入端切換按鈕 (`.pin-btn`)、電路視覺狀態顯示區、以及輸出端指示燈 (`.led-indicator`)。
   - 當輸入改變時，必須即時更新輸出，並連動高亮下方真值表的對應列 (`.active-row`)。
3. **Section 2 - 動態真值表 / 特性表 (`.truth-table`)**：
   - 每一列 (`<tr>`) 必須綁定 `id="row-{index}"`，以便模擬器透過 JS 即時高亮當前狀態所在的列。
4. **Section 3 - 硬體描述語言範例 (`.code-block`)**：
   - 提供該電路元件的標準 **Verilog HDL** 模組程式碼，並附上 `copyCode(this)` 一鍵複製按鈕。
5. **Section 4 - 隨堂觀念檢測 (`.quiz-box`)**：
   - 至少包含 1 題單選題，點擊選項按鈕呼叫 `checkQuiz(this, isCorrect, explanation)` 提供即時回饋。

## 5. AI Agent 新增頁面之標準作業流程 (SOP)
當使用者要求「請幫我新增 [某電路元件] 的頁面」時，AI 必須嚴格依照以下 3 步驟執行：

### Step 1：建立子頁面 HTML 檔案
- 判斷元件分類，於對應的子目錄下建立 `.html` 檔。
- 在 `<head>` 引入 `<link rel="stylesheet" href="../../style.css">`，並在 `<body>` 結尾引入 `<script src="../../nav.js"></script>`。
- 頁面外層架構必須為：
  ```html
  <div class="app-layout">
      <aside id="sidebar-container" class="sidebar"></aside>
      <main class="main-content">
          <!-- 放入上述第 4 點規定的 5 個標準區塊 -->
      </main>
  </div>
  ```

### Step 2：撰寫元件專屬互動邏輯 (`<script>`)
- 將該元件的布林代數或狀態轉移邏輯封裝於頁面底部的 `<script>` 中。
- 切換訊號 `0/1` 時，統一使用 `.classList.toggle('high', val === 1)` 控制視覺發光效果。

### Step 3：於 `nav.js` 註冊新頁面（自動同步全站）
- 打開根目錄的 `/nav.js`，在 `WIKI_PAGES` 陣列中新增一筆物件。
- **禁止手動修改其他 HTML 檔案的導覽列**：只要更新 `WIKI_PAGES`，全站的側邊欄、搜尋引擎與首頁卡片皆會自動更新。
