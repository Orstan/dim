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
          <h1 className="text-3xl md:text-4xl font-bold text-amber-900 mb-4">
            {topic.title} - Блог пансіонату "Сонячна Долина" у місті {city.name}
          </h1>
          <p className="text-lg text-amber-800 mb-6">
            Корисні статті про {topic.title.toLowerCase()} від експертів пансіонату "Сонячна Долина" у місті {city.name}
          </p>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
