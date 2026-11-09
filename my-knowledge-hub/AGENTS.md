# Agent Project Rules & System Instructions

本文件為本專案的核心開發與擴充規範。所有參與本專案開發、頁面生成或內容維護的 AI Agent 必須嚴格遵守以下規則。

## 1. 專案目的 (Project Purpose)
本專案為一個靜態模組化的水利工程與機器學習技術知識庫 (Hydraulics & ML Knowledge Hub)。

## 2. 網頁整體風格 (Design & Aesthetics)
- 主配色：Slate 900 (`#0F172A`)、Sky 600 (`#0284C7`)、Background (`#F8FAFC`)
- 字體：無襯線字體搭配 Mono 程式碼等寬字體
- 樣式：圓角卡片邊框 (`border border-slate-200 shadow-sm`)

## 3. 檔案命名與放置規範
- 所有內容放置於 `content/` 資料夾下的 `.md` 檔案
- 目錄註冊必須寫入 `src/js/app.js` 的 `articlesIndex` 陣列
- 檔案與資料夾名稱一律採用 `kebab-case`
