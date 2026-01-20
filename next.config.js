/** @type {import('next').NextConfig} */
const nextConfig = {
  // Конфігурація для Vercel
  // output: 'export', // Видалено для розгортання на Vercel
  
  images: {
    domains: ['source.unsplash.com', 'images.pexels.com'],
    // unoptimized: true, // Видалено для Vercel, який оптимізує зображення автоматично
  },
  // Зберігаємо завершальні слеші для кращої сумісності
  trailingSlash: true,
  // Ігноруємо помилки типів під час білду
  typescript: {
    ignoreBuildErrors: true,
  },
  // Вимикаємо перевірку лінтера
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig
