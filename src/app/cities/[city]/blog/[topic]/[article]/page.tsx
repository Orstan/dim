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
          <h1 className="text-3xl md:text-4xl font-bold text-amber-900 mb-4">
            {topic.title} - Стаття {articleNumber}
          </h1>
          <p className="text-lg text-amber-800 mb-2">
            Пансіонат "Сонячна Долина" у місті {city.name}
          </p>
          <div className="bg-white rounded-lg shadow-lg p-6 border border-amber-200 mt-6">
            <p className="text-gray-700 mb-4">
              Це стаття №{articleNumber} на тему "{topic.title}" від пансіонату "Сонячна Долина" у місті {city.name}.
            </p>
            <p className="text-gray-700">
              Наші експерти підготували корисну інформацію про {topic.title.toLowerCase()} для мешканців міста {city.name} та їхніх родичів.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
