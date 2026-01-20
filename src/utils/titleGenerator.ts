// Функції для генерації унікальних title для кожної сторінки

// Базова назва пансіонату
const baseName = "Пансіонат 'Сонячна Долина'";

/**
 * Генерує title для головної сторінки міста
 * @param cityName Назва міста
 * @returns Унікальний title для головної сторінки міста
 */
export function generateCityTitle(cityName: string): string {
  return `${baseName} у місті ${cityName} | Догляд за літніми людьми`;
}

/**
 * Генерує title для секції міста
 * @param cityName Назва міста
 * @param sectionName Назва секції
 * @returns Унікальний title для секції міста
 */
export function generateCitySectionTitle(cityName: string, sectionName: string): string {
  return `${sectionName} | ${baseName} | ${cityName}`;
}

/**
 * Генерує title для теми блогу у місті
 * @param cityName Назва міста
 * @param topicTitle Назва теми
 * @returns Унікальний title для теми блогу у місті
 */
export function generateCityBlogTopicTitle(cityName: string, topicTitle: string): string {
  return `${topicTitle} | Блог ${baseName} | ${cityName}`;
}

/**
 * Генерує title для статті блогу у місті
 * @param cityName Назва міста
 * @param topicTitle Назва теми
 * @param articleNumber Номер статті
 * @returns Унікальний title для статті блогу у місті
 */
export function generateCityBlogArticleTitle(cityName: string, topicTitle: string, articleNumber: number): string {
  const articleTitles = [
    `Важливі аспекти ${topicTitle.toLowerCase()} для літніх людей`,
    `Як організувати ${topicTitle.toLowerCase()} для літніх людей`,
    `${topicTitle}: поради для родичів літніх людей`,
    `Інновації у сфері ${topicTitle.toLowerCase()} для літніх людей`,
    `${topicTitle}: досвід пансіонату 'Сонячна Долина'`
  ];
  
  const title = articleTitles[articleNumber - 1] || `${topicTitle} - стаття ${articleNumber}`;
  return `${title} | ${baseName} | ${cityName}`;
}

/**
 * Генерує title для сторінки порівняння міст
 * @param city1Name Назва першого міста
 * @param city2Name Назва другого міста
 * @returns Унікальний title для сторінки порівняння міст
 */
export function generateCityComparisonTitle(city1Name: string, city2Name: string): string {
  return `Порівняння пансіонатів для літніх людей: ${city1Name} vs ${city2Name} | ${baseName}`;
}

/**
 * Генерує title для категорії послуг
 * @param categoryName Назва категорії
 * @returns Унікальний title для категорії послуг
 */
export function generateCategoryTitle(categoryName: string): string {
  return `${categoryName} для літніх людей | Послуги ${baseName}`;
}

/**
 * Генерує title для підкатегорії послуг
 * @param categoryName Назва категорії
 * @param subcategoryNumber Номер підкатегорії
 * @returns Унікальний title для підкатегорії послуг
 */
export function generateSubcategoryTitle(categoryName: string, subcategoryNumber: number): string {
  const subcategoryTitles = [
    `Базові послуги ${categoryName.toLowerCase()}`,
    `Розширені послуги ${categoryName.toLowerCase()}`,
    `Преміум послуги ${categoryName.toLowerCase()}`
  ];
  
  const title = subcategoryTitles[subcategoryNumber - 1] || `${categoryName} - підкатегорія ${subcategoryNumber}`;
  return `${title} | ${baseName}`;
}

/**
 * Генерує мета-опис для сторінки
 * @param title Title сторінки
 * @returns Мета-опис для сторінки
 */
export function generateMetaDescription(title: string): string {
  return `${title}. Професійний догляд за літніми людьми, комфортні умови проживання, медичний нагляд, смачне харчування. Телефонуйте ☎ +380 (48) 123-45-67`;
}

/**
 * Генерує ключові слова для сторінки
 * @param title Title сторінки
 * @param cityName Назва міста
 * @returns Ключові слова для сторінки
 */
export function generateKeywords(title: string, cityName: string): string {
  return `пансіонат для літніх, будинок престарілих, догляд за літніми людьми, ${cityName}, Одеська область, проживання літніх людей, медичний догляд`;
}

// Структура для метаданих сторінки
export interface PageMetadata {
  title: string;
  description: string;
  keywords: string;
}

/**
 * Генерує повні метадані для сторінки
 * @param title Title сторінки
 * @param cityName Назва міста
 * @returns Повні метадані для сторінки
 */
export function generatePageMetadata(title: string, cityName: string): PageMetadata {
  return {
    title,
    description: generateMetaDescription(title),
    keywords: generateKeywords(title, cityName)
  };
}
