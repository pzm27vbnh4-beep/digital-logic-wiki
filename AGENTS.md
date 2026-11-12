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
    ├── sequential/                  # 序向邏輯電路目錄
    └── tools/                       # 實用工具目錄
        └── circuit-builder.html     # Quartus 風格電路生成器
```
- **命名規則**：所有 HTML 檔案必須採用 `kebab-case`（如 `full-adder.html`）。

## 3. 視覺風格與 Design Tokens (`style.css`)
AI 必須嚴格使用以下 CSS 變數，禁止硬編碼顏色：
- `--bg-main: #0b1120;` (背景)
- `--bg-panel: #1e293b;` (面板背景)
- `--logic-high: #10b981;` (邏輯 `1` 狀態：螢光綠)
- `--logic-low: #475569;` (邏輯 `0` 狀態：暗岩灰)
- `--accent: #3b82f6;` (電光藍)

## 4. AI Agent 新增頁面之標準作業流程 (SOP)
當要求「請幫我新增 [某電路元件] 的頁面」時，AI 需：
1. **建立 HTML 檔案**：判斷分類，引入 `style.css` 與 `nav.js`。外層架構必須包含 `<aside id="sidebar-container" class="sidebar"></aside>` 與 `<main class="main-content">`。
2. **撰寫專屬邏輯**：使用 `.classList.toggle('high', val === 1)` 控制視覺。
3. **註冊導覽列**：於 `nav.js` 的 `WIKI_PAGES` 新增物件，全站即自動同步。

## 5. 【進階】Quartus 模擬器之元件擴充規範 (Extensibility Guide)
為了符合系統高度延伸可能性，若未來要求 AI 在 `circuit-builder.html` 中新增更多黑盒子元件（如 `XOR`, `NAND`, `D-FF`），AI 必須嚴格執行以下 3 個步驟：
1. **新增工具列按鈕**：在 HTML 的 `<div class="builder-toolbar">` 加入 `<button onclick="addNode('XOR')">+ XOR 閘</button>`。
2. **更新渲染邏輯 (UI)**：在 `renderNodes()` 中，依據新元件設定對應的輸入 (`in1`, `in2`) 與輸出 (`out`) 腳位。
3. **更新核心模擬引擎 (Logic)**：在 `evaluateLogic()` 函式的迴圈內，加入新元件的布林邏輯運算式，例如：
   ```javascript
   else if (node.type === 'XOR') node.state = (node.in1 !== node.in2) ? 1 : 0;
   else if (node.type === 'NAND') node.state = (!(node.in1 && node.in2)) ? 1 : 0;
   ```
只要遵守此規範，此電路模擬器即可無限擴充支援所有數位邏輯元件。
