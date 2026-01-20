import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { citiesData } from '@/data/cities';

type SectionPageProps = {
  params: {
    city: string;
    section: string;
  };
}

const sections = [
  { slug: 'about', name: 'Про нас' },
  { slug: 'services', name: 'Послуги' },
  { slug: 'prices', name: 'Ціни' },
  { slug: 'contacts', name: 'Контакти' },
  { slug: 'reviews', name: 'Відгуки' },
  { slug: 'gallery', name: 'Галерея' },
  { slug: 'blog', name: 'Блог' },
  { slug: 'faq', name: 'Часті питання' }
];

export function generateMetadata({ params }: SectionPageProps): Metadata {
  const city = citiesData.find(c => c.slug === params.city);
  const section = sections.find(s => s.slug === params.section);
  
  if (!city || !section) {
    return {
      title: 'Сторінка не знайдена | Пансіонат "Сонячна Долина"',
    };
  }
  
  return {
    title: `${section.name} - Пансіонат "Сонячна Долина" у місті ${city.name}`,
    description: `${section.name} пансіонату "Сонячна Долина" у місті ${city.name}. Професійний догляд за літніми людьми.`,
  };
}

export async function generateStaticParams() {
  const params = [];
  for (const city of citiesData) {
    for (const section of sections) {
      params.push({
        city: city.slug,
        section: section.slug,
      });
    }
  }
  return params;
}

export const dynamicParams = false;
export const dynamic = 'force-static';

export default function SectionPage({ params }: SectionPageProps) {
  const city = citiesData.find(c => c.slug === params.city);
  const section = sections.find(s => s.slug === params.section);
  
  if (!city || !section) {
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
              <span className="ml-1">{section.name}</span>
            </nav>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 border border-amber-200 mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-amber-900 mb-4">
              {section.name}
            </h1>
            <p className="text-lg text-amber-800 mb-6">
              Пансіонат "Сонячна Долина" у місті {city.name}
            </p>
            
            <div className="prose max-w-none">
              <p className="text-gray-700 mb-6">
                Інформація про {section.name.toLowerCase()} пансіонату "Сонячна Долина" у місті {city.name}. 
                Ми пропонуємо професійний підхід та комфортні умови для всіх наших мешканців.
              </p>

              <h2 className="text-2xl font-semibold text-amber-900 mb-4">Про наш пансіонат</h2>
              <p className="text-gray-700 mb-4">
                Пансіонат "Сонячна Долина" у місті {city.name} - це сучасний заклад для комфортного проживання 
                та професійного догляду за літніми людьми. Ми створили всі умови для того, щоб наші мешканці 
                почувалися як вдома.
              </p>

              <h2 className="text-2xl font-semibold text-amber-900 mb-4 mt-6">Що ми пропонуємо</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-amber-50 p-5 rounded-lg border border-amber-200">
                  <h3 className="font-semibold text-amber-900 mb-2">✓ Професійний персонал</h3>
                  <p className="text-gray-700 text-sm">
                    Кваліфіковані фахівці з багаторічним досвідом роботи
                  </p>
                </div>
                <div className="bg-amber-50 p-5 rounded-lg border border-amber-200">
                  <h3 className="font-semibold text-amber-900 mb-2">✓ Комфортні умови</h3>
                  <p className="text-gray-700 text-sm">
                    Затишні кімнати та сучасна інфраструктура
                  </p>
                </div>
                <div className="bg-amber-50 p-5 rounded-lg border border-amber-200">
                  <h3 className="font-semibold text-amber-900 mb-2">✓ Медичний догляд</h3>
                  <p className="text-gray-700 text-sm">
                    Цілодобове медичне спостереження та підтримка
                  </p>
                </div>
                <div className="bg-amber-50 p-5 rounded-lg border border-amber-200">
                  <h3 className="font-semibold text-amber-900 mb-2">✓ Збалансоване харчування</h3>
                  <p className="text-gray-700 text-sm">
                    4-разове харчування з урахуванням індивідуальних потреб
                  </p>
                </div>
              </div>

              <h2 className="text-2xl font-semibold text-amber-900 mb-4 mt-6">Чому обирають нас</h2>
              <ul className="list-disc pl-6 mb-6 text-gray-700">
                <li className="mb-2">Багаторічний досвід роботи у сфері догляду за літніми людьми</li>
                <li className="mb-2">Індивідуальний підхід до кожного мешканця</li>
                <li className="mb-2">Цілодобова підтримка та спостереження</li>
                <li className="mb-2">Комфортні умови проживання в екологічно чистому районі</li>
                <li className="mb-2">Доступні ціни та гнучкі умови оплати</li>
              </ul>

              <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white p-6 rounded-lg mt-8">
                <h3 className="text-xl font-semibold mb-3">Хочете дізнатися більше?</h3>
                <p className="mb-4">
                  Зв'яжіться з нами для детальної консультації про послуги пансіонату у місті {city.name}
                </p>
                <div className="flex flex-col md:flex-row gap-4">
                  <a href="/contacts" className="bg-white text-amber-600 px-6 py-3 rounded font-semibold hover:bg-amber-50 transition text-center">
                    Наші контакти
                  </a>
                  <a href="/pricing" className="bg-amber-700 text-white px-6 py-3 rounded font-semibold hover:bg-amber-800 transition text-center">
                    Ціни на проживання
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
