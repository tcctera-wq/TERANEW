const fs = require('fs');
const path = require('path');

const indexFile = path.resolve(__dirname, 'index.html');
const scriptFile = path.resolve(__dirname, 'script.js');
const inputFile = path.resolve(__dirname, 'input.css');

// 1. Update index.html
let html = fs.readFileSync(indexFile, 'utf8');

// Replace classes
html = html.replace(/\btext-white\b/g, 'text-gray-900 dark:text-white');
html = html.replace(/\btext-gray-100\b/g, 'text-gray-600 dark:text-gray-100');
html = html.replace(/\btext-gray-200\b/g, 'text-gray-700 dark:text-gray-200');
html = html.replace(/\btext-gray-300\b/g, 'text-gray-500 dark:text-gray-300');
html = html.replace(/\bbg-black\/15\b/g, 'bg-black/5 dark:bg-white/10');
html = html.replace(/\bbg-white\/15\b/g, 'bg-black/10 dark:bg-white/15');
html = html.replace(/\bbg-black\/20\b/g, 'bg-white/80 dark:bg-black/50');
html = html.replace(/\bborder-white\/20\b/g, 'border-black/10 dark:border-white/20');
html = html.replace(/<strong class="text-\[#0d6fd3\]">absoluta<\/strong>\./g, '<strong class="text-[#0d6fd3]">absoluta</strong>.');

// Remove original body class to overwrite
html = html.replace(/<body[^>]*>/, '<body>');

// Insert the toggle button right after <body>
const toggleBtn = `
        <button id="theme-toggle" class="fixed top-4 right-4 z-[100] p-2.5 rounded-full glass transition-transform hover:scale-110" aria-label="Toggle Theme">
            <svg id="theme-icon-dark" class="w-5 h-5 hidden dark:block text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
            <svg id="theme-icon-light" class="w-5 h-5 block dark:hidden text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
        </button>`;

if (!html.includes('id="theme-toggle"')) {
    html = html.replace(/<body>/, `<body class="bg-gray-50 text-gray-900 dark:bg-black dark:text-gray-100 transition-colors duration-300">\n${toggleBtn}`);
}
// Update html class to handle dark mode manually
html = html.replace(/<html lang="en" class="scroll-smooth">/, '<html lang="en" class="scroll-smooth">');

fs.writeFileSync(indexFile, html);

// 2. Update script.js
let js = fs.readFileSync(scriptFile, 'utf8');
js = js.replace(/\bbg-white\/15\b/g, 'bg-black/10 dark:bg-white/15');
js = js.replace(/\bg-white text-gray-800\b/g, 'bg-blue-600 text-white dark:bg-white dark:text-gray-800');
js = js.replace(/\text-white\b/g, 'text-gray-900 dark:text-white');
js = js.replace(/\bhover:bg-white\/10\b/g, 'hover:bg-black/5 dark:hover:bg-white/10');

const themeLogic = `
// Theme Toggle Logic
const themeToggleBtn = document.getElementById('theme-toggle');
const htmlEl = document.documentElement;

// Initialize theme
if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    htmlEl.classList.add('dark');
} else {
    htmlEl.classList.remove('dark');
}

themeToggleBtn.addEventListener('click', () => {
    htmlEl.classList.toggle('dark');
    if (htmlEl.classList.contains('dark')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});
`;

if (!js.includes('Theme Toggle Logic')) {
    js += '\\n' + themeLogic;
}

fs.writeFileSync(scriptFile, js);

// 3. Update input.css
let css = fs.readFileSync(inputFile, 'utf8');
if (!css.includes('@custom-variant dark')) {
    css = css.replace(/@theme \{/, '@custom-variant dark (&:where(.dark, .dark *));\\n\\n@theme {');
}

css = css.replace(/body \{[\\s\\S]*?\}/, 'body {\\n    @apply text-sm antialiased transition-colors duration-300;\\n}');
css = css.replace(/\\.glass \{[\\s\\S]*?\}/, '.glass {\\n        @apply bg-black/5 border border-black/10 dark:bg-white/10 dark:border-white/20 backdrop-blur-md;\\n    }');
css = css.replace(/\\.btn \{[\\s\\S]*?\}/, '.btn {\\n        @apply cursor-pointer rounded-full px-8 py-2.5 font-medium transition hover:opacity-90 active:scale-98;\\n    }');

fs.writeFileSync(inputFile, css);

console.log('Update complete!');
