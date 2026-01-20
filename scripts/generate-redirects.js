const fs = require('fs');
const path = require('path');

// Дані міст та інші дані
const citiesData = [
  { name: 'Одеса', slug: 'odesa', population: 1017699, isRegionalCenter: true },
  { name: 'Ізмаїл', slug: 'izmail', population: 72000, isRegionalCenter: false },
  { name: 'Чорноморськ', slug: 'chornomorsk', population: 60000, isRegionalCenter: false },
  { name: 'Білгород-Дністровський', slug: 'bilhorod-dnistrovskyi', population: 50000, isRegionalCenter: false },
  { name: 'Подільськ', slug: 'podilsk', population: 40000, isRegionalCenter: false },
  { name: 'Южне', slug: 'yuzhne', population: 32000, isRegionalCenter: false },
  { name: 'Балта', slug: 'balta', population: 19000, isRegionalCenter: false },
  { name: 'Роздільна', slug: 'rozdilna', population: 17900, isRegionalCenter: false },
  { name: 'Арциз', slug: 'artsyz', population: 14700, isRegionalCenter: false },
  { name: 'Рені', slug: 'reni', population: 18500, isRegionalCenter: false },
  { name: 'Кілія', slug: 'kiliia', population: 19800, isRegionalCenter: false },
  { name: 'Татарбунари', slug: 'tatarbunary', population: 10800, isRegionalCenter: false },
  { name: 'Березівка', slug: 'berezivka', population: 9600, isRegionalCenter: false },
  { name: 'Теплодар', slug: 'teplodar', population: 10000, isRegionalCenter: false },
  { name: 'Ананьїв', slug: 'ananiv', population: 8400, isRegionalCenter: false },
  { name: 'Болград', slug: 'bolhrad', population: 15000, isRegionalCenter: false },
  { name: 'Вилкове', slug: 'vylkove', population: 8000, isRegionalCenter: false },
  { name: 'Кодима', slug: 'kodyma', population: 8900, isRegionalCenter: false },
  { name: 'Овідіополь', slug: 'ovidiopol', population: 16800, isRegionalCenter: false },
  { name: 'Сарата', slug: 'sarata', population: 4900, isRegionalCenter: false },
  { name: 'Тарутине', slug: 'tarutyne', population: 5000, isRegionalCenter: false },
  { name: 'Затока', slug: 'zatoka', population: 1500, isRegionalCenter: false },
  { name: 'Сергіївка', slug: 'serhiivka', population: 5000, isRegionalCenter: false },
  { name: 'Лиманське', slug: 'lymanske', population: 7000, isRegionalCenter: false },
  { name: 'Великодолинське', slug: 'velykodolynske', population: 13000, isRegionalCenter: false },
  { name: 'Авангард', slug: 'avangard', population: 5000, isRegionalCenter: false },
  { name: 'Доброслав', slug: 'dobroslav', population: 6500, isRegionalCenter: false },
  { name: 'Чорноморське', slug: 'chornomorske', population: 6000, isRegionalCenter: false },
  { name: 'Таїрове', slug: 'tairove', population: 11000, isRegionalCenter: false },
  { name: 'Фонтанка', slug: 'fontanka', population: 6500, isRegionalCenter: false },
  { name: 'Лески', slug: 'lesky', population: 3500, isRegionalCenter: false },
  { name: 'Нерубайське', slug: 'nerubaiske', population: 9000, isRegionalCenter: false },
  { name: 'Усатове', slug: 'usatove', population: 7500, isRegionalCenter: false },
  { name: 'Крижанівка', slug: 'kryzhanivka', population: 3000, isRegionalCenter: false },
  { name: 'Нова Долина', slug: 'nova-dolyna', population: 2500, isRegionalCenter: false },
  { name: 'Вапнярка', slug: 'vapniarka', population: 2000, isRegionalCenter: false },
  { name: 'Дачне', slug: 'dachne', population: 4500, isRegionalCenter: false },
  { name: 'Кароліно-Бугаз', slug: 'karolino-buhaz', population: 1200, isRegionalCenter: false },
  { name: 'Курісове', slug: 'kurisove', population: 2800, isRegionalCenter: false },
  { name: 'Петрівка', slug: 'petrivka', population: 3200, isRegionalCenter: false }
];

// Категорії для генерації сторінок
const categories = [
  { name: 'Догляд за літніми', slug: 'elderly-care' },
  { name: 'Медичні послуги', slug: 'medical-services' },
  { name: 'Реабілітація', slug: 'rehabilitation' },
  { name: 'Психологічна підтримка', slug: 'psychological-support' },
  { name: 'Дозвілля', slug: 'leisure' },
  { name: 'Харчування', slug: 'nutrition' },
  { name: 'Проживання', slug: 'accommodation' },
  { name: 'Ціни', slug: 'prices' }
];

// Теми для блогу
const blogTopics = [
  { title: 'Здоров\'я літніх людей', slug: 'elderly-health' },
  { title: 'Психологічна підтримка', slug: 'psychological-support' },
  { title: 'Харчування', slug: 'nutrition' },
  { title: 'Активне довголіття', slug: 'active-longevity' },
  { title: 'Догляд за хворими', slug: 'patient-care' },
  { title: 'Деменція та Альцгеймер', slug: 'dementia-alzheimer' },
  { title: 'Реабілітація після інсульту', slug: 'stroke-rehabilitation' },
  { title: 'Соціалізація літніх людей', slug: 'elderly-socialization' },
  { title: 'Технології для літніх', slug: 'technology-for-elderly' },
  { title: 'Правові питання', slug: 'legal-issues' }
];

// Секції для кожного міста
const sections = [
  { name: 'Про нас', slug: 'about' },
  { name: 'Послуги', slug: 'services' },
  { name: 'Ціни', slug: 'prices' },
  { name: 'Контакти', slug: 'contacts' },
  { name: 'Відгуки', slug: 'reviews' },
  { name: 'Галерея', slug: 'gallery' },
  { name: 'Блог', slug: 'blog' },
  { name: 'Часті питання', slug: 'faq' }
];

// Базовий URL сайту
const baseUrl = 'https://soniachna.com';

// Шлях до шаблону перенаправлення
const templatePath = path.join(__dirname, 'redirect-template.html');
const template = fs.readFileSync(templatePath, 'utf8');

// Шлях до папки out
const outDir = path.join(__dirname, '..', 'out');

// Функція для створення файлу перенаправлення
function createRedirectFile(filePath, redirectUrl, pageTitle) {
  // Створюємо директорії, якщо вони не існують
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  // Замінюємо плейсхолдери в шаблоні
  let content = template
    .replace(/REDIRECT_URL/g, redirectUrl)
    .replace(/PAGE_TITLE/g, pageTitle);
  
  // Записуємо файл
  fs.writeFileSync(filePath, content);
  console.log(`Створено файл перенаправлення: ${filePath} -> ${redirectUrl}`);
}

// Функція для генерації файлів перенаправлення для міст
function generateCityRedirects() {
  citiesData.forEach(city => {
    // Створюємо файл для міста
    const cityRedirectPath = path.join(outDir, 'cities', `${city.slug}.html`);
    const cityRedirectUrl = `${baseUrl}/cities/${city.slug}/`;
    const cityPageTitle = `Пансіонат "Сонячна Долина" у місті ${city.name}`;
    createRedirectFile(cityRedirectPath, cityRedirectUrl, cityPageTitle);
    
    // Створюємо файли для секцій міста
    sections.forEach(section => {
      const sectionRedirectPath = path.join(outDir, 'cities', city.slug, `${section.slug}.html`);
      const sectionRedirectUrl = `${baseUrl}/cities/${city.slug}/${section.slug}/`;
      const sectionPageTitle = `${section.name} | Пансіонат "Сонячна Долина" | ${city.name}`;
      createRedirectFile(sectionRedirectPath, sectionRedirectUrl, sectionPageTitle);
    });
    
    // Створюємо файли для категорій послуг міста
    categories.forEach(category => {
      const categoryRedirectPath = path.join(outDir, 'cities', city.slug, 'services', `${category.slug}.html`);
      const categoryRedirectUrl = `${baseUrl}/cities/${city.slug}/services/${category.slug}/`;
      const categoryPageTitle = `${category.name} для літніх людей | Пансіонат "Сонячна Долина" | ${city.name}`;
      createRedirectFile(categoryRedirectPath, categoryRedirectUrl, categoryPageTitle);
    });
    
    // Створюємо файли для блог-статей міста
    blogTopics.forEach(topic => {
      const topicRedirectPath = path.join(outDir, 'cities', city.slug, 'blog', `${topic.slug}.html`);
      const topicRedirectUrl = `${baseUrl}/cities/${city.slug}/blog/${topic.slug}/`;
      const topicPageTitle = `${topic.title} | Блог Пансіонату "Сонячна Долина" | ${city.name}`;
      createRedirectFile(topicRedirectPath, topicRedirectUrl, topicPageTitle);
      
      // Створюємо файли для додаткових статей для кожної теми
      for (let i = 1; i <= 5; i++) {
        const articleRedirectPath = path.join(outDir, 'cities', city.slug, 'blog', topic.slug, `article-${i}.html`);
        const articleRedirectUrl = `${baseUrl}/cities/${city.slug}/blog/${topic.slug}/article-${i}/`;
        const articlePageTitle = `${topic.title} - стаття ${i} | Пансіонат "Сонячна Долина" | ${city.name}`;
        createRedirectFile(articleRedirectPath, articleRedirectUrl, articlePageTitle);
      }
    });
  });
}

// Функція для генерації файлів перенаправлення для блог-статей
function generateBlogRedirects() {
  const existingBlogPosts = [
    { slug: 'zdorove-harchuvannya', title: 'Здорове харчування для літніх людей: особливості та рекомендації' },
    { slug: '5-porad-dlya-zdorovya-2026', title: '5 порад для підтримки здоров\'я літніх людей у 2026 році' },
    { slug: 'tehnologii-v-doglyadi-2026', title: 'Як технології допомагають у догляді за літніми людьми' },
    { slug: 'noviy-rik-2026', title: 'Святкування Нового Року в пансіонаті Сонячна Долина' },
    { slug: 'ya-tyagar', title: '«Я тягар»: як змінити це відчуття у літніх людей' },
    { slug: 'psyhologichna-pidtrymka', title: 'Психологічна підтримка літніх людей: важливі аспекти' }
  ];
  
  existingBlogPosts.forEach(post => {
    const blogRedirectPath = path.join(outDir, 'blog', `${post.slug}.html`);
    const blogRedirectUrl = `${baseUrl}/blog/${post.slug}/`;
    const blogPageTitle = `${post.title} | Блог Пансіонату "Сонячна Долина"`;
    createRedirectFile(blogRedirectPath, blogRedirectUrl, blogPageTitle);
  });
}

// Функція для генерації файлів перенаправлення для порівняння міст
function generateCityComparisonRedirects() {
  for (let i = 0; i < citiesData.length; i++) {
    for (let j = i + 1; j < citiesData.length; j++) {
      const comparisonRedirectPath = path.join(outDir, 'compare', `${citiesData[i].slug}-vs-${citiesData[j].slug}.html`);
      const comparisonRedirectUrl = `${baseUrl}/compare/${citiesData[i].slug}-vs-${citiesData[j].slug}/`;
      const comparisonPageTitle = `Порівняння пансіонатів для літніх людей: ${citiesData[i].name} vs ${citiesData[j].name}`;
      createRedirectFile(comparisonRedirectPath, comparisonRedirectUrl, comparisonPageTitle);
    }
  }
}

// Функція для генерації файлів перенаправлення для категорій послуг
function generateServiceCategoryRedirects() {
  categories.forEach(category => {
    const categoryRedirectPath = path.join(outDir, 'services', `${category.slug}.html`);
    const categoryRedirectUrl = `${baseUrl}/services/${category.slug}/`;
    const categoryPageTitle = `${category.name} для літніх людей | Послуги Пансіонату "Сонячна Долина"`;
    createRedirectFile(categoryRedirectPath, categoryRedirectUrl, categoryPageTitle);
    
    // Створюємо файли для підкатегорій
    for (let i = 1; i <= 3; i++) {
      const subcategoryRedirectPath = path.join(outDir, 'services', category.slug, `subcategory-${i}.html`);
      const subcategoryRedirectUrl = `${baseUrl}/services/${category.slug}/subcategory-${i}/`;
      const subcategoryPageTitle = `${category.name} - підкатегорія ${i} | Пансіонат "Сонячна Долина"`;
      createRedirectFile(subcategoryRedirectPath, subcategoryRedirectUrl, subcategoryPageTitle);
    }
  });
}

// Генеруємо всі файли перенаправлення
console.log('Початок генерації файлів перенаправлення...');
generateCityRedirects();
generateBlogRedirects();
generateCityComparisonRedirects();
generateServiceCategoryRedirects();
console.log('Генерація файлів перенаправлення завершена!');
