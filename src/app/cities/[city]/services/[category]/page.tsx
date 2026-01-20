import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { citiesData } from '@/data/cities';

type ServiceCategoryPageProps = {
  params: {
    city: string;
    category: string;
  };
}

const categories = [
  { slug: 'elderly-care', name: 'Догляд за літніми' },
  { slug: 'medical-services', name: 'Медичні послуги' },
  { slug: 'rehabilitation', name: 'Реабілітація' },
  { slug: 'psychological-support', name: 'Психологічна підтримка' },
  { slug: 'leisure', name: 'Дозвілля' },
  { slug: 'nutrition', name: 'Харчування' },
  { slug: 'accommodation', name: 'Проживання' },
  { slug: 'prices', name: 'Ціни' }
];

export function generateMetadata({ params }: ServiceCategoryPageProps): Metadata {
  const city = citiesData.find(c => c.slug === params.city);
  const category = categories.find(cat => cat.slug === params.category);
  
  if (!city || !category) {
    return {
      title: 'Сторінка не знайдена | Пансіонат "Сонячна Долина"',
    };
  }
  
  return {
    title: `${category.name} - Послуги пансіонату "Сонячна Долина" у місті ${city.name}`,
    description: `${category.name} у пансіонаті "Сонячна Долина" у місті ${city.name}. Професійний підхід та індивідуальна увага.`,
  };
}

export async function generateStaticParams() {
  const params = [];
  for (const city of citiesData) {
    for (const category of categories) {
      params.push({
        city: city.slug,
        category: category.slug,
      });
    }
  }
  return params;
}

export const dynamicParams = false;
export const dynamic = 'force-static';

export default function ServiceCategoryPage({ params }: ServiceCategoryPageProps) {
  const city = citiesData.find(c => c.slug === params.city);
  const category = categories.find(cat => cat.slug === params.category);
  
  if (!city || !category) {
    notFound();
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-amber-100">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <nav className="text-sm text-amber-700">
              <a href="/" className="hover:underline">Головна</a> / 
              <a href={`/cities/${city.slug}`} className="hover:underline ml-1">{city.name}</a> / 
              <a href={`/cities/${city.slug}/services`} className="hover:underline ml-1">Послуги</a> / 
              <span className="ml-1">{category.name}</span>
            </nav>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 border border-amber-200 mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-amber-900 mb-4">
              {category.name}
            </h1>
            <p className="text-lg text-amber-800 mb-6">
              Пансіонат "Сонячна Долина" для жителів міста {city.name}
            </p>
            
            <div className="prose max-w-none">
              <p className="text-gray-700 mb-6">
                Пансіонат "Сонячна Долина" (м.Одеса, с.Лески, вул.Шевченка, 4Б) пропонує високоякісні послуги з {category.name.toLowerCase()} 
                для літніх людей з міста {city.name} та інших міст Одеської області. 
                Ми забезпечуємо індивідуальний підхід та професійний догляд цілодобово.
              </p>

              <h2 className="text-2xl font-semibold text-amber-900 mb-4">Що включає ця послуга</h2>
              <ul className="list-disc pl-6 mb-6 text-gray-700">
                <li className="mb-2">Індивідуальний план догляду для кожного мешканця</li>
                <li className="mb-2">Кваліфікований персонал з багаторічним досвідом</li>
                <li className="mb-2">Цілодобове спостереження та підтримка</li>
                <li className="mb-2">Сучасне обладнання та комфортні умови</li>
                <li className="mb-2">Регулярне спостереження та підтримка</li>
              </ul>

              <h2 className="text-2xl font-semibold text-amber-900 mb-4">Переваги нашого пансіонату</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-amber-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-amber-900 mb-2">Професіоналізм</h3>
                  <p className="text-gray-700 text-sm">
                    Наша команда має багаторічний досвід роботи з літніми людьми
                  </p>
                </div>
                <div className="bg-amber-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-amber-900 mb-2">Комфорт</h3>
                  <p className="text-gray-700 text-sm">
                    Затишні кімнати та сучасна інфраструктура для комфортного проживання
                  </p>
                </div>
                <div className="bg-amber-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-amber-900 mb-2">Безпека</h3>
                  <p className="text-gray-700 text-sm">
                    Цілодобова охорона та контроль безпеки мешканців
                  </p>
                </div>
                <div className="bg-amber-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-amber-900 mb-2">Турбота</h3>
                  <p className="text-gray-700 text-sm">
                    Індивідуальний підхід до кожного мешканця
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Потрібна консультація?</h3>
                <p className="mb-4">
                  Зв'яжіться з нами, щоб дізнатися більше про наші послуги з {category.name.toLowerCase()} для жителів міста {city.name}.
                  Пансіонат: м.Одеса, с.Лески, вул.Шевченка, 4Б
                </p>
                <div className="flex flex-col md:flex-row gap-4">
                  <a href={`/cities/${city.slug}/contacts`} className="bg-white text-amber-600 px-6 py-2 rounded font-semibold hover:bg-amber-50 transition text-center">
                    Контакти
                  </a>
                  <a href="/pricing" className="bg-amber-700 text-white px-6 py-2 rounded font-semibold hover:bg-amber-800 transition text-center">
                    Ціни на послуги
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
