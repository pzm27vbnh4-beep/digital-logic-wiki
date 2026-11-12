/**
 * WIKI_PAGES 註冊表 (Single Source of Truth)
 * AI Agent 新增頁面時，只需在此陣列加入新物件，全站導覽與首頁卡片將自動更新。
 */
const WIKI_PAGES = [
    {
        id: "mux-4to1",
        title: "4對1 多工器 (4-to-1 MUX)",
        category: "combinational",
        categoryName: "組合邏輯 (Combinational)",
        path: "pages/combinational/mux-4to1.html",
        desc: "透過 2 條選擇線 (S1, S0)，從 4 個輸入通道中選擇 1 個訊號導通輸出。",
        tags: ["數據選擇", "MUX", "組合邏輯", "Verilog"]
    },
    {
        id: "jk-flipflop",
        title: "JK 正反器 (JK Flip-Flop)",
        category: "sequential",
        categoryName: "序向邏輯 (Sequential)",
        path: "pages/sequential/jk-flipflop.html",
        desc: "具備 Hold、Reset、Set 與 Toggle 反轉功能的時脈正緣觸發記憶元件。",
        tags: ["記憶元件", "Flip-Flop", "時脈觸發", "序向邏輯"]
    }
];

// 判斷目前所在路徑層級，自動修正相對路徑
function getRootPrefix() {
    return window.location.pathname.includes("/pages/") ? "../../" : "";
}

// 自動渲染左側導覽列
function renderSidebar() {
    const sidebar = document.getElementById("sidebar-container");
    if (!sidebar) return;
    const prefix = getRootPrefix();
    const currentPath = window.location.pathname;

    let html = `
        <a href="${prefix}index.html" class="brand-title">⚡ Digital Logic Wiki</a>
        <input type="text" id="sidebar-search" class="search-input" placeholder="🔍 搜尋邏輯元件或標籤..." oninput="filterSidebar(this.value)">
        <a href="${prefix}index.html" class="nav-link ${currentPath.endsWith('index.html') || currentPath.endsWith('/') ? 'active' : ''}">🏠 知識庫首頁</a>
    `;

    const categories = [
        { key: "combinational", label: "組合邏輯 (Combinational)" },
        { key: "sequential", label: "序向邏輯 (Sequential)" }
    ];

    categories.forEach(cat => {
        html += `<div class="nav-section-title">${cat.label}</div>`;
        const pages = WIKI_PAGES.filter(p => p.category === cat.key);
        pages.forEach(p => {
            const isActive = currentPath.includes(p.id) ? "active" : "";
            html += `<a href="${prefix}${p.path}" class="nav-link wiki-nav-item ${isActive}" data-search="${p.title.toLowerCase()} ${p.tags.join(' ').toLowerCase()}">${p.title}</a>`;
        });
    });

    sidebar.innerHTML = html;
}

// 側邊欄即時搜尋過濾
function filterSidebar(keyword) {
    const q = keyword.trim().toLowerCase();
    document.querySelectorAll(".wiki-nav-item").forEach(item => {
        const text = item.getAttribute("data-search");
        item.style.display = text.includes(q) ? "block" : "none";
    });
}

// 一鍵複製 Verilog 程式碼
function copyCode(btn) {
    const code = btn.parentElement.nextElementSibling.innerText;
    navigator.clipboard.writeText(code);
    const oldText = btn.innerText;
    btn.innerText = "✅ 已複製！";
    setTimeout(() => btn.innerText = oldText, 1500);
}

// 隨堂測驗互動回饋
function checkQuiz(btn, isCorrect, explanation) {
    const box = btn.closest(".quiz-box");
    const feedback = box.querySelector(".quiz-feedback");
    feedback.style.display = "block";
    if (isCorrect) {
        feedback.style.backgroundColor = "rgba(16, 185, 129, 0.2)";
        feedback.style.color = "#6ee7b7";
        feedback.innerHTML = "✅ 答對了！ " + explanation;
    } else {
        feedback.style.backgroundColor = "rgba(239, 68, 68, 0.2)";
        feedback.style.color = "#fca5a5";
        feedback.innerHTML = "❌ 再想一下！ " + explanation;
    }
}

document.addEventListener("DOMContentLoaded", renderSidebar);
