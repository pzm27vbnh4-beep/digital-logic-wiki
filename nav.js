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
    },
    {
        id: "circuit-builder",
        title: "⚙️ Quartus 風格電路生成器",
        category: "tools",
        categoryName: "實用工具 (Tools)",
        path: "pages/tools/circuit-builder.html",
        desc: "自由手拉黑盒子與連線，即時模擬邏輯電路狀態。並具備 AI 擴充規範。",
        tags: ["工具", "拖曳設計", "Quartus", "電路模擬"]
    }
];
function getRootPrefix() { return window.location.pathname.includes("/pages/") ? "../../" : ""; }
function renderSidebar() {
    const sidebar = document.getElementById("sidebar-container");
    if (!sidebar) return;
    const prefix = getRootPrefix();
    const currentPath = window.location.pathname;
    let html = `
        <a href="${prefix}index.html" class="brand-title">⚡ Digital Logic Wiki</a>
        <input type="text" id="sidebar-search" class="search-input" placeholder="🔍 搜尋元件..." oninput="filterSidebar(this.value)">
        <a href="${prefix}index.html" class="nav-link ${currentPath.endsWith('index.html') || currentPath.endsWith('/') ? 'active' : ''}">🏠 知識庫首頁</a>
    `;
    const categories = [ { key: "combinational", label: "組合邏輯 (Combinational)" }, { key: "sequential", label: "序向邏輯 (Sequential)" }, { key: "tools", label: "實用工具 (Tools)" } ];
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
function filterSidebar(keyword) {
    const q = keyword.trim().toLowerCase();
    document.querySelectorAll(".wiki-nav-item").forEach(item => {
        const text = item.getAttribute("data-search");
        item.style.display = text.includes(q) ? "block" : "none";
    });
}
function copyCode(btn) {
    const code = btn.parentElement.nextElementSibling.innerText;
    navigator.clipboard.writeText(code);
    const oldText = btn.innerText;
    btn.innerText = "✅ 已複製！";
    setTimeout(() => btn.innerText = oldText, 1500);
}
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
