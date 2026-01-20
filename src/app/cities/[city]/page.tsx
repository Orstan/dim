import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { citiesData } from '@/data/cities';
import { generateCityPageMetadata } from '@/utils/pageMetadata';

// Типи параметрів
type CityPageProps = {
  params: {
    city: string;
  };
}

// Генерація метаданих для сторінки міста
export function generateMetadata({ params }: CityPageProps): Metadata {
  const city = citiesData.find(c => c.slug === params.city);
  
  if (!city) {
    return {
      title: 'Місто не знайдено | Пансіонат "Сонячна Долина"',
    };
  }
  
  return generateCityPageMetadata(city.name);
}

// Генерація статичних параметрів для всіх міст
export async function generateStaticParams() {
  return citiesData.map(city => ({
    city: city.slug,
  }));
}

export const dynamicParams = false;
export const dynamic = 'force-static';

// Компонент сторінки міста
export default function CityPage({ params }: CityPageProps) {
  const city = citiesData.find(c => c.slug === params.city);
  
  // Якщо місто не знайдено, повертаємо 404
  if (!city) {
    notFound();
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-amber-100">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-amber-900 mb-4">
              Пансіонат "Сонячна Долина" для жителів міста {city.name}
            </h1>
            <p className="text-lg text-amber-800">
              Професійний догляд за літніми людьми з міста {city.name} та Одеської області
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-lg shadow-lg p-6 border border-amber-200">
              <h2 className="text-2xl font-semibold text-amber-900 mb-4">Про наш пансіонат для жителів міста {city.name}</h2>
              <p className="text-gray-700 mb-4">
                Пансіонат "Сонячна Долина" приймає літніх людей з міста {city.name} та інших міст Одеської області. 
                Наш заклад розташований в екологічно чистому районі м.Одеси (с.Лески), що забезпечує спокійну 
                атмосферу та комфортні умови для наших мешканців.
              </p>
              <p className="text-gray-700 mb-4">
                Ми забезпечуємо цілодобовий догляд, медичне обслуговування, збалансоване харчування та різноманітні 
                активності для підтримки фізичного та емоційного здоров'я. Жителі міста {city.name} можуть скористатися 
                всіма нашими послугами з комфортом та безпекою.
              </p>
              <div className="mt-6">
                <Link href={`/cities/${city.slug}/services`} className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-4 rounded transition duration-300">
                  Наші послуги
                </Link>
              </div>
            </div>
            
            <div className="relative h-64 md:h-auto rounded-lg overflow-hidden shadow-lg border border-amber-200">
              <Image 
                src="/images/pansionat-main.jpg" 
                alt={`Пансіонат "Сонячна Долина" у місті ${city.name}`} 
                fill 
                className="object-cover"
                unoptimized
              />
            </div>
          </div>
          
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-amber-900 mb-6">Наші переваги для жителів міста {city.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Професійний персонал",
                  description: "Наші співробітники мають багаторічний досвід роботи з літніми людьми та регулярно підвищують свою кваліфікацію."
                },
                {
                  title: "Комфортні умови",
                  description: "Затишні кімнати, обладнані всім необхідним для комфортного проживання літніх людей."
                },
                {
                  title: "Медичний нагляд",
                  description: "Цілодобовий медичний нагляд та регулярні огляди лікарями різних спеціальностей."
                },
                {
                  title: "Збалансоване харчування",
                  description: "Індивідуальний підхід до харчування з урахуванням особливостей здоров'я кожного мешканця."
                },
                {
                  title: "Активне дозвілля",
                  description: "Різноманітні заходи для підтримки активного способу життя та соціалізації."
                },
                {
                  title: "Зручне розташування",
                  description: `Пансіонат розташований в екологічно чистому районі м.Одеси, легко доступний для жителів міста ${city.name}.`
                }
              ].map((advantage, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6 border border-amber-200">
                  <h3 className="text-xl font-semibold text-amber-800 mb-3">{advantage.title}</h3>
                  <p className="text-gray-700">{advantage.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-amber-900 mb-6">Послуги для жителів міста {city.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link href={`/cities/${city.slug}/services/elderly-care`} className="bg-white rounded-lg shadow-md p-6 border border-amber-200 hover:shadow-lg transition duration-300">
                <h3 className="text-xl font-semibold text-amber-800 mb-3">Догляд за літніми</h3>
                <p className="text-gray-700">Професійний догляд за літніми людьми з урахуванням індивідуальних потреб кожного мешканця.</p>
              </Link>
              <Link href={`/cities/${city.slug}/services/medical-services`} className="bg-white rounded-lg shadow-md p-6 border border-amber-200 hover:shadow-lg transition duration-300">
                <h3 className="text-xl font-semibold text-amber-800 mb-3">Медичні послуги</h3>
                <p className="text-gray-700">Цілодобовий медичний нагляд, регулярні огляди та консультації лікарів різних спеціальностей.</p>
              </Link>
              <Link href={`/cities/${city.slug}/services/rehabilitation`} className="bg-white rounded-lg shadow-md p-6 border border-amber-200 hover:shadow-lg transition duration-300">
                <h3 className="text-xl font-semibold text-amber-800 mb-3">Реабілітація</h3>
                <p className="text-gray-700">Реабілітаційні програми для відновлення після травм, інсультів та інших захворювань.</p>
              </Link>
              <Link href={`/cities/${city.slug}/services/psychological-support`} className="bg-white rounded-lg shadow-md p-6 border border-amber-200 hover:shadow-lg transition duration-300">
                <h3 className="text-xl font-semibold text-amber-800 mb-3">Психологічна підтримка</h3>
                <p className="text-gray-700">Психологічна підтримка та консультації для літніх людей та їхніх родичів.</p>
              </Link>
            </div>
            <div className="mt-6 text-center">
              <Link href={`/cities/${city.slug}/services`} className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-4 rounded transition duration-300">
                Всі послуги
              </Link>
            </div>
          </div>
          
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-amber-900 mb-6">Наші контакти</h2>
            <div className="bg-white rounded-lg shadow-lg p-6 border border-amber-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold text-amber-800 mb-3">Адреса пансіонату</h3>
                  <p className="text-gray-700 mb-4">м.Одеса, с.Лески, вул.Шевченка, 4Б</p>
                  <p className="text-sm text-amber-700 mb-4">Приймаємо літніх людей з міста {city.name} та всієї Одеської області</p>
                  
                  <h3 className="text-xl font-semibold text-amber-800 mb-3">Телефон</h3>
                  <p className="text-gray-700 mb-4">+380 (48) 123-45-67</p>
                  
                  <h3 className="text-xl font-semibold text-amber-800 mb-3">Email</h3>
                  <p className="text-gray-700 mb-4">info@soniachna.com</p>
                  
                  <h3 className="text-xl font-semibold text-amber-800 mb-3">Години роботи</h3>
                  <p className="text-gray-700">Пн-Нд: 24/7 (цілодобово)</p>
                </div>
                <div className="relative h-64 md:h-auto rounded-lg overflow-hidden">
                  <Image 
                    src="/images/map.jpg" 
                    alt={`Карта розташування пансіонату "Сонячна Долина" у місті ${city.name}`} 
                    fill 
                    className="object-cover"
                    unoptimized
                  />
                </div>
              </div>
              <div className="mt-6 text-center">
                <Link href={`/cities/${city.slug}/contacts`} className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-4 rounded transition duration-300">
                  Детальніше про контакти
                </Link>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold text-amber-900 mb-6">Корисні статті для міста {city.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link href={`/cities/${city.slug}/blog/elderly-health`} className="bg-white rounded-lg shadow-md overflow-hidden border border-amber-200 hover:shadow-lg transition duration-300">
                <div className="relative h-48">
                  <Image 
                    src="/images/blog/pidtrimka.png" 
                    alt="Здоров'я літніх людей" 
                    fill 
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-amber-800 mb-2">Здоров'я літніх людей</h3>
                  <p className="text-gray-700 text-sm">Поради щодо підтримки здоров'я літніх людей у місті {city.name}.</p>
                </div>
              </Link>
              <Link href={`/cities/${city.slug}/blog/psychological-support`} className="bg-white rounded-lg shadow-md overflow-hidden border border-amber-200 hover:shadow-lg transition duration-300">
                <div className="relative h-48">
                  <Image 
                    src="/images/blog/pidtrymka.jpg" 
                    alt="Психологічна підтримка" 
                    fill 
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-amber-800 mb-2">Психологічна підтримка</h3>
                  <p className="text-gray-700 text-sm">Важливість психологічної підтримки для літніх людей у місті {city.name}.</p>
                </div>
              </Link>
              <Link href={`/cities/${city.slug}/blog/nutrition`} className="bg-white rounded-lg shadow-md overflow-hidden border border-amber-200 hover:shadow-lg transition duration-300">
                <div className="relative h-48">
                  <Image 
                    src="/images/blog/pitanie.jpg" 
                    alt="Харчування" 
                    fill 
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-amber-800 mb-2">Харчування</h3>
                  <p className="text-gray-700 text-sm">Особливості здорового харчування для літніх людей у місті {city.name}.</p>
                </div>
              </Link>
            </div>
            <div className="mt-6 text-center">
              <Link href={`/cities/${city.slug}/blog`} className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-4 rounded transition duration-300">
                Всі статті
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
