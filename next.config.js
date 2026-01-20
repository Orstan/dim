/** @type {import('next').NextConfig} */
const nextConfig = {
  // Додаємо output: 'export' для статичного експорту на Hostinger
  output: 'export',
  // Встановлюємо базовий URL для статичних файлів
  assetPrefix: '/',
  // Встановлюємо базовий шлях для всіх маршрутів
  basePath: '',
  images: {
    domains: ['source.unsplash.com', 'images.pexels.com'],
    unoptimized: true, // Потрібно для статичного експорту
  },
  // Вимикаємо строгий режим маршрутів, щоб уникнути помилок при статичному експорті
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
