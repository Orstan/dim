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
          <h1 className="text-3xl md:text-4xl font-bold text-amber-900 mb-4">
            {category.name} - Пансіонат "Сонячна Долина" у місті {city.name}
          </h1>
          <p className="text-lg text-amber-800 mb-6">
            Професійні послуги з {category.name.toLowerCase()} у пансіонаті "Сонячна Долина" у місті {city.name}
          </p>
          <div className="bg-white rounded-lg shadow-lg p-6 border border-amber-200">
            <p className="text-gray-700">
              Наш пансіонат пропонує високоякісні послуги з {category.name.toLowerCase()} для літніх людей у місті {city.name}. 
              Ми забезпечуємо індивідуальний підхід та професійний догляд цілодобово.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
