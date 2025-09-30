export function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');

    const userTheme = localStorage.getItem('theme');
    const systemTheme = window.matchMedia('(prefers-color-scheme: light)').matches;

    const applyTheme = (theme) => {
        if (theme === 'light') {
            document.body.setAttribute('data-theme', 'light');
            themeToggle.innerHTML = '<i class="bi bi-moon-stars-fill"></i>';
            localStorage.setItem('theme', 'light');
        } else {
            document.body.removeAttribute('data-theme');
            themeToggle.innerHTML = '<i class="bi bi-sun-fill"></i>';
            localStorage.setItem('theme', 'dark');
        }
    };

    // Aplica tema salvo ou do sistema na inicialização
    if (userTheme === 'light' || (!userTheme && systemTheme)) {
        applyTheme('light');
    } else {
        applyTheme('dark');
    }

    themeToggle.addEventListener('click', () => {
        const newTheme = document.body.getAttribute('data-theme') ? 'dark' : 'light';
        applyTheme(newTheme);
    });
}