import type { MetadataRoute } from 'next';
import { generateAllSitemapUrls } from '../utils/sitemapGenerator';

export const dynamic = 'force-static';

// Використовуємо функцію sitemap для створення XML сайтмапу
export default function sitemap(): MetadataRoute.Sitemap {
  // Використовуємо генератор для створення тисяч сторінок для sitemap
  return generateAllSitemapUrls();
}
