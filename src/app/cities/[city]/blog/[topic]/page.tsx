import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { citiesData } from '@/data/cities';

type BlogTopicPageProps = {
  params: {
    city: string;
    topic: string;
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

export function generateMetadata({ params }: BlogTopicPageProps): Metadata {
  const city = citiesData.find(c => c.slug === params.city);
  const topic = blogTopics.find(t => t.slug === params.topic);
  
  if (!city || !topic) {
    return {
      title: 'Сторінка не знайдена | Пансіонат "Сонячна Долина"',
    };
  }
  
  return {
    title: `${topic.title} - Блог пансіонату "Сонячна Долина" у місті ${city.name}`,
    description: `Статті про ${topic.title.toLowerCase()} від пансіонату "Сонячна Долина" у місті ${city.name}.`,
  };
}

export async function generateStaticParams() {
  const params = [];
  for (const city of citiesData) {
    for (const topic of blogTopics) {
      params.push({
        city: city.slug,
        topic: topic.slug,
      });
    }
  }
  return params;
}

export const dynamicParams = false;
export const dynamic = 'force-static';

export default function BlogTopicPage({ params }: BlogTopicPageProps) {
  const city = citiesData.find(c => c.slug === params.city);
  const topic = blogTopics.find(t => t.slug === params.topic);
  
  if (!city || !topic) {
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
              <span className="ml-1">{topic.title}</span>
            </nav>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 border border-amber-200 mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-amber-900 mb-4">
              {topic.title}
            </h1>
            <p className="text-lg text-amber-800 mb-6">
              Блог пансіонату "Сонячна Долина" у місті {city.name}
            </p>
            <p className="text-gray-700">
              Корисні статті про {topic.title.toLowerCase()} від експертів пансіонату "Сонячна Долина" у місті {city.name}. 
              Наші фахівці діляться досвідом та знаннями для покращення якості життя літніх людей.
            </p>
          </div>

          <h2 className="text-2xl font-semibold text-amber-900 mb-6">Статті на тему "{topic.title}"</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5].map(num => (
              <a 
                key={num}
                href={`/cities/${city.slug}/blog/${topic.slug}/article-${num}`}
                className="bg-white rounded-lg shadow-md p-6 border border-amber-200 hover:shadow-lg transition duration-300"
              >
                <h3 className="text-xl font-semibold text-amber-900 mb-3">
                  {topic.title} - Стаття {num}
                </h3>
                <p className="text-gray-600 mb-4">
                  Корисна інформація про {topic.title.toLowerCase()} для мешканців міста {city.name}
                </p>
                <span className="text-amber-600 font-medium hover:underline">
                  Читати далі →
                </span>
              </a>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
