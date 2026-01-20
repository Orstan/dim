import { MetadataRoute } from 'next';
import { citiesData, categories, blogTopics, sections } from '../data/cities';
import {
  generateCityTitle,
  generateCitySectionTitle,
  generateCityBlogTopicTitle,
  generateCityBlogArticleTitle,
  generateCityComparisonTitle,
  generateCategoryTitle,
  generateSubcategoryTitle,
  generatePageMetadata,
  PageMetadata
} from './titleGenerator';

// Базовий URL сайту
const baseUrl = 'https://soniachna.com';

// Розширена структура для URL з метаданими
interface SitemapUrlWithMetadata {
  url: string;
  lastModified: Date | string;
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
  metadata?: PageMetadata;
}

// Функція для генерації URL для міста
export function generateCityUrls(city: { name: string; slug: string }): SitemapUrlWithMetadata[] {
  const now = new Date();
  const urls: SitemapUrlWithMetadata[] = [];

  // Головна сторінка міста
  const cityTitle = generateCityTitle(city.name);
  const cityMetadata = generatePageMetadata(cityTitle, city.name);
  
  urls.push({
    url: `${baseUrl}/cities/${city.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
    metadata: cityMetadata
  });

  // Секції для міста
  sections.forEach(section => {
    const sectionTitle = generateCitySectionTitle(city.name, section.name);
    const sectionMetadata = generatePageMetadata(sectionTitle, city.name);
    
    urls.push({
      url: `${baseUrl}/cities/${city.slug}/${section.slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
      metadata: sectionMetadata
    });
  });

  // Категорії послуг для міста
  categories.forEach(category => {
    const categoryTitle = generateCategoryTitle(category.name);
    const categoryMetadata = generatePageMetadata(categoryTitle, city.name);
    
    urls.push({
      url: `${baseUrl}/cities/${city.slug}/services/${category.slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
      metadata: categoryMetadata
    });
  });

  // Блог статті для міста
  blogTopics.forEach(topic => {
    const topicTitle = generateCityBlogTopicTitle(city.name, topic.title);
    const topicMetadata = generatePageMetadata(topicTitle, city.name);
    
    urls.push({
      url: `${baseUrl}/cities/${city.slug}/blog/${topic.slug}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.6,
      metadata: topicMetadata
    });

    // Додаткові статті для кожної теми
    for (let i = 1; i <= 5; i++) {
      const articleTitle = generateCityBlogArticleTitle(city.name, topic.title, i);
      const articleMetadata = generatePageMetadata(articleTitle, city.name);
      
      urls.push({
        url: `${baseUrl}/cities/${city.slug}/blog/${topic.slug}/article-${i}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.5,
        metadata: articleMetadata
      });
    }
  });

  return urls;
}

// Функція для генерації всіх URL для sitemap
export function generateAllSitemapUrls(): MetadataRoute.Sitemap {
  const now = new Date();
  let allUrls: SitemapUrlWithMetadata[] = [];

  // Додаємо основні сторінки сайту
  const mainPages = [
    { url: baseUrl, title: "Пансіонат 'Сонячна Долина' | Догляд за літніми людьми | Одеса", priority: 1.0 },
    { url: `${baseUrl}/about`, title: "Про нас | Пансіонат 'Сонячна Долина' | Одеса", priority: 0.8 },
    { url: `${baseUrl}/services`, title: "Послуги | Пансіонат 'Сонячна Долина' | Одеса", priority: 0.9 },
    { url: `${baseUrl}/gallery`, title: "Галерея | Пансіонат 'Сонячна Долина' | Одеса", priority: 0.7 },
    { url: `${baseUrl}/faq`, title: "Часті питання | Пансіонат 'Сонячна Долина' | Одеса", priority: 0.6 },
    { url: `${baseUrl}/contacts`, title: "Контакти | Пансіонат 'Сонячна Долина' | Одеса", priority: 0.9 },
    { url: `${baseUrl}/reviews`, title: "Відгуки | Пансіонат 'Сонячна Долина' | Одеса", priority: 0.7 },
    { url: `${baseUrl}/privacy`, title: "Політика конфіденційності | Пансіонат 'Сонячна Долина'", priority: 0.3 },
    { url: `${baseUrl}/blog`, title: "Блог | Пансіонат 'Сонячна Долина' | Одеса", priority: 0.8 },
  ];

  mainPages.forEach(page => {
    const metadata = generatePageMetadata(page.title, 'Одеса');
    
    allUrls.push({
      url: page.url,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: page.priority,
      metadata: metadata
    });
  });

  // Додаємо сторінки блогу
  const existingBlogPosts = [
    { slug: 'zdorove-harchuvannya', title: 'Здорове харчування для літніх людей: особливості та рекомендації' },
    { slug: '5-porad-dlya-zdorovya-2026', title: '5 порад для підтримки здоров’я літніх людей у 2026 році' },
    { slug: 'tehnologii-v-doglyadi-2026', title: 'Як технології допомагають у догляді за літніми людьми' },
    { slug: 'noviy-rik-2026', title: 'Святкування Нового Року в пансіонаті Сонячна Долина' },
    { slug: 'ya-tyagar', title: '«Я тягар»: як змінити це відчуття у літніх людей' },
    { slug: 'psyhologichna-pidtrymka', title: 'Психологічна підтримка літніх людей: важливі аспекти' }
  ];

  existingBlogPosts.forEach(post => {
    const fullTitle = `${post.title} | Блог Пансіонату 'Сонячна Долина'`;
    const metadata = generatePageMetadata(fullTitle, 'Одеса');
    
    allUrls.push({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
      metadata: metadata
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
      const comparisonTitle = generateCityComparisonTitle(citiesData[i].name, citiesData[j].name);
      const metadata = generatePageMetadata(comparisonTitle, `${citiesData[i].name}, ${citiesData[j].name}`);
      
      allUrls.push({
        url: `${baseUrl}/compare/${citiesData[i].slug}-vs-${citiesData[j].slug}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.5,
        metadata: metadata
      });
    }
  }

  // Додаємо сторінки для різних типів послуг
  categories.forEach(category => {
    const categoryTitle = generateCategoryTitle(category.name);
    const metadata = generatePageMetadata(categoryTitle, 'Одеса');
    
    allUrls.push({
      url: `${baseUrl}/services/${category.slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
      metadata: metadata
    });

    // Додаємо підкатегорії для кожної категорії
    for (let i = 1; i <= 3; i++) {
      const subcategoryTitle = generateSubcategoryTitle(category.name, i);
      const subcategoryMetadata = generatePageMetadata(subcategoryTitle, 'Одеса');
      
      allUrls.push({
        url: `${baseUrl}/services/${category.slug}/subcategory-${i}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.7,
        metadata: subcategoryMetadata
      });
    }
  });

  // Перетворюємо на стандартний формат sitemap без метаданих
  const standardSitemap: MetadataRoute.Sitemap = allUrls.map(({ url, lastModified, changeFrequency, priority }) => ({
    url,
    lastModified,
    changeFrequency,
    priority
  }));

  return standardSitemap;
}
