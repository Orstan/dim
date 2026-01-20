import { Metadata } from 'next';
import { 
  generateCityTitle, 
  generateCitySectionTitle, 
  generateCityBlogTopicTitle,
  generateCityBlogArticleTitle,
  generateCityComparisonTitle,
  generateCategoryTitle,
  generateSubcategoryTitle,
  generatePageMetadata
} from './titleGenerator';

/**
 * Генерує метадані для головної сторінки
 * @returns Метадані для головної сторінки
 */
export function generateHomeMetadata(): Metadata {
  const title = "Пансіонат 'Сонячна Долина' | Догляд за літніми людьми | Одеса";
  const metadata = generatePageMetadata(title, 'Одеса');
  
  return {
    title,
    description: metadata.description,
    keywords: metadata.keywords,
  };
}

/**
 * Генерує метадані для сторінки блогу
 * @returns Метадані для сторінки блогу
 */
export function generateBlogMetadata(): Metadata {
  const title = "Блог | Пансіонат 'Сонячна Долина' | Одеса";
  const metadata = generatePageMetadata(title, 'Одеса');
  
  return {
    title,
    description: metadata.description,
    keywords: metadata.keywords,
  };
}

/**
 * Генерує метадані для статті блогу
 * @param postTitle Заголовок статті
 * @returns Метадані для статті блогу
 */
export function generateBlogPostMetadata(postTitle: string): Metadata {
  const title = `${postTitle} | Блог Пансіонату 'Сонячна Долина'`;
  const metadata = generatePageMetadata(title, 'Одеса');
  
  return {
    title,
    description: metadata.description,
    keywords: metadata.keywords,
  };
}

/**
 * Генерує метадані для сторінки міста
 * @param cityName Назва міста
 * @returns Метадані для сторінки міста
 */
export function generateCityPageMetadata(cityName: string): Metadata {
  const title = generateCityTitle(cityName);
  const metadata = generatePageMetadata(title, cityName);
  
  return {
    title,
    description: metadata.description,
    keywords: metadata.keywords,
  };
}

/**
 * Генерує метадані для секції міста
 * @param cityName Назва міста
 * @param sectionName Назва секції
 * @returns Метадані для секції міста
 */
export function generateCitySectionMetadata(cityName: string, sectionName: string): Metadata {
  const title = generateCitySectionTitle(cityName, sectionName);
  const metadata = generatePageMetadata(title, cityName);
  
  return {
    title,
    description: metadata.description,
    keywords: metadata.keywords,
  };
}

/**
 * Генерує метадані для категорії послуг у місті
 * @param cityName Назва міста
 * @param categoryName Назва категорії
 * @returns Метадані для категорії послуг у місті
 */
export function generateCityCategoryMetadata(cityName: string, categoryName: string): Metadata {
  const title = `${categoryName} для літніх людей | Пансіонат 'Сонячна Долина' | ${cityName}`;
  const metadata = generatePageMetadata(title, cityName);
  
  return {
    title,
    description: metadata.description,
    keywords: metadata.keywords,
  };
}

/**
 * Генерує метадані для сторінки порівняння міст
 * @param city1Name Назва першого міста
 * @param city2Name Назва другого міста
 * @returns Метадані для сторінки порівняння міст
 */
export function generateCityComparisonMetadata(city1Name: string, city2Name: string): Metadata {
  const title = generateCityComparisonTitle(city1Name, city2Name);
  const metadata = generatePageMetadata(title, `${city1Name}, ${city2Name}`);
  
  return {
    title,
    description: metadata.description,
    keywords: metadata.keywords,
  };
}

/**
 * Генерує метадані для категорії послуг
 * @param categoryName Назва категорії
 * @returns Метадані для категорії послуг
 */
export function generateCategoryMetadata(categoryName: string): Metadata {
  const title = generateCategoryTitle(categoryName);
  const metadata = generatePageMetadata(title, 'Одеса');
  
  return {
    title,
    description: metadata.description,
    keywords: metadata.keywords,
  };
}

/**
 * Генерує метадані для підкатегорії послуг
 * @param categoryName Назва категорії
 * @param subcategoryNumber Номер підкатегорії
 * @returns Метадані для підкатегорії послуг
 */
export function generateSubcategoryMetadata(categoryName: string, subcategoryNumber: number): Metadata {
  const title = generateSubcategoryTitle(categoryName, subcategoryNumber);
  const metadata = generatePageMetadata(title, 'Одеса');
  
  return {
    title,
    description: metadata.description,
    keywords: metadata.keywords,
  };
}
