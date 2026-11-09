// 1. 註冊技術文章索引目錄 (Kebab-case 命名與路徑)
const articlesIndex = [
    {
        id: 'density-current-outlet',
        title: '密度流多 Outlet 數據分析',
        category: 'hydraulics',
        path: 'content/hydraulics/density-current-outlet.md'
    },
    {
        id: 'qpesums-xgboost',
        title: 'QPESUMS 與 XGBoost 淹水預估',
        category: 'machine-learning',
        path: 'content/machine-learning/qpesums-xgboost.md'
    }
];

// 2. DOM 元素選取
const sidebarNav = document.getElementById('sidebar-nav');
const contentArea = document.getElementById('content-area');

// 3. 渲染側邊欄導覽選單
function renderSidebar() {
    sidebarNav.innerHTML = '';
    articlesIndex.forEach(article => {
        const link = document.createElement('a');
        link.href = `#${article.id}`;
        link.className = "block px-3 py-2 rounded-md text-slate-600 hover:text-sky-600 hover:bg-slate-50 transition font-medium";
        link.textContent = article.title;
        link.addEventListener('click', (e) => {
            e.preventDefault();
            loadArticle(article);
        });
        sidebarNav.appendChild(link);
    });
}

// 4. 非同步載入 Markdown 檔案並渲染到主頁面
async function loadArticle(article) {
    try {
        contentArea.innerHTML = '<p class="text-slate-400 animate-pulse">文章載入中...</p>';
        
        // 異步 Fetch 讀取 Markdown 內容
        const response = await fetch(article.path);
        if (!response.ok) {
            throw new Error(`無法載入此文章 (${response.status})`);
        }
        const markdownText = await response.text();
        
        // 使用 marked.js 將 Markdown 轉換為 HTML 並渲染
        contentArea.innerHTML = marked.parse(markdownText);
        
        // 更新網頁 Hash 與側邊欄選單的高亮狀態
        window.location.hash = article.id;
        updateActiveLink(article.id);
    } catch (error) {
        contentArea.innerHTML = `
            <div class="bg-red-50 text-red-700 p-4 rounded-md border border-red-200">
                <h4 class="font-bold">載入失敗</h4>
                <p class="text-sm">${error.message}</p>
            </div>
        `;
    }
}

// 5. 更新側邊欄目前選取項目的視覺高亮樣式
function updateActiveLink(activeId) {
    const links = sidebarNav.querySelectorAll('a');
    links.forEach((link, idx) => {
        const article = articlesIndex[idx];
        if (article.id === activeId) {
            link.className = "block px-3 py-2 rounded-md text-sky-600 bg-sky-50 font-semibold border-l-2 border-sky-500";
        } else {
            link.className = "block px-3 py-2 rounded-md text-slate-600 hover:text-sky-600 hover:bg-slate-50 transition font-medium";
        }
    });
}

// 6. 初始化載入流程
function init() {
    renderSidebar();
    
    // 根據網址 Hash 決定預設載入哪一篇文章，否則預設載入第一篇
    const currentHash = window.location.hash.replace('#', '');
    const matchedArticle = articlesIndex.find(a => a.id === currentHash);
    
    if (matchedArticle) {
        loadArticle(matchedArticle);
    } else if (articlesIndex.length > 0) {
        loadArticle(articlesIndex[0]);
    }
}

// 當網頁 DOM 載入完畢後啟動
document.addEventListener('DOMContentLoaded', init);
