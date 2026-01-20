const fs = require('fs');
const path = require('path');

// Базовий URL сайту
const baseUrl = 'https://soniachna.com';

// Дані міст
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

// Функція для генерації URL для міста
function generateCityUrls(city) {
  const now = new Date().toISOString().split('T')[0];
  const urls = [];

  // Головна сторінка міста
  urls.push({
    url: `${baseUrl}/cities/${city.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  });

  // Секції для міста
  sections.forEach(section => {
    urls.push({
      url: `${baseUrl}/cities/${city.slug}/${section.slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  });

  // Категорії послуг для міста
  categories.forEach(category => {
    urls.push({
      url: `${baseUrl}/cities/${city.slug}/services/${category.slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  });

  // Блог статті для міста
  blogTopics.forEach(topic => {
    urls.push({
      url: `${baseUrl}/cities/${city.slug}/blog/${topic.slug}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.6,
    });

    // Додаткові статті для кожної теми
    for (let i = 1; i <= 5; i++) {
      urls.push({
        url: `${baseUrl}/cities/${city.slug}/blog/${topic.slug}/article-${i}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.5,
      });
    }
  });

  return urls;
}

// Функція для генерації всіх URL для sitemap
function generateAllSitemapUrls() {
  const now = new Date().toISOString().split('T')[0];
  let allUrls = [];

  // Додаємо основні сторінки сайту
  const mainPages = [
    { url: baseUrl, priority: 1.0 },
    { url: `${baseUrl}/about`, priority: 0.8 },
    { url: `${baseUrl}/services`, priority: 0.9 },
    { url: `${baseUrl}/gallery`, priority: 0.7 },
    { url: `${baseUrl}/faq`, priority: 0.6 },
    { url: `${baseUrl}/contacts`, priority: 0.9 },
    { url: `${baseUrl}/reviews`, priority: 0.7 },
    { url: `${baseUrl}/privacy`, priority: 0.3 },
    { url: `${baseUrl}/blog`, priority: 0.8 },
  ];

  mainPages.forEach(page => {
    allUrls.push({
      url: page.url,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: page.priority,
    });
  });

  // Додаємо сторінки блогу
  const existingBlogPosts = [
    { slug: 'zdorove-harchuvannya' },
    { slug: '5-porad-dlya-zdorovya-2026' },
    { slug: 'tehnologii-v-doglyadi-2026' },
    { slug: 'noviy-rik-2026' },
    { slug: 'ya-tyagar' },
    { slug: 'psyhologichna-pidtrymka' }
  ];

  existingBlogPosts.forEach(post => {
    allUrls.push({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  });

  // Додаємо сторінки для кожного міста
  citiesData.forEach(city => {
    const cityUrls = generateCityUrls(city);
    allUrls = [...allUrls, ...cityUrls];
  });

  // Додаємо сторінки порівняння міст
  for (let i = 0; i < citiesData.length; i++) {
    for (let j = i + 1; j < citiesData.length; j++) {
      allUrls.push({
        url: `${baseUrl}/compare/${citiesData[i].slug}-vs-${citiesData[j].slug}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.5,
      });
    }
  }

  // Додаємо сторінки для різних типів послуг
  categories.forEach(category => {
    allUrls.push({
      url: `${baseUrl}/services/${category.slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    });

    // Додаємо підкатегорії для кожної категорії
    for (let i = 1; i <= 3; i++) {
      allUrls.push({
        url: `${baseUrl}/services/${category.slug}/subcategory-${i}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    }
  });

  return allUrls;
}

// Функція для створення XML файлу sitemap
function generateSitemapXml() {
  const urls = generateAllSitemapUrls();
  
  // Підрахунок кількості URL
  console.log(`Генерація sitemap.xml з ${urls.length} URL`);
  
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  urls.forEach(url => {
    xml += '  <url>\n';
    xml += `    <loc>${url.url}</loc>\n`;
    xml += `    <lastmod>${url.lastModified}</lastmod>\n`;
    if (url.changeFrequency) {
      xml += `    <changefreq>${url.changeFrequency}</changefreq>\n`;
    }
    if (url.priority) {
      xml += `    <priority>${url.priority}</priority>\n`;
    }
    xml += '  </url>\n';
  });
  
  xml += '</urlset>';
  
  // Шлях для збереження файлу
  const outputPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
  
  // Створюємо директорію, якщо вона не існує
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  // Записуємо файл
  fs.writeFileSync(outputPath, xml);
  console.log(`Sitemap.xml успішно згенеровано та збережено в ${outputPath}`);
}

// Запускаємо генерацію sitemap.xml
generateSitemapXml();
