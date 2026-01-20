import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { citiesData } from '@/data/cities';

type BlogArticlePageProps = {
  params: {
    city: string;
    topic: string;
    article: string;
  };
}

const blogTopics = [
  { slug: 'elderly-health', title: 'Здоров\'я літніх людей' },
  { slug: 'psychological-support', title: 'Психологічна підтримка' },
  { slug: 'nutrition', title: 'Харчування' },
  { slug: 'active-longevity', title: 'Активне довголіття' },
  { slug: 'patient-care', title: 'Догляд за хворими' },
  { slug: 'dementia-alzheimer', title: 'Деменція та Альцгеймер' },
  { slug: 'stroke-rehabilitation', title: 'Реабілітація після інсульту' },
  { slug: 'elderly-socialization', title: 'Соціалізація літніх людей' },
  { slug: 'technology-for-elderly', title: 'Технології для літніх' },
  { slug: 'legal-issues', title: 'Правові питання' }
];

export function generateMetadata({ params }: BlogArticlePageProps): Metadata {
  const city = citiesData.find(c => c.slug === params.city);
  const topic = blogTopics.find(t => t.slug === params.topic);
  
  if (!city || !topic) {
    return {
      title: 'Сторінка не знайдена | Пансіонат "Сонячна Долина"',
    };
  }
  
  const articleNumber = params.article.replace('article-', '');
  
  return {
    title: `${topic.title} - Стаття ${articleNumber} | Пансіонат "Сонячна Долина" у місті ${city.name}`,
    description: `Корисна стаття про ${topic.title.toLowerCase()} від експертів пансіонату "Сонячна Долина" у місті ${city.name}.`,
  };
}

export async function generateStaticParams() {
  const params = [];
  for (const city of citiesData) {
    for (const topic of blogTopics) {
      for (let i = 1; i <= 5; i++) {
        params.push({
          city: city.slug,
          topic: topic.slug,
          article: `article-${i}`,
        });
      }
    }
  }
  return params;
}

export const dynamicParams = false;
export const dynamic = 'force-static';

export default function BlogArticlePage({ params }: BlogArticlePageProps) {
  const city = citiesData.find(c => c.slug === params.city);
  const topic = blogTopics.find(t => t.slug === params.topic);
  
  if (!city || !topic) {
    notFound();
  }
  
  const articleNumber = params.article.replace('article-', '');
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-amber-100">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <nav className="text-sm text-amber-700">
              <a href="/" className="hover:underline">Головна</a> / 
              <a href={`/cities/${city.slug}`} className="hover:underline ml-1">{city.name}</a> / 
              <a href={`/cities/${city.slug}/blog/${topic.slug}`} className="hover:underline ml-1">{topic.title}</a> / 
              <span className="ml-1">Стаття {articleNumber}</span>
            </nav>
          </div>

          <article className="bg-white rounded-lg shadow-lg p-8 border border-amber-200">
            <h1 className="text-3xl md:text-4xl font-bold text-amber-900 mb-4">
              {topic.title} - Стаття {articleNumber}
            </h1>
            <p className="text-lg text-amber-800 mb-6">
              Пансіонат "Сонячна Долина" для жителів міста {city.name}
            </p>
            
            <div className="prose max-w-none">
              <h2 className="text-2xl font-semibold text-amber-900 mt-6 mb-4">Вступ</h2>
              <p className="text-gray-700 mb-4">
                У пансіонаті "Сонячна Долина" (м.Одеса, с.Лески, вул.Шевченка, 4Б) ми приділяємо велику увагу 
                питанням, пов'язаним з {topic.title.toLowerCase()}. Ми приймаємо літніх людей з міста {city.name} та всієї Одеської області. 
                Наші фахівці мають багаторічний досвід роботи та готові поділитися своїми знаннями.
              </p>

              <h2 className="text-2xl font-semibold text-amber-900 mt-6 mb-4">Основна інформація</h2>
              <p className="text-gray-700 mb-4">
                Ця стаття №{articleNumber} містить корисну інформацію про {topic.title.toLowerCase()} для жителів міста {city.name} 
                та інших міст Одеської області. Ми прагнемо надавати актуальну та перевірену інформацію.
              </p>

              <h2 className="text-2xl font-semibold text-amber-900 mt-6 mb-4">Наші рекомендації</h2>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li className="mb-2">Регулярні консультації з фахівцями пансіонату</li>
                <li className="mb-2">Індивідуальний підхід до кожного мешканця</li>
                <li className="mb-2">Постійний моніторинг стану здоров'я</li>
                <li className="mb-2">Комфортні умови проживання та догляду</li>
              </ul>

              <h2 className="text-2xl font-semibold text-amber-900 mt-6 mb-4">Чому обирають нас</h2>
              <p className="text-gray-700 mb-4">
                Пансіонат "Сонячна Долина" відомий своїм професійним підходом до питань {topic.title.toLowerCase()}. 
                Ми приймаємо літніх людей з міста {city.name} та всієї Одеської області. 
                Ми пропонуємо комплексний підхід та індивідуальну увагу до кожного мешканця.
              </p>

              <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mt-6">
                <p className="text-amber-900 font-semibold">Потрібна консультація?</p>
                <p className="text-amber-800">
                  Зв'яжіться з нами за телефоном +380 97 47 57 14 або відвідайте наш пансіонат за адресою: м.Одеса, с.Лески, вул.Шевченка, 4Б
                </p>
              </div>
            </div>
          </article>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
