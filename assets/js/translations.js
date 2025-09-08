document.addEventListener('DOMContentLoaded', () => {
    const languageSwitcher = document.getElementById('lang-switcher');
    let currentLang = localStorage.getItem('lang') || 'ru'; // Русский по умолчанию

    // Функция для загрузки и применения переводов
    async function setLanguage(lang) {
        try {
            const response = await fetch(`assets/lang/${lang}.json`);
            if (!response.ok) {
                console.error(`Could not load ${lang}.json`);
                return;
            }
            const translations = await response.json();

            document.querySelectorAll('[data-key]').forEach(element => {
                const key = element.getAttribute('data-key');
                if (translations[key]) {
                    element.innerHTML = translations[key];
                }
            });
            
            // Обновляем атрибут lang у тега html
            document.documentElement.lang = lang;
            
            // Обновляем текст кнопки
            languageSwitcher.textContent = lang.toUpperCase();
            
            // Сохраняем выбор пользователя
            localStorage.setItem('lang', lang);
            currentLang = lang;

        } catch (error) {
            console.error('Error loading or applying translations:', error);
        }
    }

    // Обработчик клика по кнопке
    languageSwitcher.addEventListener('click', () => {
        const newLang = currentLang === 'ru' ? 'en' : 'ru';
        setLanguage(newLang);
    });

    // Инициализация языка при загрузке страницы
    setLanguage(currentLang);
});