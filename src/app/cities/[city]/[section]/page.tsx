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
          <h1 className="text-3xl md:text-4xl font-bold text-amber-900 mb-4">
            {section.name} - Пансіонат "Сонячна Долина" у місті {city.name}
          </h1>
          <p className="text-lg text-amber-800">
            Інформація про {section.name.toLowerCase()} пансіонату "Сонячна Долина" у місті {city.name}
          </p>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
